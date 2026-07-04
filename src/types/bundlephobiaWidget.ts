export type BundlephobiaSize = 'sm' | 'md' | 'lg'

export type BundlephobiaWidgetProps = {
  pkg: `${string}@${number}.${number}.${number}`
  size?: BundlephobiaSize
  repository?: string
  isDarkMode?: boolean
}

export type BundlephobiaDependencySize = {
  approximateSize: number
  name: string
}

export type BundlephobiaApiResponse = {
  dependencyCount: number
  dependencySizes: BundlephobiaDependencySize[]
  description: string
  gzip: number
  hasJSModule: boolean | string
  isModuleType: boolean
  name: string
  size: number
  version: string
}
