import { useCallback, useRef, useState } from 'react'

import {
  FOLLOW_CURSOR,
  FRAME_SIZE,
  HAS_FRAME,
  HAS_GLINT_EFFECT,
  HEIGHT_DEFAULT,
  OPACITY_DEFAULT,
  ROTATION_FORCE,
  WIDTH_DEFAULT
} from '@/constants/poster'

import '@/styles/poster.css'

import type { PosterProps } from '@/types/poster'

export const Poster = (props: PosterProps) => {
  const {
    alt,
    followCursor = FOLLOW_CURSOR,
    frameSize = FRAME_SIZE,
    hasFrame = HAS_FRAME,
    hasGlintEffect = HAS_GLINT_EFFECT,
    onClick,
    src,
    styles
  } = props
  const {
    opacity = OPACITY_DEFAULT,
    height = HEIGHT_DEFAULT,
    width = WIDTH_DEFAULT
  } = styles ?? {}

  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [cursorVars, setCursorVars] = useState({
    rotateX: 0,
    rotateY: 0,
    x: 50,
    y: 50
  })

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setCursorVars({
      rotateX: (y - 50) * ROTATION_FORCE * -1,
      rotateY: (x - 50) * ROTATION_FORCE,
      x,
      y
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursorVars({ rotateX: 0, rotateY: 0, x: 50, y: 50 })
  }, [])

  return (
    <div
      ref={containerRef}
      className={`poster-container${followCursor ? ' poster-container--follow-cursor' : ''}${!hasFrame ? ' poster-container--no-frame' : ''}${hasFrame && frameSize !== 'lg' ? ` poster-container--frame-${frameSize}` : ''} poster-container--scale-${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        opacity,
        height,
        width,
        cursor: onClick ? 'pointer' : undefined,
        ...(followCursor && {
          ['--rotate-x' as string]: `${cursorVars.rotateX}deg`,
          ['--rotate-y' as string]: `${cursorVars.rotateY}deg`,
          ['--x' as string]: `${cursorVars.x}%`,
          ['--y' as string]: `${cursorVars.y}%`
        })
      }}
      onClick={onClick}
      onMouseMove={followCursor ? handleMouseMove : undefined}
      onMouseLeave={followCursor ? handleMouseLeave : undefined}
    >
      <img alt={alt} src={src} className="poster-image" onLoad={handleLoad} />
      {hasGlintEffect && <div className="poster-image-glint"></div>}
      {followCursor && <div className="poster-follow-cursor-light" />}
    </div>
  )
}
