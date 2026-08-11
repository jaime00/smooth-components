import { useState } from 'react'

import { BundlephobiaWidget } from '@/components/BundlephobiaWidget'
import { ContributionsOnGithub } from '@/components/ContributionsOnGithub'
import { HyperLink } from '@/components/HyperLink'
import { Poster } from '@/components/Poster'

type Component =
  | '<BundlephobiaWidget />'
  | '<Poster />'
  | '<HyperLink />'
  | '<ContributionsOnGithub />'

const COMPONENTS: Component[] = [
  '<BundlephobiaWidget />',
  '<Poster />',
  '<HyperLink />',
  '<ContributionsOnGithub />'
]

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [selected, setSelected] = useState<Component>('<BundlephobiaWidget />')
  const [posterUrl, setPosterUrl] = useState(
    'https://cdn.cosmos.so/bbeb8e56-4fbb-4f90-b2fd-9cc8c786d6a3.mp4'
  )

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

      {selected === '<BundlephobiaWidget />' && (
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

      {selected === '<HyperLink />' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            alignItems: 'center',
            color: textPrimary,
            transition: 'color 0.3s ease'
          }}
        >
          <HyperLink href="https://github.com">
            External link (default)
          </HyperLink>

          <HyperLink href="https://github.com" showIcon={false}>
            No icon
          </HyperLink>

          <HyperLink href="https://github.com" showUnderline={false}>
            No underline
          </HyperLink>

          <HyperLink
            href="https://github.com"
            styles={{ color: '#3B82F6', underscoreColor: '#3B82F6' }}
          >
            Custom colors
          </HyperLink>

          <HyperLink
            href="https://github.com/jaime00"
            previewConfig={{
              type: 'custom',
              content: (
                <ContributionsOnGithub
                  username="jaime00"
                  year={2026}
                  isDarkMode={isDarkMode}
                />
              ),
              placement: 'top'
            }}
          >
            GitHub
          </HyperLink>
        </div>
      )}

      {selected === '<Poster />' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem'
          }}
        >
          <input
            type="text"
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
            placeholder="Poster URL"
            style={{
              width: '100%',
              maxWidth: 520,
              padding: '7px 16px',
              borderRadius: 9,
              border: `1px solid ${borderColor}`,
              background: isDarkMode ? '#1C2129' : '#fff',
              color: textPrimary,
              fontSize: 13,
              fontWeight: 500,
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
          />
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
                  src={posterUrl}
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
        </div>
      )}

      {selected === '<ContributionsOnGithub />' && (
        <div
          style={{
            display: 'flex',
            gap: '2rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          {([14, 26, 52] as const).map((w) => (
            <div
              key={w}
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
                {w} weeks
              </span>
              <ContributionsOnGithub
                username="jaime00"
                year={2026}
                isDarkMode={isDarkMode}
                weeks={w}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
