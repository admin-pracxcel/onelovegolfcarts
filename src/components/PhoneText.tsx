import { business } from '@/lib/business';

/** Renders copy with the phone number kept on one line. */
export function PhoneText({ text }: { text: string }) {
  const parts = text.split(business.phone);
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="nowrap">{business.phone}</span>}
        </span>
      ))}
    </>
  );
}
