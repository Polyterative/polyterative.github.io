import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const W = 1200;
const H = 630;
const PAPER = '#EDEDEA';
const INK = '#111111';
const SIGNAL = '#EA562A';

let font: Buffer | undefined;

type Node = { type: string; props: { style?: Record<string, unknown>; children?: Node | string | (Node | string)[] } };
const el = (style: Record<string, unknown>, children?: Node['props']['children']): Node => ({
  type: 'div',
  props: { style: { display: 'flex', ...style }, children },
});

export interface OgCard {
  title: string;
  /** Small label above the title, e.g. "No. 019 · 2026.04.14". */
  kicker: string;
  tags?: string[];
}

/** Branded 1200×630 share card in the site's Departure Mono / Paper & Signal look. */
export async function renderOg({ title, kicker, tags = [] }: OgCard): Promise<Buffer> {
  font ??= await readFile(join(process.cwd(), 'src/assets/fonts/DepartureMono-Regular.ttf'));
  const size = title.length > 70 ? 54 : title.length > 40 ? 64 : 76;

  const tree = el(
    { width: W, height: H, background: PAPER, color: INK, flexDirection: 'column', justifyContent: 'space-between', padding: 56, fontFamily: 'Departure Mono' },
    [
      el({ justifyContent: 'space-between', fontSize: 24, borderBottom: `2px solid ${INK}`, paddingBottom: 16 }, [
        el({}, 'VLADY YAKOVENKO · POLYTERATIVE'),
        el({ color: SIGNAL }, kicker.toUpperCase()),
      ]),
      el({ fontSize: size, lineHeight: 1.1, letterSpacing: -1 }, title),
      el({ justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 24 }, [
        el({ gap: 12, flexWrap: 'wrap', maxWidth: 800 }, tags.slice(0, 4).map((t) => el({ border: `2px solid ${INK}`, padding: '4px 12px' }, t.toUpperCase()))),
        el({ color: SIGNAL }, 'polyterative.github.io'),
      ]),
    ],
  );

  const svg = await satori(tree as never, {
    width: W,
    height: H,
    fonts: [{ name: 'Departure Mono', data: font, weight: 400, style: 'normal' }],
  });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
}
