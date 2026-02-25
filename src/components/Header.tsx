'use client'

import { useTheme } from '@/hooks/useTheme'
import { useState, useEffect } from 'react'

interface HeaderProps {
  title: string
  subtitle: string
  logo?: string
  searchQuery?: string
  onSearchChange?: (value: string) => void
  onSettingsClick?: () => void
}

export function Header({ title, subtitle, logo, searchQuery = '', onSearchChange, onSettingsClick }: HeaderProps) {
  const { isDark, toggleTheme } = useTheme()
  const [localSearch, setLocalSearch] = useState(searchQuery)

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange?.(localSearch)
    }, 150)
    return () => clearTimeout(timer)
  }, [localSearch, onSearchChange])

  return (
    <header className="sticky top-0 z-50">
      <div className="glass-panel border-b border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Title */}
            <div className="flex items-center gap-3 flex-1">
              {logo ? (
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="w-11 h-11 rounded-xl object-cover shadow-xl shadow-black/5 dark:shadow-black/20"
                />
              ) : (
                <div className="relative w-11 h-11">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-violet-500 to-purple-600 rounded-xl shadow-xl shadow-blue-500/25 dark:shadow-blue-500/30" />
                  <div className="absolute inset-[2px] bg-gradient-to-br from-white/20 to-transparent rounded-[10px]" />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-xl drop-shadow-sm">
                    🏠
                  </div>
                </div>
              )}
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-800 dark:text-white tracking-tight leading-tight">
                  {title}
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-xs leading-tight">{subtitle}</p>
              </div>
            </div>

            {/* Search Bar - Center */}
            <div className="flex-1 flex justify-center">
              <div className="relative w-full max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg 
                    className="w-4 h-4 text-gray-400 dark:text-gray-500" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search services..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full pl-11 pr-10 h-10 rounded-xl text-gray-700 dark:text-gray-200 placeholder-gray-500 text-sm focus:outline-none transition-all duration-300"
                  style={{
                    background: isDark 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : 'rgba(0, 0, 0, 0.06)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
                    boxShadow: `inset 0 1px 2px ${isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.04)'}`,
                  }}
                />
                <style jsx>{`
                  input:focus {
                    border-color: ${isDark ? 'rgba(10, 132, 255, 0.5)' : 'rgba(0, 113, 227, 0.4)'} !important;
                    box-shadow: 0 0 0 2px ${isDark ? 'rgba(10, 132, 255, 0.15)' : 'rgba(0, 113, 227, 0.1)'} !important;
                  }
                `}</style>
                {localSearch && (
                  <button
                    onClick={() => setLocalSearch('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Actions - Right */}
            <div className="flex-1 flex justify-end items-center gap-3">
              {/* Settings Button */}
              <button
                onClick={onSettingsClick}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800/50 transition-all duration-300"
                aria-label="Settings"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="group relative h-8 w-[68px] rounded-full p-1 transition-all duration-500 hover:scale-105 active:scale-95 overflow-hidden flex-shrink-0"
                aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                style={{
                  background: isDark 
                    ? 'linear-gradient(to right, #4f46e5, #7c3aed, #8b5cf6)' 
                    : 'linear-gradient(to right, #f59e0b, #f97316, #eab308)',
                  boxShadow: isDark 
                    ? '0 4px 20px rgba(139, 92, 246, 0.4)' 
                    : '0 4px 20px rgba(251, 146, 60, 0.4)'
                }}
              >
                {/* Stars for dark mode */}
                <div className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
                  <div className="absolute top-1.5 left-1.5 w-1 h-1 bg-white/60 rounded-full" />
                  <div className="absolute top-3 left-4 w-0.5 h-0.5 bg-white/40 rounded-full" />
                  <div className="absolute bottom-1.5 left-2.5 w-0.5 h-0.5 bg-white/50 rounded-full" />
                </div>
                
                {/* Thumb with icon */}
                <div 
                  className={`relative w-6 h-6 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-500 ease-out ${
                    isDark ? 'translate-x-7' : 'translate-x-0.5'
                  }`}
                  style={{ 
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.9)'
                  }}
                >
                  {isDark ? (
                    <svg className="w-3.5 h-3.5 text-violet-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                      <path 
                        fillRule="evenodd" 
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
