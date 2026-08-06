import { GithubIcon } from '@/icons/Github'
import { useEffect, useState } from 'react'

import { BundlephobiaWidgetSkeleton } from '@/components/skeletons/BundlephobiaWidgetSkeleton'

import {
  DEFAULT_HAS_HOVER_EFFECT,
  DEFAULT_IS_DARK_MODE,
  DEFAULT_SIZE,
  EMERGING_4G_SPEED,
  SIZE_CONFIG,
  SLOW_3G_SPEED
} from '@/constants/bundlephobiaWidget'

import { fetchPackageData } from '@/services/bundlephobia'

import '@/styles/bundlephobiaWidget.css'

import type {
  BundlephobiaWidgetProps,
  BundlephobiaWidgetState
} from '@/types/bundlephobiaWidget'

import { calcDownloadTime, formatBytes } from '@/utils/bundlePhobia'

export const BundlephobiaWidget = (props: BundlephobiaWidgetProps) => {
  const {
    pkg,
    size = DEFAULT_SIZE,
    repository,
    isDarkMode = DEFAULT_IS_DARK_MODE,
    hasHoverEffect = DEFAULT_HAS_HOVER_EFFECT
  } = props

  const [state, setState] = useState<BundlephobiaWidgetState>({
    status: 'loading'
  })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading' })

    fetchPackageData(pkg, controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((err) => {
        if (err.name !== 'AbortError')
          setState({ status: 'error', error: err.message })
      })

    return () => controller.abort()
  }, [pkg])

  const { showDescription, showBadges, showHeaderActions, showComposition } =
    SIZE_CONFIG[size]

  if (state.status !== 'success')
    return (
      <BundlephobiaWidgetSkeleton
        size={size}
        isDarkMode={isDarkMode}
        hasHoverEffect={hasHoverEffect}
      />
    )

  const { data } = state
  const isTreeShakeable = !!(data.hasJSModule || data.isModuleType)
  const hasNoDeps = data.dependencyCount === 0
  const slow3gTime = calcDownloadTime(data.gzip, SLOW_3G_SPEED)
  const emerging4gTime = calcDownloadTime(data.gzip, EMERGING_4G_SPEED)

  const maxDepSize =
    data.dependencySizes.length > 0
      ? Math.max(...data.dependencySizes.map((d) => d.approximateSize))
      : 1

  const darkClass = isDarkMode ? 'bundlephobia-widget--dark' : ''
  const hoverClass = !hasHoverEffect ? 'bundlephobia-widget--no-hover' : ''

  return (
    <div
      className={`bundlephobia-widget bundlephobia-widget--${size} ${darkClass} ${hoverClass} bundlephobia-widget--scale-loaded`}
    >
      {/* Header */}
      <div className="bundlephobia-widget__header">
        <p className="bundlephobia-widget__logo">
          <span className="bundlephobia-widget__logo-bundle">bundle</span>
          <span className="bundlephobia-widget__logo-phobia">phobia</span>
        </p>
        {showHeaderActions && (
          <div className="bundlephobia-widget__header-actions">
            <a
              className="bundlephobia-widget__header-btn"
              href={`https://www.npmjs.com/package/${data.name}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View on npm"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331z" />
              </svg>
            </a>
            {repository && (
              <a
                className="bundlephobia-widget__header-btn"
                href={repository}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source"
              >
                <GithubIcon size={20} />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Título */}
      <div className="bundlephobia-widget__title-row">
        <h2 className="bundlephobia-widget__name">{data.name}</h2>
        <span className="bundlephobia-widget__version">v{data.version}</span>
      </div>

      {/* Descripción */}
      {showDescription && data.description && (
        <p className="bundlephobia-widget__description">{data.description}</p>
      )}

      {/* Badges */}
      {showBadges && (
        <div className="bundlephobia-widget__badges">
          {isTreeShakeable && (
            <span className="bundlephobia-widget__badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20c4 0 4-2 8-2s4 2 8 2v-2c-4 0-4-2-8-2-1.13 0-1.96.19-2.67.44C14.64 13.1 16.18 10.6 17 8z" />
              </svg>
              tree-shakeable
            </span>
          )}
          {hasNoDeps && (
            <span className="bundlephobia-widget__badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 15h-4v-4h-4v4H7V7h4v4h4V7h4v10z" />
              </svg>
              no dependencies
            </span>
          )}
          {!hasNoDeps && (
            <span className="bundlephobia-widget__badge">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 15h-4v-4h-4v4H7V7h4v4h4V7h4v10z" />
              </svg>
              {data.dependencyCount} dependencies
            </span>
          )}
        </div>
      )}

      {/* Métricas de tamaño */}
      <div className="bundlephobia-widget__metrics">
        <div className="bundlephobia-widget__metric">
          <p className="bundlephobia-widget__metric-value">
            {formatBytes(data.size)}
            <span className="bundlephobia-widget__metric-unit"> kB</span>
          </p>
          <p className="bundlephobia-widget__metric-label">Minified</p>
        </div>
        <div className="bundlephobia-widget__metric">
          <p className="bundlephobia-widget__metric-value">
            {formatBytes(data.gzip)}
            <span className="bundlephobia-widget__metric-unit"> kB</span>
          </p>
          <p className="bundlephobia-widget__metric-label">Gzipped</p>
        </div>
      </div>

      <hr className="bundlephobia-widget__divider" />

      {/* Tiempos de descarga */}
      <div className="bundlephobia-widget__download-times">
        <div className="bundlephobia-widget__download-time">
          <p className="bundlephobia-widget__download-time-value">
            {slow3gTime}
            <span className="bundlephobia-widget__download-time-unit"> ms</span>
          </p>
          <p className="bundlephobia-widget__download-time-label">Slow 3G</p>
        </div>
        <div className="bundlephobia-widget__download-time">
          <p className="bundlephobia-widget__download-time-value">
            {emerging4gTime}
            <span className="bundlephobia-widget__download-time-unit"> ms</span>
          </p>
          <p className="bundlephobia-widget__download-time-label">
            Emerging 4G
          </p>
        </div>
      </div>

      {/* Composición de dependencias */}
      {showComposition && data.dependencySizes.length > 0 && (
        <div className="bundlephobia-widget__composition">
          <p className="bundlephobia-widget__composition-title">Composition</p>
          {data.dependencySizes.map((dep) => (
            <div
              key={dep.name}
              className="bundlephobia-widget__composition-item"
            >
              <span className="bundlephobia-widget__composition-name">
                {dep.name}
              </span>
              <div className="bundlephobia-widget__composition-bar-container">
                <div
                  className="bundlephobia-widget__composition-bar"
                  style={{
                    width: `${(dep.approximateSize / maxDepSize) * 100}%`
                  }}
                />
              </div>
              <span className="bundlephobia-widget__composition-size">
                {formatBytes(dep.approximateSize)} kB
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
