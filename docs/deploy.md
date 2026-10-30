# 部署说明

站点是纯静态的（`npm run build` 生成 `dist/`），当前部署在 **腾讯云 EdgeOne Pages**：

- 项目：`001`（Project ID `makers-e7butzobsbjv`，直传类型）
- 生产域名：**https://csk66.ink**（阿里云解析 CNAME → `csk66.ink.pages.dnsoe5.com`）
- 部署地址：https://001-jzkmfopa.edgeone.dev

## 一、日常部署（CLI 直传，当前方式）

```bash
# 第一次（本机已登录过可跳过）
npm i -g edgeone
edgeone login -s china

# 每次发布
npm run build
edgeone makers deploy dist -n 001 -e production
```

说明：

- 项目 `001` 是「直传类型」，`-n 001` 会更新到已有项目，不会新建
- 部署完成后约 10~30 秒生效，控制台「构建部署」里能看到记录
- 登录信息存在本机 `~/.edgeone`；换机器需要重新 `edgeone login -s china`
- CI / 非交互环境可以用 API Token：`edgeone makers deploy dist -n 001 -t <API Token>`（EdgeOne 控制台里生成）

## 二、想改成 Git 自动部署（可选）

当前项目 `001` 是直传类型，EdgeOne 的「Git 管理」需要新建 Git 项目再迁域名。两条路：

1. **EdgeOne Git 项目**：控制台新建 Pages 项目 → 导入 GitHub `ChenShoukang/csk66-blog`（构建命令 `npm run build`，输出 `dist`，Node 22+）→ 部署成功后，在「域名管理」把 `csk66.ink` 从 001 解绑、绑到新项目
2. **GitHub Actions + API Token**：仓库 Secrets 加 `EDGEONE_PAGES_API_TOKEN`，push 时执行 `edgeone makers deploy dist -n 001 -t $TOKEN`（不用迁项目，改动最小）

## 三、DNS（阿里云）

域名在阿里云买的，解析也还在阿里云（`dns31/dns32.hichina.com`），**不用改 NS**：

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

```bash
npm run build
```

把 `dist/` 里的内容上传到任意静态服务器即可（Nginx / Apache / 对象存储静态托管都行）。

## 构建产物里有什么

- 所有页面（首页 / 博客 / 项目 / 作品 / 书影音 / 关于 / 404）
- `_astro/` 样式、脚本、字体
- `videos/` 压好的 Motion Reel 和封面
- `rss.xml`、`robots.txt`、`sitemap-index.xml`、`og-image.png`、`.nojekyll`
