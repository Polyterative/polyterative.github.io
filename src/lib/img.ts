import sharp from 'sharp';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const PUBLIC = join(process.cwd(), 'public');
const cache = new Map<string, { width: number; height: number; webp: string | null } | null>();

/** Intrinsic size and WebP sibling (if any) for a root-relative image under public/. */
export async function imgMeta(src: string) {
  if (!src.startsWith('/')) return null;
  if (cache.has(src)) return cache.get(src)!;
  let meta: { width: number; height: number; webp: string | null } | null = null;
  const file = join(PUBLIC, src);
  if (existsSync(file)) {
    const { width, height } = await sharp(file).metadata();
    const webpSrc = src.replace(/\.(jpe?g|png)$/i, '.webp');
    meta = width && height
      ? { width, height, webp: webpSrc !== src && existsSync(join(PUBLIC, webpSrc)) ? webpSrc : null }
      : null;
  }
  cache.set(src, meta);
  return meta;
}
