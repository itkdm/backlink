# AGENTS.md

本文件是 AI Agent 在本仓库中的协作入口。

## 项目定位

- 布吉岛外链提交导航：以中文为默认语言，提供英文版本，收录可提交出海 SaaS、AI 工具和互联网产品的平台与发布社区；不是普通工具导航。
- 技术栈为 VitePress + Markdown + 少量 Vue 组件，由 pnpm 管理。保留 VitePress 架构。
- 用户明确要求优先；不要擅自改变栏目、视觉和已确认内容。

## 开发

- Node.js 20+、pnpm 10+。
- `pnpm docs:dev` 在 `http://localhost:5184/` 启动。
- `pnpm docs:build` 构建到 `docs/.vitepress/dist/`。
- 5184 为本项目端口；不要停止或占用 SEO 项目 5181、电商项目 5182、AI Agent Guide 项目 5173。5183 当前属于 `D:\develop\project\shangan`。
- 修改 VitePress 配置、页面结构或 SEO 逻辑后运行 `pnpm docs:build`。

## 多语言与内容

- 中文默认路由位于 `docs/`，英文位于 `docs/en/`；VitePress locale 配置统一位于 `docs/.vitepress/config.mts`。
- 首页 `/` 仅展示品牌首屏、人工精选的热门平台，以及有付费推广条目时才显示的广告区；完整搜索筛选广场位于 `/directory/`，英文对应 `/en/directory/`。顶部主导航是“广场、博客、关于”。
- 平台详情页由 `docs/directory/[id].md` 和 `docs/en/directory/[id].md` 的动态路由生成，URL 为 `/directory/<id>` 和 `/en/directory/<id>`；平台内容来自 `docs/platform-records/<id>.md`，两个 locale 的 `[id].paths.ts` 自动生成详情路由并注入对应语言正文。
- 未来新增语言时，在 `docs/<locale>/` 添加对应页面，并在 VitePress `locales` 中登记语言、标题、描述和导航。
- 每个平台使用 `docs/platform-records/<id>.md` 单独维护，frontmatter 保存目录筛选字段与中英文 SEO 标题/描述，正文用 `<!-- locale:zh -->` 和 `<!-- locale:en -->` 分隔并引用官方来源。由 `docs/platforms.data.ts` 和 `docs/.vitepress/data/platform-records.ts` 构建时读取、校验；字段类型和分类标签分别维护在 `.vitepress/data/directory-types.ts`、`links.ts`。不要把平台记录写回代码，也不要收录仅供用户使用的普通 SaaS 或 AI 产品。
- Ahrefs DR 域名以这些 Markdown 记录中的 `homepageUrl` 为准。`docs/.vitepress/data/platform-record-source.mjs` 是构建与 `pnpm dr:sync` 共用的记录读取器；调整平台数据结构时保持共用，不要再从 `links.ts` 提取域名。部署工作流会在构建前同步 DR，要求配置 GitHub Actions secret `AHREFS_API_KEY`；本地可用 `.env` 中的同名变量运行 `pnpm dr:sync`。
- 页面 frontmatter 必须包含唯一 `title` 与准确的 `description`。SEO head 标签集中在 `docs/.vitepress/seo.ts`。
- 首页分享图统一位于 `docs/public/social/default-share.jpg`；SVG favicon 同时提供 128 × 128 PNG fallback。
- 正式域名为 `https://apilaile.com`。GitHub Actions 构建可通过 `SITE_URL` 注入正式域名；本地默认不生成依赖域名的标签。
- 不要编造发布日期、作者或站点背书；外链使用 `target="_blank"` 时必须带 `rel="noopener noreferrer"`。

## 协作边界

- 页面内容放在 `docs/`，公开资源放在 `docs/public/`。
- 不提交密钥、`.env`、`node_modules/` 或构建输出。
- 未经用户明确要求，不要提交、推送或部署。
