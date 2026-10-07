// Whole-site browser QC: every sitemap page (plus thank-you pages, a 404 and a
// sample of posts) at 390px and 1440px for console errors, failed requests,
// horizontal scroll and serious/critical axe violations.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
const axe = readFileSync(createRequire(import.meta.url).resolve('axe-core/axe.min.js'), 'utf8');
const base = 'http://localhost:3000';
const sm = await (await fetch(base + '/sitemap.xml')).text();
const all = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''));
const posts = all.filter((u) => /^\/[^/]+\/$/.test(u) && !['/our-carts/','/rates/','/contact/','/about-us/','/gallery/','/locations/','/ambergris-caye/','/blog/','/book-now/','/pay-now/','/meet-the-team/','/privacy-policy/','/terms-and-conditions/'].includes(u) && !/rentals-at|delivery|ambergris-caye-cart|arrival-guide|comparison-4-vs|how-we-maintain|things-to-do-ambergris/.test(u));
const code = all.filter((u) => !posts.includes(u) && !/^\/(tag|author)\//.test(u));
const pages = [...code, '/contact-thank-you/', '/book-thank-you/', '/pay-thank-you/', '/does-not-exist/', ...posts.filter((_, i) => i % 15 === 0)];
const b = await chromium.launch();
const out = [];
for (const width of [390, 1440]) {
  const ctx = await b.newContext({ viewport: { width, height: 900 } });
  await ctx.addInitScript(() => sessionStorage.setItem('ol-promo-seen:october-special-2026', '1'));
  for (const u of pages) {
    const p = await ctx.newPage();
    const errs = [];
    p.on('console', (m) => m.type() === 'error' && errs.push('console: ' + m.text().slice(0, 140)));
    p.on('pageerror', (e) => errs.push('pageerror: ' + e.message.slice(0, 140)));
    p.on('response', (r) => r.status() >= 400 && !r.url().endsWith('/does-not-exist/') && errs.push(`${r.status()} ${r.url().replace(base, '').slice(0, 100)}`));
    await p.goto(base + u, { waitUntil: 'networkidle' }).catch((e) => errs.push('goto: ' + e.message.slice(0, 80)));
    const over = await p.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const wide = [...document.querySelectorAll('body *')].filter((el) => {
        const r = el.getBoundingClientRect();
        if (r.right <= w + 1 || r.width === 0) return false;
        for (let a = el.parentElement; a; a = a.parentElement) { const s = getComputedStyle(a); if (/(auto|scroll|hidden|clip)/.test(s.overflowX)) return false; }
        return true;
      });
      return { scroll: document.documentElement.scrollWidth > w + 1, els: wide.slice(0, 3).map((e) => e.tagName.toLowerCase() + '.' + [...e.classList].join('.')) };
    });
    if (over.scroll) errs.push('horizontal scroll: ' + over.els.join(', '));
    if (width === 390 || code.includes(u)) {
      await p.addStyleTag({ content: '*,*::before,*::after{transition:none!important;animation:none!important}[data-reveal]{opacity:1!important;transform:none!important}' }); await p.mouse.move(0, 0); await p.waitForTimeout(400);
      await p.addScriptTag({ content: axe });
      const v = await p.evaluate(async () => (await axe.run(document, { resultTypes: ['violations'] })).violations.filter((x) => ['serious', 'critical'].includes(x.impact)).map((x) => `${x.impact} ${x.id} (${x.nodes.length}): ${x.nodes[0]?.target}`));
      v.forEach((x) => errs.push('axe ' + x));
    }
    if (errs.length) out.push(`[${width}] ${u}\n    ` + [...new Set(errs)].join('\n    '));
    await p.close();
  }
  await ctx.close();
}
await b.close();
console.log(`${pages.length} pages × 2 widths (${code.length} site pages + ${pages.length - code.length} extra)`);
console.log(out.length ? out.join('\n') : 'NO ISSUES');
