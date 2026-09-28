import ahrefsDrData from './ahrefs-dr.json'
import { data as platformRecords } from '../../platforms.data'
import type { DirectoryLink, LinkLanguage, FeeModel, BacklinkRel, LoginRequirement, ProductType, PaidPromotion } from './directory-types'

export type {
  DirectoryLink,
  LinkLanguage,
  LocalizedText,
  FeeModel,
  BacklinkRel,
  LoginRequirement,
  ListingIndexability,
  ReviewMethod,
  ProductType,
  PaidPromotion
} from './directory-types'

type AhrefsDrCache = { ratings: Record<string, { value: number; checkedAt: string }> }
const ahrefsDrCache = ahrefsDrData as AhrefsDrCache

function normalizeDomain(url: string) {
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '').replace(/\.$/, '')
  } catch {
    return ''
  }
}

export const directoryLinks: DirectoryLink[] = platformRecords.map((link) => {
  const rating = ahrefsDrCache.ratings[normalizeDomain(link.homepageUrl)]
  return rating
    ? { ...link, domainRating: { value: rating.value, source: 'Ahrefs', checkedAt: rating.checkedAt } }
    : link
})

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

export function domainRatingStyle(value?: number): Record<string, string> {
  const progress = Math.min(100, Math.max(0, value ?? 0))
  return { '--dr-progress': `${progress}%` }
}
