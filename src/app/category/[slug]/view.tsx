import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Archive } from '@/components/blog/Archive';
import { business } from '@/lib/business';
import { categoryPath, withFallback } from '@/lib/pages/blog';
import { getCategories, getCategory, getPosts, PAGE_SIZE, type Category } from '@/lib/sanity';

async function find(slug: string): Promise<Category | null> {
  return (await getCategory(slug)) ?? withFallback(await getCategories()).find((c) => c.slug === slug) ?? null;
}

export async function categoryMetadata(slug: string, page: number): Promise<Metadata> {
  const c = await find(slug);
  if (!c) return {};
  const title = c.seoTitle || `${c.title} | One Love Blog`;
  const path = categoryPath(slug, page);
  return {
    title: { absolute: page > 1 ? `${title} (Page ${page})` : title },
    description: c.seoDescription || c.cardText,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: business.name, title, description: c.seoDescription || c.cardText, url: path, locale: 'en_US' },
  };
}

export async function CategoryView({ slug, page }: { slug: string; page: number }) {
  const c = await find(slug);
  if (!c) notFound();
  const { total, posts } = await getPosts(page, { category: slug });
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > pages) notFound();
  const path = categoryPath(slug, page);
  return (
    <Archive
      path={path}
      trail={[
        { name: 'Blog', path: '/blog/' },
        { name: c.title, path: categoryPath(slug) },
      ]}
      eyebrow="Blog category"
      title={c.title}
      lead={c.cardText}
      description={c.seoDescription || c.cardText || ''}
      posts={posts}
      page={page}
      pages={pages}
      href={(p) => categoryPath(slug, p)}
      pillar={{ title: c.pillarTitle, url: c.pillarUrl, summary: c.pillarSummary }}
    />
  );
}
