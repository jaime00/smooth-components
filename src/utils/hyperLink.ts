import {
  HYPERLINK_PREVIEW_OFFSET,
  HYPERLINK_PREVIEW_PLACEMENT
} from '@/constants/hyperLink'

import type { HyperLinkPreviewConfig } from '@/types/hyperLink'

type PreviewPosition = {
  top: number
  left: number
  effectivePlacement: 'top' | 'bottom'
}

export function computePreviewPosition(
  triggerRect: DOMRect,
  config: HyperLinkPreviewConfig
): PreviewPosition {
  const placement = config.placement ?? HYPERLINK_PREVIEW_PLACEMENT
  const width = config.width ?? 240
  const height = config.height ?? 160
  const offset = HYPERLINK_PREVIEW_OFFSET

  const scrollX = window.scrollX
  const scrollY = window.scrollY

  // Calcular posición vertical con auto-flip
  const spaceAbove = triggerRect.top
  const spaceBelow = window.innerHeight - triggerRect.bottom

  let effectivePlacement = placement
  if (placement === 'top' && spaceAbove < height + offset) {
    effectivePlacement = 'bottom'
  } else if (placement === 'bottom' && spaceBelow < height + offset) {
    effectivePlacement = 'top'
  }

  const top =
    effectivePlacement === 'top'
      ? triggerRect.top + scrollY - height - offset
      : triggerRect.bottom + scrollY + offset

  // Centrar horizontalmente, clamp con margen 8px
  const margin = 8
  let left = triggerRect.left + scrollX + triggerRect.width / 2 - width / 2
  const maxLeft = scrollX + window.innerWidth - width - margin
  const minLeft = scrollX + margin
  left = Math.max(minLeft, Math.min(maxLeft, left))

  return { top, left, effectivePlacement }
}
