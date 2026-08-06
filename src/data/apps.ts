export interface AppLink {
  label: string;
  href: string;
  icon: string;
}

export interface AppFact {
  label: string;
  value: string;
}

export interface AppEntry {
  slug: string;
  name: string;
  tagline: string;
  pitch: string;
  platform: string;
  status: string;
  /** Flagship apps get the large showcase treatment in the gallery. */
  featured: boolean;
  /** Optional screenshot; apps without one get a generated cover. */
  hero?: string;
  heroAlt?: string;
  /** Icon used for the generated cover when no hero screenshot exists. */
  icon?: string;
  accentHue: number;
  tags: string[];
  links: AppLink[];
  facts: AppFact[];
}

export const apps: AppEntry[] = [
  {
    slug: 'patcher',
    name: 'Patcher',
    tagline: 'The digital twin workspace for Eurorack musicians.',
    pitch:
      'Document patches, plan racks, and track modules against a community-maintained hardware database — so the system in your studio always has an accurate, living record.',
    platform: 'Web',
    status: 'Live · actively maintained since 2021',
    featured: true,
    hero: '/apps/patcher/homepage-hero-graph.jpg',
    heroAlt: 'Patcher homepage showing the patch graph preview and patch detail showcase',
    accentHue: 210,
    tags: ['Angular', 'TypeScript', 'Supabase', 'PostgreSQL', 'Open Source'],
    links: [
      { label: 'Open app', href: 'https://patcher.xyz', icon: 'external' },
      { label: 'Source', href: 'https://github.com/Polyterative/Patcher', icon: 'github' },
    ],
    facts: [
      { label: 'Platform', value: 'Web — desktop & mobile' },
      { label: 'Status', value: 'Live at patcher.xyz' },
      { label: 'Current version', value: 'v6.5' },
      { label: 'First release', value: '2021' },
      { label: 'Model', value: 'Free · no ads · no paywalls' },
      { label: 'License', value: 'Open source (AGPL-3.0)' },
      { label: 'Stack', value: 'Angular · TypeScript · Supabase · PostgreSQL' },
      { label: 'Extras', value: 'Public open API · community module database' },
    ],
  },
  {
    slug: 'kinetip',
    name: 'Kinetip',
    tagline: 'A pen tablet that finally feels native on macOS.',
    pitch:
      'A native macOS driver that turns pen input into precise pointing, dragging, and inertial scrolling — aware of whether the pen landed on scrollable content or on controls.',
    platform: 'macOS',
    status: 'Pre-release · in daily use, release hardening',
    featured: true,
    hero: '/blog/kinetip/app-overview.jpg',
    heroAlt: 'Kinetip settings window showing the readiness overview',
    accentHue: 172,
    tags: ['Swift', 'macOS', 'IOKit / HID', 'SwiftUI', 'Realtime'],
    links: [
      { label: 'Read the write-up', href: '/blog/kinetip-native-macos-pen-tablet-driver', icon: 'book' },
    ],
    facts: [
      { label: 'Platform', value: 'macOS 14+' },
      { label: 'Status', value: 'Pre-release — daily-driven, release gates in progress' },
      { label: 'Model', value: 'Native menu-bar app + settings window' },
      { label: 'Stack', value: 'Swift 6 · IOKit HID · CoreGraphics · SwiftUI' },
      { label: 'Footprint', value: '~82MB memory · under 2% of a single CPU core across a full workday' },
      { label: 'Input path', value: 'Realtime thread — no locks, no allocations' },
      { label: 'Latency', value: 'Median ~400ns per report, hardware to gesture — benchmarked on a Mac Studio' },
      { label: 'Display sync', value: 'Frame-paced to your panel — 60Hz or ProMotion 120Hz' },
      { label: 'Testing', value: '800+ tests · seeded fuzzers · runtime soak storms' },
      { label: 'Privacy', value: 'Fully local — no network, no telemetry' },
      { label: 'Distribution', value: 'Open to publishing partners' },
    ],
  },
  {
    slug: 'impulse',
    name: 'Impulse',
    tagline: 'A node-based visual engine for live performance.',
    pitch:
      'Generative visuals for live AV sets, built as a transparent, version-controllable TypeScript alternative to closed proprietary tools — and fully open to AI-assisted workflows.',
    platform: 'Web',
    status: 'In development · used in performance prep',
    featured: false,
    icon: 'layers',
    accentHue: 282,
    tags: ['TypeScript', 'WebGPU', 'Web MIDI', 'Web Audio', 'Live Performance'],
    links: [
      { label: 'Write-up', href: '/blog/impulse-webgpu-generative-visual-engine', icon: 'book' },
    ],
    facts: [
      { label: 'Platform', value: 'Web — Chromium with WebGPU' },
      { label: 'Status', value: 'In active development' },
      { label: 'Model', value: 'Open source' },
      { label: 'Stack', value: 'TypeScript · Vite · Web MIDI · Web Audio' },
      { label: 'Architecture', value: 'Signals → node graph → entity world → render worker' },
      { label: 'Inputs', value: 'MIDI hardware · live audio analysis · UI' },
    ],
  },
  {
    slug: 'costameno',
    name: 'CostaMeno',
    tagline: 'The cheapest fuel nearby, in one tap.',
    pitch:
      'A mobile-first finder built on official Italian open data. Open a URL at the pump, see the cheapest station around you. No login, no ads, no tracking.',
    platform: 'Web · mobile-first',
    status: 'Live',
    featured: false,
    hero: '/blog/covers/costameno.png',
    heroAlt: 'CostaMeno map view with color-coded fuel station pins',
    accentHue: 145,
    tags: ['Next.js', 'TypeScript', 'Open Data', 'Civic Tech'],
    links: [
      { label: 'Live app', href: 'https://costameno.vercel.app', icon: 'external' },
      { label: 'Write-up', href: '/blog/costameno-italian-fuel-price-finder', icon: 'book' },
    ],
    facts: [
      { label: 'Platform', value: 'Web — mobile-first, no install' },
      { label: 'Status', value: 'Live at costameno.vercel.app' },
      { label: 'Model', value: 'Free · no login · no ads · no tracking' },
      { label: 'Data', value: 'MIMIT open data · ~23,000 stations · daily updates' },
      { label: 'Stack', value: 'Next.js 15 · TypeScript · Tailwind · Leaflet' },
      { label: 'Privacy', value: 'No GPS permission — tap the map instead' },
    ],
  },
  {
    slug: 'local-ai-toolkit',
    name: 'Local AI Toolkit',
    tagline: 'Small utilities for living with local LLMs.',
    pitch:
      'mini-tagger and mini-renamer bring AI-assisted file tagging and renaming to macOS via local models; lms-guard unloads idle models to reclaim RAM. Three tools, one philosophy: everything stays on your machine.',
    platform: 'macOS',
    status: 'In daily use',
    featured: false,
    icon: 'tool',
    accentHue: 28,
    tags: ['Python', 'Local AI', 'LM Studio', 'macOS'],
    links: [
      { label: 'Write-up', href: '/blog/local-ai-toolkit-tagger-renamer-guard', icon: 'book' },
    ],
    facts: [
      { label: 'Platform', value: 'macOS · Apple Silicon' },
      { label: 'Status', value: 'Released — in daily use' },
      { label: 'Contents', value: 'mini-tagger · mini-renamer · lms-guard' },
      { label: 'Stack', value: 'Python · LM Studio · Moondream2 on MPS' },
      { label: 'Privacy', value: 'Fully local — no uploads, ever' },
      { label: 'Design', value: 'One job per tool · human-in-the-loop where it matters' },
    ],
  },
  {
    slug: 'thear',
    name: 'thear',
    tagline: 'Hear your AI agents work.',
    pitch:
      'A daemon that turns Claude Code activity into real-time OSC messages for Ableton Live — sonifying agentic coding sessions as they happen.',
    platform: 'macOS · CLI',
    status: 'Released',
    featured: false,
    icon: 'music',
    accentHue: 330,
    tags: ['Python', 'OSC', 'Ableton', 'AI'],
    links: [
      { label: 'Source', href: 'https://github.com/polyterative/thear', icon: 'github' },
      { label: 'Write-up', href: '/blog/sonifying-ai-work-thear', icon: 'book' },
    ],
    facts: [
      { label: 'Platform', value: 'macOS · Python daemon' },
      { label: 'Status', value: 'Released — open source' },
      { label: 'Input', value: 'Claude Code hooks — tool calls, writes, completions' },
      { label: 'Output', value: 'OSC — Ableton via Max for Live, or anywhere' },
      { label: 'Stack', value: 'Python · OSC · Max for Live' },
      { label: 'Latency', value: 'Real-time — events fire as the agent works' },
    ],
  },
  {
    slug: 'metron-preset-tool',
    name: 'METRON Preset Tool',
    tagline: 'A terminal manager for WMD METRON presets.',
    pitch:
      'Reverse-engineered viewer and manager for the .WMD preset format of the METRON Eurorack sequencer — an unofficial bridge between code and hardware.',
    platform: 'Cross-platform · CLI',
    status: 'Released',
    featured: false,
    icon: 'terminal',
    accentHue: 55,
    tags: ['Python', 'Eurorack', 'Reverse Engineering', 'CLI'],
    links: [
      { label: 'Source', href: 'https://github.com/Polyterative/metron-preset-tool', icon: 'github' },
    ],
    facts: [
      { label: 'Platform', value: 'Cross-platform — terminal' },
      { label: 'Status', value: 'Released — open source' },
      { label: 'Format', value: '.WMD presets — reverse-engineered, unofficial' },
      { label: 'Hardware', value: 'WMD METRON Eurorack sequencer' },
      { label: 'Stack', value: 'Python' },
      { label: 'Affiliation', value: 'Independent — not affiliated with WMD' },
    ],
  },
];

export const featuredApps = apps.filter((a) => a.featured);
export const moreApps = apps.filter((a) => !a.featured);

export function getApp(slug: string): AppEntry {
  const app = apps.find((a) => a.slug === slug);
  if (!app) throw new Error(`Unknown app: ${slug}`);
  return app;
}
