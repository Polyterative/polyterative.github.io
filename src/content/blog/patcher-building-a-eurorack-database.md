---
title: "Patcher — Building a Database for Eurorack Modular Synthesis"
description: "Why I built an open-source web app to manage modular synth patches, and what I learned about community-driven tools."
date: "2024-11-10"
tags: ["Eurorack", "Angular", "Supabase", "Open Source"]
cover: "/projects/patcher.jpg"
---

Modular synthesis is inherently combinatorial. You connect a finite set of modules in near-infinite ways, and the patch — the state of all those connections — is ephemeral unless you document it. I got tired of photographing my rack and uploading screenshots to spreadsheets.

That frustration became [patcher.xyz](https://patcher.xyz).

## The Problem

The Eurorack community is fragmented across forums, Reddit, and Discord. There was no central place to:

- Document and retrieve your own patches
- Discover how others used the same modules
- Build a canonical database of modules with accurate specs

Existing tools were either too narrow (single-vendor apps) or too general (plain note apps).

## What I Built

Patcher is an Angular + Supabase app that lets you:

1. **Log your modules** — search a community-maintained database
2. **Save patches** — describe signal routing, note settings, add photos
3. **Explore** — browse patches by module, tag, or contributor

The stack was deliberate. Angular gives me the reactive programming model I'm comfortable with (RxJS flows feel natural for event-driven synth UIs). Supabase handles auth and a real-time Postgres backend without infrastructure overhead.

## On Building in Public

The first version launched with zero users and broke in three different browsers. Shipping it anyway was the right call. Feedback from the Bologna Modulare community shaped every subsequent feature. A tool for one person is a script. A tool for a community is a product.

Open source matters here too — the module database grows because anyone can contribute. That multiplier effect is worth the maintenance overhead.

## What's Next

Better mobile UX for live patch documentation, and an API so other tools can consume the module database. If you use Eurorack, give it a try and file an issue.

Patcher is where I document every patch before a live set. If you're curious what that pipeline looks like end-to-end — from patch design through performance to post-production — I wrote about it in [The Live AV Pipeline](/blog/live-av-performance-pipeline).
