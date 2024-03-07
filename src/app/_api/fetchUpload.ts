import type { Upload } from '../../payload/payload-types'
import { UPLOAD_BY_ID } from '../_graphql/uploads'

export const fetchUpload = async (id: number): Promise<Upload> => {
  const response = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/payload/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: UPLOAD_BY_ID,
      variables: { id },
    }),
  })

  const jsonResponse = await response.json()

  if (jsonResponse.errors) {
    throw new Error(jsonResponse.errors[0].message)
  }

  return jsonResponse.data.media as Upload
}
