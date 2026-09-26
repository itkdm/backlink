# 布吉岛外链导航

基于 VitePress 的双语外链提交平台目录，默认中文，英文站位于 `/en/`。首页展示人工精选的热门平台和（有投放时）付费推广；“广场”位于 `/directory/`，提供完整搜索和筛选，点击平台卡片可进入对应详情页；另有博客与关于页面。专门整理可提交出海 SaaS、AI 工具和互联网产品的平台目录与发布社区，不收录普通工具导航。目录数据与界面分离，后续可通过新增 locale 和翻译字段扩展语言。

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

编辑 `docs/.vitepress/data/links.ts`，维护官网与提交入口、费用、适用产品、提交要求、审核方式、外链属性、索引状态和核实日期。无法确认的项目使用 `unknown`，不要猜测。Ahrefs DR 通过 `pnpm dr:sync` 从 Ahrefs 免费 Domain Rating API 批量同步到 `docs/.vitepress/data/ahrefs-dr.json`，卡片和详情页会读取同步结果。API Key 只放在本地 `.env`（可参考 `.env.example`），不要提交密钥。同步数据是构建时使用的静态快照；需要更新时重新运行同步命令并构建。展示 DR 时需保留 “Domain Rating by Ahrefs” 的链接归属说明。
