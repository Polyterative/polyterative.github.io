---
title: "The Live AV Pipeline — From Modular Patch to Finished Video"
description: "How a Polyterative live set actually comes together: patch design, documentation, performance, and post-production."
date: "2026-03-15"
tags: ["Eurorack", "Live Performance", "Ableton", "Modular", "DaVinci Resolve", "AV"]
---

A live modular performance looks improvised from the outside. From the inside, it's the result of weeks of patch design, documentation, equipment preparation, and — after the show — hours of post-production. Here's what the full pipeline actually looks like.

## The patch

Everything starts with the patch — the specific configuration of cables and settings that produces the sound of the set. For the industrial techno material I've been performing, the architecture is built around rhythm and tension rather than melody.

The core signal chain runs something like: percussion source into a dynamics processor, with the bass voice going through its own path before merging. The sidechain compression is cross-faded rather than hard-triggered, which gives it a more physical, pumping quality. The frequency content is shaped aggressively — the intention is abrasive, evolving, with the kind of rhythmic intensity that comes from my background playing deathcore guitar, now translated into electronic texture.

The patch lives in [Patcher](https://patcher.xyz). Every module, every connection, every setting I want to recall later is documented there. Before Patcher existed I was photographing the front panel and taking written notes. Now I have a searchable, queryable record of every patch I've ever built — which is also useful for tracing back why something worked when I try to rebuild it months later.

## The gear

My live setup is deliberately minimal:

- Eurorack modular case, 7U / 104HP
- Ableton Live with Push 2
- Launchpad for clip triggering
- Audio interface outputting two balanced TRS channels to FOH

That stereo output is the only thing the venue needs from me. The rider specifies: line level, balanced, no added reverb or delay at FOH unless pre-arranged. Strong low end expected — *"gently control above 10kHz if harsh"* is the note I include, because the material often is.

The modular handles sound generation and processing. Ableton handles arrangement structure and timing reference — it's the backbone that the modular patches over, not the other way around.

## The performance history

I've been performing as Polyterative since 2021, first in collaborative improv sessions with the [Bologna Modulare](https://www.instagram.com/bolognmodulare/) collective — loose, exploratory, no formal structure. That was where I learned what works live versus what sounds good in a studio.

The trajectory since then has been toward more deliberately structured sets and larger formats. 2024 was a step change: a multichannel spatialized performance at a venue in Bologna where the sound moved through speakers positioned around the audience — a fundamentally different experience from stereo. Then a dedicated AV event pairing live visuals with the modular set, which is what led directly to building Impulse.

In 2025, a panel talk at MENT Festival in Ljubljana, then a live slot at Kino Šiška. The audiences are different at each of these — Ljubljana is more experimentally inclined than a Bologna club night — and the set shifts accordingly. The patch changes. The pacing changes. The documentation in Patcher means I can prepare variants without starting from scratch each time.

## Soundcheck and the venue relationship

The technical rider exists because venues vary enormously. The table size matters — you need 100×60cm minimum for the modular case, the laptop, and the interface, and there needs to be power within one meter of where you're performing, not across the stage. A technician during soundcheck is non-negotiable; sending audio into an unchecked PA and hoping is not a workflow.

The most common friction is FOH engineers who add reverb or compression to the stereo bus without asking. The modular output is already processed — it has its own spatial character. Additional processing at the desk usually makes things worse. The rider note is there to start that conversation before the soundcheck, not during it.

## Post-production

After the show, the recorded output from the interface goes into DaVinci Resolve alongside whatever video was captured — camera footage, screen recordings from Impulse if it was running, any fixed-camera or audience footage that's available.

The editing goal is documentation, not production. I want something that conveys what the set actually sounded and felt like, not a polished music video. That means keeping the rough edges, the room sound, the visible effort of working with physical hardware. The cut follows the energy of the performance, not a predetermined structure.

Some performances end up on [YouTube](https://youtu.be/8FU1Pg-0AH0). Others go into the archive and stay there. The value of the documentation isn't always in publishing it — it's in having a record that lets me hear what happened with some distance from the moment.

## The loop

Patch → document → prepare → perform → record → edit → archive → observe → adjust patch.

The cycle is slow. A set takes weeks to develop properly. But each iteration of the loop produces a patch that's more considered than the last, documentation that's more useful, a performance that's more deliberate. The modular forces you to be specific about what you want — you can't accidentally stumble into a good patch and then forget what it was.

Patcher is where the specificity lives. The live set is where it gets tested. Impulse — the visual engine I'm building for AV performances — is described in detail [here](/blog/impulse-webgpu-generative-visual-engine), and the visual work that preceded it lives [here](/blog/reactive-visuals-angular-threejs).
