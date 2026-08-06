import {
  DEFAULT_HAS_HOVER_EFFECT,
  DEFAULT_IS_DARK_MODE,
  DEFAULT_SIZE,
  SIZE_CONFIG
} from '@/constants/bundlephobiaWidget'

import '@/styles/bundlephobiaWidget.css'

import type { BundlephobiaWidgetSkeletonProps } from '@/types/bundlephobiaWidget'

export const BundlephobiaWidgetSkeleton = (
  props: BundlephobiaWidgetSkeletonProps
) => {
  const {
    size = DEFAULT_SIZE,
    isDarkMode = DEFAULT_IS_DARK_MODE,
    hasHoverEffect = DEFAULT_HAS_HOVER_EFFECT
  } = props

  const sizeClass = `bundlephobia-widget--${size}`
  const darkClass = isDarkMode ? 'bundlephobia-widget--dark' : ''
  const hoverClass = !hasHoverEffect ? 'bundlephobia-widget--no-hover' : ''

  const { showDescription, showBadges } = SIZE_CONFIG[size]

  return (
    <div
      className={`bundlephobia-widget ${sizeClass} ${darkClass} ${hoverClass}`}
    >
      <div className="bundlephobia-widget__header">
        <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--logo" />
      </div>
      <div className="bundlephobia-widget__title-row">
        <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--title" />
        <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--version" />
      </div>
      {showDescription && (
        <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--description" />
      )}
      {showBadges && (
        <div className="bundlephobia-widget__badges">
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--badge" />
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--badge" />
        </div>
      )}
      <div className="bundlephobia-widget__metrics">
        <div className="bundlephobia-widget__metric">
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--metric-value" />
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--metric-label" />
        </div>
        <div className="bundlephobia-widget__metric">
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--metric-value" />
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--metric-label" />
        </div>
      </div>
      <hr className="bundlephobia-widget__divider" />
      <div className="bundlephobia-widget__download-times">
        <div className="bundlephobia-widget__download-time">
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--download-value" />
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--metric-label" />
        </div>
        <div className="bundlephobia-widget__download-time">
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--download-value" />
          <div className="bundlephobia-widget__skeleton bundlephobia-widget__skeleton--metric-label" />
        </div>
      </div>
    </div>
  )
}
