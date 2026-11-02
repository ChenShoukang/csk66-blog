import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkCallouts from './src/plugins/remark-callouts.mjs';

// 部署时可以用环境变量覆盖站点地址：Vercel 里加一条 SITE_URL 即可
const site = process.env.SITE_URL || 'https://csk66.ink';

export default defineConfig({
  // 站点域名（也可以用 SITE_URL 环境变量覆盖）
  site,
  integrations: [sitemap()],
  // 悬停时预取站内链接，翻页更快
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  markdown: {
    remarkPlugins: [remarkCallouts],
    shikiConfig: {
      themes: { light: 'github-light', dark: 'vitesse-dark' },
      defaultColor: false,
    },
  },
});
