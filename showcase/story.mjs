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
  headline: 'Small tools for the edges of the Mac.',
  lead: 'Five native apps that live where the work already is: under the pointer, in the menu bar, on the desktop. Each screen is rendered from the real interface by the app’s own test suite, filled with demo content instead of my files, rooms or messages.',
};

export const chapters = [
  {
    app: 'ledge',
    headline: 'A shelf that exists only while you need it.',
    problem: 'Moving files between folders, disks and network shares usually means arranging windows first. Ledge gives dragged files somewhere to wait.',
    decision: 'Nothing is on screen until you shake the pointer mid-drag. Then a shelf is under your hand, and your app stays in front.',
    facts: [['Opens with', 'Shake or a held key'], ['Focus', 'Never taken'], ['Watches', 'Folders, shares, disks']],
    blocks: [
      { type: 'hero', shot: 'ledge-shelf-images' },
      { type: 'scene', shot: 'ledge-shelf-expanded', title: 'References, not copies', text: 'A shelf points at files where they are. Nothing is duplicated until you copy it, and the stack opens to show every name and size.' },
      { type: 'scene', shot: 'ledge-shelf-copy', title: 'Work without leaving', text: 'Copy or move straight from the shelf. Progress and Cancel appear on the shelf itself, and the window you came from is untouched.' },
      { type: 'note', text: 'The shelf shows the stack and very little else. Actions sit behind one button; anything advanced lives in Settings.' },
      { type: 'scene', shot: 'ledge-watchers', title: 'Watching is honest', text: 'Every watched folder says what it is really doing: watching, checking a share, waiting for a disk, or missing. A disconnected share is a normal state, not an error.' },
    ],
  },
  {
    app: 'spoke',
    headline: 'A menu you aim, not browse.',
    problem: 'People who talk to AI assistants all day retype the same prompts. The typing is the waste.',
    decision: 'Press a key, sweep through a small decision tree, release. The text lands in whichever field already has focus.',
    facts: [['Trigger', 'One key, release to insert'], ['Per ring', 'Up to 8 segments'], ['Routing', 'One wheel per app']],
    blocks: [
      { type: 'hero', shot: 'spoke-wheel' },
      { type: 'note', text: 'Different apps call for different vocabulary: refactors in an editor, casual replies in a chat client. App groups map an app to a named wheel, and the frontmost app picks its wheel at the moment you trigger. No mode switch.' },
      { type: 'scene', shot: 'spoke-usage', title: 'See what you actually use', text: 'Usage ranks entries by how often you reach for them, so the wheel can stay small and right-sized.' },
    ],
  },
  {
    app: 'habitat',
    headline: 'The widget is the product.',
    problem: 'Home Assistant knows everything about the house, but you have to open it to find out. Habitat puts the answers on the desktop.',
    decision: 'Glance first, tap second. A widget shows the reading you would otherwise go and look for; lights and switches toggle in place.',
    facts: [['Source', 'Home Assistant'], ['Widgets', '13 configurations'], ['Sizes', 'Small, medium, large']],
    blocks: [
      { type: 'hero', shot: 'habitat-energy' },
      { type: 'scene', shot: 'habitat-temperatures', title: 'One colour per room', text: 'Each room keeps its own colour across every chart, so a line is recognisable before you read the legend.' },
      { type: 'scene', shot: 'habitat-power', title: 'Spikes you can spot', text: 'Whole-house draw sits above the big consumers. A short, tall spike like the oven is hard to miss.' },
      { type: 'scene', shot: 'habitat-gauges', title: 'Bounded readings as rings', text: 'Anything with a natural 0 to 100 range, such as humidity or battery level, reads as a ring.' },
      { type: 'scene', shot: 'habitat-air-quality', title: 'Quiet until it matters', text: 'Two readings, one flagged. Colour appears only on the reading that needs you.' },
    ],
  },
  {
    app: 'kinetip',
    headline: 'Health first, then feel.',
    problem: 'A pen tablet is something you depend on all day and configure rarely. When it misbehaves, you need to know why before you touch a slider.',
    decision: 'The first screen says whether everything works. After that, every adjustment previews its effect before you commit, and Apply reloads the engine exactly once.',
    facts: [['Changes', 'Apply or Revert'], ['Reload', 'Exactly once'], ['Hardware', 'Described by capability']],
    blocks: [
      { type: 'hero', shot: 'kinetip-overview' },
      { type: 'scene', shot: 'kinetip-gestures', title: 'Organised by intent', text: 'Pen buttons and motions are mapped to pointer, drag, pan and scroll. The settings follow what you want to do, not the tablet’s report layout.' },
      { type: 'scene', shot: 'kinetip-momentum', title: 'Feel you can see', text: 'Scroll inertia is drawn as a decay curve, so tuning friction is a matter of watching the shape change.' },
      { type: 'detail', detail: 'kinetip-momentum-curve', title: 'Reading the curve', text: 'The preview replays a flick with the numbers you have chosen.', marks: [
        { x: 0.032, y: 0.397, text: 'Speed starts at the flick velocity and decays along the curve.' },
        { x: 0.705, y: 0.448, text: 'Once speed drops below the fade threshold, the softened tail takes over.' },
        { x: 0.835, y: 0.766, text: 'The tail settles the coast instead of cutting it off.' },
      ] },
      { type: 'scene', shot: 'kinetip-mapping', title: 'Where the tablet lands', text: 'Choose the active area on the tablet and see where it falls on screen before you apply it.' },
      { type: 'detail', detail: 'kinetip-mapping-area', title: 'Reading the map', text: 'Aspect ratio is kept, so a circle drawn on the tablet is a circle on screen.', marks: [
        { x: 0.499, y: 0.208, text: 'The target display and its resolution.' },
        { x: 0.499, y: 0.711, text: 'The mapped area: the part of the tablet that reaches the screen.' },
        { x: 0.669, y: 0.456, text: 'Drag a handle to resize. Numeric fields below do the same from the keyboard.' },
      ] },
      { type: 'scene', shot: 'kinetip-insights', title: 'Where the pen spends its time', text: 'A heatmap of pen activity across the tablet surface shows which part of it you actually use.' },
    ],
  },
  {
    app: 'evocontrol',
    headline: 'A mixer you read at a glance.',
    problem: 'Changing a level on the interface means opening a vendor app and giving it a window. Most changes should take seconds.',
    decision: 'The meters are the interface. Thresholds are fixed, so a colour always means the same level: amber from -18 dBFS, red from -6.',
    facts: [['Interface', 'Audient EVO 8'], ['Panel', '300 pt, from the menu bar'], ['Meter', '32 segments per channel']],
    blocks: [
      { type: 'hero', shot: 'evocontrol-mixer' },
      { type: 'pair', light: 'evocontrol-mixer', dark: 'evocontrol-mixer-dark', title: 'Light and dark', text: 'One layout in both appearances. The meter colours stay the same, because they carry meaning.' },
      { type: 'detail', detail: 'evocontrol-meter', title: 'Reading a meter', text: 'Two rows, one per channel, 32 segments each. The thresholds never move.', marks: [
        { x: 0.283, y: 0.727, text: 'Green: below -18 dBFS.' },
        { x: 0.54, y: 0.727, text: 'Amber from -18 dBFS.' },
        { x: 0.78, y: 0.727, text: 'Red from -6 dBFS.' },
        { x: 0.92, y: 0.727, text: 'The clip cell at 0 dBFS.' },
      ] },
      { type: 'scene', shot: 'evocontrol-preset', title: 'Know when you have drifted', text: 'When the panel differs from the saved preset, Save and Revert appear beside it. Save writes back; Revert returns to the preset.' },
      { type: 'scene', shot: 'evocontrol-settings', title: 'Every channel group', text: 'Outputs, inputs, playback and loopback sit in one scrolling panel, with meter visibility chosen per group.' },
      { type: 'scene', shot: 'evocontrol-voice-eq', title: 'A voice chain for calls', text: 'Gate, EQ, leveler, compressor and de-esser, each with a live curve or meter so you can see what it is doing.' },
    ],
  },
];
