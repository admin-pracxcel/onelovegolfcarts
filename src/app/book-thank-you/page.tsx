import { ThankYou, thankYouMetadata, type ThankYouContent } from '@/components/ThankYou';

const content: ThankYouContent = {
  path: '/book-thank-you/',
  crumb: 'Thank you',
  eyebrow: 'Booking request received',
  title: 'Thank you for your booking request',
  lead: 'We have received your details and will be in touch shortly to confirm your golf cart.',
};

export const metadata = thankYouMetadata(content);

export default function BookThankYouPage() {
  return <ThankYou {...content} />;
}
