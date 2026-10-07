import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { blogMeta, blogPath } from '@/lib/pages/blog';
import '@/styles/location.css';
import '@/styles/blog.css';

type Props = { params: Promise<{ page: string }> };

const parse = (p: string) => (/^\d+$/.test(p) ? Number(p) : NaN);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const n = parse((await params).page);
  return {
    title: { absolute: `${blogMeta.title} (Page ${n})` },
    description: blogMeta.description,
    alternates: { canonical: blogPath(n) },
  };
}

export default async function BlogPagedPage({ params }: Props) {
  const n = parse((await params).page);
  if (!Number.isInteger(n) || n < 1) notFound();
  if (n === 1) permanentRedirect('/blog/');
  return <BlogIndex page={n} />;
}
