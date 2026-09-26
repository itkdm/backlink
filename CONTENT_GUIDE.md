# 页面元数据与导航内容规范

## 页面元数据

每个公开页面填写唯一的 `title` 和准确的 `description`。Canonical、Open Graph、Twitter Card 和结构化数据由 `docs/.vitepress/seo.ts` 集中生成。

除非确有需要，不添加 `keywords`、虚构的 `date` 或重复的 `author`。正式站点域名为 `https://apilaile.com`，构建时通过 `SITE_URL` 注入。

## 外链条目

导航数据位于 `docs/.vitepress/data/links.ts`。每条记录包括稳定 ID、分类 ID、名称、官网 URL、中英文介绍和推荐标记（按需）。

只填写可确认的官方网站或项目主页，说明保持简短、客观；条目不代表本站与该网站存在合作或背书关系。新增语言时，为字段提供对应翻译。
