import { ResortPage, resortMetadata } from '@/components/ResortPage';

export const metadata = resortMetadata('victoria-house');

export default function VictoriaHousePage() {
  return <ResortPage slug="victoria-house" />;
}
