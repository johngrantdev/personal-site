import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag } from 'next/cache'

// Revalidate only header and footer tags when the Site global is updated.
export const revalidateHeaderFooter: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context?.disableRevalidate) {
    payload.logger.info(`Revalidating header and footer from Site global`)
    revalidateTag('global_header')
    revalidateTag('global_footer')
  }
  return doc
}
