import type { APIRoute } from 'astro';
import { SITE } from '../config';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL('https://csk66.example.com')).origin;
  const body = ['User-agent: *', 'Allow: /', '', `# ${SITE.name}`, `Sitemap: ${origin}/sitemap-index.xml`, ''].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
