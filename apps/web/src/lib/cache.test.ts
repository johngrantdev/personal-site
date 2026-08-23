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

// Unbounded keys are attacker-reachable; the map must stay capped.
for (let i = 0; i < 700; i++) await cached(`bulk-${i}`, ['pages'], () => Promise.resolve(i))
assert.equal(await cached('bulk-699', ['pages'], () => Promise.resolve(-1)), 699)
assert.equal(await cached('bulk-0', ['pages'], () => Promise.resolve(-1)), -1)
assert.equal(purgeCacheTags(['pages']) <= 500, true)

console.log('cache bounds self-check passed')
