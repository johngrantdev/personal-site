import { revalidateTag } from 'next/cache'

// Next 16 requires a cacheLife profile; 'max' purges the entry outright.
export const purgeTags = (...tags: string[]): void => {
  tags.forEach(tag => revalidateTag(tag, 'max'))
}
