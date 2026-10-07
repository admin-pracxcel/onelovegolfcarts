import { notFound, permanentRedirect } from 'next/navigation';
import { authorPath } from '@/lib/pages/blog';
import { AuthorView, authorMetadata } from '../../view';
import '@/styles/blog.css';

type Props = { params: Promise<{ slug: string; page: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug, page } = await params;
  return authorMetadata(slug, Number(page));
}

export default async function AuthorPagedPage({ params }: Props) {
  const { slug, page } = await params;
  const n = /^\d+$/.test(page) ? Number(page) : NaN;
  if (!Number.isInteger(n) || n < 1) notFound();
  if (n === 1) permanentRedirect(authorPath(slug));
  return <AuthorView slug={slug} page={n} />;
}
