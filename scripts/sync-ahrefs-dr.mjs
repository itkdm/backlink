import { readFile, rename, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const projectRoot = process.cwd()
const envPath = resolve(projectRoot, '.env')
const sourcePath = resolve(projectRoot, 'docs/.vitepress/data/links.ts')
const outputPath = resolve(projectRoot, 'docs/.vitepress/data/ahrefs-dr.json')

function parseEnv(contents) {
  return Object.fromEntries(contents.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (!match || match[1].startsWith('#')) return []
    return [[match[1], match[2].replace(/^(['"])(.*)\1$/, '$2')]]
  }))
}

function normalizeDomain(target) {
  try {
    const url = new URL(target.includes('://') ? target : `https://${target}`)
    return url.hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return ''
  }
}

let apiKey = process.env.AHREFS_API_KEY
if (!apiKey) {
  try {
    const env = parseEnv(await readFile(envPath, 'utf8'))
    apiKey = env.AHREFS_API_KEY
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
}
if (!apiKey) throw new Error('AHREFS_API_KEY is missing from the environment and local .env file.')

const source = await readFile(sourcePath, 'utf8')
const targets = [...new Set([...source.matchAll(/homepageUrl\s*:\s*['"]([^'"]+)['"]/g)]
  .map((match) => normalizeDomain(match[1]))
  .filter(Boolean))]
if (!targets.length) throw new Error('No homepage domains were found in links.ts.')

const response = await fetch('https://api.ahrefs.com/v3/public/domain-rating-free', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ targets }),
  signal: AbortSignal.timeout(30_000)
})

if (!response.ok) {
  throw new Error(`Ahrefs DR request failed with HTTP ${response.status}. Check the API key and Ahrefs API availability.`)
}

const payload = await response.json()
const rows = payload?.domain_rating?.targets
if (!Array.isArray(rows)) throw new Error('Ahrefs returned an unexpected response format.')

const checkedAt = new Date().toISOString().slice(0, 10)
const ratings = Object.fromEntries(rows.flatMap((row) => {
  const domain = normalizeDomain(row.target)
  const value = Number(row.domain_rating)
  if (!domain || !Number.isFinite(value)) return []
  return [[domain, { value, checkedAt }]]
}).sort(([domainA], [domainB]) => domainA.localeCompare(domainB)))

const tempPath = `${outputPath}.tmp`
await writeFile(tempPath, `${JSON.stringify({ ratings }, null, 2)}\n`, 'utf8')
await rename(tempPath, outputPath)

console.log(`Updated Ahrefs Domain Rating for ${Object.keys(ratings).length} of ${targets.length} domains (${checkedAt}).`)
