import { TagView, tagMetadata } from './view';
import '@/styles/blog.css';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return tagMetadata((await params).slug, 1);
}

export default async function TagPage({ params }: Props) {
  return <TagView slug={(await params).slug} page={1} />;
}
