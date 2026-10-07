import { ThankYou, thankYouMetadata, type ThankYouContent } from '@/components/ThankYou';

const content: ThankYouContent = {
  path: '/contact-thank-you/',
  crumb: 'Thank you',
  eyebrow: 'Message received',
  title: 'Thank you for getting in touch',
  lead: 'We have received your message and will get back to you as soon as we can.',
};

export const metadata = thankYouMetadata(content);

export default function ContactThankYouPage() {
  return <ThankYou {...content} />;
}
