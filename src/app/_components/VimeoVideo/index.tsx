'use client'
import React from 'react'
import ReactPlayer from 'react-player/vimeo'

const VimeoVideo = ({ videoId, id }) => {
  return (
    <div className="flex w-full h-full aspect-video">
      <ReactPlayer
        url={`https://vimeo.com/${videoId}`}
        width="100%"
        height="100%"
        controls={true}
      />
    </div>
  )
}

export default VimeoVideo
