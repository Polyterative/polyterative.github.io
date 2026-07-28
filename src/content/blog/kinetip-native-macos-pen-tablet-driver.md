---
title: "Kinetip — Making a Pen Tablet Feel Native on macOS"
description: "I run my Mac with a pen tablet instead of a mouse. The vendor driver kept getting in the way, so I wrote my own. Here's the input path from tablet to screen, and what keeping a realtime driver alive taught me."
date: "2026-07-28"
tags: ["Kinetip", "macOS", "Swift", "Pen Tablet", "Tooling", "Accessibility"]
cover: "/blog/kinetip/app-overview.jpg"
---

I run my Mac with a pen tablet instead of a mouse or trackpad. All day, for everything: code, documents, windows, browsing. Not drawing. *Work.* A pen is kinder to my hand, and once absolute positioning rewires your brain, a mouse feels clumsy.

The problem is that macOS never really wanted me to work this way. The vendor driver buries everything in per-model jargon, scrolling is an afterthought, the pointer fights you when it's near a button, and it can quietly stop working after the machine sleeps. For a device I touch thousands of times a day, those interruptions add up.

So I wrote my own driver: [Kinetip](https://github.com/Polyterative/Kinetip). It turns pen input into pointer, drag, pan, and scroll-with-inertia on macOS, and after months of daily use it's more reliable than what came with the hardware.

## It started as a hack

The first version wasn't native at all. I wrote a small [OpenTabletDriver](https://github.com/OpenTabletDriver/OpenTabletDriver) plugin (hold a pen button, drag to scroll) to test whether pen-button scrolling was even usable. It was. It also made clear that the idea deserved better than a plugin sitting on top of a cross-platform stack.

I wanted something built around how macOS actually behaves, not a portability layer. Kinetip is that rewrite from scratch. Nothing carried over except the belief that a pen can be a real pointer on this platform.

## How a pen stroke becomes a scroll

Before the war stories, here's the shape of the system, because every decision after this falls out of it. I'll follow one contact from the tablet surface to the screen.

A USB report comes off the tablet and gets decoded into a `PenSample` in raw device counts. A small clock model, `DeviceScanClock`, maps the tablet's own scan-time counter onto the host's monotonic clock, because the two run on unrelated bases and drift apart. The sample is pushed through the active-area transform into screen coordinates, pressure and tilt are normalized, and it becomes a `PenEvent`.

From there it reaches the part I care about most: a deterministic gesture reducer, a plain state machine, that turns a stream of `PenEvent`s into `InjectionCommand`s (move, down, drag, scroll, momentum). Scroll commands run through an inertia simulator on a ticker, and an event sink synthesizes real `CGEvent`s and posts them to the window server.

One realtime thread owns that whole spine. It never allocates, never takes a lock, and never calls into accessibility or SwiftUI. Anything slow (asking the accessibility API what's under the pen, sampling a scroll view's position) runs on its own queue and hands back a small value snapshot the realtime thread reads when it's ready. That single constraint is why the driver stays smooth. It's also, as it turned out, where the two worst bugs lived.

<figure class="kt-diagram">
<svg viewBox="0 0 710 720" role="img" aria-labelledby="kt-diag-title" style="width:100%;height:auto;display:block">
  <title id="kt-diag-title">Kinetip input pipeline: tablet report through the realtime thread to a posted scroll event, with two off-thread probes feeding value snapshots back in.</title>
  <defs>
    <marker id="kt-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--color-muted)"/>
    </marker>
    <style>
      .kt-b{fill:var(--color-surface);stroke:var(--color-border);stroke-width:1.5}
      .kt-t{fill:var(--color-text);font:600 14px var(--font-sans, sans-serif)}
      .kt-s{fill:var(--color-muted);font:400 11.5px var(--font-sans, sans-serif)}
      .kt-d{fill:var(--domain-code, #14b8a6);font:500 11px var(--font-mono, monospace)}
      .kt-o{fill:var(--color-surface);stroke:var(--color-muted);stroke-width:1.3;stroke-dasharray:4 3}
      .kt-line{stroke:var(--color-muted);stroke-width:1.5;fill:none}
      .kt-dash{stroke:var(--domain-code, #14b8a6);stroke-width:1.4;fill:none;stroke-dasharray:4 3}
    </style>
  </defs>
  <!-- realtime band -->
  <rect x="64" y="166" width="372" height="456" rx="12" fill="var(--color-accent-soft)" stroke="var(--domain-code, #14b8a6)" stroke-width="1.2" stroke-dasharray="6 4"/>
  <text x="80" y="394" class="kt-d" text-anchor="middle" transform="rotate(-90 80 394)" style="letter-spacing:1px">REALTIME THREAD · ONE CFRUNLOOP · NO LOCKS · NO ALLOCATIONS</text>
  <!-- spine boxes -->
  <rect class="kt-b" x="150" y="10" width="200" height="40" rx="8"/>
  <text class="kt-t" x="250" y="35" text-anchor="middle">Pen tablet · USB / HID</text>
  <rect class="kt-b" x="90" y="74" width="320" height="62" rx="8"/>
  <text class="kt-t" x="250" y="100" text-anchor="middle">HID transport — seize device</text>
  <text class="kt-s" x="250" y="119" text-anchor="middle">reads raw reports off IOKit</text>
  <rect class="kt-b" x="90" y="178" width="320" height="62" rx="8"/>
  <text class="kt-t" x="250" y="204" text-anchor="middle">Decode + clock remap</text>
  <text class="kt-s" x="250" y="223" text-anchor="middle">DeviceScanClock maps device → host time</text>
  <rect class="kt-b" x="90" y="270" width="320" height="62" rx="8"/>
  <text class="kt-t" x="250" y="296" text-anchor="middle">Map to screen + normalize</text>
  <text class="kt-s" x="250" y="315" text-anchor="middle">active-area transform, pressure &amp; tilt</text>
  <rect class="kt-b" x="90" y="362" width="320" height="62" rx="8"/>
  <text class="kt-t" x="250" y="388" text-anchor="middle">Gesture reducer (state machine)</text>
  <text class="kt-s" x="250" y="407" text-anchor="middle">tap · drag · pan · scroll · momentum</text>
  <rect class="kt-b" x="90" y="454" width="320" height="62" rx="8"/>
  <text class="kt-t" x="250" y="480" text-anchor="middle">Inertia simulator</text>
  <text class="kt-s" x="250" y="499" text-anchor="middle">exponential decay, re-fling boost</text>
  <rect class="kt-b" x="90" y="546" width="320" height="62" rx="8"/>
  <text class="kt-t" x="250" y="572" text-anchor="middle">Event sink → CGEvent</text>
  <text class="kt-s" x="250" y="591" text-anchor="middle">posts to WindowServer via HID tap</text>
  <rect class="kt-b" x="90" y="638" width="320" height="62" rx="8"/>
  <text class="kt-t" x="250" y="664" text-anchor="middle">macOS · your app scrolls</text>
  <text class="kt-s" x="250" y="683" text-anchor="middle">native apps also see a real pen</text>
  <!-- spine arrows -->
  <line class="kt-line" x1="250" y1="50"  x2="250" y2="72"  marker-end="url(#kt-arrow)"/>
  <line class="kt-line" x1="250" y1="136" x2="250" y2="176" marker-end="url(#kt-arrow)"/>
  <line class="kt-line" x1="250" y1="240" x2="250" y2="268" marker-end="url(#kt-arrow)"/>
  <line class="kt-line" x1="250" y1="332" x2="250" y2="360" marker-end="url(#kt-arrow)"/>
  <line class="kt-line" x1="250" y1="424" x2="250" y2="452" marker-end="url(#kt-arrow)"/>
  <line class="kt-line" x1="250" y1="516" x2="250" y2="544" marker-end="url(#kt-arrow)"/>
  <line class="kt-line" x1="250" y1="608" x2="250" y2="636" marker-end="url(#kt-arrow)"/>
  <!-- data type labels -->
  <text class="kt-d" x="258" y="161" text-anchor="start">RawReport</text>
  <text class="kt-d" x="258" y="259" text-anchor="start">PenSample</text>
  <text class="kt-d" x="258" y="351" text-anchor="start">PenEvent</text>
  <text class="kt-d" x="258" y="443" text-anchor="start">InjectionCommand[]</text>
  <text class="kt-d" x="258" y="535" text-anchor="start">scroll + momentum</text>
  <text class="kt-d" x="258" y="627" text-anchor="start">CGEvent</text>
  <!-- off-thread boxes -->
  <rect class="kt-o" x="470" y="364" width="220" height="56" rx="8"/>
  <text class="kt-t" x="580" y="388" text-anchor="middle">Context probe</text>
  <text class="kt-s" x="580" y="406" text-anchor="middle">off-thread · 60 ms budget</text>
  <rect class="kt-o" x="470" y="456" width="220" height="56" rx="8"/>
  <text class="kt-t" x="580" y="480" text-anchor="middle">Scroll-offset sampler</text>
  <text class="kt-s" x="580" y="498" text-anchor="middle">off-thread · fails open</text>
  <!-- off-thread arrows (value snapshots) -->
  <path class="kt-dash" d="M470,392 L412,393" marker-end="url(#kt-arrow)"/>
  <path class="kt-dash" d="M470,484 L412,485" marker-end="url(#kt-arrow)"/>
  <text class="kt-d" x="440" y="356" text-anchor="middle">ContextClass</text>
  <text class="kt-d" x="440" y="474" text-anchor="middle">ScrollEdgeVerdict</text>
</svg>
<figcaption style="color:var(--color-muted);font-size:var(--font-size-sm);text-align:center;margin-top:var(--space-3)">The realtime spine (teal band) never blocks. Slow work runs on other queues and returns read-only value snapshots.</figcaption>
</figure>

## The one thing it has to get right

If Kinetip does a single thing well, it's **context-aware scrolling with inertia**.

<aside class="mind mind--code">
<span class="mind__tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 6 3 12 8 18"/><polyline points="16 6 21 12 16 18"/></svg>The engineer in me</span>
<p>I gave myself one non-negotiable rule and let the whole architecture bend around it: the realtime thread never waits for anything — no locks, no allocations, no polite little <code>await</code>. Every time I was tempted to "just check one thing" on that thread, I moved the check off it instead. Almost every design decision in Kinetip is downstream of that single act of stubbornness.</p>
</aside>

On pen-down, the off-thread prober hit-tests the point against the system-wide accessibility tree and walks up the parent chain looking for a scrollable ancestor (an `AXScrollArea`, an `AXWebArea`, a list or a table). It gets a 60 ms budget. If it can't answer in time, the gesture falls back to plain pointer behavior instead of stalling the pen. The answer comes back as a `ContextClass`, and the reducer branches on it: scrollable content turns pen movement into high-resolution scrolling with a momentum flick when you let go, the same *physical* feel as a trackpad; a button or a slider stays a pointer and won't drag the page out from under you.

That branch is the *whole* trick. You stop thinking about modes, because the tablet does the sensible thing based on where you are. Underneath, the pipeline stays honest about the hardware: pressure, tilt, eraser identity, and proximity are normalized and posted as real tablet events, so apps that understand a pen still see one.

<aside class="mind mind--design">
<span class="mind__tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>The designer in me</span>
<p>Modes are where interfaces go to betray you. A tool that behaves differently based on some invisible state you're supposed to remember will catch you out at the worst possible moment. So the goal was never "add a scroll mode" — it was to delete the question entirely. The pen should read the room. If I ever have to stop and <em>think</em> about which mode I'm in, the design has already failed.</p>
</aside>

![Gesture activation modes — "Context aware" reads what's under the pen, so content scrolls and buttons still click](/blog/kinetip/app-gestures.jpg)

## What keeping it alive taught me

The hard failures were never in the happy path. They lived in the seams — sleep, relaunch, a gesture that lands on the wrong window — and every one of them pushed back on the same architectural rule instead of asking for a clever patch.

The worst was a scroll that would die and *stay* dead until I reloaded the config. Clicks worked, selection worked; only scrolling was gone. Underneath, the engine was making a real-time decision against a clock that had quietly stopped advancing, so a timing gate that should open for a fraction of a second read as permanently shut. The fix wasn't a special case — it was teaching the engine to rebuild its timing assumptions whenever the device goes quiet and comes back. The lesson outlasted the bug: on the realtime path, anything that *can* go stale eventually will, and the design has to assume it rather than trust it.

A second failure hid behind that one and made the architecture's case better than any diagram could. A background probe occasionally hit-tested Kinetip's *own* window and froze the whole engine by re-entering the UI layer from the wrong thread. That is the entire reason for the "realtime thread never touches the UI" rule, demonstrated in a single freeze. The safe version bails the instant a point is over one of our own windows, before any slow call — and there's a test named after the lesson so I can't quietly lose it again.

<aside class="mind mind--code">
<span class="mind__tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 6 3 12 8 18"/><polyline points="16 6 21 12 16 18"/></svg>The engineer in me</span>
<p>Both of those bugs had the same shape once I stopped staring at symptoms: something the realtime thread depended on had gone quiet or slow, and the thread trusted it anyway. So my rule hardened into something almost superstitious — the realtime path may never <em>wait</em>, and it may never <em>assume</em>. Everything it reads from the outside world is a snapshot that's allowed to be missing, and the honest answer to "I don't know yet" is to keep the pen moving, not to stall it. A driver that freezes when it's unsure is worse than one that guesses.</p>
</aside>

### The fling that fought the rubber band

Flick to the bottom of a page and macOS rubber-bands. Kinetip used to keep shoving momentum into the wall, still ticking away against a page that wasn't moving. The fix runs *off* the realtime path: a sampler reads the scroll position at a bounded cadence and reports whether the content is still advancing, pinned at an edge, or unknown. Pinned ends the coast; unknown keeps it going. It fails open by design — no reading, keep scrolling — for the same reason as everything else here: the pen should never pay for the driver's uncertainty.

### Inertia you can pump

Momentum should feel like a phone. Flick a few times in the same direction and the scroll should build. So the inertia model runs an exponential decay with an eased tail, and a new flick in the same direction adds its velocity to whatever is still coasting, clamped to a cap you set and ramped in over a few frames so it never jumps. There's opt-in smoothing for the first fling too, but I kept it gated: the one thing I was never willing to trade was the crispness of a *direct drag*. Latency to feel smoother is a bad deal.

![The Momentum panel graphs the release curve in real time, so you can see how far a flick coasts before it settles](/blog/kinetip/app-momentum.jpg)

## Features that came out of my own annoyance

I'm the user, so the feature list is mostly a record of things that bothered me.

Kinetip can mute its sound feedback during calls. Instead of special-casing one app, it watches for anything using the microphone, so my click and scroll ticks never leak into a meeting. The pen keeps working normally the whole time — only the audio cues go quiet. It's one toggle.

It also keeps anonymized usage insights: a coarse heatmap of where the pen spends its time on screen, plus dwell, preferred tilt, and click and scroll hotspots, over today, the last week, or the last month. It aggregates onto a grid; no strokes or exact paths are stored.

And it has optional sound feedback, fully synthesized with no audio files, for clicks, drags, and scrolling. Active scrolling and momentum coasting are driven by a *detent* model, so the ticks line up with the motion instead of drifting off it.

<aside class="mind mind--design">
<span class="mind__tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>The designer in me</span>
<p>Kinetip has an absurd number of things you <em>could</em> tune. Years on modular Eurorack taught me exactly how that story ends: expose every raw parameter and you don't get power, you get a wall of numbers nobody can navigate. So I spent as much care on the boundaries as on the controls — ranges where every position is actually usable, named presets instead of naked values (you pick <em>Wood</em>, not a decay coefficient), and defaults that already feel right out of the box. The goal is maximum control without ever making you do math to get there.</p>
</aside>

<div class="post-gallery">
  <figure>
    <img src="/blog/kinetip/app-insights.jpg" alt="Usage Insights heatmap showing where the pen actually spends its time on the tablet surface" />
    <figcaption>Usage Insights: a coarse heatmap of where the pen actually lives. No strokes or exact paths are stored.</figcaption>
  </figure>
  <figure>
    <img src="/blog/kinetip/app-sound.jpg" alt="Sound panel with synthesized material presets: Aluminum, Wood, and Silicon" />
    <figcaption>Sound feedback, fully synthesized. Pick a material; the timing never changes.</figcaption>
  </figure>
  <figure>
    <img src="/blog/kinetip/app-gestures.jpg" alt="Gestures panel mapping pen buttons and motions to pointer, drag, pan, and scroll actions" />
    <figcaption>Gestures: what each pen button and motion maps to, driven by the deterministic reducer.</figcaption>
  </figure>
  <figure>
    <img src="/blog/kinetip/app-momentum.jpg" alt="Momentum panel tuning scroll inertia, friction, and detent behavior" />
    <figcaption>Momentum: inertia, friction, and detents tuned so scrolling settles instead of grinding.</figcaption>
  </figure>
</div>

## A diagnostics page, not a status light

Most vendor utilities give you one green dot and call it a day. Kinetip has a Diagnostics tab that lays the whole pipeline out at once: whether the engine is running live, how many reports came in raw versus decoded versus ignored, the active tablet surface, and separate checks for the three permissions it actually needs — Input, Context, and Posting. Under that it pins the boring facts that make a bug report useful: config file, schema version, build, macOS, connected displays, an on-demand latency snapshot, and a recent log. When the pen misbehaves I don't guess — I open this page, see which stage went quiet, and if I do have to ask for help, the whole screen *is* the report.

![Diagnostics: engine state, live report traffic, granted permissions, and a recent log — everything you'd need to file a good bug report](/blog/kinetip/app-diagnostics.jpg)

## Fast on the small chips

I did an optimization pass aimed at the base Apple Silicon machines (M1 through M4, non-Pro). One rule drove all of it: the realtime callback only ever gets lighter. It does normalization, gesture reduction, and posting with no allocations, no locks, and no accessibility or UI calls. Multicore is allowed to help, but only off that path. Telemetry, context probes, and scroll sampling all live on other queues and feed back read-only snapshots. A pen driver that adds latency to look optimized has missed the point of existing.

<aside class="mind mind--code">
<span class="mind__tag"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 6 3 12 8 18"/><polyline points="16 6 21 12 16 18"/></svg>The engineer in me</span>
<p>Latency was the whole point, so I treated it as the one budget I was never allowed to overspend. That meant respecting the hardware underneath — work sized for the base chips — and timing motion to the display itself. I care an unreasonable amount about the refresh: a scroll frame that lands a beat early or late reads as jank even when the numbers are perfect, so the pipeline tries to put each update on the right frame for whatever panel you're on, 60 Hz or 120. Only once the latency was honest did I allow a thin layer of smoothing on top, purely for the ergonomics. Never the other way around — nothing in Kinetip gets to feel smoother by feeling slower.</p>
</aside>

## About the "vibecoded" part

I'll be upfront: Kinetip was largely vibecoded, built fast and iteratively with heavy AI assistance. I'm not hiding that, and I'm also not making it the story. The tooling that produced the code isn't the interesting part. What's interesting is that the code solves a real, daily, physical problem I have. AI is what made it feasible for one person to ship a native driver with over 800 tests across 99 suites, plus fuzzers that throw 100,000+ mutated inputs at the gesture reducer and the HID parser on every run. Whether it's a good tool gets decided by my hand on the pen, not by how the commits happened.

## Where it landed

I use Kinetip every day, for hours. The interruptions that used to break my focus are gone, or have become boring: it comes back after sleep, scroll doesn't die, the pointer stops fighting me near buttons, and momentum settles at the end of a page instead of grinding into it. Most of the time the pen just behaves like part of the Mac. When it doesn't, I own a driver whose failure modes I can read in a log and fix. That's the part the box driver never gave me.

## Want to try it?

I'm weighing a commercial release for Kinetip. For now, if you want to test it, [email me](mailto:polyterative@outlook.com). Working from a Wacom pen all day is genuinely comfortable — I know there aren't many of us doing it, but I think this could be useful to a lot more people than currently realize it's an option.
