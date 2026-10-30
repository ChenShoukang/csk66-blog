const fs = require('fs');
const ed = (f, fn) => fs.writeFileSync(f, fn(fs.readFileSync(f, 'utf8')));
const must = (s, a, b) => { if (!s.includes(a)) throw new Error('MISS: ' + a.slice(0, 60)); return s.replace(a, b); };
const cut = (s, re) => { if (!re.test(s)) throw new Error('MISS re: ' + re); return s.replace(re, ''); };

// 顶部导航：删掉「更多」下拉
ed('src/components/Header.astro', (s) => {
  s = must(s, "import { NAV, MORE } from '../config';", "import { NAV } from '../config';");
  s = cut(s, /\n    <div class="more">[\s\S]*?\n      <\/div>\n    <\/div>/);
  s = must(s, '{[...NAV, ...MORE].map(', '{NAV.map(');
  s = cut(s, /\n  \.more \{[\s\S]*?\n  \.more-menu a:hover \{[\s\S]*?\n  \}\n/);
  s = cut(s, /\n  const more = document\.querySelector\('\.more'\)![\s\S]*?more\.classList\.remove\('open'\);\n  \}\);\n/);
  return s;
});

// 页脚：「其他」一栏只放 GitHub / 邮箱，都没填就不显示
ed('src/components/Footer.astro', (s) => {
  s = must(s, "import { SITE, NAV, MORE } from '../config';", "import { SITE, NAV } from '../config';");
  s = must(s, `      <div class="col">
        <h4>其他</h4>
        {MORE.map((n) => <a href={n.href}><span class="hl">{n.label}</span></a>)}
`, `      {(SITE.github || SITE.email) && (
      <div class="col">
        <h4>其他</h4>
`);
  s = must(s, `        {SITE.email && <a href={\`mailto:\${SITE.email}\`}><span class="hl">邮箱</span></a>}
      </div>`, `        {SITE.email && <a href={\`mailto:\${SITE.email}\`}><span class="hl">邮箱</span></a>}
      </div>
      )}`);
  return s;
});

// 首页：只保留「最新文章」
ed('src/pages/index.astro', (s) => {
  s = must(s, "import { getPosts, getSnippets, formatDate } from '../utils';", "import { getPosts } from '../utils';");
  s = must(s, "const snippets = (await getSnippets()).slice(0, SITE.postsPerHome);\n", '');
  s = must(s, `        最新
        <button class="switch on" data-tab="posts"><span class="hl">文章</span></button>
        <span class="slash">/</span>
        <button class="switch" data-tab="snippets"><span class="hl">片段</span></button>`, `        最新文章`);
  s = must(s, ' id="view-all"', '');
  s = cut(s, /\n    <div class="pane snip-grid"[\s\S]*?\n    <\/div>\n/);
  s = cut(s, /\n<script>[\s\S]*?<\/script>\n/);
  s = cut(s, /\n  \.switch \{[\s\S]*?\n  \.slash \{[\s\S]*?\n  \}\n/);
  s = cut(s, /\n  \.pane\[hidden\] \{[\s\S]*?\n  \.snip time \{[\s\S]*?\n  \}\n/);
  return s;
});

// 首页 Hero：删掉 scroll 提示
ed('src/components/Hero.astro', (s) => {
  s = cut(s, /\n  <a href="#latest" class="scroll-hint mono"[\s\S]*?<\/a>\n/);
  s = cut(s, /\n  \.scroll-hint \{[\s\S]*?\n  @keyframes wheel \{[\s\S]*?\n  \}\n  \}\n/);
  return s;
});

// 工具函数 / 内容集合 / 搜索：去掉代码片段
ed('src/utils.ts', (s) => cut(s, /\nexport async function getSnippets\(\) \{[\s\S]*?\n\}\n/));
ed('src/content.config.ts', (s) => {
  s = cut(s, /\nconst snippets = defineCollection\(\{[\s\S]*?\n\}\);\n/);
  return must(s, 'export const collections = { blog, snippets };', 'export const collections = { blog };');
});
ed('src/pages/search.json.js', (s) => {
  s = must(s, "import { getPosts, getSnippets, formatDate } from '../utils';", "import { getPosts, formatDate } from '../utils';");
  s = cut(s, /\n  const snippets = \(await getSnippets\(\)\)[\s\S]*?\n  \}\)\);/);
  return must(s, 'JSON.stringify([...posts, ...snippets])', 'JSON.stringify(posts)');
});

// <head> 里的 RSS 链接
ed('src/layouts/Base.astro', (s) => cut(s, /\n    <link rel="alternate" type="application\/rss\+xml"[^\n]*/));

// 标签页的返回链接
ed('src/pages/tags/[tag].astro', (s) => must(s, '<a href="/tags" class="kicker"><span class="hl">← 全部标签</span></a>', '<a href="/blog" class="kicker"><span class="hl">← 全部文章</span></a>'));

// 搜索框占位文字
ed('src/components/Search.astro', (s) => must(s, '搜索文章、片段、标签…', '搜索文章、标签…'));
console.log('ok');
