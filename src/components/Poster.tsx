import { useCallback, useEffect, useRef, useState } from 'react'

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

import { getCursorVars } from '@/utils/poster'

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
  const rafRef = useRef<number | null>(null)
  const pendingMouseRef = useRef<{ clientX: number; clientY: number } | null>(
    null
  )
  const rectRef = useRef<DOMRect | null>(null)

  const handleLoad = useCallback(() => {
    setIsLoaded(true)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (containerRef.current) {
      rectRef.current = containerRef.current.getBoundingClientRect()
    }
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    pendingMouseRef.current = { clientX: e.clientX, clientY: e.clientY }
    if (rafRef.current !== null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      const mouse = pendingMouseRef.current
      const rect = rectRef.current
      if (!mouse || !rect || !containerRef.current) return
      const { rotateX, rotateY, x, y } = getCursorVars(
        rect,
        mouse.clientX,
        mouse.clientY,
        ROTATION_FORCE
      )
      const el = containerRef.current
      el.style.setProperty('--rotate-x', `${rotateX}deg`)
      el.style.setProperty('--rotate-y', `${rotateY}deg`)
      el.style.setProperty('--x', `${x}%`)
      el.style.setProperty('--y', `${y}%`)
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    pendingMouseRef.current = null
    if (containerRef.current) {
      const el = containerRef.current
      el.style.setProperty('--rotate-x', '0deg')
      el.style.setProperty('--rotate-y', '0deg')
      el.style.setProperty('--x', '50%')
      el.style.setProperty('--y', '50%')
    }
  }, [])

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`poster-container${followCursor ? ' poster-container--follow-cursor' : ''}${!hasFrame ? ' poster-container--no-frame' : ''}${hasFrame && frameSize !== 'lg' ? ` poster-container--frame-${frameSize}` : ''} poster-container--scale-${isLoaded ? 'loaded' : 'loading'}`}
      style={{
        opacity,
        height,
        width,
        cursor: onClick ? 'pointer' : undefined
      }}
      onClick={onClick}
      onMouseEnter={followCursor ? handleMouseEnter : undefined}
      onMouseMove={followCursor ? handleMouseMove : undefined}
      onMouseLeave={followCursor ? handleMouseLeave : undefined}
    >
      <img
        alt={alt}
        src={src}
        className="poster-image"
        onLoad={handleLoad}
        decoding="async"
      />
      {hasGlintEffect && <div className="poster-image-glint"></div>}
      {followCursor && <div className="poster-follow-cursor-light" />}
    </div>
  )
}
