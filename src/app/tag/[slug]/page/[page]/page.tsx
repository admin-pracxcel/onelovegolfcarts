import { notFound, permanentRedirect } from 'next/navigation';
import { tagPath } from '@/lib/pages/blog';
import { TagView, tagMetadata } from '../../view';
import '@/styles/blog.css';

type Props = { params: Promise<{ slug: string; page: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug, page } = await params;
  return tagMetadata(slug, Number(page));
}

export default async function TagPagedPage({ params }: Props) {
  const { slug, page } = await params;
  const n = /^\d+$/.test(page) ? Number(page) : NaN;
  if (!Number.isInteger(n) || n < 1) notFound();
  if (n === 1) permanentRedirect(tagPath(slug));
  return <TagView slug={slug} page={n} />;
}
