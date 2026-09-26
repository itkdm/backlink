import ahrefsDrData from './ahrefs-dr.json'

export type LinkLanguage = 'zh' | 'en'
export type LocalizedText = Record<LinkLanguage, string>
export type FeeModel = 'free' | 'paid' | 'freemium' | 'conditional' | 'unknown'
export type BacklinkRel = 'follow' | 'nofollow' | 'ugc' | 'sponsored' | 'mixed' | 'unknown'
export type ListingIndexability = 'indexable' | 'noindex' | 'unknown'
export type ReviewMethod = 'editorial' | 'community' | 'automated' | 'unknown'
export type ProductType = 'saas' | 'ai-tool' | 'software' | 'app' | 'browser-extension' | 'startup'

export type DirectoryLink = {
  id: string
  category: string
  name: LocalizedText
  description: LocalizedText
  logoUrl?: string
  homepageUrl: string
  submissionUrl: string
  pricingUrl?: string
  feeModel: FeeModel
  feeSummary: LocalizedText
  accepts: ProductType[]
  requirements: LocalizedText[]
  reviewMethod: ReviewMethod
  backlinkRel: BacklinkRel
  listingIndexability: ListingIndexability
  availability: 'open' | 'paused' | 'unknown'
  verifiedAt: string
  domainRating?: { value: number; source: 'Ahrefs'; checkedAt: string }
  popular?: boolean
  featured?: boolean
}

export type PaidPromotion = {
  id: string
  name: LocalizedText
  description: LocalizedText
  url: string
  logoUrl?: string
}

export type LinkCategory = {
  id: string
  name: LocalizedText
  description: LocalizedText
}

export const categories: LinkCategory[] = [
  { id: 'saas-directories', name: { zh: 'SaaS 产品目录', en: 'SaaS Directories' }, description: { zh: '提交 SaaS、独立软件和互联网产品，获得目录展示机会。', en: 'Submit SaaS, software, and internet products for directory listings.' } },
  { id: 'ai-directories', name: { zh: 'AI 工具目录', en: 'AI Tool Directories' }, description: { zh: '面向 AI 产品的收录与提交入口。', en: 'Submission pages for AI product listings.' } },
  { id: 'launch-platforms', name: { zh: '产品发布社区', en: 'Launch Communities' }, description: { zh: '发布新产品，获取早期曝光、反馈和讨论。', en: 'Launch new products to gain early visibility, feedback, and discussion.' } },
  { id: 'software-directories', name: { zh: '软件与应用目录', en: 'Software & App Directories' }, description: { zh: '提交软件与应用，补充产品资料并等待平台审核。', en: 'Submit software and apps for review and directory listings.' } }
]

// Fee, backlink and review fields describe the platform's published policy when verified.
// Unknown is intentional: never infer SEO attributes or current availability from a submission form.
const directoryLinkRecords: DirectoryLink[] = [
  {
    id: 'saashub', category: 'saas-directories', featured: true, popular: true,
    name: { zh: 'SaaSHub', en: 'SaaSHub' },
    description: { zh: '提交 SaaS、软件和应用产品，由平台审核后收录。', en: 'Submit SaaS, software, and apps for review and listing.' },
    homepageUrl: 'https://www.saashub.com/', submissionUrl: 'https://www.saashub.com/services/submit', pricingUrl: 'https://www.saashub.com/featured-products',
    feeModel: 'freemium', feeSummary: { zh: '基础提交免费；付费精选推广另有月费方案。', en: 'Basic submission is free; paid featured promotion is also available.' },
    accepts: ['saas', 'software', 'app'], requirements: [{ zh: '需有可用的网站和完整产品资料；目录不接受部分类型的网站。', en: 'A working website and complete product information are expected; some site types are excluded.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: '10015-product-finder', category: 'saas-directories',
    name: { zh: '10015 Product Finder', en: '10015 Product Finder' },
    description: { zh: '提交 SaaS、应用、浏览器扩展和其他在线产品。', en: 'Submit SaaS, apps, browser extensions, and other online products.' },
    homepageUrl: 'https://10015.io/product-finder', submissionUrl: 'https://10015.io/product-finder/submit', pricingUrl: 'https://10015.io/product-finder/submit',
    feeModel: 'freemium', feeSummary: { zh: '免费标准提交；付费可加快审核或购买精选展示。免费链接标注为 nofollow。', en: 'Free standard submission; paid options can speed up review or feature a product. Free links are marked nofollow.' },
    accepts: ['saas', 'ai-tool', 'software', 'app', 'browser-extension'], requirements: [{ zh: '提交后进入审核队列；免费审核等待时间可能较长。', en: 'Submissions enter a review queue; free review may take longer.' }],
    reviewMethod: 'editorial', backlinkRel: 'mixed', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'betalist', category: 'saas-directories',
    name: { zh: 'BetaList', en: 'BetaList' },
    description: { zh: '面向早期科技创业项目的投稿与发现平台。', en: 'A discovery and submission platform for early-stage technology startups.' },
    homepageUrl: 'https://betalist.com/', submissionUrl: 'https://betalist.com/submit/', pricingUrl: 'https://betalist.com/support',
    feeModel: 'paid', feeSummary: { zh: '当前投稿方案收费，具体价格以提交页面为准。', en: 'Current submission plans are paid; check the submission page for pricing.' },
    accepts: ['startup', 'saas', 'software'], requirements: [{ zh: '适合较新的科技创业产品；需有自有域名和产品介绍页。', en: 'For relatively new technology startups; a product page on your own domain is expected.' }],
    reviewMethod: 'editorial', backlinkRel: 'follow', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'futurepedia', category: 'ai-directories', featured: true, popular: true,
    name: { zh: 'Futurepedia', en: 'Futurepedia' },
    description: { zh: 'AI 工具目录，提供产品提交和付费收录方案。', en: 'An AI tool directory with product submissions and paid listing options.' },
    homepageUrl: 'https://www.futurepedia.io/', submissionUrl: 'https://www.futurepedia.io/submit-tool', pricingUrl: 'https://www.futurepedia.io/submit-tool',
    feeModel: 'paid', feeSummary: { zh: '提交页面列出付费收录档位，库存和价格可能变化。', en: 'Paid listing tiers are shown on the submission page; availability and pricing may change.' },
    accepts: ['ai-tool'], requirements: [{ zh: '提交 AI 工具信息并等待编辑审核。', en: 'Submit AI tool details for editorial review.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'futuretools', category: 'ai-directories',
    name: { zh: 'Future Tools', en: 'Future Tools' },
    description: { zh: '提交 AI 工具，由目录团队决定是否收录。', en: 'Submit an AI tool for consideration by the directory team.' },
    homepageUrl: 'https://futuretools.io/', submissionUrl: 'https://futuretools.io/submit-a-tool',
    feeModel: 'unknown', feeSummary: { zh: '提交页未明确说明费用，提交前请查看当前页面。', en: 'The submission page does not clearly state a fee; check current terms before submitting.' },
    accepts: ['ai-tool'], requirements: [{ zh: '需提供 AI 工具信息；是否收录由平台决定。', en: 'Provide AI tool details; inclusion is at the platform’s discretion.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'forward-future', category: 'ai-directories',
    name: { zh: 'Forward Future', en: 'Forward Future' },
    description: { zh: '免费提交 AI 工具，无需注册账号，所有投稿均会审核。', en: 'Submit an AI tool for free without an account; every submission is reviewed.' },
    homepageUrl: 'https://forwardfuture.com/', submissionUrl: 'https://forwardfuture.com/tools/submit',
    feeModel: 'free', feeSummary: { zh: '免费提交。', en: 'Free submission.' },
    accepts: ['ai-tool'], requirements: [{ zh: '无需账号；提交内容由团队审核。', en: 'No account is required; submissions are reviewed by the team.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'toolpilot', category: 'ai-directories',
    name: { zh: 'ToolPilot', en: 'ToolPilot' },
    description: { zh: 'AI 工具目录，免费收录方案要求添加对方的互惠链接。', en: 'An AI tool directory whose free listing requires a reciprocal link.' },
    homepageUrl: 'https://www.toolpilot.ai/', submissionUrl: 'https://www.toolpilot.ai/pages/submit-your-ai-tool', pricingUrl: 'https://www.toolpilot.ai/pages/submit-your-ai-tool',
    feeModel: 'conditional', feeSummary: { zh: '免费方案需添加互惠链接；页面也提供付费选项。', en: 'The free option requires a reciprocal link; paid options are also listed.' },
    accepts: ['ai-tool'], requirements: [{ zh: '免费方案需先在自己的网站放置 ToolPilot 链接。', en: 'The free option requires placing a ToolPilot link on your own site.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'product-hunt', category: 'launch-platforms', featured: true, popular: true,
    name: { zh: 'Product Hunt', en: 'Product Hunt' },
    description: { zh: '发布新产品并参与产品社区讨论。', en: 'Launch a new product and take part in the product community.' },
    homepageUrl: 'https://www.producthunt.com/', submissionUrl: 'https://www.producthunt.com/posts/new',
    feeModel: 'free', feeSummary: { zh: '平台发布免费；需使用个人账号并遵守社区规则。', en: 'Launching is free; use a personal account and follow community rules.' },
    accepts: ['saas', 'ai-tool', 'software', 'app', 'browser-extension', 'startup'], requirements: [{ zh: '由个人账号发布，产品需符合社区发布规则。', en: 'Posts are submitted from personal accounts and must follow community launch rules.' }],
    reviewMethod: 'community', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'uneed', category: 'launch-platforms', featured: true, popular: true,
    name: { zh: 'Uneed', en: 'Uneed' },
    description: { zh: '提交产品参加发布；免费队列开放情况会变化，也提供付费选项。', en: 'Submit a product for launch; free queue availability can change, with paid options also available.' },
    homepageUrl: 'https://www.uneed.best/', submissionUrl: 'https://www.uneed.best/submit', pricingUrl: 'https://www.uneed.best/pricing',
    feeModel: 'freemium', feeSummary: { zh: '免费队列是否开放以当前页面为准；可选付费加速。', en: 'Check whether the free queue is open; paid acceleration is available.' },
    accepts: ['saas', 'ai-tool', 'software', 'app', 'startup'], requirements: [{ zh: '发布排期与免费队列状态可能调整，提交前查看当前规则。', en: 'Launch scheduling and free queue status may change; check current rules before submitting.' }],
    reviewMethod: 'community', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'unknown', verifiedAt: '2026-09-26'
  },
  {
    id: 'alternativeto', category: 'software-directories',
    name: { zh: 'AlternativeTo', en: 'AlternativeTo' },
    description: { zh: '软件发现与替代品目录，可建议新增应用供平台审核。', en: 'A software discovery and alternatives directory where users can suggest apps for review.' },
    homepageUrl: 'https://alternativeto.net/', submissionUrl: 'https://alternativeto.net/faq/',
    feeModel: 'unknown', feeSummary: { zh: '官方 FAQ 未明确说明新增应用是否收费。', en: 'The official FAQ does not clearly state whether suggesting an app is paid.' },
    accepts: ['software', 'app'], requirements: [{ zh: '需登录并验证邮箱；建议的新应用会进入审核队列。', en: 'Sign in and verify an email; suggested apps enter a review queue.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  }
]

type AhrefsDrCache = { ratings: Record<string, { value: number; checkedAt: string }> }
const ahrefsDrCache = ahrefsDrData as AhrefsDrCache

function normalizeDomain(url: string) {
  try { return new URL(url).hostname.toLowerCase().replace(/^www\./, '') }
  catch { return '' }
}

export const directoryLinks: DirectoryLink[] = directoryLinkRecords.map((link) => {
  const rating = ahrefsDrCache.ratings[normalizeDomain(link.homepageUrl)]
  return rating
    ? { ...link, domainRating: { value: rating.value, source: 'Ahrefs', checkedAt: rating.checkedAt } }
    : link
})

export function domainRatingStyle(value?: number): Record<string, string> {
  const progress = Math.min(100, Math.max(0, value ?? 0))
  return { '--dr-progress': `${progress}%` }
}

// Paid homepage placements remain hidden until an actual campaign is added.
export const paidPromotions: PaidPromotion[] = []

export const feeLabels: Record<LinkLanguage, Record<FeeModel, string>> = {
  zh: { free: '免费', paid: '收费', freemium: '免费 / 付费', conditional: '有条件免费', unknown: '费用未知' },
  en: { free: 'Free', paid: 'Paid', freemium: 'Free / Paid', conditional: 'Conditional free', unknown: 'Fee unknown' }
}

export const productTypeLabels: Record<LinkLanguage, Record<ProductType, string>> = {
  zh: { saas: 'SaaS', 'ai-tool': 'AI 工具', software: '软件', app: '应用', 'browser-extension': '浏览器扩展', startup: '创业项目' },
  en: { saas: 'SaaS', 'ai-tool': 'AI tool', software: 'Software', app: 'App', 'browser-extension': 'Browser extension', startup: 'Startup' }
}

export const backlinkLabels: Record<LinkLanguage, Record<BacklinkRel, string>> = {
  zh: { follow: 'Follow', nofollow: 'Nofollow', ugc: 'UGC', sponsored: 'Sponsored', mixed: '因方案而异', unknown: '未知' },
  en: { follow: 'Follow', nofollow: 'Nofollow', ugc: 'UGC', sponsored: 'Sponsored', mixed: 'Varies by plan', unknown: 'Unknown' }
}
