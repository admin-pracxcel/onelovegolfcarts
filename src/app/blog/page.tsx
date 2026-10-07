import type { Metadata } from 'next';
import { BlogIndex } from '@/components/blog/BlogIndex';
import { business } from '@/lib/business';
import { blogMeta } from '@/lib/pages/blog';
import '@/styles/location.css';
import '@/styles/blog.css';

export const metadata: Metadata = {
  title: { absolute: blogMeta.title },
  description: blogMeta.description,
  alternates: { canonical: '/blog/', languages: { 'en-US': '/blog/', 'x-default': '/blog/' } },
  openGraph: { type: 'website', siteName: business.name, title: blogMeta.title, description: blogMeta.description, url: '/blog/', locale: 'en_US' },
};

export default function BlogPage() {
  return <BlogIndex page={1} />;
}
