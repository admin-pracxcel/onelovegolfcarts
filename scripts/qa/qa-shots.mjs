// Renders the homepage at QA widths: viewport + full-page screenshots,
// console errors, horizontal overflow check.
// Usage: node scripts/qa/qa-shots.mjs [outDir=.qa] [url]
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
const out = process.argv[2] || '.qa';
mkdirSync(out, { recursive: true });
const url = process.argv[3] || 'http://localhost:3000/';
const widths = [[1440, 900], [1280, 800], [768, 1024], [390, 844]];
const browser = await chromium.launch();
for (const [w, h] of widths) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  await page.addInitScript(() => sessionStorage.setItem('ol-promo-seen:october-special-2026', '1'));
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${m.type()}: ${m.text()}`); });
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('requestfailed', (r) => errors.push('requestfailed: ' + r.url()));
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1800);
  await page.screenshot({ path: `${out}/home-${w}-top.jpg`, type: 'jpeg', quality: 70 });
  const H = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < H; y += Math.round(h * 0.6)) { await page.evaluate((y) => window.scrollTo(0, y), y); await page.waitForTimeout(140); }
  await page.waitForTimeout(1200);
  const overflow = await page.evaluate(() => {
    const vw = document.documentElement.clientWidth;
    const bad = [];
    document.querySelectorAll('body *').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > vw + 1 && !el.closest('[data-rail], .trust')) bad.push(el.tagName + '.' + [...el.classList].join('.'));
    });
    return { docW: document.documentElement.scrollWidth, vw, bad: [...new Set(bad)].slice(0, 10) };
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${out}/home-${w}-full.jpg`, type: 'jpeg', quality: 62, fullPage: true });
  console.log(w, 'height', H, 'overflow', JSON.stringify(overflow), 'errors', JSON.stringify(errors));
  await page.close();
}
await browser.close();
