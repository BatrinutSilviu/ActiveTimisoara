import type { SanityEvent, Sport } from './sanity';

// Events from the community's apps (padel tournaments, hikes, via ferratas and other events), as the
// management app lists them publicly: https://management.activetimisoara.ro/api/public/calendar.
// Each one links to its sign-up page in its app. If the feed is slow or down, the calendar shows
// only the events from Sanity.

const FEED_URL = import.meta.env.COMMUNITY_FEED_URL ?? 'https://management.activetimisoara.ro/api/public/calendar';
const TIMEOUT_MS = 2500;
const CACHE_MS = 60_000;

export interface CalendarEvent extends SanityEvent {
  /** Sign-up page in the app the event comes from. */
  url?: string;
  /** The app's own name for the sport, shown when it isn't one of ours (sport 'other'). */
  sportLabel?: string;
}

interface FeedEvent {
  id: string;
  name: string;
  sport: string;
  date: string;
  endDate: string | null;
  startTime: string | null;
  endTime: string | null;
  location: string | null;
  url: string;
}

const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
// The apps' sport names (English or Romanian) → the site's sports.
const SPORTS: Record<string, Sport> = {
  padel: 'padel',
  hiking: 'hiking', drumetie: 'hiking', drumetii: 'hiking', 'via ferrata': 'hiking',
  running: 'running', alergare: 'running', alergat: 'running',
  cycling: 'cycling', ciclism: 'cycling', bicicleta: 'cycling',
  football: 'football', fotbal: 'football',
  volleyball: 'volleyball', volei: 'volleyball',
  basketball: 'basketball', baschet: 'basketball',
  tennis: 'tennis', tenis: 'tennis',
};

let cache: { at: number; events: CalendarEvent[] } | null = null;

function toCalendarEvent(e: FeedEvent): CalendarEvent {
  const sport = SPORTS[fold(e.sport)] ?? 'other';
  const time = e.startTime ? (e.endTime ? `${e.startTime}–${e.endTime}` : e.startTime) : undefined;
  return {
    _id: `app-${e.id}`,
    title_ro: e.name,
    title_en: e.name,
    date: e.date,
    end_date: e.endDate ?? undefined,
    sport,
    location_ro: e.location ?? undefined,
    location_en: e.location ?? undefined,
    time,
    url: e.url,
    sportLabel: sport === 'other' ? e.sport : undefined,
  };
}

/** The apps' upcoming events from `from` to `to` (YYYY-MM-DD), or none when the feed can't be read. */
export async function fetchCommunityEvents(from: string, to: string): Promise<CalendarEvent[]> {
  try {
    if (!cache || Date.now() - cache.at > CACHE_MS) {
      const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(TIMEOUT_MS) });
      if (!res.ok) throw new Error(`feed answered ${res.status}`);
      const body = (await res.json()) as { events: FeedEvent[] };
      cache = { at: Date.now(), events: body.events.map(toCalendarEvent) };
    }
  } catch (err) {
    console.error('Community feed failed:', err);
    if (!cache) return [];
  }
  return cache.events.filter(e => (e.end_date ?? e.date) >= from && e.date <= to);
}
