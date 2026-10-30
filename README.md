# csk66 的博客

基于 [Astro](https://astro.build) 的个人博客，纯静态页面，设计灵感来自 bu44er.ink，并做了自己的风格：
夜空星空背景、会变色并自动消散 / 聚合的粒子 Logo、`Ctrl + K` 全站搜索、深浅色切换。

## 本地运行

需要 Node.js 18 以上。

```bash
npm install
npm run dev
```

打开 http://localhost:4321 即可预览，改动会实时刷新。

## 写文章

1. 复制 `templates/post-template.md` 到 `src/content/blog/`，改个文件名（例如 `my-first-post.md`）
2. 修改开头的 `title`、`date`、`summary`、`tags`
3. 用 Markdown 写正文

文件名就是网址：`my-first-post.md` → `/posts/my-first-post`。

## 写作品（书 / 影 / 音）

作品页分三层：

- `/works` —— 书 / 影 / 音 三个书架
- `/works/<分区>` —— 分区内按栏目分组（书：译作 / 小说 / 杂文；影：推荐作品 / 我的作品；音：推荐专辑 / 我的创作）
- `/works/<分区>/<栏目>/<文件名>` —— 每篇作品的详情页

1. 复制 `templates/work-template.md`
2. 按分类放进 `src/content/works/` 下对应的目录（目录名见模板注释）
3. 改开头的 `title`、`date`、`summary`、`tags`，把 `draft` 改成 `false`
4. 用 Markdown 写正文

栏目名字和顺序在 `src/data/works.ts` 里改。

## 写项目

项目页的卡片和详情页来自 `src/content/projects/` 里的 Markdown：

1. 在 `src/content/projects/` 新建 `<项目名>.md`
2. 开头写 `title`、`desc`（卡片上的一两句简介）、`tech`（技术标签）、`year`，可选 `link`（访问地址）、`repo`（源码地址）、`cover`（封面图）
3. 正文用 Markdown 写项目详情，会显示在 `/projects/<文件名>/`

## 常改的地方

| 想改什么 | 文件 |
| --- | --- |
| 站名、简介、打字机句子、邮箱、GitHub、导航 | `src/config.ts` |
| 项目 | `src/content/projects/*.md`（每个项目一个 md，卡片和详情页都来自它） |
| 作品栏目（书 / 影 / 音 的栏目名和顺序） | `src/data/works.ts` |
| 作品内容 | `src/content/works/<分区>/<栏目>/*.md`，模板见 `templates/work-template.md` |
| 关于页 | `src/pages/about.astro` |
| 颜色 / 字体 | `src/styles/global.css` 顶部的变量 |
| 首页粒子 Logo | `src/components/Hero.astro` |
| 星空背景 | `src/components/Sky.astro` |

`src/config.ts` 里留空的字段（比如邮箱、地点）不会显示在页面上。

## 部署

站点是纯静态的，代码在 GitHub：<https://github.com/ChenShoukang/csk66-blog>

当前部署在**腾讯云 EdgeOne Pages** 项目 `001`，域名 **https://csk66.ink**。

- **自动部署**：push 到 `main` 后由 GitHub Actions（`.github/workflows/deploy.yml`）自动构建并发布
- **手动部署**：`npm run build` 后用 D 盘上的 EdgeOne CLI 发布
- 完整说明（CLI、DNS、Vercel / 手动上传备选）见 [docs/deploy.md](docs/deploy.md)
