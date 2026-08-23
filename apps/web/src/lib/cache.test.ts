import assert from 'node:assert/strict'

import { cached, purgeCacheTags } from './cache.ts'

let loads = 0
const load = () => {
  loads++
  return Promise.resolve(loads)
}

const first = cached('cache-test', ['posts'], load)
assert.equal(await cached('cache-test', ['posts'], load), await first)
assert.equal(loads, 1)
assert.equal(purgeCacheTags(['posts']), 1)
assert.equal(await cached('cache-test', ['posts'], load), 2)

console.log('cache self-check passed')
