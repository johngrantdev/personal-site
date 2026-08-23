const CACHE_TTL_MS = 5 * 60 * 1000

type Entry<T> = {
  expiresAt: number
  tags: Set<string>
  value: Promise<T>
}

const entries = new Map<string, Entry<unknown>>()

export const cached = <T>(key: string, tags: string[], load: () => Promise<T>): Promise<T> => {
  const existing = entries.get(key) as Entry<T> | undefined
  if (existing && existing.expiresAt > Date.now()) return existing.value

  const entry: Entry<T> = {
    expiresAt: Date.now() + CACHE_TTL_MS,
    tags: new Set(tags),
    value: Promise.resolve().then(load),
  }
  entries.set(key, entry as Entry<unknown>)
  void entry.value.catch(() => {
    if (entries.get(key) === entry) entries.delete(key)
  })
  return entry.value
}

export const purgeCacheTags = (tags: string[]): number => {
  const purgedTags = new Set(tags)
  let count = 0

  for (const [key, entry] of entries) {
    if ([...entry.tags].some(tag => purgedTags.has(tag))) {
      entries.delete(key)
      count++
    }
  }

  return count
}
