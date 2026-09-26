# 布吉岛外链导航

基于 VitePress 的双语网址导航，默认中文，英文站位于 `/en/`。目录数据与界面分离，后续可通过新增 locale 和翻译字段扩展语言。

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

## 添加导航链接

编辑 `docs/.vitepress/data/links.ts`，为每个站点填写 URL、分类、简短介绍以及中英文名称和说明。页面中的链接卡片由该数据文件生成。
