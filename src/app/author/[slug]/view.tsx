import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Archive } from '@/components/blog/Archive';
import { SanityImg } from '@/components/blog/SanityImg';
import { business } from '@/lib/business';
import { authorPath } from '@/lib/pages/blog';
import { getAuthor, getPosts, imageUrl, PAGE_SIZE } from '@/lib/sanity';

export async function authorMetadata(slug: string, page: number): Promise<Metadata> {
  const a = await getAuthor(slug);
  if (!a) return {};
  const title = `${a.name}${a.role ? `, ${a.role}` : ''} | One Love Blog`;
  const path = authorPath(slug, page);
  return {
    title: { absolute: page > 1 ? `${title} (Page ${page})` : title },
    description: a.bio?.slice(0, 160) || `Posts by ${a.name} on the One Love blog.`,
    alternates: { canonical: path },
    openGraph: { type: 'profile', siteName: business.name, title, url: path, locale: 'en_US' },
  };
}

export async function AuthorView({ slug, page }: { slug: string; page: number }) {
  const a = await getAuthor(slug);
  if (!a) notFound();
  const { total, posts } = await getPosts(page, { author: slug });
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (page > pages) notFound();
  const person = a.kind === 'organization' ? undefined : { name: a.name, role: a.role, bio: a.bio, links: a.links, image: imageUrl(a.photo, 400, 1) || undefined };
  return (
    <Archive
      path={authorPath(slug, page)}
      trail={[
        { name: 'Blog', path: '/blog/' },
        { name: a.name, path: authorPath(slug) },
      ]}
      eyebrow={a.role || 'Author'}
      title={a.name}
      description={a.bio || `Posts by ${a.name}.`}
      posts={posts}
      page={page}
      pages={pages}
      href={(p) => authorPath(slug, p)}
      person={person}
      intro={
        <div className="container author-intro">
          {a.photo && <SanityImg image={a.photo} sizes="10rem" aspect={1} className="author-intro__photo" alt={a.photo.alt || a.name} />}
          {a.bio && <p className="author-intro__bio">{a.bio}</p>}
        </div>
      }
    />
  );
}
