import ahrefsDrData from './ahrefs-dr.json'

export type LinkLanguage = 'zh' | 'en'
export type LocalizedText = Record<LinkLanguage, string>
export type FeeModel = 'free' | 'paid' | 'backlink-free' | 'conditional'
export type BacklinkRel = 'follow' | 'nofollow' | 'ugc' | 'sponsored' | 'mixed' | 'unknown'
export type LoginRequirement = 'required' | 'not-required' | 'conditional' | 'unknown'
export type ListingIndexability = 'indexable' | 'noindex' | 'unknown'
export type ReviewMethod = 'editorial' | 'community' | 'automated' | 'unknown'
export type ProductType = 'website' | 'app' | 'plugin' | 'desktop-software'

export type DirectoryLink = {
  id: string
  name: LocalizedText
  description: LocalizedText
  logoUrl?: string
  homepageUrl: string
  submissionUrl: string
  pricingUrl?: string
  sources: Array<{ label: LocalizedText; url: string }>
  feeModels: FeeModel[]
  feeSummary: LocalizedText
  loginRequirement: LoginRequirement
  loginNote?: LocalizedText
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

// Core platforms are selected for brand recognition, real product discovery use,
// and official submission/policy pages. Unknown SEO attributes are never inferred.
const directoryLinkRecords: DirectoryLink[] = [
  {
    id: 'twelve-tools',
    name: { zh: 'Twelve Tools', en: 'Twelve Tools' },
    description: { zh: '每天精选 12 款新工具与创业产品，帮助用户发现近期上线的产品。', en: 'The 12 best tools on the internet, served every day.' },
    homepageUrl: 'https://twelve.tools/', submissionUrl: 'https://twelve.tools/submit-your-tool', pricingUrl: 'https://twelve.tools/pricing',
    sources: [
      { label: { zh: '投稿要求', en: 'Submission requirements' }, url: 'https://twelve.tools/submit-your-tool' },
      { label: { zh: '费用与方案', en: 'Pricing and plans' }, url: 'https://twelve.tools/pricing' }
    ],
    feeModels: ['backlink-free', 'paid'], feeSummary: { zh: '免费方案提供 1 条 dofollow 链接，要求在官网首页或页脚放置 Twelve Tools 徽章，官方标示审核目标为 72 小时。Pro 为一次性付款，标价 $36；定价页当前展示 $25.20 优惠价，含 3 条 dofollow 链接、无需回链，官方标示审核与上架目标为 24 小时。', en: 'The free plan includes one dofollow link and requires a Twelve Tools badge on your homepage or footer; the site lists a 72-hour review target. Pro is a one-time $36 payment; the pricing page currently shows a $25.20 offer. It includes three dofollow links, no backlink requirement, and a stated 24-hour review and listing target.' },
    accepts: ['website'], requirements: [
      { zh: '投稿时需填写网站网址并提交截图，之后等待审核。选择免费方案还需在官网首页或页脚添加徽章；Pro 方案无需回链。平台仅收录高质量、合法的网站，不接受成人内容、赌博或毒品相关网站。', en: 'Submit a website URL and screenshot for review. The free plan also requires a badge on your homepage or footer; Pro does not require a backlink. Twelve Tools accepts high-quality, legitimate websites and excludes adult content, gambling, and drug-related sites.' }
    ],
    loginRequirement: 'unknown', reviewMethod: 'unknown', backlinkRel: 'follow', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-27'
  },
  {
    id: 'startup-fame',
    name: { zh: 'Startup Fame', en: 'Startup Fame' },
    description: { zh: '经审核的创业项目目录，免费 Verified 方案需添加官网徽章，也提供 Highlight 和 Spotlight 付费展示。', en: 'Reviewed startup directory with DR 80+ do-follow backlinks. Free Verified via badge, or premium Highlight and Spotlight placement.' },
    homepageUrl: 'https://startupfa.me/', submissionUrl: 'https://startupfa.me/dashboard', pricingUrl: 'https://startupfa.me/pricing',
    sources: [
      { label: { zh: '投稿方案与审核说明', en: 'Submission plans and review details' }, url: 'https://startupfa.me/pricing' },
      { label: { zh: '免费方案徽章要求', en: 'Free plan badge requirement' }, url: 'https://startupfa.me/guides/homepage-badge' }
    ],
    feeModels: ['backlink-free', 'paid'], feeSummary: { zh: 'Verified 免费方案需在官网首页添加徽章并通过验证；官方标示审核与发布目标为 7 天内。Highlight 为 $19/月，Spotlight 为 $149/月；两种付费方案均跳过徽章验证并即时发布。外链在项目保持收录期间有效，付费展示需保持订阅有效。', en: 'The free Verified plan requires a badge on your homepage and approval; the site lists review and publication within 7 days. Highlight is $19/month and Spotlight is $149/month. Both paid plans skip badge verification and publish instantly. Links remain while the startup is listed; paid placements require an active subscription.' },
    accepts: ['website'], requirements: [
      { zh: '面向现代公司、微型创业项目和独立项目。登录后在 Dashboard 添加项目，填写官网网址，平台会用 AI 补全资料；选择 Verified 免费方案需在官网首页展示徽章并通过审核。', en: 'For modern companies, micro-startups, and side projects. Sign in, add a startup from the Dashboard, and enter its website URL; AI fills in the details. The free Verified plan requires a homepage badge and approval.' }
    ],
    loginRequirement: 'required', loginNote: { zh: '投稿入口会要求登录后添加创业项目。', en: 'The submission entry requires signing in before adding a startup.' },
    reviewMethod: 'automated', backlinkRel: 'follow', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-27'
  },
  {
    id: 'launchdaily',
    name: { zh: 'LaunchDaily', en: 'LaunchDaily' },
    description: { zh: '为开发者、产品经理和创业者精选科技工具，支持发现、比较和评价产品。', en: 'Hundreds of tools launch daily — LaunchDaily curates the best new developer tools, AI products, and SaaS, with honest reviews and side-by-side comparisons.' },
    homepageUrl: 'https://launchdaily.info/', submissionUrl: 'https://launchdaily.info/submit',
    sources: [
      { label: { zh: '投稿表单与免费说明', en: 'Submission form and free listing' }, url: 'https://launchdaily.info/submit' },
      { label: { zh: '平台审核说明', en: 'Editorial and community review' }, url: 'https://launchdaily.info/about' }
    ],
    feeModels: ['free'], feeSummary: { zh: '投稿免费；官网称可获得永久产品页和 SEO 展示。', en: 'Product submission is free and includes a permanent product page with SEO visibility.' },
    accepts: ['website'], requirements: [
      { zh: '投稿第一步需填写官网网址、产品名称、页面短链接（slug）和一句话标语（最多 60 个字符），并选择产品分类。平台称产品由编辑团队和社区审核。', en: 'The first step asks for the website URL, product name, page slug, a one-line tagline (up to 60 characters), and a category. Products are vetted by the editorial team and community.' }
    ],
    loginRequirement: 'unknown',
    reviewMethod: 'community', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-27'
  },
  {
    id: 'product-hunt', popular: true,
    name: { zh: 'Product Hunt', en: 'Product Hunt' },
    description: { zh: '每日精选最新产品，发现大家热议的移动应用、网站和科技产品。', en: "Product Hunt is a curation of the best new products, every day. Discover the latest mobile apps, websites, and technology products that everyone's talking about." },
    homepageUrl: 'https://www.producthunt.com/', submissionUrl: 'https://www.producthunt.com/posts/new',
    sources: [
      { label: { zh: '产品发布指南', en: 'Product posting guide' }, url: 'https://help.producthunt.com/en/articles/479557-how-to-post-a-product' },
      { label: { zh: '账号发布权限', en: 'Account posting access' }, url: 'https://help.producthunt.com/en/articles/481909-how-can-i-get-access-to-post' }
    ],
    feeModels: ['free'], feeSummary: { zh: '常规产品发布免费；付费推广是单独的广告服务。', en: 'Regular product launches are free; paid promotion is a separate advertising service.' },
    accepts: ['website', 'app'], requirements: [
      { zh: '使用个人账号提交产品直链，并准备产品名称、简短标语、相关主题和产品描述；描述最多 260 个字符。建议由产品创作者本人发布，不需要 Hunter。', en: 'Submit a direct product URL from a personal account. Prepare a product name, short tagline, relevant topics, and a description of up to 260 characters. Makers are encouraged to post their own product; a Hunter is not required.' },
      { zh: '建议准备 240 × 240 的方形缩略图；产品图库推荐 1270 × 760，至少上传 2 张图片后图库才会显示。', en: 'Prepare a square thumbnail (240 × 240 recommended). Gallery images are recommended at 1270 × 760; at least two images are needed for the gallery to appear.' }
    ],
    loginRequirement: 'required',
    loginNote: { zh: '公司或品牌账号不能投稿。新建个人账号需等待一周才能发布；订阅 Product Hunt 官方 newsletter 可立即获得发布权限。', en: 'Company or branded accounts cannot post. New personal accounts must wait one week; subscribing to the Product Hunt newsletter provides immediate access to post.' },
    reviewMethod: 'unknown', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-27'
  },
  {
    id: 'saashub', featured: true, popular: true,
    name: { zh: 'SaaSHub', en: 'SaaSHub' },
    description: { zh: '寻找优质软件和替代品。我们的目标是保持客观并提供帮助。', en: 'Find the best software and alternatives. Our goal is to be objective and helpful.' },
    homepageUrl: 'https://www.saashub.com/', submissionUrl: 'https://www.saashub.com/services/submit', pricingUrl: 'https://www.saashub.com/featured-products',
    sources: [
      { label: { zh: '投稿要求与审核流程', en: 'Submission requirements and review' }, url: 'https://www.saashub.com/services/submit' },
      { label: { zh: '精选推广定价', en: 'Featured promotion pricing' }, url: 'https://www.saashub.com/featured-products' }
    ],
    feeModels: ['free', 'paid'], feeSummary: { zh: '基础产品提交免费并需审核。精选推广为单独的订阅服务，官网当前标价为每月 99 美元，可随时取消；推广流量为估算值，不作保证。', en: 'Basic product submission is free and reviewed. Featured promotion is a separate subscription, currently listed at $99/month and cancellable anytime. Referral estimates are not guaranteed.' },
    accepts: ['website', 'app', 'desktop-software'], requirements: [
      { zh: '产品需已正式上线、拥有自有域名并提供英文页面；仅有等候名单的落地页、免费子域名、软件开发代理服务不符合收录条件。提交后由平台审核。', en: 'Products must be launched, use their own domain, and have an English page. Waitlist-only landing pages, free subdomains, and software development agencies are not accepted. All submissions are reviewed.' },
      { zh: '提交时填写产品网址，并补充相关分类和竞品；缺少竞品信息可能导致排队变慢。使用产品域名邮箱验证可提高处理优先级。', en: 'Submit the product URL with relevant categories and competitors; missing competitors may slow the review queue. Verifying with an email address on the product domain can improve priority.' }
    ],
    loginRequirement: 'unknown',
    reviewMethod: 'unknown', backlinkRel: 'unknown', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-27'
  },
  {
    id: 'betalist',
    name: { zh: 'BetaList', en: 'BetaList' },
    description: { zh: 'BetaList 汇集即将推出的互联网创业项目，帮助你提前发现并体验新产品。', en: 'BetaList provides an overview of upcoming internet startups. Discover and get early access to the future.' },
    homepageUrl: 'https://betalist.com/', submissionUrl: 'https://betalist.com/submit', pricingUrl: 'https://betalist.com/support',
    sources: [
      { label: { zh: '产品收录标准', en: 'Submission criteria' }, url: 'https://betalist.com/criteria' },
      { label: { zh: '费用、退款与外链说明', en: 'Fees, refunds, and backlink details' }, url: 'https://betalist.com/support' }
    ],
    feeModels: ['paid'], feeSummary: { zh: '目前所有投稿均收费，没有免费选项；未被选中会自动全额退款。各计划价格和预计审核时间会在登录后的投稿表单中显示。', en: 'All submissions are currently paid; there is no free option. Unselected startups receive an automatic full refund. Plan prices and estimated review timelines are shown in the submission form after sign-in.' },
    accepts: ['website', 'app'], requirements: [
      { zh: '面向较新的科技创业项目，可在发布前或近期上线时提交。产品需要有清晰、独立的介绍页面，并让访客能够注册、下载或申请使用；仅限邀请的私测产品、信息不足的模板页、博客、电商店铺和代理服务不符合标准。', en: 'For relatively new technology startups, either pre-launch or recently launched. Provide a distinct, informative landing page where visitors can sign up, download, or request access. Invite-only private betas, thin template pages, blogs, online stores, and agencies do not fit the guidelines.' },
      { zh: '每个项目有两次入选展示机会：一次发布前展示、一次正式发布展示；两次之间至少间隔几周。', en: 'Each startup can be featured twice: once pre-launch and once at launch, with at least a few weeks between the two posts.' },
      { zh: '入选展示卡片的 Visit Site 按钮使用 dofollow 外链，并通过 301 跳转到官网；这是入选展示的链接属性，不代表投稿必定入选。', en: 'The Visit Site button on a featured listing uses a dofollow link and a 301 redirect to the product site. This applies to featured listings and does not guarantee acceptance.' }
    ],
    loginRequirement: 'required',
    loginNote: { zh: '需先登录 BetaList 账号，再进入投稿表单。', en: 'Sign in to a BetaList account before opening the submission form.' },
    reviewMethod: 'editorial', backlinkRel: 'follow', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-27'
  },
  {
    id: 'uneed',
    name: { zh: 'Uneed', en: 'Uneed' },
    description: { zh: 'Uneed 是面向创作者的每日产品发布社区，用户可以发现、投票和评价新工具、应用与创业项目。', en: 'Uneed is a launch platform where makers launch their products every day. Discover, upvote and review the best new tools, apps and startups.' },
    homepageUrl: 'https://www.uneed.best/', submissionUrl: 'https://www.uneed.best/submit-a-tool', pricingUrl: 'https://www.uneed.best/pricing',
    sources: [
      { label: { zh: '产品收录标准', en: 'Accepted product criteria' }, url: 'https://help.uneed.best/common-questions-and-issues/what-we-accept' },
      { label: { zh: '投稿队列、得分与定价', en: 'Submission queues, scores, and pricing' }, url: 'https://www.uneed.best/pricing' }
    ],
    feeModels: ['conditional', 'paid'], feeSummary: { zh: '免费队列由平台安排发布时间（最多约 5 个月）；发布日得分达到 10 才能保留页面，达到 20 才能获得 dofollow 外链。Fast-track 为 $14.99，约 14 天安排发布，得分达到 10 可获得 dofollow；Skip the line 为 $29.99，可选择发布日期并保留页面与 dofollow 外链；Relaunch 为 $15。官方说明付费投稿不受类别饱和限制，但 NSFW 和封闭/邀请制产品仍不接受。', en: 'The free queue assigns a launch date up to about five months out. A launch-day score of 10 is required to keep the page, and 20 for a dofollow link. Fast-track is $14.99, with a slot in about 14 days and a dofollow link from a score of 10. Skip the line is $29.99 and lets you choose a date, with the page and dofollow link retained. Relaunch is $15. Paid submissions bypass category saturation, but NSFW and closed or invite-only products are still refused.' },
    accepts: ['website', 'app', 'plugin'], requirements: [
      { zh: '投稿先填写产品名称和网址；系统抓取页面信息后，需注册或登录以保存资料并完成投稿。免费投稿会经过审核，审核关注产品是否原创、可用并对用户有实际价值；封闭、邀请制、候补名单或需要销售电话才能体验的产品不接受。', en: 'Start with the product name and URL. After the site scrapes the page, sign up or sign in to save the details and complete submission. Free submissions are reviewed for originality, functionality, and real user value. Closed, invite-only, waitlisted, or sales-call-gated products are not accepted.' },
      { zh: '提交产品后不会自动排期；还需在后台选择免费队列、Fast-track、Skip the waiting line 或 Relaunch。投票分数按投票者的权重计算，免费和加速方案的页面保留及 dofollow 条件不同。', en: 'Submission does not schedule a launch automatically. Choose the free queue, Fast-track, Skip the waiting line, or Relaunch in the dashboard. Launch scores use each voter’s multiplier; page retention and dofollow conditions vary by option.' }
    ],
    loginRequirement: 'unknown',
    reviewMethod: 'community', backlinkRel: 'mixed', listingIndexability: 'unknown', availability: 'open', verifiedAt: '2026-09-27'
  }
]

function normalizeDomain(url: string) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '').replace(/\.$/, '')
  } catch {
    return ''
  }
}

/** Fail early so duplicate records cannot silently appear in the directory or routes. */
function assertUniqueDirectoryLinks(links: DirectoryLink[]) {
  const ids = new Map<string, DirectoryLink>()
  const domains = new Map<string, DirectoryLink>()

  for (const link of links) {
    const previousId = ids.get(link.id)
    if (previousId) {
      throw new Error(`Duplicate directory link id "${link.id}" (${previousId.homepageUrl} and ${link.homepageUrl}).`)
    }
    ids.set(link.id, link)

    const domain = normalizeDomain(link.homepageUrl)
    if (!domain) {
      throw new Error(`Invalid homepageUrl for directory link "${link.id}": ${link.homepageUrl}`)
    }
    const previousDomain = domains.get(domain)
    if (previousDomain) {
      throw new Error(`Duplicate directory website "${domain}" (${previousDomain.id} and ${link.id}). Keep one record or verify that these are distinct platforms.`)
    }
    domains.set(domain, link)
  }
}

assertUniqueDirectoryLinks(directoryLinkRecords)

type AhrefsDrCache = { ratings: Record<string, { value: number; checkedAt: string }> }
const ahrefsDrCache = ahrefsDrData as AhrefsDrCache

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
  zh: { free: '免费', paid: '收费', 'backlink-free': '回链免费', conditional: '有条件免费' },
  en: { free: 'Free', paid: 'Paid', 'backlink-free': 'Free with backlink', conditional: 'Conditional free' }
}

export const productTypeLabels: Record<LinkLanguage, Record<ProductType, string>> = {
  zh: { website: '网站', app: 'APP', plugin: '插件', 'desktop-software': '桌面软件' },
  en: { website: 'Website', app: 'App', plugin: 'Plugin', 'desktop-software': 'Desktop software' }
}

export const backlinkLabels: Record<LinkLanguage, Record<BacklinkRel, string>> = {
  zh: { follow: 'Follow', nofollow: 'Nofollow', ugc: 'UGC', sponsored: 'Sponsored', mixed: '因方案而异', unknown: '未知' },
  en: { follow: 'Follow', nofollow: 'Nofollow', ugc: 'UGC', sponsored: 'Sponsored', mixed: 'Varies by plan', unknown: 'Unknown' }
}

export const loginRequirementLabels: Record<LinkLanguage, Record<LoginRequirement, string>> = {
  zh: { required: '登录', 'not-required': '无需登录', conditional: '登录', unknown: '登录要求未确认' },
  en: { required: 'Login required', 'not-required': 'No login required', conditional: 'Login needed at a later step', unknown: 'Login requirement unconfirmed' }
}
