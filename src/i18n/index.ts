import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import {
  allResources,
  defaultLocale,
  localeFromPathname,
  localeOptions,
  type AppLocale,
} from "./locales";

const supportedLocales = localeOptions.map((locale) => locale.code) satisfies AppLocale[];
const initialLocale =
  typeof window === "undefined" ? defaultLocale : localeFromPathname(window.location.pathname);

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: allResources,
    lng: initialLocale,
    fallbackLng: defaultLocale,
    supportedLngs: supportedLocales,
    interpolation: {
      escapeValue: false,
    },
    returnObjects: true,
  });
}

export { i18n };
