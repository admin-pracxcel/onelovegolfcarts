// Technical QA: axe accessibility scan, heading outline, JSON-LD parse,
// image attribute audit, internal link list. Usage: node qa-tech.mjs [url]
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const url = process.argv[2] || 'http://localhost:3000/';
const axe = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
const browser = await chromium.launch();
for (const w of [1440, 390]) {
  const page = await browser.newPage({ viewport: { width: w, height: 900 } });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: axe });
  const res = await page.evaluate(async () => (await axe.run(document, { runOnly: ['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice'] })).violations.map((v) => `${v.impact} ${v.id}: ${v.nodes.length} — ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(' | ')}`));
  console.log(`\n[axe ${w}px]`, res.length ? '\n' + res.join('\n') : 'no violations');
  if (w === 1440) {
    const info = await page.evaluate(() => ({
      h: [...document.querySelectorAll('h1,h2,h3')].map((h) => h.tagName + ' ' + h.textContent.trim().replace(/\s+/g, ' ')),
      ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { const j = JSON.parse(s.textContent); return 'OK ' + j['@graph'].map((n) => n['@type']).join(','); } catch (e) { return 'INVALID ' + e.message; } }),
      imgs: [...document.querySelectorAll('img')].map((i) => `${i.getAttribute('loading') || (i.getAttribute('fetchpriority') ? 'priority' : 'eager')} ${i.width}x${i.height} attrs:${i.getAttribute('width')}x${i.getAttribute('height')} alt:${i.alt ? 'yes' : (i.hasAttribute('alt') ? 'empty' : 'MISSING')} ${i.currentSrc.split('/').pop()}`),
      links: [...new Set([...document.querySelectorAll('main a[href]')].map((a) => a.getAttribute('href').replace(location.origin, '')))],
      h1: document.querySelectorAll('h1').length,
    }));
    console.log('\n[h1 count]', info.h1, '\n[outline]\n' + info.h.join('\n'));
    console.log('\n[json-ld]', info.ld.join('; '));
    console.log('\n[images]\n' + info.imgs.join('\n'));
    console.log('\n[main links]\n' + info.links.join('\n'));
  }
  await page.close();
}
await browser.close();
