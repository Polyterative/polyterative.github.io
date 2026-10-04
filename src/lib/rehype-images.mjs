import { imgMeta } from './img.ts';

/** Adds intrinsic size, decoding and a WebP <picture> to raw <img> tags in markdown (public/ paths). */
export default function rehypeImages() {
  return async (tree) => {
    const jobs = [];
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'img' && typeof child.properties?.src === 'string') {
          const img = child;
          const job = imgMeta(img.properties.src).then((meta) => {
            if (!meta) return;
            img.properties.width = meta.width;
            img.properties.height = meta.height;
            img.properties.decoding = 'async';
            img.properties.loading ??= 'lazy';
            if (meta.webp) {
              Object.assign(child, {
                tagName: 'picture',
                properties: {},
                children: [
                  { type: 'element', tagName: 'source', properties: { srcset: meta.webp, type: 'image/webp' }, children: [] },
                  { type: 'element', tagName: 'img', properties: img.properties, children: [] },
                ],
              });
            }
          });
          jobs.push(job);
          return child;
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
    await Promise.all(jobs);
  };
}
