// Type definitions for the services hub configuration

export interface Service {
  id: string
  name: string
  description: string
  url: string
  icon: string
  color?: string
}

export interface ServiceGroup {
  name: string
  icon?: string
  services: Service[]
}

export interface QuickLink {
  name: string
  url: string
  icon?: string
}

export interface SiteConfig {
  title: string
  subtitle: string
  footer: string
  logo?: string
}

export interface ServicesConfig {
  site: SiteConfig
  quickLinks: QuickLink[]
  groups: ServiceGroup[]
  favorites?: string[]
}
