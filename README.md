# 布吉岛外链导航

基于 VitePress 的双语外链提交平台目录，默认中文，英文站位于 `/en/`。专门整理可提交出海 SaaS、AI 工具和互联网产品的平台目录、发布社区与提交清单，不收录普通工具导航。目录数据与界面分离，后续可通过新增 locale 和翻译字段扩展语言。

## 开发

```bash
pnpm install
pnpm docs:dev
```

本地地址：`http://localhost:5184/`

## 构建

```bash
pnpm docs:build
```

生产构建可通过 `SITE_URL=https://apilaile.com` 注入 canonical、Open Graph 和结构化数据所用的正式域名。

## 添加提交平台

编辑 `docs/.vitepress/data/links.ts`，维护官网与提交入口、费用、适用产品、提交要求、审核方式、外链属性、索引状态和核实日期。无法确认的项目使用 `unknown`，不要猜测。DR 数值是可选的来源标注数据；展示 Ahrefs DR 时需保留 “Domain Rating by Ahrefs” 的链接归属说明。页面卡片和筛选项由该文件生成。
