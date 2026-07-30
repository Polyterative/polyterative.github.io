export type TimelineCategory = 'work' | 'release' | 'event' | 'writing';

export interface TimelineMilestone {
  id: string;
  sortDate: string;
  dateLabel: string;
  category: Exclude<TimelineCategory, 'writing'>;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
  image?: string;
  imageAlt?: string;
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    id: 'ment-kino-siska-2025',
    sortDate: '2025-01-01',
    dateLabel: '2025',
    category: 'event',
    title: 'MENT Festival and Kino Šiška',
    description: 'Joined a panel talk at MENT Festival in Ljubljana, then performed a live modular set at Kino Šiška.',
    href: '/blog/live-av-performance-pipeline',
  },
  {
    id: 'peraspera-2024',
    sortDate: '2024-01-03',
    dateLabel: '2024',
    category: 'event',
    title: 'Live at perAspera festival',
    description: 'Performed a modular synthesis live set at perAspera festival in Bologna.',
    href: '/music',
    image: '/peraspera-2024.jpg',
    imageAlt: 'Vlady Yakovenko performing at perAspera festival in Bologna',
  },
  {
    id: 'live-av-2024',
    sortDate: '2024-01-02',
    dateLabel: '2024',
    category: 'event',
    title: 'Spatial sound and dedicated AV sets',
    description: 'Expanded the live practice through a multichannel spatialized performance and a dedicated audiovisual event in Bologna.',
    href: '/blog/live-av-performance-pipeline',
  },
  {
    id: 'dotgrid-2023',
    sortDate: '2023-01-01',
    dateLabel: '2023 — Present',
    category: 'work',
    title: 'Started the dotgrid visual system',
    description: 'An ongoing TouchDesigner system for real-time VJ sets and installations, driven by modular synthesis over OSC.',
    href: '/projects#visuals',
  },
  {
    id: 'angular-flex-2022',
    sortDate: '2022-01-01',
    dateLabel: '2022',
    category: 'event',
    title: 'Angular Flex: Building with Style',
    description: 'Led a public workshop in Bologna on design principles and Angular Flex Layout, including a live interface build.',
    href: 'https://github.com/polyterative/Presentations',
    external: true,
  },
  {
    id: 'patcher-first-release-2021',
    sortDate: '2021-01-02',
    dateLabel: '2021',
    category: 'release',
    title: 'First Patcher release',
    description: 'Released the first version of the open-source Eurorack workspace that would grow into Patcher v6.5.',
    href: '/apps/patcher',
  },
  {
    id: 'bologna-modulare-2021',
    sortDate: '2021-01-01',
    dateLabel: '2021',
    category: 'event',
    title: 'Began performing with Bologna Modulare',
    description: 'Started playing collaborative modular-improvisation sessions under the Polyterative name.',
    href: '/blog/live-av-performance-pipeline',
  },
];
