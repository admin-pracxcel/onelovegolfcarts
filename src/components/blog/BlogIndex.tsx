import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/PageHeader';
import { urls } from '@/lib/business';
import { blogIntro, blogMeta, blogPath, categoryPath, withFallback } from '@/lib/pages/blog';
import { getCategories, getFeatured, getPosts, PAGE_SIZE } from '@/lib/sanity';
import { blogSchema, jsonLd } from '@/lib/schema';
import { Pagination } from './Pagination';
import { PostGrid } from './PostCard';

/** /blog/ and /blog/page/N/: category bar, featured posts, then newest posts. */
export async function BlogIndex({ page }: { page: number }) {
  const [{ total, posts }, cats, featured] = await Promise.all([getPosts(page), getCategories(), page === 1 ? getFeatured() : Promise.resolve([])]);
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > pages) notFound();
  const categories = withFallback(cats);
  const path = blogPath(page);
  const schema = blogSchema({ path, title: blogMeta.h1, description: blogMeta.description, posts });

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="blog-page">
        <PageHeader
          trail={page === 1 ? [{ name: 'Blog', path }] : [{ name: 'Blog', path: '/blog/' }, { name: `Page ${page}`, path }]}
          eyebrow="The One Love Blog"
          title={page === 1 ? blogMeta.h1 : `${blogMeta.h1}: page ${page}`}
          lead={page === 1 ? blogIntro : undefined}
        />

        <nav className="blog-cats" aria-label="Blog categories">
          <div className="container">
            <ul>
              <li>
                <Link href="/blog/" aria-current={page === 1 ? 'page' : undefined} prefetch={false}>
                  All posts
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={categoryPath(c.slug)} prefetch={false}>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {featured.length > 0 && (
          <section className="section blog-section loc-tight" aria-labelledby="featured-title">
            <div className="container">
              <h2 id="featured-title" className="blog-section__title">
                Featured this month
              </h2>
              <PostGrid posts={featured} eager={0} />
            </div>
          </section>
        )}

        <section className="section blog-section loc-tight" aria-label={page === 1 ? 'Posts' : `Posts, page ${page}`}>
          <div className="container">
            {posts.length ? (
              <>
                <PostGrid posts={posts} headingLevel={2} eager={3} />
                <Pagination page={page} pages={pages} href={blogPath} />
              </>
            ) : (
              <div className="blog-empty">
                <p>New posts are on the way. Until then, our rates are on the <Link href={urls.rates}>rates page</Link>.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
