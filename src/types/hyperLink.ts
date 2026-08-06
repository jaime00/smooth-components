import type { CSSProperties, ElementType, ReactNode } from 'react'

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
}
