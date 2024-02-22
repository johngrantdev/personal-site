'use client'
/* eslint-disable import/no-cycle */
import React, { useRef } from 'react'
import { StaticImageData } from 'next/image'

import { MediaBlock as MediaBlockType } from '../../../payload/payload-types'
import { Column, Layout } from '../../_components/Layout'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

type Props = MediaBlockType & {
  staticImage?: StaticImageData
  id?: number | string
}

export const MediaBlock: React.FC<Props> = props => {
  const { id, sideCaption, layout, media1, media2, media3, staticImage } = props

  let caption1
  if (media1 && typeof media1 === 'object') caption1 = media1.caption || ''
  let caption2
  if (media2 && typeof media2 === 'object') caption2 = media2.caption || ''
  let caption3
  if (media3 && typeof media3 === 'object') caption3 = media3.caption || ''

  const ref = useRef(null)

  const layouts = {
    default: {
      side: () => {
        return <RichText className="" content={caption1 || ''} />
      },
      main: () => {
        return (
          <Media
            className="w-full h-full"
            imgClassName="h-full w-full object-cover rounded-md"
            resource={media1}
            src={staticImage}
          />
        )
      },
    },
    twoColumn: {
      side: () => {
        return (
          <div className="grid grid-rows-1 lg:grid-rows-2 grid-flow-col gap-4 h-full">
            <RichText className="" content={caption1 || ''} />
            <RichText className="" content={caption2 || ''} />
          </div>
        )
      },
      main: () => {
        return (
          <div className="grid grid-cols-2 gap-4 h-full">
            <div className="flex-1">
              <Media
                className="lg:row-span-2 w-full h-full"
                imgClassName="h-full w-full object-cover"
                resource={media1}
                src={staticImage}
              />
            </div>
            <div className="flex-1">
              <Media
                className="lg:row-span-2 w-full h-full"
                imgClassName="h-full w-full object-cover"
                resource={media2}
                src={staticImage}
              />
            </div>
          </div>
        )
      },
    },
    heroGrid: {
      side: () => {
        if (caption1 !== '' || caption2 !== '' || caption3 !== '') {
          return (
            <div className="grid gap-4 h-full grid-flow-col md:grid-cols-2 md:grid-rows-1 xl:grid-flow-row xl:grid-cols-1">
              {caption1 !== '' && (
                <RichText className="lg:row-span-2 xl:row-span-1" content={caption1 || ''} />
              )}
              {caption1 !== '' && <RichText className="hidden md:block" content={caption2 || ''} />}
              {caption1 !== '' && <RichText className="hidden lg:block" content={caption3 || ''} />}
            </div>
          )
        } else {
          return null
        }
      },
      main: () => {
        return (
          <div className="grid grid-flow-row grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-4">
            <Media
              className="lg:row-span-2 w-full h-full"
              imgClassName="h-full w-full object-cover"
              resource={media1}
              src={staticImage}
            />
            {sideCaption && caption2 !== '' ? (
              <RichText
                className="block md:hidden self-center text-center"
                content={caption2 || ''}
              />
            ) : null}
            <Media
              className="w-full h-full relative"
              imgClassName="h-full w-full object-cover"
              resource={media2}
              src={staticImage}
            />
            {sideCaption && caption3 !== '' ? (
              <RichText
                className="block lg:hidden self-center text-center md:col-span-2"
                content={caption3 || ''}
              />
            ) : null}
            <Media
              className="w-full h-full md:col-span-2 lg:col-span-1"
              imgClassName="h-full w-full object-cover"
              resource={media3}
              src={staticImage}
            />
          </div>
        )
      },
    },
  }

  const renderLayout = () => {
    if (sideCaption) {
      return (
        <Layout right={false} left={false}>
          <Column position="side">{layouts[layout].side()}</Column>
          <Column position="main">{layouts[layout].main()}</Column>
        </Layout>
      )
    } else {
      return layouts[layout].main()
    }
  }

  return (
    <div id={id} className="h-full">
      {renderLayout()}
    </div>
  )
}
