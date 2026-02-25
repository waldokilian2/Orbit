'use client'

import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localValue)
    }, 150)
    return () => clearTimeout(timer)
  }, [localValue, onChange])

  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
        <svg 
          className="w-5 h-5 text-gray-400 dark:text-gray-500" 
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
      <Input
        type="text"
        placeholder="Search services..."
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className="w-full pl-14 pr-12 h-14 glass-panel rounded-2xl text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 text-base border-0 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 shadow-none"
      />
      {localValue && (
        <button
          onClick={() => setLocalValue('')}
          className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
