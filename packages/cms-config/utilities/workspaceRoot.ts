import fs from 'fs'
import path from 'path'

// Anchored on cwd, not import.meta.url: this module gets bundled by Vite, which
// rewrites the module URL into dist/.
export const workspaceRoot = (): string => {
  for (let dir = process.cwd(); ; dir = path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, 'pnpm-workspace.yaml'))) return dir
    if (dir === path.dirname(dir)) return process.cwd()
  }
}
