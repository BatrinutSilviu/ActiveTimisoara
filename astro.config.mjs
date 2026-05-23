import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  adapter: vercel(),
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
