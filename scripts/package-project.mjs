import { readFile, writeFile, mkdir, mkdtemp, lstat } from 'node:fs/promises'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { zipSync, unzipSync } from 'fflate'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const allowlist = [
  'README.md', '.env.example', '.gitignore', 'package.json', 'pnpm-lock.yaml',
  'pnpm-workspace.yaml', 'next.config.mjs', 'next-env.d.ts', 'postcss.config.mjs',
  'tsconfig.json', 'components.json',
  'app/page.tsx', 'app/layout.tsx', 'app/globals.css', 'app/icon.tsx', 'app/not-found.tsx',
  'app/pgs/page.tsx', 'app/pgs/[slug]/page.tsx', 'app/login/page.tsx', 'app/signup/page.tsx',
  'app/owner/page.tsx', 'app/account/page.tsx', 'app/setup/page.tsx',
  'components/site-header.tsx', 'components/site-footer.tsx', 'components/home-sections.tsx',
  'components/search-form.tsx', 'components/discovery-filters.tsx', 'components/auth-entry.tsx',
  'components/faq.tsx', 'components/ui/button.tsx', 'components/ui/field.tsx',
  'components/ui/input.tsx', 'components/ui/label.tsx', 'components/ui/separator.tsx',
  'components/ui/alert.tsx', 'components/ui/empty.tsx', 'components/ui/accordion.tsx',
  'lib/utils.ts', 'lib/search.ts', 'public/images/chalopg-home.png',
  'public/images/shared-room.png', 'public/images/private-room.png',
  'scripts/package-project.mjs',
].sort()
const content = {}
for (const name of allowlist) {
  if (name.startsWith('/') || name.includes('..') || name.includes('\\')) throw new Error('Unsafe archive path')
  const absolute = resolve(root, name)
  const stat = await lstat(absolute)
  if (!stat.isFile() || stat.isSymbolicLink()) throw new Error(`Refusing non-regular file: ${name}`)
  const bytes = new Uint8Array(await readFile(absolute))
  if (!name.endsWith('.png')) {
    const text = new TextDecoder().decode(bytes)
    if (/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/.test(text) || /postgres(?:ql)?:\/\/[^\s]+:[^\s]+@/.test(text)) throw new Error(`Potential credentials in ${name}`)
  }
  content[name] = [bytes, { mtime: new Date('2026-01-01T00:00:00Z') }]
}
const archive = zipSync(content, { level: 6 })
const unpacked = unzipSync(archive)
if (JSON.stringify(Object.keys(unpacked).sort()) !== JSON.stringify(allowlist)) throw new Error('Archive allowlist mismatch')
const output = join(root, 'public/downloads/chalopg-source.zip')
await mkdir(dirname(output), { recursive: true })
await writeFile(output, archive)
console.log(`Created source checkpoint: ${allowlist.length} allowlisted files; ${archive.byteLength} bytes.`)
console.log(allowlist.join('\n'))
if (process.argv.includes('--verify')) {
  const target = await mkdtemp(join(tmpdir(), 'chalopg-source-check-'))
  for (const [name, data] of Object.entries(unpacked)) {
    const destination = join(target, name)
    await mkdir(dirname(destination), { recursive: true })
    await writeFile(destination, data)
  }
  for (const args of [['install', '--frozen-lockfile'], ['build'], ['exec', 'tsc', '--noEmit']]) {
    const result = spawnSync('pnpm', args, { cwd: target, stdio: 'inherit' })
    if (result.status !== 0) throw new Error(`Extracted project check failed: pnpm ${args.join(' ')}`)
  }
  console.log('Extracted source installation, production build and TypeScript check passed.')
}
