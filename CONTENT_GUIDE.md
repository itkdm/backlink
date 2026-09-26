# 页面元数据与导航内容规范

## 页面元数据

每个公开页面填写唯一的 `title` 和准确的 `description`。Canonical、Open Graph、Twitter Card 和结构化数据由 `docs/.vitepress/seo.ts` 集中生成。

除非确有需要，不添加 `keywords`、虚构的 `date` 或重复的 `author`。正式站点域名为 `https://apilaile.com`，构建时通过 `SITE_URL` 注入。

## 产品提交平台条目

导航数据位于 `docs/.vitepress/data/links.ts`。每条记录包括稳定 ID、分类 ID、平台名称、实际提交入口 URL、中英文介绍和推荐标记（按需）。

仅收录允许用户提交 SaaS、AI 工具或其他出海互联网产品的平台目录、发布社区及相关提交清单。优先链接到实际提交入口，不要把普通 SaaS/AI 工具本身作为目录条目。简短客观地说明用途；不承诺一定收录、带来流量或 SEO 效果，外链类型、费用和审核规则以平台当前说明为准。新增语言时，为字段提供对应翻译。
