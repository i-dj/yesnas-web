import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import { allResources, defaultLocale, localeOptions, type AppLocale } from "./locales";

const supportedLocales = localeOptions
  .map((locale) => locale.code)
  .filter((code): code is AppLocale => code !== "system");

export function getBrowserLocale(): AppLocale {
  if (typeof navigator === "undefined") return defaultLocale;

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const candidate of candidates) {
    const normalized = candidate.toLowerCase();
    const exact = supportedLocales.find((code) => code.toLowerCase() === normalized);
    if (exact) return exact;

    const base = supportedLocales.find((code) => code.toLowerCase().split("-")[0] === normalized.split("-")[0]);
    if (base) return base;
  }

  return defaultLocale;
}

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: allResources,
      fallbackLng: defaultLocale,
      supportedLngs: supportedLocales,
      interpolation: {
        escapeValue: false,
      },
      detection: {
        order: ["localStorage", "navigator", "htmlTag"],
        lookupLocalStorage: "yesnas-language",
        caches: [],
      },
      returnObjects: true,
    });
}

export { i18n };
