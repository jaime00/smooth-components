import type { CSSProperties } from "react";

export type PosterStyles = Pick<CSSProperties, "opacity" | "height" | "width">;

export type PosterProps = {
  alt: string;
  hasGlintEffect?: boolean;
  src: string;
  styles?: PosterStyles;
};
