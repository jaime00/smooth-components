import type { ComponentPropsWithoutRef, Ref } from 'react'

export interface ExternalLinkIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

export interface ExternalLinkIconProps extends ComponentPropsWithoutRef<'span'> {
  size?: number
  ref?: Ref<ExternalLinkIconHandle>
}

export declare function ExternalLinkIcon(
  props: ExternalLinkIconProps
): React.JSX.Element
