'use client'

import { useState } from 'react'

interface StatusSidebarProps {
  statusPageUrl?: string
}

export function StatusSidebar({ statusPageUrl }: StatusSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)

  const hasUrl = Boolean(statusPageUrl && statusPageUrl.trim().length > 0)

  const handleOpen = () => {
    // Only show loading spinner if the iframe hasn't finished loading yet.
    // The iframe stays in the DOM when closed, so onLoad won't fire again on reopen.
    if (hasUrl && !iframeLoaded) setLoading(true)
    setIsOpen(true)
  }

  return (
    <>
      {/* Collapsed handle — vertical tab pinned to the right edge */}
      <button
        onClick={handleOpen}
        aria-label="Open status panel"
        className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 group transition-all duration-500 ease-out ${
          isOpen ? 'opacity-0 pointer-events-none translate-x-full' : 'opacity-100'
        }`}
      >
        <div className="glass-panel rounded-l-2xl rounded-r-none border border-r-0 border-white/15 dark:border-white/5 py-5 pl-3 pr-2.5 flex flex-col items-center gap-2.5 shadow-2xl shadow-black/20 group-hover:pl-4 transition-all duration-500">
          {/* Activity / heartbeat icon */}
          <div className="relative">
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h4l3 8 4-16 3 8h4" />
            </svg>
          </div>
          {/* Vertical label */}
          <span
            className="text-[11px] font-semibold tracking-[0.25em] text-gray-500 dark:text-gray-400 uppercase select-none"
            style={{ writingMode: 'vertical-rl' }}
          >
            Status
          </span>
        </div>
      </button>

      {/* Expanded panel */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[440px] transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <div className="h-full glass-panel border-l border-white/15 dark:border-white/5 flex flex-col shadow-2xl shadow-black/40">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h4l3 8 4-16 3 8h4" />
                </svg>
              </div>
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-100 tracking-tight">
                Service Status
              </h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close status panel"
              className="w-9 h-9 rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-white/40 dark:hover:bg-white/5 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 relative overflow-hidden bg-black/5 dark:bg-black/20">
            {hasUrl ? (
              <>
                {/* Loading spinner */}
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10 bg-white/30 dark:bg-gray-950/40 backdrop-blur-sm">
                    <div className="relative w-12 h-12">
                      <div className="absolute inset-0 rounded-full border-[3px] border-violet-300/40 dark:border-violet-500/30" />
                      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-violet-500 dark:border-t-violet-400 animate-spin" />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Loading status…</p>
                  </div>
                )}
                <iframe
                  src={statusPageUrl}
                  title="Service Status"
                  onLoad={() => {
                    setLoading(false)
                    setIframeLoaded(true)
                  }}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </>
            ) : (
              /* Unconfigured placeholder */
              <div className="h-full flex items-center justify-center p-8">
                <div className="max-w-xs text-center space-y-5">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-amber-400/20 to-orange-500/20 flex items-center justify-center text-3xl">
                    ⚙️
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-base font-semibold text-gray-700 dark:text-gray-200 tracking-tight">
                      No status page configured
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      Add a <code className="px-1.5 py-0.5 rounded bg-white/50 dark:bg-white/10 text-xs font-mono">statusPageUrl</code> to the{' '}
                      <code className="px-1.5 py-0.5 rounded bg-white/50 dark:bg-white/10 text-xs font-mono">site</code> section of your config to display your Uptime Kuma status page here.
                    </p>
                  </div>
                  <div className="text-left rounded-xl bg-black/5 dark:bg-black/30 border border-white/10 dark:border-white/5 p-3">
                    <p className="text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1.5">
                      config/services.json
                    </p>
                    <pre className="text-[11px] font-mono text-gray-600 dark:text-gray-300 leading-relaxed overflow-x-auto"><code>{`{
  "site": {
    ...
    "statusPageUrl":
      "http://host:3002/status/services"
  }
}`}</code></pre>
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Open Settings to edit, or save changes and refresh.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Subtle backdrop — click anywhere to collapse */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] transition-opacity duration-500"
          aria-hidden="true"
        />
      )}
    </>
  )
}
