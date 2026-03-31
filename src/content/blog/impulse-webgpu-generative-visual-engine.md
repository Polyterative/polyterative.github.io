---
title: "Impulse — A Visual Engine Built for Live Performance (and AI)"
description: "I do audiovisual performances. TouchDesigner taught me the concepts; its own UI convinced me to build something better."
date: "2026-03-10"
tags: ["WebGPU", "Three.js", "Creative Coding", "MIDI", "Web Audio", "TypeScript", "Live Performance"]
---

I do audiovisual performances — live sets where sound and visuals are generated and modulated together in real time. For this kind of work, TouchDesigner is the standard tool. It's powerful, it has a huge ecosystem, and a lot of brilliant people use it. I also find it genuinely painful to use.

The UI is dense to the point of being hostile. Everything lives in a proprietary binary format that's opaque to version control and impossible to work on with AI agents. And that last part matters to me now: I build almost nothing without an AI coding assistant in the loop, and if a codebase is effectively closed to that accelerator, I feel the drag immediately.

So I learned what I needed from TouchDesigner — the node-based signal flow model, the idea of separating input sources from processing from rendering — and then I built Impulse on a stack where everything is just TypeScript and the structure is transparent.

## Why the browser, not a native app

TouchDesigner is a native application. Most node-based AV tools are. I chose the browser deliberately.

The practical reason is distribution. A browser-based engine runs on any machine with Chrome — no installer, no driver version mismatches, no "does this work on the venue's laptop" moment right before a show. You open a URL.

The less obvious reason is AI agent compatibility. A TypeScript codebase in plain files — nodes as functions, graph state as JSON, shaders as TSL — is something an AI assistant can read, reason about, and modify without friction. I can describe a new node type in natural language and have a working implementation in seconds. That's a qualitatively different development speed than a tool that stores its patches in a proprietary binary format. If a codebase is opaque to the tools I use to build everything else, I feel that drag every session.

## The architecture

Four layers, strict top-down data flow, no feedback loops between them:

```
Signal Layer  →  Node Graph  →  Entity World  →  Render Layer
(MIDI/Audio)     (events)        (simulation)     (WebGPU worker)
```

**Signal Layer** — Raw input. MIDI events from a controller, amplitude from the microphone, arbitrary values from the UI. Each becomes a named stream the rest of the system subscribes to.

**Node Graph** — The user-facing part. A visual graph where you wire nodes together: "map MIDI CC 74 to float 0–1", "smooth with 200ms attack", "spawn an entity when this crosses 0.5". Nodes are pure transformations — no side effects, no hidden state.

**Entity World** — A simulation layer. Entities have position, velocity, lifetime, color. Nodes create, modify, or destroy them. The world ticks at a fixed rate, independent of frame rate.

**Render Layer** — Runs in a WebGPU worker. Reads entity state and draws. Fully decoupled — if rendering drops frames, the simulation keeps going.

## TSL instead of GLSL

Three.js r174 ships TSL (Three.js Shading Language) as the default shader system for WebGPU. Instead of writing GLSL strings, you write TypeScript:

```typescript
import { vec3, mix, uv } from 'three/tsl';

const gradient = mix(
  vec3(0.1, 0.0, 0.2),
  vec3(1.0, 0.5, 0.0),
  uv().y
);
```

Type checking, autocomplete, composable functions. Shader logic that used to live in template-substituted `.glsl` files now lives in the same codebase as everything else, and an AI assistant can touch it without context-switching into a different mental model.

## MIDI and Web Audio

The Web MIDI API is more capable than its reputation suggests. Impulse connects to any MIDI device the browser sees, maps channels and CCs to named signals, and makes them available as node inputs. Web Audio handles the audio side — FFT, amplitude, beat detection. Both feed the same signal layer, so you can drive a visual parameter from a hardware knob, a kick drum, or both at once.

## Current state

Impulse is work in progress. The architecture is solid and the rendering pipeline works. The node editor is functional but the node library is still small — I'm building the most useful primitives first, guided by what I actually need for upcoming performances.

One hard requirement: Chromium with WebGPU enabled. On macOS, the renderer uses Metal via the `apple/metal-*` adapter — verify this is active in DevTools if something looks off. Firefox doesn't have WebGPU in stable builds yet.

I'll write more as it develops. The genuinely hard problems are in the node graph execution model — specifically, making mid-performance patch edits feel instant rather than causing a visual stutter. That's the one thing TouchDesigner actually gets right.
