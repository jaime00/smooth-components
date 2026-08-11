import type { ExternalLinkIconHandle } from '@/assets/animatedIcons/ExternalLinkIcon'
import { ExternalLinkIcon } from '@/assets/animatedIcons/ExternalLinkIcon'
import { motion } from 'motion/react'
import type { ElementType } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import {
  HYPERLINK_EXTERNAL,
  HYPERLINK_PREVIEW_BORDER_RADIUS,
  HYPERLINK_PREVIEW_DELAY,
  HYPERLINK_PREVIEW_HEIGHT,
  HYPERLINK_PREVIEW_WIDTH,
  HYPERLINK_SHOW_ICON,
  HYPERLINK_SHOW_UNDERLINE,
  HYPERLINK_UNDERSCORE_COLOR
} from '@/constants/hyperLink'

import '@/styles/hyperLink.css'

import type { HyperLinkProps } from '@/types/hyperLink'

import { computePreviewPosition } from '@/utils/hyperLink'

export function HyperLink<C extends ElementType = 'a'>({
  as,
  href,
  children,
  external = HYPERLINK_EXTERNAL,
  showIcon = HYPERLINK_SHOW_ICON,
  icon,
  styles,
  className,
  contentClassName,
  showUnderline = HYPERLINK_SHOW_UNDERLINE,
  previewConfig,
  ...rest
}: HyperLinkProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof HyperLinkProps<C>>) {
  const iconRef = useRef<ExternalLinkIconHandle>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const previewConfigRef = useRef(previewConfig)
  previewConfigRef.current = previewConfig
  const [showPreview, setShowPreview] = useState(false)
  const [previewPos, setPreviewPos] = useState<{
    top: number
    left: number
    effectivePlacement: 'top' | 'bottom'
  } | null>(null)

  const underscoreColor = styles?.underscoreColor ?? HYPERLINK_UNDERSCORE_COLOR
  const textColor = styles?.color

  const Component = as ?? 'a'
  const isAnchor = Component === 'a'

  const sharedClass = `hyperlink${className ? ` ${className}` : ''}`
  const sharedStyle = textColor ? { color: textColor } : undefined

  const delay = previewConfig?.delay ?? HYPERLINK_PREVIEW_DELAY
  const isCustom = previewConfig?.type === 'custom'
  const previewWidth =
    previewConfig?.width ?? (isCustom ? undefined : HYPERLINK_PREVIEW_WIDTH)
  const previewHeight =
    previewConfig?.height ?? (isCustom ? undefined : HYPERLINK_PREVIEW_HEIGHT)
  const borderRadius =
    previewConfig?.borderRadius ?? HYPERLINK_PREVIEW_BORDER_RADIUS

  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cancelHide = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current)
      hideTimerRef.current = null
    }
  }, [])

  const scheduleHide = useCallback(() => {
    cancelHide()
    hideTimerRef.current = setTimeout(() => {
      setShowPreview(false)
    }, 100)
  }, [cancelHide])

  const handleMouseEnter = useCallback(() => {
    iconRef.current?.startAnimation()
    cancelHide()

    const config = previewConfigRef.current
    if (!config) return

    timerRef.current = setTimeout(() => {
      if (wrapperRef.current) {
        const rect = wrapperRef.current.getBoundingClientRect()
        let width = config.width
        let height = config.height
        if (previewRef.current) {
          const previewRect = previewRef.current.getBoundingClientRect()
          width = width ?? previewRect.width
          height = height ?? previewRect.height
        }
        setPreviewPos(
          computePreviewPosition(rect, { ...config, width, height })
        )
      }
      setShowPreview(true)
    }, delay)
  }, [delay, cancelHide])

  const handleMouseLeave = useCallback(() => {
    iconRef.current?.stopAnimation()

    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    scheduleHide()
  }, [scheduleHide])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current)
    }
  }, [])

  const previewType = previewConfig?.type
  const previewSrc = previewConfig?.src

  useEffect(() => {
    if (previewType === 'image' || previewType === 'gif') {
      if (previewSrc) {
        const img = new Image()
        img.src = previewSrc
      }
    }
  }, [previewType, previewSrc])

  useEffect(() => {
    if (!videoRef.current) return
    if (showPreview) {
      videoRef.current.play()
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [showPreview])

  const inner = (
    <>
      <span
        className={`hyperlink-content${contentClassName ? ` ${contentClassName}` : ''}`}
      >
        {showIcon &&
          isAnchor &&
          (icon ?? (
            <ExternalLinkIcon
              ref={iconRef}
              size={14}
              className="text-current"
            />
          ))}
        {children}
      </span>
      {showUnderline && (
        <span
          className="hyperlink-underline"
          style={{ backgroundColor: underscoreColor }}
        />
      )}
    </>
  )

  const componentProps = {
    className: sharedClass,
    style: sharedStyle,
    ...(isAnchor
      ? {
          href,
          ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
          onMouseEnter: handleMouseEnter,
          onMouseLeave: handleMouseLeave
        }
      : {}),
    ...rest
  }

  const renderPreviewContent = () => {
    if (!previewConfig) return null
    const { type, src, alt, content } = previewConfig

    switch (type) {
      case 'image':
      case 'gif':
        return (
          <img className="hyperlink-preview-media" src={src} alt={alt ?? ''} />
        )
      case 'video':
        return (
          <video
            ref={videoRef}
            className="hyperlink-preview-media"
            src={src}
            muted
            loop
            playsInline
            preload="auto"
          />
        )
      case 'custom':
        return content
    }
  }

  const isVisible = showPreview && previewPos !== null

  const preview = previewConfig
    ? createPortal(
        <motion.div
          ref={previewRef}
          className="hyperlink-preview"
          onMouseEnter={isVisible ? cancelHide : undefined}
          onMouseLeave={isVisible ? scheduleHide : undefined}
          initial={false}
          animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            top: previewPos?.top ?? 0,
            left: previewPos?.left ?? 0,
            width: previewWidth,
            height: previewHeight,
            borderRadius,
            backgroundColor: previewConfig.backgroundColor,
            pointerEvents: isVisible ? 'auto' : 'none'
          }}
        >
          {renderPreviewContent()}
        </motion.div>,
        document.body
      )
    : null

  if (!previewConfig) {
    return <Component {...componentProps}>{inner}</Component>
  }

  return (
    <div ref={wrapperRef} className="hyperlink-wrapper">
      <Component {...componentProps}>{inner}</Component>
      {preview}
    </div>
  )
}
