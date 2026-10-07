import { notFound, permanentRedirect } from 'next/navigation';
import { categoryPath } from '@/lib/pages/blog';
import { CategoryView, categoryMetadata } from '../../view';
import '@/styles/blog.css';

type Props = { params: Promise<{ slug: string; page: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug, page } = await params;
  return categoryMetadata(slug, Number(page));
}

export default async function CategoryPagedPage({ params }: Props) {
  const { slug, page } = await params;
  const n = /^\d+$/.test(page) ? Number(page) : NaN;
  if (!Number.isInteger(n) || n < 1) notFound();
  if (n === 1) permanentRedirect(categoryPath(slug));
  return <CategoryView slug={slug} page={n} />;
}
