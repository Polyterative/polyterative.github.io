---
title: "CostaMeno — Finding the Cheapest Fuel in Italy with Open Government Data"
description: "I built a mobile-first fuel price finder using Italian Ministry open data — no tracking, no app install, no nonsense."
date: "2026-03-31"
tags: ["Next.js", "TypeScript", "Tailwind", "Civic Tech", "Open Data"]
cover: "/blog/covers/costameno.png"
---

Every fuel price app in Italy is either behind a login wall, plastered with ads, or wants your GPS coordinates. I wanted something with no ceremony: open a URL while standing at a pump, see which station nearby is cheapest. That's the whole product.

[CostaMeno](https://costameno.vercel.app) is that thing.

## The data

The Italian Ministry of Enterprises (MIMIT) publishes a daily CSV of every fuel station in the country — around 23,000 stations with prices for benzina, gasolio, GPL, and metano. It's open data under IODL 2.0 and it's updated every morning. I had no idea this existed until I went looking.

The pipeline: at build time, a script fetches the CSV, parses it, and writes a local JSON cache. At runtime, the API route applies a Haversine distance filter with an adaptive radius and returns the nearest stations ranked by price.

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

This means if you're in a dense city you get results within 3km. If you're on the highway in the middle of nowhere, it expands until it finds something.

## No GPS permissions

The location picker is a Leaflet map. You tap where you are — or drag the pin — and the search fires. No permission prompts, no coordinates sent anywhere. Map tiles come from OpenStreetMap.

The design choice is partly privacy, partly UX: a permission dialog is friction you don't want when you're standing at a pump.

## Color-coded pins and podium rankings

The results map shows each station as a colored pin: green for cheap, yellow for mid, red for expensive — relative to the current result set, not an absolute scale. The three cheapest get medal badges (🥇🥈🥉) both on the map and in the list.

There's also a savings calculator on each card. "If you drive 4km to this station instead, you save ~0.90€ on a 50L fill." That's the number that actually helps you decide.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Maps | Leaflet + OpenStreetMap |
| Hosting | Vercel |
| Data | MIMIT CSV (build-time + 3h runtime cache) |

Nothing exotic. The interesting part is all in the data pipeline and the UX decisions, not the framework.

## What I learned

Italian government open data is better than I expected. The MIMIT dataset is reliable, consistently formatted, and available without an API key or rate limit. If you're building anything touching Italian civic infrastructure, it's worth checking what's already published before reaching for a third-party data provider.

CostaMeno is live at [costameno.vercel.app](https://costameno.vercel.app). I use it. It does the thing.
