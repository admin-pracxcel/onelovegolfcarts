import { ThankYou, thankYouMetadata, type ThankYouContent } from '@/components/ThankYou';

const content: ThankYouContent = {
  path: '/pay-thank-you/',
  crumb: 'Thank you',
  eyebrow: 'Payment details received',
  title: 'Thank you for your payment',
  lead: 'We have received your payment details and will be in touch if we need anything else.',
};

export const metadata = thankYouMetadata(content);

export default function PayThankYouPage() {
  return <ThankYou {...content} />;
}
