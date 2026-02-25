'use client'

import { Service } from '@/types/config'
import { ServiceCard } from './ServiceCard'

interface FavoritesProps {
  services: Service[]
}

export function Favorites({ services }: FavoritesProps) {
  return (
    <div className="glass-panel rounded-3xl p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-xl shadow-lg shadow-orange-500/30" />
          <div className="absolute inset-[1px] bg-gradient-to-br from-white/20 to-transparent rounded-[11px]" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl drop-shadow-sm">
            ⭐
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white tracking-tight">Favorites</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{services.length} {services.length === 1 ? 'service' : 'services'}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {services.map((service, index) => (
          <div key={service.id} style={{ animationDelay: `${index * 50}ms` }}>
            <ServiceCard service={service} compact />
          </div>
        ))}
      </div>
    </div>
  )
}
