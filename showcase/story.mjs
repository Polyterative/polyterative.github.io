// The showcase as a story: one chapter per app, in reading order.
// Copy is drawn from each app's PRODUCT.md / DESIGN.md; facts are things those docs or the code state. Edit freely.
//
// A CHAPTER:
//   app        key in manifest.mjs `apps`
//   headline   the chapter's one-line thesis (big type)
//   problem    what the app fixes, one or two sentences
//   decision   the single design choice that defines it (pull quote)
//   facts      [label, value] pairs shown under the problem; only things the app's docs or code state
//   blocks     what follows, in order:
//     { type: 'hero',  shot }                          full-width opener (uses the 21:9 cover when the shot has one)
//     { type: 'scene', shot, title, text }             sticky explainer beside one screen
//     { type: 'detail', detail, title, text, marks }    zoomed crop with numbered pins; marks are { x, y, text } as fractions of the crop
//     { type: 'note',  text }                          a short paragraph between screens
//     { type: 'pair',  light, dark, title, text }      the same screen in both appearances, side by side

export const intro = {
  headline: "Five Mac apps I've built.",
  lead: "Every screen here is rendered by the app's own tests, using demo content in place of my real files, rooms and messages.",
};

export const chapters = [
  {
    app: 'ledge',
    headline: 'Shake while dragging and a shelf appears.',
    problem: 'I move a lot of files between local folders, external disks and a NAS. Ledge gives them somewhere to wait while I find the destination.',
    decision: 'The shelf floats above your windows without taking focus, so the app you were dragging from stays in front.',
    facts: [['Opens with', 'Shake or a held key'], ['Focus', 'Never taken'], ['Watches', 'Folders, shares, disks']],
    blocks: [
      { type: 'hero', shot: 'ledge-shelf-images' },
      { type: 'scene', shot: 'ledge-shelf-expanded', title: 'Open the stack', text: 'A shelf points at files where they are, so nothing is duplicated until you copy it. Open the stack to see each name and size.' },
      { type: 'scene', shot: 'ledge-shelf-copy', title: 'Copying from the shelf', text: 'Copy or move straight from the shelf. Progress and Cancel show on the shelf, and the window you came from stays as it was.' },
      { type: 'note', text: 'The shelf shows the stack and little else. Actions sit behind one button, and anything advanced is in Settings.' },
      { type: 'scene', shot: 'ledge-watchers', title: 'Watched folders', text: 'Ledge also watches favourite folders and puts new files on a shelf as they arrive. Each folder shows its real state: watching, checking a share, waiting for a disk, or missing. A share that is offline is a normal state, not an error.' },
    ],
  },
  {
    app: 'spoke',
    headline: 'A radial menu for prompts.',
    problem: 'People who work with AI assistants all day type the same prompts over and over. Spoke lets them aim at a prompt instead.',
    decision: 'Press a key, move through the wheel, release. The text goes into whichever field has focus.',
    facts: [['Trigger', 'One key, release to insert'], ['Per ring', 'Up to 8 segments'], ['Routing', 'One wheel per app']],
    blocks: [
      { type: 'hero', shot: 'spoke-wheel' },
      { type: 'note', text: "Refactors in an editor and casual replies in a chat app need different prompts, so an app can have its own wheel. The frontmost app picks the wheel when you press the key." },
      { type: 'scene', shot: 'spoke-usage', title: 'Usage', text: 'Usage ranks entries by how often you use them, which shows what belongs on the wheel.' },
    ],
  },
  {
    app: 'habitat',
    headline: 'Home Assistant readings on the desktop.',
    problem: 'Home Assistant has the answer to most questions about the house, but you open a browser tab to get it. Habitat puts the answers on the desktop.',
    decision: 'The widget is the main thing. It shows the reading, and lights and switches toggle with a tap.',
    facts: [['Source', 'Home Assistant'], ['Widgets', '13 configurations'], ['Sizes', 'Small, medium, large']],
    blocks: [
      { type: 'hero', shot: 'habitat-energy' },
      { type: 'scene', shot: 'habitat-temperatures', title: 'Room colours', text: 'Each room keeps one colour on every chart, so you can tell the lines apart without reading the legend.' },
      { type: 'scene', shot: 'habitat-power', title: 'Power', text: 'Whole-house draw sits above the larger consumers, so a short spike like the oven is easy to see.' },
      { type: 'scene', shot: 'habitat-gauges', title: 'Gauges', text: 'Readings with a natural 0 to 100 range, such as humidity or battery level, are shown as rings.' },
      { type: 'scene', shot: 'habitat-air-quality', title: 'Air quality', text: 'Two readings, and only the one that needs attention is coloured.' },
    ],
  },
  {
    app: 'kinetip',
    headline: 'Settings for a pen tablet.',
    problem: 'A pen tablet is used all day and configured rarely. When it misbehaves, you want to know why before you touch a slider.',
    decision: 'The first screen says whether the tablet, permissions and mapping are working. After that, each change previews its effect, and Apply reloads the engine once.',
    facts: [['Changes', 'Apply or Revert'], ['Reload', 'Exactly once'], ['Hardware', 'Described by capability']],
    blocks: [
      { type: 'hero', shot: 'kinetip-overview' },
      { type: 'scene', shot: 'kinetip-gestures', title: 'Gestures', text: "Pen buttons and motions map to pointer, drag, pan and scroll. Settings are grouped by what you want to do, not by the tablet's report layout." },
      { type: 'scene', shot: 'kinetip-momentum', title: 'Momentum', text: 'Scroll inertia is drawn as a decay curve, so you can see what changing the friction does.' },
      { type: 'detail', detail: 'kinetip-momentum-curve', title: 'Reading the curve', text: 'The preview replays a flick using your current settings.', marks: [
        { x: 0.032, y: 0.397, text: 'Speed starts at the flick velocity and decays along the curve.' },
        { x: 0.705, y: 0.448, text: 'Below the fade threshold, the softened tail takes over.' },
        { x: 0.835, y: 0.766, text: 'The tail lets the coast settle instead of stopping abruptly.' },
      ] },
      { type: 'scene', shot: 'kinetip-mapping', title: 'Mapping', text: 'Pick the active area on the tablet and see where it lands on the screen before you apply it.' },
      { type: 'detail', detail: 'kinetip-mapping-area', title: 'Reading the map', text: 'Proportions are preserved, so a circle drawn on the tablet is a circle on screen.', marks: [
        { x: 0.499, y: 0.208, text: 'The target display and its resolution.' },
        { x: 0.499, y: 0.711, text: 'The mapped area: the part of the tablet that reaches the screen.' },
        { x: 0.669, y: 0.456, text: 'Drag a handle to resize. The numeric fields below do the same from the keyboard.' },
      ] },
      { type: 'scene', shot: 'kinetip-insights', title: 'Usage insights', text: 'A heatmap of pen activity across the tablet surface.' },
    ],
  },
  {
    app: 'evocontrol',
    headline: 'An audio interface mixer in the menu bar.',
    problem: 'Changing a level on the EVO 8 normally means opening the official app. Most changes should take a few seconds.',
    decision: 'Meter colours have fixed thresholds: amber from -18 dBFS and red from -6 dBFS, so a colour always means the same level.',
    facts: [['Interface', 'Audient EVO 8'], ['Panel', '300 pt, from the menu bar'], ['Meter', '32 segments per channel']],
    blocks: [
      { type: 'hero', shot: 'evocontrol-mixer' },
      { type: 'pair', light: 'evocontrol-mixer', dark: 'evocontrol-mixer-dark', title: 'Light and dark', text: "The layout is the same in both. Meter colours don't change." },
      { type: 'detail', detail: 'evocontrol-meter', title: 'Reading a meter', text: 'Two rows, one per channel, 32 segments each.', marks: [
        { x: 0.283, y: 0.727, text: 'Green: below -18 dBFS.' },
        { x: 0.54, y: 0.727, text: 'Amber from -18 dBFS.' },
        { x: 0.78, y: 0.727, text: 'Red from -6 dBFS.' },
        { x: 0.92, y: 0.727, text: 'The clip cell at 0 dBFS.' },
      ] },
      { type: 'scene', shot: 'evocontrol-preset', title: 'Saved preset', text: 'When the panel differs from the saved preset, Save and Revert appear next to it. Save writes the preset back; Revert returns to it.' },
      { type: 'scene', shot: 'evocontrol-settings', title: 'Channel groups', text: 'Outputs, inputs, playback and loopback are in one scrolling panel, and each group has its own meter toggles.' },
      { type: 'scene', shot: 'evocontrol-voice-eq', title: 'Voice processing', text: 'Gate, EQ, leveler, compressor and de-esser, each with a live curve or meter.' },
    ],
  },
];
