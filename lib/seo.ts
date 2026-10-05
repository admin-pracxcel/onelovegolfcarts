/**
 * Search engine indexing.
 *
 * Blocked by default, deliberately. While this app is a preview it must not
 * compete with the live WordPress site at onelovegolfcartsbelize.com: two
 * copies of the same copy, both targeting "golf cart rental san pedro belize",
 * is the exact duplicate-content problem the SEO plan is built to avoid.
 *
 * To allow indexing at launch, set NEXT_PUBLIC_ALLOW_INDEXING=true in the
 * deployment environment. No code change, no redeploy of a hardcoded flag,
 * and nothing to forget. Keep it unset on every preview deployment.
 *
 * Applied in three places so nothing slips through:
 *   app/layout.tsx   <meta name="robots">        for anything that renders HTML
 *   app/robots.ts    robots.txt                   for well-behaved crawlers
 *   next.config.ts   X-Robots-Tag response header for images, JSON and assets
 *                                                 that carry no meta tag
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
