import React, { forwardRef, Ref } from 'react'

type Props = {
  index?: number
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const PageMargin = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { index = 0, children, className } = props

  return (
    <div
      key={index}
      ref={ref}
      className={`${className} w-svw max-w-container mx-auto px-6 md:px-12`}
    >
      {children}
    </div>
  )
})

PageMargin.displayName = 'PageMargin'
