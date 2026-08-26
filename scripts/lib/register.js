/**
 * Registers the extensionless-import resolver, once, for plain-node runs.
 * Under vitest the Vite resolver already handles it, so this is a no-op there.
 */
import { register } from 'node:module'

let done = false
export function registerResolveHooks() {
  if (done || process.env.VITEST) return
  done = true
  try {
    register('./resolve-hooks.mjs', import.meta.url)
  } catch (err) {
    console.error('could not register resolve hooks:', err.message)
  }
}
