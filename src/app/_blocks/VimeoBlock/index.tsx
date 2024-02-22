'use client'
/* eslint-disable import/no-cycle */
import React from 'react'
import { StaticImageData } from 'next/image'

import { VimeoBlock as VimeoBlockType } from '../../../payload/payload-types'
import VimeoVideo from '../../_components/VimeoVideo'

type Props = VimeoBlockType & {
  staticImage?: StaticImageData
  id?: number | string
}

export const VimeoBlock: React.FC<Props> = props => {
  const { id, videoId, staticImage } = props

  return <VimeoVideo id={id} videoId={videoId} />
}
