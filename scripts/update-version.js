import { writeFileSync, readFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const pkgPath = resolve(__dirname, '../package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))

const content = `// Автоматически генерируется из package.json
export const VERSION = '${pkg.version}'
export const APP_NAME = '${pkg.name || 'Team Pulse'}'
`

writeFileSync(resolve(__dirname, '../config/version.ts'), content)
console.log(`✅ Version ${pkg.version} synced to config/version.ts`)