import { defineConfig } from 'vitepress'
import { createSeoHead } from './seo'
import { directoryLinks } from './data/links'

const siteUrl = process.env.SITE_URL
const canonicalOrigin = new URL(siteUrl || 'https://apilaile.com').origin

export default defineConfig({
  lang: 'zh-CN',
  title: '布吉岛外链导航',
  description: '查找可提交出海 SaaS、AI 工具和互联网产品的平台目录与发布社区。',
  cleanUrls: true,
  sitemap: { hostname: canonicalOrigin },
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#f6f7f2' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
  ],
  transformHead({ pageData, siteData, title, description }) {
    return createSeoHead({ pageData, siteData, title, description, siteUrl })
  },
  transformPageData(pageData) {
    const id = pageData.params?.id
    const link = directoryLinks.find((item) => item.id === id)
    if (!link || !pageData.filePath.includes('directory/[id].md')) return

    const isEnglish = pageData.filePath.startsWith('en/')
    const name = link.name[isEnglish ? 'en' : 'zh']
    const description = link.description[isEnglish ? 'en' : 'zh']
    return {
      title: isEnglish ? `${name} Submission Site` : `${name} 提交平台`,
      description: isEnglish
        ? `${description} View its fees, requirements, review process, and backlink details.`
        : `${description} 查看${name}的费用、提交要求、审核方式和外链信息。`
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '布吉岛外链导航',
      description: '查找可提交出海 SaaS、AI 工具和互联网产品的平台目录与发布社区。',
      themeConfig: {
        siteTitle: '布吉岛外链导航',
        nav: [
          { text: '首页', link: '/' },
          { text: '广场', link: '/directory/' },
          { text: '关于', link: '/about' }
        ],
        sidebar: {
          '/directory/': [{ text: '广场', items: [{ text: '全部平台', link: '/directory/' }] }],
          '/about': [{ text: '关于', items: [{ text: '概览', link: '/about' }] }]
        },
        outline: { label: '本页目录', level: [2, 3] },
        docFooter: { prev: '上一篇', next: '下一篇' },
        lastUpdated: { text: '最后更新于' },
        footer: {
          message: '发现好网站，让每一次探索都有方向。',
          copyright: 'Copyright © 2026 布吉岛'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Bujidao Link Directory',
      description: 'Find directories and launch communities where you can submit SaaS, AI tools, and internet products.',
      themeConfig: {
        siteTitle: 'Bujidao Links',
        nav: [
          { text: 'Home', link: '/en/' },
          { text: 'Directory', link: '/en/directory/' },
          { text: 'About', link: '/en/about' }
        ],
        sidebar: {
          '/en/directory/': [{ text: 'Directory', items: [{ text: 'All platforms', link: '/en/directory/' }] }],
          '/en/about': [{ text: 'About', items: [{ text: 'Overview', link: '/en/about' }] }]
        },
        outline: { label: 'On this page', level: [2, 3] },
        docFooter: { prev: 'Previous', next: 'Next' },
        lastUpdated: { text: 'Last updated' },
        footer: {
          message: 'Find useful websites. Make every exploration count.',
          copyright: 'Copyright © 2026 Bujidao'
        }
      }
    }
  },
  themeConfig: {
    logo: '/favicon.svg',
    siteTitle: '布吉岛外链导航'
  }
})
