---
title: "The Live AV Pipeline — From Modular Patch to Finished Video"
description: "A modular set looks improvised from the audience. Here's the weeks of patching, documenting, soundchecking and editing that go into one."
date: "2026-03-15"
tags: ["Eurorack", "Live Performance", "Ableton", "Modular", "DaVinci Resolve", "AV"]
---

From the audience, a live modular set looks improvised. Someone is moving cables and turning knobs, and the sound follows. What you don't see is the weeks of patch design before it, the gear prep, and the hours of editing afterwards. This post covers the whole process, from first patch to finished video.

## It starts with a patch

Every set starts with **the patch**: the arrangement of cables and settings that produces the sound. The industrial techno material I've been playing is built around rhythm and tension, not melody.

The signal chain goes roughly like this. A percussion source runs into a dynamics processor, while the bass voice takes its own path before the two merge. The sidechain compression is crossfaded instead of hard-triggered, which makes it pump in a way that feels physical. I shape the frequencies aggressively. I want it abrasive and constantly changing, with the kind of rhythmic drive that comes from my background playing deathcore guitar, now coming out as electronic texture.

Every patch goes into [Patcher](https://patcher.xyz): every module, every connection, every setting I'll want back later. Before Patcher, I photographed the front panel and scribbled notes. Now I have a searchable record of every patch I've built, which helps most months later, when I'm rebuilding something and trying to work out why it worked.

## The gear

I keep the live rig small on purpose:

- a Eurorack case, 7U / 104HP
- Ableton Live with a Push 2
- a Launchpad for triggering clips
- an audio interface sending two balanced TRS channels to front of house (FOH)

That stereo pair is all the venue gets from me. My rider asks for line level, balanced, and no reverb or delay at FOH unless we've agreed on it. It also warns them to expect a heavy low end, with a note to *"gently control above 10kHz if harsh"*, because the material often is.

The modular makes and processes the sound. Ableton holds the arrangement and timing, and the modular plays over it, not the other way around.

## How the sets grew

I've performed as Polyterative since 2021. It started with collaborative improv sessions with the [Bologna Modulare](https://www.instagram.com/bolognmodulare/) collective, loose and exploratory with no fixed structure. That's where I learned the difference between what sounds good in the studio and what actually works in a room full of people.

Since then the sets have become more structured and the formats bigger. 2024 was a big step. I played a multichannel spatialised show in Bologna, where the sound moved through speakers placed all around the audience, which feels completely different from stereo. Then came an AV event that paired live visuals with the modular set. That event is what led me to start building Impulse.

In 2025 I gave a panel talk at MENT Festival in Ljubljana, then played a live slot at Kino Šiška. Each audience is different. Ljubljana leans more experimental than a Bologna club night, so the set changes to match: different patch, different pacing. Because everything is in Patcher, I can prepare those versions without starting from zero each time.

## Soundcheck

Venues vary a lot, and that's why the **technical rider** exists. I need a table at least 100×60 cm for the case, the laptop and the interface, and power within a metre of where I'm playing, not across the stage. I won't skip having a technician at soundcheck. Sending audio into a PA nobody has checked and hoping for the best isn't a plan.

The most common problem is a sound engineer adding reverb or compression to the stereo bus without asking. The modular output is already processed and already has its own sense of space. Anything extra at the desk usually makes it worse. That line in the rider is there so we have that conversation before soundcheck, not in the middle of it.

## After the show

Afterwards, the recording from the interface goes into DaVinci Resolve with whatever video exists: camera footage, screen recordings from Impulse if it was running, and any audience or fixed-camera footage I can get.

I edit to document the show, not to make a music video. I want it to show what the set actually sounded and felt like, so I keep the rough edges, the sound of the room and the visible effort of working with physical hardware. The edit follows the energy of the performance, not a template.

Some of these end up on [YouTube](https://youtu.be/8FU1Pg-0AH0). Others just go into the archive. Publishing isn't really the point. The point is having a record I can listen back to later, once I'm no longer caught up in how the night felt.

## Back to the patch

Patch, document, prepare, perform, record, edit, archive, listen back, adjust the patch, and around again.

It's a slow loop, and a set takes weeks to get right. But each time round, the patch is more thought through, the notes are more useful, and the performance is more intentional. The modular makes you be specific about what you want. You can't stumble into a good patch and forget it, as long as you wrote it down.

Patcher is where I write it down, and the stage is where it gets tested. The visual engine I'm building for these shows is [Impulse](/blog/impulse-webgpu-generative-visual-engine), and the visual work that came before it is [here](/blog/reactive-visuals-angular-threejs).
