import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Execution Manual URL convention: lowercase, hyphenated, trailing slash.
  trailingSlash: true,
  poweredByHeader: false,
  // Old URLs on the live WordPress site that the new pages replace.
  async redirects() {
    return [
      { source: '/privacy-policy-2/', destination: '/privacy-policy/', permanent: true },
      { source: '/terms-conditons/', destination: '/terms-and-conditions/', permanent: true },
      // Blog editors: the Sanity Studio is hosted by Sanity.
      { source: '/studio', destination: 'https://onelove-blog.sanity.studio/', permanent: false },
      { source: '/studio/:path*', destination: 'https://onelove-blog.sanity.studio/:path*', permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Preview: keep every response out of search indexes (mirrors lib/seo.ts).
          ...(process.env.NEXT_PUBLIC_ALLOW_INDEXING === 'true'
            ? []
            : [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive, nosnippet, noimageindex' }]),
        ],
      },
      {
        source: '/img/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ];
  },
};

export default nextConfig;
