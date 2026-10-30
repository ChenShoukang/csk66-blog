import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 部署后改成你自己的域名
  site: 'https://csk66.example.com',
  integrations: [sitemap()],
  // 悬停时预取站内链接，翻页更快
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  devToolbar: { enabled: false },
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'vitesse-dark' },
      defaultColor: false,
    },
  },
});
