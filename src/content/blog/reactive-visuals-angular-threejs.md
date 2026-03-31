---
title: "Reactive Visuals — Angular Meets Three.js"
description: "How RxJS makes real-time generative visuals more composable and easier to reason about."
date: "2024-08-22"
tags: ["Creative Coding", "Three.js", "RxJS", "Angular", "OSC"]
---

Most creative coding tutorials use `setInterval` or `requestAnimationFrame` callbacks directly. That works for demos. It doesn't scale when you add audio reactivity, OSC input from a modular synth, and UI controls simultaneously.

RxJS solves this cleanly.

## The Architecture

The idea behind [POLY_REACTIVE_VISUALS](https://reactive-visuals.vercel.app) is simple: treat every input as a stream.

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

When your synth sends an OSC message, that's another stream. Mouse position? Stream. Beat detection? Stream. Merge, combine, throttle — the vocabulary is already there.

## OSC Integration

Running a local OSC server with `node-osc` and bridging to the browser via WebSocket lets my Eurorack setup directly modulate visual parameters. Moving a physical knob moves something on screen in real time, sub-20ms latency.

The feedback loop between physical hardware and generative software is something I hadn't experienced before. It changes how you perform.

## Takeaways

- **Observables compose better than callbacks** at this level of complexity
- Three.js's imperative API integrates cleanly inside `subscribe()` handlers
- Angular's DI makes swapping audio backends trivial during development

The repo is open. Fork it, wire it to your own inputs.

This scaffold eventually pushed me toward something more ambitious — a full node-based visual engine built on WebGPU, designed for live AV performance. That project is [Impulse](/blog/impulse-webgpu-generative-visual-engine).
