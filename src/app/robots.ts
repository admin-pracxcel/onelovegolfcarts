import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/business';
import { ALLOW_INDEXING } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Preview: block everything. See lib/seo.ts.
  if (!ALLOW_INDEXING) return { rules: [{ userAgent: '*', disallow: '/' }] };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/search/'] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
