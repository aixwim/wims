import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { siteUrl } from '@/lib/url';

export const dynamic = 'force-static';

const base = '/wims';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticPages = [
    { url: siteUrl + base + '/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: siteUrl + base + '/posts/', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: siteUrl + base + '/tags/', lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: siteUrl + base + '/about/', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: siteUrl + base + '/contact/', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: siteUrl + base + '/search/', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  const postPages = posts.map((post) => ({
    url: siteUrl + base + `/posts/${post.slug}/`,
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const allTags = [...new Set(posts.flatMap((p) => p.tags))];
  const tagPages = allTags.map((tag) => ({
    url: siteUrl + base + `/tags/${tag}/`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...tagPages];
}
