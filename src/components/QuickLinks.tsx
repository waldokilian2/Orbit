'use client'

import { QuickLink } from '@/types/config'

interface QuickLinksProps {
  links: QuickLink[]
}

export function QuickLinks({ links }: QuickLinksProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {links.map((link, index) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 glass-card shimmer rounded-full text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white text-sm font-medium"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {link.icon && <span className="text-base">{link.icon}</span>}
          <span className="tracking-wide">{link.name}</span>
          <svg 
            className="w-3.5 h-3.5 opacity-30 group-hover:opacity-60 transition-opacity" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      ))}
    </div>
  )
}
