import { useState } from 'react'

import { BundlephobiaWidget } from '@/components/BundlephobiaWidget'
import { Poster } from '@/components/Poster'

type Component = 'BundlephobiaWidget' | 'Poster'

const COMPONENTS: Component[] = ['BundlephobiaWidget', 'Poster']

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selected, setSelected] = useState<Component>('BundlephobiaWidget')

  const borderColor = isDarkMode ? '#2A313C' : '#ddd'
  const textMuted = isDarkMode ? '#6B7280' : '#999'
  const textPrimary = isDarkMode ? '#F5F7FA' : '#333'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        width: '100%',
        padding: '3rem 2rem',
        background: isDarkMode ? '#0F1218' : '#f0f2f5',
        transition: 'background 0.3s ease'
      }}
    >
      <button
        onClick={() => setIsDarkMode((prev) => !prev)}
        style={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 10,
          background: isDarkMode ? '#1C2129' : '#fff',
          border: `1px solid ${borderColor}`,
          borderRadius: 10,
          padding: '8px 14px',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500,
          color: textPrimary,
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
      >
        {isDarkMode ? '\u263E' : '\u2600'} {isDarkMode ? 'Dark' : 'Light'}
      </button>

      <div
        style={{
          display: 'flex',
          gap: 6,
          background: isDarkMode ? '#1C2129' : '#fff',
          border: `1px solid ${borderColor}`,
          borderRadius: 12,
          padding: 4,
          marginBottom: 48
        }}
      >
        {COMPONENTS.map((name) => {
          const isActive = selected === name
          return (
            <button
              key={name}
              onClick={() => setSelected(name)}
              style={{
                padding: '7px 16px',
                borderRadius: 9,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 500,
                transition: 'all 0.2s ease',
                background: isActive
                  ? isDarkMode
                    ? '#2A313C'
                    : '#f0f2f5'
                  : 'transparent',
                color: isActive ? textPrimary : textMuted
              }}
            >
              {name}
            </button>
          )
        })}
      </div>

      {selected === 'BundlephobiaWidget' && (
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          {(['sm', 'md', 'lg'] as const).map((s) => (
            <div
              key={s}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: textMuted,
                  transition: 'color 0.3s ease'
                }}
              >
                {s}
              </span>
              <BundlephobiaWidget
                pkg="smooth-components@1.1.17"
                size={s}
                isDarkMode={isDarkMode}
                {...(s === 'md' && {
                  repository: 'https://github.com/facebook/react'
                })}
              />
            </div>
          ))}
        </div>
      )}

      {selected === 'Poster' && (
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          {(['sm', 'md', 'lg'] as const).map((frameSize) => (
            <div
              key={frameSize}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 10
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  textTransform: 'uppercase',
                  color: textMuted,
                  transition: 'color 0.3s ease'
                }}
              >
                {frameSize}
              </span>
              <Poster
                src="https://cdn.posteritati.com/posters/000/000/074/006/2001-a-space-odyssey-md-web.jpg"
                alt="Poster de prueba"
                frameSize={frameSize}
                hasFrame
                hasGlintEffect
                styles={{ width: '500px' }}
                followCursor
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
