<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { categories, directoryLinks, type LinkLanguage } from '../../data/links'

const props = defineProps<{ locale: LinkLanguage }>()
const locale = computed(() => props.locale)
const query = ref('')
const activeCategory = ref('all')
const searchInput = ref<HTMLInputElement>()

function focusSearch(event: KeyboardEvent) {
  const target = event.target
  const isTyping = target instanceof HTMLElement && (
    target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
  )

  if (event.key === '/' && !isTyping) {
    event.preventDefault()
    searchInput.value?.focus()
  }
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
      eyebrow: 'PRODUCT SUBMISSION DIRECTORY',
      search: '搜索提交平台或产品类型…',
      all: '全部平台',
      results: (count: number) => `${count} 个提交入口`,
      visit: '前往提交',
      empty: '没有找到匹配的提交平台，换个关键词试试。',
      label: '产品提交平台',
      featured: '推荐入口',
      note: '平台的审核、费用、收录与外链属性以其当前规则为准。'
    }
  : {
      eyebrow: 'PRODUCT SUBMISSION DIRECTORY',
      search: 'Search submission sites or product types…',
      all: 'All platforms',
      results: (count: number) => `${count} submission pages`,
      visit: 'Go to submission',
      empty: 'No matching submission platforms. Try another search.',
      label: 'Product submission platforms',
      featured: 'Featured',
      note: 'Review, fees, acceptance, and backlink attributes are set by each platform and may change.'
    })

const filteredLinks = computed(() => {
  const normalizedQuery = query.value.trim().toLowerCase()

  return directoryLinks.filter((link) => {
    const matchesCategory = activeCategory.value === 'all' || link.category === activeCategory.value
    const matchesQuery = !normalizedQuery || [
      link.name[props.locale],
      link.description[props.locale],
      link.url,
      ...categories.filter((category) => category.id === link.category).map((category) => category.name[props.locale])
    ].some((value) => value.toLowerCase().includes(normalizedQuery))

    return matchesCategory && matchesQuery
  })
})
</script>

<template>
  <section id="directory" class="directory-shell">
    <div class="directory-heading">
      <div>
        <p class="directory-eyebrow">{{ text.eyebrow }}</p>
        <h2>{{ text.label }}</h2>
      </div>
      <p class="directory-count">{{ text.results(filteredLinks.length) }}</p>
    </div>

    <div class="directory-controls">
      <label class="directory-search">
        <span class="search-icon" aria-hidden="true">⌕</span>
        <input ref="searchInput" v-model="query" type="search" :placeholder="text.search" :aria-label="text.search">
        <kbd>/</kbd>
      </label>
      <div class="category-filters" role="group" :aria-label="text.label">
        <button :class="{ active: activeCategory === 'all' }" @click="activeCategory = 'all'">{{ text.all }}</button>
        <button
          v-for="category in categories"
          :key="category.id"
          :id="category.id"
          :class="{ active: activeCategory === category.id }"
          @click="activeCategory = category.id"
        >{{ category.name[locale] }}</button>
      </div>
    </div>

    <div v-if="filteredLinks.length" class="directory-grid">
      <article v-for="(link, index) in filteredLinks" :key="link.id" class="directory-card" :style="{ '--card-index': index }">
        <div class="card-topline">
          <span class="site-monogram" aria-hidden="true">{{ link.name[locale].slice(0, 1) }}</span>
          <span class="card-category">{{ categories.find((category) => category.id === link.category)?.name[locale] }}</span>
          <span v-if="link.featured" class="featured-pill">{{ text.featured }}</span>
          <span class="external-mark" aria-hidden="true">↗</span>
        </div>
        <h3>{{ link.name[locale] }}</h3>
        <p>{{ link.description[locale] }}</p>
        <a :href="link.url" target="_blank" rel="noopener noreferrer">
          {{ text.visit }} <span aria-hidden="true">↗</span>
        </a>
      </article>
    </div>
    <div v-else class="directory-empty">{{ text.empty }}</div>

    <p class="directory-note">{{ text.note }}</p>

    <div class="directory-category-list">
      <section v-for="category in categories" :key="category.id" class="directory-category">
        <span class="category-index">{{ String(categories.indexOf(category) + 1).padStart(2, '0') }}</span>
        <div>
          <h2>{{ category.name[locale] }}</h2>
          <p>{{ category.description[locale] }}</p>
        </div>
        <button :aria-label="category.name[locale]" @click="activeCategory = category.id; query = ''; document.getElementById('directory')?.scrollIntoView({ behavior: 'smooth' })">↗</button>
      </section>
    </div>
  </section>
</template>
