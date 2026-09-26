<script setup lang="ts">
import { computed } from 'vue'
import { backlinkLabels, categories, directoryLinks, domainRatingStyle, feeLabels, productTypeLabels, type LinkLanguage, type ReviewMethod } from '../../data/links'

const props = defineProps<{ id: string; locale: LinkLanguage }>()
const locale = computed(() => props.locale)
const link = computed(() => directoryLinks.find((item) => item.id === props.id))
const copy = computed(() => props.locale === 'zh'
  ? { back: '返回广场', submit: '前往提交', website: '访问官网', pricing: '查看定价', guidelines: '查看官方规则与说明', about: '平台简介', category: '分类', fee: '费用方式', feeNote: '费用说明', accepted: '接受的产品类型', requirements: '提交要求', review: '审核方式', editorial: '编辑审核', community: '社区审核 / 发布', automated: '自动审核', unknown: '未知', backlink: '外链属性', indexability: '列表页索引状态', indexable: '可索引', noindex: '不索引', status: '提交状态', open: '开放', paused: '暂停', verified: '信息核实日期', dr: 'Domain Rating', notFound: '没有找到这个平台。' }
  : { back: 'Back to directory', submit: 'Submit a product', website: 'Visit website', pricing: 'View pricing', guidelines: 'Official rules and details', about: 'About', category: 'Category', fee: 'Fee model', feeNote: 'Fee details', accepted: 'Accepted product types', requirements: 'Requirements', review: 'Review method', editorial: 'Editorial review', community: 'Community review / launch', automated: 'Automated review', unknown: 'Unknown', backlink: 'Backlink attribute', indexability: 'Listing indexability', indexable: 'Indexable', noindex: 'Noindex', status: 'Submission status', open: 'Open', paused: 'Paused', verified: 'Last verified', dr: 'Domain Rating', notFound: 'Platform not found.' })

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

const categoryName = computed(() => categories.find((item) => item.id === link.value?.category)?.name[locale.value] ?? copy.value.unknown)

function favicon(homepageUrl: string, logoUrl?: string) {
  if (logoUrl) return logoUrl
  try { return `${new URL(homepageUrl).origin}/favicon.ico` } catch { return '' }
}
</script>

<template>
  <article v-if="link" class="site-detail">
    <a class="site-detail-back" :href="locale === 'zh' ? '/directory/' : '/en/directory/'">← {{ copy.back }}</a>
    <header class="site-detail-header">
      <div class="site-detail-logo-wrap">
        <span class="site-detail-logo-fallback" aria-hidden="true">{{ link.name[locale].slice(0, 1) }}</span>
        <img class="site-detail-logo" :src="favicon(link.homepageUrl, link.logoUrl)" alt="" @error="($event.target as HTMLImageElement).style.display = 'none'">
      </div>
      <div class="site-detail-title">
        <p class="directory-eyebrow">{{ categoryName }}</p>
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
        <div><dt>{{ copy.category }}</dt><dd>{{ categoryName }}</dd></div>
        <div v-if="link.feeModel !== 'unknown'"><dt>{{ copy.fee }}</dt><dd>{{ feeLabels[locale][link.feeModel] }}</dd></div>
        <div v-if="link.backlinkRel !== 'unknown'"><dt>{{ copy.backlink }}</dt><dd>{{ backlinkLabels[locale][link.backlinkRel] }}</dd></div>
        <div v-if="link.reviewMethod !== 'unknown'"><dt>{{ copy.review }}</dt><dd>{{ reviewLabel }}</dd></div>
        <div v-if="link.listingIndexability !== 'unknown'"><dt>{{ copy.indexability }}</dt><dd>{{ link.listingIndexability === 'indexable' ? copy.indexable : copy.noindex }}</dd></div>
        <div v-if="link.availability !== 'unknown'"><dt>{{ copy.status }}</dt><dd>{{ link.availability === 'open' ? copy.open : copy.paused }}</dd></div>
        <div><dt>{{ copy.verified }}</dt><dd>{{ link.verifiedAt }}</dd></div>
        <div v-if="link.domainRating"><dt>{{ copy.dr }}</dt><dd>{{ `${link.domainRating.value} · ${link.domainRating.source} · ${link.domainRating.checkedAt}` }}</dd></div>
      </dl>
      <p v-if="link.feeModel !== 'unknown'" class="site-detail-fee-note"><strong>{{ copy.feeNote }}:</strong> {{ link.feeSummary[locale] }}</p>
      <p class="site-detail-source"><a :href="link.guidelinesUrl" target="_blank" rel="noopener noreferrer">{{ copy.guidelines }} ↗</a></p>
    </section>

    <section class="site-detail-section">
      <h2>{{ copy.accepted }}</h2>
      <div class="site-detail-tags"><span v-for="type in link.accepts" :key="type">{{ productTypeLabels[locale][type] }}</span></div>
    </section>

    <section class="site-detail-section">
      <h2>{{ copy.requirements }}</h2>
      <ul><li v-for="(requirement, index) in link.requirements" :key="index">{{ requirement[locale] }}</li></ul>
    </section>
  </article>
  <p v-else class="site-detail-not-found">{{ copy.notFound }}</p>
</template>
