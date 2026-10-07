import { urls } from './business';

export type NavItem = { label: string; href: string; note?: string; children?: NavItem[] };

/** Primary navigation (Execution Manual §03). */
export const primaryNav: NavItem[] = [
  {
    label: 'Golf Carts',
    href: urls.carts,
    children: [
      { label: '4-Seater', href: urls['4-seater'], note: 'From $35 a day' },
      { label: '6-Seater', href: urls['6-seater'], note: 'From $60 a day' },
      { label: 'Compare Carts', href: urls.compare },
      { label: 'Fleet Maintenance', href: urls.fleet },
    ],
  },
  {
    label: 'Locations',
    href: urls.locations,
    children: [
      { label: 'San Pedro', href: urls['san-pedro'] },
      { label: 'Ambergris Caye', href: urls.ambergris },
      { label: 'Secret Beach', href: urls['secret-beach'] },
      { label: 'Airport Delivery', href: urls.spr },
      { label: 'Resort Delivery', href: urls.resorts },
    ],
  },
  { label: 'Rates', href: urls.rates },
  {
    label: 'About',
    href: urls.about,
    children: [
      { label: 'Our Story', href: urls.about },
      { label: 'Meet the Team', href: urls.team },
      { label: 'Gallery', href: urls.gallery },
      { label: 'Contact', href: urls.contact },
      { label: 'Pay Now', href: urls.pay },
    ],
  },
  { label: 'Blog', href: urls.blog },
];
