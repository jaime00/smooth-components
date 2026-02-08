import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Poster } from '@/components/Poster'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <Poster
        alt="Poster de la película la muerte del unicornio"
        src="./akira.webp"
        styles={{
          width: '300px',
          height: '450px'
        }}
      />
    </div>
  </StrictMode>
)
