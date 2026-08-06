export type BundlephobiaSize = 'sm' | 'md' | 'lg'

export type BundlephobiaWidgetProps = {
  pkg: `${string}@${number}.${number}.${number}`
  size?: BundlephobiaSize
  repository?: string
  isDarkMode?: boolean
  hasHoverEffect?: boolean
}

export type BundlephobiaWidgetSkeletonProps = Pick<
  BundlephobiaWidgetProps,
  'size' | 'isDarkMode' | 'hasHoverEffect'
>

export type BundlephobiaSizeConfig = {
  showDescription: boolean
  showBadges: boolean
  showHeaderActions: boolean
  showComposition: boolean
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

export type BundlephobiaWidgetState =
  | { status: 'loading' }
  | { status: 'error'; error: string }
  | { status: 'success'; data: BundlephobiaApiResponse }
