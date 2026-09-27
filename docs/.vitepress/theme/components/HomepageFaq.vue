<script setup lang="ts">
import { computed } from 'vue'
import type { LinkLanguage } from '../../data/links'

const props = defineProps<{ locale: LinkLanguage }>()

const content = computed(() => props.locale === 'zh'
  ? {
      title: '常见问题',
      intro: '关于平台范围、费用和资料信息的简要说明。',
      questions: [
        {
          question: '布吉岛外链导航是做什么的？',
          answer: '布吉岛整理第三方产品提交平台，帮助你了解平台要求并找到官方投稿入口。我们不代替平台审核或提交产品。',
          href: '/about',
          linkText: '了解目录定位'
        },
        {
          question: '可以为哪些产品查找提交平台？',
          answer: '目录覆盖网站、APP、插件和桌面软件。各平台接受的产品类型不同，提交前请查看平台详情和官方收录标准。',
          href: '/directory/',
          linkText: '浏览提交平台'
        },
        {
          question: '使用布吉岛或提交产品需要付费吗？',
          answer: '浏览和筛选布吉岛目录目前免费。第三方平台的投稿方案可能免费、收费、要求回链，或附带其他免费条件；费用与要求以平台当前页面为准。',
          href: '/directory/',
          linkText: '查看平台费用'
        },
        {
          question: '提交后一定会被收录或获得外链吗？',
          answer: '不能保证。平台有自己的审核和收录决定权；是否提供外链、链接属性和适用条件也可能因平台或方案而异。提交入口或 DR 都不代表流量或搜索排名保证。',
          href: '/about',
          linkText: '查看信息核实说明'
        },
        {
          question: 'DR 是什么？DR 高就代表平台更好吗？',
          answer: 'DR 是 Ahrefs 衡量域名反向链接资料的 0–100 指标，不是 Google 排名分数，也不能单独判断受众、审核通过率或提交效果。',
          href: 'https://ahrefs.com/seo/glossary/domain-rating',
          linkText: '查看 Ahrefs 对 DR 的说明',
          external: true
        },
        {
          question: '怎么找到适合自己产品的平台？',
          answer: '在广场按产品类型、费用和 DR 区间筛选，再打开详情查看投稿入口、登录要求和已确认的提交条件。',
          href: '/directory/',
          linkText: '前往广场筛选'
        },
        {
          question: '平台资料会一直准确吗？',
          answer: '资料优先依据平台官方投稿页、定价页和帮助文档整理；详情页会列出可查来源与核实日期。规则可能变化，提交前请再次确认官方页面。',
          href: '/about',
          linkText: '了解信息来源'
        }
      ]
    }
  : {
      title: 'Frequently Asked Questions',
      intro: 'Quick answers about the directory, platform fees, and listing information.',
      questions: [
        {
          question: 'What is Bujidao Link Directory?',
          answer: 'Bujidao is a directory of third-party product submission platforms. It helps you review their requirements and find official submission pages; we do not submit products or make acceptance decisions.',
          href: '/en/about',
          linkText: 'About the directory'
        },
        {
          question: 'What kinds of products can I find submission platforms for?',
          answer: 'The directory covers websites, apps, plugins, and desktop software. Each platform accepts different product types, so check its details and official criteria before submitting.',
          href: '/en/directory/',
          linkText: 'Browse platforms'
        },
        {
          question: 'Is Bujidao free to use? Are submissions free?',
          answer: 'Browsing and filtering Bujidao is currently free. Third-party platforms may offer free, paid, backlink-required, or other conditional plans. Check each platform’s current terms.',
          href: '/en/directory/',
          linkText: 'Compare platform fees'
        },
        {
          question: 'Will my product be accepted or receive a backlink?',
          answer: 'There is no guarantee. Each platform makes its own review and listing decisions. Backlink availability and attributes vary by platform and plan; a listing or DR does not guarantee traffic or search rankings.',
          href: '/en/about',
          linkText: 'Read our verification notes'
        },
        {
          question: 'What does Domain Rating (DR) mean?',
          answer: 'DR is Ahrefs’ 0–100 metric for the relative strength of a domain’s backlink profile. It is not a Google ranking score and does not measure acceptance likelihood or guarantee SEO results.',
          href: 'https://ahrefs.com/seo/glossary/domain-rating',
          linkText: 'Ahrefs’ explanation of DR',
          external: true
        },
        {
          question: 'How do I find a suitable platform?',
          answer: 'Filter the directory by accepted product type, fees, and DR range, then review the platform details and its official submission page.',
          href: '/en/directory/',
          linkText: 'Filter the directory'
        },
        {
          question: 'How current is the information?',
          answer: 'Entries are based on official submission, pricing, and help pages. Platform details include available sources and a verification date. Requirements can change, so confirm them on the official page before submitting.',
          href: '/en/about',
          linkText: 'How we verify information'
        }
      ]
    })
</script>

<template>
  <section class="home-faq" aria-labelledby="home-faq-title">
    <header class="home-faq-heading">
      <h2 id="home-faq-title">{{ content.title }}</h2>
      <p>{{ content.intro }}</p>
    </header>

    <div class="home-faq-list">
      <details v-for="item in content.questions" :key="item.question" class="home-faq-item">
        <summary>{{ item.question }}</summary>
        <p>
          {{ item.answer }}
          <a
            v-if="item.href"
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener noreferrer' : undefined"
          >{{ item.linkText }}</a>
        </p>
      </details>
    </div>
  </section>
</template>
