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
  guidelinesUrl: string
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
  { id: 'software-directories', name: { zh: '软件与应用目录', en: 'Software & App Directories' }, description: { zh: '提交软件与应用，补充产品资料并等待平台审核。', en: 'Submit software and apps for review and directory listings.' } },
  { id: 'company-databases', name: { zh: '公司与创业数据库', en: 'Company & Startup Databases' }, description: { zh: '创建公司资料，帮助用户了解创业公司与产品。', en: 'Create company profiles for startup and product discovery.' } }
]

// Core platforms are selected for brand recognition, real product discovery use,
// and official submission/policy pages. Unknown SEO attributes are never inferred.
const directoryLinkRecords: DirectoryLink[] = [
  {
    id: 'product-hunt', category: 'launch-platforms', popular: true,
    name: { zh: 'Product Hunt', en: 'Product Hunt' },
    description: { zh: 'Product Hunt 每天精选最新产品。发现大家正在讨论的最新移动应用、网站和科技产品。', en: "Product Hunt is a curation of the best new products, every day. Discover the latest mobile apps, websites, and technology products that everyone's talking about." },
    homepageUrl: 'https://www.producthunt.com/', submissionUrl: 'https://www.producthunt.com/posts/new', guidelinesUrl: 'https://help.producthunt.com/en/articles/479557-how-to-post-a-product',
    feeModel: 'free', feeSummary: { zh: '常规产品发布免费；付费推广是单独的广告服务。', en: 'Regular product launches are free; paid promotion is a separate advertising service.' },
    accepts: ['saas', 'ai-tool', 'software', 'app', 'browser-extension', 'startup'], requirements: [{ zh: '使用个人账号发布；新账号需要完成引导并通常等待一周。产品应符合社区规则。', en: 'Post from a personal account; new accounts must complete onboarding and generally wait one week. Products must follow community rules.' }],
    reviewMethod: 'community', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'saashub', category: 'saas-directories', featured: true, popular: true,
    name: { zh: 'SaaSHub', en: 'SaaSHub' },
    description: { zh: '寻找优质软件和替代品。我们的目标是保持客观并提供帮助。', en: 'Find the best software and alternatives. Our goal is to be objective and helpful.' },
    homepageUrl: 'https://www.saashub.com/', submissionUrl: 'https://www.saashub.com/services/submit', pricingUrl: 'https://www.saashub.com/featured-products', guidelinesUrl: 'https://www.saashub.com/services/submit',
    feeModel: 'freemium', feeSummary: { zh: '基础提交免费；精选产品推广为额外付费服务。', en: 'Basic submission is free; featured product promotion is a separate paid service.' },
    accepts: ['saas', 'software', 'app'], requirements: [{ zh: '需已上线并使用自有域名；不接受纯等候名单页、免费子域名及非英语产品。所有投稿需审核。', en: 'Products must be launched and use their own domain. Waitlists, free subdomains, and non-English products are excluded. All submissions are reviewed.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'alternativeto', category: 'software-directories', popular: true,
    name: { zh: 'AlternativeTo', en: 'AlternativeTo' },
    description: { zh: '社区参与的软件发现与替代品目录，适合已公开发布的软件和应用。', en: 'A community-powered software discovery and alternatives directory for publicly available products.' },
    homepageUrl: 'https://alternativeto.net/', submissionUrl: 'https://alternativeto.net/faq/#add-a-new-application', pricingUrl: 'https://alternativeto.net/faq/', guidelinesUrl: 'https://alternativeto.net/faq/',
    feeModel: 'freemium', feeSummary: { zh: '普通提交免费；可选一次性付费加快审核，不代表保证通过。', en: 'Regular submission is free; an optional one-time fee speeds up review but does not guarantee approval.' },
    accepts: ['software', 'app'], requirements: [{ zh: '注册并验证邮箱后，从用户菜单选择“Suggest new application”。仅收录适合用户寻找替代品的成熟软件；审核队列可能需要数月。', en: 'Register and verify your email, then choose “Suggest new application” from the user menu. Products must be established software people may seek alternatives to; review can take months.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'betalist', category: 'launch-platforms',
    name: { zh: 'BetaList', en: 'BetaList' },
    description: { zh: 'BetaList 汇集即将推出的互联网创业项目，帮助你发现并提前体验未来产品。', en: 'BetaList provides an overview of upcoming internet startups. Discover and get early access to the future.' },
    homepageUrl: 'https://betalist.com/', submissionUrl: 'https://betalist.com/submit/', pricingUrl: 'https://betalist.com/support', guidelinesUrl: 'https://betalist.com/criteria',
    feeModel: 'paid', feeSummary: { zh: '投稿收费；未被选中可退款，当前价格以提交页面为准。', en: 'Submissions are paid; rejected submissions are refunded. Check the submission page for current pricing.' },
    accepts: ['startup', 'saas', 'software', 'ai-tool'], requirements: [{ zh: '面向新近发布或即将发布的科技创业产品；需要自有域名和清晰、可用的产品页面。官方 FAQ 称入选后提供 dofollow 链接，但条款允许平台调整链接属性。', en: 'For new or upcoming technology startups with their own domain and a clear, usable product page. Its FAQ says featured listings include a dofollow link, while its terms reserve the right to change link attributes.' }],
    reviewMethod: 'editorial', backlinkRel: 'follow', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'g2', category: 'saas-directories', featured: true, popular: true,
    name: { zh: 'G2', en: 'G2' },
    description: { zh: '面向 B2B 软件买家的产品发现与评价平台，可申请建立产品资料页。', en: 'A product discovery and review platform for B2B software buyers, with a product profile application process.' },
    homepageUrl: 'https://www.g2.com/', submissionUrl: 'https://sell.g2.com/create-a-profile', pricingUrl: 'https://sell.g2.com/plans', guidelinesUrl: 'https://documentation.g2.com/help/docs/finding-or-listing-a-product-on-g2',
    feeModel: 'freemium', feeSummary: { zh: '基础产品资料页可免费申请和认领；增强品牌展示与营销功能另有付费方案。', en: 'A basic product profile can be requested and claimed for free; enhanced branding and marketing features are paid.' },
    accepts: ['saas', 'software'], requirements: [{ zh: '仅适合已上线的 B2B 产品；不收录 B2C、Alpha 或 Beta 阶段产品。G2 团队核验资格和分类。', en: 'For launched B2B products only; B2C, alpha, and beta products are excluded. G2 verifies eligibility and categorization.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'capterra', category: 'saas-directories',
    name: { zh: 'Capterra', en: 'Capterra' },
    description: { zh: '在 Capterra 上寻找最适合的软件，参考数百万用户的洞察和超过 200 万条经过验证的评价。比较功能、价格等。', en: 'Choose the best software on Capterra, with insights from millions of users and 2 million+ verified reviews. Compare features, pricing, & more.' },
    homepageUrl: 'https://www.capterra.com/', submissionUrl: 'https://www.capterra.com/vendors/', pricingUrl: 'https://www.capterra.com/vendors/', guidelinesUrl: 'https://www.capterra.com/legal/listing-guidelines/',
    feeModel: 'unknown', feeSummary: { zh: '厂商入口未明确基础资料页费用；平台另提供赞助展示和线索推广，提交前需确认当前商业条款。', en: 'The vendor page does not clearly state the cost of a basic profile. Sponsored placements and lead-generation programs are separate; confirm current terms.' },
    accepts: ['saas', 'software'], requirements: [{ zh: '适合已公开可用、符合现有软件分类的商业软件；单纯等候名单页面不符合要求。', en: 'For publicly available commercial software that fits an existing category; waitlist-only pages do not qualify.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'sourceforge', category: 'software-directories',
    name: { zh: 'SourceForge', en: 'SourceForge' },
    description: { zh: 'SourceForge 是完整的软件发现平台，也是全球最大的 B2B 软件评测与比较网站，提供大型商业软件目录，以及免费、快速的开源软件下载与开发服务。', en: 'SourceForge is the complete software discovery platform. SourceForge is the largest B2B software review and comparison site in the world, and features the largest business software directory, as well as free & fast open source software downloads and development.' },
    homepageUrl: 'https://sourceforge.net/', submissionUrl: 'https://sourceforge.net/create/', guidelinesUrl: 'https://sourceforge.net/create/',
    feeModel: 'free', feeSummary: { zh: '开源项目托管与目录展示提供免费方案；具体适用范围以项目创建页为准。', en: 'Free hosting and directory listings are available for open-source projects; check the project creation page for eligibility.' },
    accepts: ['software', 'app'], requirements: [{ zh: '主要面向可下载、可使用的开源软件项目；创建项目并完善项目资料。', en: 'Primarily for usable, downloadable open-source software projects; create a project and complete its profile.' }],
    reviewMethod: 'unknown', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'crunchbase', category: 'company-databases',
    name: { zh: 'Crunchbase', en: 'Crunchbase' },
    description: { zh: '探索私营公司的数据、融资洞察和 AI 驱动的预测。', en: 'Discover private company data, funding insights, and AI-powered predictions with Crunchbase.' },
    homepageUrl: 'https://www.crunchbase.com/', submissionUrl: 'https://www.crunchbase.com/add-new', guidelinesUrl: 'https://support.crunchbase.com/hc/en-us/articles/115011823988-How-do-I-create-a-Crunchbase-profile',
    feeModel: 'freemium', feeSummary: { zh: '注册用户可创建和编辑资料；更高级的数据与分析功能另有付费方案。', en: 'Registered users can create and edit profiles; advanced data and analytics have separate paid plans.' },
    accepts: ['startup', 'saas', 'software'], requirements: [{ zh: '需要注册并完成社交账号验证；创建前先检查是否已有公司资料，平台要求信息准确完整。', en: 'Register and complete social authentication. Check for an existing company profile first and provide accurate, complete information.' }],
    reviewMethod: 'unknown', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'futurepedia', category: 'ai-directories', featured: true,
    name: { zh: 'Futurepedia', en: 'Futurepedia' },
    description: { zh: 'Futurepedia 是一个免费平台，帮助你找到能提升工作与生活效率的 AI 工具和软件。内容每日更新，加入我们网站、新闻通讯和 YouTube 的数百万关注者。', en: 'Futurepedia is a free site to help you find the best AI tools and software to make your work and life more efficient and productive. Updated daily, join millions of followers of our website, newsletter, and YouTube.' },
    homepageUrl: 'https://www.futurepedia.io/', submissionUrl: 'https://www.futurepedia.io/submit-tool', pricingUrl: 'https://www.futurepedia.io/submit-tool', guidelinesUrl: 'https://www.futurepedia.io/terms-of-service',
    feeModel: 'paid', feeSummary: { zh: '当前提交页显示付费档位；Basic 档标示售罄，其他方案与价格以提交页为准，仍需审核。', en: 'The current submission page shows paid tiers; the Basic tier is marked sold out. Check current availability and pricing. Submissions are still reviewed.' },
    accepts: ['ai-tool'], requirements: [{ zh: '仅面向 AI 工具；提交需编辑审核，付费不代表保证收录。', en: 'For AI tools only. Submissions are reviewed; payment does not guarantee acceptance.' }],
    reviewMethod: 'editorial', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
  },
  {
    id: 'uneed', category: 'launch-platforms',
    name: { zh: 'Uneed', en: 'Uneed' },
    description: { zh: 'Uneed 是一个每日供创作者发布产品的发布平台。发现、投票并评价优秀的新工具、应用和创业项目。', en: 'Uneed is a launch platform where makers launch their products every day. Discover, upvote and review the best new tools, apps and startups.' },
    homepageUrl: 'https://www.uneed.best/', submissionUrl: 'https://www.uneed.best/submit-a-tool', pricingUrl: 'https://www.uneed.best/pricing', guidelinesUrl: 'https://www.uneed.best/how-it-works',
    feeModel: 'freemium', feeSummary: { zh: '可免费排队发布；Fast-track 为 $14.99，Skip the waiting line 为 $29.99。免费及加速方案的页面保留和 dofollow 条件不同。', en: 'A free launch queue is available; Fast-track is $14.99 and Skip the waiting line is $29.99. Listing retention and dofollow conditions vary by launch option.' },
    accepts: ['saas', 'ai-tool', 'software', 'app', 'startup'], requirements: [{ zh: '免费投稿经审核，提交后还需在后台选择发布时间。页面是否长期保留及链接属性取决于发布方案和上线得分。', en: 'Free submissions are reviewed. After submitting, choose a launch option in the dashboard. Page retention and link attributes depend on the option and launch score.' }],
    reviewMethod: 'community', backlinkRel: 'mixed', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-26'
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
