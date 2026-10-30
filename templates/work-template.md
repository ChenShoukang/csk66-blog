---
title: 标题
date: 2026-01-01
summary: 一句话概括，会显示在列表和详情页开头。
tags: []
# 可选字段，按分类使用：
# author: 作者 / 导演 / 音乐人
# year: 2026
# rating: 4.5
# link: https://example.com
# cover: /images/example.jpg
draft: true
---

正文用 Markdown 写。

## 放置位置

- 书 · 译作 → `src/content/works/books/translation/文件名.md`
- 书 · 小说 → `src/content/works/books/novel/文件名.md`
- 书 · 杂文 → `src/content/works/books/essay/文件名.md`
- 影 · 推荐作品 → `src/content/works/films/recommend/文件名.md`
- 影 · 我的作品 → `src/content/works/films/mine/文件名.md`
- 音 · 推荐专辑 → `src/content/works/music/album/文件名.md`
- 音 · 我的创作 → `src/content/works/music/creation/文件名.md`

文件名就是网址里的 slug，例如 `books/novel/hello-world.md` → `/works/books/novel/hello-world/`。

`draft: true` 的条目只有本地开发时能看到，改 false 才会出现在正式构建里。
