import { getCollection } from 'astro:content';
import { getPosts, formatDate } from '../utils';

export async function GET() {
  const posts = (await getPosts()).map((p) => ({
    title: p.data.title,
    url: `/posts/${p.id}`,
    type: '文章',
    tags: p.data.tags,
    summary: p.data.summary ?? '',
    date: formatDate(p.data.date),
  }));

  const docs = (await getCollection('docs')).map((entry) => {
    const slug = entry.id.replace(/^kok\//, '');
    return {
      title: entry.data.title,
      url: entry.id === 'kok' ? '/docs/kok/' : `/docs/kok/${slug}/`,
      type: '文档',
      tags: ['kok', '帮助中心'],
      summary: entry.data.description ?? '',
      date: '',
    };
  });

  return new Response(JSON.stringify([...posts, ...docs]), {
    headers: { 'Content-Type': 'application/json' },
  });
}
