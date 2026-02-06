import "@/styles/poster.css";

import { OPACITY_DEFAULT, WIDTH_DEFAULT, HEIGHT_DEFAULT, HAS_GLINT_EFFECT } from "@/constants/poster";

import type { PosterProps } from "@/types/poster";

export const Poster = (props: PosterProps) => {
  const { alt, hasGlintEffect = HAS_GLINT_EFFECT, src, styles } = props;
  const { opacity = OPACITY_DEFAULT, height = HEIGHT_DEFAULT, width = WIDTH_DEFAULT } = styles ?? {};

  return (
    <div
      className="poster-container"
      style={{
        opacity,
        height,
        width,
      }}
    >
      <img alt={alt} src={src} className="poster-image" />
      {hasGlintEffect && <div className="poster-image-glint"></div>}
    </div>
  );
};
