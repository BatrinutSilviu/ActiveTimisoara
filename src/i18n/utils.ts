import { translations, type Locale } from './translations';

export function getTranslations(lang: string) {
  return translations[lang === 'en' ? 'en' : 'ro'];
}

export function getAlternateUrl(lang: string, page: string): string {
  const other = lang === 'ro' ? 'en' : 'ro';
  if (page === 'index') {
    return `/${other}/`;
  }
  return `/${other}/${page}`;
}

export function getStaticLangPaths() {
  return [
    { params: { lang: 'ro' as Locale } },
    { params: { lang: 'en' as Locale } },
  ];
}
