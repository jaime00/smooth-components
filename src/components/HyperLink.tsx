import type { ExternalLinkIconHandle } from '@/assets/animatedIcons/ExternalLinkIcon'
import { ExternalLinkIcon } from '@/assets/animatedIcons/ExternalLinkIcon'
import type { ElementType } from 'react'
import { useRef } from 'react'

import {
  HYPERLINK_EXTERNAL,
  HYPERLINK_SHOW_ICON,
  HYPERLINK_SHOW_UNDERLINE,
  HYPERLINK_UNDERSCORE_COLOR
} from '@/constants/hyperLink'

import '@/styles/hyperLink.css'

import type { HyperLinkProps } from '@/types/hyperLink'

export function HyperLink<C extends ElementType = 'a'>({
  as,
  href,
  children,
  external = HYPERLINK_EXTERNAL,
  showIcon = HYPERLINK_SHOW_ICON,
  icon,
  styles,
  className,
  contentClassName,
  showUnderline = HYPERLINK_SHOW_UNDERLINE,
  ...rest
}: HyperLinkProps<C> &
  Omit<React.ComponentPropsWithoutRef<C>, keyof HyperLinkProps<C>>) {
  const iconRef = useRef<ExternalLinkIconHandle>(null)

  const underscoreColor = styles?.underscoreColor ?? HYPERLINK_UNDERSCORE_COLOR
  const textColor = styles?.color

  const Component = as ?? 'a'
  const isAnchor = Component === 'a'

  const sharedClass = `hyperlink${className ? ` ${className}` : ''}`
  const sharedStyle = textColor ? { color: textColor } : undefined

  const inner = (
    <>
      <span
        className={`hyperlink-content${contentClassName ? ` ${contentClassName}` : ''}`}
      >
        {showIcon &&
          isAnchor &&
          (icon ?? (
            <ExternalLinkIcon
              ref={iconRef}
              size={14}
              className="text-current"
            />
          ))}
        {children}
      </span>
      {showUnderline && (
        <span
          className="hyperlink-underline"
          style={{ backgroundColor: underscoreColor }}
        />
      )}
    </>
  )

  const componentProps = {
    className: sharedClass,
    style: sharedStyle,
    ...(isAnchor
      ? {
          href,
          ...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
          onMouseEnter: () => iconRef.current?.startAnimation(),
          onMouseLeave: () => iconRef.current?.stopAnimation()
        }
      : {}),
    ...rest
  }

  return <Component {...componentProps}>{inner}</Component>
}
