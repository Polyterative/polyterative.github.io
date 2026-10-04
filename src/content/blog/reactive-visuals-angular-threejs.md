---
title: "Reactive Visuals — Angular Meets Three.js"
description: "My visuals code got tangled once audio, OSC and UI controls all tried to drive it at once. Treating every input as a stream untangled it."
date: "2024-08-22"
tags: ["Creative Coding", "Three.js", "RxJS", "Angular", "OSC"]
---

Most creative coding tutorials run everything from a `requestAnimationFrame` callback. For a single sketch that's fine. My problem was that I wanted three things driving the visuals at the same time: audio from the room, <span class="caps">OSC</span> messages from my modular synth, and on-screen controls. Each one came with its own callbacks and timers, and soon I couldn't tell which one was moving what.

I was already using RxJS every day in Angular apps at work. So I tried something: what if **every input was a stream**?

## Everything is a stream

That idea is all [POLY_REACTIVE_VISUALS](https://reactive-visuals.vercel.app) is. Audio amplitude becomes an Observable, and a Three.js mesh subscribes to it:

```typescript
// Audio amplitude as an Observable
const amplitude$ = audioAnalyser$.pipe(
  map(analyser => getAmplitude(analyser)),
  distinctUntilChanged(),
  share()
);

// Three.js mesh property driven by audio
amplitude$.subscribe(amp => {
  mesh.scale.setScalar(1 + amp * 2);
});
```

Once audio worked like that, everything else followed. An OSC message from the synth is another stream. So is the mouse position, and so is beat detection. RxJS already has operators for combining them, like merge, combine and throttle. Three.js stays imperative, but those calls all sit inside `subscribe()`, so it's easy to see where each change comes from. Angular's dependency injection let me swap audio backends during development without touching any of the visual code.

## Plugging in the synth

On the hardware side, a small OSC server built with `node-osc` passes messages to the browser over a WebSocket. That's all it took for my Eurorack to control visual parameters. I turn a knob on the rack and something on screen moves less than 20 ms later.

I'd never played like that before. When the same knob changes both the sound and the picture, the visuals become part of the instrument, not a backdrop running behind it. *It changed how I perform.*

## Where it led

The repo is open. Fork it and connect your own inputs.

For me it was a first sketch. Once I'd played visuals from hardware, I wanted an engine built for that from day one, one that could carry a full live AV set. That became [Impulse](/blog/impulse-webgpu-generative-visual-engine).
