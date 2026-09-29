import { readFile, rename, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { normalizePlatformDomain, readPlatformRecordSources } from '../docs/.vitepress/data/platform-record-source.mjs'

const projectRoot = process.cwd()
const envPath = resolve(projectRoot, '.env')
const outputPath = resolve(projectRoot, 'docs/.vitepress/data/ahrefs-dr.json')
const endpoint = 'https://api.ahrefs.com/v3/public/domain-rating-free'
const maxTargetsPerRequest = 1000

function parseEnv(contents) {
  return Object.fromEntries(contents.split(/\r?\n/).flatMap((line) => {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (!match || match[1].startsWith('#')) return []
    return [[match[1], match[2].replace(/^(['"])(.*)\1$/, '$2')]]
  }))
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

const recordsDirectory = resolve(projectRoot, 'docs/platform-records')
const records = readPlatformRecordSources(recordsDirectory)
const targets = records.map(({ frontmatter }) => normalizePlatformDomain(frontmatter.homepageUrl))
const checkedAt = new Date().toISOString().slice(0, 10)
const ratings = {}

for (let offset = 0; offset < targets.length; offset += maxTargetsPerRequest) {
  const batch = targets.slice(offset, offset + maxTargetsPerRequest)
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ targets: batch }),
    signal: AbortSignal.timeout(30_000)
  })

  if (!response.ok) {
    throw new Error(`Ahrefs DR request failed with HTTP ${response.status}. Check the API key and Ahrefs API availability.`)
  }

  const payload = await response.json()
  const rows = payload?.domain_rating?.targets
  if (!Array.isArray(rows)) throw new Error('Ahrefs returned an unexpected response format.')

  const batchRatings = new Map()
  for (const row of rows) {
    const domain = typeof row?.target === 'string' ? normalizePlatformDomain(
      row.target.includes('://') ? row.target : `https://${row.target}`
    ) : ''
    const value = row?.domain_rating
    if (!domain || !batch.includes(domain)) throw new Error('Ahrefs returned a target that was not requested.')
    if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 100) {
      throw new Error(`Ahrefs returned an invalid DR value for ${domain}.`)
    }
    if (batchRatings.has(domain)) throw new Error(`Ahrefs returned duplicate results for ${domain}.`)
    batchRatings.set(domain, value)
  }

  const missing = batch.filter((domain) => !batchRatings.has(domain))
  if (missing.length) throw new Error(`Ahrefs response omitted requested domains: ${missing.join(', ')}.`)

  for (const [domain, value] of batchRatings) ratings[domain] = { value, checkedAt }
}

const orderedRatings = Object.fromEntries(Object.entries(ratings).sort(([domainA], [domainB]) => domainA.localeCompare(domainB)))

const tempPath = `${outputPath}.tmp`
try {
  await writeFile(tempPath, `${JSON.stringify({ ratings: orderedRatings }, null, 2)}\n`, 'utf8')
  await rename(tempPath, outputPath)
} catch (error) {
  await import('node:fs/promises').then(({ rm }) => rm(tempPath, { force: true }))
  throw error
}

console.log(`Updated Ahrefs Domain Rating for ${Object.keys(orderedRatings).length} platform domains (${checkedAt}).`)
