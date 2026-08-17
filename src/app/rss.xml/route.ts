import { getAllPosts } from '@/lib/posts';
import { siteUrl, href } from '@/lib/url';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteUrl + href(`/posts/${post.slug}/`)}</link>
      <guid isPermaLink="true">${siteUrl + href(`/posts/${post.slug}/`)}</guid>
      <description><![CDATA[${post.excerpt}]]></description>
      <pubDate>${post.date.toUTCString()}</pubDate>
    </item>`
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>aixwim</title>
  <link>${siteUrl + href('/')}</link>
  <description>Blog pribadi aixwim tentang teknologi, pengembangan web, dan catatan harian.</description>
  <language>id</language>
  <atom:link href="${siteUrl + href('/rss.xml')}" rel="self" type="application/rss+xml"/>
  ${items}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
