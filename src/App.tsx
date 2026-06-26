import { Poster } from '@/components/Poster'

export const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2rem',
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <Poster
        alt="Poster con animación scale"
        src="./akira.webp"
        styles={{
          width: '300px',
          height: '450px'
        }}
        hasGlintEffect={true}
        onClick={() => console.log('clicked')}
      />
    </div>
  )
}
