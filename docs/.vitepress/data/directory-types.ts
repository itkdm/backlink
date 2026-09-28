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
  sortOrder: number
  name: LocalizedText
  description: LocalizedText
  seo: { title: LocalizedText; description: LocalizedText }
  searchText: LocalizedText
  logoUrl?: string
  homepageUrl: string
  submissionUrl: string
  pricingUrl?: string
  feeModels: FeeModel[]
  loginRequirement: LoginRequirement
  accepts: ProductType[]
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

export type PlatformMarkdown = {
  record: Omit<DirectoryLink, 'searchText' | 'domainRating'>
  body: LocalizedText
}
