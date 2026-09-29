import type { ContentData } from 'vitepress'
import { readPlatformRecordSources } from './platform-record-source.mjs'
import type {
  BacklinkRel,
  DirectoryLink,
  FeeModel,
  LinkLanguage,
  ListingIndexability,
  LocalizedText,
  LoginRequirement,
  PlatformMarkdown,
  ProductType,
  ReviewMethod
} from './directory-types'

type MarkdownPage = Pick<ContentData, 'url' | 'frontmatter' | 'src'>
type PlatformRecord = PlatformMarkdown['record']

const languages: LinkLanguage[] = ['zh', 'en']
const feeModels: FeeModel[] = ['free', 'paid', 'backlink-free', 'conditional']
const productTypes: ProductType[] = ['website', 'app', 'plugin', 'desktop-software']
const loginRequirements: LoginRequirement[] = ['required', 'not-required', 'conditional', 'unknown']
const reviewMethods: ReviewMethod[] = ['editorial', 'community', 'automated', 'unknown']
const backlinkRels: BacklinkRel[] = ['follow', 'nofollow', 'ugc', 'sponsored', 'mixed', 'unknown']
const indexabilityValues: ListingIndexability[] = ['indexable', 'noindex', 'unknown']

function fail(file: string, message: string): never {
  throw new Error(`Invalid platform Markdown "${file}": ${message}`)
}

function objectValue(value: unknown, path: string, file: string): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) fail(file, `${path} must be an object`)
  return value as Record<string, unknown>
}

function stringValue(value: unknown, path: string, file: string): string {
  if (typeof value !== 'string' || !value.trim()) fail(file, `${path} must be a non-empty string`)
  return value.trim()
}

function localizedValue(value: unknown, path: string, file: string): LocalizedText {
  const object = objectValue(value, path, file)
  return Object.fromEntries(languages.map((language) => [
    language,
    stringValue(object[language], `${path}.${language}`, file)
  ])) as LocalizedText
}

function enumValue<T extends string>(value: unknown, values: readonly T[], path: string, file: string): T {
  if (typeof value !== 'string' || !values.includes(value as T)) {
    fail(file, `${path} must be one of: ${values.join(', ')}`)
  }
  return value as T
}

function enumArray<T extends string>(value: unknown, values: readonly T[], path: string, file: string): T[] {
  if (!Array.isArray(value) || value.length === 0) fail(file, `${path} must be a non-empty array`)
  return value.map((item, index) => enumValue(item, values, `${path}[${index}]`, file))
}

function optionalBoolean(value: unknown, path: string, file: string): boolean | undefined {
  if (value === undefined) return undefined
  if (typeof value !== 'boolean') fail(file, `${path} must be true or false`)
  return value
}

function optionalUrl(value: unknown, fieldPath: string, file: string): string | undefined {
  if (value === undefined || value === null || value === '') return undefined
  const url = stringValue(value, fieldPath, file)
  try {
    const parsed = new URL(url)
    if (parsed.protocol !== 'https:') fail(file, `${fieldPath} must use HTTPS`)
  } catch (error) {
    if (error instanceof Error && error.message.includes('Invalid platform Markdown')) throw error
    fail(file, `${fieldPath} must be a valid URL`)
  }
  return url
}

function parseRecord(frontmatter: Record<string, unknown>, file: string): PlatformRecord {
  const seo = objectValue(frontmatter.seo, 'seo', file)
  const id = stringValue(frontmatter.id, 'id', file)
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) fail(file, 'id must be a lowercase URL slug')
  const sourceSlug = file.split('/').pop()?.replace(/\.(?:md|html?)$/, '')
  if (sourceSlug && sourceSlug !== id) fail(file, `filename must match id "${id}"`)

  const record: PlatformRecord = {
    id,
    sortOrder: Number(frontmatter.sortOrder),
    name: localizedValue(frontmatter.name, 'name', file),
    description: localizedValue(frontmatter.description, 'description', file),
    seo: {
      title: localizedValue(seo.title, 'seo.title', file),
      description: localizedValue(seo.description, 'seo.description', file)
    },
    homepageUrl: stringValue(frontmatter.homepageUrl, 'homepageUrl', file),
    submissionUrl: stringValue(frontmatter.submissionUrl, 'submissionUrl', file),
    feeModels: enumArray(frontmatter.feeModels, feeModels, 'feeModels', file),
    loginRequirement: enumValue(frontmatter.loginRequirement, loginRequirements, 'loginRequirement', file),
    accepts: enumArray(frontmatter.accepts, productTypes, 'accepts', file),
    reviewMethod: enumValue(frontmatter.reviewMethod, reviewMethods, 'reviewMethod', file),
    backlinkRel: enumValue(frontmatter.backlinkRel, backlinkRels, 'backlinkRel', file),
    listingIndexability: enumValue(frontmatter.listingIndexability, indexabilityValues, 'listingIndexability', file),
    availability: enumValue(frontmatter.availability, ['open', 'paused', 'unknown'] as const, 'availability', file),
    verifiedAt: stringValue(frontmatter.verifiedAt, 'verifiedAt', file),
    popular: optionalBoolean(frontmatter.popular, 'popular', file),
    featured: optionalBoolean(frontmatter.featured, 'featured', file)
  }

  if (!Number.isInteger(record.sortOrder) || record.sortOrder < 0) fail(file, 'sortOrder must be a non-negative integer')

  const homepageUrl = optionalUrl(record.homepageUrl, 'homepageUrl', file)
  const submissionUrl = optionalUrl(record.submissionUrl, 'submissionUrl', file)
  if (!homepageUrl || !submissionUrl) fail(file, 'homepageUrl and submissionUrl are required')
  record.homepageUrl = homepageUrl
  record.submissionUrl = submissionUrl

  const pricingUrl = optionalUrl(frontmatter.pricingUrl, 'pricingUrl', file)
  const logoValue = frontmatter.logoUrl
  const logoUrl = typeof logoValue === 'string' && logoValue.startsWith('/')
    ? logoValue
    : optionalUrl(logoValue, 'logoUrl', file)
  if (pricingUrl) record.pricingUrl = pricingUrl
  if (logoUrl) record.logoUrl = logoUrl

  if (!/^\d{4}-\d{2}-\d{2}$/.test(record.verifiedAt) || Number.isNaN(Date.parse(`${record.verifiedAt}T00:00:00Z`))) {
    fail(file, 'verifiedAt must use YYYY-MM-DD format')
  }

  return record
}

function extractBody(src: string | undefined, file: string): LocalizedText {
  if (!src) fail(file, 'Markdown body is required')
  const sections = new Map<LinkLanguage, string>()
  const marker = /<!--\s*locale:(zh|en)\s*-->([\s\S]*?)(?=<!--\s*locale:(?:zh|en)\s*-->|$)/g

  for (const match of src.matchAll(marker)) {
    const language = match[1] as LinkLanguage
    if (sections.has(language)) fail(file, `body contains more than one ${language} section`)
    const body = match[2].trim()
    if (!body) fail(file, `${language} body section must not be empty`)
    if (!/\[[^\]]+\]\(https?:\/\/[^)]+\)/.test(body)) fail(file, `${language} body must include at least one official source link`)
    sections.set(language, body)
  }

  for (const language of languages) {
    if (!sections.has(language)) fail(file, `body is missing <!-- locale:${language} --> section`)
  }

  return { zh: sections.get('zh')!, en: sections.get('en')! }
}

function normalizeDomain(url: string): string {
  return new URL(url).hostname.toLowerCase().replace(/^www\./, '').replace(/\.$/, '')
}

function assertUnique(records: PlatformMarkdown[]) {
  const ids = new Map<string, string>()
  const domains = new Map<string, string>()

  for (const { record } of records) {
    const priorId = ids.get(record.id)
    if (priorId) throw new Error(`Duplicate platform id "${record.id}" in ${priorId} and ${record.id}.md.`)
    ids.set(record.id, `${record.id}.md`)

    const domain = normalizeDomain(record.homepageUrl)
    const priorDomain = domains.get(domain)
    if (priorDomain) throw new Error(`Duplicate platform domain "${domain}" in ${priorDomain} and ${record.id}.md.`)
    domains.set(domain, `${record.id}.md`)
  }
}

export function parsePlatformPages(pages: MarkdownPage[]): PlatformMarkdown[] {
  const records = pages.map((page) => {
    const file = page.url || 'unknown.md'
    return {
      record: parseRecord(objectValue(page.frontmatter, 'frontmatter', file), file),
      body: extractBody(page.src, file)
    }
  })

  assertUnique(records)
  const sortOrders = new Set<number>()
  for (const { record } of records) {
    if (sortOrders.has(record.sortOrder)) throw new Error(`Duplicate platform sortOrder "${record.sortOrder}".`)
    sortOrders.add(record.sortOrder)
  }
  return records.sort((a, b) => a.record.sortOrder - b.record.sortOrder)
}

export async function loadPlatformPages(): Promise<PlatformMarkdown[]> {
  const pages = readPlatformRecordSources().map(({ file, source, frontmatter }) => ({
    url: `/platform-records/${file}`,
    frontmatter,
    src: source
  }))
  return parsePlatformPages(pages)
}

export function searchableText(body: string): string {
  return body
    .replace(/<!--.*?-->/gs, ' ')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[#*_>`~-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}
