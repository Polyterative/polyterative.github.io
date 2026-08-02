---
title: "Impulse Dev Diary — Entity Pools, Dead Threads, and 3am Cascade Failures"
description: "Building a live WebGPU visual engine night by night. What the architecture decisions actually cost, and what they bought."
date: "2026-03-29"
tags: ["WebGPU", "Three.js", "TypeScript", "Creative Coding", "Live Performance", "Dev Diary"]
---

At 03:14 on a Tuesday in late March, my screenshot tagger logged this:

```
dying_state entity_pool spawning_logic cascading_errors
```

That's four tags extracted from a screen that was not going well. The entity world was collapsing — spawned entities refusing to die cleanly, the pool leaking references, new spawns triggering errors in the dying pipeline, the whole thing unraveling in a cascade that made the renderer freeze at exactly the moment I needed to test something else.

This is what building [Impulse](/apps/impulse) looks like on the inside.

## What Impulse is trying to do

The goal is a visual engine built specifically for live AV performance — something I can wire to my modular synthesizer via OSC, drive with MIDI from a controller, and run at 4K/60fps on a venue screen while performing. The output should also be distributable as a web gallery where recorded performances play back deterministically.

The design constraint I set myself early: **the signal philosophy should be identical to Eurorack**. In modular synthesis, there is no fundamental difference between an audio signal, a control voltage, a gate, a trigger, or a clock. They are all the same thing: a number changing over time, passing through a wire. Impulse is built on this principle. Every node output is a number. Every node input accepts a number. No type enforcement at the wire level. You can patch anything into anything.

This is either elegant or reckless depending on the day.

## The three-thread architecture

The hardest early decision was threading. The browser's main thread cannot be trusted with anything performance-critical — garbage collection pauses, DOM events, and layout thrashing will drop frames at the worst moments. So the system runs on three threads:

```
Main Thread        — UI, OSC, audio analysis, MIDI input
Graph Worker       — node evaluation, ~16ms tick interval
Renderer Worker    — Three.js r174, WebGPU, OffscreenCanvas
```

The graph worker runs a synchronous O(N) evaluation sweep every tick. Nodes are topologically sorted using Kahn's algorithm at load time, so evaluation always proceeds in dependency order with no wasted work. The worker sends world state to the renderer via MessageChannel — not through the main thread, which would add a relay hop and destroy the latency budget.

The renderer worker runs Three.js entirely on an OffscreenCanvas. On macOS this maps directly to Metal via the WebGPU adapter. Shaders are written in TSL (Three.js Shading Language) — actual TypeScript instead of GLSL strings — which means the AI agents I use during development can read, modify, and reason about shader code as naturally as any other TypeScript. This was not an accident.

The 4K/60fps budget is non-negotiable. That means no per-tick allocations, no async chains in the hot path, no unbounded loops. Entity spawn/destroy uses pooled memory. Every constraint exists because I need this to hold up during a live set when I cannot touch a keyboard.

## The entity problem that broke at 3am

The entity world is the simulation layer between the node graph and the renderer. Nodes emit events — spawn an entity, modify a property, destroy an entity. The world maintains a pool of entity objects, assigns them to events, updates their state each tick (position, velocity, lifetime, color), and passes the living set to the renderer.

The problem was in the dying pipeline. When an entity's lifetime expired, it was supposed to return cleanly to the pool. Instead, under certain spawn rate conditions, the dying logic was reading from the pool mid-cycle, the pool was giving out entities that were still completing their death transition, the new spawning logic was initializing those entities before the death cleanup finished, and the renderer was receiving inconsistent state.

The cascade happened because none of these components failed loudly. They all continued running, processing subtly wrong data, and the visible output was a freeze rather than a crash — which made it harder to locate.

The fix was boring in the way that most real fixes are: enforce a strict phase separation within each tick. Death cleanup runs first, returns entities to pool, marks pool clean. Only then does spawn logic pull from the pool. The renderer only reads after both phases complete. The order was always implied; I made it explicit and the problem stopped.

206 tests across 19 files now cover the entity lifecycle, graph evaluation, clock synchronization, and hot-reload behavior. The tests didn't catch this one — it was a timing issue that only surfaced at specific spawn rates. But they've caught many others.

## Sessions as JSON, committed to the repo

One of the better architectural decisions: a "session" (a complete node graph configuration) is just a `NodeDefinition[]` JSON array validated against a Zod schema. The same schema validates bundled sessions shipped with the code and user-exported sessions downloaded from the UI.

This means a patch I build during rehearsal, export as JSON, and copy into `src/engine/graph/sessions/` becomes a committed, version-controlled session available in every future run. There is no separate patch format, no proprietary save file. The graph is the data and the data is the source.

⌘S saves to localStorage. The download button exports to a file. Import validates through the same schema before touching application state. Nothing external is trusted before validation.

## Where it is now

Phases 0, 1, and 2.5 are complete. Phase 2 (the node graph editor and entity world) is in active development.

The current node library has around 20 nodes: timing primitives (Clock, Pulse, LFO, Sequencer, Divider, Randomizer), math transformations (Add, Multiply, Remap, Quantize, SampleHold), and renderer nodes (Spawner, Camera, Field, Fog, PostProcessing, Choreographer). Small but sufficient for the first performances I'm planning.

What's next: feedback loops — Z⁻¹ back-edges in the graph that let a node's output feed back into an earlier node with a one-tick delay. This is the modular equivalent of patching an output back to a CV input, and it opens up a much larger space of emergent behavior. Then hot-parameter tweaking without reloading the graph, which is the live performance feature I need most — changing a parameter mid-set without destroying the entity world.

The 3am cascade is fixed. The screenshots from a week later are tagged `impulse node_graph 3d_graphics realtime`. Progress is non-linear but it compounds.

For an overview of Impulse's goals and architecture, start with [the intro post](/blog/impulse-webgpu-generative-visual-engine). For the live performance context Impulse is built for, see [The Live AV Pipeline](/blog/live-av-performance-pipeline).
