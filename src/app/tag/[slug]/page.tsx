import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Archive } from '@/components/blog/Archive';
import { tagPath } from '@/lib/pages/blog';
import { getPosts, getTag, PAGE_SIZE } from '@/lib/sanity';
import '@/styles/blog.css';

type Props = { params: Promise<{ slug: string }> };

/** Tag pages are only indexed with 3+ posts (manual §20). */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTag((await params).slug);
  if (!t) return {};
  return {
    title: { absolute: `${t.title} | One Love Blog` },
    description: `Posts about ${t.title} from the One Love blog.`,
    alternates: { canonical: tagPath(t.slug) },
    ...(t.count < 3 ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function TagPage({ params }: Props) {
  const slug = (await params).slug;
  const t = await getTag(slug);
  if (!t) notFound();
  const { total, posts } = await getPosts(1, { tag: slug });
  return (
    <Archive
      path={tagPath(slug)}
      trail={[
        { name: 'Blog', path: '/blog/' },
        { name: t.title, path: tagPath(slug) },
      ]}
      eyebrow="Tag"
      title={t.title}
      description={`Posts about ${t.title} from the One Love blog.`}
      posts={posts}
      page={1}
      pages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
      href={() => tagPath(slug)}
    />
  );
}
