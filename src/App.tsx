import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Poster } from './components/Poster/Poster'
const alt = 'Poster de la película la muerte del unicornio'
const src =
  'https://tickets-static-content-uat.cinepolis.com/pimcore/4690/assets/Mexico/Tickets/Movies/LaMuerteDeUnUnicornio/Es/P_ster_720x1022px/resource.jpg'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Poster
      alt={alt}
      hasGlintEffect={false}
      src={src}
      styles={{
        width: '300px',
        height: '450px',
      }}
    />
  </StrictMode>
)
