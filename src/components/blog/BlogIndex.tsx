import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import { urls } from '@/lib/business';
import { blogIntro, blogMeta, blogPath, categoryPath, pillars, withFallback } from '@/lib/pages/blog';
import { getCategories, getFeatured, getPosts, PAGE_SIZE } from '@/lib/sanity';
import { blogSchema, jsonLd } from '@/lib/schema';
import { Pagination } from './Pagination';
import { PostGrid } from './PostCard';

/** /blog/ and /blog/page/N/: categories, guides, featured, then newest posts. */
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

        {page === 1 && (
          <section className="section blog-section" aria-labelledby="cats-title">
            <div className="container">
              <h2 id="cats-title" className="blog-section__title">
                Browse by category
              </h2>
              <ul className="blog-catcards">
                {categories.map((c, i) => (
                  <li key={c.slug} className={`blog-catcard${i === 0 ? ' is-dark' : ''}`}>
                    <h3 className="blog-catcard__name">{c.title}</h3>
                    <p>{c.cardText}</p>
                    <Link href={categoryPath(c.slug)} className="blog-catcard__link" prefetch={false}>
                      Read the {c.title} posts <Icon name="arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {page === 1 && (
          <section className="section blog-section loc-tight" aria-labelledby="guides-title">
            <div className="container">
              <h2 id="guides-title" className="blog-section__title">
                Start with a guide
              </h2>
              <ul className="blog-guides">
                {pillars.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} prefetch={false}>
                      <span className="blog-guides__label">{p.label}</span>
                      <span className="blog-guides__title">{p.title}</span>
                      <Icon name="arrow" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

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

        <section className="section blog-section loc-tight" aria-labelledby="latest-title">
          <div className="container">
            <h2 id="latest-title" className="blog-section__title">
              {page === 1 ? 'Latest posts' : `Posts, page ${page}`}
            </h2>
            {posts.length ? (
              <>
                <PostGrid posts={posts} />
                <Pagination page={page} pages={pages} href={blogPath} />
              </>
            ) : (
              <div className="blog-empty">
                <p>New posts are on the way. Until then, the guides above cover the island, and our rates are on the <Link href={urls.rates}>rates page</Link>.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
