// QA for header menus: desktop dropdowns close after picking a link;
// the mobile menu closes on navigation, including the logo.
import { chromium } from 'playwright';
const base = process.argv[2] || 'http://localhost:3000';
const b = await chromium.launch();
let pass = 0, fail = 0;
const expect = (label, got, want) => { const ok = got === want; if (ok) pass++; else fail++; console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}: ${got}${ok ? '' : ` (want ${want})`}`); };
const init = (p) => p.addInitScript(() => sessionStorage.setItem('ol-promo-seen:october-special-2026', '1'));

// Desktop
const d = await b.newPage({ viewport: { width: 1280, height: 900 } });
await init(d);
await d.goto(`${base}/rates/`, { waitUntil: 'networkidle' });
const subVisible = (i) => d.evaluate((i) => getComputedStyle(document.getElementById(`sub-${i}`)).visibility, i);
for (const [i, label, path] of [[0, '4-Seater', '/our-carts/'], [3, 'Contact', '/contact/'], [1, 'Secret Beach', '/delivery-to-secret-beach/']]) {
  await d.hover(`.nav__item:has(#sub-${i})`);
  await d.waitForTimeout(350);
  expect(`${label}: dropdown opens on hover`, await subVisible(i), 'visible');
  await Promise.all([d.waitForURL(`**${path}**`), d.click(`#sub-${i} >> text=${label}`)]);
  await d.waitForLoadState('networkidle');
  await d.waitForTimeout(500);
  expect(`${label}: closed after navigating (pointer still on it)`, await subVisible(i), 'hidden');
  await d.mouse.move(640, 600);
  await d.evaluate(() => window.scrollTo(0, 0));
  await d.waitForTimeout(700);
  await d.hover(`.nav__item:has(#sub-${i})`);
  await d.waitForTimeout(350);
  expect(`${label}: hover works again after leaving`, await subVisible(i), 'visible');
  await d.mouse.move(640, 600);
  await d.waitForTimeout(400);
}

// Mobile
const m = await b.newPage({ viewport: { width: 390, height: 844 } });
await init(m);
const state = () => m.evaluate(() => ({ open: document.querySelector('.menu-btn').getAttribute('aria-expanded'), body: document.body.classList.contains('menu-open') }));
for (const start of ['/rates/', '/']) {
  await m.goto(`${base}${start}`, { waitUntil: 'networkidle' });
  await m.click('.menu-btn');
  await m.waitForTimeout(400);
  expect(`mobile (${start}): menu opens`, (await state()).open, 'true');
  await m.click('.brand', { force: true });
  await m.waitForTimeout(900);
  const s = await state();
  expect(`mobile (${start}): logo closes menu`, `${s.open}/${s.body}`, 'false/false');
  expect(`mobile (${start}): on home`, new URL(m.url()).pathname, '/');
}
await m.goto(`${base}/rates/`, { waitUntil: 'networkidle' });
await m.click('.menu-btn');
await m.waitForTimeout(400);
await m.click('.mnav >> text=Rates');
await m.waitForTimeout(600);
expect('mobile: menu link closes menu', (await state()).open, 'false');

console.log(`\n${pass} passed, ${fail} failed`);
await b.close();
