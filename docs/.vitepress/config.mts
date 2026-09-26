import { defineConfig } from 'vitepress'
import { createSeoHead } from './seo'

const siteUrl = process.env.SITE_URL

export default defineConfig({
  lang: 'zh-CN',
  title: '布吉岛外链导航',
  description: '查找可提交出海 SaaS、AI 工具和互联网产品的平台目录与发布社区。',
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
      description: '查找可提交出海 SaaS、AI 工具和互联网产品的平台目录与发布社区。',
      themeConfig: {
        siteTitle: '布吉岛外链导航',
        nav: [
          { text: '提交平台', link: '/#directory' },
          { text: 'SaaS 目录', link: '/#saas-directories' },
          { text: 'AI 目录', link: '/#ai-directories' },
          { text: '发布社区', link: '/#launch-platforms' },
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
      description: 'Find directories and launch communities where you can submit SaaS, AI tools, and internet products.',
      themeConfig: {
        siteTitle: 'Bujidao Links',
        nav: [
          { text: 'Submission Sites', link: '/en/#directory' },
          { text: 'SaaS Directories', link: '/en/#saas-directories' },
          { text: 'AI Directories', link: '/en/#ai-directories' },
          { text: 'Launch Communities', link: '/en/#launch-platforms' },
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
