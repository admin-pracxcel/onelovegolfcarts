import { Breadcrumbs } from './Breadcrumbs';

type Props = {
  trail: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  /** Opening definitional paragraph (AI-Overview-liftable). */
  lead?: React.ReactNode;
  children?: React.ReactNode;
};

/** Keeps hyphenated terms like "4-Seater" from breaking across lines. */
function noBreakHyphens(text: string) {
  return text.split(/(\S+-\S+)/g).map((part, i) =>
    /\S+-\S+/.test(part) ? (
      <span key={i} className="nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** Inner-page header: breadcrumbs, H1 and opening paragraph; optional media below. */
export function PageHeader({ trail, eyebrow, title, lead, children }: Props) {
  return (
    <header className="page-header">
      <div className="container">
        <Breadcrumbs trail={trail} />
        <div className="page-header__grid">
          <div>
            <p className="eyebrow" data-reveal="">
              {eyebrow}
            </p>
            <h1 className="page-header__title" data-reveal="">
              {noBreakHyphens(title)}
            </h1>
          </div>
          {lead && (
            <p className="page-header__lead" data-reveal="">
              {lead}
            </p>
          )}
        </div>
      </div>
      {children}
    </header>
  );
}
