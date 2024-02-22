import React, { forwardRef, Ref } from 'react'

type Props = {
  index?: number
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  fullHeight?: boolean
  className?: string
  children: React.ReactNode
  ref?: Ref<HTMLDivElement>
}

export const Padding: React.FC<Props> = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const {
    index = 0,
    top = false,
    bottom = false,
    left = true,
    right = true,
    fullHeight = false,
    children,
    className,
  } = props

  return (
    <div
      key={index}
      ref={ref}
      className={`${className} w-full mx-auto gap-x-10 gap-y-8 lg:gap-x-24 ${
        top ? 'pt-24' : 'pt-0'
      } ${bottom ? 'pb-12' : 'pb-0'} ${left ? 'pl-6 md:pl-12 2xl:pl-24' : 'pl-0'} ${
        right ? 'pr-6 md:pr-12 2xl:pr-24' : 'pr-0'
      } ${fullHeight && 'min-h-screen overflow-hidden'}`}
    >
      {children}
    </div>
  )
})

Padding.displayName = 'Padding'
