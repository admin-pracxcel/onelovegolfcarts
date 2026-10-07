/**
 * /locations/: hub for the location, airport and resort pages. The manual's
 * breadcrumbs start "Home > Locations > …" but it gives no Locations page, so
 * this one only lists the pages, using each page's own H1 and meta
 * description. The page title and group labels (from the manual's nav) are
 * the only words added.
 */
import { urls, type UrlKey } from '@/lib/business';
import { meta as ambergris } from './ambergris-caye';
import { meta as bze } from './belize-city-airport';
import { meta as north } from './north-ambergris';
import { RESORT_SLUGS, resorts } from './resorts';
import { meta as spr } from './san-pedro-airport';
import { meta as secretBeach } from './secret-beach';
import { meta as south } from './south-ambergris';

export const meta = {
  title: 'Golf Cart Delivery Locations | One Love',
  description:
    'Every place One Love delivers golf carts on Ambergris Caye: San Pedro, North and South Ambergris Caye, Secret Beach, both airports, and the resorts we serve.',
  h1: 'Locations',
};

export type LocationLink = { name: string; href: string; text: string };

const link = (key: UrlKey, m: { h1: string; description: string }): LocationLink => ({
  name: m.h1,
  href: urls[key],
  text: m.description,
});

export const groups: { id: string; label: string; items: LocationLink[] }[] = [
  {
    id: 'island',
    label: 'Ambergris Caye',
    items: [link('ambergris', ambergris), link('north', north), link('south', south), link('secret-beach', secretBeach)],
  },
  { id: 'airports', label: 'Airport Delivery', items: [link('spr', spr), link('bze', bze)] },
  {
    id: 'resorts',
    label: 'Resort Delivery',
    items: RESORT_SLUGS.map((s) => link(s, resorts[s].meta)),
  },
];
