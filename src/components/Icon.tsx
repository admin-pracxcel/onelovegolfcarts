/** Inline SVG icons (24px grid, currentColor). Always decorative. */
const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  'arrow-ur': <path d="M7 17 17 7M8 7h9v9" />,
  phone: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />,
  chat: (
    <>
      <path d="M20.5 11.6a8.4 8.4 0 0 1-12.4 7.4L3.5 20.5l1.6-4.4A8.4 8.4 0 1 1 20.5 11.6Z" />
      <path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
} as const;

export type IconName = keyof typeof paths | 'star';

export function Icon({ name }: { name: IconName }) {
  if (name === 'star') {
    return (
      <svg className="icon icon--star" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path fill="currentColor" d="m12 2.8 2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z" />
      </svg>
    );
  }
  return (
    <svg
      className={`icon icon--${name}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}

export function Stars({ count = 5 }: { count?: number }) {
  return (
    <span className="stars" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <Icon key={i} name="star" />
      ))}
    </span>
  );
}
