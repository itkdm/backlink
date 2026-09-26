<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vitepress'
import { backlinkLabels, categories, directoryLinks, domainRatingStyle, feeLabels, productTypeLabels, type FeeModel, type LinkLanguage } from '../../data/links'

const props = defineProps<{ locale: LinkLanguage }>()
const router = useRouter()
const locale = computed(() => props.locale)
const query = ref('')
const activeCategory = ref('all')
const activeFee = ref<FeeModel | 'all'>('all')
const activeDrRange = ref('all')
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
      search: '搜索平台、产品类型或要求…', all: '全部平台', allFees: '全部费用',
      empty: '没有找到匹配的提交平台，换个关键词试试。', label: '产品提交平台', featured: '推荐入口',
      fee: '费用', dr: 'DR', drRange: 'DR 区间', allDr: '全部 DR',
      introduction: '费用、审核、外链与收录状态可能变化，请以平台当前页面为准。',
      note: '外链属性和收录状态仅在有可靠依据时记录；DR 不代表外链效果或排名保证。'
    }
  : {
      search: 'Search platforms, product types, or requirements…', all: 'All platforms', allFees: 'All fee types',
      empty: 'No matching submission platforms. Try another search.', label: 'Product submission platforms', featured: 'Featured',
      fee: 'Fee', dr: 'DR', drRange: 'DR range', allDr: 'All DR',
      introduction: 'Fees, review, backlink, and listing status may change. Check each platform’s current page.',
      note: 'Backlink attributes and indexability are recorded only when reliable evidence is available. DR does not guarantee link impact or rankings.'
    })

const feeOptions = computed(() => (Object.keys(feeLabels[locale.value]) as FeeModel[]).filter((fee) => fee !== 'unknown'))
const drRangeOptions = computed(() => [
  { value: 'all', label: text.value.allDr },
  { value: '0-20', label: '0–20' },
  { value: '21-40', label: '21–40' },
  { value: '41-60', label: '41–60' },
  { value: '61-80', label: '61–80' },
  { value: '81-100', label: '81–100' }
])
const filteredLinks = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase()
  return directoryLinks.filter((link) => {
    const matchesCategory = activeCategory.value === 'all' || link.category === activeCategory.value
    const matchesFee = activeFee.value === 'all' || link.feeModel === activeFee.value
    const matchesDr = activeDrRange.value === 'all' || (() => {
      const [minimum, maximum] = activeDrRange.value.split('-').map(Number)
      const value = link.domainRating?.value
      return value !== undefined && value >= minimum && value <= maximum
    })()
    const values = [link.name[locale.value], link.description[locale.value], link.homepageUrl, link.submissionUrl,
      link.feeSummary[locale.value], ...link.requirements.map((item) => item[locale.value]),
      ...link.accepts.map((type) => productTypeLabels[locale.value][type]),
      ...categories.filter((category) => category.id === link.category).map((category) => category.name[locale.value])]
    const matchesQuery = !normalizedQuery || values.some((value) => value.toLowerCase().includes(normalizedQuery))
    return matchesCategory && matchesFee && matchesDr && matchesQuery
  })
})

function favicon(url: string, logoUrl?: string) {
  if (logoUrl) return logoUrl
  try { return `${new URL(url).origin}/favicon.ico` }
  catch { return '' }
}

function openDetails(id: string) {
  router.go(`${props.locale === 'zh' ? '/directory/' : '/en/directory/'}${id}`)
}
</script>

<template>
  <section id="directory" class="directory-shell">
    <div class="directory-controls">
      <div class="directory-search-scene">
        <header class="directory-search-intro">
          <h2>{{ text.label }}</h2>
          <p>{{ text.introduction }} <a href="https://ahrefs.com/" target="_blank" rel="noopener noreferrer">Domain Rating by Ahrefs</a></p>
        </header>
        <label class="directory-search">
          <span class="search-icon" aria-hidden="true">⌕</span>
          <input ref="searchInput" v-model="query" type="search" :placeholder="text.search" :aria-label="text.search">
          <kbd>/</kbd>
        </label>
        <img class="directory-search-mascot" src="/backlink-search-mascot.png" alt="" aria-hidden="true">
      </div>
      <div class="fee-filters" role="group" :aria-label="text.fee">
        <button :class="{ active: activeFee === 'all' }" @click="activeFee = 'all'">{{ text.allFees }}</button>
        <button v-for="fee in feeOptions" :key="fee" :class="{ active: activeFee === fee }" @click="activeFee = fee">{{ feeLabels[locale][fee] }}</button>
      </div>
      <div class="dr-range-filters" role="group" :aria-label="text.drRange">
        <button v-for="range in drRangeOptions" :key="range.value" :class="{ active: activeDrRange === range.value }" @click="activeDrRange = range.value">{{ range.label }}</button>
      </div>
      <div class="category-filters" role="group" :aria-label="text.label">
        <button :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'">{{ text.all }}</button>
        <button v-for="category in categories" :key="category.id" :id="category.id" :class="{ active: activeCategory === category.id }" @click="activeCategory = category.id">{{ category.name[locale] }}</button>
      </div>
    </div>

    <div v-if="filteredLinks.length" class="directory-grid">
      <article v-for="(link, index) in filteredLinks" :key="link.id" class="directory-card" :style="{ '--card-index': index }" role="link" tabindex="0" @click="openDetails(link.id)" @keydown.enter.self="openDetails(link.id)">
        <div class="card-topline">
          <span class="site-logo-fallback" aria-hidden="true">{{ link.name[locale].slice(0, 1) }}</span>
          <img class="site-logo" :src="favicon(link.homepageUrl, link.logoUrl)" :alt="''" loading="lazy" @error="($event.target as HTMLImageElement).style.display = 'none'">
          <span class="card-category" :title="categories.find((category) => category.id === link.category)?.name[locale] || (locale === 'zh' ? '其他目录' : 'Other directory')">{{ categories.find((category) => category.id === link.category)?.name[locale] || (locale === 'zh' ? '其他目录' : 'Other directory') }}</span>
          <span v-if="link.featured" class="featured-pill">{{ text.featured }}</span>
          <span v-if="link.domainRating" class="dr-badge" :style="domainRatingStyle(link.domainRating.value)" :title="text.dr"><strong>{{ link.domainRating.value }}</strong><small>DR</small></span>
        </div>
        <h3 :title="link.name[locale] || link.homepageUrl">{{ link.name[locale] || link.homepageUrl }}</h3>
        <p class="card-description" :title="link.description[locale]">{{ link.description[locale] || (locale === 'zh' ? '暂无简介' : 'Description unavailable') }}</p>
        <div class="directory-card-footer">
          <div class="card-badges">
            <span v-if="link.feeModel !== 'unknown'" class="fee-badge">{{ feeLabels[locale][link.feeModel] }}</span>
            <span v-if="link.backlinkRel !== 'unknown'" class="rel-badge">{{ backlinkLabels[locale][link.backlinkRel] }}</span>
          </div>
          <a class="directory-card-link" :href="link.homepageUrl" target="_blank" rel="noopener noreferrer" @click.stop>{{ locale === 'zh' ? '进入平台' : 'Visit platform' }} <span aria-hidden="true">↗</span></a>
        </div>
      </article>
    </div>
    <div v-else class="directory-empty">{{ text.empty }}</div>

    <p class="directory-note">{{ text.note }}</p>

  </section>
</template>
