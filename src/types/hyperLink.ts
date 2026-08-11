import type { CSSProperties, ElementType, ReactNode } from 'react'

export type HyperLinkPreviewConfig = {
  type: 'image' | 'video' | 'gif' | 'custom'
  src?: string
  alt?: string
  content?: ReactNode
  placement?: 'top' | 'bottom'
  width?: number
  height?: number
  borderRadius?: number
  delay?: number
  backgroundColor?: string
}

export type HyperLinkStyles = Pick<CSSProperties, 'color'> & {
  underscoreColor?: string
}

export type HyperLinkProps<C extends ElementType = 'a'> = {
  as?: C
  children: ReactNode
  href?: string
  external?: boolean
  showIcon?: boolean
  icon?: ReactNode
  styles?: HyperLinkStyles
  className?: string
  contentClassName?: string
  showUnderline?: boolean
  previewConfig?: HyperLinkPreviewConfig
}
