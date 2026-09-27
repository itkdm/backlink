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
  if (relativePath.endsWith('/index.md')) return 'collection'
  return 'webpage'
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
  const isNotFoundPage = pageData.isNotFound === true
  const kind = pageKind(pageData.relativePath)
  const head: HeadConfig[] = [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: siteData.title }],
    ['meta', { property: 'og:locale', content: siteData.lang.replace('-', '_') }],
    ['meta', { property: 'og:title', content: title }],
    ['meta', { property: 'og:description', content: description || siteData.description }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: title }],
    ['meta', { name: 'twitter:description', content: description || siteData.description }]
  ]

  if (frontmatter.noindex === true) head.push(['meta', { name: 'robots', content: 'noindex, follow' }])
  if (isNotFoundPage) head.push(['meta', { name: 'robots', content: 'noindex, follow' }])
  if (typeof frontmatter.author === 'string') head.push(['meta', { name: 'author', content: frontmatter.author }])
  if (!origin || isNotFoundPage) return head

  const canonicalUrl = new URL(pagePath(pageData.relativePath), origin).toString()
  const socialImageAlt = pageData.relativePath.startsWith('en/')
    ? 'Illustration of a directory listing product launch and submission platforms'
    : '插画：收录产品发布与提交平台的目录卡片和链接'
  head.push(
    ['link', { rel: 'canonical', href: canonicalUrl }],
    ['meta', { property: 'og:url', content: canonicalUrl }],
    ['meta', { property: 'og:image', content: new URL('/og-share-v2.jpg', origin).toString() }],
    ['meta', { property: 'og:image:alt', content: socialImageAlt }],
    ['meta', { name: 'twitter:image', content: new URL('/og-share-v2.jpg', origin).toString() }],
    ['meta', { name: 'twitter:image:alt', content: socialImageAlt }]
  )

  const localized = localizedPaths(pageData.relativePath)
  head.push(
    ['link', { rel: 'alternate', hreflang: 'zh-CN', href: new URL(localized.chinese, origin).toString() }],
    ['link', { rel: 'alternate', hreflang: 'en-US', href: new URL(localized.english, origin).toString() }],
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
    const schemaType = kind === 'collection' ? 'CollectionPage' : 'WebPage'
    head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify({
        '@context': 'https://schema.org',
        '@type': schemaType,
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
