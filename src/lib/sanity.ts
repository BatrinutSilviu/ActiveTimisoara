import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2024-01-01',
  token: import.meta.env.SANITY_READ_TOKEN,
});

export type Sport = 'padel' | 'running' | 'cycling' | 'hiking' | 'football' | 'volleyball' | 'basketball' | 'tennis';

export interface SanityEvent {
  _id: string;
  title_ro: string;
  title_en: string;
  date: string;
  end_date?: string;
  sport: Sport;
  location_ro?: string;
  location_en?: string;
  special?: boolean;
  notes_ro?: string;
  notes_en?: string;
  time?: string;
}

export interface SanityRecurringEvent {
  _id: string;
  title_ro: string;
  title_en: string;
  sport: Sport;
  dayOfWeek: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
  time_start?: string;
  time_end?: string;
  location_ro?: string;
  location_en?: string;
  notes_ro?: string;
  notes_en?: string;
}
