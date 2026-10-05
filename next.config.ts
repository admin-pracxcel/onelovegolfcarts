import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The live site and every URL in the Execution Manual use trailing slashes.
     Matching that here keeps canonicals and internal links consistent with the
     SEO plan and avoids a redirect hop per link. */
  trailingSlash: true,
  /* config options here */
};

export default nextConfig;
