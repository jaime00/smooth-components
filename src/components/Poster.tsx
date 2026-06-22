import { useCallback, useRef, useState } from 'react'

import {
  FALLBACK_IMAGE,
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

  const [hasError, setHasError] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  const handleError = useCallback(() => {
    setHasError(true)
    if (imgRef.current) imgRef.current.src = FALLBACK_IMAGE
  }, [])

  return (
    <div
      className={`poster-container${!hasFrame ? ' poster-container--no-frame' : ''}`}
      style={{
        opacity,
        height,
        width
      }}
    >
      <img
        ref={imgRef}
        alt={alt}
        src={src || FALLBACK_IMAGE}
        className={`poster-image${hasError ? ' poster-image--fallback' : ''}`}
        onError={handleError}
      />
      {hasGlintEffect && !hasError && (
        <div className="poster-image-glint"></div>
      )}
    </div>
  )
}
