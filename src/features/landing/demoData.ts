import logoUrl from "@/assets/logo-yesnas-dark.webp";
import car1 from "@/assets/cars/blue-car-1.jpg";
import car2 from "@/assets/cars/blue-car-2.jpg";
import car3 from "@/assets/cars/blue-car-3.jpg";
import car4 from "@/assets/cars/blue-car-4.jpg";
import pBaby1 from "@/assets/photos/p_baby1.jpg";
import pBaby2 from "@/assets/photos/p_baby2.jpg";
import pLand1 from "@/assets/photos/p_land1.jpg";
import pLand2 from "@/assets/photos/p_land2.jpg";
import pRec1 from "@/assets/photos/p_rec1.jpg";
import pRec2 from "@/assets/photos/p_rec2.jpg";
import pFood1 from "@/assets/photos/p_food1.jpg";
import pPet1 from "@/assets/photos/p_pet1.jpg";
import pScr1 from "@/assets/photos/p_scr1.jpg";
import interstellarPoster from "@/assets/photos/interstellar.jpg";
import movieClip from "@/assets/movie-clip.mp4";
import posterAvatarWayOfWater from "@/assets/posters/avatar-way-of-water.jpg";
import posterBladeRunner2049 from "@/assets/posters/blade-runner-2049.png";
import posterDunePartTwo from "@/assets/posters/dune-part-two.jpg";
import posterEverythingEverywhere from "@/assets/posters/everything-everywhere.jpg";
import posterGlassOnion from "@/assets/posters/glass-onion.jpg";
import posterInterstellar from "@/assets/posters/interstellar-poster.jpg";
import posterJohnWick4 from "@/assets/posters/john-wick-4.jpg";
import posterKillersFlowerMoon from "@/assets/posters/killers-flower-moon.jpg";
import posterOppenheimer from "@/assets/posters/oppenheimer.jpg";
import posterSpiderVerse from "@/assets/posters/spider-verse.jpg";
import posterTheBatman from "@/assets/posters/the-batman.jpg";
import posterTopGunMaverick from "@/assets/posters/top-gun-maverick.png";
import type { LocaleCode } from "@/i18n/locales";

export {
  logoUrl,
  car1,
  car2,
  car3,
  car4,
  pBaby1,
  pBaby2,
  pLand1,
  pLand2,
  pRec1,
  pRec2,
  pFood1,
  pPet1,
  pScr1,
  interstellarPoster,
  movieClip,
  posterAvatarWayOfWater,
  posterBladeRunner2049,
  posterDunePartTwo,
  posterEverythingEverywhere,
  posterGlassOnion,
  posterInterstellar,
  posterJohnWick4,
  posterKillersFlowerMoon,
  posterOppenheimer,
  posterSpiderVerse,
  posterTheBatman,
  posterTopGunMaverick,
};

export type LocalizedText = { en: string } & Partial<Record<LocaleCode, string>>;

export type PhotoItem = {
  src: string;
  cat: "宝宝" | "风景" | "票据" | "美食" | "宠物" | "截图";
};

export const PHOTO_POOL: PhotoItem[] = [
  { src: pBaby1, cat: "宝宝" },
  { src: pBaby2, cat: "宝宝" },
  { src: pLand1, cat: "风景" },
  { src: pLand2, cat: "风景" },
  { src: pRec1, cat: "票据" },
  { src: pRec2, cat: "票据" },
  { src: pFood1, cat: "美食" },
  { src: pPet1, cat: "宠物" },
  { src: pScr1, cat: "截图" },
];

export const PHOTO_BUCKETS: {
  key: PhotoItem["cat"];
  label: LocalizedText;
  icon: "users" | "mapPin" | "receipt" | "sparkles" | "star" | "fileText";
  hue: number;
}[] = [
  {
    key: "宝宝",
    label: { en: "Baby milestones", zh: "宝宝成长", ja: "赤ちゃんの成長", ko: "아기 성장" },
    icon: "users",
    hue: 25,
  },
  {
    key: "风景",
    label: { en: "Landscapes", zh: "风景", ja: "風景", ko: "풍경" },
    icon: "mapPin",
    hue: 195,
  },
  {
    key: "票据",
    label: { en: "Receipts", zh: "票据", ja: "レシート", ko: "영수증" },
    icon: "receipt",
    hue: 45,
  },
  {
    key: "美食",
    label: { en: "Food", zh: "美食", ja: "食べ物", ko: "음식" },
    icon: "sparkles",
    hue: 15,
  },
  {
    key: "宠物",
    label: { en: "Pets", zh: "宠物", ja: "ペット", ko: "반려동물" },
    icon: "star",
    hue: 340,
  },
  {
    key: "截图",
    label: {
      en: "Screenshots · QR",
      zh: "截图 · 二维码",
      ja: "スクリーンショット · QR",
      ko: "스크린샷 · QR",
    },
    icon: "fileText",
    hue: 275,
  },
];

export type AudioTrack = {
  flag: string;
  lang: string;
  name: string;
  displayName: LocalizedText;
  meta: string;
  ai: boolean;
  hue: number;
  subtitle: string;
};

export const AUDIO_TRACKS: AudioTrack[] = [
  {
    flag: "🇬🇧",
    lang: "EN",
    name: "English",
    displayName: { en: "English", zh: "English", ja: "英語", ko: "영어" },
    meta: "Original · 5.1",
    ai: false,
    hue: 210,
    subtitle: "We used to look up at the sky and wonder at our place in the stars.",
  },
  {
    flag: "🇨🇳",
    lang: "中文",
    name: "中文 · McConaughey 音色",
    displayName: {
      en: "Chinese · McConaughey voice",
      zh: "中文 · McConaughey 音色",
      ja: "中国語 · McConaughey ボイス",
      ko: "중국어 · McConaughey 음색",
    },
    meta: "AI Voice Clone",
    ai: true,
    hue: 340,
    subtitle: "我们曾仰望星空，思索着自己在群星中的位置。",
  },
  {
    flag: "🇯🇵",
    lang: "日本語",
    name: "日本語 吹替",
    displayName: { en: "Japanese dub", zh: "日语配音", ja: "日本語吹替", ko: "일본어 더빙" },
    meta: "AI Voice Clone",
    ai: true,
    hue: 15,
    subtitle: "かつて僕らは空を見上げ、星々の中の居場所を思った。",
  },
  {
    flag: "🇪🇸",
    lang: "Español",
    name: "Español Latino",
    displayName: {
      en: "Latin American Spanish",
      zh: "拉美西语配音",
      ja: "ラテンアメリカスペイン語",
      ko: "라틴 아메리카 스페인어",
    },
    meta: "AI Dub",
    ai: true,
    hue: 45,
    subtitle: "Solíamos mirar al cielo y preguntarnos nuestro lugar entre las estrellas.",
  },
  {
    flag: "🇰🇷",
    lang: "한국어",
    name: "한국어 더빙",
    displayName: { en: "Korean dub", zh: "韩语配音", ja: "韓国語吹替", ko: "한국어 더빙" },
    meta: "AI Voice Clone",
    ai: true,
    hue: 275,
    subtitle: "우리는 하늘을 올려다보며 별들 사이의 우리 자리를 생각하곤 했다.",
  },
];
