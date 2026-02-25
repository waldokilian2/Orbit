'use client'

import { useCallback, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

const THEME_KEY = 'services-hub-theme'

// External store for theme
let themeListeners: Array<() => void> = []

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'dark'
  return (localStorage.getItem(THEME_KEY) as Theme) || 'dark'
}

function applyTheme(theme: Theme): void {
  if (typeof window === 'undefined') return
  
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

function subscribeToTheme(callback: () => void) {
  themeListeners.push(callback)
  return () => {
    themeListeners = themeListeners.filter(l => l !== callback)
  }
}

function getServerSnapshot(): Theme {
  return 'dark'
}

function getClientSnapshot(): Theme {
  // Check localStorage first
  const stored = localStorage.getItem(THEME_KEY) as Theme | null
  if (stored) return stored
  
  // Fall back to system preference
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  
  return 'dark'
}

function notifyThemeListeners() {
  themeListeners.forEach(listener => listener())
}

interface UseThemeReturn {
  theme: Theme
  isDark: boolean
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

export function useTheme(): UseThemeReturn {
  const theme = useSyncExternalStore(subscribeToTheme, getClientSnapshot, getServerSnapshot)
  
  const setTheme = useCallback((newTheme: Theme) => {
    localStorage.setItem(THEME_KEY, newTheme)
    applyTheme(newTheme)
    notifyThemeListeners()
  }, [])
  
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }, [theme, setTheme])
  
  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    setTheme
  }
}
