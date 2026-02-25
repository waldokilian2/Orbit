'use client'

import { Service } from '@/types/config'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

interface ServiceCardProps {
  service: Service
  compact?: boolean
}

export function ServiceCard({ service, compact = false }: ServiceCardProps) {
  // Generate a beautiful gradient based on the service color
  const getIconStyle = () => {
    const baseColor = service.color || '#3b82f6'
    return {
      background: `linear-gradient(135deg, ${baseColor}12, ${baseColor}25)`,
      boxShadow: `0 8px 24px ${baseColor}15, inset 0 1px 0 rgba(255,255,255,0.1)`,
      borderColor: `${baseColor}20`
    }
  }

  if (compact) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <a
            href={service.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 p-5 glass-card shimmer rounded-2xl text-center cursor-pointer"
          >
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border"
              style={getIconStyle()}
            >
              {service.icon}
            </div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-800 dark:group-hover:text-white transition-colors truncate max-w-full tracking-wide">
              {service.name}
            </span>
          </a>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/30 shadow-lg">
          <div className="space-y-1">
            <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{service.name}</p>
            <p className="text-xs text-gray-600 dark:text-gray-300">{service.description}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-5 p-5 glass-card shimmer rounded-2xl cursor-pointer"
        >
          {/* Icon */}
          <div
            className="flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border icon-glow"
            style={getIconStyle()}
          >
            {service.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 py-1">
            <h3 className="font-semibold text-gray-700 dark:text-gray-100 truncate text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors tracking-tight">
              {service.name}
            </h3>
          </div>

          {/* Arrow Icon */}
          <div className="flex-shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-2 group-hover:translate-x-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-400/10 dark:to-purple-400/10 flex items-center justify-center border border-blue-500/10 dark:border-blue-400/10">
              <svg 
                className="w-5 h-5 text-blue-500 dark:text-blue-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </div>
          </div>
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-sm backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-700/30 shadow-lg">
        <div className="space-y-1">
          <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">{service.name}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">{service.description}</p>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
