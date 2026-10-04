---
title: "Home Assistant as Infrastructure, Not a Hobby"
description: "A dedicated server, a UPS, cheap AliExpress switches and a lot of YAML. How I rebuilt my home automation from scratch so I could actually rely on it."
date: "2026-03-28"
tags: ["Home Assistant", "Self-Hosting", "TrueNAS", "Homelab", "Smart Home", "Networking"]
---

Smart homes have a habit of needing constant attention. Devices depend on someone else's cloud, apps stop working when a subscription runs out, and a firmware update quietly breaks an automation that ran fine for months. It's supposed to be convenient, and most of the time you're fixing things.

When I moved into a new condo I had a chance to start over. I didn't want to bring my old configuration with me. I wanted to build it the way you'd build infrastructure at work: local, reliable, and mine.

## Starting with the server

Home Assistant runs on a machine I built just for this. It isn't a Raspberry Pi or a cloud VM. It's a real home server with proper storage, in a rack in the utility area.

The storage side runs TrueNAS, and it finally gave a home to all the hard drives I'd been collecting for years. That solved a problem I hadn't realised I cared about. My Mac doesn't have much internal storage, and having a few terabytes of fast, redundant network storage that's always on changes how you use a computer. Everything is just there, and I don't have to keep track of external drives anymore.

The server is on a UPS, and that wasn't optional. If the power cuts out at the wrong moment, Home Assistant's database can get corrupted, and that's a real way for the whole thing to fail. The UPS also reports on the home's power, and some automations use that.

TrueNAS also runs a few services 24/7 next to Home Assistant:

- **Network-wide ad blocking**, which covers every device including TVs and phones without setting anything up on each one
- An offline copy of Wikipedia, which is more useful than I expected and very satisfying to have
- A download manager that handles queued downloads in the background so my Mac doesn't have to

## The network

The apartment had conduits in the walls from when it was built, so I had cable paths to work with. I was lucky there. I ran ethernet through them and put cheap 2.5GbE switches from AliExpress in between. They're nothing special, but they were cheap, and together they make a wired backbone that's fast and never gives me trouble.

## Automations that check more than one thing

Starting from scratch made me rethink how I write automations. Simple "when X, do Y" rules kept breaking because real life rarely matches a single condition. So now almost every automation checks two or three things before it does anything.

The morning lights are a good example. They come on at 08:50, but only if the occupancy sensor agrees someone is home, and only if the light level on the balcony is below 40 lux. I use the outdoor sensor on purpose, because it isn't affected by whether the blinds are open. An indoor sensor would keep contradicting itself. If that sensor fails, the automation falls back to the sun's elevation.

The rest follow the same idea. The blinds check a weather sensor before opening, so sunny and rainy days get different behaviour. When I come home, GPS presence triggers the lights based on how bright it is outside, not on the time of day. A smart plug watches my PC's power draw, and above 40 W it unlocks several audio and peripheral automations.

None of these is complicated on its own. Together they make the place behave sensibly in situations I never thought about when I wrote them.

## What works and what doesn't

I deliberately mixed devices: Meross for lighting, IKEA motion and door sensors, Shelly 2PM units for the blinds, and smart plugs for power monitoring. All of it is local and all of it is in Home Assistant. None of it needs a manufacturer's cloud.

Zigbee has been great. The SLZB-06 coordinators pair reliably, have good range and have never caused me any drama.

*Thread and Matter are another story.* Thread is up, and the SLZB units are working as border routers. But commissioning Matter devices still isn't reliable. In March I spent time on IPv6 and DHCPv6 configuration, and that got parts of it working, but I wouldn't call it solved. I'll write about it once I have something solid to say.

There's one more weak spot, and it's on my side. I love using my Mac, but it doesn't get along perfectly with the server. `SMB` works, but it isn't seamless, and some workflows need an extra step that they wouldn't need on other platforms. It's a small complaint about a setup that otherwise works really well.

## What I ended up with

The switches were cheap, the server was a deliberate investment, and the UPS was a must. What I got for that is a home that reacts to presence, light, weather and what my devices are doing, all locally, with no subscriptions and no cloud.

When something breaks I can debug it, and when I want something new I can add it. All the configuration lives in `YAML` under version control. That turned out to matter more than anything else. I know exactly what the system does and why, so I'm not just trusting it and hoping. It feels like something I run myself, not a service I rent.

The apartment around all of this was planned in Figma before any furniture moved, and that's in [this post](/blog/planning-apartment-in-figma). The studio corner and its acoustics are [here](/blog/acoustic-treatment-square-room).
