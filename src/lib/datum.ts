/**
 * Datum helpers: every mark (index, serial, date stamp, status) is derived from
 * real repo data. Nothing here invents a number.
 */

/** Zero-padded index, e.g. pad(3) → "03". */
export const pad = (n: number, width = 2) => String(n).padStart(width, '0');

/*
 * Counting systems — one per kind of counter, used the same way on every page:
 *   hex      site sections         §0x03
 *   letter   sections inside a page A, B, C
 *   roman    registries (apps, releases)  III
 *   decimal  posts (No. 019) and plain quantities (19)
 *   greek    figures               Fig. α
 *   lroman   list items            i, ii, iii
 */
export const hex = (n: number) => `0x${n.toString(16).toUpperCase().padStart(2, '0')}`;
export const letter = (n: number) => String.fromCharCode(64 + n);
export const roman = (n: number) => {
  let out = '';
  for (const [v, s] of [[1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'], [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'], [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']] as const) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
};
export const lroman = (n: number) => roman(n).toLowerCase();
export const greek = (n: number) => 'αβγδεζηθικλμνξοπρστυφχψω'[n - 1] ?? String(n);

/** "2026-08-07" → "2026.08.07" (ISO order, dots — DESIGN.md §9 version stamp). */
export const isoDots = (date: string | Date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;
};

/** Site sections, in nav order. The index is the section's position in the nav. */
export const sections = [
  { href: '/apps', label: 'Apps', code: 'A' },
  { href: '/showcase', label: 'Showcase', code: 'S' },
  { href: '/projects', label: 'Projects', code: 'P' },
  { href: '/timeline', label: 'Timeline', code: 'T' },
  { href: '/music', label: 'Music', code: 'M' },
  { href: '/blog', label: 'Writing', code: 'W' },
  { href: '/about', label: 'About', code: 'B' },
] as const;

/** Hex index of a section by its href, e.g. sectionIndex('/blog') → "0x06". */
export const sectionIndex = (href: string) => hex(sections.findIndex((s) => s.href === href) + 1);

export interface SectionInfo {
  index: string;   // "0x00" for home, "0x01".. in nav order, "—" for pages outside the nav
  label: string;
  code: string;
}

export function sectionFor(pathname: string): SectionInfo {
  if (pathname === '/' || pathname === '') return { index: hex(0), label: 'Index', code: 'IDX' };
  const i = sections.findIndex((s) => pathname === s.href || pathname.startsWith(`${s.href}/`));
  if (i === -1) return { index: '—', label: 'Off-index', code: 'X' };
  return { index: hex(i + 1), label: sections[i].label, code: sections[i].code };
}

export type StatusTone = 'live' | 'signal' | 'cold' | 'neutral';

/**
 * Split an app status string ("Live · actively maintained since 2021") into the pill
 * text ("Live") and the remainder, and pick a tone. Tones only reflect the status words
 * already in the data: Live → live, Pre-release → signal, In development → cold.
 */
export function parseStatus(status: string): { head: string; rest: string; tone: StatusTone } {
  const [head, ...restParts] = status.split(' · ');
  const h = head.toLowerCase();
  const tone: StatusTone = h.startsWith('live')
    ? 'live'
    : h.startsWith('pre-release')
      ? 'signal'
      : h.startsWith('in development')
        ? 'cold'
        : 'neutral';
  return { head, rest: restParts.join(' · '), tone };
}

export const pillClass = (tone: StatusTone) => (tone === 'neutral' ? 'pill' : `pill pill--${tone}`);
