import { LegalPage, legalLinks, legalMetadata } from '@/components/LegalPage';
import { privacy } from '@/lib/pages/legal';

const PATH = '/privacy-policy/';

export const metadata = legalMetadata(privacy, PATH);

export default function PrivacyPage() {
  return <LegalPage doc={privacy} path={PATH} crumb="Privacy Policy" related={[legalLinks.contact, legalLinks.terms]} />;
}
