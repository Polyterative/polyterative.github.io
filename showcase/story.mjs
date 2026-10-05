// The showcase as a story: one chapter per app, in reading order.
// Copy here is DRAFT (step 1 skeleton); it is rewritten from each app's PRODUCT.md / DESIGN.md next.
//
// A CHAPTER:
//   app        key in manifest.mjs `apps`
//   headline   the chapter's one-line thesis (big type)
//   problem    what the app fixes, one or two sentences
//   decision   the single design choice that defines it (pull quote)
//   blocks     what follows, in order:
//     { type: 'hero',  shot }                          full-width opener (uses the 21:9 cover when the shot has one)
//     { type: 'scene', shot, title, text }             sticky explainer beside one screen
//     { type: 'pair',  light, dark, title, text }      the same screen in both appearances, side by side

export const intro = {
  headline: 'Small tools for the edges of the Mac.',
  lead: 'Five apps that live where the work already is: under the pointer, in the menu bar, on the desktop. Every screen below is rendered from the real interface by the app’s own test suite.',
};

export const chapters = [
  {
    app: 'ledge',
    headline: 'A shelf that exists only while you need it.',
    problem: 'Moving files between windows means arranging windows. Ledge gives dragged files somewhere to wait.',
    decision: 'Nothing sits on screen until you shake the pointer mid-drag. Then it is right under your hand.',
    blocks: [
      { type: 'hero', shot: 'ledge-shelf-images' },
      { type: 'scene', shot: 'ledge-shelf-expanded', title: 'Open the stack', text: 'Every file, its size and its status in one grid. A missing file says so instead of failing quietly.' },
      { type: 'scene', shot: 'ledge-shelf-copy', title: 'Stays out of the way', text: 'Copy progress and cancel live on the shelf itself, so the window you came from stays untouched.' },
      { type: 'scene', shot: 'ledge-watchers', title: 'Shelves that fill themselves', text: 'Point it at a disk, a share or a folder and new files arrive on a shelf without a drag.' },
    ],
  },
  {
    app: 'spoke',
    headline: 'A menu you flick, not read.',
    problem: 'Phrases you retype every day deserve better than a snippet list.',
    decision: 'Direction beats reading. Point at a category, release, and the phrase lands where you are typing.',
    blocks: [
      { type: 'hero', shot: 'spoke-wheel' },
      { type: 'scene', shot: 'spoke-usage', title: 'Learns what you reach for', text: 'Usage ranks your phrases so the ones you use most sit where your hand already goes.' },
    ],
  },
  {
    app: 'habitat',
    headline: 'Your home as data, on the desktop.',
    problem: 'Home Assistant answers everything, one browser tab away. Habitat takes the useful answers out of the tab.',
    decision: 'Charts, not controls. Each widget shows a number you would otherwise go and look for.',
    blocks: [
      { type: 'hero', shot: 'habitat-energy' },
      { type: 'scene', shot: 'habitat-temperatures', title: 'One colour per room', text: 'Six hours of temperature, every room readable at a glance.' },
      { type: 'scene', shot: 'habitat-power', title: 'Spikes you can spot', text: 'Whole-house draw against the big consumers, so the oven peak is obvious.' },
      { type: 'scene', shot: 'habitat-gauges', title: 'Everything else, in rings', text: 'Humidity, commute, outside temperature and battery levels as simple readings.' },
      { type: 'scene', shot: 'habitat-air-quality', title: 'Quiet until it matters', text: 'Two readings, one needs attention. Only that one is loud.' },
    ],
  },
  {
    app: 'kinetip',
    headline: 'A pen driver you can feel and see.',
    problem: 'Tablet drivers hide their behaviour behind sliders with no feedback.',
    decision: 'Every setting is drawn: curves, heatmaps, target areas. If it changes how the pen feels, you can see why.',
    blocks: [
      { type: 'hero', shot: 'kinetip-overview' },
      { type: 'scene', shot: 'kinetip-gestures', title: 'Gestures', text: 'Pen buttons and motions mapped to pointer, drag, pan and scroll.' },
      { type: 'scene', shot: 'kinetip-momentum', title: 'Momentum you can tune', text: 'Scroll inertia drawn as a decay curve.' },
      { type: 'scene', shot: 'kinetip-mapping', title: 'Where the tablet lands', text: 'Pick the active area and see where it falls on screen.' },
      { type: 'scene', shot: 'kinetip-insights', title: 'Where the pen spends its time', text: 'A heatmap of pen activity across the tablet surface.' },
    ],
  },
  {
    app: 'evocontrol',
    headline: 'An audio interface, from the menu bar.',
    problem: 'Mixing an interface means a vendor app that needs its own window.',
    decision: 'The whole mixer is a panel off the menu bar, with meters that tell you more than the knobs do.',
    blocks: [
      { type: 'hero', shot: 'evocontrol-mixer' },
      { type: 'pair', light: 'evocontrol-mixer', dark: 'evocontrol-mixer-dark', title: 'Light and dark, same panel', text: 'The same layout in both appearances; the meters keep their colours.' },
      { type: 'scene', shot: 'evocontrol-preset', title: 'Edits are visible', text: 'Change anything and Save or Revert appears beside the preset.' },
      { type: 'scene', shot: 'evocontrol-settings', title: 'Every channel group', text: 'Outputs, inputs, playback and loopback in one scrolling panel.' },
      { type: 'scene', shot: 'evocontrol-voice-eq', title: 'A voice chain for calls', text: 'Gate, EQ, leveler and compressor over a live spectrum.' },
    ],
  },
];
