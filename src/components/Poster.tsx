import { useCallback, useState } from 'react'

import {
  FRAME_SIZE,
  HAS_FRAME,
  HAS_GLINT_EFFECT,
  HEIGHT_DEFAULT,
  OPACITY_DEFAULT,
  WIDTH_DEFAULT
} from '@/constants/poster'
import '@/styles/poster.css'
import type { PosterProps } from '@/types/poster'

export const Poster = (props: PosterProps) => {
  const {
    alt,
    frameSize = FRAME_SIZE,
    hasFrame = HAS_FRAME,
    hasGlintEffect = HAS_GLINT_EFFECT,
    src,
    styles
  } = props
  const {
    opacity = OPACITY_DEFAULT,
    height = HEIGHT_DEFAULT,
    width = WIDTH_DEFAULT
  } = styles ?? {}

  const [isLoaded, setIsLoaded] = useState(false)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`poster-container${!hasFrame ? ' poster-container--no-frame' : ''}${hasFrame && frameSize !== 'lg' ? ` poster-container--frame-${frameSize}` : ''} poster-container--scale-${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        opacity,
        height,
        width
      }}
    >
      <img alt={alt} src={src} className="poster-image" onLoad={handleLoad} />
      {hasGlintEffect && <div className="poster-image-glint"></div>}
    </div>
  )
}
