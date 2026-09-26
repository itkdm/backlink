<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vitepress'
import { backlinkLabels, categories, directoryLinks, domainRatingStyle, feeLabels, paidPromotions, type LinkLanguage } from '../../data/links'

const props = defineProps<{ locale: LinkLanguage }>()
const router = useRouter()
const popularLinks = computed(() => directoryLinks.filter((link) => link.popular))
const copy = computed(() => props.locale === 'zh'
  ? { popular: '热门网站', popularSub: '值得优先了解的产品提交平台', all: '查看全部平台', backlink: '外链', ad: '付费推广', website: '进入平台', emptyPopular: '热门平台正在整理中。' }
  : { popular: 'Popular platforms', popularSub: 'Notable places to submit your product', all: 'Explore all platforms', backlink: 'Link', ad: 'Sponsored', website: 'Visit platform', emptyPopular: 'Popular picks are being curated.' })

function favicon(homepageUrl: string, logoUrl?: string) {
  if (logoUrl) return logoUrl
  try { return `${new URL(homepageUrl).origin}/favicon.ico` } catch { return '' }
}
</script>

<template>
  <div class="home-sections">
    <section class="home-featured" aria-labelledby="home-popular-title">
      <header class="home-section-heading">
        <div>
          <p v-if="props.locale === 'en'" class="directory-eyebrow">EDITOR PICKS</p>
          <h2 id="home-popular-title">{{ copy.popular }}</h2>
          <p>{{ copy.popularSub }}</p>
        </div>
        <a class="home-all-link" :href="props.locale === 'zh' ? '/directory/' : '/en/directory/'">{{ copy.all }} <span aria-hidden="true">↗</span></a>
      </header>

      <div v-if="popularLinks.length" class="home-popular-grid">
        <article v-for="link in popularLinks" :key="link.id" class="home-popular-card" role="link" tabindex="0" @click="router.go(`${props.locale === 'zh' ? '/directory/' : '/en/directory/'}${link.id}`)" @keydown.enter.self="router.go(`${props.locale === 'zh' ? '/directory/' : '/en/directory/'}${link.id}`)">
          <div class="home-popular-card-top">
            <span class="home-logo-fallback" aria-hidden="true">{{ link.name[props.locale].slice(0, 1) }}</span>
            <img class="home-logo" :src="favicon(link.homepageUrl, link.logoUrl)" alt="" loading="lazy" @error="($event.target as HTMLImageElement).style.display = 'none'">
          <span class="home-card-category" :title="categories.find((category) => category.id === link.category)?.name[props.locale] || (props.locale === 'zh' ? '其他目录' : 'Other directory')">{{ categories.find((category) => category.id === link.category)?.name[props.locale] || (props.locale === 'zh' ? '其他目录' : 'Other directory') }}</span>
            <span v-if="link.domainRating" class="home-dr" :style="domainRatingStyle(link.domainRating.value)"><strong>{{ link.domainRating.value }}</strong><small>DR</small></span>
          </div>
          <h3 :title="link.name[props.locale] || link.homepageUrl">{{ link.name[props.locale] || link.homepageUrl }}</h3>
          <p class="home-card-description" :title="link.description[props.locale]">{{ link.description[props.locale] || (props.locale === 'zh' ? '暂无简介' : 'Description unavailable') }}</p>
          <div class="home-card-footer">
            <div class="home-card-meta">
              <span v-if="link.feeModel !== 'unknown'">{{ feeLabels[props.locale][link.feeModel] }}</span>
              <span v-if="link.backlinkRel !== 'unknown'" :title="`${copy.backlink} · ${backlinkLabels[props.locale][link.backlinkRel]}`">{{ copy.backlink }} · {{ backlinkLabels[props.locale][link.backlinkRel] }}</span>
            </div>
            <a class="home-card-link" :href="link.homepageUrl" target="_blank" rel="noopener noreferrer" @click.stop>{{ copy.website }} <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      </div>
      <p v-else class="home-popular-empty">{{ copy.emptyPopular }}</p>
      <p class="home-dr-attribution"><a href="https://ahrefs.com/" target="_blank" rel="noopener noreferrer">Domain Rating by Ahrefs</a></p>
    </section>

    <section v-if="paidPromotions.length" class="home-advertisements" aria-labelledby="home-ads-title">
      <header class="home-section-heading">
        <div>
          <p class="directory-eyebrow">{{ copy.ad }}</p>
          <h2 id="home-ads-title">{{ props.locale === 'zh' ? '付费推广' : 'Sponsored placements' }}</h2>
        </div>
      </header>
      <div class="home-ad-grid">
        <article v-for="promotion in paidPromotions" :key="promotion.id" class="home-ad-card">
          <span class="home-ad-badge">{{ copy.ad }}</span>
          <span class="home-logo-fallback" aria-hidden="true">{{ promotion.name[props.locale].slice(0, 1) }}</span>
          <img class="home-logo" :src="promotion.logoUrl || favicon(promotion.url)" alt="" loading="lazy" @error="($event.target as HTMLImageElement).style.display = 'none'">
          <div class="home-ad-content"><h3>{{ promotion.name[props.locale] }}</h3><p>{{ promotion.description[props.locale] }}</p></div>
          <a :href="promotion.url" target="_blank" rel="noopener noreferrer">{{ copy.website }} ↗</a>
        </article>
      </div>
    </section>
  </div>
</template>
