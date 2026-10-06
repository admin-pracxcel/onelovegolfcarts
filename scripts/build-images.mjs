// Builds responsive AVIF / WebP / JPEG variants of the curated source photos
// into the theme. Widths never exceed the source width (no upscaling).
// Usage: npm run images (from the repo root)
import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const SRC = path.resolve('assets/source');
const OUT = path.resolve('public/img');

// name => target widths. Aspect is preserved; cropping is done in CSS (object-fit).
const PHOTOS = {
  'guests-golf-cart-convoy-beachfront-san-pedro': [640, 800, 960, 1280],
  'red-4-seater-club-car-bougainvillea-resort': [480, 640, 800, 1200],
  'maroon-6-seater-golf-cart-beachfront-park': [480, 640, 800, 1200],
  'one-love-fleet-lineup-under-palms': [480, 640, 800, 1280],
  'golf-cart-tropic-air-terminal-san-pedro-airport': [480, 640, 800, 1200],
  'guests-luggage-golf-carts-village-mart': [480, 640, 800, 1280],
  'green-golf-cart-san-pedro-central-park': [480, 640, 800, 1200],
  'camo-golf-cart-colourful-san-pedro-street': [480, 640, 800, 1200],
  'colourful-golf-cart-fleet-palms': [640, 960, 1280],
  'blog-sand-road-golf-cart-coast': [480, 640, 800, 1280],
  'blog-beach-restaurant-lobster': [480, 640, 800, 1280],
};

await mkdir(OUT, { recursive: true });
const manifest = {};

for (const [name, widths] of Object.entries(PHOTOS)) {
  const input = path.join(SRC, `${name}.jpg`);
  const meta = await sharp(input).metadata();
  const usable = widths.filter((w) => w <= meta.width);
  if (!usable.includes(meta.width) && usable.at(-1) < meta.width && widths.at(-1) > meta.width) usable.push(meta.width);
  manifest[name] = { w: meta.width, h: meta.height, widths: usable };
  for (const w of usable) {
    const base = sharp(input).rotate().resize({ width: w, withoutEnlargement: true });
    await base.clone().avif({ quality: 52, effort: 6 }).toFile(path.join(OUT, `${name}-${w}.avif`));
    await base.clone().webp({ quality: 78 }).toFile(path.join(OUT, `${name}-${w}.webp`));
    await base.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(path.join(OUT, `${name}-${w}.jpg`));
  }
  console.log(name, meta.width + 'x' + meta.height, usable.join(','));
}

// Open Graph image: 1200x630 crop of the hero.
await sharp(path.join(SRC, 'guests-golf-cart-convoy-beachfront-san-pedro.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(path.join(OUT, 'og-golf-cart-rental-san-pedro-belize.jpg'));

// Logo: original + reversed (navy lettering -> white) for dark backgrounds.
// Interim only: the client needs to supply a vector logo.
const logo = sharp(path.join(SRC, 'one-love-logo.png')).ensureAlpha();
const { data, info } = await logo.clone().raw().toBuffer({ resolveWithObject: true });
const rev = Buffer.from(data);
for (let i = 0; i < rev.length; i += 4) {
  const [r, g, b] = [rev[i], rev[i + 1], rev[i + 2]];
  // Navy lettering: low red/green, blue-dominant.
  if (r < 90 && g < 110 && b > 60 && b - r > 40) { rev[i] = 255; rev[i + 1] = 255; rev[i + 2] = 255; }
}
await sharp(rev, { raw: info }).png({ compressionLevel: 9 }).toFile(path.join(OUT, 'one-love-logo-reversed.png'));
await logo.clone().png({ compressionLevel: 9 }).toFile(path.join(OUT, 'one-love-logo.png'));
await sharp(rev, { raw: info }).webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, 'one-love-logo-reversed.webp'));
await logo.clone().webp({ quality: 90, alphaQuality: 100 }).toFile(path.join(OUT, 'one-love-logo.webp'));

// Favicon suite.
const fav = path.join(SRC, 'favicon-512.webp');
for (const s of [16, 32, 180, 192, 512]) {
  await sharp(fav).resize(s, s).png().toFile(path.join(OUT, `favicon-${s}.png`));
}

await writeFile(path.resolve('src/lib/image-manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
console.log('done');
