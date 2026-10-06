// QA for the Book Now form: validation, return-before-start, pickup mode,
// delivery (or WhatsApp fallback when unconfigured), and no-JS submit.
import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:3000/book-now/';
const b = await chromium.launch();
const day = (n) => new Date(Date.now() - 6 * 3600e3 + n * 86400e3).toISOString().slice(0, 10);
const run = async (js, fill, label, extra) => {
  const ctx = await b.newContext({ javaScriptEnabled: js, viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem('ol-promo-seen:october-special-2026', '1'));
  await p.goto(url, { waitUntil: 'networkidle' });
  if (extra) await extra(p);
  for (const [k, v] of Object.entries(fill)) await p.fill(`[name="${k}"]`, v);
  await Promise.all([js ? p.waitForTimeout(2500) : p.waitForLoadState('networkidle'), p.click('.booking-form button[type=submit]')]);
  await p.waitForTimeout(800);
  const out = await p.evaluate(() => ({
    status: document.querySelector('.booking-form__status')?.className.split(' ').pop(),
    text: document.querySelector('.booking-form__status')?.textContent.trim().slice(0, 80),
    invalid: [...document.querySelectorAll('[aria-invalid="true"]')].map((e) => e.name),
    wa: document.querySelector('.booking-form__status a[href*="wa.me"]')?.href.length || 0,
    min: document.querySelector('[name="startDate"]')?.min,
  }));
  console.log(label.padEnd(24), JSON.stringify(out));
  await ctx.close();
};
const good = {
  firstName: 'Test', lastName: 'Guest', phone: '+1 555 0100', email: 'guest@example.com', hotel: 'Mahogany Bay',
  startDate: day(10), startTime: '14:00', returnDate: day(17), returnTime: '10:00', deliverTo: 'Mahogany Bay front desk',
};
await run(true, { firstName: 'A' }, 'empty (JS)');
await run(true, { ...good, returnDate: day(9) }, 'return before start');
await run(true, { ...good, startDate: day(-2) }, 'start in past');
await run(true, { ...good, deliverTo: '' }, 'pickup, no address', (p) => p.check('input[name="mode"][value="pickup"]', { force: true }));
await run(true, good, 'valid (JS)');
await run(true, { ...good, company: 'spam' }, 'honeypot');
await run(false, good, 'valid (no JS)');
await b.close();
