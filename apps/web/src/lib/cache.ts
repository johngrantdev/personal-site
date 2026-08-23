const CACHE_TTL_MS = 5 * 60 * 1000
// Keys derive from request paths, so the map is attacker-growable without a cap.
const MAX_ENTRIES = 500

type Entry<T> = {
  expiresAt: number
  tags: Set<string>
  value: Promise<T>
}

const entries = new Map<string, Entry<unknown>>()

const evict = () => {
  const now = Date.now()
  for (const [key, entry] of entries) if (entry.expiresAt <= now) entries.delete(key)
  // Map iterates in insertion order, so the front is the oldest.
  for (const key of entries.keys()) {
    if (entries.size <= MAX_ENTRIES) break
    entries.delete(key)
  }
}

export const cached = <T>(key: string, tags: string[], load: () => Promise<T>): Promise<T> => {
  const existing = entries.get(key) as Entry<T> | undefined
  if (existing && existing.expiresAt > Date.now()) return existing.value

  const entry: Entry<T> = {
    expiresAt: Date.now() + CACHE_TTL_MS,
    tags: new Set(tags),
    value: Promise.resolve().then(load),
  }
  entries.delete(key)
  entries.set(key, entry as Entry<unknown>)
  evict()
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
