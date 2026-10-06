// QA for the contact form: validation, unconfigured fallback, honeypot,
// delivery (when the server runs with CONTACT_WEBHOOK_URL), and no-JS submit.
import { chromium } from 'playwright';
const url = process.argv[2] || 'http://localhost:3000/contact/';
const b = await chromium.launch();
const run = async (js, fill, label) => {
  const ctx = await b.newContext({ javaScriptEnabled: js, viewport: { width: 1280, height: 900 } });
  const p = await ctx.newPage();
  await p.addInitScript(() => sessionStorage.setItem('ol-promo-seen:october-special-2026', '1'));
  await p.goto(url, { waitUntil: 'networkidle' });
  for (const [k, v] of Object.entries(fill)) await p.fill(`[name="${k}"]`, v);
  await Promise.all([js ? p.waitForTimeout(2500) : p.waitForLoadState('networkidle'), p.click('.contact-form button[type=submit]')]);
  await p.waitForTimeout(800);
  const out = await p.evaluate(() => ({
    status: document.querySelector('.contact-form__status')?.className.replace('contact-form__status ', ''),
    text: document.querySelector('.contact-form__status')?.textContent.trim().slice(0, 90),
    invalid: [...document.querySelectorAll('[aria-invalid="true"]')].map((e) => e.name),
    kept: document.querySelector('[name="message"]')?.value.slice(0, 20),
    focus: document.activeElement?.name || document.activeElement?.className,
  }));
  console.log(label.padEnd(26), JSON.stringify(out));
  await ctx.close();
};
const good = { name: 'Test Guest', email: 'guest@example.com', phone: '+1 555 0100', message: 'Hello, testing the contact form.' };
await run(true, { name: 'A', email: 'nope', message: 'short' }, 'invalid (JS)');
await run(true, good, 'valid (JS)');
await run(true, { ...good, company: 'spam co' }, 'honeypot (JS)');
await run(false, good, 'valid (no JS)');
await b.close();
