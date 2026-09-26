<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { backlinkLabels, categories, directoryLinks, feeLabels, productTypeLabels, type FeeModel, type LinkLanguage } from '../../data/links'

const props = defineProps<{ locale: LinkLanguage }>()
const locale = computed(() => props.locale)
const query = ref('')
const activeCategory = ref('all')
const activeFee = ref<FeeModel | 'all'>('all')
const searchInput = ref<HTMLInputElement>()

function focusSearch(event: KeyboardEvent) {
  const target = event.target
  const isTyping = target instanceof HTMLElement && (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  if (event.key === '/' && !isTyping) { event.preventDefault(); searchInput.value?.focus() }
}

function applyCategoryFromHash() {
  const categoryId = window.location.hash.slice(1)
  if (categories.some((category) => category.id === categoryId)) activeCategory.value = categoryId
}

onMounted(() => {
  window.addEventListener('keydown', focusSearch)
  window.addEventListener('hashchange', applyCategoryFromHash)
  applyCategoryFromHash()
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', focusSearch)
  window.removeEventListener('hashchange', applyCategoryFromHash)
})

const text = computed(() => props.locale === 'zh'
  ? {
      eyebrow: 'PRODUCT SUBMISSION DIRECTORY', search: '搜索平台、产品类型或要求…', all: '全部平台', allFees: '全部费用',
      results: (count: number) => `${count} 个提交入口`, visit: '前往提交', homepage: '官网', pricing: '定价',
      empty: '没有找到匹配的提交平台，换个关键词试试。', label: '产品提交平台', featured: '推荐入口',
      fee: '费用', accepts: '接受产品', backlink: '外链属性', dr: 'DR', details: '收录信息', requirements: '提交要求',
      review: '审核方式', editorial: '编辑审核', community: '社区发布', automated: '自动审核', unknown: '未知',
      indexability: '页面索引', indexable: '可索引（已知）', noindex: '不索引（已知）', availability: '提交状态',
      open: '开放', paused: '暂停', checked: (date: string) => `信息核实于 ${date}`, drPending: '—',
      note: '费用、审核、外链与收录状态可能变化，请以平台当前页面为准。DR 仅在有可靠数据来源时展示。'
    }
  : {
      eyebrow: 'PRODUCT SUBMISSION DIRECTORY', search: 'Search platforms, product types, or requirements…', all: 'All platforms', allFees: 'All fee types',
      results: (count: number) => `${count} submission sites`, visit: 'Submit product', homepage: 'Website', pricing: 'Pricing',
      empty: 'No matching submission platforms. Try another search.', label: 'Product submission platforms', featured: 'Featured',
      fee: 'Fee', accepts: 'Accepted products', backlink: 'Backlink', dr: 'DR', details: 'Listing details', requirements: 'Requirements',
      review: 'Review', editorial: 'Editorial', community: 'Community', automated: 'Automated', unknown: 'Unknown',
      indexability: 'Indexability', indexable: 'Indexable (known)', noindex: 'Noindex (known)', availability: 'Submission',
      open: 'Open', paused: 'Paused', checked: (date: string) => `Verified ${date}`, drPending: '—',
      note: 'Fees, review, backlink, and listing status can change. Check the platform for current terms. DR is shown only when reliable data is available.'
    })

const feeOptions = computed(() => Object.keys(feeLabels[locale.value]) as FeeModel[])
const filteredLinks = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase()
  return directoryLinks.filter((link) => {
    const matchesCategory = activeCategory.value === 'all' || link.category === activeCategory.value
    const matchesFee = activeFee.value === 'all' || link.feeModel === activeFee.value
    const values = [link.name[locale.value], link.description[locale.value], link.homepageUrl, link.submissionUrl,
      link.feeSummary[locale.value], ...link.requirements.map((item) => item[locale.value]),
      ...link.accepts.map((type) => productTypeLabels[locale.value][type]),
      ...categories.filter((category) => category.id === link.category).map((category) => category.name[locale.value])]
    const matchesQuery = !normalizedQuery || values.some((value) => value.toLowerCase().includes(normalizedQuery))
    return matchesCategory && matchesFee && matchesQuery
  })
})

function favicon(url: string, logoUrl?: string) {
  if (logoUrl) return logoUrl
  try { return `${new URL(url).origin}/favicon.ico` }
  catch { return '' }
}
</script>

<template>
  <section id="directory" class="directory-shell">
    <div class="directory-heading">
      <div>
        <p class="directory-eyebrow">{{ text.eyebrow }}</p>
        <div class="directory-title-row">
          <h2>{{ text.label }}</h2>
          <a class="ahrefs-attribution" href="https://ahrefs.com/" target="_blank" rel="noopener noreferrer">Domain Rating by Ahrefs</a>
        </div>
      </div>
      <p class="directory-count">{{ text.results(filteredLinks.length) }}</p>
    </div>

    <div class="directory-controls">
      <label class="directory-search">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input ref="searchInput" v-model="query" type="search" :placeholder="text.search" :aria-label="text.search">
        <kbd>/</kbd>
      </label>
      <div class="fee-filters" role="group" :aria-label="text.fee">
        <button :class="{ active: activeFee === 'all' }" @click="activeFee = 'all'">{{ text.allFees }}</button>
        <button v-for="fee in feeOptions" :key="fee" :class="{ active: activeFee === fee }" @click="activeFee = fee">{{ feeLabels[locale][fee] }}</button>
      </div>
      <div class="category-filters" role="group" :aria-label="text.label">
        <button :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'">{{ text.all }}</button>
        <button v-for="category in categories" :key="category.id" :id="category.id" :class="{ active: activeCategory === category.id }" @click="activeCategory = category.id">{{ category.name[locale] }}</button>
      </div>
    </div>

    <div v-if="filteredLinks.length" class="directory-grid">
      <article v-for="(link, index) in filteredLinks" :key="link.id" class="directory-card" :style="{ '--card-index': index }">
        <div class="card-topline">
          <span class="site-logo-fallback" aria-hidden="true">{{ link.name[locale].slice(0, 1) }}</span>
          <img class="site-logo" :src="favicon(link.homepageUrl, link.logoUrl)" :alt="''" loading="lazy" @error="($event.target as HTMLImageElement).style.display = 'none'">
          <span class="card-category">{{ categories.find((category) => category.id === link.category)?.name[locale] }}</span>
          <span v-if="link.featured" class="featured-pill">{{ text.featured }}</span>
          <span class="dr-badge" :title="text.dr"><strong>{{ link.domainRating?.value ?? text.drPending }}</strong><small>DR</small></span>
        </div>
        <h3>{{ link.name[locale] }}</h3>
        <p class="card-description">{{ link.description[locale] }}</p>
        <div class="card-badges">
          <span class="fee-badge">{{ feeLabels[locale][link.feeModel] }}</span>
          <span class="rel-badge">{{ backlinkLabels[locale][link.backlinkRel] }}</span>
        </div>
        <div class="card-actions">
          <a :href="link.submissionUrl" target="_blank" rel="noopener noreferrer">{{ text.visit }} <span aria-hidden="true">↗</span></a>
          <a :href="link.homepageUrl" target="_blank" rel="noopener noreferrer" class="secondary-link">{{ text.homepage }}</a>
          <a v-if="link.pricingUrl" :href="link.pricingUrl" target="_blank" rel="noopener noreferrer" class="secondary-link">{{ text.pricing }}</a>
        </div>
        <details class="card-details">
          <summary>{{ text.details }}</summary>
          <div class="details-content">
            <p><strong>{{ text.fee }}:</strong> {{ link.feeSummary[locale] }}</p>
            <p><strong>{{ text.accepts }}:</strong> {{ link.accepts.map((type) => productTypeLabels[locale][type]).join(' · ') }}</p>
            <p><strong>{{ text.requirements }}:</strong> {{ link.requirements.map((item) => item[locale]).join(' ') }}</p>
            <p><strong>{{ text.review }}:</strong> {{ text[link.reviewMethod] }}</p>
            <p><strong>{{ text.backlink }}:</strong> {{ backlinkLabels[locale][link.backlinkRel] }}</p>
            <p><strong>{{ text.indexability }}:</strong> {{ link.listingIndexability === 'indexable' ? text.indexable : link.listingIndexability === 'noindex' ? text.noindex : text.unknown }}</p>
            <p><strong>{{ text.availability }}:</strong> {{ link.availability === 'open' ? text.open : link.availability === 'paused' ? text.paused : text.unknown }}</p>
            <p class="verified-date">{{ text.checked(link.verifiedAt) }}</p>
          </div>
        </details>
      </article>
    </div>
    <div v-else class="directory-empty">{{ text.empty }}</div>

    <p class="directory-note">{{ text.note }}</p>

    <div class="directory-category-list">
      <section v-for="(category, index) in categories" :key="category.id" class="directory-category">
        <span class="category-index">{{ String(index + 1).padStart(2, '0') }}</span>
        <div><h2>{{ category.name[locale] }}</h2><p>{{ category.description[locale] }}</p></div>
        <button :aria-label="category.name[locale]" @click="activeCategory = category.id; query = ''; activeFee = 'all'; document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })">↗</button>
      </section>
    </div>
  </section>
</template>
