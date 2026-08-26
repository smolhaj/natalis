/**
 * Node ESM resolve hook: extensionless relative imports.
 *
 * src/engine/*.js imports its siblings without a file extension ("./character",
 * "../data/countries") because Vite resolves those. Plain node does not, so any
 * audit or simulation script that wants to run the REAL engine — rather than a
 * re-implementation of it, which would defeat the purpose — needs this.
 */
import { existsSync } from 'fs'
import { fileURLToPath, pathToFileURL } from 'url'

const CANDIDATES = ['.js', '.mjs', '/index.js']

export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context)
  } catch (err) {
    if (!specifier.startsWith('.') && !specifier.startsWith('/')) throw err
    const base = context.parentURL ? new URL(specifier, context.parentURL) : pathToFileURL(specifier)
    for (const ext of CANDIDATES) {
      const candidate = new URL(base.href + ext)
      if (existsSync(fileURLToPath(candidate))) {
        return { url: candidate.href, shortCircuit: true, format: 'module' }
      }
    }
    throw err
  }
}
