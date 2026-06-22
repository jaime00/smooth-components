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
        alt="Poster con marco small"
        src="./akira.webp"
        frameSize="sm"
        styles={{
          width: '300px',
          height: '450px'
        }}
        hasFrame={true}
        hasGlintEffect={true}
      />
      <Poster
        alt="Poster con marco medium"
        src="./akira.webp"
        frameSize="md"
        styles={{
          width: '300px',
          height: '450px'
        }}
        hasFrame={true}
        hasGlintEffect={true}
      />
      <Poster
        alt="Poster con marco large"
        src="./akira.webp"
        frameSize="lg"
        styles={{
          width: '300px',
          height: '450px'
        }}
        hasFrame={true}
        hasGlintEffect={true}
      />
    </div>
  )
}
