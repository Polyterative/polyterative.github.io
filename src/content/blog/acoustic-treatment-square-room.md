---
title: "Acoustic Treatment on a Budget — What Actually Worked in My Square Room"
description: "A new apartment, a square room, and €310 of polyester panels. The biggest improvement came from moving the desk, which cost nothing."
date: "2026-03-31"
tags: ["Audio", "Home Studio", "Acoustics", "DIY", "REW"]
---

My new apartment has a perfectly square room, and I wanted it to be my studio. That's about the worst shape for listening. When all four walls are the same distance apart, **standing waves** build up at the same frequencies in both directions at once. Bass piles up in the corners and certain notes ring. You end up mixing around peaks and dips that exist only in that room.

I set the studio up there anyway. I expected the fix to come from panels. It turned out the biggest fix was moving furniture.

## The desk was the problem

I set up the obvious way first: desk against a wall, monitors pointing into the room. But a square room doesn't have a long side to point them down, and I'd ended up with much more space on my right than on my left.

That's worse than it sounds. Ideally your left ear is the same distance from the left wall as your right ear is from the right wall. When they're not, reflections reach each ear at different times, the stereo image smears, and the bass behaves differently on each side. Panels can't fix that.

My first instinct was to order panels anyway. What I actually needed to do was turn the desk.

## Turning it 90 degrees

I rotated the whole workstation by 90 degrees. The monitors now face a different wall, the distances on the left and right are equal, and I'm further from the worst corner. I could hear it straight away. The stereo image got wider and the boxy build-up in the low mids eased off.

There was a cost: the big window is now right behind the monitors, which isn't great for my eyes. But this room is for listening, and I can deal with glare. Curtains won't fix a broken stereo image.

I measured with REW before and after. The waterfall plot went from long decay tails and obvious ringing to something I could work with. All I'd done was move a desk.

## Then the panels

With the position sorted, the measurements showed what was actually left to fix. There was too much energy in the high mids and the decay time was too long. That meant absorption.

I bought polyester fibre panels, not foam. Foam breaks down quickly and only really absorbs high frequencies. Polyester is denser, lasts longer and works further down into the low mids. I got enough to cover the main reflection points on the walls, plus a few for the ceiling right above where I sit. That ceiling spot is called the "cloud", and it catches the first reflection from above before it reaches your ears.

I glued the panels with a polyester-safe adhesive and fixed them to the walls myself. It cost **€270 for the panels and €40 for the glue**.

The second REW measurement showed decay times down across the board and most of the harshness in the high mids gone. The low end still has some of the room's character. Square rooms always do unless you put in serious bass trapping, and I haven't gone that far. But the room went from working against me to being a studio I can actually use.

## If you're starting from scratch

1. Measure first. REW is free and a basic measurement mic costs under €100. A sweep takes ten minutes. Without measurements you're guessing, and you'll spend money fixing the wrong problems.
2. Fix the position before you buy anything. My lopsided desk cost me more than the bare walls did, and moving it was free.
3. Polyester over foam. Foam is cheap and looks the part, but it only works on a narrow frequency range and it falls apart over time.
4. If you're unsure, start with the ceiling. A cloud over your listening position does the most per square metre, because it catches the reflection that arrives first and loudest.

The room still isn't perfect, and a square room never will be. But it's honest now: what I hear in it holds up when I play the same mix somewhere else. For €310 and an afternoon of measuring and moving furniture, I'm happy with that.

I planned the rest of the apartment in Figma before moving any furniture. That's in [this post](/blog/planning-apartment-in-figma). The home automation on top of it all is [here](/blog/home-assistant-infrastructure).
