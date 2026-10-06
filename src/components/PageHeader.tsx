import { Breadcrumbs } from './Breadcrumbs';
import { NoBreak } from './NoBreak';

type Props = {
  trail: { name: string; path: string }[];
  eyebrow: string;
  title: string;
  /** Opening definitional paragraph (AI-Overview-liftable). */
  lead?: React.ReactNode;
  children?: React.ReactNode;
};

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
              <NoBreak text={title} />
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
