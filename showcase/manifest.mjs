// The curated showcase. Each entry is one hand-picked screen from one app, not a dump of every state.
//
// A SOURCE says where an app's raw captures come from and how to regenerate them:
//   project   folder name next to this repo (override the parent with SHOWCASE_PROJECTS_DIR)
//   refresh   command run inside the project; `{out}` becomes a cache dir inside this repo
//   env       extra environment for the refresh command
//   dir       where the project writes captures when run by hand (used until a refresh has run)
//
// A SHOT picks one capture and says how to frame it:
//   file      capture file name inside the source dir
//   frame     'window'  macOS window: rounded corners, hairline
//             'object'  free-floating UI (widget, shelf, menu): hairline around its own silhouette
//   chrome    add a title bar with traffic lights (for window captures that have none)
//   tone      ground 'light' (Paper image ground) | 'dark' (Instrument); match the capture's own appearance
//   crop      { top, height } keep a vertical slice of a tall capture (fractions of its height)
//   trim      trim a flat border off the capture first
//   largest   with key: keep only the biggest object (drop floating labels beside it)
//   shape     { inset, radius } cut the keyed object to a clean rounded rectangle
//   key       remove an opaque flat background (e.g. white behind a rounded widget) and crop to the object
//   cover     also render a 21:9 version for blog headers
//   title / caption / alt   words shown on the site

import { readdirSync } from 'node:fs';

// Command Line Tools builds against the macOS 27 SDK fail on SwiftUI macros (SwiftUIMacros ships with Xcode only),
// so projects whose scripts don't pin an SDK get the newest 26.x one through SDKROOT.
const sdk26 = () => {
  const dir = '/Library/Developer/CommandLineTools/SDKs';
  try {
    const v = readdirSync(dir).filter((n) => /^MacOSX26[\d.]*\.sdk$/.test(n)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).at(-1);
    return v ? { SDKROOT: `${dir}/${v}` } : {};
  } catch { return {}; }
};

export const sources = {
  kinetip: {
    project: 'Kinetip',
    refresh: ['Tools/marketing_screenshots.sh', '{out}'],
    dir: 'marketing/screenshots',
  },
  habitat: {
    project: 'Habitat',
    // --showcase renders hand-written demo data instead of the live Home Assistant (no real names).
    refresh: ['Tools/snapshots.sh', '{out}', '--showcase'],
    env: sdk26(),
    dir: 'dist/snapshots',
  },
  ledge: {
    project: 'Ledge',
    // --showcase renders the curated scenes with hand-written file names and paths.
    refresh: ['Tools/snapshots.sh', '{out}', '--showcase'],
    dir: 'dist/snapshots',
  },
  spoke: {
    project: 'Spoke',
    refresh: ['Tools/snapshots.sh', '{out}'],
    env: sdk26(),
    dir: '.snapshots',
  },
  evocontrol: {
    project: 'EvoControl',
    refresh: ['Tools/snapshots.sh', '{out}'],
    dir: '/tmp/evocontrol-snapshots',
  },
};

export const apps = {
  kinetip: { name: 'Kinetip', blurb: 'Pen tablet driver for macOS' },
  habitat: { name: 'Habitat', blurb: 'Home Assistant on the Mac desktop' },
  ledge: { name: 'Ledge', blurb: 'A floating shelf for files in motion' },
  evocontrol: { name: 'EvoControl', blurb: 'A menu bar mixer for the Audient EVO 8' },
  spoke: { name: 'Spoke', blurb: 'A radial menu for phrases you retype' },
};

const window = (o) => ({ frame: 'window', tone: 'light', chrome: true, ...o });
const object = (o) => ({ frame: 'object', ...o });

export const shots = [
  // Kinetip: settings pages that show the product's actual ideas.
  window({ id: 'kinetip-overview', app: 'kinetip', file: '01-overview.png', cover: true,
    title: 'Overview', caption: 'Health, readiness and current setup on one screen.',
    alt: 'Kinetip overview page showing the engine is ready, a pen feel summary and the current mapping' }),
  window({ id: 'kinetip-gestures', app: 'kinetip', file: '04-gestures.png',
    title: 'Gestures', caption: 'Pen buttons and motions mapped to pointer, drag, pan and scroll.',
    alt: 'Kinetip gestures page with activation modes and pen feel sliders' }),
  window({ id: 'kinetip-momentum', app: 'kinetip', file: '05-momentum.png',
    title: 'Momentum', caption: 'Scroll inertia drawn as a curve you can tune.',
    alt: 'Kinetip momentum page with a decay curve preview and friction controls' }),
  window({ id: 'kinetip-mapping', app: 'kinetip', file: '03-mapping.png',
    title: 'Mapping', caption: 'Choose the active area on the tablet and see where it lands on screen.',
    alt: 'Kinetip mapping page with a screen target, orientation controls and a draggable active area' }),
  window({ id: 'kinetip-insights', app: 'kinetip', file: '09-insights.png',
    title: 'Usage insights', caption: 'Where the pen spends its time on the tablet surface.',
    alt: 'Kinetip usage insights page with a heatmap of pen activity' }),

  // Habitat: live data in the desktop widgets.
  object({ id: 'habitat-energy', app: 'habitat', file: 'energy-large-light.png', tone: 'light', cover: true,
    title: 'Energy', caption: 'Hourly consumption across the day, with the evening peak.',
    alt: 'Habitat energy widget charting hourly consumption for the whole house, heat pump and studio' }),
  object({ id: 'habitat-temperatures', app: 'habitat', file: 'chart-large-dark.png', tone: 'dark',
    title: 'Temperatures', caption: 'Every room in its own colour, last six hours.',
    alt: 'Habitat temperature chart in dark mode with colour-coded lines for five rooms' }),
  object({ id: 'habitat-power', app: 'habitat', file: 'power-large-light.png', tone: 'light',
    title: 'Power', caption: 'Spot the oven spike at a glance.',
    alt: 'Habitat power widget with whole house, heat pump, studio and fridge traces and one large spike' }),
  object({ id: 'habitat-gauges', app: 'habitat', file: 'gauges-large-light.png', tone: 'light',
    title: 'Gauges', caption: 'Humidity, commute time, outside temperature and battery levels.',
    alt: 'Habitat gauges widget with circular readings for humidity, commute, outside temperature, door battery and air filter' }),
  object({ id: 'habitat-air-quality', app: 'habitat', file: 'air-quality-large-dark.png', tone: 'dark',
    title: 'Air quality', caption: 'One reading needs attention; the other is good.',
    alt: 'Habitat air quality widget with an elevated kitchen VOC reading and good PM2.5' }),

  // Ledge: the shelf in its states.
  object({ id: 'ledge-shelf-images', app: 'ledge', file: 'shelf-three-images-light.png', tone: 'light', key: true, shape: { inset: 0.072, radius: 0.19 }, cover: true,
    title: 'The shelf', caption: 'Shake while dragging and a shelf appears under the pointer.',
    alt: 'Ledge shelf holding a stack of three images' }),
  object({ id: 'ledge-shelf-expanded', app: 'ledge', file: 'shelf-expanded-five-light.png', tone: 'light', key: true, shape: { inset: 0.04, radius: 0.11 },
    title: 'Expanded', caption: 'Open the stack to see every file, size and status.',
    alt: 'Ledge shelf expanded into a grid of five files, one marked missing' }),
  object({ id: 'ledge-shelf-copy', app: 'ledge', file: 'shelf-banner-progress-light.png', tone: 'light', key: true, shape: { inset: 0.072, radius: 0.19 },
    title: 'In flight', caption: 'Progress and cancel stay on the shelf while files copy.',
    alt: 'Ledge shelf showing a copying progress banner' }),
  window({ id: 'ledge-watchers', app: 'ledge', file: 'settings-watchers-light.png', chrome: true,
    title: 'Watched folders', caption: 'Disks, shares and folders that put new files on a shelf.',
    alt: 'Ledge settings page listing watched folders with their status' }),

  // Spoke: the radial menu.
  object({ id: 'spoke-wheel', app: 'spoke', file: 'radial-menu-02-root-hover.png', tone: 'dark', key: true, largest: true, cover: true,
    title: 'The wheel', caption: 'Point at a category, release, and the phrase lands where you type.',
    alt: 'Spoke radial menu with categories Email, Message, Reply, Schedule, Request, Thanks, Social and Snippets' }),
  window({ id: 'spoke-usage', app: 'spoke', file: 'showcase-usage-light.png', chrome: true,
    title: 'Usage', caption: 'See which phrases you reach for most.',
    alt: 'Spoke usage page ranking Follow up, Thank you, Introduce yourself and Politely decline by use' }),

  // EvoControl: the menu bar mixer and its voice processor.
  window({ id: 'evocontrol-mixer', app: 'evocontrol', file: '07-meters-active-light.png', chrome: false, cover: true,
    title: 'The mixer', caption: 'Levels, LUFS and spectrum for every output, from the menu bar.',
    alt: 'EvoControl mixer panel with monitor and headphone faders, live level meters and input gain' }),
  window({ id: 'evocontrol-mixer-dark', app: 'evocontrol', file: '07-meters-active-dark.png', tone: 'dark', chrome: false,
    title: 'After dark', caption: 'The same panel in dark mode, meters and all.',
    alt: 'EvoControl mixer panel in dark mode with green, amber and red level meters' }),
  window({ id: 'evocontrol-preset', app: 'evocontrol', file: '02-diverged.png', chrome: false,
    title: 'Presets', caption: 'Change something and Save or Revert appears next to the preset.',
    alt: 'EvoControl panel with an unsaved change and Revert and Save buttons beside the preset selector' }),
  window({ id: 'evocontrol-settings', app: 'evocontrol', file: '12-settings-open.png', chrome: false,
    title: 'Settings', caption: 'Every channel group in one scrolling panel: outputs, inputs, playback, loopback.',
    alt: 'EvoControl settings view listing outputs, inputs, playback and loopback channels' }),
  window({ id: 'evocontrol-voice-eq', app: 'evocontrol', file: '23-voice-page.png', chrome: false, crop: { top: 0.0, height: 0.33 },
    title: 'Voice', caption: 'Gate, EQ, leveler and compressor tuned for calls.',
    alt: 'EvoControl voice page with input and output levels, a gate and a six-band EQ over a live spectrum' }),
];
