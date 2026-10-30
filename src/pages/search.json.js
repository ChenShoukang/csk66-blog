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
  return new Response(JSON.stringify(posts), {
    headers: { 'Content-Type': 'application/json' },
  });
}
