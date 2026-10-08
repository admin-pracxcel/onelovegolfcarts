import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blockText, outline, PostBody, readingMinutes } from '@/components/blog/PostBody';
import { PostGrid } from '@/components/blog/PostCard';
import { SanityImg } from '@/components/blog/SanityImg';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Icon } from '@/components/Icon';
import { Faq } from '@/components/sections/Faq';
import { FinalCta } from '@/components/sections/FinalCta';
import { business, urls, whatsappUrl, newTab } from '@/lib/business';
import { authorPath, categoryPath, formatDate, pickAnchor, postPath, tagPath } from '@/lib/pages/blog';
import { getPost, getPostSlugs, getRelated, imageUrl } from '@/lib/sanity';
import { jsonLd, postSchema } from '@/lib/schema';
import '@/styles/blog.css';

type Props = { params: Promise<{ slug: string }> };

/** Blog posts live at the site root (/<slug>/), per the manual's URL map. */
export async function generateStaticParams() {
  return (await getPostSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const path = postPath(post.slug);
  const image = imageUrl(post.mainImage, 1200, 1200 / 630);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: { 'en-US': path, 'x-default': path } },
    ...(post.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      type: 'article',
      siteName: business.name,
      title,
      description,
      url: path,
      locale: 'en_US',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      ...(post.author ? { authors: [post.author.name] } : {}),
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: post.mainImage?.alt ?? '' }] } : {}),
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const related = await getRelated(post);
  const path = postPath(post.slug);
  const toc = outline(post.body);
  const minutes = readingMinutes(post.body);
  const faq = (post.faq ?? []).map((f) => [f.question, f.answer] as [string, string]);
  const words = post.body.reduce((n, b) => n + (b._type === 'block' ? blockText(b).split(/\s+/).filter(Boolean).length : 0), 0);
  const updated = post.updatedAt && post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10) ? post.updatedAt : undefined;

  const schema = postSchema({
    path,
    title: post.title,
    description: post.seoDescription || post.excerpt,
    image: imageUrl(post.mainImage, 1600) || undefined,
    published: post.publishedAt,
    updated,
    category: post.category,
    tags: post.tags?.map((t) => t.title),
    author: post.author,
    faq,
    words,
  });

  const trail = [
    { name: 'Blog', path: '/blog/' },
    ...(post.category ? [{ name: post.category.title, path: categoryPath(post.category.slug) }] : []),
    { name: post.title, path },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="post-page">
        <header className="post-head">
          <div className="container">
            <Breadcrumbs trail={trail} />
            <div className="post-head__inner">
              {post.category && (
                <Link href={categoryPath(post.category.slug)} className="post-head__cat" prefetch={false}>
                  {post.category.title}
                </Link>
              )}
              <h1 className="post-head__title">{post.title}</h1>
              <p className="post-head__lead">{post.excerpt}</p>
              <div className="byline">
                {post.author && (
                  <Link href={authorPath(post.author.slug)} className="byline__photo" tabIndex={-1} aria-hidden="true" prefetch={false}>
                    {post.author.photo ? (
                      <SanityImg image={post.author.photo} sizes="3.75rem" aspect={1} alt="" />
                    ) : (
                      <span className="byline__initial">{post.author.name.charAt(0)}</span>
                    )}
                  </Link>
                )}
                <p className="byline__text">
                  {post.author && (
                    <>
                      By{' '}
                      <Link href={authorPath(post.author.slug)} prefetch={false}>
                        {post.author.name}
                      </Link>
                      {post.author.role && <> · {post.author.role}</>}
                      <br />
                    </>
                  )}
                  Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  {updated && (
                    <>
                      {' '}
                      · Last updated <time dateTime={updated}>{formatDate(updated)}</time>
                    </>
                  )}{' '}
                  · {minutes} min read
                </p>
              </div>
            </div>
          </div>
          {post.mainImage && (
            <figure className="container post-hero">
              <SanityImg image={post.mainImage} sizes="(min-width: 1280px) 1200px, 100vw" aspect={16 / 9} priority />
              {post.mainImage.caption && <figcaption>{post.mainImage.caption}</figcaption>}
            </figure>
          )}
        </header>

        <div className="container post-layout">
          <article className="post-body">
            <PostBody body={post.body} anchor={pickAnchor(post.slug)} />
            {post.tags && post.tags.length > 0 && (
              <ul className="post-tags" aria-label="Tags">
                {post.tags.map((t) => (
                  <li key={t.slug}>
                    <Link href={tagPath(t.slug)} prefetch={false}>
                      #{t.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </article>
          <aside className="post-aside" aria-label="On this page">
            {toc.length > 1 && (
              <nav className="post-toc" aria-label="Contents">
                <p className="post-toc__title">On this page</p>
                <ol>
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`}>{h.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="post-rent">
              <p className="post-rent__kicker">Exploring by cart?</p>
              <p className="post-rent__line">Free delivery anywhere on Ambergris Caye.</p>
              <Link className="btn btn--primary" href={urls.book} prefetch={false}>
                Book now <Icon name="arrow" />
              </Link>
              <a className="link-arrow" {...newTab} href={whatsappUrl()}>
                WhatsApp {business.phone} <Icon name="arrow" />
              </a>
            </div>
          </aside>
        </div>

        {faq.length > 0 && <Faq items={faq} title="Questions about this" />}

        {post.category?.pillarUrl && post.category.pillarTitle && (
          <div className="container post-pillar">
            <Link href={post.category.pillarUrl} className="pillar-callout" prefetch={false}>
              <span className="pillar-callout__label">Part of our {post.category.pillarTitle} guide</span>
              {post.category.pillarSummary && <span className="pillar-callout__text">{post.category.pillarSummary}</span>}
              <span className="pillar-callout__title">Read the full {post.category.pillarTitle} guide</span>
              <Icon name="arrow" />
            </Link>
          </div>
        )}

        {related.length > 0 && (
          <section className="section blog-section" aria-labelledby="related-title">
            <div className="container">
              <h2 id="related-title" className="blog-section__title">
                Related posts
              </h2>
              <PostGrid posts={related} />
            </div>
          </section>
        )}

        <FinalCta />
      </main>
    </>
  );
}
