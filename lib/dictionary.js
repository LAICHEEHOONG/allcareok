// // import "server-only";

// const dictionaries = {
//   en: () => import("../dictionaries/en.json").then((module) => module.default),
//   // de: () => import("../dictionaries/de.json").then((module) => module.default),
//   zh: () => import("../dictionaries/zh.json").then((module) => module.default),
//   ms: () => import("../dictionaries/ms.json").then((module) => module.default),

// };

// export const getDictionary = async (locale) => dictionaries[locale]();

// lib/dictionary.js
// import "server-only";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  zh: () => import("../dictionaries/zh.json").then((module) => module.default),
  ms: () => import("../dictionaries/ms.json").then((module) => module.default),
};

export const getDictionary = async (locale) => {
  // Fallback to "en" if the locale isn't defined
  const dictionaryFn = dictionaries[locale] || dictionaries["en"];
  
  if (!dictionaryFn) {
    throw new Error(`No dictionary available for locale: ${locale} or default "en"`);
  }

  try {
    return await dictionaryFn();
  } catch (error) {
    console.error(`Failed to load dictionary for locale "${locale}":`, error);
    // Optionally fallback to a static default dictionary or rethrow the error
    throw error;
  }
};