import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The live site and every URL in the Execution Manual use trailing slashes.
     Matching that here keeps canonicals and internal links consistent with the
     SEO plan and avoids a redirect hop per link. */
  trailingSlash: true,

  /* X-Robots-Tag covers what a <meta> tag cannot: images, JSON-LD responses,
     fonts and any other asset a crawler might index on its own. Mirrors
     lib/seo.ts; set NEXT_PUBLIC_ALLOW_INDEXING=true to lift it. */
  async headers() {
    if (process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true") return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
