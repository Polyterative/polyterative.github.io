// One-off / on-demand: recompress raster images in public/ (max 1600px wide) and write a .webp sibling for each.
// Usage: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, stat, writeFile, rename } from 'node:fs/promises';
import { join, extname } from 'node:path';

const ROOT = new URL('../public/', import.meta.url).pathname;
const MAX_WIDTH = 1600;

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

let before = 0;
let after = 0;
for await (const file of walk(ROOT)) {
  const ext = extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext) || file.includes('favicon')) continue;
  const size = (await stat(file)).size;
  before += size;

  const base = sharp(file).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const original = ext === '.png'
    ? await base.clone().png({ compressionLevel: 9, palette: true }).toBuffer()
    : await base.clone().jpeg({ quality: 80, mozjpeg: true }).toBuffer();
  const keep = original.length < size ? original : null;
  if (keep) await writeFile(file, keep);
  const webp = await base.clone().webp({ quality: 78 }).toBuffer();
  await writeFile(file.replace(/\.(jpe?g|png)$/i, '.webp'), webp);

  after += (keep ?? { length: size }).length;
  console.log(`${file.replace(ROOT, '')}  ${(size / 1024) | 0}K → ${((keep?.length ?? size) / 1024) | 0}K (+ ${(webp.length / 1024) | 0}K webp)`);
}
console.log(`total originals: ${(before / 1024) | 0}K → ${(after / 1024) | 0}K`);
