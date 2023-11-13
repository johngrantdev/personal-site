import React from 'react'

export type VerticalPaddingOptions = 'large' | 'medium' | 'none'

type Props = {
  top?: VerticalPaddingOptions
  bottom?: VerticalPaddingOptions
  children: React.ReactNode
  className?: string
}

export const VerticalPadding: React.FC<Props> = ({
  top = 'px-14',
  bottom = 'pb-14',
  className,
  children,
}) => {
  return (
    // add classes[`top-${top}`], classes[`bottom-${bottom} styles
    <div className={[className, top, bottom].filter(Boolean).join(' ')}>{children}</div>
  )
}
