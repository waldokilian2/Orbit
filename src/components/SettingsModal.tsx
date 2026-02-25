'use client'

import { useState, useCallback } from 'react'
import { ServicesConfig } from '@/types/config'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  config: ServicesConfig | null
  onSave: (config: ServicesConfig) => void
}

const EXAMPLE_CONFIG = `{
  "site": {
    "title": "My Server Hub",
    "subtitle": "Welcome to my services",
    "footer": "Powered by Docker",
    "logo": ""
  },
  "quickLinks": [
    { "name": "GitHub", "url": "https://github.com" }
  ],
  "groups": [
    {
      "name": "Media",
      "icon": "🎬",
      "services": [
        {
          "id": "plex",
          "name": "Plex",
          "description": "Media server",
          "url": "http://localhost:32400",
          "icon": "🎬",
          "color": "#E5A00D"
        }
      ]
    }
  ],
  "favorites": ["plex"]
}`

function SettingsModalContent({ onClose, config, onSave }: Omit<SettingsModalProps, 'isOpen'>) {
  const [jsonText, setJsonText] = useState(() => JSON.stringify(config, null, 2))
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const handleChange = useCallback((value: string) => {
    setJsonText(value)
    setHasChanges(true)
    
    // Validate JSON in real-time
    try {
      JSON.parse(value)
      setError(null)
    } catch {
      setError('Invalid JSON syntax')
    }
  }, [])

  const handleSave = useCallback(async () => {
    try {
      const parsed = JSON.parse(jsonText)
      setSaving(true)
      setError(null)

      // Save to server
      const response = await fetch('/api/config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: jsonText,
      })

      const result = await response.json()

      if (!response.ok) {
        setError(result.error || 'Failed to save configuration')
        setSaving(false)
        return
      }

      onSave(parsed)
      setHasChanges(false)
      setSaving(false)
      onClose()
    } catch {
      setError('Failed to parse JSON')
      setSaving(false)
    }
  }, [jsonText, onSave, onClose])

  const handleReset = useCallback(() => {
    if (config) {
      setJsonText(JSON.stringify(config, null, 2))
      setError(null)
      setHasChanges(false)
    }
  }, [config])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (showHelp) {
        setShowHelp(false)
      } else {
        onClose()
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault()
      if (!error && !saving) {
        handleSave()
      }
    }
  }, [onClose, error, saving, handleSave, showHelp])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onKeyDown={handleKeyDown}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[85vh] glass-panel rounded-3xl overflow-hidden flex flex-col animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200/10 dark:border-white/5">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white tracking-tight">
              Edit Configuration
            </h2>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                showHelp 
                  ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' 
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }`}
              title="Show configuration help"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Editor */}
          <div className={`flex-1 overflow-hidden p-6 transition-all ${showHelp ? 'opacity-50' : ''}`}>
            <div className="relative h-full">
              <textarea
                value={jsonText}
                onChange={(e) => handleChange(e.target.value)}
                className={`w-full h-full min-h-[400px] p-4 rounded-xl text-sm font-mono text-gray-800 dark:text-gray-200 resize-none focus:outline-none transition-all duration-300 ${
                  error ? 'ring-2 ring-red-500/50' : ''
                }`}
                style={{
                  background: 'rgba(0, 0, 0, 0.03)',
                  boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.06)',
                }}
                spellCheck={false}
                placeholder="Configuration JSON..."
              />
              
              {/* Error indicator */}
              {error && (
                <div className="absolute bottom-4 left-4 right-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* Help Panel */}
          <div className={`transition-all duration-300 overflow-hidden ${showHelp ? 'w-80 opacity-100' : 'w-0 opacity-0'}`}>
            <div className="h-full p-6 border-l border-gray-200/10 dark:border-white/5 overflow-y-auto">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Configuration Reference
              </h3>
              
              {/* Site Settings */}
              <div className="mb-5">
                <h4 className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">Site Settings</h4>
                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">title</code> - Main heading</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">subtitle</code> - Subheading</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">footer</code> - Footer text</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">logo</code> - Logo URL (optional)</p>
                </div>
              </div>

              {/* Service */}
              <div className="mb-5">
                <h4 className="text-xs font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider mb-2">Service Properties</h4>
                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">id</code> - Unique ID (required)</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">name</code> - Display name (required)</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">url</code> - Service URL (required)</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">icon</code> - Emoji icon (required)</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">description</code> - Short description</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">color</code> - Hex color (e.g. #E5A00D)</p>
                </div>
              </div>

              {/* Group */}
              <div className="mb-5">
                <h4 className="text-xs font-medium text-green-600 dark:text-green-400 uppercase tracking-wider mb-2">Group Properties</h4>
                <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">name</code> - Section name</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">icon</code> - Emoji icon</p>
                  <p><code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">services</code> - Array of services</p>
                </div>
              </div>

              {/* Favorites */}
              <div className="mb-5">
                <h4 className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-2">Favorites</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Array of service <code className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800">id</code>s to pin to the top.
                </p>
              </div>

              {/* Example */}
              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Example</h4>
                <pre className="text-[10px] text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 overflow-x-auto">
                  {EXAMPLE_CONFIG}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200/10 dark:border-white/5 bg-gray-50/50 dark:bg-gray-900/50">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {hasChanges ? (
              <span className="text-amber-600 dark:text-amber-400">● Unsaved changes</span>
            ) : (
              <span>Press Ctrl+S to save • Esc to close</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Reset
              </button>
            )}
            <button
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!!error || saving}
              className={`px-5 py-2.5 text-sm font-medium text-white rounded-xl transition-all ${
                error || saving
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40'
              }`}
            >
              {saving ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </span>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SettingsModal({ isOpen, onClose, config, onSave }: SettingsModalProps) {
  if (!isOpen || !config) return null
  
  // Use key to reset modal state each time it opens
  return (
    <SettingsModalContent
      key={Date.now()}
      onClose={onClose}
      config={config}
      onSave={onSave}
    />
  )
}
