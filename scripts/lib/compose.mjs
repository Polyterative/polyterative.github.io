// Apple-style framing for raw UI captures: tinted backdrop, optional macOS window chrome,
// rounded corners and a soft shadow. Pure sharp + SVG, no native deps beyond sharp.
import sharp from 'sharp';

// DESIGN.md: product screenshots sit flat on a grey "image ground" from the concrete ramp, no shadows or
// gradients; texture belongs to the ground only (never the screenshot); hairlines, not glow.
const GROUND = {
  light: { fill: '#E2E2DE', line: '#B4B4AE', noise: [0, 0.1, 0.06] },  // Paper: c-100 ground, c-300 rule
  dark: { fill: '#1C1C1B', line: '#3A3A36', noise: [1, 0.075, 0.04] }, // Instrument: c-900 ground, c-800 rule
};

function groundSvg(W, H, tone) {
  const g = GROUND[tone];
  const [c, grain, mottle] = g.noise;
  const layer = (id, freq, octaves, alpha) => `
    <filter id="${id}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${octaves}" stitchTiles="stitch"/>
      <feColorMatrix values="0 0 0 0 ${c}  0 0 0 0 ${c}  0 0 0 0 ${c}  ${alpha} 0 0 0 0"/>
    </filter>`;
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs>${layer('grain', 0.45, 3, grain)}${layer('mottle', 0.003, 2, mottle)}</defs>
    <rect width="${W}" height="${H}" fill="${g.fill}"/>
    <rect width="${W}" height="${H}" filter="url(#mottle)"/>
    <rect width="${W}" height="${H}" filter="url(#grain)"/>
  </svg>`);
}

function roundedMask(w, h, r) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="${w}" height="${h}" rx="${r}" ry="${r}" fill="#fff"/></svg>`);
}

/** Hairline hugging the subject's own silhouette (works for rounded windows and free-form widgets alike). */
async function outline(subject, color, px) {
  const pad = px * 2;
  const solid = await sharp(subject).extractChannel(3).threshold(100).extend({ top: pad, bottom: pad, left: pad, right: pad, background: '#000' }).toBuffer();
  const grown = await sharp(solid).dilate(px).toBuffer();
  const ring = await sharp(grown).composite([{ input: solid, blend: 'dest-out' }]).toBuffer();
  const { width, height } = await sharp(ring).metadata();
  // dest-out on a 1-channel image leaves it unchanged in some builds, so subtract explicitly.
  const diff = await sharp(grown).composite([{ input: await sharp(solid).negate().toBuffer(), blend: 'multiply' }]).toBuffer();
  const layer = await sharp({ create: { width, height, channels: 3, background: color } }).joinChannel(diff).png().toBuffer();
  return { input: layer, pad };
}

/**
 * Remove a flat background that touches the image border (flood fill, so same-coloured pixels
 * inside the subject survive), then crop to what is left. For captures rendered on white/opaque.
 */
async function keyBackground(buf, { tolerance = 7, largest = false } = {}) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h } = info;
  const px = (x, y) => (y * w + x) * 4;
  const [br, bg, bb] = [data[0], data[1], data[2]];
  const isBg = (i) => data[i + 3] < 8 || (Math.abs(data[i] - br) <= tolerance && Math.abs(data[i + 1] - bg) <= tolerance && Math.abs(data[i + 2] - bb) <= tolerance);
  const seen = new Uint8Array(w * h);
  const stack = [];
  const push = (x, y) => { const k = y * w + x; if (!seen[k] && isBg(px(x, y))) { seen[k] = 1; stack.push(k); } };
  for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
  for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
  while (stack.length) {
    const k = stack.pop();
    const x = k % w, y = (k - x) / w;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }
  for (let k = 0; k < seen.length; k++) if (seen[k]) data[k * 4 + 3] = 0;
  if (largest) {
    // Keep only the biggest connected opaque blob (drops stray pills/labels floating next to the subject).
    const label = new Int32Array(w * h);
    const sizes = [0];
    for (let k0 = 0; k0 < seen.length; k0++) {
      if (seen[k0] || label[k0]) continue;
      const id = sizes.length;
      sizes.push(0);
      const q = [k0];
      label[k0] = id;
      while (q.length) {
        const k = q.pop();
        sizes[id]++;
        const x = k % w;
        for (const n of [x > 0 ? k - 1 : -1, x < w - 1 ? k + 1 : -1, k >= w ? k - w : -1, k < w * (h - 1) ? k + w : -1]) {
          if (n >= 0 && !seen[n] && !label[n]) { label[n] = id; q.push(n); }
        }
      }
    }
    const keep = sizes.indexOf(Math.max(...sizes.slice(1)));
    for (let k = 0; k < label.length; k++) if (label[k] !== keep) data[k * 4 + 3] = 0;
  }
  const keyed = await sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
  // Soften the cut edge by a pixel so the silhouette is not jagged.
  const alpha = await sharp(keyed).extractChannel(3).blur(0.8).linear(1.6, -90).toBuffer();
  const rgb = await sharp(keyed).removeAlpha().toBuffer();
  const out = await sharp(rgb).joinChannel(alpha).png().toBuffer();
  return sharp(out).trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 1 }).png().toBuffer();
}

/** Mean colour of a thin strip along the top of the capture, used to tint the title bar. */
async function topColor(buf, w) {
  const strip = await sharp(buf).extract({ left: 0, top: 0, width: w, height: 6 }).resize(1, 1).raw().toBuffer();
  return { r: strip[0], g: strip[1], b: strip[2] };
}

/**
 * @param {Buffer} input raw capture (PNG)
 * @param {object} o
 * @param {number} o.width canvas width (px)
 * @param {number} o.height canvas height (px)
 * @param {'window'|'object'} o.frame
 * @param {'light'|'dark'} o.tone backdrop tone
 * @param {boolean} [o.chrome] add a macOS title bar with traffic lights (captures without real window chrome)
 * @param {{left?:number,top?:number,width?:number,height?:number}} [o.crop] keep a region of the capture (fractions of its size) before framing
 * @param {boolean} [o.trim] trim a flat background border off the capture first
 * @param {boolean} [o.round] force rounded corners on opaque captures
 * @param {number} [o.fill] max share of the canvas the subject may occupy along its limiting axis
 */
export async function compose(input, o) {
  const { width: W, height: H, frame, tone, chrome = false, trim = false, round = frame === 'window', fill = frame === 'window' ? 0.86 : 0.7 } = o;
  const dark = tone === 'dark';

  let img = sharp(input).ensureAlpha();
  if (o.crop) {
    const { width: cw0, height: ch0 } = await img.metadata();
    const { left = 0, top = 0, width = 1, height = 1 } = o.crop;
    img = sharp(await img.extract({ left: Math.round(cw0 * left), top: Math.round(ch0 * top), width: Math.round(cw0 * width), height: Math.round(ch0 * height) }).png().toBuffer());
  }
  if (o.key) img = sharp(await keyBackground(await img.png().toBuffer(), { largest: o.largest }));
  else if (trim) img = sharp(await img.trim({ threshold: 12 }).png().toBuffer());
  let shot = await img.png().toBuffer();
  if (o.shape) {
    // Replace a ragged keyed edge with a clean rounded rectangle (inset trims soft halo, radius as share of the short side).
    const m0 = await sharp(shot).metadata();
    const inset = Math.round(Math.min(m0.width, m0.height) * o.shape.inset);
    const cw = m0.width - inset * 2;
    const ch = m0.height - inset * 2;
    shot = await sharp(shot).extract({ left: inset, top: inset, width: cw, height: ch })
      .composite([{ input: roundedMask(cw, ch, Math.round(Math.min(cw, ch) * o.shape.radius)), blend: 'dest-in' }])
      .png().toBuffer();
  }
  const meta = await sharp(shot).metadata();
  let sw = meta.width;
  let sh = meta.height;

  // Title bar (window frame, chrome=true): stacked above the capture, same tint as its top edge.
  let titleH = 0;
  if (frame === 'window' && chrome) {
    titleH = Math.round(sw * 0.034);
    const { r, g, b } = await topColor(shot, sw);
    const dot = titleH * 0.2;
    const DOT = GROUND[tone].line;
    const cy = titleH / 2;
    const bar = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${sw}" height="${titleH}">
      <rect width="${sw}" height="${titleH}" fill="rgb(${r},${g},${b})"/>
      <circle cx="${titleH * 0.62}" cy="${cy}" r="${dot}" fill="${DOT}"/>
      <circle cx="${titleH * 1.12}" cy="${cy}" r="${dot}" fill="${DOT}"/>
      <circle cx="${titleH * 1.62}" cy="${cy}" r="${dot}" fill="${DOT}"/>
    </svg>`);
    shot = await sharp({ create: { width: sw, height: sh + titleH, channels: 4, background: { r, g, b, alpha: 1 } } })
      .composite([{ input: bar, top: 0, left: 0 }, { input: shot, top: titleH, left: 0 }])
      .png().toBuffer();
    sh += titleH;
  }

  const scale = Math.min((W * fill) / sw, (H * fill) / sh);
  const tw = Math.round(sw * scale);
  const th = Math.round(sh * scale);
  const radius = Math.round(Math.min(tw, th) * (frame === 'window' ? 0.022 : 0.05));

  let subject = await sharp(shot).resize(tw, th, { kernel: 'lanczos3' }).png().toBuffer();
  if (round) {
    subject = await sharp(subject)
      .composite([{ input: roundedMask(tw, th, radius), blend: 'dest-in' }])
      .png().toBuffer();
  }

  const left = Math.round((W - tw) / 2);
  const top = Math.round((H - th) / 2);

  const edge = await outline(subject, GROUND[tone].line, Math.max(2, Math.round(W / 1000)));
  return sharp(groundSvg(W, H, tone))
    .composite([
      { input: subject, left, top },
      { input: edge.input, left: left - edge.pad, top: top - edge.pad },
    ])
    .removeAlpha();
}
