# Act!ve Timișoara — presentation site

activetimisoara.ro: the community's site — activities, the events calendar, partners, reviews,
contact and links to the apps. Romanian and English (`/ro/…`, `/en/…`).

Astro (server-rendered on Vercel) with content from Sanity (project "Active Timișoara").

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321 — needs the Sanity variables in .env (see src/lib/sanity.ts)
npm run build
```

## Where things are

- `src/pages/[lang]/` — the pages; `calendar.astro` is the events calendar
- `src/lib/sanity.ts` — Sanity client and content types
- `src/lib/communityFeed.ts` — the apps' events (padel, hikes, other events) from the management app's
  public feed, merged into the calendar with their sign-up links
- `src/i18n/` — Romanian and English texts
- `studio/` — the Sanity Studio (not part of the site build)

## Deploy

Pushing to `main` deploys on Vercel.
