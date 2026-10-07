import Link from 'next/link';
import type { ReactNode } from 'react';
import { Icon } from '@/components/Icon';
import { PageHeader } from '@/components/PageHeader';
import type { PostCard } from '@/lib/sanity';
import { archiveSchema, jsonLd } from '@/lib/schema';
import { Pagination } from './Pagination';
import { PostGrid } from './PostCard';

/** Category, tag and author listings. */
export function Archive({
  path,
  trail,
  eyebrow,
  title,
  lead,
  description,
  posts,
  page,
  pages,
  href,
  pillar,
  intro,
  person,
}: {
  path: string;
  trail: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  lead?: string;
  description: string;
  posts: PostCard[];
  page: number;
  pages: number;
  href: (p: number) => string;
  pillar?: { title?: string; url?: string; summary?: string };
  intro?: ReactNode;
  person?: Parameters<typeof archiveSchema>[0]['person'];
}) {
  const schema = archiveSchema({ path, trail, title, description, posts, person });
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(schema)} />
      <main id="main" className="blog-page">
        <PageHeader trail={trail} eyebrow={eyebrow} title={page > 1 ? `${title}: page ${page}` : title} lead={page === 1 ? lead : undefined}>
          {page === 1 && intro}
        </PageHeader>
        {page === 1 && pillar?.url && pillar.title && (
          <div className="container">
            <Link href={pillar.url} className="pillar-callout" prefetch={false}>
              <span className="pillar-callout__label">The full guide</span>
              <span className="pillar-callout__title">{pillar.title}</span>
              {pillar.summary && <span className="pillar-callout__text">{pillar.summary}</span>}
              <Icon name="arrow" />
            </Link>
          </div>
        )}
        <section className="section blog-section" aria-label="Posts">
          <div className="container">
            {posts.length ? (
              <>
                <PostGrid posts={posts} headingLevel={2} eager={3} />
                <Pagination page={page} pages={pages} href={href} />
              </>
            ) : (
              <div className="blog-empty">
                <p>
                  No posts here yet. <Link href="/blog/">See all posts</Link>.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
