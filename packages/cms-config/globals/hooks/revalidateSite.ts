import type { GlobalAfterChangeHook } from 'payload'

import { purgeTags } from '../../utilities/purgeTags'

// Site settings are read by the root layout, so purging this tag invalidates
// every route that rendered it.
export const revalidateSite: GlobalAfterChangeHook = ({ doc }) => {
  purgeTags('site-settings')

  return doc
}
