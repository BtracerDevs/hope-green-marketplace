// // app/i18n.ts
// import {getRequestConfig} from 'next-intl/server';
// import {cookies} from 'next/headers';

// export default getRequestConfig(async () => {
//   const cookieStore = await cookies(); 
//   const cookieLocale = cookieStore.get('locale')?.value ?? 'en';
//   const locale = cookieLocale === 'pt' ? 'pt' : 'en';

//   return {
//     locale,
//     messages: (await import(`../../messages/${locale}.json`)).default
//   };
// });



// app/i18n.ts
import { getRequestConfig } from 'next-intl/server';
import { cookies, headers } from 'next/headers';

const SUPPORTED = ['en', 'pt', 'es', 'fr'] as const;
type Locale = typeof SUPPORTED[number];
const DEFAULT_LOCALE: Locale = 'en';

function pickSupportedLocale(raw?: string | null): Locale {
  if (!raw) return DEFAULT_LOCALE;
  // pega só o código base (ex.: "pt-BR,pt;q=0.9" -> "pt")
  const code = raw.split(',')[0]?.split('-')[0]?.toLowerCase();
  return (SUPPORTED as readonly string[]).includes(code as string) ? (code as Locale) : DEFAULT_LOCALE;
}

export default getRequestConfig(async () => {
    const cookieStore = await cookies(); 
    const headerStore = await headers()

  const cookieLocale = cookieStore.get('locale')?.value;
  const headerLocale = headerStore.get('accept-language');

  // prioridade: cookie -> header -> default
  const locale = pickSupportedLocale(cookieLocale) || pickSupportedLocale(headerLocale) || DEFAULT_LOCALE;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});

