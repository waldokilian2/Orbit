'use client'

import { useState } from 'react'
import { ServiceGroup as ServiceGroupType } from '@/types/config'
import { ServiceCard } from './ServiceCard'

interface ServiceGroupProps {
  group: ServiceGroupType
  defaultExpanded?: boolean
}

export function ServiceGroup({ group, defaultExpanded = false }: ServiceGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded || group.services.length <= 4)

  return (
    <section className="glass-panel rounded-3xl overflow-hidden transition-all duration-500">
      {/* Group Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 dark:hover:bg-white/5 transition-all duration-300 group"
      >
        <div className="flex items-center gap-5">
          {group.icon && (
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 dark:from-blue-500/30 dark:via-purple-500/30 dark:to-pink-500/30 rounded-xl" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl">
                {group.icon}
              </div>
            </div>
          )}
          <div className="text-left">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white tracking-tight">{group.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              {group.services.length} {group.services.length === 1 ? 'service' : 'services'}
            </p>
          </div>
        </div>
        <div className={`w-10 h-10 rounded-full glass-button flex items-center justify-center transition-all duration-500 ${isExpanded ? 'rotate-180 bg-blue-500/10 dark:bg-blue-400/10' : ''}`}>
          <svg
            className={`w-5 h-5 transition-colors ${isExpanded ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Services Grid */}
      <div
        className={`transition-all duration-500 ease-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {group.services.map((service, index) => (
              <div 
                key={service.id} 
                className="animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
