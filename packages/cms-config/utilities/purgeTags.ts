// The frontend owns its own cache; invalidation crosses the process boundary.
// Fire-and-forget: a failed purge must not fail the write that triggered it.
export const purgeTags = (...tags: string[]): void => {
  const url = process.env.FRONTEND_PURGE_URL
  const secret = process.env.FRONTEND_PURGE_SECRET
  if (!url || !secret) return

  void fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${secret}` },
    body: JSON.stringify({ tags }),
  }).catch(error => console.warn(`purgeTags: ${tags.join(', ')} failed:`, error.message))
}
