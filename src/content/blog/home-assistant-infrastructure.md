---
title: "Home Assistant as Infrastructure, Not a Hobby"
description: "A dedicated server, a UPS, AliExpress switches, and a lot of YAML. Building home automation that you can actually rely on."
date: "2026-03-28"
tags: ["Home Assistant", "Self-Hosting", "TrueNAS", "Homelab", "Smart Home", "Networking"]
---

Most smart home setups are fragile. Cloud-dependent devices, apps that stop working when a subscription lapses, automations that silently break when a firmware update changes something. The promise is convenience; the reality is babysitting.

I wanted something different — something built like infrastructure. Reliable, local, mine.

## The server

Home Assistant runs on a dedicated machine I built specifically for this. It's not a Raspberry Pi and it's not a cloud VM — it's a proper home server with real storage, sitting in a rack in the utility area.

The storage layer runs TrueNAS, which also handles all the hard drives I'd been accumulating over the years. Moving everything into the NAS solved a problem I didn't expect to care about: my Mac doesn't have much local storage, and it turns out that having a few terabytes of fast, redundant, always-on network storage changes how you use a computer. Everything is just there. No juggling external drives.

The server has a UPS. This matters more than it sounds. Home Assistant with its automations, its devices, its sensors — losing power unexpectedly and corrupting the database is a real failure mode. The UPS also gives me runtime visibility on the home power situation, which feeds back into automations.

## Services worth mentioning

TrueNAS hosts several services that run 24/7 alongside Home Assistant:

- **Ad blocking** — network-level, covers every device on the network including TVs and phones, no per-device configuration needed
- **Offline Wikipedia** — the full Wikipedia available locally, no internet required. Surprisingly useful and genuinely satisfying to have
- **Self-hosted download management** — handles queued downloads in the background, frees the Mac from the task entirely

The AliExpress switches I mentioned aren't glamorous, but they're 2.5GbE and they were cheap. Proper ethernet throughout the apartment via the wall conduits that were already run during construction — I was lucky the previous work left me cable paths to use. The result is a wired backbone that's fast and boring in the best way.

## Home Assistant from scratch

Moving into the new condo was the opportunity to build the HA configuration properly rather than inheriting accumulated chaos. I started clean.

The automation philosophy I settled on: **compound conditions everywhere**. Simple trigger → action automations break constantly because real life doesn't match simple conditions. Instead, almost everything checks at least 2–3 things before acting.

The morning lights, for example: they turn on at 08:50, but only if the occupancy sensor agrees someone is home, and only if the lux reading from the outdoor balcony sensor is below 40. That outdoor sensor is the lux reference specifically because it's immune to whether the blinds are open — an indoor lux sensor would contradict itself. There's also a fallback to sun elevation for days when the sensor has issues.

The blinds check weather state before opening — a template sensor that tracks whether it's bright and sunny or raining, and adjusts accordingly. The arrival automation uses GPS presence but triggers lights based on outdoor illuminance rather than time-of-day assumptions. The PC power draw (monitored via smart plug, threshold at 40W) gates several audio and peripheral automations.

None of these are complicated individually. Together they produce a home that behaves correctly across a wide range of real situations without me thinking about it.

## Devices and protocols — what works

The device mix is deliberately varied: Meross for lighting, IKEA motion and door sensors, Shelly 2PM units for the blinds, smart plugs for power monitoring. Everything local, everything in Home Assistant, nothing dependent on manufacturer clouds.

Protocol-wise: **Zigbee works great.** The SLZB-06 coordinators I'm using for Zigbee are solid — reliable pairing, good range, no drama.

**Thread and Matter is another story.** I got Thread up and have the SLZB units running as border routers, which is promising. But Matter device commissioning is still not behaving reliably. The IPv6 and DHCPv6 configuration I spent some time on in March got parts of it working but it's not something I'd call solved yet. I'll write more about that separately when I have something conclusive to say.

## The Mac trade-off

I love my Mac. The experience of working on it daily is excellent. The one place where the server setup and the Mac don't quite meet gracefully is filesystem compatibility — SMB works but it's not as seamless as I'd like, and some workflows that feel natural on other platforms require an extra step. It's a minor complaint against a setup that otherwise works very well, but worth naming honestly.

## Worth it

The total spend on switches was modest — AliExpress, as mentioned. The server hardware was a deliberate investment. The UPS was not optional.

What I have now is a home that adapts to presence, light, weather, and device state — automatically, locally, without subscriptions or clouds. When something breaks, I can debug it. When I want to add something new, I can add it. The configuration lives in version-controlled YAML.

That last part matters more than I expected. Knowing exactly what the system does, and why, is different from having a system that mostly does things you've come to vaguely trust. One feels like infrastructure. The other feels like a service you rent.

I prefer infrastructure.

The apartment this infrastructure lives in was planned entirely in Figma before a single piece of furniture moved. That process — and the spatial design principles it produced — is [here](/blog/planning-apartment-in-figma). The acoustic side of the studio corner in the same space is [here](/blog/acoustic-treatment-square-room).
