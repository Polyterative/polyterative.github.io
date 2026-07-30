export interface ExperienceEntry {
  role: string;
  org: string;
  orgUrl?: string;
  period: string;
  startDate: string;
  endDate?: string;
  active?: boolean;
  desc: string;
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Product Designer',
    org: 'XTEL',
    orgUrl: 'https://xtel.com',
    period: 'Aug 2024 — Present',
    startDate: '2024-08-01',
    active: true,
    desc: 'Leading redesign work for advanced analytics software, turning dense enterprise workflows into clearer product directions and a more coherent design language. My engineering background helps keep proposals realistic, implementation-aware, and developer-ready from the start.',
  },
  {
    role: 'Senior Frontend Developer',
    org: 'XTEL',
    orgUrl: 'https://xtel.com',
    period: 'Sep 2021 — Aug 2024',
    startDate: '2021-09-01',
    endDate: '2024-08-01',
    desc: 'Owned frontend architecture for promotions-optimization interfaces used in FMCG and retail contexts. Worked across Angular, RxJS, TypeScript, and SCSS while bridging data science, product, and UX on data-heavy workflows where clarity really matters.',
  },
  {
    role: 'Founder',
    org: 'Patcher.xyz',
    orgUrl: 'https://patcher.xyz',
    period: 'Mar 2020 — Present',
    startDate: '2020-03-01',
    active: true,
    desc: 'Built and continue to run an open-source product from concept to community: product direction, UX, frontend architecture, backend choices, releases, and user feedback loops. A long-running proof that I like owning hard problems end to end.',
  },
  {
    role: 'Frontend / Android / UX Engineer',
    org: 'Otre Solutions',
    period: 'Aug 2017 — Aug 2021',
    startDate: '2017-08-01',
    endDate: '2021-08-01',
    desc: 'Worked across manufacturing software for warehouse management, supply-chain planning, and production monitoring. The common thread was translating operational complexity into interfaces people could actually use day to day.',
  },
  {
    role: 'Electronic Music Producer & Live Performer',
    org: 'Freelance',
    period: '2012 — Present',
    startDate: '2012-01-01',
    active: true,
    desc: 'Long-running creative practice in experimental techno, modular synthesis, and live AV performance. It is separate from my software work, but it strongly informs how I think about systems, rhythm, interaction, and tooling.',
  },
  {
    role: 'Android Engineer',
    org: 'GESP',
    period: 'Jun 2016 — Aug 2016',
    startDate: '2016-06-01',
    endDate: '2016-08-01',
    desc: 'Early R&D work on a computer-vision project aimed at speeding up logistics data entry — a short engagement, but a useful introduction to product constraints outside straightforward CRUD apps.',
  },
];

export const education = {
  institution: 'IIS Belluzzi-Fioravanti',
  degree: 'Perito Informatico — Computer Science',
  period: '2012 — 2017',
  grade: '99/100',
};
