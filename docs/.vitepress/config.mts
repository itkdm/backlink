import { defineConfig, type HeadConfig } from 'vitepress'
import { createSeoHead } from './seo'

const siteUrl = process.env.SITE_URL
const siteOrigin = new URL(siteUrl || 'https://apilaile.com').origin
const measurementId = process.env.GA_MEASUREMENT_ID
const analyticsHead: HeadConfig[] = measurementId && /^G-[A-Z0-9]+$/.test(measurementId)
  ? [
      ['script', { async: '', src: `https://www.googletagmanager.com/gtag/js?id=${measurementId}` }],
      ['script', {}, `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}');`]
    ]
  : []

export default defineConfig({
  lang: 'zh-CN',
  title: '布吉岛外链提交导航',
  description: '查找可提交出海 SaaS、AI 工具和互联网产品的平台目录与发布社区。',
  cleanUrls: true,
  srcExclude: ['platform-records/**/*.md'],
  sitemap: { hostname: siteOrigin },
  lastUpdated: true,
  head: [
    ...analyticsHead,
    ['meta', { name: 'theme-color', content: '#f6f7f2' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '128x128', href: '/favicon.png' }],
    ['link', { rel: 'describedby', href: '/llms.txt' }]
  ],
  transformHead({ pageData, siteData, title, description }) {
    return createSeoHead({ pageData, siteData, title, description, siteUrl })
  },
  transformPageData(pageData) {
    const params = pageData.params as { seoTitle?: string; seoDescription?: string } | undefined
    if (!pageData.filePath.includes('directory/[id].md') || !params?.seoTitle || !params.seoDescription) return
    return {
      title: params.seoTitle,
      description: params.seoDescription
    }
  },
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: '布吉岛外链提交导航',
      description: '查找可提交出海 SaaS、AI 工具和互联网产品的平台目录与发布社区。',
      themeConfig: {
        logo: { src: '/favicon.svg', alt: '布吉岛外链提交导航标志' },
        siteTitle: '布吉岛外链提交导航',
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
        notFound: {
          code: '404',
          title: '页面未找到',
          quote: '这个页面可能已移除，或地址输入有误。你可以返回首页继续浏览。',
          linkText: '返回首页',
          linkLabel: '返回布吉岛首页'
        },
        footer: {
          message: '发现好网站，让每一次探索都有方向。',
          copyright: 'Copyright © 2026 布吉岛'
        }
      }
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'Bujidao Product Submission Directory',
      description: 'Find directories and launch communities where you can submit SaaS, AI tools, and internet products.',
      themeConfig: {
        logo: { src: '/favicon.svg', alt: 'Bujidao product submission directory logo' },
        siteTitle: 'Bujidao Submission Directory',
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
        notFound: {
          code: '404',
          title: 'Page not found',
          quote: 'This page may have moved, or the address may be incorrect. Return home to keep exploring.',
          linkText: 'Return home',
          linkLabel: 'Return to the Bujidao homepage'
        },
        footer: {
          message: 'Find useful websites. Make every exploration count.',
          copyright: 'Copyright © 2026 Bujidao'
        }
      }
    }
  },
  themeConfig: {
    logo: { src: '/favicon.svg', alt: '布吉岛外链提交导航标志' },
    siteTitle: '布吉岛外链提交导航'
  }
})
