import { defineConfig } from 'vitepress'
import { createSeoHead } from './seo'

const siteUrl = process.env.SITE_URL

export default defineConfig({
  lang: 'zh-CN',
  title: '布吉岛外链导航',
  description: '精选网站、独立产品、SEO 增长与开发工具，帮你更快找到值得访问的互联网资源。',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#f6f7f2' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }]
  ],
  transformHead({ pageData, siteData, title, description }) {
    return createSeoHead({ pageData, siteData, title, description, siteUrl })
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '布吉岛外链导航',
      description: '精选网站、独立产品、SEO 增长与开发工具，帮你更快找到值得访问的互联网资源。',
      themeConfig: {
        siteTitle: '布吉岛外链导航',
        nav: [
          { text: '资源导航', link: '/#directory' },
          { text: 'SEO 与增长', link: '/#seo-growth' },
          { text: 'AI 与开发', link: '/#ai-development' },
          { text: '建站与产品', link: '/#web-products' },
          { text: '关于本站', link: '/about' }
        ],
        sidebar: {
          '/about': [{ text: '关于本站', items: [{ text: '收录原则', link: '/about' }] }]
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
      description: 'A curated directory of useful websites, independent products, growth resources, and developer tools.',
      themeConfig: {
        siteTitle: 'Bujidao Links',
        nav: [
          { text: 'Directory', link: '/en/#directory' },
          { text: 'SEO & Growth', link: '/en/#seo-growth' },
          { text: 'AI & Development', link: '/en/#ai-development' },
          { text: 'Web & Products', link: '/en/#web-products' },
          { text: 'About', link: '/en/about' }
        ],
        sidebar: {
          '/en/about': [{ text: 'About', items: [{ text: 'Editorial Policy', link: '/en/about' }] }]
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
