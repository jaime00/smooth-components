import type { JSX } from 'react'
import './Poster.css'
import {
  OPACITY_DEFAULT,
  WIDTH_DEFAULT,
  HEIGHT_DEFAULT,
  BORDER_COLOR,
  HAS_GLINT_EFFECT,
} from '../../constants/poster'
import type { PosterProps } from '../../types/poster'

export const Poster = ({
  alt,
  src,
  styles,
  hasGlintEffect = HAS_GLINT_EFFECT,
}: PosterProps): JSX.Element => {
  const {
    opacity = OPACITY_DEFAULT,
    height = HEIGHT_DEFAULT,
    width = WIDTH_DEFAULT,
    borderColor = BORDER_COLOR,
  } = styles ?? {}

  return (
    <div
      className="poster-container"
      style={{
        opacity,
        height,
        width,
        borderColor,
      }}
    >
      <img alt={alt} src={src} className="poster-image" />
      {hasGlintEffect && <div className="poster-image-glint"></div>}
    </div>
  )
}
