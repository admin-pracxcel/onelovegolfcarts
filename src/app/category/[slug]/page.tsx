import { CategoryView, categoryMetadata } from './view';
import '@/styles/blog.css';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  return categoryMetadata((await params).slug, 1);
}

export default async function CategoryPage({ params }: Props) {
  return <CategoryView slug={(await params).slug} page={1} />;
}
