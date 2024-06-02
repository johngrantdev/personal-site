import type { AfterChangeHook } from 'payload/dist/collections/config/types'

// this function doesn't work for payload 3 

export const loginAfterCreate: AfterChangeHook = async ({
  doc,
  operation,
  req,
  req: { body = {}, payload, res },
}) => {
  if (operation === 'create' && !req.user) {
    const { email, password } = body

    if (email && password) {
      const { token, user } = await payload.login({
        collection: 'users',
        data: { email, password },
        req,
        res,
      })

      return {
        ...doc,
        token,
        user,
      }
    }
  }

  return doc
}
