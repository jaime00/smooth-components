import type { CSSProperties } from 'react'

export type FrameSize = 'sm' | 'md' | 'lg'

export type PosterStyles = Pick<CSSProperties, 'opacity' | 'height' | 'width'>

export type PosterProps = {
  alt: string
  frameSize?: FrameSize
  hasFrame?: boolean
  hasGlintEffect?: boolean
  onClick?: () => void
  src: string
  styles?: PosterStyles
}
