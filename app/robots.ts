import type { MetadataRoute } from "next";
import { ALLOW_INDEXING } from "@/lib/seo";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  if (!ALLOW_INDEXING) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://onelovegolfcartsbelize.com/sitemap_index.xml",
  };
}
