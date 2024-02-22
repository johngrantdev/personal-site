'use client'

import React, { useEffect, useRef } from 'react'

import { Media } from '../../../../payload/payload-types'
import { Props as MediaProps } from '../types'

export const Video: React.FC<MediaProps> = props => {
  const { videoClassName, resource, onClick } = props

  const videoRef = useRef<HTMLVideoElement>(null)
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef
    if (video) {
      video.addEventListener('suspend', () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      })
    }
  }, [])

  if (resource && typeof resource === 'object') {
    const { filename } = resource as Media

    return (
      // add video styles
      <video
        playsInline
        autoPlay
        muted
        loop
        controls={false}
        className={['max-w-full w-full bg-zinc-600 rounded-sm sm:rounded-md', videoClassName]
          .filter(Boolean)
          .join(' ')}
        onClick={onClick}
        ref={videoRef}
      >
        <source src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`} />
      </video>
    )
  }

  return null
}
