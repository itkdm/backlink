# 页面元数据与导航内容规范

## 页面元数据

每个公开页面填写唯一的 `title` 和准确的 `description`。Canonical、Open Graph、Twitter Card 和结构化数据由 `docs/.vitepress/seo.ts` 集中生成。

中英文页面共用不含文字的 `docs/public/social/default-share.jpg`（1200 × 630）；`og:title`、`og:description` 和图片替代文本按页面语言生成。不要把页面标题烘焙进分享图。

## 站点级 SEO

VitePress 内建 sitemap 由 `docs/.vitepress/config.mts` 中的 `sitemap.hostname` 启用。`docs/public/robots.txt` 允许通用爬虫、搜索爬虫和 AI 搜索/训练爬虫访问，并声明 sitemap。`docs/public/llms.txt` 只维护人工精选的核心入口，不复制全站 sitemap；站点 head 通过 `rel="describedby"` 提供发现入口。

除非确有需要，不添加 `keywords`、虚构的 `date` 或重复的 `author`。正式站点域名为 `https://apilaile.com`，构建时通过 `SITE_URL` 注入。

## 产品提交平台条目

平台内容按 `docs/platform-records/<id>.md` 一个平台一份文件维护。YAML frontmatter 使用 JSON-compatible YAML，保存稳定 ID、分类、中英文名称与简介、SEO 标题与描述、官网、实际提交入口、费用方式、适用产品类型、审核方式、外链属性、列表页索引状态、提交状态和最近核实日期。正文必须用 `<!-- locale:zh -->` 与 `<!-- locale:en -->` 分隔成中英文内容，包含用户有用的费用与提交说明，并附上直接支持关键事实的官方来源链接。未知信息不要写进正文。

构建时 `docs/platforms.data.ts` 汇总平台元数据供首页、目录和详情组件使用；`docs/.vitepress/data/platform-records.ts` 校验必填字段、枚举值、中英文内容、日期和重复 ID/域名。新增平台通常只需新增一份 Markdown 文件。费用/产品类型标签等分类体系属于代码，只有增加新分类或改变展示行为时才改 `.vitepress/data/directory-types.ts` 与 `links.ts`。DR 为可选字段，必须包含数值、数据来源和核实日期；展示 Ahrefs DR 时，在指标附近保留 “Domain Rating by Ahrefs” 链接。

### 平台 Markdown 结构

文件名必须与 frontmatter 中的 `id` 相同。`sortOrder` 控制目录展示顺序；新增记录使用未占用的整数。`seo.title` 和 `seo.description` 的中英文值会分别用于 `/directory/<id>` 和 `/en/directory/<id>` 的页面元数据。

```md
---
{
  "id": "example-platform",
  "sortOrder": 9,
  "name": { "zh": "Example", "en": "Example" },
  "description": { "zh": "中文简介。", "en": "English summary." },
  "seo": {
    "title": { "zh": "Example 提交平台", "en": "Example Submission Platform" },
    "description": { "zh": "准确的中文页面摘要。", "en": "An accurate English page summary." }
  },
  "homepageUrl": "https://example.com/",
  "submissionUrl": "https://example.com/submit",
  "feeModels": ["free"],
  "loginRequirement": "unknown",
  "accepts": ["website"],
  "reviewMethod": "unknown",
  "backlinkRel": "unknown",
  "listingIndexability": "unknown",
  "availability": "open",
  "verifiedAt": "2026-09-28"
}
---

<!-- locale:zh -->

## 费用与收录方式

填写有官方来源支持、对投稿者有用的信息，并附来源链接。

## 投稿要求

只描述已核实的资格、材料和流程。

<!-- locale:en -->

## Fees and Listing

Write useful, verified details with links to official sources.

## Submission Requirements

Describe confirmed eligibility, materials, and steps.
```

实际记录还应包含核实到的 `pricingUrl`、`logoUrl`、`popular`、`featured` 等可选字段。正文应包含至少一个官方 HTTPS 来源链接；中英文正文分别构建到对应语言的详情页。筛选字段只承担分类用途，费用细节、投稿条件和证据链接以 Markdown 正文为准。

仅收录允许用户提交 SaaS、AI 工具或其他出海互联网产品的平台目录、发布社区。优先链接到实际提交入口，不要把普通 SaaS/AI 工具本身或只提供其他提交站清单的资源作为目录条目。费用、外链、索引、审核和可用状态只能依据平台当前官方说明记录；无法确认时填 `unknown`，不得推测。DR 不得虚构；没有已授权、可追溯的来源时留空。简短客观地说明用途，不承诺一定收录、带来流量或 SEO 效果。新增语言时，为所有面向读者的字段提供对应翻译。
