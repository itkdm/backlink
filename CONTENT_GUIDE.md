# 页面元数据与导航内容规范

## 页面元数据

每个公开页面填写唯一的 `title` 和准确的 `description`。Canonical、Open Graph、Twitter Card 和结构化数据由 `docs/.vitepress/seo.ts` 集中生成。

中英文页面共用不含文字的 `docs/public/og-share-v2.jpg`（1200 × 630）；`og:title`、`og:description` 和图片替代文本按页面语言生成。不要把页面标题烘焙进分享图。

## 站点级 SEO

VitePress 内建 sitemap 由 `docs/.vitepress/config.mts` 中的 `sitemap.hostname` 启用。`docs/public/robots.txt` 允许通用爬虫、搜索爬虫和 AI 搜索/训练爬虫访问，并声明 sitemap。`docs/public/llms.txt` 只维护人工精选的核心入口，不复制全站 sitemap；站点 head 通过 `rel="describedby"` 提供发现入口。

除非确有需要，不添加 `keywords`、虚构的 `date` 或重复的 `author`。正式站点域名为 `https://apilaile.com`，构建时通过 `SITE_URL` 注入。

## 产品提交平台条目

导航数据位于 `docs/.vitepress/data/links.ts`。每条记录包括稳定 ID、分类、双语名称与介绍、官网、实际提交入口、费用方式与说明、适用产品类型、提交要求、审核方式、外链属性、列表页索引状态、提交状态和最近核实日期。定价页面和推荐标记按需填写。DR 为可选字段，必须包含数值、数据来源和核实日期；展示 Ahrefs DR 时，在指标附近保留 “Domain Rating by Ahrefs” 链接。

仅收录允许用户提交 SaaS、AI 工具或其他出海互联网产品的平台目录、发布社区。优先链接到实际提交入口，不要把普通 SaaS/AI 工具本身或只提供其他提交站清单的资源作为目录条目。费用、外链、索引、审核和可用状态只能依据平台当前官方说明记录；无法确认时填 `unknown`，不得推测。DR 不得虚构；没有已授权、可追溯的来源时留空。简短客观地说明用途，不承诺一定收录、带来流量或 SEO 效果。新增语言时，为所有面向读者的字段提供对应翻译。
