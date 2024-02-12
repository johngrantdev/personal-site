'use client'
import React, { Fragment } from 'react'

import { Layout as LayoutType } from '../../../payload/payload-types'
import { Padding } from '../Padding'
import RichText from '../RichText'
import { SideColumn } from './SideColumn'

export type LayoutProps = {
  layouts: LayoutType
}

export const Layout: React.FC<LayoutProps> = props => {
  const { layouts } = props

  const hasLayouts = layouts && Array.isArray(layouts) && layouts.length > 0

  if (hasLayouts) {
    return (
      <div>
        {layouts.map((layout, index) => {
          const layoutStyle = layout.mainColumn.style
          const LayoutComponent: React.FC = () => {
            switch (layout.mainColumn.style) {
              case 'singleLayout':
                return <RichText className="w-full" content={layout.mainColumn.row1column1} />
              case 'twoColumns':
                return (
                  <div className="flex w-full gap-4">
                    <RichText className="w-1/2" content={layout.mainColumn.row1column1} />
                    <RichText className="w-1/2" content={layout.mainColumn.row1column2} />
                  </div>
                )
              case 'threeSectionGrid':
                return (
                  <div className="flex w-full gap-4">
                    <RichText className="w-1/2" content={layout.mainColumn.row1column1} />
                    <div className="flex flex-col w-1/2">
                      <RichText className="w-full h-1/2" content={layout.mainColumn.row1column2} />
                      <RichText className="w-full h-1/2" content={layout.mainColumn.row2column2} />
                    </div>
                  </div>
                )
            }
          }
          return (
            <Padding
              key={index}
              fullHeight={layout.fullPageHeight}
              className="snap-start flex flex-col lg:flex-row grow"
            >
              {layout.sideColumn.style !== 'none' && (
                <SideColumn
                  className="flex-none w-full text-center item lg:text-left lg:w-80 overflow-hidden"
                  {...layout.sideColumn}
                />
              )}
              {layoutStyle && <LayoutComponent />}
            </Padding>
          )
        })}
      </div>
    )
  }

  return null
}
