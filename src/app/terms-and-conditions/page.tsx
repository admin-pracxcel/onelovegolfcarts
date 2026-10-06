import { LegalPage, legalLinks, legalMetadata } from '@/components/LegalPage';
import { terms } from '@/lib/pages/legal';

const PATH = '/terms-and-conditions/';

export const metadata = legalMetadata(terms, PATH);

export default function TermsPage() {
  return <LegalPage doc={terms} path={PATH} crumb="Terms & Conditions" related={[legalLinks.rates, legalLinks.privacy]} />;
}
