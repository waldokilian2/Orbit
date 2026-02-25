'use client'

import { useEffect, useState, useMemo } from 'react'
import { ServicesConfig, Service } from '@/types/config'
import { ServiceCard } from '@/components/ServiceCard'
import { ServiceGroup as ServiceGroupComponent } from '@/components/ServiceGroup'
import { QuickLinks } from '@/components/QuickLinks'
import { Header } from '@/components/Header'
import { Favorites } from '@/components/Favorites'
import { SettingsModal } from '@/components/SettingsModal'

export default function Home() {
  const [config, setConfig] = useState<ServicesConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch('/api/config')
        if (!response.ok) {
          throw new Error('Failed to load configuration')
        }
        const data = await response.json()
        setConfig(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }
    fetchConfig()
  }, [])

  // Filter services based on search query
  const filteredGroups = useMemo(() => {
    if (!config?.groups || !searchQuery.trim()) {
      return config?.groups || []
    }

    const query = searchQuery.toLowerCase()
    return config.groups
      .map(group => ({
        ...group,
        services: group.services.filter(
          service =>
            service.name.toLowerCase().includes(query) ||
            service.description.toLowerCase().includes(query)
        )
      }))
      .filter(group => group.services.length > 0)
  }, [config?.groups, searchQuery])

  // Get favorite services
  const favoriteServices = useMemo(() => {
    if (!config?.groups || !config.favorites) return []
    
    const allServices = config.groups.flatMap(g => g.services)
    return config.favorites
      .map(id => allServices.find(s => s.id === id))
      .filter((s): s is Service => s !== undefined)
  }, [config?.groups, config?.favorites])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-blue-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
        {/* Animated background orbs - More vibrant */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-violet-400/60 to-purple-500/60 dark:from-violet-600/40 dark:to-purple-600/40 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-gradient-to-br from-pink-400/50 to-rose-400/50 dark:from-pink-500/35 dark:to-rose-500/35 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-cyan-400/50 to-blue-500/50 dark:from-cyan-600/35 dark:to-blue-600/35 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '4s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/40 to-violet-400/40 dark:from-indigo-600/30 dark:to-violet-600/30 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '3s' }} />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center gap-8">
            {/* Premium loading spinner */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-[3px] border-violet-300/50 dark:border-violet-500/30" />
              <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-violet-500 dark:border-t-violet-400 animate-spin" />
              <div className="absolute inset-3 rounded-full border-[2px] border-transparent border-b-pink-500 dark:border-b-pink-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
              <div className="absolute inset-6 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 dark:from-violet-400 dark:to-pink-400 opacity-80" />
            </div>
            
            <div className="text-center space-y-2">
              <p className="text-gray-700 dark:text-gray-200 text-lg font-medium tracking-tight">Loading</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Preparing your dashboard</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !config) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-blue-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
        {/* Animated background orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-red-400/50 to-orange-400/50 dark:from-red-600/35 dark:to-orange-600/35 rounded-full blur-3xl animate-pulse-soft" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
          <div className="text-center glass-panel rounded-3xl p-12 max-w-md">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white text-3xl shadow-lg shadow-red-500/30">
              ⚠️
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-3 tracking-tight">Configuration Error</h1>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{error || 'No configuration found'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-purple-50 to-blue-100 dark:from-gray-950 dark:via-purple-950 dark:to-blue-950">
      {/* Stunning animated background - More vibrant */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Primary orbs - Larger and more vibrant */}
        <div className="absolute top-[-15%] left-[5%] w-[900px] h-[900px] bg-gradient-to-br from-violet-400/70 via-purple-400/50 to-pink-400/30 dark:from-violet-600/50 dark:via-purple-600/35 dark:to-pink-600/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '0s' }} />
        <div className="absolute top-[15%] right-[-10%] w-[750px] h-[750px] bg-gradient-to-br from-pink-400/60 via-rose-400/40 to-red-400/20 dark:from-pink-600/40 dark:via-rose-600/25 dark:to-red-600/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-15%] left-[-10%] w-[1000px] h-[1000px] bg-gradient-to-br from-cyan-400/60 via-blue-400/40 to-indigo-400/20 dark:from-cyan-600/40 dark:via-blue-600/25 dark:to-indigo-600/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '4s' }} />
        
        {/* Secondary orbs */}
        <div className="absolute top-[55%] right-[15%] w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/50 to-violet-400/30 dark:from-indigo-600/30 dark:to-violet-600/18 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[25%] left-[45%] w-[400px] h-[400px] bg-gradient-to-br from-teal-400/40 to-emerald-400/25 dark:from-teal-600/25 dark:to-emerald-600/15 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '3s' }} />
        
        {/* Tertiary smaller orbs */}
        <div className="absolute top-[75%] left-[30%] w-[300px] h-[300px] bg-gradient-to-br from-amber-400/40 to-orange-400/25 dark:from-amber-600/20 dark:to-orange-600/12 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-[10%] left-[60%] w-[350px] h-[350px] bg-gradient-to-br from-fuchsia-400/35 to-pink-400/20 dark:from-fuchsia-600/20 dark:to-pink-600/12 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '4.5s' }} />
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative z-10">
        {/* Header with integrated search */}
        <Header 
          title={config.site.title} 
          subtitle={config.site.subtitle}
          logo={config.site.logo}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSettingsClick={() => setSettingsOpen(true)}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Quick Links */}
          {config.quickLinks && config.quickLinks.length > 0 && (
            <div className="animate-fade-in-up">
              <QuickLinks links={config.quickLinks} />
            </div>
          )}

          {/* Favorites Section */}
          {favoriteServices.length > 0 && !searchQuery && (
            <div className="animate-fade-in-up delay-100">
              <Favorites services={favoriteServices} />
            </div>
          )}

          {/* Service Groups */}
          <div className="space-y-8">
            {filteredGroups.length === 0 && searchQuery ? (
              <div className="text-center py-24 animate-scale-in">
                <div className="glass-panel rounded-3xl p-16 max-w-lg mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-400/20 to-gray-500/20 dark:from-gray-600/20 dark:to-gray-700/20 flex items-center justify-center text-4xl">
                    🔍
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2 tracking-tight">No services found</h3>
                  <p className="text-gray-500 dark:text-gray-400">Try adjusting your search</p>
                </div>
              </div>
            ) : (
              filteredGroups.map((group, index) => (
                <div 
                  key={group.name} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${(index + 2) * 100}ms` }}
                >
                  <ServiceGroupComponent 
                    group={group}
                    defaultExpanded={index < 2}
                  />
                </div>
              ))
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="glass-panel rounded-2xl px-8 py-5">
              <p className="text-center text-gray-500 dark:text-gray-400 text-sm font-medium tracking-wide">
                {config.site.footer}
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        config={config}
        onSave={(newConfig) => {
          setConfig(newConfig)
          setSettingsOpen(false)
        }}
      />
    </div>
  )
}
