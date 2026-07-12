import { allResources, localeOptions, localeToPath, type LocaleCode } from "@/i18n/locales";
import logoUrl from "@/assets/logo-yesnas-dark.webp";

const siteUrl = "https://yesnas.com";
const githubUrl = "https://github.com/i-dj/yesnas";
const downloadUrl = "https://yesnas.com/install";
const ogImageUrl = `${siteUrl}${logoUrl}`;

type SeoCopy = {
  title: string;
  description: string;
  ogLocale: string;
};

const homeSeo: Record<LocaleCode, SeoCopy> = {
  en: {
    title: "Private AI NAS | Local AI Storage & Self-hosted AI | YesNAS",
    description:
      "Deploy your own private AI NAS for files, photos and media. Run local AI models, semantic search, Docker apps and private cloud storage on your own device.",
    ogLocale: "en_US",
  },
  zh: {
    title: "私有 AI NAS｜本地 AI 存储与自托管云｜YesNAS",
    description:
      "部署你自己的私有 AI NAS，用本地 AI 管理文件、相册和影音。支持语义搜索、本地大模型、Docker 应用和私有云存储，数据保存在自己的设备上。",
    ogLocale: "zh_CN",
  },
  ja: {
    title: "プライベート AI NAS｜ローカル AI ストレージ｜YesNAS",
    description:
      "ファイル、写真、メディア向けのプライベート AI NAS を構築。ローカル AI、セマンティック検索、Docker アプリ、プライベートクラウドを自分の端末で実行できます。",
    ogLocale: "ja_JP",
  },
  de: {
    title: "Private AI NAS | Lokaler KI-Speicher | YesNAS",
    description:
      "Baue dein eigenes Private AI NAS fuer Dateien, Fotos und Medien. Nutze lokale KI-Modelle, semantische Suche, Docker-Apps und Private-Cloud-Speicher auf deinem Geraet.",
    ogLocale: "de_DE",
  },
  fr: {
    title: "Private AI NAS | Stockage IA local | YesNAS",
    description:
      "Déployez votre Private AI NAS pour fichiers, photos et médias. Exécutez IA locale, recherche sémantique, apps Docker et stockage cloud privé sur votre appareil.",
    ogLocale: "fr_FR",
  },
  es: {
    title: "Private AI NAS | Almacenamiento IA local | YesNAS",
    description:
      "Despliega tu Private AI NAS para archivos, fotos y medios. Ejecuta IA local, búsqueda semántica, apps Docker y nube privada en tu propio dispositivo.",
    ogLocale: "es_ES",
  },
  ko: {
    title: "프라이빗 AI NAS | 로컬 AI 스토리지 | YesNAS",
    description:
      "파일, 사진, 미디어를 위한 프라이빗 AI NAS를 배포하세요. 로컬 AI 모델, 시맨틱 검색, Docker 앱, 프라이빗 클라우드 스토리지를 내 장치에서 실행합니다.",
    ogLocale: "ko_KR",
  },
  pt: {
    title: "Private AI NAS | Armazenamento IA local | YesNAS",
    description:
      "Implante seu Private AI NAS para arquivos, fotos e mídia. Rode IA local, busca semântica, apps Docker e armazenamento de nuvem privada no seu próprio dispositivo.",
    ogLocale: "pt_BR",
  },
};

function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}

function homeAlternates() {
  return [
    ...localeOptions.map(({ code }) => ({
      rel: "alternate",
      hrefLang: code,
      href: absoluteUrl(localeToPath(code)),
    })),
    { rel: "alternate", hrefLang: "x-default", href: absoluteUrl("/") },
  ];
}

export function homeHead(locale: LocaleCode = "en") {
  const copy = homeSeo[locale] ?? homeSeo.en;
  const canonical = absoluteUrl(localeToPath(locale));
  const faqItems = allResources[locale].translation.faq.items;

  return {
    meta: [
      { title: copy.title },
      { name: "description", content: copy.description },
      {
        name: "keywords",
        content:
          "Private AI NAS, AI NAS, Local AI NAS, Self-hosted AI, Private AI, Local AI, Semantic Search, AI File Search, Photo Management, Media Server, Home Server, Personal Cloud, Private Cloud, Local LLM, Offline AI, Docker NAS, Home NAS, Self-hosted Storage",
      },
      { property: "og:title", content: copy.title },
      { property: "og:description", content: copy.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:site_name", content: "YesNAS" },
      { property: "og:locale", content: copy.ogLocale },
      { property: "og:image", content: ogImageUrl },
      { property: "og:image:alt", content: "YesNAS Private AI NAS" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: copy.title },
      { name: "twitter:description", content: copy.description },
      { name: "twitter:image", content: ogImageUrl },
      {
        "script:ld+json": {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              name: "YesNAS",
              alternateName: "Private AI NAS",
              description: copy.description,
              url: canonical,
              applicationCategory: "StorageApplication",
              operatingSystem: "Linux",
              license: githubUrl,
              softwareVersion: "0.1.0",
              downloadUrl,
              codeRepository: githubUrl,
              softwareRequirements: "Linux, Docker, local storage or NAS hardware",
              keywords:
                "Private AI NAS, AI NAS, Local AI NAS, Self-hosted AI, Private AI, semantic file search, local LLM, Docker NAS, private cloud",
              creator: {
                "@type": "Organization",
                name: "YesNAS",
                url: siteUrl,
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              isAccessibleForFree: true,
            },
            {
              "@type": "FAQPage",
              mainEntity: faqItems.map((item) => ({
                "@type": "Question",
                name: item.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: item.a,
                },
              })),
            },
          ],
        },
      },
    ],
    links: [{ rel: "canonical", href: canonical }, ...homeAlternates()],
  };
}

export function localizedHomeHead(locale: LocaleCode) {
  return ({ matches }: { matches: Array<unknown> }) =>
    matches.length <= 2 ? homeHead(locale) : { meta: [], links: [] };
}
