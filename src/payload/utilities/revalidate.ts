import type { Payload } from 'payload'

export const revalidate = async (args: {
  collection: string
  slugs: string[]
  payload: Payload
}): Promise<void> => {
  const { collection, slugs, payload } = args

  try {
    if (slugs.length > 0) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/next/revalidate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          secret: process.env.REVALIDATION_KEY,
          collection,
          slugs,
        }),
      })

      if (res.ok) {
        payload.logger.info(`Revalidated slugs ${slugs} in collection '${collection}'`)
      } else {
        const errorText = await res.text()
        payload.logger.error(`Error revalidating collection '${collection}': ${errorText}`)
      }
    } else {
      payload.logger.info(`'${collection}' is empty, skipping revalidation.`)
    }
  } catch (err: unknown) {
    payload.logger.error(
      `Error hitting revalidate route for collection '${collection}': ${
        err instanceof Error ? err.message : err
      }`,
    )
  }
}
