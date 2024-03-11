import React from 'react'

import { Layout as LayoutType } from '../../../payload/payload-types'
import { Column, Layout } from '../Layout'
import { MainColumn } from './MainColumn'
import { SideColumn } from './SideColumn'

export type LayoutsProps = {
  layouts: LayoutType
}

export const Layouts: React.FC<LayoutsProps> = props => {
  const { layouts } = props

  const hasLayouts = layouts && Array.isArray(layouts) && layouts.length > 0

  if (hasLayouts) {
    return (
      <div className="flex flex-col gap-y-4">
        {layouts.map((layout, index) => {
          const top = index === 0 ? true : false
          const bottom = index === layouts.length - 1 ? true : false
          const sideColumn = layout.sideColumn.style !== 'none'
          const hasTOC = layout.sideColumn.style === 'postHero'
          return (
            <div key={index}>
              <Layout
                sideColumn={sideColumn}
                top={top}
                bottom={bottom}
                fullheight={layout.fullPageHeight}
              >
                <Column position="side">
                  <SideColumn {...layout.sideColumn} position={layout.sideContentPosition} />
                </Column>
                <Column position="main">
                  <MainColumn {...layout.mainColumn} hasTOC />
                </Column>
              </Layout>
            </div>
          )
        })}
      </div>
    )
  }

  return null
}
