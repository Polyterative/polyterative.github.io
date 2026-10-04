---
title: "Impulse — A Visual Engine Built for Live Performance (and AI)"
description: "I perform audiovisual sets. TouchDesigner taught me how visual engines work, and its interface convinced me to build my own."
date: "2026-03-10"
tags: ["WebGPU", "Three.js", "Creative Coding", "MIDI", "Web Audio", "TypeScript", "Live Performance"]
---

I perform audiovisual sets, where sound and visuals are generated and played together in real time. For that kind of work **TouchDesigner** is the standard tool. It's powerful, it has a huge community, and a lot of brilliant people use it. I also find it painful to use.

The interface is so dense that it feels hostile. Projects live in a proprietary binary format that version control can't read and AI agents can't touch. That last part matters to me. I build almost everything with an AI coding assistant now, and when a project is closed to it, I feel the slowdown in every session.

So I took what TouchDesigner taught me and left the rest. What I kept was the node-based signal flow and the separation of inputs, processing and rendering. Then I built Impulse on a stack that's TypeScript all the way through, where every part is a plain file you can read.

## Why the browser

TouchDesigner is a native app, and so are most node-based AV tools. I chose the browser on purpose, for two reasons.

The first is distribution. A browser engine runs on any machine with Chrome. There's no installer and no driver mismatch, and no panic five minutes before a show wondering *"will this run on the venue's laptop?"* You open a URL.

The second is working with AI. Nodes are plain functions, graph state is `JSON` and shaders are `TSL`, so an assistant can read the code, reason about it and change it without any friction. I can describe a new node type in a sentence and have a working version seconds later. That's a completely different pace from a tool that saves your work as a binary blob.

## How it's built

There are four layers, and data only flows from top to bottom:

```
Signal Layer  →  Node Graph  →  Entity World  →  Render Layer
(MIDI/Audio)     (events)        (simulation)     (WebGPU worker)
```

The signal layer is raw input. MIDI from a controller, the microphone level, values from the UI. Each one becomes a named stream that the rest of the system can subscribe to.

The node graph is the part you play with. You wire nodes together: "map MIDI CC 74 to 0–1", "smooth with a 200 ms attack", "spawn an entity when this crosses 0.5". Nodes are pure transformations with no hidden state.

The entity world is a simulation. Entities have a position, velocity, lifetime and colour, and nodes create, change or destroy them. The world ticks at a fixed rate that doesn't depend on the frame rate.

The render layer runs in a WebGPU worker. It reads entity state and draws it. Because it's separate, the simulation keeps going even if rendering drops a frame.

## Shaders in TypeScript

Three.js r174 uses TSL (Three.js Shading Language) as the default shader system for WebGPU. Instead of writing GLSL in strings, you write TypeScript:

```typescript
import { vec3, mix, uv } from 'three/tsl';

const gradient = mix(
  vec3(0.1, 0.0, 0.2),
  vec3(1.0, 0.5, 0.0),
  uv().y
);
```

That gets you type checking, autocomplete and functions you can compose. Shader code lives in the same codebase as everything else, and the assistant can work on it without switching to another language.

## Knobs and kick drums

The Web MIDI API is more capable than people give it credit for. Impulse connects to any MIDI device the browser can see, maps channels and CCs to named signals, and makes them available as node inputs. Web Audio handles the sound side: FFT, amplitude and beat detection. Both feed the same signal layer, so you can drive a visual parameter from a hardware knob, a kick drum, or both.

## Where it is

Impulse is a work in progress. The architecture holds up and the rendering pipeline works. The node editor works too, but there aren't many nodes yet. I'm building the most useful ones first, based on what my upcoming performances need.

You need a Chromium browser with WebGPU enabled. On macOS the renderer uses Metal through the `apple/metal-*` adapter, so check DevTools if something looks off. Firefox doesn't support WebGPU in stable builds yet.

The hardest problem ahead is in how the graph runs: editing a patch in the middle of a set has to feel instant, with no visual stutter. That's the one thing TouchDesigner really does get right, and it's the bar I'm aiming for.

Not every night of building this has gone well. One of the worse ones is in the [Impulse dev diary](/blog/impulse-dev-diary-entity-pools). The performances it's built for are described in [The Live AV Pipeline](/blog/live-av-performance-pipeline), and the earlier experiment it grew out of is [Reactive Visuals](/blog/reactive-visuals-angular-threejs).
