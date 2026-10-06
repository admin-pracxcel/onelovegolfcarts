import { ResortPage, resortMetadata } from '@/components/ResortPage';

export const metadata = resortMetadata('grand-caribe');

export default function GrandCaribePage() {
  return <ResortPage slug="grand-caribe" />;
}
