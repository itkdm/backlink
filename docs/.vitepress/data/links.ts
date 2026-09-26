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
    id: 'saas-directories',
    name: { zh: 'SaaS 产品目录', en: 'SaaS Directories' },
    description: { zh: '提交 SaaS、独立软件和互联网产品，获得目录展示机会。', en: 'Submit SaaS, software, and internet products for directory listings.' }
  },
  {
    id: 'ai-directories',
    name: { zh: 'AI 工具目录', en: 'AI Tool Directories' },
    description: { zh: '面向 AI 产品的收录与提交入口。', en: 'Submission pages for AI product listings.' }
  },
  {
    id: 'launch-platforms',
    name: { zh: '产品发布社区', en: 'Launch Communities' },
    description: { zh: '发布新产品，获取早期曝光、反馈和讨论。', en: 'Launch new products to gain early visibility, feedback, and discussion.' }
  },
  {
    id: 'submission-lists',
    name: { zh: '提交清单与工具', en: 'Submission Lists & Tools' },
    description: { zh: '查找更多可提交产品的目录与社区。', en: 'Find more directories and communities where you can submit a product.' }
  }
]

export const directoryLinks: DirectoryLink[] = [
  {
    id: 'saashub', category: 'saas-directories', featured: true,
    name: { zh: 'SaaSHub', en: 'SaaSHub' },
    description: { zh: '提交软件或 SaaS 产品，完善产品资料后可申请收录。', en: 'Submit a software or SaaS product for review and listing.' },
    url: 'https://www.saashub.com/submit'
  },
  {
    id: '10015-product-finder', category: 'saas-directories',
    name: { zh: '10015 Product Finder', en: '10015 Product Finder' },
    description: { zh: '提交 SaaS、应用、浏览器扩展和其他在线产品。', en: 'Submit SaaS, apps, browser extensions, and other online products.' },
    url: 'https://10015.io/product-finder/submit'
  },
  {
    id: 'betalist', category: 'saas-directories',
    name: { zh: 'BetaList', en: 'BetaList' },
    description: { zh: '面向早期科技创业项目的投稿平台；按其当前规则审核与收费。', en: 'Submit an early-stage technology startup for editorial review; current submission plans may be paid.' },
    url: 'https://betalist.com/submit/'
  },
  {
    id: 'futurepedia', category: 'ai-directories', featured: true,
    name: { zh: 'Futurepedia', en: 'Futurepedia' },
    description: { zh: '向 AI 工具目录提交产品；需经过编辑审核，页面提供付费收录方案。', en: 'Submit an AI tool for editorial review; paid listing options are available.' },
    url: 'https://www.futurepedia.io/submit-tool'
  },
  {
    id: 'futuretools', category: 'ai-directories',
    name: { zh: 'Future Tools', en: 'Future Tools' },
    description: { zh: '提交 AI 工具信息，由网站编辑审核后决定是否收录。', en: 'Submit an AI tool for consideration by the directory editor.' },
    url: 'https://futuretools.io/submit-a-tool'
  },
  {
    id: 'forward-future', category: 'ai-directories',
    name: { zh: 'Forward Future', en: 'Forward Future' },
    description: { zh: '免费提交 AI 工具，填写产品资料后等待人工审核。', en: 'Submit an AI tool for free; listings are reviewed by an editor.' },
    url: 'https://forwardfuture.com/tools/submit'
  },
  {
    id: 'toolpilot', category: 'ai-directories',
    name: { zh: 'ToolPilot', en: 'ToolPilot' },
    description: { zh: 'AI 工具目录提交入口；免费方案要求在自己的网站添加对方链接。', en: 'Submit an AI tool; its free listing currently requires a reciprocal link.' },
    url: 'https://www.toolpilot.ai/pages/submit-your-ai-tool'
  },
  {
    id: 'product-hunt', category: 'launch-platforms', featured: true,
    name: { zh: 'Product Hunt', en: 'Product Hunt' },
    description: { zh: '发布产品并参与社区讨论；需要个人账号并遵守发布规则。', en: 'Launch a product and join the community; a personal account and platform rules apply.' },
    url: 'https://www.producthunt.com/posts/new'
  },
  {
    id: 'uneed', category: 'launch-platforms', featured: true,
    name: { zh: 'Uneed', en: 'Uneed' },
    description: { zh: '提交产品进入发布队列，可选择免费排期或付费加速发布。', en: 'Submit a product to the launch queue, with free and paid launch options.' },
    url: 'https://www.uneed.best/submit'
  },
  {
    id: 'saashub-submit', category: 'submission-lists',
    name: { zh: 'SaaSHub Submit', en: 'SaaSHub Submit' },
    description: { zh: '免费产品推广工具，整理了可继续提交产品的目录与社区清单。', en: 'A free promotion tool with a list of directories and communities for further submissions.' },
    url: 'https://www.saashub.com/submit/list'
  }
]
