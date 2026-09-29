<script setup lang="ts">
import { computed } from 'vue'
import type { LinkLanguage } from '../../data/links'

const props = defineProps<{ locale: LinkLanguage }>()

const content = computed(() => props.locale === 'zh'
  ? {
      title: '常见问题',
      intro: '从筛选平台、判断费用到核对投稿规则，先了解这些要点再开始提交。',
      questions: [
        {
          question: '布吉岛外链导航是做什么的？',
          answer: '布吉岛整理接受产品投稿的目录和发布社区，汇总适用产品类型、费用分类、已核实的投稿要求与官方入口，帮助你比较和准备。平台的审核、收录和展示决定由第三方作出；布吉岛不代替平台投稿，也不保证结果。',
          href: '/about',
          linkText: '了解目录定位'
        },
        {
          question: '可以为哪些产品查找提交平台？',
          answer: '目录覆盖网站、APP、插件和桌面软件。一个平台可能只接受其中几类，或对产品是否上线、能否试用、功能范围等设有自己的条件。先用类型筛选缩小范围，再打开详情核对官方资格要求。',
          href: '/directory/',
          linkText: '浏览提交平台'
        },
        {
          question: '使用布吉岛或提交产品需要付费吗？',
          answer: '浏览和筛选布吉岛目录免费。第三方条目的费用标签用于区分免费、收费、需添加回链的免费方案，以及附带其他条件的免费方案；同一平台也可能同时提供免费投稿和付费推广。请打开详情查看条件、适用方案和官方定价，提交前再以平台当前页面为准。',
          href: '/directory/',
          linkText: '查看平台费用'
        },
        {
          question: '提交后一定会被收录或获得外链吗？',
          answer: '不能保证。每个平台自行决定是否审核通过、是否公开展示以及展示多久；有些方案还要求先满足回链或其他条件。外链是否提供、链接属性和适用方案也各不相同。目录只在有依据时展示这些信息，收录入口或 DR 都不代表流量和搜索排名保证。',
          href: '/about',
          linkText: '查看信息核实说明'
        },
        {
          question: 'DR 是什么？DR 高就代表平台更好吗？',
          answer: 'DR（Domain Rating）是 Ahrefs 用来衡量域名反向链接资料相对强度的 0–100 指标。它不是 Google 排名分数，也不能说明平台受众是否适合你的产品、投稿是否会通过，或链接能带来多少访问和搜索效果。比较平台时可把 DR 当作一项参考，不要单独据此决定。',
          href: 'https://ahrefs.com/seo/glossary/domain-rating',
          linkText: '查看 Ahrefs 对 DR 的说明',
          external: true
        },
        {
          question: '怎么找到适合自己产品的平台？',
          answer: '先按产品类型排除不适用的平台，再结合费用标签和 DR 区间筛选。对候选平台，查看当前开放状态、登录要求、接受的产品类型、费用与回链条件、最近核实日期，并通过详情页的官方链接复查投稿规则。DR 适合辅助比较，不是平台质量或收录概率排名。',
          href: '/directory/',
          linkText: '前往广场筛选'
        },
        {
          question: '提交前建议准备哪些资料？',
          answer: '先确认产品页面可以正常访问，并准备准确的产品名称、官网链接和简短介绍；如果平台要求，也准备 Logo、产品截图、定价信息或演示入口。各平台表单不同，这些资料不一定都必填。以详情页列出的官方表单和规则为准，不要填写未经证实的用户数、效果或认证信息。',
          href: '/directory/',
          linkText: '查看各平台投稿要求'
        },
        {
          question: '详情页没有显示某项要求，是否表示不需要？',
          answer: '不一定。页面只展示有可靠来源支持的信息；未显示的字段不能当作平台承诺“没有要求”。提交前请打开详情页的官方投稿入口和规则页面，确认当前表单要求。',
          href: '/about',
          linkText: '了解资料核实方式'
        },
        {
          question: '平台资料会一直准确吗？',
          answer: '资料根据平台官方投稿页、规则、帮助中心和定价页整理；详情页会列出相关来源及最近核实日期。这个日期表示我们最近一次检查，不代表平台承诺规则在此后不变。若发现入口失效或内容过期，可以反馈给我们；正式投稿前仍请以平台当前页面为准。',
          href: '/about',
          linkText: '了解信息来源'
        }
      ]
    }
  : {
      title: 'Frequently Asked Questions',
      intro: 'Understand platform fit, fee labels, and submission requirements before you start.',
      questions: [
        {
          question: 'What is Bujidao Link Directory?',
          answer: 'Bujidao lists directories and launch communities that accept product submissions. Entries summarize accepted formats, fee categories, verified requirements, and official submission links so you can compare and prepare. Third-party platforms make their own review, listing, and display decisions; Bujidao does not submit products or guarantee an outcome.',
          href: '/en/about',
          linkText: 'About the directory'
        },
        {
          question: 'What kinds of products can I find submission platforms for?',
          answer: 'The directory covers websites, apps, plugins, and desktop software. A platform may accept only some formats or set conditions for launch status, usability, or product scope. Filter by type first, then check the platform’s official eligibility rules.',
          href: '/en/directory/',
          linkText: 'Browse platforms'
        },
        {
          question: 'Is Bujidao free to use? Are submissions free?',
          answer: 'Browsing and filtering Bujidao is free. Fee labels distinguish free, paid, free with a required backlink, and other conditional free options. A platform may offer both free submissions and paid promotion. Open its details to review the conditions and applicable plans, then confirm current terms on the official pricing or submission page.',
          href: '/en/directory/',
          linkText: 'Compare platform fees'
        },
        {
          question: 'Will my product be accepted or receive a backlink?',
          answer: 'There is no guarantee. Each platform decides whether to accept a submission, publish it, and how long to display it; some plans require a backlink or other conditions. Backlink availability, attributes, and eligible plans vary. The directory shows these details only when supported by evidence, and neither a listing nor DR guarantees traffic or search rankings.',
          href: '/en/about',
          linkText: 'Read our verification notes'
        },
        {
          question: 'What does Domain Rating (DR) mean?',
          answer: 'Domain Rating (DR) is Ahrefs’ 0–100 metric for the relative strength of a domain’s backlink profile. It is not a Google ranking score and does not tell you whether the audience fits your product, whether a submission will be accepted, or how much traffic or search impact a link may bring. Treat it as one comparison point, not a verdict.',
          href: 'https://ahrefs.com/seo/glossary/domain-rating',
          linkText: 'Ahrefs’ explanation of DR',
          external: true
        },
        {
          question: 'How do I find a suitable platform?',
          answer: 'Filter by product type first, then compare fee labels and DR ranges. For each candidate, review its current availability, login requirement, accepted formats, fee and backlink conditions, and verification date. Follow the official links on the detail page to recheck the current rules. DR is a reference metric, not a ranking of quality or acceptance odds.',
          href: '/en/directory/',
          linkText: 'Filter the directory'
        },
        {
          question: 'What should I prepare before submitting?',
          answer: 'Make sure your product page is accessible and prepare an accurate product name, website URL, and short description. If requested, also gather a logo, screenshots, pricing details, or a demo link. Forms differ, so these items are not required everywhere. Follow the platform’s official form and avoid unsupported claims about users, results, or certifications.',
          href: '/en/directory/',
          linkText: 'Review platform requirements'
        },
        {
          question: 'Does a detail page omission mean the platform has no such requirement?',
          answer: 'Not necessarily. We show only information supported by reliable sources; an omitted field is not a promise that the platform has no requirement. Before submitting, open the official form and rules linked from the detail page.',
          href: '/en/about',
          linkText: 'How we verify information'
        },
        {
          question: 'How current is the information?',
          answer: 'Entries are based on official submission pages, rules, help centers, and pricing pages. Details link to relevant sources and show the latest verification date. That date records our last check; it is not a promise that the platform’s rules have stayed unchanged since then. Report a broken link or outdated detail, and always confirm current requirements on the platform before submitting.',
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
