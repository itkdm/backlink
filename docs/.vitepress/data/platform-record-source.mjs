import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

function fail(file, message) {
  throw new Error(`Invalid platform Markdown "${file}": ${message}`)
}

export function normalizePlatformDomain(value) {
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return ''
    return url.hostname.toLowerCase().replace(/^www\./, '').replace(/\.$/, '')
  } catch {
    return ''
  }
}

export function readPlatformRecordSources(recordsDirectory = path.resolve(process.cwd(), 'docs', 'platform-records')) {
  const files = readdirSync(recordsDirectory)
    .filter((file) => file.endsWith('.md'))
    .sort((a, b) => a.localeCompare(b))

  if (!files.length) throw new Error(`No platform Markdown records found in ${recordsDirectory}.`)

  const ids = new Set()
  const domains = new Map()

  return files.map((file) => {
    const source = readFileSync(path.join(recordsDirectory, file), 'utf8')
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
    if (!match) fail(file, 'frontmatter must be a JSON-compatible YAML object between --- markers')

    let frontmatter
    try {
      frontmatter = JSON.parse(match[1])
    } catch {
      fail(file, 'frontmatter must be valid JSON-compatible YAML')
    }

    if (!frontmatter || typeof frontmatter !== 'object' || Array.isArray(frontmatter)) {
      fail(file, 'frontmatter must be an object')
    }

    const { id, homepageUrl } = frontmatter
    if (typeof id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
      fail(file, 'id must be a lowercase URL slug')
    }
    if (file !== `${id}.md`) fail(file, `filename must match id "${id}"`)
    if (ids.has(id)) fail(file, `duplicate id "${id}"`)
    ids.add(id)

    if (typeof homepageUrl !== 'string' || !homepageUrl.trim()) fail(file, 'homepageUrl must be a non-empty HTTPS URL')
    const domain = normalizePlatformDomain(homepageUrl)
    if (!domain) fail(file, 'homepageUrl must be a valid HTTPS URL')
    const priorFile = domains.get(domain)
    if (priorFile) fail(file, `homepageUrl domain "${domain}" is already used in ${priorFile}`)
    domains.set(domain, file)

    return { file, source, frontmatter }
  })
}
