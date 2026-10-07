import { PortableText, type PortableTextBlock, type PortableTextComponents } from '@portabletext/react';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { business, urls } from '@/lib/business';
import type { SanityImage } from '@/lib/sanity';
import { SanityImg } from './SanityImg';

type Block = PortableTextBlock & { style?: string; listItem?: string; children?: { text?: string }[] };

export const blockText = (b: Block) => (b.children ?? []).map((c) => c.text ?? '').join('');

export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);

/** H2s in the body, for the table of contents. */
export function outline(body: PortableTextBlock[]) {
  return (body as Block[]).filter((b) => b._type === 'block' && b.style === 'h2').map((b) => ({ id: headingId(blockText(b)), text: blockText(b) }));
}

export function readingMinutes(body: PortableTextBlock[]) {
  const words = (body as Block[]).filter((b) => b._type === 'block').reduce((n, b) => n + blockText(b).split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.round(words / 230));
}

const heading = (Tag: 'h2' | 'h3' | 'h4') =>
  function Heading({ value, children }: { value: Block; children?: React.ReactNode }) {
    return <Tag id={headingId(blockText(value))}>{children}</Tag>;
  };

const components: PortableTextComponents = {
  block: {
    h2: heading('h2'),
    h3: heading('h3'),
    h4: heading('h4'),
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? '';
      if (href.startsWith('/')) {
        return (
          <Link href={href} prefetch={false}>
            {children}
          </Link>
        );
      }
      const external = /^https?:/.test(href) && !href.includes('onelovegolfcartsbelize.com');
      return (
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener' } : {})}>
          {children}
        </a>
      );
    },
  },
  types: {
    figure: ({ value }: { value: SanityImage }) => (
      <figure className="post-figure">
        <SanityImg image={value} sizes="(min-width: 1000px) 46rem, 100vw" />
        {value.caption && <figcaption>{value.caption}</figcaption>}
      </figure>
    ),
    table: ({ value }: { value: { caption?: string; hasHeader?: boolean; rows?: { _key: string; cells?: string[] }[] } }) => {
      const rows = value.rows ?? [];
      const [head, ...rest] = value.hasHeader ? rows : [undefined, ...rows];
      return (
        <div className="post-table" role="region" aria-label={value.caption || 'Table'} tabIndex={0}>
          <table>
            {value.caption && <caption>{value.caption}</caption>}
            {head && (
              <thead>
                <tr>
                  {(head.cells ?? []).map((c, i) => (
                    <th key={i} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {rest.filter(Boolean).map((r) => (
                <tr key={r!._key}>
                  {(r!.cells ?? []).map((c, i) => (
                    <td key={i}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
    callout: ({ value }: { value: { title?: string; text: string } }) => (
      <aside className="post-tip">
        {value.title && <p className="post-tip__title">{value.title}</p>}
        <p>{value.text}</p>
      </aside>
    ),
  },
};

/** The Book Now box the manual puts after paragraph 4 of every post. */
function MoneyCallout({ anchor }: { anchor: string }) {
  const r4 = business.rates['4-seater'].day;
  const r6 = business.rates['6-seater'].day;
  return (
    <aside className="post-money" aria-label="Rent a golf cart">
      <p>
        4-seaters from ${r4} a day, 6-seaters from ${r6}, delivered free anywhere on Ambergris Caye.
      </p>
      <Link className="btn btn--primary" href={urls.book} prefetch={false}>
        {anchor.charAt(0).toUpperCase() + anchor.slice(1)} <Icon name="arrow" />
      </Link>
    </aside>
  );
}

export function PostBody({ body, anchor }: { body: PortableTextBlock[]; anchor: string }) {
  const blocks = body as Block[];
  let seen = 0;
  let cut = -1;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[i]._type === 'block' && (blocks[i].style ?? 'normal') === 'normal' && !blocks[i].listItem && ++seen === 4) {
      cut = i + 1;
      break;
    }
  }
  if (cut < 0) {
    return (
      <>
        <PortableText value={body} components={components} />
        <MoneyCallout anchor={anchor} />
      </>
    );
  }
  return (
    <>
      <PortableText value={body.slice(0, cut)} components={components} />
      <MoneyCallout anchor={anchor} />
      <PortableText value={body.slice(cut)} components={components} />
    </>
  );
}
