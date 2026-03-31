---
title: "Acoustic Treatment on a Budget — What Actually Worked in My Square Room"
description: "A new apartment, a square room, and €310 worth of polyester panels. But the biggest improvement cost nothing."
date: "2026-03-31"
tags: ["Audio", "Home Studio", "Acoustics", "DIY", "REW"]
---

Square rooms are acoustically bad by design. When all four walls are the same distance apart, standing waves build at the same frequencies on every axis simultaneously. Low frequencies pile up in the corners. The room rings at specific notes. You mix decisions based on peaks and nulls that don't exist in any other room.

My new apartment has a perfectly square room. I decided to use it as my studio anyway.

## The problem nobody talks about: positioning comes before treatment

I set up the workstation the obvious way — desk against a wall, monitors pointed down the long axis. Except the room has no long axis. And I had significantly more space to my right than to my left.

This asymmetry is a serious problem. In an ideal setup, the distance from your left ear to the left wall equals the distance from your right ear to the right wall. If those distances are different, early reflections arrive at different times on each side. The stereo image collapses. Bass builds differently on each side. No amount of treatment fixes a fundamentally asymmetric listening position.

My first instinct was to buy panels. The right move was to rotate the desk.

## Rotating 90 degrees — and accepting the trade-off

I turned the workstation 90 degrees. This put the monitors facing a different wall, gave me equal distances left and right, and moved me away from the worst corner. The acoustic improvement was immediate and significant — better stereo width, less of that characteristic boxy buildup in the low mids.

The trade-off: the large window is now directly behind my monitors. That's not ideal for eyes. But it's much better for ears, and ears are what matter in this room. I can manage the glare. I can't fix a broken stereo image with curtains.

I measured with REW before and after. The waterfall plot went from genuinely bad — long decay tails, obvious modal ringing — to something that looked workable. Just from moving a desk.

## Then the panels

With positioning sorted, I could see clearly what treatment was actually needed. The room still had too much high-mid energy and the decay time was too long. I needed absorption.

I ordered polyester fiber panels — not acoustic foam, which degrades fast and only treats high frequencies. Polyester panels are denser, more durable, and work further into the mid-bass range. Low cost. I sourced enough to cover the main reflection points on the walls plus the ceiling above the mix position.

Installation was DIY. I used polyester-compatible adhesive to bond the panels, then fixed them to the walls. A few panels went on the ceiling directly above the listening position — the "cloud" position, which treats first reflections from above before they reach your ears.

Total spend: **€270 for the panels, €40 for the adhesive.**

The before/after in REW was substantial. Decay times down across the board. The high-mid harshness mostly gone. The low end still has some room character — square rooms will always have modal issues that only serious bass trapping can address, and I haven't gone that far — but it's a working studio now, not a liability.

## What I'd tell someone starting from scratch

1. **Measure first.** REW is free. A cheap measurement microphone is under €100. Running a sweep takes ten minutes. Without measurement data, you're guessing — and you'll spend money on treatment that addresses the wrong problems.

2. **Fix the position before buying anything.** The asymmetric desk placement was costing me more than the untreated room was. Repositioning is free and often makes a larger difference than panels.

3. **Polyester over foam.** Foam looks the part and is cheap, but its effective frequency range is too narrow and it deteriorates. Polyester costs more per panel but works properly.

4. **Ceiling first if you're unsure.** The cloud panel over the mix position gives you the most bang per square meter. It treats the first reflection that matters most — the one that arrives soonest and hardest — without requiring you to cover every wall.

The room is not perfect. A square room never will be. But it's honest now — what I hear in it maps reasonably well to how things sound elsewhere. For €310 and one afternoon of measuring and rotating furniture, that's a good result.

The apartment this room lives in went through its own planning process — I designed the layout entirely in Figma before touching a single piece of furniture. That story is [here](/blog/planning-apartment-in-figma). The home automation layer built on top of all of it is [here](/blog/home-assistant-infrastructure).
