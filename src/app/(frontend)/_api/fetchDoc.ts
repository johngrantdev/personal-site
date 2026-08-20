import config from '@payload-config'
import { getPayload } from 'payload'

import type { User } from '@/payload/payload-types'
import { payloadToken } from './token'

export const fetchDoc = async <T>(args: {
  collection: 'pages' | 'posts'
  slug?: string
  draft?: boolean
}): Promise<T> => {
  const { collection, slug, draft } = args || {}
  const payload = await getPayload({ config })
  let user: User | undefined

  if (draft) {
    const { cookies } = await import('next/headers')
    const token = (await cookies()).get(payloadToken)?.value

    if (token) {
      const headers = new Headers({ Authorization: `JWT ${token}` })
      user = (await payload.auth({ headers })).user as User | undefined
    }
  }

  const { docs } = await payload.find({
    collection,
    depth: 3,
    draft,
    limit: 1,
    overrideAccess: false,
    user,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return docs[0] as T
}
