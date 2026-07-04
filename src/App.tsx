import { useState } from 'react'

import { BundlephobiaWidget } from '@/components/BundlephobiaWidget'

export const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

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
          border: `1px solid ${isDarkMode ? '#2A313C' : '#ddd'}`,
          borderRadius: 10,
          padding: '8px 14px',
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: 500,
          color: isDarkMode ? '#F5F7FA' : '#333',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 6
        }}
      >
        {isDarkMode ? '\u263E' : '\u2600'} {isDarkMode ? 'Dark' : 'Light'}
      </button>

      <div style={{ marginBottom: 48 }} />

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
                color: isDarkMode ? '#6B7280' : '#999',
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
    </div>
  )
}
