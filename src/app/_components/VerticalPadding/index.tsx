import React from 'react'

export type VerticalPaddingOptions = 'large' | 'medium' | 'none'
type Props = {
  top?: VerticalPaddingOptions
  bottom?: VerticalPaddingOptions
  children: React.ReactNode
  className?: string
}

export const VerticalPadding: React.FC<Props> = ({
  top = 'pt-14',
  bottom = 'pb-14',
  className,
  children,
}) => {
  let topStyle: string
  let bottomStyle: string

  switch (top) {
    case 'large':
      topStyle = 'pt-24'
      break
    case 'medium':
      topStyle = 'pt-14'
      break
    case 'none':
      topStyle = 'pt-0'
      break
  }

  switch (bottom) {
    case 'large':
      bottomStyle = 'pb-24'
      break
    case 'medium':
      bottomStyle = 'pb-14'
      break
    case 'none':
      bottomStyle = 'pb-0'
      break
  }

  return (
    <div className={[className, topStyle, bottomStyle].filter(Boolean).join(' ')}>{children}</div>
  )
}
