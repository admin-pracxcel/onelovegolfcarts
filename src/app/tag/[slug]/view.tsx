import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Archive } from '@/components/blog/Archive';
import { tagPath } from '@/lib/pages/blog';
import { getPosts, getTag, PAGE_SIZE } from '@/lib/sanity';

/** Tag pages are only indexed with 3+ posts (manual §20). */
export async function tagMetadata(slug: string, page: number): Promise<Metadata> {
  const t = await getTag(slug);
  if (!t) return {};
  return {
    title: { absolute: `${t.title} | One Love Blog${page > 1 ? ` (Page ${page})` : ''}` },
    description: `Posts about ${t.title} from the One Love blog.`,
    alternates: { canonical: tagPath(slug, page) },
    ...(t.count < 3 ? { robots: { index: false, follow: true } } : {}),
  };
}

export async function TagView({ slug, page }: { slug: string; page: number }) {
  const t = await getTag(slug);
  if (!t) notFound();
  const { total, posts } = await getPosts(page, { tag: slug });
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > pages) notFound();
  return (
    <Archive
      path={tagPath(slug, page)}
      trail={[
        { name: 'Blog', path: '/blog/' },
        { name: t.title, path: tagPath(slug) },
      ]}
      eyebrow="Tag"
      title={t.title}
      description={`Posts about ${t.title} from the One Love blog.`}
      posts={posts}
      page={page}
      pages={pages}
      href={(p) => tagPath(slug, p)}
    />
  );
}
