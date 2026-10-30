# 部署说明

站点是纯静态的（`npm run build` 生成 `dist/`），任何静态托管都能放。
当前 **csk66.ink 指向腾讯云 EdgeOne Pages**（阿里云解析里是 CNAME → `csk66.ink.pages.dnsoe5.com`）。

## 一、腾讯云 EdgeOne Pages（当前使用）

### 首次：用 GitHub 仓库部署（推荐）

1. 登录 [EdgeOne 控制台](https://console.cloud.tencent.com/edgeone) → **Pages**
2. **新建项目 → 导入 Git 仓库**，授权 GitHub 后选 `ChenShoukang/csk66-blog`（分支 `main`）
3. 构建设置：
   - 框架预设：Astro（没有预设就直接填命令）
   - 构建命令：`npm run build`
   - 输出目录：`dist`
   - Node 版本：`24`（或 18 以上）
   - 环境变量：可不填；要换域名时加 `SITE_URL=https://你的域名`
4. 点部署，等构建完成
5. **域名管理 → 添加域名** `csk66.ink`；如果它已经绑在旧项目上，先在旧项目里解绑，再绑到新项目

之后每次 `git push` 到 `main`，EdgeOne Pages 都会自动重新构建、部署。

### 已经部署过旧版本？

线上目前还是旧版（没有 RSS / 分享卡片等新功能）。打开原来的 Pages 项目，二选一：

- **关联 Git**：在项目设置里把源码改成 GitHub `ChenShoukang/csk66-blog`，重新部署
- **手动上传**：本地 `npm run build`，把 `dist/` 里的内容打包上传覆盖（或解压仓库根目录的 `csk66-site.zip` 上传）

### DNS（阿里云）

域名在阿里云买的，解析也还在阿里云（`dns31/dns32.hichina.com`），**不用改 NS**。
保持现在这条记录即可：

| 主机记录 | 类型 | 记录值 |
| --- | --- | --- |
| `@` | CNAME | `csk66.ink.pages.dnsoe5.com` |
| `www` | CNAME | 同上（如果要用 www） |

EdgeOne Pages 会自动签发 HTTPS 证书，不需要手动传证书。

> 备案：EdgeOne Pages 全球节点一般不需要 ICP 备案；如果控制台要求，按提示操作即可（`.ink` 能否备案以管局为准）。

## 二、Vercel（备选）

1. [vercel.com](https://vercel.com) → New Project → Import Git Repository → 选 `csk66-blog`
2. 自动识别 Astro（Build `npm run build`，Output `dist`），Deploy
3. Settings → Environment Variables 加 `SITE_URL=https://csk66.ink`，重新部署
4. Settings → Domains 添加 `csk66.ink`，按提示到阿里云把上面的 CNAME 改成 Vercel 给的记录

## 三、手动上传到任意服务器

```bash
npm run build
```

把 `dist/` 里的内容上传到网站根目录即可（Nginx / Apache / 对象存储静态托管都行）。

## 构建产物里有什么

- 所有页面（首页 / 博客 / 项目 / 作品 / 书影音 / 关于 / 404）
- `_astro/` 样式、脚本、字体
- `videos/` 压好的 Motion Reel 和封面
- `rss.xml`、`robots.txt`、`sitemap-index.xml`、`og-image.png`、`.nojekyll`
