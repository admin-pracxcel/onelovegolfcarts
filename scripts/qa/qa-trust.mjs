// QA for the USP strip: one line at every width; marquee only when needed.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';
mkdirSync('.qa', { recursive: true });
const url = process.argv[2] || 'http://localhost:3000/';
const b = await chromium.launch();
const tx = (p) => p.evaluate(() => new DOMMatrix(getComputedStyle(document.querySelector('.trust__rail')).transform).m41);
for (const [w, reduce] of [[1440], [1280], [1100], [1024], [900], [768], [390], [360], [390, true]]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } });
  if (reduce) await p.emulateMedia({ reducedMotion: 'reduce' });
  await p.addInitScript(() => sessionStorage.setItem('ol-promo-seen:october-special-2026', '1'));
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.waitForTimeout(300);
  const info = await p.evaluate(() => {
    const t = document.querySelector('.trust');
    const tops = new Set([...t.querySelectorAll('.trust__list:first-child li')].map((li) => Math.round(li.getBoundingClientRect().top)));
    return { marquee: t.classList.contains('trust--marquee'), lines: tops.size, dur: t.style.getPropertyValue('--trust-dur'), docW: document.documentElement.scrollWidth };
  });
  const a = await tx(p); await p.waitForTimeout(1000); const moved = Math.round(a - (await tx(p)));
  let paused = null;
  if (info.marquee) {
    await p.hover('.trust'); const h1 = await tx(p); await p.waitForTimeout(600); paused = Math.abs(h1 - (await tx(p))) < 1;
    await p.evaluate(() => document.querySelector('.trust').scrollIntoView({ block: 'center' }));
    await p.waitForTimeout(200);
    await p.mouse.move(0, 0);
    const y = await p.evaluate(() => document.querySelector('.trust').getBoundingClientRect().top);
    await p.screenshot({ path: `.qa/trust-${w}.jpg`, type: 'jpeg', quality: 70, clip: { x: 0, y: Math.max(0, y - 10), width: w, height: 80 } });
  }
  console.log(w + (reduce ? ' reduced' : ''), JSON.stringify({ ...info, pxPerSec: moved, pausedOnHover: paused }));
  await p.close();
}
await b.close();
