/**
 * Reads DESIGN.md and src/styles/global.css at build time, so the /system page reports what
 * the spec says and what the site's code actually does, instead of repeating numbers by hand.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = process.cwd();
const spec = readFileSync(resolve(root, 'DESIGN.md'), 'utf8');
const css = readFileSync(resolve(root, 'src/styles/global.css'), 'utf8');

const hexes = (s: string) => [...s.matchAll(/#[0-9A-Fa-f]{6}/g)].map((m) => m[0].toUpperCase());
const cells = (line: string) => line.split('|').slice(1, -1).map((c) => c.trim());
const between = (from: RegExp, to: RegExp) => {
  const a = spec.search(from);
  if (a < 0) return '';
  const rest = spec.slice(a + 1);
  const b = rest.search(to);
  return rest.slice(0, b < 0 ? undefined : b);
};
const tableRows = (block: string) =>
  block.split('\n').filter((l) => /^\| `/.test(l)).map(cells);

export const version = /^Status: (v\d+(?:\.\d+)*)/m.exec(spec)?.[1] ?? '';

export interface Token { name: string; paper: string; instrument: string }

/** Semantic tokens (4.5) plus the state colours (4.4), as Paper / Instrument hex pairs. */
export const tokens: Token[] = (() => {
  const map = new Map<string, Token>();
  for (const block of [between(/^#### Warning|^### 4\.4/m, /^### 4\.5/m), between(/^### 4\.5/m, /^### 4\.6/m)]) {
    for (const row of tableRows(block)) {
      const name = row[0].replaceAll('`', '');
      const h = hexes(row.slice(1).join(' '));
      if (h.length >= 2 && /^[a-z0-9-]+$/.test(name)) map.set(name, { name, paper: h[h.length - 2], instrument: h[h.length - 1] });
    }
  }
  return [...map.values()];
})();

export interface RampStep { step: string; hex: string; paper: string; instrument: string }

export const ramp: RampStep[] = tableRows(between(/^### 4\.1/m, /^### 4\.2/m))
  .map((r) => ({ step: r[0].replaceAll('`', ''), hex: hexes(r[1])[0], paper: r[2], instrument: r[3] }))
  .filter((r) => r.hex);

export const principles: { n: number; title: string }[] = [
  ...between(/^## 3\. Principles/m, /^## 4\. Colour/m).matchAll(/^(\d+)\. \*\*(.+?)\*\*/gm),
].map((m) => ({ n: Number(m[1]), title: m[2].replace(/\.$/, '') }));

const hexOf = (block: string) => {
  const out = new Map<string, string>();
  for (const m of block.matchAll(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})/g)) out.set(m[1], m[2].toUpperCase());
  return out;
};
const cssBlock = (open: RegExp) => {
  const a = css.search(open);
  return a < 0 ? '' : css.slice(a, css.indexOf('\n}', a));
};
const lightCss = hexOf(cssBlock(/^:root,\n\[data-scope="light"\] \{/m));
const darkCss = hexOf(cssBlock(/^:root\[data-theme="dark"\],\n\[data-scope="dark"\] \{/m));

export interface Conformance extends Token { codePaper?: string; codeInstrument?: string; ok: boolean; missing: boolean }

/** Each spec token against the value the site's CSS actually uses. Tokens with no CSS variable are `missing`. */
export const conformance: Conformance[] = tokens.map((t) => {
  const codePaper = lightCss.get(t.name);
  const codeInstrument = darkCss.get(t.name);
  const missing = codePaper === undefined && codeInstrument === undefined;
  return { ...t, codePaper, codeInstrument, missing, ok: !missing && codePaper === t.paper && codeInstrument === t.instrument };
});

const components = between(/^## 16\. Components/m, /^## Decisions log/m);
/** Atom headings as written in 16.1: `#### f. Button` → { letter: 'f', name: 'Button' }. */
export const atoms = [...components.matchAll(/^#### ([a-z])\. (.+)$/gm)].map((m) => ({ letter: m[1], name: m[2] }));
export const molecules = [...between(/^### 16\.2/m, /^### 16\.3/m).matchAll(/^\*\*(.+?)\.\*\*/gm)].map((m) => m[1]);
export const sourceUrl = 'https://github.com/polyterative/polyterative.github.io/blob/main/DESIGN.md';
