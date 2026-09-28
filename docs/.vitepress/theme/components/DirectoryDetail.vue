<script setup lang="ts">
import { computed } from 'vue'
import { backlinkLabels, directoryLinks, domainRatingStyle, feeLabels, loginRequirementLabels, productTypeLabels, type LinkLanguage, type ReviewMethod } from '../../data/links'

const props = defineProps<{ id: string; locale: LinkLanguage }>()
const locale = computed(() => props.locale)
const link = computed(() => directoryLinks.find((item) => item.id === props.id))
const copy = computed(() => props.locale === 'zh'
  ? { back: '返回广场', submit: '前往提交', website: '访问官网', pricing: '查看定价', sources: '官方信息来源', about: '平台简介', category: '平台类型', platform: '链接收录平台', fee: '费用方式', feeNote: '费用说明', login: '是否需要登录', loginNote: '登录说明', accepted: '可收录对象', requirements: '提交要求', review: '审核方式', editorial: '编辑审核', community: '社区审核 / 发布', automated: '自动审核', unknown: '未知', backlink: '外链属性', indexability: '列表页索引状态', indexable: '可索引', noindex: '不索引', status: '提交状态', open: '开放', paused: '暂停', verified: '信息核实日期', dr: 'Domain Rating', notFound: '没有找到这个平台。' }
  : { back: 'Back to directory', submit: 'Submit a product', website: 'Visit website', pricing: 'View pricing', sources: 'Official sources', about: 'About', category: 'Platform type', platform: 'Product link submission platform', fee: 'Fee model', feeNote: 'Fee details', login: 'Login required', loginNote: 'Login details', accepted: 'Accepted formats', requirements: 'Requirements', review: 'Review method', editorial: 'Editorial review', community: 'Community review / launch', automated: 'Automated review', unknown: 'Unknown', backlink: 'Backlink attribute', indexability: 'Listing indexability', indexable: 'Indexable', noindex: 'Noindex', status: 'Submission status', open: 'Open', paused: 'Paused', verified: 'Last verified', dr: 'Domain Rating', notFound: 'Platform not found.' })

const reviewLabel = computed(() => {
  if (!link.value) return copy.value.unknown
  const labels: Record<ReviewMethod, string> = {
    editorial: copy.value.editorial,
    community: copy.value.community,
    automated: copy.value.automated,
    unknown: copy.value.unknown
  }
  return labels[link.value.reviewMethod]
})

function favicon(homepageUrl: string, logoUrl?: string) {
  if (logoUrl) return logoUrl
  try { return `${new URL(homepageUrl).origin}/favicon.ico` } catch { return '' }
}

function logoAlt(name: string) {
  return props.locale === 'zh' ? `${name} 平台标志` : `${name} platform logo`
}
</script>

<template>
  <article v-if="link" class="site-detail">
    <a class="site-detail-back" :href="locale === 'zh' ? '/directory/' : '/en/directory/'">← {{ copy.back }}</a>
    <header class="site-detail-header">
      <div class="site-detail-logo-wrap">
        <span class="site-detail-logo-fallback" aria-hidden="true">{{ link.name[locale].slice(0, 1) }}</span>
        <img class="site-detail-logo" :src="favicon(link.homepageUrl, link.logoUrl)" :alt="logoAlt(link.name[locale])" @error="($event.target as HTMLImageElement).style.display = 'none'">
      </div>
      <div class="site-detail-title">
        <p class="directory-eyebrow">{{ copy.platform }}</p>
        <h1>{{ link.name[locale] }}</h1>
        <p>{{ link.description[locale] }}</p>
      </div>
      <div class="site-detail-dr" :style="domainRatingStyle(link.domainRating?.value)">
        <strong>{{ link.domainRating?.value ?? '—' }}</strong>
        <span>DR</span>
        <a href="https://ahrefs.com/" target="_blank" rel="noopener noreferrer">Domain Rating by Ahrefs</a>
      </div>
    </header>

    <div class="site-detail-actions">
      <a class="site-detail-primary" :href="link.submissionUrl" target="_blank" rel="noopener noreferrer">{{ copy.submit }} ↗</a>
      <a class="site-detail-secondary" :href="link.homepageUrl" target="_blank" rel="noopener noreferrer">{{ copy.website }} ↗</a>
      <a v-if="link.pricingUrl" class="site-detail-secondary" :href="link.pricingUrl" target="_blank" rel="noopener noreferrer">{{ copy.pricing }} ↗</a>
    </div>

    <section class="site-detail-section">
      <h2>{{ copy.about }}</h2>
      <dl class="site-detail-facts">
        <div><dt>{{ copy.category }}</dt><dd>{{ copy.platform }}</dd></div>
        <div v-if="link.feeModels.length"><dt>{{ copy.fee }}</dt><dd>{{ link.feeModels.map((fee) => feeLabels[locale][fee]).join(' · ') }}</dd></div>
        <div v-if="link.loginRequirement !== 'unknown'"><dt>{{ copy.login }}</dt><dd>{{ loginRequirementLabels[locale][link.loginRequirement] }}</dd></div>
        <div v-if="link.backlinkRel !== 'unknown'"><dt>{{ copy.backlink }}</dt><dd>{{ backlinkLabels[locale][link.backlinkRel] }}</dd></div>
        <div v-if="link.reviewMethod !== 'unknown'"><dt>{{ copy.review }}</dt><dd>{{ reviewLabel }}</dd></div>
        <div v-if="link.listingIndexability !== 'unknown'"><dt>{{ copy.indexability }}</dt><dd>{{ link.listingIndexability === 'indexable' ? copy.indexable : copy.noindex }}</dd></div>
        <div v-if="link.availability !== 'unknown'"><dt>{{ copy.status }}</dt><dd>{{ link.availability === 'open' ? copy.open : copy.paused }}</dd></div>
        <div><dt>{{ copy.verified }}</dt><dd>{{ link.verifiedAt }}</dd></div>
        <div v-if="link.domainRating"><dt>{{ copy.dr }}</dt><dd>{{ `${link.domainRating.value} · ${link.domainRating.source} · ${link.domainRating.checkedAt}` }}</dd></div>
      </dl>
      <p v-if="link.feeModels.length" class="site-detail-fee-note"><strong>{{ copy.feeNote }}:</strong> {{ link.feeSummary[locale] }}</p>
      <p v-if="link.loginRequirement !== 'unknown' && link.loginNote" class="site-detail-fee-note"><strong>{{ copy.loginNote }}:</strong> {{ link.loginNote[locale] }}</p>
    </section>

    <section class="site-detail-section">
      <h2>{{ copy.accepted }}</h2>
      <div class="site-detail-tags"><span v-for="type in link.accepts" :key="type">{{ productTypeLabels[locale][type] }}</span></div>
    </section>

    <section class="site-detail-section">
      <h2>{{ copy.requirements }}</h2>
      <ul><li v-for="(requirement, index) in link.requirements" :key="index">{{ requirement[locale] }}</li></ul>
    </section>

    <section v-if="link.sources.length" class="site-detail-section">
      <h2>{{ copy.sources }}</h2>
      <ul class="site-detail-source-list">
        <li v-for="source in link.sources" :key="source.url">
          <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label[locale] }} ↗</a>
        </li>
      </ul>
    </section>
  </article>
  <p v-else class="site-detail-not-found">{{ copy.notFound }}</p>
</template>
