
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "zh", "ms"],
};

// Define the Locale type array in JavaScript
export const Locale = i18n.locales;

// export const i18n = {
//   defaultLocale: 'en',
//   locales: ['en', 'zh']
// } as const

// export type Locale = (typeof i18n)['locales'][number]
