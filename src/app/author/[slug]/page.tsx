import { AuthorView, authorMetadata } from './view';
import '@/styles/blog.css';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return authorMetadata((await params).slug, 1);
}

export default async function AuthorPage({ params }: Props) {
  return <AuthorView slug={(await params).slug} page={1} />;
}
