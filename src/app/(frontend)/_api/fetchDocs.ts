import config from '@payload-config'
import { getPayload } from 'payload'

export const fetchDocs = async <T>(collection: 'pages' | 'posts'): Promise<T[]> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection,
    depth: 3,
    overrideAccess: false,
    pagination: false,
  })

  return docs as T[]
}
