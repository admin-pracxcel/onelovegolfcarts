// QA for Pay Now: validation (Luhn, expiry, CVC, amount), card fields never
// re-filled or echoed into the page, delivery, and no-JS submit.
import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:3000/pay-now/';
const b = await chromium.launch();
const CARD = '4111 1111 1111 1111';
const good = { fullName: 'Test Guest', email: 'guest@example.com', phone: '+1 555 0100', country: 'USA', state: 'Texas', address: '1 Main St', cardholder: 'Test Guest', cardNumber: CARD, expiry: '12/30', cvc: '123', amount: '175' };
const run = async (js, fill, label) => {
  const ctx = await b.newContext({ javaScriptEnabled: js, viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem('ol-promo-seen:october-special-2026', '1'));
  await p.goto(url, { waitUntil: 'networkidle' });
  for (const [k, v] of Object.entries(fill)) await p.fill(`[name="${k}"]`, v);
  await Promise.all([js ? p.waitForTimeout(2500) : p.waitForLoadState('networkidle'), p.click('.pay-form button[type=submit]')]);
  await p.waitForTimeout(800);
  const html = await p.content();
  const out = await p.evaluate(() => ({
    status: document.querySelector('.pay-form .contact-form__status')?.className.split(' ').pop(),
    invalid: [...document.querySelectorAll('[aria-invalid="true"]')].map((e) => e.name),
    cardLeft: ['cardNumber', 'expiry', 'cvc'].map((n) => document.querySelector(`[name="${n}"]`)?.value).join('|'),
    kept: document.querySelector('[name="fullName"]')?.value,
  }));
  out.cardInHtml = html.includes('4111') || html.includes('411111');
  console.log(label.padEnd(22), JSON.stringify(out));
  await ctx.close();
};
await run(true, { fullName: 'A' }, 'empty');
await run(true, { ...good, cardNumber: '4111 1111 1111 1112' }, 'bad Luhn');
await run(true, { ...good, expiry: '01/24' }, 'expired');
await run(true, { ...good, cvc: '12', amount: '0' }, 'bad cvc + amount');
await run(true, good, 'valid (JS)');
await run(false, { ...good, cvc: '1' }, 'invalid (no JS)');
await run(false, good, 'valid (no JS)');
await b.close();
