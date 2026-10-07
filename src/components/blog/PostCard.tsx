import Link from 'next/link';
import { categoryPath, formatDate, postPath } from '@/lib/pages/blog';
import type { PostCard as Card } from '@/lib/sanity';
import { SanityImg } from './SanityImg';

/** Post card: image, category badge, title, date, excerpt (manual §15). */
export function PostCard({ post, headingLevel = 3, priority }: { post: Card; headingLevel?: 2 | 3; priority?: boolean }) {
  const H = `h${headingLevel}` as 'h2' | 'h3';
  return (
    <article className="post-card">
      <Link href={postPath(post.slug)} className="post-card__media" tabIndex={-1} aria-hidden="true" prefetch={false}>
        <SanityImg image={post.mainImage} sizes="(min-width: 1100px) 30vw, (min-width: 700px) 45vw, 100vw" aspect={3 / 2} priority={priority} alt="" />
      </Link>
      <div className="post-card__body">
        <p className="post-card__meta">
          {post.category && (
            <Link href={categoryPath(post.category.slug)} className="post-card__cat" prefetch={false}>
              {post.category.title}
            </Link>
          )}
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
        </p>
        <H className="post-card__title">
          <Link href={postPath(post.slug)} prefetch={false}>
            {post.title}
          </Link>
        </H>
        <p className="post-card__excerpt">{post.excerpt}</p>
      </div>
    </article>
  );
}

export function PostGrid({ posts, headingLevel = 3, eager = 0 }: { posts: Card[]; headingLevel?: 2 | 3; eager?: number }) {
  return (
    <div className="post-grid">
      {posts.map((p, i) => (
        <PostCard key={p._id} post={p} headingLevel={headingLevel} priority={i < eager} />
      ))}
    </div>
  );
}
