---
title: "CostaMeno — Finding the Cheapest Fuel in Italy with Open Government Data"
description: "I wanted to know which pump nearby was cheapest without a login, an ad or a location prompt. It turned out the government already publishes the data."
date: "2026-03-31"
tags: ["Next.js", "TypeScript", "Tailwind", "Civic Tech", "Open Data"]
cover: "/blog/covers/costameno.png"
---

I wanted one thing: to stand at a pump, open a page, and see which station nearby was cheaper. Every fuel price app I tried in Italy wanted something first. A login, my GPS position, or my patience while an ad loaded.

[CostaMeno](https://costameno.vercel.app) is the version I wanted: open a URL, see the cheapest station, done.

## The data was already there

I assumed I'd have to scrape something. Then I found out that the Italian Ministry of Enterprises (<span class="caps">MIMIT</span>) publishes a daily `CSV` of every fuel station in the country. That's around **23,000 stations**, with prices for benzina, gasolio, GPL and metano, released as open data under IODL 2.0 and updated every morning. I had no idea it existed until I went looking.

So most of the work was the pipeline. At build time a script downloads the `CSV`, parses it and writes a local `JSON` cache. At runtime an API route filters stations by Haversine distance and returns the closest ones sorted by price.

Choosing the search radius was harder than it sounds. A fixed radius gives you too many results in a city and nothing on a quiet stretch of motorway. So the search starts small and widens until it has enough to compare:

```typescript
// Adaptive radius: start tight, expand if results are sparse
function findNearby(lat: number, lon: number, fuelType: string) {
  for (const radiusKm of [3, 7, 15, 30]) {
    const results = stations
      .filter(s => haversine(lat, lon, s.lat, s.lon) <= radiusKm)
      .filter(s => s.prices[fuelType] != null)
      .sort((a, b) => a.prices[fuelType] - b.prices[fuelType]);

    if (results.length >= 3) return results;
  }
}
```

In a city you get results within 3 km. In the middle of nowhere it keeps searching until it finds something.

## No location prompt

To pick a location you tap a Leaflet map, or drag the pin, and the search runs. The app never asks for permission and never sends your coordinates anywhere. The map tiles come from OpenStreetMap.

Part of that is privacy. The other part is that a permission dialog is just friction when you're standing next to your car.

## Making the answer obvious

The results map colors each station by price compared with the others you're looking at: green for cheap, yellow for middle, red for expensive. The three cheapest get medals (🥇🥈🥉) on the map and in the list.

Each card also shows a savings estimate, something like *"drive 4 km to this one and save about €0.90 on a 50 L fill."* That's the number that actually helps you decide whether the detour is worth it.

## The stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Maps | Leaflet + OpenStreetMap |
| Hosting | Vercel |
| Data | MIMIT CSV (build-time + 3h runtime cache) |

Nothing unusual here. All the interesting decisions were about the data and the experience at the pump.

## What I took away

I was surprised by how good Italian open data turned out to be. The <span class="caps">MIMIT</span> dataset is reliable and consistently formatted, and you don't need an API key or have to worry about rate limits. If you're building anything that touches Italian public services, check what the government already publishes before you pay a third party for it.

CostaMeno is live at [costameno.vercel.app](https://costameno.vercel.app), and I use it whenever I need to fill up.
