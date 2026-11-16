// robots.txt is generated so the sitemap address always follows site.url.
import { site } from '../content/site.js';

export function GET() {
  const body = `User-agent: *\nAllow: /\n\nSitemap: ${new URL('/sitemap-index.xml', site.url).href}\n`;
  return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}
