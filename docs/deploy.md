# 部署说明

站点是纯静态的（`npm run build` 生成 `dist/`），部署在 **腾讯云 EdgeOne Pages**：

- 项目：`001`（Project ID `makers-e7butzobsbjv`，直传类型）
- 生产域名：**https://csk66.ink**（阿里云解析 CNAME → `csk66.ink.pages.dnsoe5.com`）
- 部署地址：https://001-jzkmfopa.edgeone.dev

## 一、自动部署（当前方式，推荐）

推送到 `main` 就会自动构建并发布，不需要手动操作：

- 工作流：`.github/workflows/deploy.yml`
- 触发：`push` 到 `main`，或在 GitHub Actions 页面手动 **Run workflow**
- 步骤：`npm ci` → `npm run build` → `npx edgeone makers deploy dist -n 001 -e production`
- 认证：仓库 Secret **`EDGEONE_PAGES_API_TOKEN`**（EdgeOne API Token，只存在 GitHub Secrets 里，不落本地）
- 环境变量：`EDGEONE_PAGES_API_REGION=china`（不指定时 CLI 会自动探测区域，CI 里容易探测错导致 token 被判无效）
- 部署命令带 3 次重试，EdgeOne API 偶发 5xx/522 时会自动重试

> 部署完成后约 10~30 秒生效；GitHub 仓库的 **Actions** 页可以看每次日志。

## 二、手动部署（CLI，备用）

EdgeOne CLI 装在 **D 盘**（不占 C 盘）：`D:\aiwork\tools\node_modules\.bin\edgeone.cmd`

```powershell
# 首次登录（在项目根目录 csk66 下运行；凭据存到项目的 .edgeone\，不会写到 C 盘）
powershell -ExecutionPolicy Bypass -File D:\aiwork\tools\edgeone.ps1 login --site china --local

# 发布
npm run build
powershell -ExecutionPolicy Bypass -File D:\aiwork\tools\edgeone.ps1 makers deploy dist -n 001 -e production
```

也可以不登录，直接带 API Token：

```powershell
D:\aiwork\tools\node_modules\.bin\edgeone.cmd makers deploy dist -n 001 -e production -t "<EdgeOne API Token>"
```

## 三、DNS（阿里云）

域名在阿里云买的，解析还在阿里云（`dns31/dns32.hichina.com`），**不用改 NS**：

| 主机记录 | 类型 | 记录值 |
| --- | --- | --- |
| `@` | CNAME | `csk66.ink.pages.dnsoe5.com` |
| `www` | CNAME | 同上（要用 www 的话） |

EdgeOne 会自动签发 HTTPS 证书；备案按控制台要求处理（`.ink` 能否备案以管局为准）。

## 四、备选：Vercel

1. [vercel.com](https://vercel.com) → New Project → Import Git Repository → 选 `csk66-blog`
2. 构建命令 `npm run build`，输出目录 `dist`；加环境变量 `SITE_URL=https://csk66.ink`
3. Settings → Domains 添加 `csk66.ink`，按提示把阿里云的 CNAME 改成 Vercel 的记录

## 五、手动上传

```powershell
npm run build
```

把 `dist/` 里的内容上传到任意静态服务器即可（Nginx / Apache / 对象存储静态托管都行）。

## 构建产物里有什么

- 所有页面（首页 / 博客 / 项目 / 作品 / 书影音 / 关于 / 404）
- `_astro/` 样式、脚本、字体
- `videos/` 压好的 Motion Reel 和封面
- `rss.xml`、`robots.txt`、`sitemap-index.xml`、`og-image.png`、`.nojekyll`
