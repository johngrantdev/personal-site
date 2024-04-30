import React, { useEffect, useState } from 'react'
import type { Props } from 'payload/components/views/Cell'

const ThumbnailCell: React.FC<Props> = props => {
  const { cellData = '', rowData } = props
  const [url, setUrl] = useState('')

  useEffect(() => {
    if (cellData) {
      const apiUrl = `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/payload/uploads/${cellData}`

      fetch(apiUrl, {
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
