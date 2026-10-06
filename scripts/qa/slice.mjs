// Splits tall full-page screenshots into viewable segments. Usage: node slice.mjs <files...>
import sharp from 'sharp';
for (const f of process.argv.slice(2)) {
  const m = await sharp(f).metadata();
  const seg = 2700;
  let i = 0;
  for (let y = 0; y < m.height; y += seg, i++) {
    await sharp(f).extract({ left: 0, top: y, width: m.width, height: Math.min(seg, m.height - y) }).resize({ width: 800 }).jpeg({ quality: 55 }).toFile(f.replace('.jpg', `-s${i}.jpg`));
  }
  console.log(f.split('/').pop(), m.height, i);
}
