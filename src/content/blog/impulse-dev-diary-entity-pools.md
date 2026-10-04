---
title: "Impulse Dev Diary — Entity Pools, Dead Threads, and 3am Cascade Failures"
description: "One bad night building a live WebGPU visual engine: how a freeze in the entity pool happened, why it was so hard to find, and the boring fix that solved it."
date: "2026-03-29"
tags: ["WebGPU", "Three.js", "TypeScript", "Creative Coding", "Live Performance", "Dev Diary"]
---

At 03:14 on a Tuesday in late March, my screenshot tagger saved a screenshot with these four tags:

```
dying_state entity_pool spawning_logic cascading_errors
```

That pretty much sums up the night. Entities in [Impulse](/apps/impulse) were refusing to die cleanly, the pool was leaking references, new spawns were tripping over the dying ones, and every few seconds the renderer froze, right when I was trying to test something else.

This is the story of that bug, and what it says about building this engine.

## What I'm building

Impulse is a visual engine for live AV performance. I want to drive it from my modular synth over <span class="caps">OSC</span>, play it with a MIDI controller, and run it at 4K/60fps on a venue screen while I perform. Later, recorded performances should also play back exactly the same way in a web gallery.

Early on I decided Impulse should treat signals the way Eurorack does. In a modular synth there's no real difference between audio, a control voltage, a gate, a trigger or a clock. They're all a number changing over time, travelling down a cable. So in Impulse every node output is a number, every input accepts a number, and you can patch anything into anything.

*Some days that feels elegant. Some days it feels reckless.*

## Three threads, and why

The first hard decision was threading. You can't trust the browser's main thread with anything time-critical. Garbage collection, DOM events and layout work will all drop frames at the worst moment. So Impulse runs on three threads:

```
Main Thread        — UI, OSC, audio analysis, MIDI input
Graph Worker       — node evaluation, ~16ms tick interval
Renderer Worker    — Three.js r174, WebGPU, OffscreenCanvas
```

Every tick, the graph worker evaluates all the nodes in one pass. When a session loads, the nodes are sorted with Kahn's algorithm so they always run in dependency order and nothing is wasted. The worker sends the world state straight to the renderer over a `MessageChannel`. Going through the main thread would add an extra hop and blow the latency budget.

The renderer draws with Three.js onto an OffscreenCanvas. On macOS that goes through WebGPU to Metal. Shaders are written in TSL, which is TypeScript, not GLSL in strings. I did that on purpose: the AI agents I build with can read and change shaders like any other code.

The **4K/60fps budget** isn't negotiable. That rules out allocating memory every tick, async chains in the hot path and loops without a bound. Entities come from a pre-allocated pool instead of being created and thrown away. Every one of these rules exists because the engine has to survive a live set where I can't reach for the keyboard.

## The night it broke

The entity world sits between the node graph and the renderer. Nodes emit events like spawn, modify and destroy. The world takes entities from its pool, updates them every tick (position, velocity, lifetime, colour) and hands the living ones to the renderer.

The bug was in how entities died. When an entity's lifetime ran out, it was supposed to go back to the pool cleanly. At certain spawn rates, though, things overlapped. The dying logic read from the pool in the middle of a cycle. The pool handed out entities that were still on their way out. The spawn logic set them up before cleanup had finished, and the renderer received state that didn't add up.

What made it so hard was that nothing failed loudly. Every part kept running on slightly wrong data, and what you saw on screen was a freeze, not a crash with an error message. There was nothing pointing at where the problem started.

The fix was boring, like most real fixes. I split each tick into strict phases. First, dead entities are cleaned up and returned to the pool. Only after that can spawning take from the pool, and the renderer reads only once both are done. That order had always been implied. Once I made it explicit, the freeze went away.

There are 206 tests across 19 files now, covering the entity lifecycle, graph evaluation, clock sync and hot reload. None of them caught this one, because it was a timing problem that only showed up at certain spawn rates. They've caught plenty of others.

## A decision that paid off: sessions are just JSON

Not every architecture decision has caused me trouble. A session, meaning a complete node graph, is just a `NodeDefinition[]` `JSON` array checked against a Zod schema. The same schema checks the sessions that ship with the code and the ones users export from the UI.

That means a patch I build in rehearsal can be exported, dropped into `src/engine/graph/sessions/`, committed, and it's part of every future run. There's no separate patch format or proprietary save file. The graph is the data, and the data is in the repo.

⌘S saves to localStorage, and the download button exports a file. Imports go through the same schema check before anything touches the app's state. Nothing from outside is trusted until it's validated.

## Where it is now

Phases 0, 1 and 2.5 are done. Phase 2, the node graph editor and the entity world, is what I'm working on now.

There are about 20 nodes so far. Timing: Clock, Pulse, LFO, Sequencer, Divider and Randomizer. Maths: Add, Multiply, Remap, Quantize and SampleHold. Rendering: Spawner, Camera, Field, Fog, PostProcessing and Choreographer. It's a small set, but it's enough for the first performances I'm planning.

Next come feedback loops: back-edges in the graph (Z⁻¹) that feed a node's output into an earlier node one tick later. It's the modular trick of patching an output back into a CV input, and it opens up a lot more emergent behaviour. After that comes the feature I need most on stage, changing parameters mid-set without reloading the graph and wiping the entity world.

The freeze from that night is fixed. A week later, my screenshots were getting tagged `impulse node_graph 3d_graphics realtime` instead. Progress has been uneven, but it keeps adding up.

If you're new to Impulse, start with [the intro post](/blog/impulse-webgpu-generative-visual-engine). The live shows it's built for are covered in [The Live AV Pipeline](/blog/live-av-performance-pipeline).
