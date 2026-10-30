import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts() {
  const posts = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// 中文按字数、英文按词数估算阅读时间
export function readingTime(body = '') {
  const cjk = (body.match(/[\u4e00-\u9fff]/g) || []).length;
  const words = body.replace(/[\u4e00-\u9fff]/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(cjk / 400 + words / 220));
}

// 短格式 2026-10-27，长格式 2026 年 10 月 27 日
export function formatDate(d: Date, long = false) {
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth() + 1;
  const day = d.getUTCDate();
  if (long) return `${y} 年 ${m} 月 ${day} 日`;
  return `${y}-${String(m).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

export const slugify = (t: string) => t.toLowerCase().trim().replace(/\s+/g, '-');

export function tagCounts(posts: Post[]) {
  const m = new Map<string, number>();
  for (const p of posts) for (const t of p.data.tags) m.set(slugify(t), (m.get(slugify(t)) || 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
}

// 给没有封面的文章一个稳定的配色
export function hueOf(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}
