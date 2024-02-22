'use client'
import React, { forwardRef, ReactElement, ReactNode, Ref } from 'react'

import { Padding } from '../Padding'

export type ColumnProps = {
  className?: string
  children: ReactNode
  position: 'side' | 'main'
}

export const Column: React.FC<ColumnProps> = ({ children, className = '' }) => (
  <div className={`${className} w-full`}>{children}</div>
)

export type LayoutProps = {
  ref?: Ref<HTMLDivElement>
  children: ReactNode
  className?: string
  index?: number
  top?: boolean
  bottom?: boolean
  right?: boolean
  left?: boolean
  sideColumn?: boolean
  fullheight?: boolean
}

export const Layout: React.FC<LayoutProps> = forwardRef<HTMLDivElement, LayoutProps>(
  (props, ref) => {
    const {
      children,
      className = '',
      index = 0,
      top = false,
      bottom = false,
      right = true,
      left = true,
      sideColumn = true,
      fullheight = false,
    } = props

    const sideColumnChildren = React.Children.toArray(children).filter(
      (child): child is ReactElement =>
        React.isValidElement(child) && child.props.position === 'side',
    )
    const mainColumnChildren = React.Children.toArray(children).filter(
      (child): child is ReactElement =>
        React.isValidElement(child) && child.props.position === 'main',
    )

    return (
      <Padding
        ref={ref}
        index={index}
        top={top}
        bottom={bottom}
        right={right}
        left={left}
        className={`${className} snap-start flex flex-col xl:flex-row grow`}
      >
        {sideColumn && (
          <div className="flex-none w-full text-center item xl:text-left xl:w-80">
            {sideColumnChildren}
          </div>
        )}
        <div className="flex w-full gap-4">{mainColumnChildren}</div>
      </Padding>
    )
  },
)
