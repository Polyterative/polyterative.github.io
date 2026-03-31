---
title: "I Planned My Apartment in Figma (And I'd Do It Again)"
description: "A UX engineer moves into a new place and does the obvious thing: opens Figma. What I learned about spatial design by treating it like an interface problem."
date: "2026-02-20"
tags: ["Design", "Figma", "Interior Design", "Space Planning", "UX"]
---

When I moved into my new apartment, the first thing I opened was Figma.

This is probably not surprising if you know me. Figma is where I think spatially — where I arrange things, test compositions, compare options side by side. The question of how to configure a room is, at some level, the same kind of problem as designing an interface: you have a bounded space, a set of elements with fixed and flexible properties, and a set of human behaviors you're trying to support or avoid.

So I imported the floor plan, set up a frame at 1:50 scale, and started working.

## The floor plan as a canvas

The apartment came with architectural drawings. I traced the walls into Figma, marked the fixed points — windows, doors, radiators, electrical outlets — and then started placing furniture as components. Each piece of furniture became a frame with accurate proportions: the desk, the bed, the shelving units, the kitchen elements.

The advantage over paper sketching is immediate: you can duplicate an entire layout variant in two seconds, compare three configurations side by side, and share it with anyone who needs to weigh in. I went through around a dozen serious layout iterations before arriving at something that felt right.

## Design principles that emerged from the process

Working through the layouts forced me to articulate why certain configurations felt better. I ended up with a set of principles I've been applying consistently:

**Float elements when possible.** Wall-mounted furniture or pieces with visible legs reveal the floor perimeter. A continuous floor plane reads as a larger room. A piece that disappears into the floor breaks that continuity.

**Consolidate vertical mass.** Tall storage units compress a room visually. One block of tall storage on one wall is fine; distributing tall pieces around the room makes it feel smaller and busier. Keep the rest low and continuous.

**One clear sightline from entry to window.** Leave at least one meter of open space along the main axis from the front door to the primary window. A room that reads as one continuous volume from entry feels significantly larger than the same dimensions with an obstruction in that path.

**Limit materials, vary texture.** Three materials maximum: one for surfaces (walls and ceiling), one for the floor, one for accents. Varying texture within a material is fine — varying color between multiple materials creates visual noise.

**Align edges.** Furniture, rugs, and lighting should run parallel to the room's longest wall. Diagonal placement feels dynamic as a concept and chaotic in practice.

**Curtains as architecture, not decoration.** Full-height, wall-to-wall tracks. Stack to one side when open to read the window as a single opening. Curtains that stop at the window frame make the ceiling feel lower and the window feel smaller.

## The kitchen

The kitchen planning was a negotiation between what the builder was offering and what I actually wanted. Figma became the communication layer — I could show exactly what I meant rather than describe it.

The main requests: all drawers below the counter instead of cabinet doors (significantly more ergonomic), a full-height backsplash in an inox/stainless effect, extra electrical outlets above the counter (essential for the smart home setup). One outlet conflict required routing power behind the fridge — a minor thing that would have been easy to miss without working through the layout in detail.

## The color system

I settled on a small, explicit color meaning system early:

- **Grey** — structural, supportive, containing
- **Wood** — warmth, comfort, tactile presence
- **Yellow accents** — creative areas, good daylight zones
- **Green** — food-adjacent spaces (kitchen, dining)

This isn't a decoration choice, it's navigation. When you're not consciously deciding what color something should be, you default to what's in front of you. Having a small system means the decisions are already made.

## What Figma can't do

Scale and light. You can make a furniture layout that looks perfect in Figma and walks into the actual room to find that one piece blocks the window in a way you didn't register, or that the light at 5pm hits something in a way the floor plan doesn't capture.

I supplemented with REW (for the studio corner, where acoustics matter as much as aesthetics) and a lot of standing in the empty room at different times of day before committing to positions.

## Would I recommend this workflow?

If you're comfortable in Figma and you're moving into a new space, yes. The benefits are real: spatial comparison at scale, easy iteration, sharable artifacts, and a discipline that forces you to think in precise dimensions rather than vague preferences.

The limitation is that it's a 2D top-down view, which is better for layout than for atmosphere. I found myself switching between Figma for arrangement logic and Pinterest for mood reference — the two tools serve different kinds of spatial thinking.

The apartment is now configured. Most of the layouts I tested in Figma were discarded. A few principles I thought were rules turned out to be guidelines. One thing I was certain about turned out to be completely wrong once I was standing in the room.

That's design.

The acoustic corner of this apartment has its own story — how I treated a square room with polyester panels and a desk rotation. That's [here](/blog/acoustic-treatment-square-room). The home automation layer built on top of the whole space is [here](/blog/home-assistant-infrastructure).
