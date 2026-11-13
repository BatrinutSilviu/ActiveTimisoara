# Active Timisoara — Presentation Site

## Project Overview

Presentation website for the **Active Timisoara** sports community, hosted at `activetimisoara.ro`.

## Planned Sections

- **Activities** — info and photos of community sports events
- **Calendar** — upcoming events and schedules
- **Contact** — contact form / details
- **Reviews** — community testimonials and feedback
- **Sponsors & Shoutouts** — partner and sponsor recognition
- **App Redirects** — links to dedicated sport-specific apps

## Sub-Apps / Related Domains

| App | Domain |
|-----|--------|
| Padel (racket sport) | `padel.activetimisoara.ro` |
| Hikes (hiking) and other events | `hikes.activetimisoara.ro` |
| Management (admins only) | `management.activetimisoara.ro` |

> Add future sport-specific apps to this table as they are created.

## Current State

Astro site, server-rendered on Vercel (push to `main` deploys), content from Sanity. The calendar
(`src/pages/[lang]/calendar.astro`) also shows the apps' events from the management app's public feed
(`src/lib/communityFeed.ts`, https://management.activetimisoara.ro/api/public/calendar).
