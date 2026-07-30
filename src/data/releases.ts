export interface MusicRelease {
  title: string;
  date: string;
  year: string;
  released: string;
  cover: string;
  url: string;
  genre: string[];
  desc: string | null;
  tracks: number | null;
  highlight?: boolean;
}

export const releases: MusicRelease[] = [
  {
    title: 'Without Us',
    date: '2025-02-28',
    year: '2025',
    released: 'Feb 28, 2025',
    cover: '/music/without-us.jpg',
    url: 'https://polyterative.bandcamp.com/album/without-us',
    genre: ['Industrial Techno', 'Modular Synthesis'],
    desc: `A brutalist, techno-futuristic landscape of corrupted digital space — a story of hyperconnectivity's collapse, built from the ground up with modular synthesis. If Ruled by Code was an introduction to this world, Without Us is the moment of its unraveling.`,
    tracks: 8,
    highlight: true,
  },
  {
    title: 'Persist',
    date: '2024-03-12',
    year: '2024',
    released: 'Mar 12, 2024',
    cover: '/music/persist.jpg',
    url: 'https://polyterative.bandcamp.com/track/persist',
    genre: ['Electronic', 'Ambient', 'Downtempo'],
    desc: null,
    tracks: 1,
  },
  {
    title: 'Is It You',
    date: '2021-10-02',
    year: '2021',
    released: 'Oct 2, 2021',
    cover: '/music/is-it-you.jpg',
    url: 'https://polyterative.bandcamp.com/track/is-it-you',
    genre: ['Electronic'],
    desc: `A swirling, ethereal exploration of the search for connection — born from a dream and composed in a single hour. Haunting melodies and unpredictable rhythms for the countless strangers we pass every day, each one asking: is it you?`,
    tracks: 1,
  },
  {
    title: 'Ruled by Code',
    date: '2020-06-15',
    year: '2020',
    released: 'Jun 15, 2020',
    cover: '/music/ruled-by-code.jpg',
    url: 'https://polyterative.bandcamp.com/album/ruled-by-code',
    genre: ['Drone', 'Ambient', 'Electronic'],
    desc: `A deep and introspective look at the digital age — five drone tracks exploring algorithmic control, identity, and the blurring line between the virtual and the real.`,
    tracks: 5,
  },
  {
    title: 'Parzialmente Nuvoloso',
    date: '2020-04-18',
    year: '2020',
    released: 'Apr 18, 2020',
    cover: '/music/parzialmente-nuvoloso.jpg',
    url: 'https://polyterative.bandcamp.com/album/parzialmente-nuvoloso',
    genre: ['Ambient', 'Electronic'],
    desc: `A sonic exploration of the human experience across three long-form pieces — Cirri, Strati, and Cumuli — an invitation to introspection and resilience.`,
    tracks: 3,
  },
  {
    title: 'Looking for Truth',
    date: '2019-08-15',
    year: '2019',
    released: 'Aug 15, 2019',
    cover: '/music/looking-for-truth.jpg',
    url: 'https://polyterative.bandcamp.com/album/looking-for-truth',
    genre: ['Electronic', 'Ambient'],
    desc: null,
    tracks: 8,
  },
  {
    title: 'Absence',
    date: '2017-09-01',
    year: '2017',
    released: 'Sep 1, 2017',
    cover: '/music/absence.jpg',
    url: 'https://polyterative.bandcamp.com/album/absence',
    genre: ['Chillstep', 'Electronic'],
    desc: `An emotional exploration of the voids within us — hauntingly beautiful chillstep written over nine months, from October 2016 to July 2017. The debut EP.`,
    tracks: null,
  },
];
