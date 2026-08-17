import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { siteUrl, href } from '@/lib/url';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticPages = [
    { url: siteUrl + href('/'), lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1.0 },
    { url: siteUrl + href('/posts/'), lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: siteUrl + href('/tags/'), lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.6 },
    { url: siteUrl + href('/about/'), lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: siteUrl + href('/contact/'), lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: siteUrl + href('/search/'), lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
  ];

  const postPages = posts.map((post) => ({
    url: siteUrl + href(`/posts/${post.slug}/`),
    lastModified: post.date,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const allTags = [...new Set(posts.flatMap((p) => p.tags))];
  const tagPages = allTags.map((tag) => ({
    url: siteUrl + href(`/tags/${tag}/`),
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...postPages, ...tagPages];
}
