// Captures One Love's live TripAdvisor badges ("Bravo!" and "Recommended on
// Tripadvisor") as images for the homepage hero, so the site shows the real,
// current badges without loading TripAdvisor's widget script (which ships
// empty links, tracking pixels and late layout shifts, and is often blocked).
// Re-run to refresh the numbers: pnpm badges
import { chromium } from 'playwright';
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';
import path from 'node:path';

const LOCATION_ID = 23212104;
const SCALE = 3;
const BADGES = [
  { key: 'bravo', wtype: 'excellent', file: 'tripadvisor-bravo.webp' },
  { key: 'recommended', wtype: 'rated', file: 'tripadvisor-recommended.webp' },
];

const widget = ({ wtype }, i) => `
  <div class="slot"><div id="TA_${wtype}${i}" class="TA_${wtype}"><ul id="ul${i}" class="TA_links"><li id="li${i}" class="TA_link"><a href="https://www.tripadvisor.com/">Tripadvisor</a></li></ul></div></div>
  <script async src="https://www.jscache.com/wejs?wtype=${wtype}&uniq=${i}&locationId=${LOCATION_ID}&lang=en_US&display_version=2"></script>`;

const browser = await chromium.launch();
const page = await browser.newPage({
  deviceScaleFactor: SCALE,
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126 Safari/537.36',
});
await page.setContent(`<!doctype html><meta charset="utf-8"><body style="margin:24px;background:#fff">${BADGES.map(widget).join('')}</body>`, { waitUntil: 'networkidle' });

const out = {};
for (const [i, b] of BADGES.entries()) {
  const el = page.locator(`#TA_${b.wtype}${i} > div`);
  await el.waitFor({ timeout: 20000 });
  const text = (await el.innerText()).replace(/\s+/g, ' ').trim();
  const png = await el.screenshot();
  const meta = await sharp(png).metadata();
  await sharp(png).webp({ quality: 92 }).toFile(path.resolve('public/img', b.file));
  out[b.key] = { src: `/img/${b.file}`, width: Math.round(meta.width / SCALE), height: Math.round(meta.height / SCALE), text };
  console.log(b.key, `${out[b.key].width}x${out[b.key].height}`, '·', text);
}
await browser.close();

out.capturedAt = new Date().toISOString().slice(0, 10);
await writeFile(path.resolve('src/lib/tripadvisor-badges.json'), JSON.stringify(out, null, 2) + '\n');
