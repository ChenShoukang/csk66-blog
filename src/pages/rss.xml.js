import { getPosts } from '../utils';
import { SITE } from '../config';

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET({ site }) {
  const origin = (site ?? new URL('https://csk66.example.com')).origin;
  const posts = await getPosts();
  const items = posts
    .map((p) => {
      const url = `${origin}/posts/${p.id}/`;
      const categories = p.data.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n');
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${p.data.date.toUTCString()}</pubDate>
      ${p.data.summary ? `<description>${esc(p.data.summary)}</description>` : ''}
${categories}
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.title)}</title>
    <link>${origin}/</link>
    <description>${esc(SITE.description)}</description>
    <language>zh-cn</language>
    <atom:link href="${origin}/rss.xml" rel="self" type="application/rss+xml" />
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
