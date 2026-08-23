'use client'

import type { DefaultCellComponentProps } from 'payload'
import React, { useEffect, useState } from 'react'

const ThumbnailCell: React.FC<DefaultCellComponentProps> = ({ cellData = '' }) => {
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (cellData) {
      fetch(`/api/payload/uploads/${cellData}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          setUrl(data.url)
        })
        .catch()
    }
  }, [cellData])

  return url ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={url} style={{ maxWidth: '24em', height: 'auto' }} />
  ) : (
    <>No image available</>
  )
}

export default ThumbnailCell
