export type LinkLanguage = 'zh' | 'en'

export type DirectoryLink = {
  id: string
  category: string
  name: Record<LinkLanguage, string>
  description: Record<LinkLanguage, string>
  url: string
  featured?: boolean
}

export type LinkCategory = {
  id: string
  name: Record<LinkLanguage, string>
  description: Record<LinkLanguage, string>
}

export const categories: LinkCategory[] = [
  {
    id: 'seo-growth',
    name: { zh: 'SEO 与增长', en: 'SEO & Growth' },
    description: { zh: '搜索表现、趋势洞察与网站增长工具。', en: 'Search performance, trend research, and website growth tools.' }
  },
  {
    id: 'ai-development',
    name: { zh: 'AI 与开发', en: 'AI & Development' },
    description: { zh: '构建、部署和管理互联网产品常用的平台。', en: 'Platforms for building, deploying, and maintaining internet products.' }
  },
  {
    id: 'web-products',
    name: { zh: '建站与产品', en: 'Web & Products' },
    description: { zh: '发现新产品、交流创业经验和验证想法。', en: 'Discover products, exchange founder insights, and validate ideas.' }
  },
  {
    id: 'design-data',
    name: { zh: '设计与分析', en: 'Design & Analytics' },
    description: { zh: '制作网站体验、视觉内容和经营数据分析。', en: 'Create web experiences, visual assets, and product insights.' }
  }
]

export const directoryLinks: DirectoryLink[] = [
  {
    id: 'search-console', category: 'seo-growth', featured: true,
    name: { zh: 'Google Search Console', en: 'Google Search Console' },
    description: { zh: '查看 Google 搜索中的网站表现、索引状态与技术问题。', en: 'Monitor search performance, indexing, and technical issues in Google Search.' },
    url: 'https://search.google.com/search-console/about'
  },
  {
    id: 'google-trends', category: 'seo-growth', featured: true,
    name: { zh: 'Google Trends', en: 'Google Trends' },
    description: { zh: '探索不同地区与时间范围内的搜索兴趣变化。', en: 'Explore how search interest changes across regions and time.' },
    url: 'https://trends.google.com/trends/'
  },
  {
    id: 'bing-webmaster', category: 'seo-growth',
    name: { zh: 'Bing Webmaster Tools', en: 'Bing Webmaster Tools' },
    description: { zh: '管理网站在 Bing 搜索中的抓取、索引和表现。', en: 'Manage crawling, indexing, and performance in Bing Search.' },
    url: 'https://www.bing.com/webmasters/'
  },
  {
    id: 'ahrefs-backlink-checker', category: 'seo-growth',
    name: { zh: 'Ahrefs Backlink Checker', en: 'Ahrefs Backlink Checker' },
    description: { zh: '查看网站或页面的部分外链数据，适合快速了解链接概况。', en: 'Check a sample of backlink data for a quick overview of a site or page.' },
    url: 'https://ahrefs.com/backlink-checker'
  },
  {
    id: 'github', category: 'ai-development', featured: true,
    name: { zh: 'GitHub', en: 'GitHub' },
    description: { zh: '托管代码、协作开发，并发现开源项目与开发者工具。', en: 'Host code, collaborate, and explore open-source projects and developer tools.' },
    url: 'https://github.com/'
  },
  {
    id: 'cloudflare', category: 'ai-development',
    name: { zh: 'Cloudflare', en: 'Cloudflare' },
    description: { zh: '提供域名、网络安全、边缘计算和开发平台服务。', en: 'A platform for domains, network security, edge computing, and development.' },
    url: 'https://www.cloudflare.com/'
  },
  {
    id: 'vercel', category: 'ai-development',
    name: { zh: 'Vercel', en: 'Vercel' },
    description: { zh: '面向 Web 项目的前端部署与开发平台。', en: 'A frontend cloud platform for deploying and developing web projects.' },
    url: 'https://vercel.com/'
  },
  {
    id: 'openai-platform', category: 'ai-development',
    name: { zh: 'OpenAI Platform', en: 'OpenAI Platform' },
    description: { zh: '浏览 OpenAI API 文档、开发工具和平台资源。', en: 'Explore OpenAI API documentation, developer tools, and platform resources.' },
    url: 'https://platform.openai.com/'
  },
  {
    id: 'product-hunt', category: 'web-products', featured: true,
    name: { zh: 'Product Hunt', en: 'Product Hunt' },
    description: { zh: '发现每天发布的新产品，并了解创作者与用户反馈。', en: 'Discover newly launched products and explore maker and user feedback.' },
    url: 'https://www.producthunt.com/'
  },
  {
    id: 'indie-hackers', category: 'web-products',
    name: { zh: 'Indie Hackers', en: 'Indie Hackers' },
    description: { zh: '独立创业者分享产品进展、收入经验和经营方法的社区。', en: 'A community where independent founders share product, revenue, and business insights.' },
    url: 'https://www.indiehackers.com/'
  },
  {
    id: 'hacker-news', category: 'web-products',
    name: { zh: 'Hacker News', en: 'Hacker News' },
    description: { zh: '围绕技术、创业和互联网产品的社区讨论。', en: 'Community discussions about technology, startups, and internet products.' },
    url: 'https://news.ycombinator.com/'
  },
  {
    id: 'figma', category: 'design-data',
    name: { zh: 'Figma Community', en: 'Figma Community' },
    description: { zh: '探索设计文件、组件和社区制作的资源。', en: 'Explore design files, components, and resources made by the community.' },
    url: 'https://www.figma.com/community'
  },
  {
    id: 'unsplash', category: 'design-data',
    name: { zh: 'Unsplash', en: 'Unsplash' },
    description: { zh: '浏览可用于创作项目的摄影图片资源。', en: 'Browse photography for creative projects.' },
    url: 'https://unsplash.com/'
  },
  {
    id: 'excalidraw', category: 'design-data',
    name: { zh: 'Excalidraw', en: 'Excalidraw' },
    description: { zh: '用手绘风格画布快速表达流程、想法和结构。', en: 'Quickly sketch flows, ideas, and systems on a hand-drawn canvas.' },
    url: 'https://excalidraw.com/'
  }
]
