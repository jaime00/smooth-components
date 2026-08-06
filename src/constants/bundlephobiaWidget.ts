import type {
  BundlephobiaSize,
  BundlephobiaSizeConfig
} from '@/types/bundlephobiaWidget'

export const DEFAULT_SIZE = 'md'
export const DEFAULT_IS_DARK_MODE = false
export const DEFAULT_HAS_HOVER_EFFECT = true
export const API_BASE_URL = 'https://bundlephobia.com/api/size?package='
export const SLOW_3G_SPEED = 50000
export const EMERGING_4G_SPEED = 875000

export const SIZE_CONFIG: Record<BundlephobiaSize, BundlephobiaSizeConfig> = {
  sm: {
    showDescription: false,
    showBadges: false,
    showHeaderActions: false,
    showComposition: false
  },
  md: {
    showDescription: true,
    showBadges: true,
    showHeaderActions: true,
    showComposition: false
  },
  lg: {
    showDescription: true,
    showBadges: true,
    showHeaderActions: true,
    showComposition: true
  }
}
