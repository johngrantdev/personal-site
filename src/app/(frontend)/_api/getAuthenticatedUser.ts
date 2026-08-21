import config from '@payload-config'
import { getPayload } from 'payload'

import type { User } from '@/payload/payload-types'
import { payloadToken } from './token'

export const getAuthenticatedUser = async (): Promise<User | undefined> => {
  const { cookies } = await import('next/headers')
  const token = (await cookies()).get(payloadToken)?.value

  if (!token) return undefined

  const payload = await getPayload({ config })
  const headers = new Headers({ Authorization: `JWT ${token}` })
  return (await payload.auth({ headers })).user as User | undefined
}
