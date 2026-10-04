/**
 * Datum helpers: every mark (index, serial, date stamp, status) is derived from
 * real repo data. Nothing here invents a number.
 */

/** Zero-padded index, e.g. pad(3) → "03". */
export const pad = (n: number, width = 2) => String(n).padStart(width, '0');

/** "2026-08-07" → "2026.08.07" (ISO order, dots — DESIGN.md §9 version stamp). */
export const isoDots = (date: string | Date) => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())}`;
};

/** Site sections, in nav order. The index is the section's position in the nav. */
export const sections = [
  { href: '/apps', label: 'Apps', code: 'A' },
  { href: '/projects', label: 'Projects', code: 'P' },
  { href: '/timeline', label: 'Timeline', code: 'T' },
  { href: '/music', label: 'Music', code: 'M' },
  { href: '/blog', label: 'Writing', code: 'W' },
  { href: '/about', label: 'About', code: 'B' },
] as const;

export interface SectionInfo {
  index: string;   // "00" for home, "01".."06" in nav order, "—" for pages outside the nav
  label: string;
  code: string;
}

export function sectionFor(pathname: string): SectionInfo {
  if (pathname === '/' || pathname === '') return { index: '00', label: 'Index', code: 'IDX' };
  const i = sections.findIndex((s) => pathname === s.href || pathname.startsWith(`${s.href}/`));
  if (i === -1) return { index: '—', label: 'Off-index', code: 'X' };
  return { index: pad(i + 1), label: sections[i].label, code: sections[i].code };
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
