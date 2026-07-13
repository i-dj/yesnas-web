import en from "./locales/en";
import zh from "./locales/zh";
import ja from "./locales/ja";
import de from "./locales/de";
import fr from "./locales/fr";
import es from "./locales/es";
import ko from "./locales/ko";
import pt from "./locales/pt";

export const defaultLocale = "en";

export const localeOptions = [
  { code: "en", label: "English" },
  { code: "zh", label: "中文" },
  { code: "ja", label: "日本語" },
  { code: "de", label: "Deutsch" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "ko", label: "한국어" },
  { code: "pt", label: "Português" },
] as const;

export type LocaleCode = (typeof localeOptions)[number]["code"];
export type AppLocale = LocaleCode;

export const localeByPath: Record<string, LocaleCode> = {
  zh: "zh",
  ja: "ja",
  de: "de",
  fr: "fr",
  es: "es",
  ko: "ko",
  pt: "pt",
};

export function localeToPath(locale: LocaleCode) {
  return locale === defaultLocale ? "/" : `/${locale}`;
}

export function localeToLegalPath(locale: LocaleCode, page: "privacy" | "terms") {
  return locale === defaultLocale ? `/${page}` : `/${locale}/${page}`;
}

export function localeFromPathname(pathname: string): LocaleCode {
  const segment = pathname.split("/").filter(Boolean)[0];
  return segment ? (localeByPath[segment] ?? defaultLocale) : defaultLocale;
}

export const allResources = {
  en: { translation: en },
  zh: { translation: zh },
  ja: { translation: ja },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  ko: { translation: ko },
  pt: { translation: pt },
} as const;
