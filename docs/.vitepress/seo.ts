import type { HeadConfig, PageData, SiteData } from 'vitepress'

type SeoOptions = {
  pageData: PageData
  siteData: SiteData
  title: string
  description: string
  siteUrl?: string
}

function normalizeOrigin(siteUrl?: string) {
  if (!siteUrl) return undefined

  try {
    return new URL(siteUrl).origin
  } catch {
    return undefined
  }
}

function pagePath(relativePath: string) {
  const normalized = relativePath.replace(/\\/g, '/')
  if (normalized === 'index.md') return '/'
  if (normalized.endsWith('/index.md')) return `/${normalized.slice(0, -'index.md'.length)}`
  return `/${normalized.replace(/\.md$/, '')}`
}

function pageKind(relativePath: string) {
  if (relativePath === 'index.md' || relativePath === 'en/index.md') return 'website'
  if (relativePath.endsWith('/index.md')) return 'section'
  return 'article'
}

function localizedPaths(relativePath: string) {
  const sourcePath = relativePath.startsWith('en/') ? relativePath.slice(3) : relativePath
  return {
    chinese: pagePath(sourcePath),
    english: pagePath(`en/${sourcePath}`)
  }
}

export function createSeoHead({ pageData, siteData, title, description, siteUrl }: SeoOptions): HeadConfig[] {
  const origin = normalizeOrigin(siteUrl)
  const frontmatter = pageData.frontmatter
  const kind = pageKind(pageData.relativePath)
  const head: HeadConfig[] = [
    ['meta', { property: 'og:type', content: kind === 'article' ? 'article' : 'website' }],
    ['meta', { property: 'og:site_name', content: siteData.title }],
    ['meta', { property: 'og:locale', content: siteData.lang.replace('-', '_') }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description || siteData.description }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description || siteData.description }]
  ]

  if (frontmatter.noindex === true) head.push(['meta', { name: 'robots', content: 'noindex, follow' }])
  if (typeof frontmatter.author === 'string') head.push(['meta', { name: 'author', content: frontmatter.author }])
  if (!origin) return head

  const canonicalUrl = new URL(pagePath(pageData.relativePath), origin).toString()
  head.push(
    ['link', { rel: 'canonical', href: canonicalUrl }],
    ['meta', { property: 'og:url', content: canonicalUrl }]
  )

  const localized = localizedPaths(pageData.relativePath)
  head.push(
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: new URL(localized.chinese, origin).toString() }],
    ['link', { rel: 'alternate', hreflang: 'en', href: new URL(localized.english, origin).toString() }],
    ['link', { rel: 'alternate', hreflang: 'x-default', href: new URL(localized.chinese, origin).toString() }]
  )

  if (kind === 'website') {
    head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteData.title,
        url: canonicalUrl,
        description: description || siteData.description,
        inLanguage: siteData.lang
      })
    ])
  } else {
    head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': kind === 'article' ? 'Article' : 'CollectionPage',
        headline: title,
        name: title,
        description: description || siteData.description,
        url: canonicalUrl,
        inLanguage: siteData.lang,
        isPartOf: { '@type': 'WebSite', name: siteData.title, url: origin }
      })
    ])
  }

  return head
}
