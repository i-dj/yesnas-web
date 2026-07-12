import { createFileRoute, useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Activity,
  Bell,
  Box,
  Bot,
  BrainCircuit,
  Calendar,
  Cpu,
  Database,
  Download,
  FileSearch,
  FileText,
  Film,
  FolderTree,
  Gauge,
  GitBranch,
  HardDrive,
  Image as ImageIcon,
  Languages,
  Layers,
  Lightbulb,
  ListChecks,
  MapPin,
  MemoryStick,
  MessageSquare,
  Mic,
  MousePointerClick,
  Music,
  Network,
  Pause,
  Play,
  Receipt,
  ScanFace,
  Search,
  Send,
  Server,
  Share2,
  Shield,
  Sparkles,
  Star,
  Subtitles,
  Terminal,
  Upload,
  Users,
  Wand2,
  Workflow,
  Zap,
  Github,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
} from "lucide-react";
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
import { demoFallbacks } from "@/i18n/demoFallbacks";
import {
  localeFromPathname,
  localeOptions,
  localeToLegalPath,
  localeToPath,
  type LocaleCode,
} from "@/i18n/locales";
import { homeHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => homeHead("en"),
  component: Landing,
});

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type ScreenId =
  | "assistant"
  | "dashboard"
  | "files"
  | "photos"
  | "media"
  | "ai"
  | "llm"
  | "automation"
  | "storage"
  | "shares"
  | "docker"
  | "hardware"
  | "tasks"
  | "users"
  | "logs";

type LocalizedText = { en: string } & Partial<Record<LocaleCode, string>>;

const NAV = [
  {
    id: "assistant",
    label: {
      en: "AI Assistant",
      zh: "AI 助手",
      ja: "AI アシスタント",
      de: "KI-Assistent",
      fr: "Assistant IA",
      es: "Asistente IA",
      ko: "AI 어시스턴트",
      pt: "Assistente IA",
    },
    icon: Sparkles,
    group: "MAIN",
  },
  {
    id: "dashboard",
    label: {
      en: "Dashboard",
      zh: "控制台",
      ja: "ダッシュボード",
      de: "Dashboard",
      fr: "Tableau de bord",
      es: "Panel",
      ko: "대시보드",
      pt: "Painel",
    },
    icon: Gauge,
    group: "MAIN",
  },
  {
    id: "files",
    label: {
      en: "Files",
      zh: "文件",
      ja: "ファイル",
      de: "Dateien",
      fr: "Fichiers",
      es: "Archivos",
      ko: "파일",
      pt: "Arquivos",
    },
    icon: FileSearch,
    group: "AI",
  },
  {
    id: "photos",
    label: {
      en: "Photos",
      zh: "相册",
      ja: "写真",
      de: "Fotos",
      fr: "Photos",
      es: "Fotos",
      ko: "사진",
      pt: "Fotos",
    },
    icon: ImageIcon,
    group: "AI",
  },
  {
    id: "media",
    label: {
      en: "Media",
      zh: "影音",
      ja: "メディア",
      de: "Medien",
      fr: "Médias",
      es: "Medios",
      ko: "미디어",
      pt: "Mídia",
    },
    icon: Film,
    group: "AI",
  },
  { id: "docker", label: { en: "Docker" }, icon: Box, group: "SYSTEM" },
  {
    id: "llm",
    label: {
      en: "Local AI",
      zh: "本地 AI",
      ja: "ローカル AI",
      de: "Lokale KI",
      fr: "IA locale",
      es: "IA local",
      ko: "로컬 AI",
      pt: "IA local",
    },
    icon: Bot,
    group: "SYSTEM",
  },
  {
    id: "storage",
    label: {
      en: "Storage",
      zh: "存储",
      ja: "ストレージ",
      de: "Speicher",
      fr: "Stockage",
      es: "Almacenamiento",
      ko: "스토리지",
      pt: "Armazenamento",
    },
    icon: HardDrive,
    group: "SYSTEM",
  },
  {
    id: "shares",
    label: {
      en: "Shares",
      zh: "共享",
      ja: "共有",
      de: "Freigaben",
      fr: "Partages",
      es: "Compartidos",
      ko: "공유",
      pt: "Compartilhamentos",
    },
    icon: Share2,
    group: "SYSTEM",
  },
  {
    id: "hardware",
    label: {
      en: "Hardware",
      zh: "硬件信息",
      ja: "ハードウェア",
      de: "Hardware",
      fr: "Matériel",
      es: "Hardware",
      ko: "하드웨어",
      pt: "Hardware",
    },
    icon: Cpu,
    group: "SYSTEM",
  },
  {
    id: "tasks",
    label: {
      en: "Tasks",
      zh: "任务",
      ja: "タスク",
      de: "Aufgaben",
      fr: "Tâches",
      es: "Tareas",
      ko: "작업",
      pt: "Tarefas",
    },
    icon: ListChecks,
    group: "SYSTEM",
  },
  {
    id: "users",
    label: {
      en: "Users",
      zh: "用户",
      ja: "ユーザー",
      de: "Benutzer",
      fr: "Utilisateurs",
      es: "Usuarios",
      ko: "사용자",
      pt: "Usuários",
    },
    icon: Users,
    group: "SYSTEM",
  },
  {
    id: "logs",
    label: {
      en: "Logs",
      zh: "日志",
      ja: "ログ",
      de: "Protokolle",
      fr: "Journaux",
      es: "Registros",
      ko: "로그",
      pt: "Logs",
    },
    icon: FileText,
    group: "SYSTEM",
  },
] as const;

const GROUP_LABELS: Record<(typeof NAV)[number]["group"], LocalizedText> = {
  MAIN: {
    en: "MAIN",
    zh: "主要",
    ja: "メイン",
    de: "HAUPT",
    fr: "PRINCIPAL",
    es: "PRINCIPAL",
    ko: "메인",
    pt: "PRINCIPAL",
  },
  AI: { en: "AI", zh: "AI 应用", ja: "AI", de: "KI", fr: "IA", es: "IA", ko: "AI", pt: "IA" },
  SYSTEM: {
    en: "SYSTEM",
    zh: "系统",
    ja: "システム",
    de: "SYSTEM",
    fr: "SYSTÈME",
    es: "SISTEMA",
    ko: "시스템",
    pt: "SISTEMA",
  },
};

function useCurrentLocale() {
  const location = useLocation();
  return localeFromPathname(location.pathname);
}

function pickLocale(locale: LocaleCode, copy: LocalizedText) {
  return copy[locale] ?? demoFallbacks[locale]?.[copy.en] ?? copy.en;
}

const tx = (locale: LocaleCode, copy: LocalizedText) => pickLocale(locale, copy);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Landing() {
  const { i18n } = useTranslation();
  const locale = useCurrentLocale();

  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale);
  }

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <Marquee />
      <CompatibilityModules />

      <DemoStrip />
      <StackSection />
      <FAQSection />
      <CTA />
      <Footer />
    </div>
  );
}

function Header() {
  const { t } = useTranslation();
  const language = useCurrentLocale();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const selectedLanguageLabel =
    localeOptions.find((locale) => locale.code === language)?.label ?? language;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!langOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!langRef.current?.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [langOpen]);
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1320px] px-6 h-14 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <Logo className="h-6" />
        </a>
        <nav className="hidden md:flex flex-none items-center gap-8 text-sm text-muted-foreground">
          <a href="#demo" className="hover:text-foreground transition-colors">
            {t("nav.demo")}
          </a>
          <a href="#features" className="hover:text-foreground transition-colors">
            {t("nav.intro")}
          </a>
          <a href="#ai-apps" className="hover:text-foreground transition-colors">
            {t("nav.aiApps")}
          </a>
          <a href="#stack" className="hover:text-foreground transition-colors">
            {t("nav.deploy")}
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            {t("nav.faq")}
          </a>
        </nav>
        <div className="flex flex-none items-center gap-2">
          <div ref={langRef} className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((open) => !open)}
              className="hidden sm:inline-flex max-w-52 cursor-pointer items-center justify-center gap-2 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Languages className="size-4 flex-none" />
              <span className="min-w-0 truncate">{selectedLanguageLabel}</span>
              <ChevronDown
                className={`size-4 flex-none transition-transform ${langOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.16 }}
                  className="absolute right-0 top-[calc(100%+0.5rem)] w-56 rounded-xl border border-border bg-card/95 p-2 shadow-panel backdrop-blur-xl"
                >
                  {localeOptions.map((locale) => {
                    const active = locale.code === language;
                    return (
                      <a
                        key={locale.code}
                        href={localeToPath(locale.code)}
                        onClick={() => setLangOpen(false)}
                        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                          active
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                        }`}
                      >
                        <span className="min-w-0 truncate">{locale.label}</span>
                        {active && <Check className="size-3.5 text-brand" />}
                      </a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <a
            href="https://github.com/i-dj/yesnas"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5"
          >
            <Github className="size-4" /> {t("nav.github")}
          </a>
        </div>
      </div>
    </header>
  );
}

function Logo({ className = "h-6" }: { className?: string }) {
  return (
    <img
      src={logoUrl}
      alt="YesNAS"
      className={`${className} w-auto select-none`}
      draggable={false}
    />
  );
}

function LogoMark() {
  return <Logo className="h-6" />;
}

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative pt-28 pb-24 bg-hero">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <motion.div style={{ y, opacity }} className="relative mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02]"
        >
          {t("hero.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
        >
          {t("hero.desc")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-9 flex items-center justify-center gap-3"
        >
          <InstallCommand command="curl -fsSL https://yesnas.com/install | sh" />
        </motion.div>
      </motion.div>

      {/* Hero product preview */}
      <div id="demo" className="relative mx-auto max-w-[1320px] px-6 mt-20 scroll-mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <ProductDemo />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Product Demo — animated cursor cycling through screens              */
/* ------------------------------------------------------------------ */

type Step = {
  screen: ScreenId;
  target: { x: number; y: number }; // percentages of demo area
  label?: string;
  hold?: number;
};

const STEPS: Step[] = [
  { screen: "assistant", target: { x: 14, y: 18 }, hold: 1400 },
  { screen: "assistant", target: { x: 55, y: 22 }, label: "自然语言提问", hold: 1800 },
  { screen: "assistant", target: { x: 45, y: 62 }, label: "跨类型语义结果", hold: 1800 },
  { screen: "dashboard", target: { x: 14, y: 25 }, label: "控制台" },
  { screen: "dashboard", target: { x: 55, y: 32 }, label: "今日增量与建议", hold: 1600 },
  { screen: "files", target: { x: 14, y: 40 }, label: "文件" },
  { screen: "files", target: { x: 55, y: 30 }, label: "找蓝色跑车的照片", hold: 1800 },
  { screen: "photos", target: { x: 14, y: 47 }, label: "相册" },
  { screen: "photos", target: { x: 62, y: 30 }, label: "AI 人脸识别", hold: 1500 },
  { screen: "media", target: { x: 14, y: 55 }, label: "影音" },
  { screen: "media", target: { x: 65, y: 22 }, label: "TMDB 自动刮削", hold: 1600 },
  { screen: "media", target: { x: 48, y: 65 }, label: "AI 剧情摘要", hold: 1500 },
  { screen: "llm", target: { x: 14, y: 62 }, label: "本地 AI" },
  { screen: "llm", target: { x: 40, y: 42 }, label: "加载 Qwen2.5-14B", hold: 1600 },
  { screen: "llm", target: { x: 72, y: 82 }, label: "本地对话 + RAG", hold: 1800 },
  { screen: "automation", target: { x: 60, y: 45 }, label: "一句话生成工作流", hold: 1800 },
  { screen: "docker", target: { x: 14, y: 78 }, label: "Docker" },
  { screen: "docker", target: { x: 55, y: 55 }, label: "查看容器", hold: 1400 },
  { screen: "hardware", target: { x: 14, y: 86 }, label: "硬件信息" },
  { screen: "hardware", target: { x: 50, y: 55 }, label: "CPU · 内存 · 磁盘", hold: 1600 },
  { screen: "tasks", target: { x: 14, y: 90 }, label: "任务" },
  { screen: "tasks", target: { x: 60, y: 40 }, label: "自动快照进度", hold: 1500 },
  { screen: "users", target: { x: 14, y: 94 }, label: "用户" },
  { screen: "users", target: { x: 55, y: 45 }, label: "本机 & SMB 账号", hold: 1400 },
  { screen: "logs", target: { x: 14, y: 98 }, label: "日志" },
  { screen: "logs", target: { x: 60, y: 30 }, label: "90 天审计", hold: 1500 },
  { screen: "assistant", target: { x: 14, y: 18 }, label: "回到 AI 助手", hold: 1200 },
];

function ProductDemo() {
  const [screen, setScreen] = useState<ScreenId>("photos");

  return (
    <div className="relative rounded-2xl border border-border bg-card/60 backdrop-blur shadow-panel overflow-hidden">
      {/* window chrome */}
      <div className="flex items-center gap-2 px-4 h-9 border-b border-border bg-background/40">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-yellow-500/70" />
          <span className="size-2.5 rounded-full bg-success/80" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="text-xs text-muted-foreground font-mono">yesnas.local</div>
        </div>
        <div className="w-10" />
      </div>

      {/* app body */}
      <div className="relative aspect-[16/9] flex">
        <MockSidebar active={screen} onSelect={setScreen} />
        <div className="flex-1 relative bg-background overflow-hidden">
          <div className="relative h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 overflow-hidden"
              >
                {screen === "assistant" && <ScreenAssistant />}
                {screen === "dashboard" && <ScreenDashboard />}
                {screen === "files" && <ScreenFiles />}
                {screen === "ai" && <ScreenAI />}
                {screen === "llm" && <ScreenLLM />}
                {screen === "photos" && <ScreenPhotos />}
                {screen === "media" && <ScreenMedia />}
                {screen === "automation" && <ScreenAutomation />}
                {screen === "storage" && <ScreenStorage />}
                {screen === "shares" && <ScreenShares />}
                {screen === "docker" && <ScreenDocker />}
                {screen === "hardware" && <ScreenHardware />}
                {screen === "tasks" && <ScreenTasks />}
                {screen === "users" && <ScreenUsers />}
                {screen === "logs" && <ScreenLogs />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function CursorSVG() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      className="drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]"
    >
      <path
        d="M3 2 L3 18 L8 14 L11 20 L14 19 L11 13 L18 13 Z"
        fill="white"
        stroke="black"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Mock UI parts                                                       */
/* ------------------------------------------------------------------ */

function MockSidebar({
  active,
  onSelect,
}: {
  active: ScreenId;
  onSelect?: (id: ScreenId) => void;
}) {
  const groups = ["MAIN", "AI", "SYSTEM"] as const;
  const [assistantHintDismissed, setAssistantHintDismissed] = useState(false);
  const locale = useCurrentLocale();
  return (
    <aside className="w-[210px] shrink-0 border-r border-border bg-card/40 py-4 px-3 hidden sm:block">
      <div className="flex items-center gap-2 px-2 pb-4">
        <Logo className="h-5" />
      </div>
      <div className="space-y-4">
        {groups.map((g) => (
          <div key={g}>
            <div className="px-2 text-[10px] font-medium tracking-widest text-muted-foreground/70">
              {pickLocale(locale, GROUP_LABELS[g])}
            </div>
            <div className="mt-1 space-y-0.5">
              {NAV.filter((n) => n.group === g).map((n) => {
                const isActive = active === (n.id as ScreenId);
                const isAssistantHint =
                  n.id === "assistant" && !isActive && !assistantHintDismissed;
                const Icon = n.icon;
                return (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      if (n.id === "assistant") setAssistantHintDismissed(true);
                      onSelect?.(n.id as ScreenId);
                    }}
                    className={`relative flex w-full items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-left transition-colors ${
                      isActive
                        ? "bg-accent text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-md ring-1 ring-border"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <motion.span
                      className="relative inline-flex items-center"
                      animate={isAssistantHint ? { opacity: [0.62, 1, 0.62] } : { opacity: 1 }}
                      transition={
                        isAssistantHint
                          ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                          : undefined
                      }
                    >
                      <Icon className="size-3.5" />
                    </motion.span>
                    <motion.span
                      className="relative"
                      animate={isAssistantHint ? { opacity: [0.62, 1, 0.62] } : { opacity: 1 }}
                      transition={
                        isAssistantHint
                          ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                          : undefined
                      }
                    >
                      {pickLocale(locale, n.label)}
                    </motion.span>
                    {isAssistantHint && (
                      <motion.span
                        aria-hidden
                        className="relative ml-2 text-white/90 pointer-events-none"
                        animate={{ opacity: [0.5, 1, 0.5], x: [0, -1.5, 0] }}
                        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <MousePointerClick className="size-3.5" />
                      </motion.span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ---- Screen: Dashboard ---- */
function ScreenDashboard() {
  const locale = useCurrentLocale();
  const copy = {
    greeting: {
      en: "Good evening, Dongjie.",
      zh: "晚上好，东杰。",
      ja: "こんばんは、Dongjie。",
      de: "Guten Abend, Dongjie.",
      fr: "Bonsoir, Dongjie.",
      es: "Buenas noches, Dongjie.",
      ko: "좋은 저녁입니다, Dongjie.",
      pt: "Boa noite, Dongjie.",
    },
    done: {
      en: "Your NAS finished these things today:",
      zh: "今天 NAS 帮你完成了这些事——",
      ja: "今日、NAS が完了したこと:",
      de: "Dein NAS hat heute erledigt:",
      fr: "Votre NAS a termine aujourd'hui:",
      es: "Tu NAS completo hoy:",
      ko: "오늘 NAS가 완료한 작업:",
      pt: "Seu NAS concluiu hoje:",
    },
    brief: {
      en: "AI daily brief · 22:47",
      zh: "AI 每日简报 · 22:47",
      ja: "AI デイリーブリーフ · 22:47",
      de: "KI-Tagesbrief · 22:47",
      fr: "Brief IA quotidien · 22:47",
      es: "Informe diario IA · 22:47",
      ko: "AI 일일 브리핑 · 22:47",
      pt: "Resumo diario de IA · 22:47",
    },
    photos: {
      en: "new photos",
      zh: "新增照片",
      ja: "新規写真",
      de: "neue Fotos",
      fr: "nouvelles photos",
      es: "fotos nuevas",
      ko: "새 사진",
      pt: "novas fotos",
    },
    videos: {
      en: "new videos",
      zh: "新增视频",
      ja: "新規動画",
      de: "neue Videos",
      fr: "nouvelles videos",
      es: "videos nuevos",
      ko: "새 영상",
      pt: "novos videos",
    },
    pdfs: {
      en: "new PDFs",
      zh: "新增 PDF",
      ja: "新規 PDF",
      de: "neue PDFs",
      fr: "nouveaux PDF",
      es: "PDF nuevos",
      ko: "새 PDF",
      pt: "novos PDFs",
    },
    aiRecognized: {
      en: "AI recognized",
      zh: "AI 识别",
      ja: "AI 認識",
      de: "KI erkannt",
      fr: "IA reconnue",
      es: "IA reconocio",
      ko: "AI 인식",
      pt: "IA reconheceu",
    },
    peoplePlaces: {
      en: "7 people · 18 places",
      zh: "7 人 · 18 地点",
      ja: "7人 · 18か所",
      de: "7 Personen · 18 Orte",
      fr: "7 personnes · 18 lieux",
      es: "7 personas · 18 lugares",
      ko: "7명 · 장소 18곳",
      pt: "7 pessoas · 18 locais",
    },
    duplicates: {
      en: "duplicate photos",
      zh: "重复照片",
      ja: "重複写真",
      de: "doppelte Fotos",
      fr: "photos en double",
      es: "fotos duplicadas",
      ko: "중복 사진",
      pt: "fotos duplicadas",
    },
    release: {
      en: "suggested cleanup",
      zh: "建议释放",
      ja: "解放候補",
      de: "Bereinigung empfohlen",
      fr: "nettoyage suggere",
      es: "limpieza sugerida",
      ko: "정리 권장",
      pt: "limpeza sugerida",
    },
    systemInfo: {
      en: "System info",
      zh: "系统信息",
      ja: "システム情報",
      de: "Systeminfo",
      fr: "Infos systeme",
      es: "Info del sistema",
      ko: "시스템 정보",
      pt: "Info do sistema",
    },
    refresh: {
      en: "last refreshed 00:13:57",
      zh: "最后刷新 00:13:57",
      ja: "最終更新 00:13:57",
      de: "zuletzt aktualisiert 00:13:57",
      fr: "actualise 00:13:57",
      es: "actualizado 00:13:57",
      ko: "마지막 새로고침 00:13:57",
      pt: "atualizado 00:13:57",
    },
    power: {
      en: "Power",
      zh: "电源",
      ja: "電源",
      de: "Strom",
      fr: "Alimentation",
      es: "Energia",
      ko: "전원",
      pt: "Energia",
    },
    ac: {
      en: "AC power",
      zh: "AC 供电",
      ja: "AC 給電",
      de: "Netzbetrieb",
      fr: "Secteur",
      es: "Corriente CA",
      ko: "AC 전원",
      pt: "Energia AC",
    },
    host: {
      en: "Host",
      zh: "主机名",
      ja: "ホスト名",
      de: "Host",
      fr: "Hote",
      es: "Host",
      ko: "호스트",
      pt: "Host",
    },
    fan: {
      en: "Fan",
      zh: "风扇",
      ja: "ファン",
      de: "Luefter",
      fr: "Ventilateur",
      es: "Ventilador",
      ko: "팬",
      pt: "Ventoinha",
    },
    watt: {
      en: "Power draw",
      zh: "功耗",
      ja: "消費電力",
      de: "Leistungsaufnahme",
      fr: "Consommation",
      es: "Consumo",
      ko: "소비 전력",
      pt: "Consumo",
    },
    status: {
      en: "System status",
      zh: "系统状态",
      ja: "システム状態",
      de: "Systemstatus",
      fr: "Etat systeme",
      es: "Estado del sistema",
      ko: "시스템 상태",
      pt: "Status do sistema",
    },
    normal: {
      en: "Running normally",
      zh: "运行正常",
      ja: "正常稼働",
      de: "Laeuft normal",
      fr: "Fonctionnement normal",
      es: "Funcionando normal",
      ko: "정상 실행",
      pt: "Normal",
    },
    uptime: {
      en: "up for 4 days 08 hours",
      zh: "已连续运行 4 天 08 小时",
      ja: "4日08時間連続稼働",
      de: "seit 4 Tagen 08 Stunden aktiv",
      fr: "actif depuis 4 jours 08 heures",
      es: "activo 4 dias 08 horas",
      ko: "4일 08시간 연속 실행",
      pt: "ativo ha 4 dias 08 horas",
    },
    systemDisk: {
      en: "System disk",
      zh: "系统盘",
      ja: "システムディスク",
      de: "Systemplatte",
      fr: "Disque systeme",
      es: "Disco del sistema",
      ko: "시스템 디스크",
      pt: "Disco do sistema",
    },
    healthy: {
      en: "healthy",
      zh: "健康",
      ja: "正常",
      de: "gesund",
      fr: "sain",
      es: "sano",
      ko: "정상",
      pt: "saudavel",
    },
    load: {
      en: "Load",
      zh: "负载",
      ja: "負荷",
      de: "Last",
      fr: "Charge",
      es: "Carga",
      ko: "부하",
      pt: "Carga",
    },
    loadSub: {
      en: "5 min 0.20 · 15 min 0.20",
      zh: "5 分钟 0.20 · 15 分钟 0.20",
      ja: "5分 0.20 · 15分 0.20",
      de: "5 Min. 0,20 · 15 Min. 0,20",
      fr: "5 min 0,20 · 15 min 0,20",
      es: "5 min 0.20 · 15 min 0.20",
      ko: "5분 0.20 · 15분 0.20",
      pt: "5 min 0,20 · 15 min 0,20",
    },
    diskIo: {
      en: "Disk IO",
      zh: "磁盘 IO",
      ja: "ディスク IO",
      de: "Disk-IO",
      fr: "IO disque",
      es: "IO de disco",
      ko: "디스크 IO",
      pt: "IO de disco",
    },
    readWrite: {
      en: "read 0 B/s · write 0 B/s",
      zh: "读 0 B/s · 写 0 B/s",
      ja: "読み 0 B/s · 書き 0 B/s",
      de: "Lesen 0 B/s · Schreiben 0 B/s",
      fr: "lecture 0 B/s · ecriture 0 B/s",
      es: "lectura 0 B/s · escritura 0 B/s",
      ko: "읽기 0 B/s · 쓰기 0 B/s",
      pt: "leitura 0 B/s · escrita 0 B/s",
    },
    bandwidth: {
      en: "Network bandwidth",
      zh: "网络带宽",
      ja: "ネットワーク帯域",
      de: "Netzwerkbandbreite",
      fr: "Bande passante reseau",
      es: "Ancho de banda",
      ko: "네트워크 대역폭",
      pt: "Largura de banda",
    },
    realtimeNics: {
      en: "realtime · all NICs",
      zh: "实时 · 全部网卡",
      ja: "リアルタイム · 全NIC",
      de: "Echtzeit · alle NICs",
      fr: "temps reel · toutes cartes",
      es: "tiempo real · todas las NIC",
      ko: "실시간 · 모든 NIC",
      pt: "tempo real · todas as NICs",
    },
    receive: {
      en: "receive",
      zh: "接收",
      ja: "受信",
      de: "Empfangen",
      fr: "reception",
      es: "recibir",
      ko: "수신",
      pt: "receber",
    },
    send: {
      en: "send",
      zh: "发送",
      ja: "送信",
      de: "Senden",
      fr: "envoi",
      es: "enviar",
      ko: "송신",
      pt: "enviar",
    },
    allNics: {
      en: "All NICs",
      zh: "全部网卡",
      ja: "全NIC",
      de: "Alle NICs",
      fr: "Toutes cartes",
      es: "Todas las NIC",
      ko: "모든 NIC",
      pt: "Todas as NICs",
    },
    realtime: {
      en: "Live",
      zh: "实时",
      ja: "リアルタイム",
      de: "Live",
      fr: "Temps reel",
      es: "En vivo",
      ko: "실시간",
      pt: "Ao vivo",
    },
    hour: {
      en: "1 hour",
      zh: "1小时",
      ja: "1時間",
      de: "1 Stunde",
      fr: "1 heure",
      es: "1 hora",
      ko: "1시간",
      pt: "1 hora",
    },
    day: {
      en: "1 day",
      zh: "1天",
      ja: "1日",
      de: "1 Tag",
      fr: "1 jour",
      es: "1 dia",
      ko: "1일",
      pt: "1 dia",
    },
    week: {
      en: "1 week",
      zh: "1周",
      ja: "1週",
      de: "1 Woche",
      fr: "1 semaine",
      es: "1 semana",
      ko: "1주",
      pt: "1 semana",
    },
    month: {
      en: "1 month",
      zh: "1月",
      ja: "1か月",
      de: "1 Monat",
      fr: "1 mois",
      es: "1 mes",
      ko: "1개월",
      pt: "1 mes",
    },
    computeEngine: {
      en: "Compute engine",
      zh: "计算引擎",
      ja: "計算エンジン",
      de: "Compute-Engine",
      fr: "Moteur de calcul",
      es: "Motor de computo",
      ko: "컴퓨트 엔진",
      pt: "Motor de computacao",
    },
    computeSub: {
      en: "Local AI and NAS service scheduling",
      zh: "本地 AI 与 NAS 服务调度",
      ja: "ローカルAIとNASサービスのスケジューリング",
      de: "Lokale KI- und NAS-Dienstplanung",
      fr: "Planification IA locale et services NAS",
      es: "Planificacion de IA local y servicios NAS",
      ko: "로컬 AI 및 NAS 서비스 스케줄링",
      pt: "Agendamento de IA local e servicos NAS",
    },
    cores: {
      en: "Cores",
      zh: "核心",
      ja: "コア",
      de: "Kerne",
      fr: "Coeurs",
      es: "Nucleos",
      ko: "코어",
      pt: "Nucleos",
    },
    fourThreads: {
      en: "4 cores 4 threads",
      zh: "4 核 4 线程",
      ja: "4コア 4スレッド",
      de: "4 Kerne 4 Threads",
      fr: "4 coeurs 4 threads",
      es: "4 nucleos 4 hilos",
      ko: "4코어 4스레드",
      pt: "4 nucleos 4 threads",
    },
    memory: {
      en: "Memory",
      zh: "内存",
      ja: "メモリ",
      de: "Speicher",
      fr: "Memoire",
      es: "Memoria",
      ko: "메모리",
      pt: "Memoria",
    },
    used: {
      en: "Used",
      zh: "已用",
      ja: "使用済み",
      de: "Belegt",
      fr: "Utilise",
      es: "Usado",
      ko: "사용됨",
      pt: "Usado",
    },
    available: {
      en: "Available",
      zh: "可用",
      ja: "利用可能",
      de: "Verfuegbar",
      fr: "Disponible",
      es: "Disponible",
      ko: "사용 가능",
      pt: "Disponivel",
    },
    mediaEngine: {
      en: "Media engine",
      zh: "媒体引擎",
      ja: "メディアエンジン",
      de: "Medien-Engine",
      fr: "Moteur media",
      es: "Motor multimedia",
      ko: "미디어 엔진",
      pt: "Motor de midia",
    },
    mediaSub: {
      en: "Video transcoding · image recognition acceleration",
      zh: "影音转码 · 图像识别加速",
      ja: "動画変換 · 画像認識アクセラレーション",
      de: "Videotranscoding · Bilderkennung beschleunigt",
      fr: "Transcodage video · acceleration vision",
      es: "Transcodificacion · aceleracion visual",
      ko: "영상 트랜스코딩 · 이미지 인식 가속",
      pt: "Transcodificacao · aceleracao visual",
    },
    vram: {
      en: "VRAM",
      zh: "显存",
      ja: "VRAM",
      de: "VRAM",
      fr: "VRAM",
      es: "VRAM",
      ko: "VRAM",
      pt: "VRAM",
    },
    shared2: {
      en: "shared 2 GB",
      zh: "共享 2 GB",
      ja: "共有 2 GB",
      de: "geteilt 2 GB",
      fr: "partage 2 Go",
      es: "compartido 2 GB",
      ko: "공유 2 GB",
      pt: "compartilhado 2 GB",
    },
    temperature: {
      en: "Temperature",
      zh: "温度",
      ja: "温度",
      de: "Temperatur",
      fr: "Temperature",
      es: "Temperatura",
      ko: "온도",
      pt: "Temperatura",
    },
    storagePools: {
      en: "Storage pools",
      zh: "存储池",
      ja: "ストレージプール",
      de: "Speicherpools",
      fr: "Pools de stockage",
      es: "Pools de almacenamiento",
      ko: "스토리지 풀",
      pt: "Pools de armazenamento",
    },
    pools: {
      en: "pools",
      zh: "存储池",
      ja: "プール",
      de: "Pools",
      fr: "pools",
      es: "pools",
      ko: "풀",
      pt: "pools",
    },
    mounted: {
      en: "Mounted",
      zh: "已挂载",
      ja: "マウント済み",
      de: "Eingehaengt",
      fr: "Monte",
      es: "Montado",
      ko: "마운트됨",
      pt: "Montado",
    },
    abnormal: {
      en: "Abnormal",
      zh: "异常",
      ja: "異常",
      de: "Abnormal",
      fr: "Anormal",
      es: "Anormal",
      ko: "이상",
      pt: "Anormal",
    },
    fileSharing: {
      en: "File sharing",
      zh: "文件共享",
      ja: "ファイル共有",
      de: "Dateifreigabe",
      fr: "Partage de fichiers",
      es: "Compartir archivos",
      ko: "파일 공유",
      pt: "Compartilhamento",
    },
    sharedFolders: {
      en: "shared folders",
      zh: "共享目录",
      ja: "共有フォルダ",
      de: "Freigaben",
      fr: "dossiers partages",
      es: "carpetas compartidas",
      ko: "공유 폴더",
      pt: "pastas compartilhadas",
    },
    onlineUsers: {
      en: "online users",
      zh: "在线用户",
      ja: "オンラインユーザー",
      de: "Online-Nutzer",
      fr: "utilisateurs en ligne",
      es: "usuarios en linea",
      ko: "온라인 사용자",
      pt: "usuarios online",
    },
    online: {
      en: "online",
      zh: "在线",
      ja: "オンライン",
      de: "online",
      fr: "en ligne",
      es: "en linea",
      ko: "온라인",
      pt: "online",
    },
    dockerContainers: {
      en: "Docker containers",
      zh: "Docker 容器",
      ja: "Docker コンテナ",
      de: "Docker-Container",
      fr: "Conteneurs Docker",
      es: "Contenedores Docker",
      ko: "Docker 컨테이너",
      pt: "Containers Docker",
    },
    images: {
      en: "images",
      zh: "镜像",
      ja: "イメージ",
      de: "Images",
      fr: "images",
      es: "imagenes",
      ko: "이미지",
      pt: "imagens",
    },
    containers: {
      en: "containers",
      zh: "容器",
      ja: "コンテナ",
      de: "Container",
      fr: "conteneurs",
      es: "contenedores",
      ko: "컨테이너",
      pt: "containers",
    },
    running: {
      en: "Running",
      zh: "运行中",
      ja: "実行中",
      de: "Laeuft",
      fr: "En cours",
      es: "En ejecucion",
      ko: "실행 중",
      pt: "Em execucao",
    },
    stopped: {
      en: "Stopped",
      zh: "已停止",
      ja: "停止済み",
      de: "Gestoppt",
      fr: "Arrete",
      es: "Detenido",
      ko: "중지됨",
      pt: "Parado",
    },
  };
  return (
    <div className="p-3.5 space-y-2.5 h-full overflow-hidden text-[12px]">
      {/* AI briefing banner */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-brand/40 bg-gradient-to-r from-brand/10 via-brand-2/5 to-transparent p-2.5"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-brand" />
          <span className="text-[12px] font-semibold">{tx(locale, copy.greeting)}</span>
          <span className="text-[12px] text-muted-foreground">{tx(locale, copy.done)}</span>
          <span className="ml-auto text-[12px] text-muted-foreground">
            {tx(locale, copy.brief)}
          </span>
        </div>
        <div className="mt-1.5 grid grid-cols-6 gap-1.5 text-[12px]">
          {[
            { n: "432", l: copy.photos, tone: "brand" },
            { n: "12", l: copy.videos, tone: "brand-2" },
            { n: "5", l: copy.pdfs, tone: "brand" },
            { n: tx(locale, copy.peoplePlaces), l: copy.aiRecognized, tone: "brand-2" },
            { n: "63", l: copy.duplicates, tone: "brand" },
            { n: "128 GB", l: copy.release, tone: "brand-2" },
          ].map((k) => (
            <div
              key={k.l.en}
              className="rounded border border-border/60 bg-background/60 px-1.5 py-1"
            >
              <div
                className={`text-[12px] font-semibold ${k.tone === "brand" ? "text-brand" : "text-brand-2"}`}
              >
                {k.n}
              </div>
              <div className="text-muted-foreground truncate">{tx(locale, k.l)}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* header row */}
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold text-foreground">{tx(locale, copy.systemInfo)}</div>
        <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success animate-pulse-dot" />
          {tx(locale, copy.refresh)}
        </div>
        <div className="ml-auto flex items-center gap-4 text-[12px] text-muted-foreground">
          <span>
            ⏻ {tx(locale, copy.power)}{" "}
            <span className="text-foreground">{tx(locale, copy.ac)}</span>
          </span>
          <span>
            ▤ {tx(locale, copy.host)} <span className="text-foreground">yesnas</span>
          </span>
          <span>
            ❈ {tx(locale, copy.fan)} <span className="text-foreground">1240 RPM</span>
          </span>
          <span>
            ⚡ {tx(locale, copy.watt)} <span className="text-foreground">14.6 W</span>
          </span>
        </div>
      </div>

      {/* top stat row */}
      <div className="grid grid-cols-4 gap-2.5">
        <StatBig
          label={tx(locale, copy.status)}
          value={tx(locale, copy.normal)}
          sub={tx(locale, copy.uptime)}
          icon={Shield}
          accent="success"
        />
        <StatBig
          label={tx(locale, copy.systemDisk)}
          value="61.3%"
          sub={`561 GB / 916 GB · ${tx(locale, copy.healthy)}`}
          icon={HardDrive}
          progress={61.3}
        />
        <StatBig
          label={tx(locale, copy.load)}
          value="0.30"
          sub={tx(locale, copy.loadSub)}
          icon={Activity}
        />
        <StatBig
          label={tx(locale, copy.diskIo)}
          value="0 B/s"
          sub={tx(locale, copy.readWrite)}
          icon={Database}
        />
      </div>

      {/* middle row: chart + hardware */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="col-span-2 rounded-lg border border-border bg-card p-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[12px] font-medium">{tx(locale, copy.bandwidth)}</div>
              <div className="text-[12px] text-muted-foreground">
                {tx(locale, copy.realtimeNics)}
              </div>
            </div>
            <div className="flex items-start gap-4 text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">↓ {tx(locale, copy.receive)}</span>
                <span className="font-medium">474 B/s</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">↑ {tx(locale, copy.send)}</span>
                <span className="font-medium">1.43 KB/s</span>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-0.5 rounded-md bg-muted/60 p-0.5 text-[12px]">
              {[copy.realtime, copy.hour, copy.day, copy.week, copy.month].map((t, i) => (
                <span
                  key={t.en}
                  className={`px-2 py-0.5 rounded ${
                    i === 0 ? "bg-background text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {tx(locale, t)}
                </span>
              ))}
            </div>
            <div className="text-[12px] px-2 py-0.5 rounded border border-border text-muted-foreground">
              {tx(locale, copy.allNics)} ▾
            </div>
          </div>
          <NetChart />
          <div className="flex justify-between text-[12px] text-muted-foreground/70 mt-1 px-1">
            {["-16s", "-14s", "-12s", "-10s", "-8s", "-6s", "-4s", "-2s", "now"].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
          <div className="flex justify-center gap-3 text-[12px] mt-1">
            <span className="flex items-center gap-1 text-muted-foreground">
              <span className="w-3 h-px bg-brand" /> {tx(locale, copy.send)}
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <span className="w-3 h-px bg-brand-2" /> {tx(locale, copy.receive)}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <HardwareRow
            title={tx(locale, copy.computeEngine)}
            subtitle={tx(locale, copy.computeSub)}
            percent={1.5}
            tone="brand"
            rows={[
              [tx(locale, copy.cores), tx(locale, copy.fourThreads)],
              [tx(locale, copy.fan), "1240 RPM"],
              [tx(locale, copy.power), "6.2 W"],
            ]}
          />
          <HardwareRow
            title={tx(locale, copy.memory)}
            subtitle="15.4 GB · DDR5 · 4800MHz"
            percent={23}
            tone="brand-2"
            rows={[
              [tx(locale, copy.used), "3.54 GB"],
              [tx(locale, copy.available), "11.9 GB"],
            ]}
          />
          <HardwareRow
            title={tx(locale, copy.mediaEngine)}
            subtitle={tx(locale, copy.mediaSub)}
            percent={12}
            tone="brand"
            rows={[
              [tx(locale, copy.vram), tx(locale, copy.shared2)],
              [tx(locale, copy.power), "1.8 W"],
              [tx(locale, copy.temperature), "42 °C"],
            ]}
          />
        </div>
      </div>

      {/* bottom summary row */}
      <div className="grid grid-cols-3 gap-2.5">
        <SummaryCard
          icon={Layers}
          title={tx(locale, copy.storagePools)}
          kpis={[
            ["4", tx(locale, copy.pools)],
            ["4", tx(locale, copy.healthy)],
          ]}
          rows={[
            { label: tx(locale, copy.mounted), value: "4", tone: "muted" },
            { label: tx(locale, copy.abnormal), value: "0", tone: "success" },
          ]}
        />
        <SummaryCard
          icon={Share2}
          title={tx(locale, copy.fileSharing)}
          kpis={[
            ["12", tx(locale, copy.sharedFolders)],
            ["6", tx(locale, copy.onlineUsers)],
          ]}
          rows={[
            { label: "SMB", value: `2 ${tx(locale, copy.online)}`, tone: "success" },
            { label: "FTP", value: `2 ${tx(locale, copy.online)}`, tone: "success" },
            { label: "NFS", value: `0 ${tx(locale, copy.online)}`, tone: "muted" },
            { label: "WebDAV", value: `4 ${tx(locale, copy.online)}`, tone: "success" },
          ]}
          fourCols
        />
        <SummaryCard
          icon={Box}
          title={tx(locale, copy.dockerContainers)}
          kpis={[
            ["2", tx(locale, copy.images)],
            ["2", tx(locale, copy.containers)],
          ]}
          rows={[
            { label: tx(locale, copy.running), value: "2", tone: "success" },
            { label: tx(locale, copy.stopped), value: "0", tone: "muted" },
          ]}
        />
      </div>
    </div>
  );
}

function StatBig({
  label,
  value,
  sub,
  icon: Icon,
  progress,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ComponentType<{ className?: string }>;
  progress?: number;
  accent?: "success";
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-2.5">
      <div className="flex items-center justify-between text-muted-foreground">
        <div className="text-[12px]">{label}</div>
        <div
          className={`size-5 rounded grid place-items-center ${
            accent === "success" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
          }`}
        >
          <Icon className="size-3" />
        </div>
      </div>
      <div className="mt-1 text-base font-semibold tracking-tight text-foreground">{value}</div>
      {progress !== undefined && (
        <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-gradient-brand"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      )}
      <div className="mt-1.5 text-[11px] text-muted-foreground truncate">{sub}</div>
    </div>
  );
}

function HardwareRow({
  title,
  subtitle,
  percent,
  tone,
  rows,
}: {
  title: string;
  subtitle: string;
  percent: number;
  tone: "brand" | "brand-2" | "muted";
  rows: [string, string][];
}) {
  const color =
    tone === "brand"
      ? "oklch(0.68 0.18 275)"
      : tone === "brand-2"
        ? "oklch(0.78 0.14 195)"
        : "oklch(0.5 0.02 265)";
  const r = 12;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  return (
    <div className="rounded-lg border border-border bg-card p-2.5">
      <div className="flex items-baseline gap-1.5">
        <span className="text-[12px] font-semibold">{title}</span>
        <span className="text-[11px] text-muted-foreground truncate">{subtitle}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-2.5">
        <svg width="34" height="34" viewBox="0 0 32 32">
          <circle
            cx="16"
            cy="16"
            r={r}
            fill="none"
            stroke="oklch(0.28 0.018 265)"
            strokeWidth="2.5"
          />
          <motion.circle
            cx="16"
            cy="16"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            transform="rotate(-90 16 16)"
            initial={{ strokeDasharray: `0 ${c}` }}
            animate={{ strokeDasharray: `${dash} ${c}` }}
            transition={{ duration: 1 }}
          />
          <text
            x="16"
            y="18"
            textAnchor="middle"
            fontSize="8"
            fill="currentColor"
            className="text-foreground font-medium"
          >
            {percent}%
          </text>
        </svg>
        <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between col-span-2">
              <span className="text-muted-foreground">{k}</span>
              <span className="font-medium text-foreground">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  title,
  kpis,
  rows,
  fourCols,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  kpis: [string, string][];
  rows: { label: string; value: string; tone: "success" | "muted" }[];
  fourCols?: boolean;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className="size-3.5 text-brand" />
          <span className="text-[11px] font-medium">{title}</span>
        </div>
        <div className="flex items-center gap-2.5 text-[12px]">
          {kpis.map(([n, l]) => (
            <span key={l}>
              <span className="font-semibold text-foreground">{n}</span>{" "}
              <span className="text-muted-foreground">{l}</span>
            </span>
          ))}
        </div>
      </div>
      <div className={`mt-2 grid gap-1.5 ${fourCols ? "grid-cols-4" : "grid-cols-2"}`}>
        {rows.map((r) => (
          <div
            key={r.label}
            className="rounded border border-border/60 bg-background/40 px-1.5 py-1"
          >
            <div className="flex items-center gap-1 text-[11px]">
              <span
                className={`size-1 rounded-full ${
                  r.tone === "success" ? "bg-success" : "bg-muted-foreground"
                }`}
              />
              <span className="text-muted-foreground">{r.label}</span>
            </div>
            <div className="text-[12px] font-semibold text-foreground">{r.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  progress,
  accent,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  progress?: number;
  accent?: "success";
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center justify-between text-muted-foreground">
        <div className="text-[12px]">{label}</div>
        <Icon className={`size-3.5 ${accent === "success" ? "text-success" : ""}`} />
      </div>
      <div className="mt-1 text-lg font-semibold tracking-tight">{value}</div>
      {progress !== undefined && (
        <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-gradient-brand"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </div>
      )}
    </div>
  );
}

function NetChart() {
  const pathA =
    "M0,60 C30,20 60,45 90,50 C120,55 150,20 180,30 C210,40 240,55 270,50 C300,45 330,52 360,50";
  const pathB =
    "M0,80 C30,75 60,78 90,76 C120,74 150,80 180,78 C210,76 240,82 270,80 C300,78 330,82 360,80";
  return (
    <svg viewBox="0 0 360 100" preserveAspectRatio="none" className="mt-2 w-full h-[70px]">
      <defs>
        <linearGradient id="ga" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.68 0.18 275)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="oklch(0.68 0.18 275)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={pathA}
        fill="none"
        stroke="oklch(0.68 0.18 275)"
        strokeWidth="1.6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />
      <path d={`${pathA} L360,100 L0,100 Z`} fill="url(#ga)" />
      <motion.path
        d={pathB}
        fill="none"
        stroke="oklch(0.78 0.14 195)"
        strokeWidth="1.4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.1 }}
      />
    </svg>
  );
}

function RingRow({
  label,
  value,
  unit,
  tone,
}: {
  label: string;
  value: number;
  unit: string;
  tone: "brand" | "brand-2" | "muted";
}) {
  const color =
    tone === "brand"
      ? "oklch(0.68 0.18 275)"
      : tone === "brand-2"
        ? "oklch(0.78 0.14 195)"
        : "oklch(0.5 0.02 265)";
  const r = 14;
  const c = 2 * Math.PI * r;
  const dash = (value / 100) * c;
  return (
    <div className="flex items-center gap-3">
      <svg width="38" height="38" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={r} fill="none" stroke="oklch(0.3 0.02 265)" strokeWidth="3" />
        <motion.circle
          cx="20"
          cy="20"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          transform="rotate(-90 20 20)"
          initial={{ strokeDasharray: `0 ${c}` }}
          animate={{ strokeDasharray: `${dash} ${c}` }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </svg>
      <div className="flex-1 min-w-0">
        <div className="text-[12px] text-muted-foreground truncate">{label}</div>
        <div className="text-xs font-medium">
          {value}
          <span className="text-muted-foreground">{unit}</span>
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: Storage ---- */
function ScreenStorage() {
  const locale = useCurrentLocale();
  const copy = {
    tabs: [
      {
        en: "Local storage",
        zh: "本地存储",
        ja: "ローカルストレージ",
        de: "Lokaler Speicher",
        fr: "Stockage local",
        es: "Almacenamiento local",
        ko: "로컬 스토리지",
        pt: "Armazenamento local",
      },
      {
        en: "Network storage",
        zh: "网络存储",
        ja: "ネットワークストレージ",
        de: "Netzwerkspeicher",
        fr: "Stockage réseau",
        es: "Almacenamiento de red",
        ko: "네트워크 스토리지",
        pt: "Armazenamento de rede",
      },
      {
        en: "Removable storage",
        zh: "可移动存储",
        ja: "リムーバブルストレージ",
        de: "Wechselspeicher",
        fr: "Stockage amovible",
        es: "Almacenamiento extraíble",
        ko: "이동식 스토리지",
        pt: "Armazenamento removível",
      },
    ],
    addLocal: {
      en: "+ Add local storage",
      zh: "+ 添加本地存储",
      ja: "+ ローカルストレージを追加",
      de: "+ Lokalen Speicher hinzufügen",
      fr: "+ Ajouter un stockage local",
      es: "+ Añadir almacenamiento local",
      ko: "+ 로컬 스토리지 추가",
      pt: "+ Adicionar armazenamento local",
    },
    localDisks: {
      en: "Local disks",
      zh: "本地磁盘",
      ja: "ローカルディスク",
      de: "Lokale Laufwerke",
      fr: "Disques locaux",
      es: "Discos locales",
      ko: "로컬 디스크",
      pt: "Discos locais",
    },
    pools: {
      en: "Local storage pools",
      zh: "本地存储池",
      ja: "ローカルストレージプール",
      de: "Lokale Speicherpools",
      fr: "Pools de stockage locaux",
      es: "Pools de almacenamiento local",
      ko: "로컬 스토리지 풀",
      pt: "Pools de armazenamento local",
    },
    used: {
      en: "Used",
      zh: "已使用",
      ja: "使用中",
      de: "Belegt",
      fr: "Utilisé",
      es: "Usado",
      ko: "사용 중",
      pt: "Usado",
    },
    available: {
      en: "Available",
      zh: "可用",
      ja: "利用可能",
      de: "Verfügbar",
      fr: "Disponible",
      es: "Disponible",
      ko: "사용 가능",
      pt: "Disponível",
    },
    diskUnit: {
      en: "disks",
      zh: "盘",
      ja: "台",
      de: "Laufwerke",
      fr: "disques",
      es: "discos",
      ko: "디스크",
      pt: "discos",
    },
    capacity: {
      en: "Capacity used",
      zh: "容量使用",
      ja: "容量使用",
      de: "Kapazität belegt",
      fr: "Capacité utilisée",
      es: "Capacidad usada",
      ko: "용량 사용",
      pt: "Capacidade usada",
    },
    read: {
      en: "Read speed",
      zh: "读取速度",
      ja: "読み取り速度",
      de: "Lesegeschwindigkeit",
      fr: "Vitesse lecture",
      es: "Velocidad lectura",
      ko: "읽기 속도",
      pt: "Velocidade de leitura",
    },
    write: {
      en: "Write speed",
      zh: "写入速度",
      ja: "書き込み速度",
      de: "Schreibgeschwindigkeit",
      fr: "Vitesse écriture",
      es: "Velocidad escritura",
      ko: "쓰기 속도",
      pt: "Velocidade de gravação",
    },
    latency: {
      en: "Latency",
      zh: "延迟",
      ja: "レイテンシ",
      de: "Latenz",
      fr: "Latence",
      es: "Latencia",
      ko: "지연 시간",
      pt: "Latência",
    },
  };
  const disks = [
    { name: "Lexar SSD ARES 4TB", cap: "3.73 TiB", used: true },
    { name: "WDC WD5000LUCT", cap: "465.76 GiB", used: true },
    { name: "HGST HTS545050A7E680", cap: "465.76 GiB", used: true },
    { name: "SaiChi K300 SSD", cap: "223.57 GiB", used: false },
  ];
  return (
    <div className="p-4 space-y-3 h-full">
      <div className="flex gap-2">
        {copy.tabs.map((t, i) => (
          <div
            key={t.en}
            className={`text-[12px] px-3 py-1.5 rounded-md border ${
              i === 0 ? "bg-accent border-border" : "border-border/60 text-muted-foreground"
            }`}
          >
            {pickLocale(locale, t)}
          </div>
        ))}
        <div className="ml-auto text-[12px] px-3 py-1.5 rounded-md bg-foreground text-background">
          {pickLocale(locale, copy.addLocal)}
        </div>
      </div>
      <div>
        <div className="text-xs font-medium mb-2">{pickLocale(locale, copy.localDisks)}</div>
        <div className="grid grid-cols-4 gap-3">
          {disks.map((d, i) => (
            <motion.div
              key={d.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-border bg-card p-3"
            >
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-medium truncate">{d.name}</div>
                <span
                  className={`text-[12px] px-1.5 py-0.5 rounded ${
                    d.used ? "bg-muted text-muted-foreground" : "bg-success/20 text-success"
                  }`}
                >
                  {d.used ? pickLocale(locale, copy.used) : pickLocale(locale, copy.available)}
                </span>
              </div>
              <div className="mt-1.5 text-base font-semibold">{d.cap}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-medium mb-2">{pickLocale(locale, copy.pools)}</div>
        <div className="space-y-2">
          {[
            {
              name: {
                en: "Main pool",
                zh: "主存储池",
                ja: "メインプール",
                de: "Hauptpool",
                fr: "Pool principal",
                es: "Pool principal",
                ko: "메인 풀",
                pt: "Pool principal",
              },
              type: "SINGLE · BTRFS",
              used: 1,
              disks: 1,
              read: "1.2 GB/s",
              write: "980 MB/s",
              iops: "12.5K",
              latency: "2.1 ms",
              temp: "34°C",
              health: "HEALTHY",
            },
            {
              name: {
                en: "Fast media pool",
                zh: "高速媒体池",
                ja: "高速メディアプール",
                de: "Schneller Medienpool",
                fr: "Pool média rapide",
                es: "Pool multimedia rápido",
                ko: "고속 미디어 풀",
                pt: "Pool de mídia rápido",
              },
              type: "RAID0 · BTRFS",
              used: 1,
              disks: 3,
              read: "2.8 GB/s",
              write: "1.6 GB/s",
              iops: "28.3K",
              latency: "1.4 ms",
              temp: "38°C",
              health: "HEALTHY",
            },
          ].map((p, i) => (
            <motion.div
              key={p.name.en}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-lg border border-border bg-card p-3 hover:border-border/80 transition-colors"
            >
              {/* Top: identity + capacity */}
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-lg bg-success/15 text-success grid place-items-center shrink-0 border border-success/20">
                  <Layers className="size-4" />
                </div>
                <div className="w-44 shrink-0">
                  <div className="text-xs font-semibold text-foreground">
                    {pickLocale(locale, p.name)}
                  </div>
                  <div className="text-[12px] text-muted-foreground uppercase tracking-wider">
                    {p.type} · {p.disks} {pickLocale(locale, copy.diskUnit)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[12px] text-muted-foreground uppercase tracking-wider">
                      {pickLocale(locale, copy.capacity)}
                    </span>
                    <div className="text-[12px] font-mono tabular-nums">
                      <span className="text-foreground font-medium">12.23 GiB</span>
                      <span className="text-muted-foreground/60 mx-1">/</span>
                      <span className="text-muted-foreground">2.82 TiB</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-brand"
                      initial={{ width: 0 }}
                      animate={{ width: `${p.used}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom: performance grid */}
              <div className="grid grid-cols-5 gap-2 pt-3 mt-3 border-t border-border/50">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-medium text-muted-foreground/60 uppercase tracking-tighter">
                    {pickLocale(locale, copy.read)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Upload className="size-3 text-brand" />
                    <span className="text-[12px] font-medium text-foreground font-mono tabular-nums">
                      {p.read}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-medium text-muted-foreground/60 uppercase tracking-tighter">
                    {pickLocale(locale, copy.write)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Download className="size-3 text-purple-400" />
                    <span className="text-[12px] font-medium text-foreground font-mono tabular-nums">
                      {p.write}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-medium text-muted-foreground/60 uppercase tracking-tighter">
                    IOPS
                  </span>
                  <div className="flex items-center gap-1">
                    <Zap className="size-3 text-amber-400" />
                    <span className="text-[12px] font-medium text-foreground font-mono tabular-nums">
                      {p.iops}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[12px] font-medium text-muted-foreground/60 uppercase tracking-tighter">
                    {pickLocale(locale, copy.latency)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Activity className="size-3 text-indigo-400" />
                    <span className="text-[12px] font-medium text-foreground font-mono tabular-nums">
                      {p.latency}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <div className="flex flex-col items-end gap-0.5">
                    <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
                      <Cpu className="size-3" />
                      <span className="font-mono tabular-nums">{p.temp}</span>
                    </div>
                    <span className="text-[12px] px-2 py-0.5 rounded-full bg-success/15 text-success border border-success/20 font-medium uppercase tracking-wider">
                      {p.health}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: Shares ---- */
function ScreenShares() {
  const locale = useCurrentLocale();
  const copy = {
    title: {
      en: "File sharing",
      zh: "文件共享",
      ja: "ファイル共有",
      de: "Dateifreigabe",
      fr: "Partage de fichiers",
      es: "Compartición de archivos",
      ko: "파일 공유",
      pt: "Compartilhamento de arquivos",
    },
    subtitle: {
      en: "Manage sharing protocols in one place. 4/4 protocols enabled.",
      zh: "统一管理共享协议，当前已启用 4/4 个协议。",
      ja: "共有プロトコルを一元管理。現在 4/4 プロトコルが有効です。",
      de: "Freigabeprotokolle zentral verwalten. 4/4 Protokolle aktiviert.",
      fr: "Gérez les protocoles de partage au même endroit. 4/4 activés.",
      es: "Gestiona los protocolos de uso compartido. 4/4 activados.",
      ko: "공유 프로토콜을 한곳에서 관리합니다. 4/4개 활성화됨.",
      pt: "Gerencie protocolos de compartilhamento em um só lugar. 4/4 ativos.",
    },
    add: {
      en: "+ New share",
      zh: "+ 新建共享",
      ja: "+ 新規共有",
      de: "+ Neue Freigabe",
      fr: "+ Nouveau partage",
      es: "+ Nuevo recurso",
      ko: "+ 새 공유",
      pt: "+ Novo compartilhamento",
    },
    sharedFolders: {
      en: "Shared folders",
      zh: "共享目录",
      ja: "共有フォルダ",
      de: "Freigegebene Ordner",
      fr: "Dossiers partagés",
      es: "Carpetas compartidas",
      ko: "공유 폴더",
      pt: "Pastas compartilhadas",
    },
    totalFolders: {
      en: "5 folders",
      zh: "共 5 个目录",
      ja: "5 個のフォルダ",
      de: "5 Ordner",
      fr: "5 dossiers",
      es: "5 carpetas",
      ko: "폴더 5개",
      pt: "5 pastas",
    },
    online: {
      en: "online",
      zh: "在线",
      ja: "オンライン",
      de: "online",
      fr: "en ligne",
      es: "en línea",
      ko: "온라인",
      pt: "online",
    },
    readWrite: {
      en: "RW",
      zh: "读写",
      ja: "読書",
      de: "RW",
      fr: "L/E",
      es: "L/E",
      ko: "읽기/쓰기",
      pt: "L/E",
    },
    readonly: {
      en: "RO",
      zh: "只读",
      ja: "読取",
      de: "Nur lesen",
      fr: "Lecture",
      es: "Solo lectura",
      ko: "읽기 전용",
      pt: "Somente leitura",
    },
  };
  const shares = [
    {
      name: "SMB",
      desc: "smb://yesnas:445",
      note: {
        en: "LAN file access",
        zh: "局域网文件访问",
        ja: "LAN ファイルアクセス",
        de: "Dateizugriff im LAN",
        fr: "Accès fichiers LAN",
        es: "Acceso a archivos LAN",
        ko: "LAN 파일 접근",
        pt: "Acesso a arquivos LAN",
      },
      on: true,
    },
    {
      name: "FTP",
      desc: "ftp://yesnas:21",
      note: {
        en: "Legacy client support",
        zh: "兼容旧客户端",
        ja: "旧クライアント対応",
        de: "Ältere Clients",
        fr: "Clients anciens",
        es: "Clientes antiguos",
        ko: "기존 클라이언트 호환",
        pt: "Clientes legados",
      },
      on: true,
    },
    {
      name: "WebDAV",
      desc: "http://yesnas:8088",
      note: {
        en: "HTTP remote mount",
        zh: "HTTP 远程挂载",
        ja: "HTTP リモートマウント",
        de: "HTTP-Remote-Mount",
        fr: "Montage distant HTTP",
        es: "Montaje remoto HTTP",
        ko: "HTTP 원격 마운트",
        pt: "Montagem remota HTTP",
      },
      on: true,
    },
    {
      name: "NFS",
      desc: "yesnas:/",
      note: {
        en: "Linux / server mount",
        zh: "Linux / 服务器挂载",
        ja: "Linux / サーバーマウント",
        de: "Linux / Server-Mount",
        fr: "Montage Linux / serveur",
        es: "Montaje Linux / servidor",
        ko: "Linux / 서버 마운트",
        pt: "Montagem Linux / servidor",
      },
      on: true,
    },
  ];
  const sharedFolders = [
    {
      name: {
        en: "Work documents",
        zh: "工作文档",
        ja: "仕事ドキュメント",
        de: "Arbeitsdokumente",
        fr: "Documents de travail",
        es: "Documentos de trabajo",
        ko: "업무 문서",
        pt: "Documentos de trabalho",
      },
      path: "/mnt/pool1/work",
      protocols: ["SMB"],
      users: 12,
      size: "1.2 TB",
      readonly: false,
    },
    {
      name: {
        en: "Family media",
        zh: "家庭影音",
        ja: "家族メディア",
        de: "Familienmedien",
        fr: "Médias famille",
        es: "Medios familiares",
        ko: "가족 미디어",
        pt: "Mídia da família",
      },
      path: "/mnt/pool1/media",
      protocols: ["SMB", "WebDAV"],
      users: 3,
      size: "4.5 TB",
      readonly: false,
    },
    {
      name: {
        en: "Backup data",
        zh: "备份数据",
        ja: "バックアップデータ",
        de: "Backupdaten",
        fr: "Données de sauvegarde",
        es: "Datos de copia",
        ko: "백업 데이터",
        pt: "Dados de backup",
      },
      path: "/mnt/pool2/backup",
      protocols: ["NFS"],
      users: 2,
      size: "8.7 TB",
      readonly: true,
    },
    {
      name: {
        en: "Dev repositories",
        zh: "开发仓库",
        ja: "開発リポジトリ",
        de: "Entwicklungsrepos",
        fr: "Dépôts dev",
        es: "Repositorios dev",
        ko: "개발 저장소",
        pt: "Repositórios dev",
      },
      path: "/mnt/pool1/dev",
      protocols: ["FTP", "WebDAV"],
      users: 5,
      size: "256 GB",
      readonly: false,
    },
    {
      name: {
        en: "Public assets",
        zh: "公共素材",
        ja: "共有素材",
        de: "Öffentliche Assets",
        fr: "Ressources publiques",
        es: "Recursos públicos",
        ko: "공용 자료",
        pt: "Materiais públicos",
      },
      path: "/mnt/pool1/public",
      protocols: ["SMB", "NFS"],
      users: 8,
      size: "620 GB",
      readonly: false,
    },
  ];
  return (
    <div className="p-4 space-y-3 h-full">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold">{pickLocale(locale, copy.title)}</div>
          <div className="text-[12px] text-muted-foreground">
            {pickLocale(locale, copy.subtitle)}
          </div>
        </div>
        <div className="text-[12px] px-3 py-1.5 rounded-md bg-foreground text-background">
          {pickLocale(locale, copy.add)}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {shares.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-lg border border-border bg-card p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-medium">
                <Network className="size-3.5 text-brand" />
                {s.name}
              </div>
              <ToggleOn on={s.on} />
            </div>
            <div className="mt-3 text-[12px] text-muted-foreground">
              {pickLocale(locale, s.note)}
            </div>
            <div className="mt-3 font-mono text-[12px] px-2 py-1 rounded bg-muted/60 border border-border">
              {s.desc}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="px-3 py-2 border-b border-border flex items-center gap-2">
          <FolderTree className="size-3.5 text-brand" />
          <span className="text-xs font-medium">{pickLocale(locale, copy.sharedFolders)}</span>
          <span className="ml-auto text-[12px] text-muted-foreground">
            {pickLocale(locale, copy.totalFolders)}
          </span>
        </div>
        <div className="divide-y divide-border">
          {sharedFolders.map((folder, i) => (
            <motion.div
              key={folder.name.en}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="px-3 py-2.5 flex items-center gap-3 hover:bg-muted/30 transition-colors"
            >
              <div className="size-8 rounded-md bg-brand/10 text-brand grid place-items-center shrink-0">
                <HardDrive className="size-4" />
              </div>
              <div className="w-36 shrink-0">
                <div className="text-xs font-medium">{pickLocale(locale, folder.name)}</div>
                <div className="text-[12px] text-muted-foreground font-mono truncate">
                  {folder.path}
                </div>
              </div>
              <div className="flex-1 flex items-center gap-1.5">
                {folder.protocols.map((p) => (
                  <span
                    key={p}
                    className="text-[12px] px-1.5 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border"
                  >
                    {p}
                  </span>
                ))}
              </div>
              <div className="w-20 text-[12px] text-muted-foreground text-right">{folder.size}</div>
              <div className="w-20 flex items-center justify-end gap-1 text-[12px] text-muted-foreground">
                <Users className="size-3" />
                {folder.users} {pickLocale(locale, copy.online)}
              </div>
              <div className="w-16 text-right">
                <span className="text-[12px] px-1.5 py-0.5 rounded bg-success/15 text-success">
                  {pickLocale(locale, copy.online)}
                </span>
              </div>
              <div className="w-12 text-right">
                <span
                  className={`text-[12px] px-1.5 py-0.5 rounded border ${
                    folder.readonly
                      ? "bg-muted/40 text-muted-foreground border-border"
                      : "bg-brand/10 text-brand border-brand/20"
                  }`}
                >
                  {folder.readonly
                    ? pickLocale(locale, copy.readonly)
                    : pickLocale(locale, copy.readWrite)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToggleOn({ on }: { on: boolean }) {
  return (
    <div
      className={`w-8 h-4 rounded-full p-0.5 flex items-center transition-colors ${
        on ? "bg-success" : "bg-muted"
      }`}
    >
      <motion.div
        layout
        className="size-3 rounded-full bg-white"
        style={{ marginLeft: on ? "auto" : 0 }}
      />
    </div>
  );
}

/* ---- Screen: Docker ---- */
function ScreenDocker() {
  const locale = useCurrentLocale();
  const copy = {
    title: {
      en: "Docker",
      zh: "Docker",
      ja: "Docker",
      de: "Docker",
      fr: "Docker",
      es: "Docker",
      ko: "Docker",
      pt: "Docker",
    },
    subtitle: {
      en: "Containers, images, networks, volumes, and ports in one place",
      zh: "集中管理容器、镜像、网络、卷和端口",
      ja: "コンテナ、イメージ、ネットワーク、ボリューム、ポートを一元管理",
      de: "Container, Images, Netzwerke, Volumes und Ports an einem Ort",
      fr: "Conteneurs, images, réseaux, volumes et ports au même endroit",
      es: "Contenedores, imágenes, redes, volúmenes y puertos en un solo lugar",
      ko: "컨테이너, 이미지, 네트워크, 볼륨, 포트를 한곳에서 관리",
      pt: "Contêineres, imagens, redes, volumes e portas em um só lugar",
    },
    deploy: {
      en: "Deploy",
      zh: "部署",
      ja: "デプロイ",
      de: "Bereitstellen",
      fr: "Déployer",
      es: "Desplegar",
      ko: "배포",
      pt: "Implantar",
    },
    network: {
      en: "Network",
      zh: "网络",
      ja: "ネットワーク",
      de: "Netzwerk",
      fr: "Réseau",
      es: "Red",
      ko: "네트워크",
      pt: "Rede",
    },
    dockerDisk: {
      en: "Docker Disk",
      zh: "Docker 磁盘",
      ja: "Docker ディスク",
      de: "Docker-Disk",
      fr: "Disque Docker",
      es: "Disco Docker",
      ko: "Docker 디스크",
      pt: "Disco Docker",
    },
    ports: {
      en: "PORTS",
      zh: "端口",
      ja: "ポート",
      de: "Ports",
      fr: "Ports",
      es: "Puertos",
      ko: "포트",
      pt: "Portas",
    },
    containers: {
      en: "Containers",
      zh: "容器",
      ja: "コンテナ",
      de: "Container",
      fr: "Conteneurs",
      es: "Contenedores",
      ko: "컨테이너",
      pt: "Contêineres",
    },
    images: {
      en: "Images",
      zh: "镜像",
      ja: "イメージ",
      de: "Images",
      fr: "Images",
      es: "Imágenes",
      ko: "이미지",
      pt: "Imagens",
    },
    volumes: {
      en: "Volumes",
      zh: "存储卷",
      ja: "ボリューム",
      de: "Volumes",
      fr: "Volumes",
      es: "Volúmenes",
      ko: "볼륨",
      pt: "Volumes",
    },
    portMap: {
      en: "Port mapping",
      zh: "端口映射",
      ja: "ポートマッピング",
      de: "Portzuordnung",
      fr: "Mappage des ports",
      es: "Mapeo de puertos",
      ko: "포트 매핑",
      pt: "Mapeamento de portas",
    },
    activity: {
      en: "Recent activity",
      zh: "近期活动",
      ja: "最近のアクティビティ",
      de: "Letzte Aktivität",
      fr: "Activité récente",
      es: "Actividad reciente",
      ko: "최근 활동",
      pt: "Atividade recente",
    },
    runningCount: {
      en: "4 running",
      zh: "4 个运行中",
      ja: "4 件実行中",
      de: "4 laufen",
      fr: "4 actifs",
      es: "4 activos",
      ko: "4개 실행 중",
      pt: "4 em execução",
    },
    autoUpdate: {
      en: "auto update",
      zh: "自动更新",
      ja: "自動更新",
      de: "Auto-Update",
      fr: "mise à jour auto",
      es: "actualización auto",
      ko: "자동 업데이트",
      pt: "atualização automática",
    },
    health: {
      en: "healthy",
      zh: "健康",
      ja: "正常",
      de: "gesund",
      fr: "sain",
      es: "saludable",
      ko: "정상",
      pt: "saudável",
    },
    size: {
      en: "size",
      zh: "大小",
      ja: "サイズ",
      de: "Größe",
      fr: "taille",
      es: "tamaño",
      ko: "크기",
      pt: "tamanho",
    },
    usedBy: {
      en: "used by",
      zh: "被使用",
      ja: "使用中",
      de: "genutzt von",
      fr: "utilisé par",
      es: "usado por",
      ko: "사용 중",
      pt: "usado por",
    },
    bridge: {
      en: "bridge",
      zh: "桥接",
      ja: "ブリッジ",
      de: "Bridge",
      fr: "bridge",
      es: "bridge",
      ko: "브리지",
      pt: "bridge",
    },
    host: {
      en: "host",
      zh: "主机",
      ja: "ホスト",
      de: "Host",
      fr: "hôte",
      es: "host",
      ko: "호스트",
      pt: "host",
    },
  };
  const containers = [
    {
      name: "jellyfin",
      img: "jellyfin/jellyfin:latest",
      state: "running",
      cpu: 18,
      ram: 42,
      ports: "8096:8096",
      volume: "/media",
      net: "media-net",
      color: "brand",
    },
    {
      name: "code-server",
      img: "lscr.io/linuxserver/code…",
      state: "running",
      cpu: 9,
      ram: 28,
      ports: "8443:8443",
      volume: "/config",
      net: "dev-net",
      color: "brand-2",
    },
    {
      name: "mariadb",
      img: "mariadb:11",
      state: "stopped",
      cpu: 0,
      ram: 0,
      ports: "3306:3306",
      volume: "db-data",
      net: "backend",
      color: "muted",
    },
    {
      name: "redis",
      img: "redis:7-alpine",
      state: "running",
      cpu: 3,
      ram: 12,
      ports: "6379:6379",
      volume: "cache",
      net: "backend",
      color: "brand",
    },
    {
      name: "librespeed",
      img: "lscr.io/linuxserver/lib…",
      state: "paused",
      cpu: 0,
      ram: 18,
      ports: "8080:80",
      volume: "/config",
      net: "bridge",
      color: "muted",
    },
    {
      name: "homepage",
      img: "ghcr.io/gethomepage…",
      state: "running",
      cpu: 6,
      ram: 22,
      ports: "3000:3000",
      volume: "homepage",
      net: "frontend",
      color: "brand-2",
    },
  ];
  const images = [
    { name: "jellyfin/jellyfin", tag: "latest", size: "1.2 GB", age: "2d", used: "jellyfin" },
    {
      name: "linuxserver/code-server",
      tag: "4.101",
      size: "812 MB",
      age: "5d",
      used: "code-server",
    },
    { name: "mariadb", tag: "11", size: "407 MB", age: "18d", used: "mariadb" },
    { name: "redis", tag: "7-alpine", size: "42 MB", age: "21d", used: "redis" },
  ];
  const networks = [
    { name: "bridge", type: pickLocale(locale, copy.bridge), subnet: "172.18.0.0/16", attached: 4 },
    {
      name: "media-net",
      type: pickLocale(locale, copy.bridge),
      subnet: "172.19.0.0/16",
      attached: 1,
    },
    { name: "host", type: pickLocale(locale, copy.host), subnet: "host", attached: 1 },
  ];
  const volumes = [
    { name: "jellyfin-config", mount: "/config", size: "2.4 GB", used: "jellyfin" },
    { name: "media-library", mount: "/media", size: "4.5 TB", used: "jellyfin" },
    { name: "db-data", mount: "/var/lib/mysql", size: "18 GB", used: "mariadb" },
  ];
  const events = [
    {
      text: {
        en: "jellyfin image updated and container restarted",
        zh: "jellyfin 镜像已更新，容器已重启",
        ja: "jellyfin イメージを更新し、コンテナを再起動",
        de: "jellyfin-Image aktualisiert und Container neu gestartet",
        fr: "image jellyfin mise à jour et conteneur redémarré",
        es: "imagen jellyfin actualizada y contenedor reiniciado",
        ko: "jellyfin 이미지 업데이트 및 컨테이너 재시작",
        pt: "imagem jellyfin atualizada e contêiner reiniciado",
      },
      time: "10m",
    },
    {
      text: {
        en: "media-net assigned to homepage",
        zh: "media-net 已分配给 homepage",
        ja: "media-net を homepage に割り当て",
        de: "media-net wurde homepage zugewiesen",
        fr: "media-net attribué à homepage",
        es: "media-net asignada a homepage",
        ko: "media-net이 homepage에 할당됨",
        pt: "media-net atribuída ao homepage",
      },
      time: "38m",
    },
    {
      text: {
        en: "unused layers cleaned, 1.8 GB reclaimed",
        zh: "已清理未使用层，释放 1.8 GB",
        ja: "未使用レイヤーを削除し、1.8 GB 解放",
        de: "ungenutzte Layer bereinigt, 1,8 GB freigegeben",
        fr: "couches inutilisées nettoyées, 1,8 Go libérés",
        es: "capas sin usar limpiadas, 1,8 GB liberados",
        ko: "사용하지 않는 레이어 정리, 1.8 GB 확보",
        pt: "camadas não usadas limpas, 1,8 GB liberados",
      },
      time: "1h",
    },
  ];
  return (
    <div className="p-3.5 space-y-2.5 h-full overflow-hidden text-[12px]">
      <div className="flex items-center gap-2">
        <Box className="size-4 text-brand" />
        <div className="text-sm font-semibold">{pickLocale(locale, copy.title)}</div>
        <div className="text-[12px] text-muted-foreground">{pickLocale(locale, copy.subtitle)}</div>
        <div className="ml-auto text-[12px] text-success inline-flex items-center gap-1">
          <span className="size-1 rounded-full bg-success" />
          {pickLocale(locale, copy.runningCount)}
        </div>
        <button className="rounded-md border border-border bg-foreground px-2 py-1 text-[12px] font-medium text-background">
          + {pickLocale(locale, copy.deploy)}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-2.5">
        {[
          { label: "CPU", value: "22%", icon: Cpu, prog: 22 },
          { label: "RAM", value: "58%", icon: MemoryStick, prog: 58 },
          { label: pickLocale(locale, copy.network), value: "59.5 MB/s", icon: Network, prog: 40 },
          { label: pickLocale(locale, copy.dockerDisk), value: "39%", icon: Database, prog: 39 },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-border bg-card p-2.5">
            <div className="flex items-center justify-between text-[12px] text-muted-foreground">
              {s.label}
              <s.icon className="size-3" />
            </div>
            <div className="text-sm font-semibold mt-0.5">{s.value}</div>
            <div className="mt-1.5 h-1 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full bg-gradient-brand"
                initial={{ width: 0 }}
                animate={{ width: `${s.prog}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1.25fr_0.85fr] gap-2.5">
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border px-2.5 py-2">
            <Layers className="size-3 text-brand" />
            <span className="font-medium">{pickLocale(locale, copy.containers)}</span>
            <span className="ml-auto text-muted-foreground">6</span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border/50">
            {containers.map((c, i) => (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="bg-card p-2.5"
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`size-6 rounded-md grid place-items-center ${
                      c.color === "brand"
                        ? "bg-brand/20 text-brand"
                        : c.color === "brand-2"
                          ? "bg-brand-2/20 text-brand-2"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Box className="size-3.5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium truncate">{c.name}</div>
                    <div className="text-[11px] text-muted-foreground truncate">{c.img}</div>
                  </div>
                  <div className="ml-auto">
                    <StatePill state={c.state} locale={locale} />
                  </div>
                </div>
                <MiniSpark active={c.state === "running"} />
                <div className="mt-1.5 grid grid-cols-3 text-center text-[11px]">
                  <div>
                    <div className="font-medium text-foreground">{c.cpu}%</div>
                    <div className="text-muted-foreground">CPU</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{c.ram}%</div>
                    <div className="text-muted-foreground">RAM</div>
                  </div>
                  <div>
                    <div className="font-medium text-foreground">1</div>
                    <div className="text-muted-foreground">{pickLocale(locale, copy.ports)}</div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-1 text-[10.5px] text-muted-foreground">
                  <span className="truncate rounded bg-background/60 px-1.5 py-0.5">{c.ports}</span>
                  <span className="truncate rounded bg-background/60 px-1.5 py-0.5">
                    {c.volume}
                  </span>
                  <span className="truncate rounded bg-background/60 px-1.5 py-0.5">{c.net}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="space-y-2.5">
          <div className="rounded-lg border border-border bg-card overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border px-2.5 py-2">
              <Download className="size-3 text-brand" />
              <span className="font-medium">{pickLocale(locale, copy.images)}</span>
              <span className="ml-auto text-[11px] text-muted-foreground">
                {pickLocale(locale, copy.autoUpdate)}
              </span>
            </div>
            <div className="divide-y divide-border/70">
              {images.map((img) => (
                <div key={img.name} className="grid grid-cols-[1fr_auto] gap-2 px-2.5 py-1.5">
                  <div className="min-w-0">
                    <div className="truncate font-medium">{img.name}</div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {img.tag} · {pickLocale(locale, copy.size)} {img.size}
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-muted-foreground">
                    <div>{img.age}</div>
                    <div className="truncate">{img.used}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div className="rounded-lg border border-border bg-card p-2.5">
              <div className="mb-2 flex items-center gap-2">
                <Network className="size-3 text-brand" />
                <span className="font-medium">{pickLocale(locale, copy.network)}</span>
              </div>
              <div className="space-y-1.5">
                {networks.map((n) => (
                  <div
                    key={n.name}
                    className="rounded border border-border/60 bg-background/40 px-2 py-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{n.name}</span>
                      <span className="text-[11px] text-muted-foreground">{n.attached}</span>
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {n.type} · {n.subnet}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-border bg-card p-2.5">
              <div className="mb-2 flex items-center gap-2">
                <Database className="size-3 text-brand-2" />
                <span className="font-medium">{pickLocale(locale, copy.volumes)}</span>
              </div>
              <div className="space-y-1.5">
                {volumes.map((v) => (
                  <div
                    key={v.name}
                    className="rounded border border-border/60 bg-background/40 px-2 py-1.5"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate font-medium">{v.name}</span>
                      <span className="text-[11px] text-muted-foreground">{v.size}</span>
                    </div>
                    <div className="truncate text-[11px] text-muted-foreground">
                      {v.mount} · {pickLocale(locale, copy.usedBy)} {v.used}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1.15fr] gap-2.5">
        <div className="rounded-lg border border-border bg-card p-2.5">
          <div className="mb-2 flex items-center gap-2">
            <GitBranch className="size-3 text-brand" />
            <span className="font-medium">{pickLocale(locale, copy.portMap)}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {containers.map((c) => (
              <div
                key={c.name}
                className="rounded border border-border/60 bg-background/40 px-2 py-1.5"
              >
                <div className="truncate font-medium">{c.name}</div>
                <div className="text-[11px] text-muted-foreground">{c.ports}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-2.5">
          <div className="mb-2 flex items-center gap-2">
            <Terminal className="size-3 text-brand-2" />
            <span className="font-medium">{pickLocale(locale, copy.activity)}</span>
            <span className="ml-auto text-[11px] text-success">
              {pickLocale(locale, copy.health)}
            </span>
          </div>
          <div className="space-y-1.5">
            {events.map((event) => (
              <div
                key={event.time}
                className="flex items-center gap-2 rounded border border-border/60 bg-background/40 px-2 py-1.5"
              >
                <span className="size-1.5 rounded-full bg-brand-2" />
                <span className="min-w-0 flex-1 truncate">{pickLocale(locale, event.text)}</span>
                <span className="text-[11px] text-muted-foreground">{event.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatePill({ state, locale }: { state: string; locale: LocaleCode }) {
  const map: Record<string, string> = {
    running: "bg-success/20 text-success",
    stopped: "bg-muted text-muted-foreground",
    paused: "bg-yellow-500/20 text-yellow-500",
  };
  const labels: Record<string, LocalizedText> = {
    running: {
      en: "running",
      zh: "运行中",
      ja: "実行中",
      de: "läuft",
      fr: "actif",
      es: "activo",
      ko: "실행 중",
      pt: "em execução",
    },
    stopped: {
      en: "stopped",
      zh: "已停止",
      ja: "停止",
      de: "gestoppt",
      fr: "arrêté",
      es: "detenido",
      ko: "중지됨",
      pt: "parado",
    },
    paused: {
      en: "paused",
      zh: "已暂停",
      ja: "一時停止",
      de: "pausiert",
      fr: "en pause",
      es: "pausado",
      ko: "일시 중지",
      pt: "pausado",
    },
  };
  return (
    <span className={`text-[11px] px-1.5 py-0.5 rounded ${map[state]}`}>
      {pickLocale(locale, labels[state])}
    </span>
  );
}

function MiniSpark({ active }: { active: boolean }) {
  const path = "M0,20 L10,16 L20,18 L30,10 L40,14 L50,6 L60,12 L70,8 L80,14 L90,4 L100,10";
  return (
    <svg viewBox="0 0 100 24" className="mt-2 w-full h-8">
      <motion.path
        d={path}
        fill="none"
        stroke={active ? "oklch(0.68 0.18 275)" : "oklch(0.4 0.02 265)"}
        strokeWidth="1.4"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}

/* ---- Screen: Hardware ---- */
function ScreenHardware() {
  const locale = useCurrentLocale();
  const copy = {
    title: {
      en: "Hardware",
      zh: "硬件信息",
      ja: "ハードウェア",
      de: "Hardware",
      fr: "Materiel",
      es: "Hardware",
      ko: "하드웨어",
      pt: "Hardware",
    },
    realtime: {
      en: "Live",
      zh: "实时",
      ja: "リアルタイム",
      de: "Live",
      fr: "Temps reel",
      es: "En vivo",
      ko: "실시간",
      pt: "Ao vivo",
    },
    lastUpdated: {
      en: "Last updated 2026/7/5 21:51:36",
      zh: "最后更新 2026/7/5 21:51:36",
      ja: "最終更新 2026/7/5 21:51:36",
      de: "Zuletzt aktualisiert 2026/7/5 21:51:36",
      fr: "Derniere mise a jour 2026/7/5 21:51:36",
      es: "Ultima actualizacion 2026/7/5 21:51:36",
      ko: "마지막 업데이트 2026/7/5 21:51:36",
      pt: "Ultima atualizacao 2026/7/5 21:51:36",
    },
    device: {
      en: "Device name",
      zh: "设备名称",
      ja: "デバイス名",
      de: "Geraetename",
      fr: "Nom de l'appareil",
      es: "Nombre del dispositivo",
      ko: "장치 이름",
      pt: "Nome do dispositivo",
    },
    os: {
      en: "Operating system",
      zh: "操作系统",
      ja: "OS",
      de: "Betriebssystem",
      fr: "Systeme",
      es: "Sistema operativo",
      ko: "운영체제",
      pt: "Sistema operacional",
    },
    kernel: {
      en: "Kernel version",
      zh: "内核版本",
      ja: "カーネル版",
      de: "Kernel-Version",
      fr: "Version du noyau",
      es: "Version del kernel",
      ko: "커널 버전",
      pt: "Versao do kernel",
    },
    uptime: {
      en: "Uptime",
      zh: "运行时间",
      ja: "稼働時間",
      de: "Laufzeit",
      fr: "Temps actif",
      es: "Tiempo activo",
      ko: "가동 시간",
      pt: "Tempo ativo",
    },
    uptimeValue: {
      en: "7 days 5 hours",
      zh: "7 天 5 小时",
      ja: "7日 5時間",
      de: "7 Tage 5 Stunden",
      fr: "7 jours 5 heures",
      es: "7 dias 5 horas",
      ko: "7일 5시간",
      pt: "7 dias 5 horas",
    },
    board: {
      en: "Motherboard",
      zh: "主板",
      ja: "マザーボード",
      de: "Mainboard",
      fr: "Carte mere",
      es: "Placa base",
      ko: "메인보드",
      pt: "Placa-mae",
    },
    vendor: {
      en: "Vendor",
      zh: "制造商",
      ja: "メーカー",
      de: "Hersteller",
      fr: "Fabricant",
      es: "Fabricante",
      ko: "제조사",
      pt: "Fabricante",
    },
    product: {
      en: "Product model",
      zh: "产品型号",
      ja: "製品モデル",
      de: "Produktmodell",
      fr: "Modele",
      es: "Modelo",
      ko: "제품 모델",
      pt: "Modelo",
    },
    version: {
      en: "Version",
      zh: "版本",
      ja: "バージョン",
      de: "Version",
      fr: "Version",
      es: "Version",
      ko: "버전",
      pt: "Versao",
    },
    serial: {
      en: "Serial number",
      zh: "序列号",
      ja: "シリアル番号",
      de: "Seriennummer",
      fr: "Numero de serie",
      es: "Numero de serie",
      ko: "일련번호",
      pt: "Numero de serie",
    },
    gpu: {
      en: "Graphics processor",
      zh: "图形处理器",
      ja: "グラフィックプロセッサ",
      de: "Grafikprozessor",
      fr: "Processeur graphique",
      es: "Procesador grafico",
      ko: "그래픽 프로세서",
      pt: "Processador grafico",
    },
    usage: {
      en: "Usage",
      zh: "使用率",
      ja: "使用率",
      de: "Auslastung",
      fr: "Utilisation",
      es: "Uso",
      ko: "사용률",
      pt: "Uso",
    },
    vramTemp: {
      en: "VRAM / temp",
      zh: "显存 / 温度",
      ja: "VRAM / 温度",
      de: "VRAM / Temperatur",
      fr: "VRAM / temp.",
      es: "VRAM / temp.",
      ko: "VRAM / 온도",
      pt: "VRAM / temp.",
    },
    power: {
      en: "Power",
      zh: "功耗",
      ja: "電力",
      de: "Leistung",
      fr: "Puissance",
      es: "Potencia",
      ko: "전력",
      pt: "Energia",
    },
    compute: {
      en: "Compute node",
      zh: "计算节点",
      ja: "計算ノード",
      de: "Compute-Knoten",
      fr: "Noeud de calcul",
      es: "Nodo de computo",
      ko: "컴퓨트 노드",
      pt: "No de computacao",
    },
    computeSub: {
      en: "NAS services · AI tasks · low-power mode",
      zh: "NAS 服务 · AI 任务 · 低功耗运行",
      ja: "NASサービス · AIタスク · 低電力運転",
      de: "NAS-Dienste · KI-Aufgaben · Energiesparbetrieb",
      fr: "Services NAS · taches IA · basse consommation",
      es: "Servicios NAS · tareas IA · bajo consumo",
      ko: "NAS 서비스 · AI 작업 · 저전력 운전",
      pt: "Servicos NAS · tarefas IA · baixo consumo",
    },
    temp: {
      en: "Temperature",
      zh: "温度",
      ja: "温度",
      de: "Temperatur",
      fr: "Temperature",
      es: "Temperatura",
      ko: "온도",
      pt: "Temperatura",
    },
    fan: {
      en: "Fan",
      zh: "风扇",
      ja: "ファン",
      de: "Luefter",
      fr: "Ventilateur",
      es: "Ventilador",
      ko: "팬",
      pt: "Ventoinha",
    },
    load: {
      en: "Load",
      zh: "负载",
      ja: "負荷",
      de: "Last",
      fr: "Charge",
      es: "Carga",
      ko: "부하",
      pt: "Carga",
    },
    memory: {
      en: "Memory",
      zh: "内存",
      ja: "メモリ",
      de: "Speicher",
      fr: "Memoire",
      es: "Memoria",
      ko: "메모리",
      pt: "Memoria",
    },
    capacity: {
      en: "Capacity",
      zh: "容量",
      ja: "容量",
      de: "Kapazitaet",
      fr: "Capacite",
      es: "Capacidad",
      ko: "용량",
      pt: "Capacidade",
    },
    used: {
      en: "Used",
      zh: "已用",
      ja: "使用済み",
      de: "Belegt",
      fr: "Utilise",
      es: "Usado",
      ko: "사용됨",
      pt: "Usado",
    },
    available: {
      en: "Available",
      zh: "可用",
      ja: "利用可能",
      de: "Verfuegbar",
      fr: "Disponible",
      es: "Disponible",
      ko: "사용 가능",
      pt: "Disponivel",
    },
    network: {
      en: "Network",
      zh: "网络",
      ja: "ネットワーク",
      de: "Netzwerk",
      fr: "Reseau",
      es: "Red",
      ko: "네트워크",
      pt: "Rede",
    },
    upDown: {
      en: "Up/down",
      zh: "上/下行",
      ja: "上り/下り",
      de: "Up/down",
      fr: "Montee/descente",
      es: "Subida/bajada",
      ko: "업/다운",
      pt: "Envio/recebimento",
    },
    dailyAvg: {
      en: "Daily avg",
      zh: "日均",
      ja: "日平均",
      de: "Tagesmittel",
      fr: "Moyenne/jour",
      es: "Media diaria",
      ko: "일평균",
      pt: "Media diaria",
    },
    sensors: {
      en: "Sensors",
      zh: "传感器",
      ja: "センサー",
      de: "Sensoren",
      fr: "Capteurs",
      es: "Sensores",
      ko: "센서",
      pt: "Sensores",
    },
    caseTemp: {
      en: "Case temp",
      zh: "机箱温度",
      ja: "ケース温度",
      de: "Gehaeusetemp.",
      fr: "Temp. boitier",
      es: "Temp. caja",
      ko: "케이스 온도",
      pt: "Temp. do gabinete",
    },
    nvmeTemp: {
      en: "NVMe temp",
      zh: "NVMe 温度",
      ja: "NVMe 温度",
      de: "NVMe-Temp.",
      fr: "Temp. NVMe",
      es: "Temp. NVMe",
      ko: "NVMe 온도",
      pt: "Temp. NVMe",
    },
    disks: {
      en: "Disks",
      zh: "磁盘",
      ja: "ディスク",
      de: "Festplatten",
      fr: "Disques",
      es: "Discos",
      ko: "디스크",
      pt: "Discos",
    },
    diskSummary: {
      en: "4/4 healthy · 5.24 TB total · total IO 128 MB/s",
      zh: "4/4 健康 · 5.24 TB 总容量 · 总 IO 128 MB/s",
      ja: "4/4 正常 · 合計 5.24 TB · 総 IO 128 MB/s",
      de: "4/4 gesund · 5,24 TB gesamt · IO gesamt 128 MB/s",
      fr: "4/4 sains · 5,24 To total · IO total 128 MB/s",
      es: "4/4 sanos · 5.24 TB total · IO total 128 MB/s",
      ko: "4/4 정상 · 총 5.24 TB · 총 IO 128 MB/s",
      pt: "4/4 saudaveis · 5,24 TB total · IO total 128 MB/s",
    },
    inUse: {
      en: "In use",
      zh: "使用中",
      ja: "使用中",
      de: "In Nutzung",
      fr: "Utilise",
      es: "En uso",
      ko: "사용 중",
      pt: "Em uso",
    },
    unused: {
      en: "Unused",
      zh: "未使用",
      ja: "未使用",
      de: "Ungenutzt",
      fr: "Inutilise",
      es: "Sin usar",
      ko: "미사용",
      pt: "Nao usado",
    },
    health: {
      en: "Health",
      zh: "健康",
      ja: "健康状態",
      de: "Zustand",
      fr: "Sante",
      es: "Salud",
      ko: "상태",
      pt: "Saude",
    },
    normal: {
      en: "Normal",
      zh: "正常",
      ja: "正常",
      de: "Normal",
      fr: "Normal",
      es: "Normal",
      ko: "정상",
      pt: "Normal",
    },
    powerOn: {
      en: "Power-on",
      zh: "通电",
      ja: "通電",
      de: "Betriebszeit",
      fr: "Sous tension",
      es: "Encendido",
      ko: "전원 시간",
      pt: "Ligado",
    },
    starts: {
      en: "Starts",
      zh: "启动",
      ja: "起動",
      de: "Starts",
      fr: "Demarrages",
      es: "Arranques",
      ko: "시작",
      pt: "Inicializacoes",
    },
  };
  const disks = [
    {
      name: "Lexar SSD ARES 4TB",
      path: "/dev/nvme0n1",
      cap: "4 TB",
      temp: "35 ℃",
      sn: "PCQ210R000002P2202",
      hours: "7635 h",
      pwr: 101,
      state: "inUse",
    },
    {
      name: "WDC WD5000LUCT",
      path: "/dev/sda",
      cap: "500 GB",
      temp: "41 ℃",
      sn: "WD-WXN2AA0HE582",
      hours: "7765 h",
      pwr: 1659,
      state: "unused",
    },
    {
      name: "HGST HTS545050A7",
      path: "/dev/sdb",
      cap: "500 GB",
      temp: "39 ℃",
      sn: "RBF51A153LNBNP",
      hours: "9295 h",
      pwr: 48,
      state: "unused",
    },
    {
      name: "SaiChi K300 SSD",
      path: "/dev/sdc",
      cap: "240 GB",
      temp: "30 ℃",
      sn: "AA00000000000731",
      hours: "5700 h",
      pwr: 1680,
      state: "unused",
    },
  ];
  return (
    <div className="p-3 space-y-2 h-full overflow-hidden text-[12px]">
      <div className="flex items-center gap-2">
        <div className="text-sm font-semibold">{tx(locale, copy.title)}</div>
        <span className="text-[11px] px-1.5 py-0.5 rounded bg-success/20 text-success">
          {tx(locale, copy.realtime)}
        </span>
        <div className="ml-auto text-[11px] text-muted-foreground">
          {tx(locale, copy.lastUpdated)}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { l: copy.device, v: "yesnas", i: Server },
          { l: copy.os, v: "Debian GNU/Linux 13 (trixie)", i: Terminal },
          { l: copy.kernel, v: "6.12.88+deb13-amd64", i: GitBranch },
          { l: copy.uptime, v: tx(locale, copy.uptimeValue), i: Activity },
        ].map((s) => (
          <div key={s.l.en} className="rounded-lg border border-border bg-card p-2">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <s.i className="size-3" />
              {tx(locale, s.l)}
            </div>
            <div className="text-[11px] font-semibold mt-0.5 truncate">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Database className="size-3 text-brand" /> {tx(locale, copy.board)}
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">{tx(locale, copy.vendor)}</div>
            <div>AZW</div>
            <div className="text-muted-foreground">{tx(locale, copy.product)}</div>
            <div>EQ13</div>
            <div className="text-muted-foreground">{tx(locale, copy.version)}</div>
            <div>Default string</div>
            <div className="text-muted-foreground">{tx(locale, copy.serial)}</div>
            <div>—</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Sparkles className="size-3 text-brand-2" /> {tx(locale, copy.gpu)}
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">{tx(locale, copy.vendor)}</div>
            <div>Intel</div>
            <div className="text-muted-foreground">{tx(locale, copy.usage)}</div>
            <div>3%</div>
            <div className="text-muted-foreground">{tx(locale, copy.vramTemp)}</div>
            <div>1.2 GB · 45 ℃</div>
            <div className="text-muted-foreground">{tx(locale, copy.power)}</div>
            <div>4.8 W</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Cpu className="size-3 text-brand" /> {tx(locale, copy.compute)}
            <span className="ml-auto text-[10.5px] text-muted-foreground">
              {tx(locale, copy.computeSub)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <RingStat value={2.7} label="CPU" />
            <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
              <div className="text-muted-foreground">{tx(locale, copy.temp)}</div>
              <div>27.8 ℃</div>
              <div className="text-muted-foreground">{tx(locale, copy.power)}</div>
              <div>6.2 W</div>
              <div className="text-muted-foreground">{tx(locale, copy.fan)}</div>
              <div>1720 RPM</div>
              <div className="text-muted-foreground">{tx(locale, copy.load)}</div>
              <div>0.18 · 0.22 · 0.19</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <MemoryStick className="size-3 text-brand-2" /> {tx(locale, copy.memory)}
            <span className="ml-auto text-[10.5px] text-muted-foreground">
              Gloway · DDR5 · 4800 MHz
            </span>
          </div>
          <div className="flex items-center gap-2">
            <RingStat value={22} label="RAM" tone="brand-2" />
            <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
              <div className="text-muted-foreground">{tx(locale, copy.capacity)}</div>
              <div>15.4 GB</div>
              <div className="text-muted-foreground">{tx(locale, copy.used)}</div>
              <div>3.39 GB</div>
              <div className="text-muted-foreground">{tx(locale, copy.available)}</div>
              <div>12.0 GB</div>
              <div className="text-muted-foreground">Swap</div>
              <div>0 / 4 GB</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Network className="size-3 text-brand" /> {tx(locale, copy.network)}
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">eth0</div>
            <div>2.5 GbE · Up</div>
            <div className="text-muted-foreground">IPv4</div>
            <div>192.168.1.12</div>
            <div className="text-muted-foreground">{tx(locale, copy.upDown)}</div>
            <div className="text-brand">42.1 / 128.6 MB/s</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Zap className="size-3 text-brand-2" /> {tx(locale, copy.power)}
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">{tx(locale, copy.power)}</div>
            <div>14.6 W</div>
            <div className="text-muted-foreground">{tx(locale, copy.dailyAvg)}</div>
            <div>0.34 kWh</div>
            <div className="text-muted-foreground">UPS</div>
            <div>APC · 100%</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Activity className="size-3 text-success" /> {tx(locale, copy.sensors)}
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">{tx(locale, copy.caseTemp)}</div>
            <div>32 ℃</div>
            <div className="text-muted-foreground">{tx(locale, copy.nvmeTemp)}</div>
            <div>35 ℃</div>
            <div className="text-muted-foreground">{tx(locale, copy.fan)} 2</div>
            <div>980 RPM</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-2">
        <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1.5">
          <HardDrive className="size-3" /> {tx(locale, copy.disks)}
          <span className="ml-auto text-[11px] text-muted-foreground">
            {tx(locale, copy.diskSummary)}
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {disks.map((d) => (
            <div key={d.name} className="rounded-md border border-border/60 bg-background/60 p-1.5">
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-medium truncate">{d.name}</div>
                <span
                  className={`text-[12px] px-1 py-0.5 rounded ${d.state === "inUse" ? "bg-brand/20 text-brand" : "bg-muted text-muted-foreground"}`}
                >
                  {tx(locale, d.state === "inUse" ? copy.inUse : copy.unused)}
                </span>
              </div>
              <div className="mt-1 grid grid-cols-2 gap-x-1.5 gap-y-0.5 text-[10.5px] text-muted-foreground">
                <div>{d.path}</div>
                <div className="text-right text-foreground">{d.cap}</div>
                <div>{tx(locale, copy.temp)}</div>
                <div className="text-right text-foreground">{d.temp}</div>
                <div>{tx(locale, copy.health)}</div>
                <div className="text-right text-success">{tx(locale, copy.normal)}</div>
                <div>{tx(locale, copy.powerOn)}</div>
                <div className="text-right text-foreground">{d.hours}</div>
                <div>{tx(locale, copy.starts)}</div>
                <div className="text-right text-foreground">{d.pwr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RingStat({
  value,
  label,
  tone = "brand",
}: {
  value: number;
  label: string;
  tone?: "brand" | "brand-2";
}) {
  const c = 2 * Math.PI * 16;
  const stroke = tone === "brand" ? "oklch(0.68 0.18 275)" : "oklch(0.72 0.16 210)";
  return (
    <div className="relative size-11 shrink-0">
      <svg viewBox="0 0 40 40" className="size-11 -rotate-90">
        <circle cx="20" cy="20" r="16" fill="none" stroke="oklch(0.3 0.02 265)" strokeWidth="3" />
        <motion.circle
          cx="20"
          cy="20"
          r="16"
          fill="none"
          stroke={stroke}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1 }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-[11px] font-semibold">{value}%</div>
      </div>
    </div>
  );
}

/* ---- Screen: Tasks ---- */
function ScreenTasks() {
  const locale = useCurrentLocale();
  const copy = {
    title: {
      en: "Scheduled tasks",
      zh: "待执行的任务",
      ja: "予定タスク",
      de: "Geplante Aufgaben",
      fr: "Taches planifiees",
      es: "Tareas programadas",
      ko: "예약 작업",
      pt: "Tarefas agendadas",
    },
    all: {
      en: "All",
      zh: "全部",
      ja: "すべて",
      de: "Alle",
      fr: "Tous",
      es: "Todo",
      ko: "전체",
      pt: "Todos",
    },
    running: {
      en: "Running",
      zh: "运行中",
      ja: "実行中",
      de: "Laeuft",
      fr: "En cours",
      es: "En ejecucion",
      ko: "실행 중",
      pt: "Em execucao",
    },
    paused: {
      en: "Paused",
      zh: "已暂停",
      ja: "一時停止",
      de: "Pausiert",
      fr: "En pause",
      es: "Pausado",
      ko: "일시 중지",
      pt: "Pausado",
    },
    success: {
      en: "Success",
      zh: "成功",
      ja: "成功",
      de: "Erfolg",
      fr: "Succes",
      es: "Correcto",
      ko: "성공",
      pt: "Sucesso",
    },
    failed: {
      en: "Failed",
      zh: "已失败",
      ja: "失敗",
      de: "Fehlgeschlagen",
      fr: "Echec",
      es: "Fallidas",
      ko: "실패",
      pt: "Falhou",
    },
    canceled: {
      en: "Canceled",
      zh: "已取消",
      ja: "キャンセル済み",
      de: "Abgebrochen",
      fr: "Annule",
      es: "Canceladas",
      ko: "취소됨",
      pt: "Cancelado",
    },
    snapshot: {
      en: "Automatic snapshot",
      zh: "自动快照",
      ja: "自動スナップショット",
      de: "Automatischer Snapshot",
      fr: "Snapshot automatique",
      es: "Instantanea automatica",
      ko: "자동 스냅샷",
      pt: "Snapshot automatico",
    },
    snapshotMeta: {
      en: "system pool · 2026/7/6 00:00:00",
      zh: "系统盘 · 2026/7/6 00:00:00",
      ja: "システムプール · 2026/7/6 00:00:00",
      de: "Systempool · 2026/7/6 00:00:00",
      fr: "pool systeme · 2026/7/6 00:00:00",
      es: "pool del sistema · 2026/7/6 00:00:00",
      ko: "시스템 풀 · 2026/7/6 00:00:00",
      pt: "pool do sistema · 2026/7/6 00:00:00",
    },
    enabled: {
      en: "Enabled",
      zh: "已启用",
      ja: "有効",
      de: "Aktiv",
      fr: "Active",
      es: "Activa",
      ko: "활성",
      pt: "Ativa",
    },
    search: {
      en: "Search tasks",
      zh: "搜索任务",
      ja: "タスク検索",
      de: "Aufgaben suchen",
      fr: "Rechercher taches",
      es: "Buscar tareas",
      ko: "작업 검색",
      pt: "Buscar tarefas",
    },
    todayRun: {
      en: "Ran today",
      zh: "今日执行",
      ja: "今日実行",
      de: "Heute ausgefuehrt",
      fr: "Execute aujourd'hui",
      es: "Ejecutadas hoy",
      ko: "오늘 실행",
      pt: "Executadas hoje",
    },
    todaySub: {
      en: "35 success · 1 failed",
      zh: "成功 35 · 失败 1",
      ja: "成功 35 · 失敗 1",
      de: "35 Erfolg · 1 Fehler",
      fr: "35 succes · 1 echec",
      es: "35 correctas · 1 fallida",
      ko: "성공 35 · 실패 1",
      pt: "35 sucesso · 1 falha",
    },
    queued: {
      en: "Queued",
      zh: "排队中",
      ja: "キュー内",
      de: "In Warteschlange",
      fr: "En file",
      es: "En cola",
      ko: "대기 중",
      pt: "Na fila",
    },
    queuedSub: {
      en: "media transcode · AI index",
      zh: "影音转码 · AI 索引",
      ja: "メディア変換 · AI索引",
      de: "Medientranscoding · KI-Index",
      fr: "transcodage media · index IA",
      es: "transcodificacion · indice IA",
      ko: "미디어 트랜스코딩 · AI 색인",
      pt: "transcodificacao · indice IA",
    },
    saved: {
      en: "Saved this week",
      zh: "本周节省",
      ja: "今週の節約",
      de: "Diese Woche gespart",
      fr: "Economise cette semaine",
      es: "Ahorrado esta semana",
      ko: "이번 주 절약",
      pt: "Economizado na semana",
    },
    savedSub: {
      en: "snapshot compression + cleanup",
      zh: "快照压缩 + 清理",
      ja: "スナップショット圧縮 + 整理",
      de: "Snapshot-Kompression + Bereinigung",
      fr: "compression snapshot + nettoyage",
      es: "compresion + limpieza",
      ko: "스냅샷 압축 + 정리",
      pt: "compressao + limpeza",
    },
    nextPlan: {
      en: "Next plan",
      zh: "下次计划",
      ja: "次回予定",
      de: "Naechster Plan",
      fr: "Prochaine tache",
      es: "Siguiente plan",
      ko: "다음 계획",
      pt: "Proximo plano",
    },
    nextSub: {
      en: "health patrol + incremental backup",
      zh: "健康巡检 + 增量备份",
      ja: "ヘルスチェック + 増分バックアップ",
      de: "Health-Check + inkrementelles Backup",
      fr: "controle sante + sauvegarde incrementale",
      es: "revision salud + copia incremental",
      ko: "상태 점검 + 증분 백업",
      pt: "verificacao + backup incremental",
    },
    times: {
      min12: {
        en: "12 min ago",
        zh: "12 分钟前",
        ja: "12分前",
        de: "vor 12 Min.",
        fr: "il y a 12 min",
        es: "hace 12 min",
        ko: "12분 전",
        pt: "ha 12 min",
      },
      min25: {
        en: "25 min ago",
        zh: "25 分钟前",
        ja: "25分前",
        de: "vor 25 Min.",
        fr: "il y a 25 min",
        es: "hace 25 min",
        ko: "25분 전",
        pt: "ha 25 min",
      },
      min43: {
        en: "43 min ago",
        zh: "43 分钟前",
        ja: "43分前",
        de: "vor 43 Min.",
        fr: "il y a 43 min",
        es: "hace 43 min",
        ko: "43분 전",
        pt: "ha 43 min",
      },
      hour1: {
        en: "1 hour ago",
        zh: "1 小时前",
        ja: "1時間前",
        de: "vor 1 Stunde",
        fr: "il y a 1 h",
        es: "hace 1 h",
        ko: "1시간 전",
        pt: "ha 1 h",
      },
      hour2: {
        en: "2 hours ago",
        zh: "2 小时前",
        ja: "2時間前",
        de: "vor 2 Stunden",
        fr: "il y a 2 h",
        es: "hace 2 h",
        ko: "2시간 전",
        pt: "ha 2 h",
      },
      today3: {
        en: "today 03:00",
        zh: "今天 03:00",
        ja: "今日 03:00",
        de: "heute 03:00",
        fr: "aujourd'hui 03:00",
        es: "hoy 03:00",
        ko: "오늘 03:00",
        pt: "hoje 03:00",
      },
      yesterday2310: {
        en: "yesterday 23:10",
        zh: "昨天 23:10",
        ja: "昨日 23:10",
        de: "gestern 23:10",
        fr: "hier 23:10",
        es: "ayer 23:10",
        ko: "어제 23:10",
        pt: "ontem 23:10",
      },
      yesterday2145: {
        en: "yesterday 21:45",
        zh: "昨天 21:45",
        ja: "昨日 21:45",
        de: "gestern 21:45",
        fr: "hier 21:45",
        es: "ayer 21:45",
        ko: "어제 21:45",
        pt: "ontem 21:45",
      },
      yesterday230: {
        en: "yesterday 02:30",
        zh: "昨天 02:30",
        ja: "昨日 02:30",
        de: "gestern 02:30",
        fr: "hier 02:30",
        es: "ayer 02:30",
        ko: "어제 02:30",
        pt: "ontem 02:30",
      },
    },
  };
  const tabs = [
    { l: copy.all, n: 24, a: true },
    { l: copy.running, n: 3 },
    { l: copy.paused, n: 2 },
    { l: copy.success, n: 17 },
    { l: copy.failed, n: 1 },
    { l: copy.canceled, n: 1 },
  ];
  const rows = [
    {
      t: "Automatic snapshot",
      s: "system pool · snapshot complete",
      when: copy.times.min12,
      ok: true,
      p: 100,
    },
    {
      t: "Media metadata refresh",
      s: "media library · TMDB posters synced",
      when: copy.times.min25,
      ok: true,
      p: 100,
    },
    {
      t: "Photo face clustering",
      s: "photos · 128 new images",
      when: copy.times.min43,
      ok: true,
      p: 82,
    },
    {
      t: "Vector index rebuild",
      s: "AI files · 12,480 documents",
      when: copy.times.hour1,
      ok: true,
      p: 68,
    },
    {
      t: "Sync to Google Drive",
      s: "family album · uploaded 4.2 GB",
      when: copy.times.hour2,
      ok: true,
      p: 100,
    },
    {
      t: "Storage health patrol",
      s: "arrays and disks · risk patrol",
      when: copy.times.today3,
      ok: true,
      p: 100,
    },
    {
      t: "Docker image prune",
      s: "unused images cleaned · 8.4 GB freed",
      when: copy.times.yesterday2310,
      ok: true,
      p: 100,
    },
    {
      t: "Security scan",
      s: "remote login · abnormal IP check",
      when: copy.times.yesterday2145,
      ok: true,
      p: 100,
    },
    {
      t: "Backup to B2",
      s: "important files · incremental backup",
      when: copy.times.yesterday230,
      ok: true,
      p: 100,
    },
    {
      t: "Subtitle generation",
      s: "media · 3 videos queued",
      when: { en: "2026/7/6" },
      ok: true,
      p: 38,
    },
    {
      t: "OCR receipts",
      s: "receipts · 96 awaiting filing",
      when: { en: "2026/7/5" },
      ok: true,
      p: 100,
    },
    {
      t: "Package update",
      s: "yesnas-core 2.4.1 · complete",
      when: { en: "2026/7/4" },
      ok: true,
      p: 100,
    },
  ];
  return (
    <div className="p-3.5 space-y-2.5 h-full overflow-hidden text-[12px]">
      <div className="text-sm font-semibold">{tx(locale, copy.title)}</div>
      <div className="rounded-lg border border-border bg-card p-2.5 flex items-center gap-2">
        <div className="size-6 rounded-md bg-brand/20 text-brand grid place-items-center">
          <ImageIcon className="size-3.5" />
        </div>
        <div>
          <div className="text-[12px] font-medium">{tx(locale, copy.snapshot)}</div>
          <div className="text-[12px] text-muted-foreground">{tx(locale, copy.snapshotMeta)}</div>
        </div>
        <span className="ml-auto text-[12px] px-1.5 py-0.5 rounded bg-success/20 text-success">
          {tx(locale, copy.enabled)}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {tabs.map((t) => (
          <div
            key={t.l.en}
            className={`text-[12px] px-2 py-0.5 rounded-full ${t.a ? "bg-accent text-foreground" : "text-muted-foreground"}`}
          >
            {tx(locale, t.l)} <span className="text-[12px] opacity-70 ml-0.5">{t.n}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[12px] text-muted-foreground">
          <Search className="size-2.5" /> {tx(locale, copy.search)}
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { l: copy.todayRun, n: "38", sub: copy.todaySub },
          { l: copy.queued, n: "7", sub: copy.queuedSub },
          { l: copy.saved, n: "146 GB", sub: copy.savedSub },
          { l: copy.nextPlan, n: "03:00", sub: copy.nextSub },
        ].map((s) => (
          <div key={s.l.en} className="rounded-lg border border-border bg-card p-2">
            <div className="text-[13px] font-semibold">{s.n}</div>
            <div className="mt-0.5 text-[12px] text-muted-foreground">{tx(locale, s.l)}</div>
            <div className="mt-1 text-[12px] text-muted-foreground truncate">
              {tx(locale, s.sub)}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card divide-y divide-border/60">
        {rows.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.03 }}
            className="grid grid-cols-12 gap-2 items-center px-2.5 py-1.5"
          >
            <div className="col-span-4 flex items-center gap-2 min-w-0">
              <div className="size-5 rounded bg-muted grid place-items-center">
                <ImageIcon className="size-3 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <div className="text-[12px] font-medium truncate">{r.t}</div>
                <div className="text-[12px] text-muted-foreground truncate">{r.s}</div>
              </div>
            </div>
            <div className="col-span-5">
              <div className="h-1 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-brand"
                  initial={{ width: 0 }}
                  animate={{ width: `${r.p}%` }}
                  transition={{ duration: 0.8, delay: i * 0.05 }}
                />
              </div>
              <div className="text-[12px] text-muted-foreground mt-0.5">{r.p}%</div>
            </div>
            <div className="col-span-1 text-center">
              <span className="text-[12px] px-1.5 py-0.5 rounded bg-success/20 text-success">
                {tx(locale, copy.success)}
              </span>
            </div>
            <div className="col-span-2 text-right text-[12px] text-muted-foreground">
              {tx(locale, r.when)}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---- Screen: Users ---- */
function ScreenUsers() {
  const locale = useCurrentLocale();
  const copy = {
    title: {
      en: "Users",
      zh: "用户",
      ja: "ユーザー",
      de: "Benutzer",
      fr: "Utilisateurs",
      es: "Usuarios",
      ko: "사용자",
      pt: "Usuarios",
    },
    subtitle: {
      en: "Manage local accounts and SMB account status",
      zh: "管理本机账号和 SMB 账号状态",
      ja: "ローカルアカウントとSMBアカウント状態を管理",
      de: "Lokale Konten und SMB-Kontostatus verwalten",
      fr: "Gerer les comptes locaux et SMB",
      es: "Gestiona cuentas locales y SMB",
      ko: "로컬 계정 및 SMB 계정 상태 관리",
      pt: "Gerencie contas locais e SMB",
    },
    search: {
      en: "Search users",
      zh: "搜索用户",
      ja: "ユーザー検索",
      de: "Benutzer suchen",
      fr: "Rechercher",
      es: "Buscar usuarios",
      ko: "사용자 검색",
      pt: "Buscar usuarios",
    },
    create: {
      en: "Create user",
      zh: "创建用户",
      ja: "ユーザー作成",
      de: "Benutzer erstellen",
      fr: "Creer un utilisateur",
      es: "Crear usuario",
      ko: "사용자 생성",
      pt: "Criar usuario",
    },
    allUsers: {
      en: "All users",
      zh: "全部用户",
      ja: "全ユーザー",
      de: "Alle Benutzer",
      fr: "Tous les utilisateurs",
      es: "Todos los usuarios",
      ko: "모든 사용자",
      pt: "Todos os usuarios",
    },
    enabledAccounts: {
      en: "Enabled accounts",
      zh: "启用账号",
      ja: "有効なアカウント",
      de: "Aktive Konten",
      fr: "Comptes actifs",
      es: "Cuentas activas",
      ko: "활성 계정",
      pt: "Contas ativas",
    },
    disabledAccounts: {
      en: "Disabled accounts",
      zh: "禁用账号",
      ja: "無効なアカウント",
      de: "Deaktivierte Konten",
      fr: "Comptes desactives",
      es: "Cuentas desactivadas",
      ko: "비활성 계정",
      pt: "Contas desativadas",
    },
    admin: {
      en: "Admin",
      zh: "管理员",
      ja: "管理者",
      de: "Admin",
      fr: "Admin",
      es: "Admin",
      ko: "관리자",
      pt: "Admin",
    },
    all: {
      en: "All",
      zh: "全部",
      ja: "すべて",
      de: "Alle",
      fr: "Tous",
      es: "Todo",
      ko: "전체",
      pt: "Todos",
    },
    enabled: {
      en: "Enabled",
      zh: "启用",
      ja: "有効",
      de: "Aktiv",
      fr: "Actif",
      es: "Activo",
      ko: "활성",
      pt: "Ativo",
    },
    disabled: {
      en: "Disabled",
      zh: "禁用",
      ja: "無効",
      de: "Deaktiviert",
      fr: "Desactive",
      es: "Desactivado",
      ko: "비활성",
      pt: "Desativado",
    },
    service: {
      en: "Service account",
      zh: "服务账号",
      ja: "サービスアカウント",
      de: "Dienstkonto",
      fr: "Compte service",
      es: "Cuenta de servicio",
      ko: "서비스 계정",
      pt: "Conta de servico",
    },
    regular: {
      en: "Regular user",
      zh: "普通用户",
      ja: "一般ユーザー",
      de: "Normaler Benutzer",
      fr: "Utilisateur standard",
      es: "Usuario normal",
      ko: "일반 사용자",
      pt: "Usuario comum",
    },
    readonly: {
      en: "Read-only",
      zh: "只读",
      ja: "読み取り専用",
      de: "Nur Lesen",
      fr: "Lecture seule",
      es: "Solo lectura",
      ko: "읽기 전용",
      pt: "Somente leitura",
    },
    media: {
      en: "Media account",
      zh: "媒体账号",
      ja: "メディアアカウント",
      de: "Medienkonto",
      fr: "Compte media",
      es: "Cuenta multimedia",
      ko: "미디어 계정",
      pt: "Conta de midia",
    },
    guest: {
      en: "Guest",
      zh: "访客",
      ja: "ゲスト",
      de: "Gast",
      fr: "Invite",
      es: "Invitado",
      ko: "게스트",
      pt: "Convidado",
    },
    user: {
      en: "User",
      zh: "用户",
      ja: "ユーザー",
      de: "Benutzer",
      fr: "Utilisateur",
      es: "Usuario",
      ko: "사용자",
      pt: "Usuario",
    },
    status: {
      en: "Status",
      zh: "状态",
      ja: "状態",
      de: "Status",
      fr: "Etat",
      es: "Estado",
      ko: "상태",
      pt: "Status",
    },
    role: {
      en: "Role",
      zh: "角色",
      ja: "役割",
      de: "Rolle",
      fr: "Role",
      es: "Rol",
      ko: "역할",
      pt: "Funcao",
    },
    recent: {
      en: "Recent activity",
      zh: "最近活动",
      ja: "最近の活動",
      de: "Letzte Aktivitaet",
      fr: "Activite recente",
      es: "Actividad reciente",
      ko: "최근 활동",
      pt: "Atividade recente",
    },
    updated: {
      en: "Updated",
      zh: "更新时间",
      ja: "更新時刻",
      de: "Aktualisiert",
      fr: "Mis a jour",
      es: "Actualizado",
      ko: "업데이트",
      pt: "Atualizado",
    },
    pageInfo: {
      en: "Page 1 / 5",
      zh: "第 1 页 / 共 5 页",
      ja: "1 / 5 ページ",
      de: "Seite 1 / 5",
      fr: "Page 1 / 5",
      es: "Pagina 1 / 5",
      ko: "1 / 5 페이지",
      pt: "Pagina 1 / 5",
    },
    perPage: {
      en: "14 per page",
      zh: "每页 14 条",
      ja: "1ページ14件",
      de: "14 pro Seite",
      fr: "14 par page",
      es: "14 por pagina",
      ko: "페이지당 14개",
      pt: "14 por pagina",
    },
    total: {
      en: "42 users total",
      zh: "共 42 个用户",
      ja: "合計42ユーザー",
      de: "42 Benutzer gesamt",
      fr: "42 utilisateurs au total",
      es: "42 usuarios en total",
      ko: "총 사용자 42명",
      pt: "42 usuarios no total",
    },
    prev: {
      en: "Prev",
      zh: "上一页",
      ja: "前へ",
      de: "Zurueck",
      fr: "Prec.",
      es: "Anterior",
      ko: "이전",
      pt: "Anterior",
    },
    next: {
      en: "Next",
      zh: "下一页",
      ja: "次へ",
      de: "Weiter",
      fr: "Suiv.",
      es: "Siguiente",
      ko: "다음",
      pt: "Proxima",
    },
  };
  const roleLabel = (role: string) =>
    tx(
      locale,
      role === "admin"
        ? copy.admin
        : role === "service"
          ? copy.service
          : role === "readonly"
            ? copy.readonly
            : role === "media"
              ? copy.media
              : role === "guest"
                ? copy.guest
                : copy.regular,
    );
  const users = [
    {
      n: "飞毛腿9",
      h: "@www",
      role: "admin",
      on: true,
      when: "2026/6/19 03:36",
      c: "brand",
      last: {
        en: "2 min ago · 192.168.1.24",
        zh: "2 分钟前 · 192.168.1.24",
        ja: "2分前 · 192.168.1.24",
        de: "vor 2 Min. · 192.168.1.24",
        fr: "il y a 2 min · 192.168.1.24",
        es: "hace 2 min · 192.168.1.24",
        ko: "2분 전 · 192.168.1.24",
        pt: "ha 2 min · 192.168.1.24",
      },
    },
    {
      n: "ggg",
      h: "@gggw",
      role: "admin",
      on: true,
      when: "2026/6/18 23:33",
      c: "brand-2",
      last: {
        en: "17 min ago · 192.168.1.30",
        zh: "17 分钟前 · 192.168.1.30",
        ja: "17分前 · 192.168.1.30",
        de: "vor 17 Min. · 192.168.1.30",
        fr: "il y a 17 min · 192.168.1.30",
        es: "hace 17 min · 192.168.1.30",
        ko: "17분 전 · 192.168.1.30",
        pt: "ha 17 min · 192.168.1.30",
      },
    },
    {
      n: "asdfas",
      h: "@asdfads",
      role: "regular",
      on: true,
      when: "2026/6/18 01:14",
      c: "brand",
      last: {
        en: "1 hour ago · WebDAV",
        zh: "1 小时前 · WebDAV",
        ja: "1時間前 · WebDAV",
        de: "vor 1 Stunde · WebDAV",
        fr: "il y a 1 h · WebDAV",
        es: "hace 1 h · WebDAV",
        ko: "1시간 전 · WebDAV",
        pt: "ha 1 h · WebDAV",
      },
    },
    {
      n: "王东杰",
      h: "@wdj",
      role: "admin",
      on: true,
      when: "2026/6/6 00:48",
      c: "brand-2",
      last: {
        en: "just now · macOS SMB",
        zh: "刚刚 · macOS SMB",
        ja: "たった今 · macOS SMB",
        de: "gerade eben · macOS SMB",
        fr: "a l'instant · macOS SMB",
        es: "ahora mismo · macOS SMB",
        ko: "방금 · macOS SMB",
        pt: "agora · macOS SMB",
      },
    },
    {
      n: "廖韵乔",
      h: "@lyq",
      role: "regular",
      on: true,
      when: "2026/6/6 00:45",
      c: "brand",
      last: {
        en: "yesterday · iOS App",
        zh: "昨天 · iOS App",
        ja: "昨日 · iOS App",
        de: "gestern · iOS App",
        fr: "hier · iOS App",
        es: "ayer · iOS App",
        ko: "어제 · iOS App",
        pt: "ontem · iOS App",
      },
    },
    {
      n: "陈嘉豪",
      h: "@chenjh",
      role: "regular",
      on: true,
      when: "2026/6/5 22:11",
      c: "brand-2",
      last: {
        en: "3 hours ago · Web",
        zh: "3 小时前 · Web",
        ja: "3時間前 · Web",
        de: "vor 3 Stunden · Web",
        fr: "il y a 3 h · Web",
        es: "hace 3 h · Web",
        ko: "3시간 전 · Web",
        pt: "ha 3 h · Web",
      },
    },
    {
      n: "Sophia Lee",
      h: "@sophia",
      role: "admin",
      on: false,
      when: "2026/6/2 18:04",
      c: "brand",
      last: copy.disabled,
    },
    {
      n: "服务账号-immich",
      h: "@svc-immich",
      role: "service",
      on: true,
      when: "2026/5/28 09:22",
      c: "brand-2",
      last: {
        en: "always online",
        zh: "持续在线",
        ja: "常時オンライン",
        de: "immer online",
        fr: "toujours en ligne",
        es: "siempre en linea",
        ko: "항상 온라인",
        pt: "sempre online",
      },
    },
    {
      n: "备份机器人",
      h: "@backup-bot",
      role: "service",
      on: true,
      when: "2026/5/21 04:00",
      c: "brand",
      last: {
        en: "running · rsync",
        zh: "运行中 · rsync",
        ja: "実行中 · rsync",
        de: "laeuft · rsync",
        fr: "en cours · rsync",
        es: "en ejecucion · rsync",
        ko: "실행 중 · rsync",
        pt: "em execucao · rsync",
      },
    },
    {
      n: "财务只读",
      h: "@finance-ro",
      role: "readonly",
      on: true,
      when: "2026/5/18 10:12",
      c: "brand-2",
      last: {
        en: "today 09:14 · Web",
        zh: "今天 09:14 · Web",
        ja: "今日 09:14 · Web",
        de: "heute 09:14 · Web",
        fr: "aujourd'hui 09:14 · Web",
        es: "hoy 09:14 · Web",
        ko: "오늘 09:14 · Web",
        pt: "hoje 09:14 · Web",
      },
    },
    {
      n: "客厅电视",
      h: "@living-tv",
      role: "media",
      on: true,
      when: "2026/5/16 20:31",
      c: "brand",
      last: {
        en: "playing · Jellyfin",
        zh: "正在播放 · Jellyfin",
        ja: "再生中 · Jellyfin",
        de: "spielt · Jellyfin",
        fr: "lecture · Jellyfin",
        es: "reproduciendo · Jellyfin",
        ko: "재생 중 · Jellyfin",
        pt: "reproduzindo · Jellyfin",
      },
    },
    {
      n: "摄影工作室",
      h: "@studio",
      role: "regular",
      on: true,
      when: "2026/5/9 15:48",
      c: "brand-2",
      last: {
        en: "yesterday · SMB",
        zh: "昨天 · SMB",
        ja: "昨日 · SMB",
        de: "gestern · SMB",
        fr: "hier · SMB",
        es: "ayer · SMB",
        ko: "어제 · SMB",
        pt: "ontem · SMB",
      },
    },
    {
      n: "guest",
      h: "@guest",
      role: "guest",
      on: false,
      when: "2026/5/12 12:00",
      c: "brand-2",
      last: copy.disabled,
    },
    {
      n: "临时分享",
      h: "@share-temp",
      role: "guest",
      on: false,
      when: "2026/4/28 08:00",
      c: "brand",
      last: {
        en: "expired",
        zh: "已过期",
        ja: "期限切れ",
        de: "abgelaufen",
        fr: "expire",
        es: "caducado",
        ko: "만료됨",
        pt: "expirado",
      },
    },
  ];
  return (
    <div className="p-3 space-y-2 h-full overflow-hidden text-[12px]">
      <div className="flex items-center">
        <div>
          <div className="text-sm font-semibold">{tx(locale, copy.title)}</div>
          <div className="text-[12px] text-muted-foreground">{tx(locale, copy.subtitle)}</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[12px] text-muted-foreground">
            <Search className="size-2.5" /> {tx(locale, copy.search)}
          </div>
          <button className="rounded-md bg-foreground text-background text-[12px] px-2 py-1 flex items-center gap-1">
            <Users className="size-3" /> {tx(locale, copy.create)}
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { l: copy.allUsers, n: 42, i: Users, tone: "brand" },
          { l: copy.enabledAccounts, n: 35, i: Check, tone: "success" },
          { l: copy.disabledAccounts, n: 7, i: Pause, tone: "muted" },
          { l: copy.admin, n: 6, i: Shield, tone: "brand-2" },
        ].map((s) => (
          <div
            key={s.l.en}
            className="rounded-lg border border-border bg-card p-2 flex items-center gap-2"
          >
            <div
              className={`size-7 rounded-md grid place-items-center ${
                s.tone === "brand"
                  ? "bg-brand/20 text-brand"
                  : s.tone === "brand-2"
                    ? "bg-brand-2/20 text-brand-2"
                    : s.tone === "success"
                      ? "bg-success/20 text-success"
                      : "bg-muted text-muted-foreground"
              }`}
            >
              <s.i className="size-3.5" />
            </div>
            <div>
              <div className="text-[13px] font-semibold leading-none">{s.n}</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">{tx(locale, s.l)}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        {[
          { l: copy.all, n: 42, a: true },
          { l: copy.enabled, n: 35 },
          { l: copy.disabled, n: 7 },
          { l: copy.admin, n: 6 },
          { l: copy.service, n: 5 },
        ].map((t) => (
          <span
            key={t.l.en}
            className={`text-[12px] px-2 py-0.5 rounded-full ${t.a ? "bg-accent text-foreground" : "text-muted-foreground"}`}
          >
            {tx(locale, t.l)} <span className="text-[12px] opacity-70 ml-0.5">{t.n}</span>
          </span>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card">
        <div className="grid grid-cols-12 gap-2 px-2.5 py-1 text-[12px] text-muted-foreground border-b border-border/60">
          <div className="col-span-4">{tx(locale, copy.user)}</div>
          <div className="col-span-2">{tx(locale, copy.status)}</div>
          <div className="col-span-2">{tx(locale, copy.role)}</div>
          <div className="col-span-2">{tx(locale, copy.recent)}</div>
          <div className="col-span-2 text-right">{tx(locale, copy.updated)}</div>
        </div>
        <div className="divide-y divide-border/60">
          {users.map((u, i) => (
            <motion.div
              key={u.n}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="grid grid-cols-12 gap-2 items-center px-2.5 py-1"
            >
              <div className="col-span-4 flex items-center gap-2 min-w-0">
                <div
                  className={`size-6 rounded-full grid place-items-center text-[12px] font-semibold ${u.c === "brand" ? "bg-brand/25 text-brand" : "bg-brand-2/25 text-brand-2"}`}
                >
                  {u.n.slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium truncate">{u.n}</div>
                  <div className="text-[12px] text-muted-foreground truncate">{u.h}</div>
                </div>
              </div>
              <div className="col-span-2">
                <span
                  className={`text-[12px] px-1.5 py-0.5 rounded ${u.on ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}
                >
                  {tx(locale, u.on ? copy.enabled : copy.disabled)}
                </span>
              </div>
              <div className="col-span-2">
                <span
                  className={`text-[12px] px-1.5 py-0.5 rounded ${
                    u.role === "admin"
                      ? "bg-brand-2/20 text-brand-2"
                      : u.role === "service"
                        ? "bg-brand/20 text-brand"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {roleLabel(u.role)}
                </span>
              </div>
              <div className="col-span-2 text-[12px] text-muted-foreground truncate">
                {tx(locale, u.last)}
              </div>
              <div className="col-span-2 text-right text-[12px] text-muted-foreground">
                {u.when}
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1.5 border-t border-border/60 text-[12px] text-muted-foreground">
          <span>{tx(locale, copy.pageInfo)}</span>
          <span>{tx(locale, copy.perPage)}</span>
          <span>{tx(locale, copy.total)}</span>
          <div className="ml-auto flex items-center gap-1">
            {[tx(locale, copy.prev), "1", "2", "3", tx(locale, copy.next)].map((p, i) => (
              <span
                key={p}
                className={`px-1.5 py-0.5 rounded border border-border/60 ${i === 1 ? "bg-accent text-foreground" : ""}`}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: Logs ---- */
function ScreenLogs() {
  const locale = useCurrentLocale();
  const copy = {
    title: {
      en: "Logs",
      zh: "日志",
      ja: "ログ",
      de: "Logs",
      fr: "Journaux",
      es: "Registros",
      ko: "로그",
      pt: "Logs",
    },
    subtitle: {
      en: "View user actions, system events, and security activity",
      zh: "查看用户操作、系统事件与安全活动",
      ja: "ユーザー操作、システムイベント、セキュリティ活動を確認",
      de: "Benutzeraktionen, Systemereignisse und Sicherheitsaktivitaeten anzeigen",
      fr: "Voir les actions utilisateur, evenements systeme et securite",
      es: "Ver acciones de usuario, eventos del sistema y seguridad",
      ko: "사용자 작업, 시스템 이벤트 및 보안 활동 보기",
      pt: "Veja acoes de usuario, eventos do sistema e seguranca",
    },
    hours24: {
      en: "24 hours",
      zh: "24 小时",
      ja: "24時間",
      de: "24 Stunden",
      fr: "24 heures",
      es: "24 horas",
      ko: "24시간",
      pt: "24 horas",
    },
    days7: {
      en: "7 days",
      zh: "7 天",
      ja: "7日",
      de: "7 Tage",
      fr: "7 jours",
      es: "7 dias",
      ko: "7일",
      pt: "7 dias",
    },
    days30: {
      en: "30 days",
      zh: "30 天",
      ja: "30日",
      de: "30 Tage",
      fr: "30 jours",
      es: "30 dias",
      ko: "30일",
      pt: "30 dias",
    },
    days90: {
      en: "90 days",
      zh: "90 天",
      ja: "90日",
      de: "90 Tage",
      fr: "90 jours",
      es: "90 dias",
      ko: "90일",
      pt: "90 dias",
    },
    year1: {
      en: "1 year",
      zh: "1 年",
      ja: "1年",
      de: "1 Jahr",
      fr: "1 an",
      es: "1 ano",
      ko: "1년",
      pt: "1 ano",
    },
    totalLogs: {
      en: "1,284 logs",
      zh: "1,284 条日志",
      ja: "1,284件のログ",
      de: "1.284 Logs",
      fr: "1 284 journaux",
      es: "1,284 registros",
      ko: "로그 1,284개",
      pt: "1.284 logs",
    },
    info: {
      en: "Info",
      zh: "信息",
      ja: "情報",
      de: "Info",
      fr: "Info",
      es: "Info",
      ko: "정보",
      pt: "Info",
    },
    warn: {
      en: "Warning",
      zh: "警告",
      ja: "警告",
      de: "Warnung",
      fr: "Alerte",
      es: "Advertencia",
      ko: "경고",
      pt: "Aviso",
    },
    err: {
      en: "Error",
      zh: "错误",
      ja: "エラー",
      de: "Fehler",
      fr: "Erreur",
      es: "Error",
      ko: "오류",
      pt: "Erro",
    },
    ok: {
      en: "Success",
      zh: "成功",
      ja: "成功",
      de: "Erfolg",
      fr: "Succes",
      es: "Correcto",
      ko: "성공",
      pt: "Sucesso",
    },
    allLevels: {
      en: "All levels",
      zh: "全部级别",
      ja: "全レベル",
      de: "Alle Stufen",
      fr: "Tous niveaux",
      es: "Todos los niveles",
      ko: "모든 수준",
      pt: "Todos os niveis",
    },
    search: {
      en: "Search logs, events, or messages",
      zh: "搜索日志、事件或消息",
      ja: "ログ、イベント、メッセージを検索",
      de: "Logs, Ereignisse oder Nachrichten suchen",
      fr: "Rechercher journaux, evenements ou messages",
      es: "Buscar registros, eventos o mensajes",
      ko: "로그, 이벤트 또는 메시지 검색",
      pt: "Buscar logs, eventos ou mensagens",
    },
    lan: {
      en: "LAN",
      zh: "局域网",
      ja: "LAN",
      de: "LAN",
      fr: "LAN",
      es: "LAN",
      ko: "LAN",
      pt: "LAN",
    },
    remote: {
      en: "Remote",
      zh: "远程",
      ja: "リモート",
      de: "Remote",
      fr: "Distant",
      es: "Remoto",
      ko: "원격",
      pt: "Remoto",
    },
    system: {
      en: "System",
      zh: "系统",
      ja: "システム",
      de: "System",
      fr: "Systeme",
      es: "Sistema",
      ko: "시스템",
      pt: "Sistema",
    },
    tenMin: {
      en: "10 min ago",
      zh: "10 分钟前",
      ja: "10分前",
      de: "vor 10 Min.",
      fr: "il y a 10 min",
      es: "hace 10 min",
      ko: "10분 전",
      pt: "ha 10 min",
    },
    oneHour: {
      en: "1 hour ago",
      zh: "1 小时前",
      ja: "1時間前",
      de: "vor 1 Stunde",
      fr: "il y a 1 h",
      es: "hace 1 h",
      ko: "1시간 전",
      pt: "ha 1 h",
    },
    threeHours: {
      en: "3 hours ago",
      zh: "3 小时前",
      ja: "3時間前",
      de: "vor 3 Stunden",
      fr: "il y a 3 h",
      es: "hace 3 h",
      ko: "3시간 전",
      pt: "ha 3 h",
    },
    fourHours: {
      en: "4 hours ago",
      zh: "4 小时前",
      ja: "4時間前",
      de: "vor 4 Stunden",
      fr: "il y a 4 h",
      es: "hace 4 h",
      ko: "4시간 전",
      pt: "ha 4 h",
    },
    twelveHours: {
      en: "12 hours ago",
      zh: "12 小时前",
      ja: "12時間前",
      de: "vor 12 Stunden",
      fr: "il y a 12 h",
      es: "hace 12 h",
      ko: "12시간 전",
      pt: "ha 12 h",
    },
    oneDay: {
      en: "1 day ago",
      zh: "1 天前",
      ja: "1日前",
      de: "vor 1 Tag",
      fr: "il y a 1 jour",
      es: "hace 1 dia",
      ko: "1일 전",
      pt: "ha 1 dia",
    },
    twoDays: {
      en: "2 days ago",
      zh: "2 天前",
      ja: "2日前",
      de: "vor 2 Tagen",
      fr: "il y a 2 jours",
      es: "hace 2 dias",
      ko: "2일 전",
      pt: "ha 2 dias",
    },
    threeDays: {
      en: "3 days ago",
      zh: "3 天前",
      ja: "3日前",
      de: "vor 3 Tagen",
      fr: "il y a 3 jours",
      es: "hace 3 dias",
      ko: "3일 전",
      pt: "ha 3 dias",
    },
    fourDays: {
      en: "4 days ago",
      zh: "4 天前",
      ja: "4日前",
      de: "vor 4 Tagen",
      fr: "il y a 4 jours",
      es: "hace 4 dias",
      ko: "4일 전",
      pt: "ha 4 dias",
    },
    fiveDays: {
      en: "5 days ago",
      zh: "5 天前",
      ja: "5日前",
      de: "vor 5 Tagen",
      fr: "il y a 5 jours",
      es: "hace 5 dias",
      ko: "5일 전",
      pt: "ha 5 dias",
    },
    sixDays: {
      en: "6 days ago",
      zh: "6 天前",
      ja: "6日前",
      de: "vor 6 Tagen",
      fr: "il y a 6 jours",
      es: "hace 6 dias",
      ko: "6일 전",
      pt: "ha 6 dias",
    },
    primaryPool: {
      en: "primary pool · double confirmation",
      zh: "主存储池 · 二次确认",
      ja: "プライマリプール · 二重確認",
      de: "Primaerpool · doppelt bestaetigt",
      fr: "pool principal · double confirmation",
      es: "pool principal · doble confirmacion",
      ko: "기본 풀 · 이중 확인",
      pt: "pool principal · dupla confirmacao",
    },
    firstRemote: {
      en: "first login from unusual region",
      zh: "首次异地登录",
      ja: "初めての異地域ログイン",
      de: "erste Anmeldung aus ungewohnter Region",
      fr: "premiere connexion depuis une region inhabituelle",
      es: "primer inicio desde region inusual",
      ko: "첫 외부 지역 로그인",
      pt: "primeiro login de regiao incomum",
    },
    nextAt: {
      en: "next 03:00",
      zh: "下次 03:00",
      ja: "次回 03:00",
      de: "naechstes Mal 03:00",
      fr: "prochain 03:00",
      es: "siguiente 03:00",
      ko: "다음 03:00",
      pt: "proximo 03:00",
    },
    cpuWarn: {
      en: "CPU temperature warning 76 C",
      zh: "CPU 温度告警 76 ℃",
      ja: "CPU 温度警告 76℃",
      de: "CPU-Temperaturwarnung 76 C",
      fr: "alerte temperature CPU 76 C",
      es: "alerta de temperatura CPU 76 C",
      ko: "CPU 온도 경고 76℃",
      pt: "alerta de temperatura da CPU 76 C",
    },
    duration3: {
      en: "lasting 3 minutes",
      zh: "持续 3 分钟",
      ja: "3分間継続",
      de: "dauerte 3 Minuten",
      fr: "duree 3 minutes",
      es: "durante 3 minutos",
      ko: "3분 지속",
      pt: "durou 3 minutos",
    },
    aiLoaded: {
      en: "AI model loaded",
      zh: "AI 模型加载",
      ja: "AIモデル読み込み",
      de: "KI-Modell geladen",
      fr: "modele IA charge",
      es: "modelo IA cargado",
      ko: "AI 모델 로드",
      pt: "modelo de IA carregado",
    },
    userPerm: {
      en: "regular user",
      zh: "普通用户",
      ja: "一般ユーザー",
      de: "normaler Benutzer",
      fr: "utilisateur standard",
      es: "usuario normal",
      ko: "일반 사용자",
      pt: "usuario comum",
    },
    pageFooter: {
      en: "Page 1 / 65 · 20 per page · 1,284 logs total",
      zh: "第 1 页 / 共 65 页  每页 20 条  共 1,284 条日志",
      ja: "1 / 65 ページ · 1ページ20件 · 合計1,284件",
      de: "Seite 1 / 65 · 20 pro Seite · 1.284 Logs gesamt",
      fr: "Page 1 / 65 · 20 par page · 1 284 journaux",
      es: "Pagina 1 / 65 · 20 por pagina · 1,284 registros",
      ko: "1 / 65 페이지 · 페이지당 20개 · 총 로그 1,284개",
      pt: "Pagina 1 / 65 · 20 por pagina · 1.284 logs",
    },
    prev: {
      en: "Prev",
      zh: "上一页",
      ja: "前へ",
      de: "Zurueck",
      fr: "Prec.",
      es: "Anterior",
      ko: "이전",
      pt: "Anterior",
    },
    next: {
      en: "Next",
      zh: "下一页",
      ja: "次へ",
      de: "Weiter",
      fr: "Suiv.",
      es: "Siguiente",
      ko: "다음",
      pt: "Proxima",
    },
  };
  const cols = 40;
  // deterministic pseudo-random heatmap
  const pick = (seed: number, i: number) => {
    const r = Math.abs(Math.sin(seed * 9301 + i * 49297) * 233280) % 1;
    if (r < 0.05) return "err";
    if (r < 0.18) return "warn";
    if (r < 0.4) return "info";
    if (r < 0.75) return "med";
    return "low";
  };
  const heatTop = Array.from({ length: cols }, (_, i) => pick(1, i));
  const heatBot = Array.from({ length: cols }, (_, i) => pick(2, i));
  const rows = [
    {
      src: copy.lan,
      user: "王东杰",
      msg: "Storage pool deleted",
      tag: copy.primaryPool,
      when: copy.tenMin,
      level: "warn",
    },
    {
      src: copy.lan,
      user: tx(locale, copy.system),
      msg: "Storage pool formatted",
      tag: "pool-media",
      when: copy.oneHour,
      level: "info",
    },
    {
      src: copy.remote,
      user: "飞毛腿9",
      msg: "SSH login from 118.24.x.x",
      tag: copy.firstRemote,
      when: copy.threeHours,
      level: "warn",
    },
    {
      src: copy.remote,
      user: "unknown",
      msg: "SSH login failed × 12",
      tag: "root · 45.155.x.x",
      when: copy.fourHours,
      level: "err",
    },
    {
      src: copy.system,
      user: tx(locale, copy.system),
      msg: "Automatic snapshot completed",
      tag: "system-daily",
      when: copy.twelveHours,
      level: "ok",
    },
    {
      src: copy.system,
      user: tx(locale, copy.system),
      msg: "Automatic snapshot job scheduled",
      tag: copy.nextAt,
      when: copy.twelveHours,
      level: "info",
    },
    {
      src: copy.lan,
      user: "ggg",
      msg: "Storage pool created",
      tag: "media-pool",
      when: copy.oneDay,
      level: "ok",
    },
    {
      src: copy.lan,
      user: "ggg",
      msg: "File share updated",
      tag: "family-media",
      when: copy.oneDay,
      level: "info",
    },
    {
      src: copy.lan,
      user: "廖韵乔",
      msg: "File share created",
      tag: "family",
      when: copy.oneDay,
      level: "ok",
    },
    {
      src: copy.system,
      user: tx(locale, copy.system),
      msg: "Docker container restarted",
      tag: "jellyfin · exit 137",
      when: copy.twoDays,
      level: "warn",
    },
    {
      src: copy.system,
      user: tx(locale, copy.system),
      msg: "Storage health patrol passed",
      tag: "media-pool · 4/4 healthy",
      when: copy.twoDays,
      level: "ok",
    },
    {
      src: copy.remote,
      user: "服务账号-immich",
      msg: "Backup uploaded 4.2 GB",
      tag: "→ B2 · immich",
      when: copy.twoDays,
      level: "ok",
    },
    {
      src: copy.system,
      user: tx(locale, copy.system),
      msg: tx(locale, copy.cpuWarn),
      tag: copy.duration3,
      when: copy.threeDays,
      level: "warn",
    },
    {
      src: copy.system,
      user: tx(locale, copy.system),
      msg: tx(locale, copy.aiLoaded),
      tag: "Qwen2.5-14B · GGUF",
      when: copy.threeDays,
      level: "info",
    },
    {
      src: copy.lan,
      user: "王东杰",
      msg: "User permission changed",
      tag: `asdfas → ${tx(locale, copy.userPerm)}`,
      when: copy.threeDays,
      level: "info",
    },
    {
      src: copy.remote,
      user: "unknown",
      msg: "WebDAV auth failure",
      tag: "user=admin",
      when: copy.fourDays,
      level: "err",
    },
    {
      src: copy.system,
      user: tx(locale, copy.system),
      msg: "Package upgrade applied",
      tag: "yesnas-core 2.4.1",
      when: copy.fiveDays,
      level: "info",
    },
    {
      src: copy.lan,
      user: "客厅电视",
      msg: "Media stream started",
      tag: "Interstellar · 4K HDR",
      when: copy.fiveDays,
      level: "ok",
    },
    {
      src: copy.system,
      user: tx(locale, copy.system),
      msg: "Vector index compacted",
      tag: "284,192 objects",
      when: copy.sixDays,
      level: "info",
    },
    {
      src: copy.remote,
      user: "财务只读",
      msg: "Shared link downloaded",
      tag: "invoice_2026.zip",
      when: copy.sixDays,
      level: "info",
    },
  ];
  const toneCls = (t: string) =>
    t === "err"
      ? "bg-destructive/70"
      : t === "warn"
        ? "bg-yellow-500/60"
        : t === "info"
          ? "bg-brand-2/70"
          : t === "med"
            ? "bg-border"
            : "bg-muted";
  const dotCls = (l: string) =>
    l === "err"
      ? "bg-destructive"
      : l === "warn"
        ? "bg-yellow-500"
        : l === "info"
          ? "bg-brand-2"
          : "bg-success";
  const badge = (l: string) =>
    l === "err"
      ? "bg-destructive/20 text-destructive"
      : l === "warn"
        ? "bg-yellow-500/20 text-yellow-500"
        : l === "info"
          ? "bg-brand-2/20 text-brand-2"
          : "bg-success/20 text-success";
  const label = (l: string) =>
    l === "err"
      ? tx(locale, copy.err)
      : l === "warn"
        ? tx(locale, copy.warn)
        : l === "info"
          ? tx(locale, copy.info)
          : tx(locale, copy.ok);
  return (
    <div className="p-3 space-y-2 h-full overflow-hidden text-[12px]">
      <div className="flex items-center">
        <div>
          <div className="text-sm font-semibold">{tx(locale, copy.title)}</div>
          <div className="text-[12px] text-muted-foreground">{tx(locale, copy.subtitle)}</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {[copy.hours24, copy.days7, copy.days30, copy.days90, copy.year1].map((t, i) => (
            <span
              key={t.en}
              className={`text-[12px] px-1.5 py-0.5 rounded-full ${i === 3 ? "bg-accent text-foreground" : "text-muted-foreground"}`}
            >
              {tx(locale, t)}
            </span>
          ))}
          <span className="text-[12px] text-muted-foreground ml-1">
            {tx(locale, copy.totalLogs)}
          </span>
        </div>
      </div>
      <div>
        <div
          className="grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
        >
          {heatTop.map((t, i) => (
            <motion.div
              key={`t${i}`}
              className={`h-2 rounded-sm ${toneCls(t)}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.008 }}
            />
          ))}
        </div>
        <div
          className="mt-[2px] grid gap-[2px]"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
        >
          {heatBot.map((t, i) => (
            <motion.div
              key={`b${i}`}
              className={`h-2 rounded-sm ${toneCls(t)}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.008 + 0.12 }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-1 text-[12px] text-muted-foreground">
          <span>2026/4/7</span>
          <span className="flex items-center gap-2">
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-sm bg-brand-2/70" />
              {tx(locale, copy.info)}
            </span>
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-sm bg-yellow-500/60" />
              {tx(locale, copy.warn)}
            </span>
            <span className="flex items-center gap-1">
              <span className="size-1.5 rounded-sm bg-destructive/70" />
              {tx(locale, copy.err)}
            </span>
          </span>
          <span>2026/7/5</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {[
          { l: copy.allLevels, n: 1284, a: true },
          { l: copy.info, n: 892 },
          { l: copy.warn, n: 318 },
          { l: copy.err, n: 74 },
        ].map((t) => (
          <span
            key={t.l.en}
            className={`text-[12px] px-2 py-0.5 rounded-full ${t.a ? "bg-accent text-foreground" : "text-muted-foreground"}`}
          >
            {tx(locale, t.l)} <span className="text-[12px] opacity-70 ml-0.5">{t.n}</span>
          </span>
        ))}
        <div className="ml-auto flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[12px] text-muted-foreground">
          <Search className="size-2.5" /> {tx(locale, copy.search)}
        </div>
      </div>
      <div className="rounded-lg border border-border bg-card divide-y divide-border/60">
        {rows.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.02 }}
            className="grid grid-cols-12 gap-2 items-center px-2.5 py-1"
          >
            <div className="col-span-1 text-[12px] text-muted-foreground">
              {typeof r.src === "string" ? r.src : tx(locale, r.src)}
            </div>
            <div className="col-span-1">
              <span className={`text-[12px] px-1.5 py-0.5 rounded ${badge(r.level)}`}>
                {label(r.level)}
              </span>
            </div>
            <div className="col-span-6 flex items-center gap-1.5 min-w-0">
              <span className={`size-1.5 rounded-full shrink-0 ${dotCls(r.level)}`} />
              <span className="text-[12px] truncate">{r.msg}</span>
              <span className="text-[12px] text-muted-foreground truncate">
                · {typeof r.tag === "string" ? r.tag : tx(locale, r.tag)}
              </span>
            </div>
            <div className="col-span-2 text-[12px] text-muted-foreground truncate">{r.user}</div>
            <div className="col-span-2 text-right text-[12px] text-muted-foreground">
              {tx(locale, r.when)}
            </div>
          </motion.div>
        ))}
        <div className="flex items-center gap-2 px-2.5 py-1.5 text-[12px] text-muted-foreground">
          <span>{tx(locale, copy.pageFooter)}</span>
          <div className="ml-auto flex items-center gap-1">
            {[tx(locale, copy.prev), "1", "2", "3", "...", "65", tx(locale, copy.next)].map(
              (p, i) => (
                <span
                  key={`log-${p}-${i}`}
                  className={`px-1.5 py-0.5 rounded border border-border/60 ${i === 1 ? "bg-accent text-foreground" : ""}`}
                >
                  {p}
                </span>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: AI Hub ---- */
function ScreenAI() {
  const modules = [
    { icon: MessageSquare, name: "AI 助手", desc: "统一自然语言入口" },
    { icon: BrainCircuit, name: "AI 记忆", desc: "跨文件关联 · 长期记忆" },
    { icon: FileSearch, name: "AI 文件", desc: "语义搜索 · 智能命名" },
    { icon: FolderTree, name: "AI 自动整理", desc: "项目 · 生活 · 财务" },
    { icon: Calendar, name: "AI 时间轴", desc: "自动聚合人生事件" },
    { icon: ImageIcon, name: "AI 相册", desc: "人物 · 场景 · 情绪" },
    { icon: Film, name: "AI 视频", desc: "章节 · 精彩片段" },
    { icon: Wand2, name: "AI 影音", desc: "TMDB · 海报 · 摘要" },
    { icon: Music, name: "AI 音乐", desc: "情绪 · 音轨分离" },
    { icon: FileText, name: "AI 文档", desc: "RAG · 问答 · 摘要" },
    { icon: Languages, name: "AI 翻译", desc: "全格式无缝翻译" },
    { icon: Wand2, name: "AI 创作", desc: "海报 · 封面 · 图像" },
    { icon: Workflow, name: "AI 自动化", desc: "一句话生成 Workflow" },
    { icon: Box, name: "Docker", desc: "对话式部署与运维" },
    { icon: Shield, name: "AI 安全", desc: "异常检测 · 勒索预警" },
    { icon: Gauge, name: "AI 系统", desc: "巡检 · 健康 · 优化" },
  ];
  return (
    <div className="p-3.5 h-full space-y-2.5 text-[12px] overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold">AI 中心</div>
        <div className="text-[12px] text-muted-foreground">Personal AI Data Hub · 全部本地推理</div>
        <div className="ml-auto flex items-center gap-2 text-[12px] text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5">
            <Cpu className="size-3" /> 本地推理节点
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5">
            <Zap className="size-3 text-brand" /> NPU · 18.4 TOPS
          </span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <StatBig
          label="AI 能力"
          value="16"
          sub="一级模块全部就绪"
          icon={Sparkles}
          accent="success"
        />
        <StatBig
          label="今日任务"
          value="1,284"
          sub="成功 1,271 · 失败 3"
          icon={Activity}
          progress={99}
        />
        <StatBig
          label="已索引"
          value="284,192"
          sub="文件 · 图像 · 视频 · 文档"
          icon={FileSearch}
          progress={86}
        />
        <StatBig
          label="向量库"
          value="12.4 GB"
          sub="Nomic-Embed · 完全本地"
          icon={Database}
          progress={41}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {modules.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.025 }}
              className="rounded-lg border border-border bg-card p-2 hover:border-brand/40 transition-colors"
            >
              <div className="flex items-center gap-1.5">
                <div className="size-5 rounded-md bg-brand/15 text-brand grid place-items-center">
                  <Icon className="size-3" />
                </div>
                <div className="text-[12px] font-medium truncate">{m.name}</div>
              </div>
              <div className="mt-1 text-[12px] text-muted-foreground truncate">{m.desc}</div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Screen: AI Assistant (统一自然语言入口) ---- */
function ScreenAssistant() {
  const locale = useCurrentLocale();
  const copy = {
    title: {
      en: "AI Assistant",
      zh: "AI 助手",
      ja: "AI アシスタント",
      de: "KI-Assistent",
      fr: "Assistant IA",
      es: "Asistente IA",
      ko: "AI 어시스턴트",
      pt: "Assistente IA",
    },
    subtitle: {
      en: "I do not need to know where the file is. I only need to say what I want.",
      zh: "我不需要知道文件在哪，我只知道我要什么。",
      ja: "ファイルの場所を知らなくても、欲しいものを言うだけです。",
      de: "Ich muss nicht wissen, wo die Datei liegt. Ich sage nur, was ich brauche.",
      fr: "Je n'ai pas besoin de savoir où est le fichier. Je dis seulement ce que je veux.",
      es: "No necesito saber dónde está el archivo. Solo digo lo que quiero.",
      ko: "파일 위치를 몰라도 됩니다. 원하는 것만 말하면 됩니다.",
      pt: "Nao preciso saber onde esta o arquivo. Basta dizer o que quero.",
    },
    query: {
      en: "videos from last year's sushi trip to Tokyo",
      zh: "去年去东京吃寿司的视频",
      ja: "去年の東京すし旅行の動画",
      de: "Videos von der Sushi-Reise nach Tokio im letzten Jahr",
      fr: "videos du voyage sushi a Tokyo l'an dernier",
      es: "videos del viaje de sushi a Tokio del ano pasado",
      ko: "작년 도쿄 스시 여행 영상",
      pt: "videos da viagem de sushi a Toquio no ano passado",
    },
    askHint: {
      en: "Enter to ask · ⌘K",
      zh: "Enter 提问 · ⌘K",
      ja: "Enter で質問 · ⌘K",
      de: "Enter zum Fragen · ⌘K",
      fr: "Entrer pour demander · ⌘K",
      es: "Enter para preguntar · ⌘K",
      ko: "Enter로 질문 · ⌘K",
      pt: "Enter para perguntar · ⌘K",
    },
    searchResults: {
      en: "Cross-type search results",
      zh: "跨类型搜索结果",
      ja: "タイプ横断の検索結果",
      de: "Typuebergreifende Suchergebnisse",
      fr: "Resultats de recherche multi-types",
      es: "Resultados de busqueda entre tipos",
      ko: "유형 간 검색 결과",
      pt: "Resultados entre tipos",
    },
    sorted: {
      en: "42 items · sorted by semantic relevance",
      zh: "共 42 条 · 语义相关度排序",
      ja: "42 件 · 意味的な関連度で並び替え",
      de: "42 Eintraege · nach semantischer Relevanz sortiert",
      fr: "42 elements · tries par pertinence semantique",
      es: "42 elementos · ordenados por relevancia semantica",
      ko: "42개 · 의미 관련도순 정렬",
      pt: "42 itens · ordenados por relevancia semantica",
    },
    summaryTitle: {
      en: "AI summary",
      zh: "AI 归纳",
      ja: "AI 要約",
      de: "KI-Zusammenfassung",
      fr: "Synthese IA",
      es: "Resumen de IA",
      ko: "AI 요약",
      pt: "Resumo de IA",
    },
    generating: {
      en: "Generating · 42 tok/s",
      zh: "生成中 · 42 tok/s",
      ja: "生成中 · 42 tok/s",
      de: "Generiert · 42 tok/s",
      fr: "Generation · 42 tok/s",
      es: "Generando · 42 tok/s",
      ko: "생성 중 · 42 tok/s",
      pt: "Gerando · 42 tok/s",
    },
    summary: {
      en: "You visited Tokyo from August 12-17, 2024 and created 42 related memories:",
      zh: "你在 2024 年 8 月 12–17 日前往东京，共产生 42 条相关记忆：",
      ja: "2024年8月12日から17日まで東京を訪れ、関連する記憶が42件作成されました:",
      de: "Du warst vom 12. bis 17. August 2024 in Tokio und hast 42 passende Erinnerungen erzeugt:",
      fr: "Vous etiez a Tokyo du 12 au 17 aout 2024 et avez cree 42 souvenirs lies:",
      es: "Visitaste Tokio del 12 al 17 de agosto de 2024 y creaste 42 recuerdos relacionados:",
      ko: "2024년 8월 12일부터 17일까지 도쿄를 방문했고 관련 기억 42개가 생성되었습니다:",
      pt: "Voce visitou Toquio de 12 a 17 de agosto de 2024 e criou 42 memorias relacionadas:",
    },
    bullets: {
      en: '· 8/14 Ginza · Jiro Sushi · 1 video · 3 photos · ¥42,800 spent\n· 8/15 Tsukiji Market · 2 videos · 12 photos\n· 6 WeChat messages with spouse mention "come again"\n· Flight and hotel invoices archived to Finance › 2024 › Travel',
      zh: '· 8/14 银座 · 次郎寿司 · 视频 1 段 · 照片 3 张 · 花费 ¥42,800\n· 8/15 筑地市场 · 视频 2 段 · 照片 12 张\n· 与老婆的微信对话 6 条 · 提及"下次还来"\n· 机票 / 酒店发票已归档到 财务 › 2024 › 出行',
      ja: "· 8/14 銀座 · 次郎寿司 · 動画 1 本 · 写真 3 枚 · ¥42,800\n· 8/15 築地市場 · 動画 2 本 · 写真 12 枚\n· 配偶者とのWeChat会話 6 件 · 「また来よう」と記録\n· 航空券 / ホテル領収書を 財務 › 2024 › 旅行 に保存",
      de: '· 14.8. Ginza · Jiro Sushi · 1 Video · 3 Fotos · ¥42.800\n· 15.8. Tsukiji-Markt · 2 Videos · 12 Fotos\n· 6 WeChat-Nachrichten mit Ehepartnerin · "wiederkommen" erwaehnt\n· Flug- und Hotelrechnungen unter Finanzen › 2024 › Reise archiviert',
      fr: '· 14/08 Ginza · Jiro Sushi · 1 video · 3 photos · ¥42 800\n· 15/08 marche de Tsukiji · 2 videos · 12 photos\n· 6 messages WeChat avec votre conjointe mentionnent "revenir"\n· Factures vol / hotel archivees dans Finance › 2024 › Voyage',
      es: '· 14/8 Ginza · Jiro Sushi · 1 video · 3 fotos · ¥42,800\n· 15/8 mercado Tsukiji · 2 videos · 12 fotos\n· 6 mensajes de WeChat con tu pareja mencionan "volver"\n· Facturas de vuelo / hotel archivadas en Finanzas › 2024 › Viaje',
      ko: '· 8/14 긴자 · 지로 스시 · 영상 1개 · 사진 3장 · ¥42,800\n· 8/15 쓰키지 시장 · 영상 2개 · 사진 12장\n· 배우자와의 WeChat 대화 6개 · "다음에도 오자" 언급\n· 항공권 / 호텔 영수증을 재무 › 2024 › 여행에 보관',
      pt: '· 14/8 Ginza · Jiro Sushi · 1 video · 3 fotos · ¥42.800\n· 15/8 mercado Tsukiji · 2 videos · 12 fotos\n· 6 mensagens WeChat com a parceira mencionam "voltar"\n· Faturas de voo / hotel arquivadas em Financas › 2024 › Viagem',
    },
    sources: {
      en: "source types",
      zh: "引用来源",
      ja: "参照元",
      de: "Quellenarten",
      fr: "types de sources",
      es: "tipos de fuentes",
      ko: "출처 유형",
      pt: "tipos de fonte",
    },
    confidence: {
      en: "confidence",
      zh: "可信度",
      ja: "信頼度",
      de: "Vertrauen",
      fr: "confiance",
      es: "confianza",
      ko: "신뢰도",
      pt: "confianca",
    },
    actions: {
      en: "actions",
      zh: "可执行动作",
      ja: "実行可能な操作",
      de: "Aktionen",
      fr: "actions",
      es: "acciones",
      ko: "실행 작업",
      pt: "acoes",
    },
  };
  const tags = [
    {
      en: "Video",
      zh: "视频",
      ja: "動画",
      de: "Video",
      fr: "Video",
      es: "Video",
      ko: "영상",
      pt: "Video",
    },
    {
      en: "Photo",
      zh: "照片",
      ja: "写真",
      de: "Foto",
      fr: "Photo",
      es: "Foto",
      ko: "사진",
      pt: "Foto",
    },
    {
      en: "Live Photo",
      zh: "Live Photo",
      ja: "Live Photo",
      de: "Live Photo",
      fr: "Live Photo",
      es: "Live Photo",
      ko: "Live Photo",
      pt: "Live Photo",
    },
    {
      en: "Chat",
      zh: "聊天",
      ja: "チャット",
      de: "Chat",
      fr: "Chat",
      es: "Chat",
      ko: "채팅",
      pt: "Chat",
    },
    { en: "PDF", zh: "PDF", ja: "PDF", de: "PDF", fr: "PDF", es: "PDF", ko: "PDF", pt: "PDF" },
    {
      en: "Map",
      zh: "地图",
      ja: "地図",
      de: "Karte",
      fr: "Carte",
      es: "Mapa",
      ko: "지도",
      pt: "Mapa",
    },
    {
      en: "Receipt",
      zh: "发票",
      ja: "領収書",
      de: "Beleg",
      fr: "Recu",
      es: "Recibo",
      ko: "영수증",
      pt: "Recibo",
    },
  ];
  const results = [
    {
      icon: Film,
      kind: tags[0],
      title: "东京_寿司店_2024-08-14.mp4",
      meta: {
        en: "Aug 14 · Ginza · 02:31",
        zh: "8月14日 · 银座 · 02:31",
        ja: "8月14日 · 銀座 · 02:31",
        de: "14. Aug. · Ginza · 02:31",
        fr: "14 aout · Ginza · 02:31",
        es: "14 ago · Ginza · 02:31",
        ko: "8월 14일 · 긴자 · 02:31",
        pt: "14 ago · Ginza · 02:31",
      },
      hue: 220,
    },
    {
      icon: ImageIcon,
      kind: tags[1],
      title: "IMG_4021.HEIC · 寿司拼盘",
      meta: {
        en: "3 related Live Photos",
        zh: "3张相关 Live Photo",
        ja: "関連する Live Photo 3枚",
        de: "3 passende Live Photos",
        fr: "3 Live Photos liees",
        es: "3 Live Photos relacionadas",
        ko: "관련 Live Photo 3장",
        pt: "3 Live Photos relacionadas",
      },
      hue: 45,
    },
    {
      icon: MessageSquare,
      kind: tags[3],
      title: tx(locale, {
        en: "WeChat · with spouse",
        zh: "微信 · 与老婆",
        ja: "WeChat · 配偶者と",
        de: "WeChat · mit Ehepartnerin",
        fr: "WeChat · avec votre conjointe",
        es: "WeChat · con tu pareja",
        ko: "WeChat · 배우자와",
        pt: "WeChat · com a parceira",
      }),
      meta: {
        en: "This place is great. Let's come again.",
        zh: "这家很好吃，下次还来",
        ja: "ここはおいしい。また来よう",
        de: "Das ist sehr gut, wir kommen wieder.",
        fr: "Cet endroit est excellent, revenons.",
        es: "Este lugar esta muy bueno, volvamos.",
        ko: "여기 맛있다, 다음에 또 오자",
        pt: "Este lugar e otimo, vamos voltar.",
      },
      hue: 195,
    },
    {
      icon: Receipt,
      kind: tags[6],
      title: "すきやばし次郎_receipt.pdf",
      meta: {
        en: "¥42,800 · OCR complete",
        zh: "¥ 42,800 · 已 OCR",
        ja: "¥42,800 · OCR 済み",
        de: "¥42.800 · OCR abgeschlossen",
        fr: "¥42 800 · OCR termine",
        es: "¥42,800 · OCR completado",
        ko: "¥42,800 · OCR 완료",
        pt: "¥42.800 · OCR concluido",
      },
      hue: 100,
    },
    {
      icon: MapPin,
      kind: tags[5],
      title: tx(locale, {
        en: "Ginza · Jiro Sushi",
        zh: "银座 · 次郎寿司",
        ja: "銀座 · 次郎寿司",
        de: "Ginza · Jiro Sushi",
        fr: "Ginza · Jiro Sushi",
        es: "Ginza · Jiro Sushi",
        ko: "긴자 · 지로 스시",
        pt: "Ginza · Jiro Sushi",
      }),
      meta: {
        en: "IMG_4030 location screenshot",
        zh: "IMG_4030 位置截图",
        ja: "IMG_4030 位置スクリーンショット",
        de: "IMG_4030 Standort-Screenshot",
        fr: "capture d'emplacement IMG_4030",
        es: "captura de ubicacion IMG_4030",
        ko: "IMG_4030 위치 스크린샷",
        pt: "captura de localizacao IMG_4030",
      },
      hue: 275,
    },
    {
      icon: FileText,
      kind: tags[4],
      title: tx(locale, {
        en: "Tokyo_Itinerary_2024.pdf",
        zh: "东京行程_2024.pdf",
        ja: "東京旅程_2024.pdf",
        de: "Tokio_Reiseplan_2024.pdf",
        fr: "Tokyo_itineraire_2024.pdf",
        es: "Tokio_itinerario_2024.pdf",
        ko: "도쿄_일정_2024.pdf",
        pt: "Toquio_roteiro_2024.pdf",
      }),
      meta: {
        en: "flights · hotels · expenses",
        zh: "机票 · 酒店 · 花费",
        ja: "航空券 · ホテル · 費用",
        de: "Fluege · Hotels · Ausgaben",
        fr: "vols · hotels · depenses",
        es: "vuelos · hoteles · gastos",
        ko: "항공권 · 호텔 · 지출",
        pt: "voos · hoteis · despesas",
      },
      hue: 340,
    },
    {
      icon: Calendar,
      kind: {
        en: "Calendar",
        zh: "日程",
        ja: "予定",
        de: "Kalender",
        fr: "Calendrier",
        es: "Calendario",
        ko: "일정",
        pt: "Calendario",
      },
      title: tx(locale, {
        en: "Google Calendar · Tokyo trip",
        zh: "Google Calendar · 东京旅行",
        ja: "Google Calendar · 東京旅行",
        de: "Google Calendar · Tokio-Reise",
        fr: "Google Calendar · voyage a Tokyo",
        es: "Google Calendar · viaje a Tokio",
        ko: "Google Calendar · 도쿄 여행",
        pt: "Google Calendar · viagem a Toquio",
      }),
      meta: {
        en: "Aug 12-17 · 5 places",
        zh: "8月12日-17日 · 5 个地点",
        ja: "8月12日-17日 · 5か所",
        de: "12.-17. Aug. · 5 Orte",
        fr: "12-17 aout · 5 lieux",
        es: "12-17 ago · 5 lugares",
        ko: "8월 12-17일 · 장소 5곳",
        pt: "12-17 ago · 5 lugares",
      },
      hue: 25,
    },
    {
      icon: Upload,
      kind: {
        en: "Backup",
        zh: "备份",
        ja: "バックアップ",
        de: "Backup",
        fr: "Sauvegarde",
        es: "Copia",
        ko: "백업",
        pt: "Backup",
      },
      title: "B2 · JapanTrip_Archive.zip",
      meta: {
        en: "12.8 GB · archived",
        zh: "12.8 GB · 已归档",
        ja: "12.8 GB · アーカイブ済み",
        de: "12,8 GB · archiviert",
        fr: "12,8 Go · archive",
        es: "12.8 GB · archivado",
        ko: "12.8 GB · 보관됨",
        pt: "12,8 GB · arquivado",
      },
      hue: 160,
    },
    {
      icon: Music,
      kind: {
        en: "Audio",
        zh: "音频",
        ja: "音声",
        de: "Audio",
        fr: "Audio",
        es: "Audio",
        ko: "오디오",
        pt: "Audio",
      },
      title: tx(locale, {
        en: "Ginza_street_recording.m4a",
        zh: "银座街头录音.m4a",
        ja: "銀座_街頭録音.m4a",
        de: "Ginza_Strassenaufnahme.m4a",
        fr: "Ginza_enregistrement_rue.m4a",
        es: "Ginza_grabacion_calle.m4a",
        ko: "긴자_거리녹음.m4a",
        pt: "Ginza_gravacao_rua.m4a",
      }),
      meta: {
        en: "ambient audio · 00:48",
        zh: "环境声 · 00:48",
        ja: "環境音 · 00:48",
        de: "Umgebungston · 00:48",
        fr: "son ambiant · 00:48",
        es: "sonido ambiente · 00:48",
        ko: "주변음 · 00:48",
        pt: "som ambiente · 00:48",
      },
      hue: 300,
    },
  ];
  const quickActions = [
    {
      en: "Package these photos for my spouse",
      zh: "把这些照片打包给老婆",
      ja: "この写真を配偶者にまとめる",
      de: "Diese Fotos fuer meine Ehepartnerin packen",
      fr: "Regrouper ces photos pour ma conjointe",
      es: "Empaquetar estas fotos para mi pareja",
      ko: "이 사진들을 배우자에게 묶어 보내기",
      pt: "Agrupar estas fotos para minha parceira",
    },
    {
      en: "Generate a Tokyo timeline",
      zh: "生成东京 Timeline",
      ja: "東京タイムラインを生成",
      de: "Tokio-Timeline erstellen",
      fr: "Generer une timeline de Tokyo",
      es: "Generar una linea de tiempo de Tokio",
      ko: "도쿄 타임라인 생성",
      pt: "Gerar uma timeline de Toquio",
    },
    {
      en: "Write a travel note",
      zh: "写一篇游记",
      ja: "旅行記を書く",
      de: "Reisenotiz schreiben",
      fr: "Ecrire un carnet de voyage",
      es: "Escribir una cronica de viaje",
      ko: "여행기 작성",
      pt: "Escrever um relato de viagem",
    },
  ];
  return (
    <div className="p-3.5 h-full space-y-2.5 text-[12px] overflow-hidden">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-brand" />
        <div className="text-sm font-semibold">{tx(locale, copy.title)}</div>
        <div className="text-[12px] text-muted-foreground">{tx(locale, copy.subtitle)}</div>
        <div className="ml-auto text-[12px] text-success inline-flex items-center gap-1">
          <span className="size-1 rounded-full bg-success animate-pulse" /> Qwen2.5-14B + RAG
        </div>
      </div>

      <div className="rounded-lg border border-brand/40 bg-card p-2.5">
        <div className="flex items-center gap-2">
          <Search className="size-3.5 text-brand" />
          <div className="flex-1 text-[12px] text-foreground">
            {tx(locale, copy.query)}
            <motion.span
              className="inline-block w-[1px] h-3 bg-brand ml-0.5 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <span className="text-[12px] text-muted-foreground">{tx(locale, copy.askHint)}</span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1 text-[12px]">
          {tags.map((t, i) => (
            <span
              key={t.en}
              className={`px-1.5 py-0.5 rounded-full ${
                i < 6 ? "bg-brand/15 text-brand" : "border border-border text-muted-foreground"
              }`}
            >
              #{tx(locale, t)}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1">
        <div className="rounded-lg border border-border bg-card p-2 space-y-1.5 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium">{tx(locale, copy.searchResults)}</span>
            <span className="text-[12px] text-muted-foreground">{tx(locale, copy.sorted)}</span>
          </div>
          {results.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-2 rounded border border-border/60 bg-background/40 p-1.5"
              >
                <div
                  className="size-7 rounded-md grid place-items-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.55 0.18 ${r.hue}), oklch(0.25 0.08 ${(r.hue + 60) % 360}))`,
                  }}
                >
                  <Icon className="size-3 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[12px] font-medium truncate">{r.title}</div>
                  <div className="text-[12px] text-muted-foreground truncate">
                    {tx(locale, r.meta)}
                  </div>
                </div>
                <span className="text-[12px] px-1 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                  {tx(locale, r.kind)}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-card p-2 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Bot className="size-3 text-brand" />
            <span className="text-[12px] font-medium">{tx(locale, copy.summaryTitle)}</span>
            <span className="ml-auto text-[12px] text-muted-foreground">
              {tx(locale, copy.generating)}
            </span>
          </div>
          <div className="text-[12px] leading-relaxed text-foreground/90 space-y-1">
            <p>{tx(locale, copy.summary)}</p>
            <ul className="pl-3 space-y-0.5 text-muted-foreground">
              {tx(locale, copy.bullets)
                .split("\n")
                .map((line) => (
                  <li key={line}>{line}</li>
                ))}
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-1 pt-1 border-t border-border/60 text-[12px]">
            {[
              { l: copy.sources, v: "9 / 42" },
              { l: copy.confidence, v: "96%" },
              { l: copy.actions, v: "6" },
            ].map((m) => (
              <div key={m.l.en} className="rounded border border-border/60 bg-background/40 p-1.5">
                <div className="font-semibold text-foreground">{m.v}</div>
                <div className="text-muted-foreground">{tx(locale, m.l)}</div>
              </div>
            ))}
          </div>
          <div className="pt-1 border-t border-border/60 flex flex-wrap gap-1 text-[12px]">
            {quickActions.map((s) => (
              <span
                key={s.en}
                className="px-1.5 py-0.5 rounded border border-border text-muted-foreground"
              >
                <Lightbulb className="size-2.5 inline mr-0.5 text-brand" />
                {tx(locale, s)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: AI Memory (跨文件记忆 + 时间轴) ---- */
function ScreenMemory() {
  const links = [
    { kind: "订单", label: "淘宝 · MacBook Pro 14", date: "2024-10-08", hue: 45 },
    { kind: "发票", label: "Apple_Invoice_2410.pdf", date: "2024-10-09", hue: 25 },
    { kind: "开箱视频", label: "Unboxing_M4_Pro.mov", date: "2024-10-12", hue: 195 },
    { kind: "聊天", label: "微信 · 与老婆 · 开箱截图", date: "2024-10-12", hue: 340 },
    { kind: "流水", label: "招行 · ¥ 15,999", date: "2024-10-08", hue: 100 },
    { kind: "保修", label: "AppleCare+ 到 2027-10", date: "2027-10-08", hue: 275 },
  ];
  const timeline = [
    { year: "2026", title: "东京 · 樱花之旅", counts: "照片 231 · 视频 8 · 花费 ¥ 38,420" },
    { year: "2025", title: "宝宝的一年", counts: "照片 4,120 · 视频 96 · 里程碑 12" },
    { year: "2024", title: "买了 MacBook Pro 14", counts: "订单 · 发票 · 开箱 · 保修" },
    { year: "2023", title: "创业 · YesNAS 立项", counts: "文档 88 · 提交 1,204 · 会议 46" },
  ];
  return (
    <div className="p-3.5 h-full space-y-2.5 text-[12px] overflow-hidden">
      <div className="flex items-center gap-2">
        <BrainCircuit className="size-4 text-brand" />
        <div className="text-sm font-semibold">AI 记忆</div>
        <div className="text-[12px] text-muted-foreground">
          给你的 NAS 一个记忆——所有文件、时间、人事物自动关联。
        </div>
        <div className="ml-auto text-[12px] text-muted-foreground">向量 12.4 GB · 关联 284k</div>
      </div>

      {/* Memory graph */}
      <div className="rounded-lg border border-border bg-card p-2.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <MessageSquare className="size-3 text-brand" />
          <span className="text-[12px] font-medium">"我什么时候买的 Mac？"</span>
          <span className="ml-auto text-[12px] text-brand">6 条相关记忆 · 自动关联</span>
        </div>
        <div className="relative">
          <div className="grid grid-cols-6 gap-1.5">
            {links.map((l, i) => (
              <motion.div
                key={l.label}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="rounded-md border border-border/60 bg-background/40 p-1.5"
              >
                <div
                  className="h-8 rounded relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, oklch(0.55 0.18 ${l.hue}), oklch(0.22 0.08 ${(l.hue + 60) % 360}))`,
                  }}
                >
                  <div className="absolute top-0.5 left-1 text-[7.5px] px-1 rounded bg-black/40 text-white">
                    {l.kind}
                  </div>
                </div>
                <div className="mt-1 text-[12px] font-medium truncate">{l.label}</div>
                <div className="text-[12px] text-muted-foreground">{l.date}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1 text-[12px] text-muted-foreground">
            <span className="text-brand">AI:</span>
            2024-10-08，淘宝下单 MacBook Pro 14，共 ¥15,999，AppleCare+ 保修至
            2027-10。已打包相关文件到
            <span className="ml-0.5 px-1 rounded bg-muted">/mac-purchase-2024/</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-lg border border-border bg-card p-2.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Calendar className="size-3 text-brand" />
          <span className="text-[12px] font-medium">人生时间轴</span>
          <span className="text-[12px] text-muted-foreground">
            自动聚合照片 · 视频 · 文档 · 花费
          </span>
        </div>
        <div className="relative pl-3">
          <div className="absolute left-1 top-0 bottom-0 w-px bg-border" />
          {timeline.map((t, i) => (
            <motion.div
              key={t.year}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative py-1"
            >
              <span className="absolute -left-2 top-2 size-1.5 rounded-full bg-brand ring-2 ring-background" />
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-mono font-medium text-brand">{t.year}</span>
                <span className="text-[12px] font-medium">{t.title}</span>
                <span className="ml-auto text-[12px] text-muted-foreground">{t.counts}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: AI Files (语义搜索 + 智能整理) ---- */
function ScreenFiles() {
  const locale = useCurrentLocale();
  const copy = {
    title: {
      en: "AI Files",
      zh: "AI 文件",
      ja: "AI ファイル",
      de: "KI-Dateien",
      fr: "Fichiers IA",
      es: "Archivos IA",
      ko: "AI 파일",
      pt: "Arquivos IA",
    },
    subtitle: {
      en: "Semantic search · not OCR, real content understanding",
      zh: "语义搜索 · 不是 OCR，是真正理解内容",
      ja: "意味検索 · OCR ではなく内容を理解",
      de: "Semantische Suche · kein OCR, echtes Inhaltsverständnis",
      fr: "Recherche sémantique · pas seulement OCR, compréhension réelle",
      es: "Búsqueda semántica · no OCR, comprensión real del contenido",
      ko: "의미 검색 · OCR이 아니라 실제 내용 이해",
      pt: "Busca semântica · não OCR, entendimento real do conteúdo",
    },
    indexed: {
      en: "Indexed 284,192 items",
      zh: "已索引 284,192 项",
      ja: "284,192 件を索引済み",
      de: "284.192 Elemente indexiert",
      fr: "284 192 éléments indexés",
      es: "284.192 elementos indexados",
      ko: "284,192개 항목 색인됨",
      pt: "284.192 itens indexados",
    },
    query: {
      en: "Find the blue sports car photos",
      zh: "找那个蓝色跑车的照片",
      ja: "青いスポーツカーの写真を探す",
      de: "Finde die Fotos vom blauen Sportwagen",
      fr: "Trouver les photos de la voiture de sport bleue",
      es: "Buscar las fotos del deportivo azul",
      ko: "파란 스포츠카 사진 찾기",
      pt: "Encontrar as fotos do carro esportivo azul",
    },
    channels: {
      en: "Semantic · vision · OCR across all channels",
      zh: "语义 · 视觉 · OCR 全通道",
      ja: "意味 · 画像認識 · OCR 全チャネル",
      de: "Semantik · Vision · OCR über alle Kanäle",
      fr: "Sémantique · vision · OCR tous canaux",
      es: "Semántica · visión · OCR en todos los canales",
      ko: "의미 · 비전 · OCR 전 채널",
      pt: "Semântica · visão · OCR em todos os canais",
    },
    results: {
      en: "Search results",
      zh: "查询结果",
      ja: "検索結果",
      de: "Suchergebnisse",
      fr: "Résultats",
      es: "Resultados",
      ko: "검색 결과",
      pt: "Resultados",
    },
    resultMeta: {
      en: "42 items · Top 4 · 38 more similar",
      zh: "42 项 · Top 4 · 另有 38 项相似",
      ja: "42 件 · 上位 4 件 · 類似 38 件",
      de: "42 Elemente · Top 4 · 38 weitere ähnliche",
      fr: "42 éléments · Top 4 · 38 similaires",
      es: "42 elementos · Top 4 · 38 similares más",
      ko: "42개 · 상위 4개 · 유사 38개",
      pt: "42 itens · Top 4 · mais 38 similares",
    },
    badges: [
      {
        en: "4 visual matches",
        zh: "视觉匹配 4 项",
        ja: "画像一致 4 件",
        de: "4 visuelle Treffer",
        fr: "4 correspondances visuelles",
        es: "4 coincidencias visuales",
        ko: "시각 일치 4개",
        pt: "4 correspondências visuais",
      },
      {
        en: "Search time 0.42s",
        zh: "搜索耗时 0.42 秒",
        ja: "検索時間 0.42 秒",
        de: "Suchzeit 0,42 s",
        fr: "Recherche en 0,42 s",
        es: "Tiempo de búsqueda 0,42 s",
        ko: "검색 시간 0.42초",
        pt: "Busca em 0,42 s",
      },
      {
        en: "View 38 similar results",
        zh: "可继续查看 38 项相似结果",
        ja: "類似結果を 38 件表示",
        de: "38 ähnliche Ergebnisse ansehen",
        fr: "Voir 38 résultats similaires",
        es: "Ver 38 resultados similares",
        ko: "유사 결과 38개 보기",
        pt: "Ver 38 resultados similares",
      },
    ],
    systemTools: {
      en: "System tools",
      zh: "系统功能",
      ja: "システム機能",
      de: "Systemfunktionen",
      fr: "Outils système",
      es: "Herramientas del sistema",
      ko: "시스템 기능",
      pt: "Ferramentas do sistema",
    },
    dedicatedArea: {
      en: "Dedicated section",
      zh: "独立功能区",
      ja: "専用エリア",
      de: "Eigener Bereich",
      fr: "Zone dédiée",
      es: "Sección dedicada",
      ko: "전용 영역",
      pt: "Área dedicada",
    },
    autoOrganize: {
      en: "Auto organize",
      zh: "自动整理",
      ja: "自動整理",
      de: "Automatisch organisieren",
      fr: "Organisation auto",
      es: "Organización automática",
      ko: "자동 정리",
      pt: "Organização automática",
    },
    running: {
      en: "Running in background",
      zh: "后台运行中",
      ja: "バックグラウンド実行中",
      de: "Läuft im Hintergrund",
      fr: "En arrière-plan",
      es: "En segundo plano",
      ko: "백그라운드 실행 중",
      pt: "Em segundo plano",
    },
  } satisfies Record<string, LocalizedText | LocalizedText[]>;
  const carThumbs = [
    {
      img: car1,
      score: 0.94,
      kind: "photo",
      title: {
        en: "Blue sports car · city street",
        zh: "蓝色跑车 · 城市街道",
        ja: "青いスポーツカー · 市街地",
        de: "Blauer Sportwagen · Stadtstraße",
        fr: "Voiture de sport bleue · rue urbaine",
        es: "Deportivo azul · calle urbana",
        ko: "파란 스포츠카 · 도심 거리",
        pt: "Carro esportivo azul · rua urbana",
      },
      meta: {
        en: "Photo · 2026/05/18 · Album/Cars",
        zh: "照片 · 2026/05/18 · 相册/跑车",
        ja: "写真 · 2026/05/18 · アルバム/車",
        de: "Foto · 18.05.2026 · Album/Autos",
        fr: "Photo · 18/05/2026 · Album/Voitures",
        es: "Foto · 18/05/2026 · Álbum/Coches",
        ko: "사진 · 2026/05/18 · 앨범/자동차",
        pt: "Foto · 18/05/2026 · Álbum/Carros",
      },
    },
    {
      img: car2,
      score: 0.91,
      kind: "photo",
      title: {
        en: "Blue sports car by the coast",
        zh: "海边蓝色跑车",
        ja: "海沿いの青いスポーツカー",
        de: "Blauer Sportwagen an der Küste",
        fr: "Voiture de sport bleue au bord de mer",
        es: "Deportivo azul junto al mar",
        ko: "해변의 파란 스포츠카",
        pt: "Carro esportivo azul no litoral",
      },
      meta: {
        en: "Photo · 2026/05/20 · Travel",
        zh: "照片 · 2026/05/20 · 旅行",
        ja: "写真 · 2026/05/20 · 旅行",
        de: "Foto · 20.05.2026 · Reise",
        fr: "Photo · 20/05/2026 · Voyage",
        es: "Foto · 20/05/2026 · Viaje",
        ko: "사진 · 2026/05/20 · 여행",
        pt: "Foto · 20/05/2026 · Viagem",
      },
    },
    {
      img: car3,
      score: 0.87,
      kind: "photo",
      title: {
        en: "Sports car in underground garage",
        zh: "地下车库跑车",
        ja: "地下ガレージのスポーツカー",
        de: "Sportwagen in der Tiefgarage",
        fr: "Voiture de sport dans un parking souterrain",
        es: "Deportivo en garaje subterráneo",
        ko: "지하 차고의 스포츠카",
        pt: "Esportivo em garagem subterrânea",
      },
      meta: {
        en: "Photo · 2026/04/09 · Garage",
        zh: "照片 · 2026/04/09 · 车库",
        ja: "写真 · 2026/04/09 · ガレージ",
        de: "Foto · 09.04.2026 · Garage",
        fr: "Photo · 09/04/2026 · Garage",
        es: "Foto · 09/04/2026 · Garaje",
        ko: "사진 · 2026/04/09 · 차고",
        pt: "Foto · 09/04/2026 · Garagem",
      },
    },
    {
      img: car4,
      score: 0.82,
      kind: "video",
      title: {
        en: "Mountain road convertible clip",
        zh: "山路敞篷车片段",
        ja: "山道のオープンカー映像",
        de: "Cabrio-Clip auf Bergstraße",
        fr: "Clip cabriolet sur route de montagne",
        es: "Clip de descapotable en carretera de montaña",
        ko: "산길 컨버터블 클립",
        pt: "Clipe de conversível na serra",
      },
      meta: {
        en: "Video · 00:18 · Frames extracted",
        zh: "视频 · 00:18 · 已抽帧",
        ja: "動画 · 00:18 · フレーム抽出済み",
        de: "Video · 00:18 · Frames extrahiert",
        fr: "Vidéo · 00:18 · Images extraites",
        es: "Vídeo · 00:18 · Fotogramas extraídos",
        ko: "비디오 · 00:18 · 프레임 추출됨",
        pt: "Vídeo · 00:18 · quadros extraídos",
      },
    },
  ];
  const autoFolders = [
    {
      name: { en: "Projects › YesNAS", zh: "Projects › YesNAS" },
      count: {
        en: "1,204 items",
        zh: "1,204 项",
        ja: "1,204 件",
        de: "1.204 Elemente",
        fr: "1 204 éléments",
        es: "1.204 elementos",
        ko: "1,204개",
        pt: "1.204 itens",
      },
      hue: 275,
    },
    {
      name: {
        en: "Life › Japan Trip 2026",
        zh: "Life › 日本旅行 2026",
        ja: "生活 › 日本旅行 2026",
        de: "Leben › Japanreise 2026",
        fr: "Vie › Voyage au Japon 2026",
        es: "Vida › Viaje a Japón 2026",
        ko: "생활 › 일본 여행 2026",
        pt: "Vida › Viagem ao Japão 2026",
      },
      count: {
        en: "348 items",
        zh: "348 项",
        ja: "348 件",
        de: "348 Elemente",
        fr: "348 éléments",
        es: "348 elementos",
        ko: "348개",
        pt: "348 itens",
      },
      hue: 195,
    },
    {
      name: {
        en: "Finance › Tax 2025",
        zh: "Finance › Tax 2025",
        ja: "財務 › 税務 2025",
        de: "Finanzen › Steuer 2025",
        fr: "Finance › Impôts 2025",
        es: "Finanzas › Impuestos 2025",
        ko: "재무 › 세금 2025",
        pt: "Finanças › Imposto 2025",
      },
      count: {
        en: "62 items",
        zh: "62 项",
        ja: "62 件",
        de: "62 Elemente",
        fr: "62 éléments",
        es: "62 elementos",
        ko: "62개",
        pt: "62 itens",
      },
      hue: 100,
    },
    {
      name: {
        en: "Family › Baby growth",
        zh: "Family › 宝宝成长",
        ja: "家族 › 子どもの成長",
        de: "Familie › Baby wächst",
        fr: "Famille › Bébé grandit",
        es: "Familia › Crecimiento del bebé",
        ko: "가족 › 아기 성장",
        pt: "Família › Crescimento do bebê",
      },
      count: {
        en: "4,120 items",
        zh: "4,120 项",
        ja: "4,120 件",
        de: "4.120 Elemente",
        fr: "4 120 éléments",
        es: "4.120 elementos",
        ko: "4,120개",
        pt: "4.120 itens",
      },
      hue: 340,
    },
    {
      name: {
        en: "Docs › Contracts",
        zh: "Docs › 合同",
        ja: "文書 › 契約",
        de: "Dokumente › Verträge",
        fr: "Docs › Contrats",
        es: "Docs › Contratos",
        ko: "문서 › 계약",
        pt: "Docs › Contratos",
      },
      count: {
        en: "38 items",
        zh: "38 项",
        ja: "38 件",
        de: "38 Elemente",
        fr: "38 éléments",
        es: "38 elementos",
        ko: "38개",
        pt: "38 itens",
      },
      hue: 45,
    },
    {
      name: {
        en: "Docs › IDs",
        zh: "Docs › 身份证件",
        ja: "文書 › 身分証",
        de: "Dokumente › Ausweise",
        fr: "Docs › Identité",
        es: "Docs › Identificación",
        ko: "문서 › 신분증",
        pt: "Docs › Identidade",
      },
      count: {
        en: "12 items",
        zh: "12 项",
        ja: "12 件",
        de: "12 Elemente",
        fr: "12 éléments",
        es: "12 elementos",
        ko: "12개",
        pt: "12 itens",
      },
      hue: 25,
    },
  ];
  const tools = [
    {
      icon: Search,
      label: {
        en: "Semantic search",
        zh: "语义搜索",
        ja: "意味検索",
        de: "Semantische Suche",
        fr: "Recherche sémantique",
        es: "Búsqueda semántica",
        ko: "의미 검색",
        pt: "Busca semântica",
      },
      desc: {
        en: "Files/photos/videos",
        zh: "文件/图片/视频",
        ja: "ファイル/写真/動画",
        de: "Dateien/Fotos/Videos",
        fr: "Fichiers/photos/vidéos",
        es: "Archivos/fotos/vídeos",
        ko: "파일/사진/영상",
        pt: "Arquivos/fotos/vídeos",
      },
    },
    {
      icon: FolderTree,
      label: {
        en: "Auto organize",
        zh: "自动整理",
        ja: "自動整理",
        de: "Automatisch sortieren",
        fr: "Organisation auto",
        es: "Organización auto",
        ko: "자동 정리",
        pt: "Organização auto",
      },
      desc: {
        en: "Classify and rename",
        zh: "归类与命名",
        ja: "分類と命名",
        de: "Klassifizieren und benennen",
        fr: "Classer et renommer",
        es: "Clasificar y nombrar",
        ko: "분류와 이름 지정",
        pt: "Classificar e renomear",
      },
    },
    {
      icon: Shield,
      label: {
        en: "Permission review",
        zh: "权限复核",
        ja: "権限レビュー",
        de: "Rechteprüfung",
        fr: "Revue des droits",
        es: "Revisión de permisos",
        ko: "권한 검토",
        pt: "Revisão de permissões",
      },
      desc: {
        en: "Sensitive files",
        zh: "敏感文件",
        ja: "機密ファイル",
        de: "Sensible Dateien",
        fr: "Fichiers sensibles",
        es: "Archivos sensibles",
        ko: "민감 파일",
        pt: "Arquivos sensíveis",
      },
    },
    {
      icon: Copy,
      label: {
        en: "Duplicate cleanup",
        zh: "重复清理",
        ja: "重複整理",
        de: "Duplikate bereinigen",
        fr: "Nettoyage doublons",
        es: "Limpiar duplicados",
        ko: "중복 정리",
        pt: "Limpar duplicados",
      },
      desc: {
        en: "Similar files",
        zh: "相似文件",
        ja: "類似ファイル",
        de: "Ähnliche Dateien",
        fr: "Fichiers similaires",
        es: "Archivos similares",
        ko: "유사 파일",
        pt: "Arquivos similares",
      },
    },
    {
      icon: Download,
      label: {
        en: "Batch export",
        zh: "批量导出",
        ja: "一括エクスポート",
        de: "Batch-Export",
        fr: "Export par lot",
        es: "Exportación por lotes",
        ko: "일괄 내보내기",
        pt: "Exportar em lote",
      },
      desc: {
        en: "Pack download",
        zh: "打包下载",
        ja: "まとめてダウンロード",
        de: "Als Paket laden",
        fr: "Téléchargement groupé",
        es: "Descarga empaquetada",
        ko: "묶음 다운로드",
        pt: "Baixar pacote",
      },
    },
    {
      icon: Share2,
      label: {
        en: "Smart sharing",
        zh: "智能分享",
        ja: "スマート共有",
        de: "Smart Sharing",
        fr: "Partage intelligent",
        es: "Compartir inteligente",
        ko: "스마트 공유",
        pt: "Compartilhamento inteligente",
      },
      desc: {
        en: "Temporary links",
        zh: "临时链接",
        ja: "一時リンク",
        de: "Temporäre Links",
        fr: "Liens temporaires",
        es: "Enlaces temporales",
        ko: "임시 링크",
        pt: "Links temporários",
      },
    },
  ];
  const stats = [
    {
      l: {
        en: "Indexing",
        zh: "正在索引",
        ja: "索引中",
        de: "Indexierung",
        fr: "Indexation",
        es: "Indexando",
        ko: "색인 중",
        pt: "Indexando",
      },
      v: "1,842",
      sub: {
        en: "new files",
        zh: "新增文件",
        ja: "新規ファイル",
        de: "neue Dateien",
        fr: "nouveaux fichiers",
        es: "archivos nuevos",
        ko: "새 파일",
        pt: "novos arquivos",
      },
    },
    {
      l: {
        en: "To confirm",
        zh: "待确认",
        ja: "確認待ち",
        de: "Zu bestätigen",
        fr: "À confirmer",
        es: "Por confirmar",
        ko: "확인 대기",
        pt: "A confirmar",
      },
      v: "241",
      sub: {
        en: "organizing suggestions",
        zh: "归类建议",
        ja: "整理提案",
        de: "Sortiervorschläge",
        fr: "suggestions de classement",
        es: "sugerencias de organización",
        ko: "정리 제안",
        pt: "sugestões de organização",
      },
    },
    {
      l: {
        en: "Mergeable",
        zh: "可合并",
        ja: "統合可能",
        de: "Zusammenführbar",
        fr: "Fusion possible",
        es: "Combinables",
        ko: "병합 가능",
        pt: "Mescláveis",
      },
      v: "63",
      sub: {
        en: "duplicate photos",
        zh: "重复照片",
        ja: "重複写真",
        de: "doppelte Fotos",
        fr: "photos en double",
        es: "fotos duplicadas",
        ko: "중복 사진",
        pt: "fotos duplicadas",
      },
    },
    {
      l: {
        en: "Sensitive",
        zh: "敏感文件",
        ja: "機密",
        de: "Sensibel",
        fr: "Sensibles",
        es: "Sensibles",
        ko: "민감 항목",
        pt: "Sensíveis",
      },
      v: "18",
      sub: {
        en: "need permission review",
        zh: "需权限复核",
        ja: "権限レビューが必要",
        de: "Rechteprüfung nötig",
        fr: "droits à revoir",
        es: "requieren revisión",
        ko: "권한 검토 필요",
        pt: "revisar permissões",
      },
    },
  ];
  return (
    <div className="p-3.5 h-full space-y-2.5 text-[12px] overflow-hidden">
      <div className="flex items-center gap-2">
        <FileSearch className="size-4 text-brand" />
        <div className="text-sm font-semibold">{pickLocale(locale, copy.title)}</div>
        <div className="text-[12px] text-muted-foreground">{pickLocale(locale, copy.subtitle)}</div>
        <div className="ml-auto text-[12px] text-muted-foreground">
          {pickLocale(locale, copy.indexed)}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-2 flex items-center gap-2">
        <Search className="size-3.5 text-brand" />
        <span className="text-[12px] font-medium">{pickLocale(locale, copy.query)}</span>
        <span className="ml-auto text-[12px] text-muted-foreground">
          {pickLocale(locale, copy.channels)}
        </span>
      </div>

      <div className="grid grid-cols-[1.25fr_0.85fr] gap-2 flex-1 min-h-0">
        <div className="rounded-lg border border-border bg-card p-2.5 space-y-2">
          <div className="flex items-center gap-2">
            <Search className="size-3 text-brand" />
            <span className="text-[13px] font-semibold">{pickLocale(locale, copy.results)}</span>
            <span className="ml-auto text-[12px] text-muted-foreground">
              {pickLocale(locale, copy.resultMeta)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {carThumbs.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.07 }}
                className={`relative overflow-hidden rounded-md border bg-background/40 group ${
                  i === 0 ? "col-span-2 h-[150px] border-border/60" : "h-[106px] border-border/60"
                }`}
              >
                <img
                  src={r.img}
                  alt={`${pickLocale(locale, r.title)} - YesNAS AI File Search result`}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/10 to-transparent" />
                <div className="absolute top-1 left-1 text-[12px] px-1 py-0.5 rounded bg-black/60 text-white font-mono">
                  {r.score.toFixed(2)}
                </div>
                {r.kind === "video" && (
                  <div className="absolute top-1 right-1 size-4 rounded-full bg-black/60 grid place-items-center">
                    <Play className="size-2 text-white fill-white" />
                  </div>
                )}
                <div className="absolute bottom-1.5 left-1.5 right-1.5">
                  <div className="text-[12px] font-semibold text-white truncate">
                    {pickLocale(locale, r.title)}
                  </div>
                  <div className="text-[11px] text-white/75 truncate">
                    {pickLocale(locale, r.meta)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            {copy.badges.map((item) => (
              <span key={item.en} className="rounded-full bg-muted px-1.5 py-0.5">
                {pickLocale(locale, item)}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2 min-h-0">
          <div className="rounded-lg border border-border bg-card p-2 space-y-1.5">
            <div className="flex items-center gap-1.5 border-b border-border/60 pb-1.5">
              <Layers className="size-3 text-brand" />
              <span className="text-[12px] font-medium">
                {pickLocale(locale, copy.systemTools)}
              </span>
              <span className="ml-auto text-[12px] text-muted-foreground">
                {pickLocale(locale, copy.dedicatedArea)}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {tools.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.label.en}
                    className="rounded-md border border-border/60 bg-background/40 p-1.5"
                  >
                    <div className="flex items-center gap-1 text-[12px] font-medium">
                      <Icon className="size-3 text-brand" />
                      <span className="truncate">{pickLocale(locale, f.label)}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted-foreground truncate">
                      {pickLocale(locale, f.desc)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-2 space-y-1.5">
            <div className="flex items-center gap-1.5">
              <FolderTree className="size-3 text-brand" />
              <span className="text-[12px] font-medium">
                {pickLocale(locale, copy.autoOrganize)}
              </span>
              <span className="ml-auto text-[12px] text-success inline-flex items-center gap-1">
                <span className="size-1 rounded-full bg-success animate-pulse" />{" "}
                {pickLocale(locale, copy.running)}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {autoFolders.slice(0, 6).map((f, i) => (
                <motion.div
                  key={f.name.en}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded border border-border/60 bg-background/40 p-1.5"
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className="size-2 rounded"
                      style={{ background: `oklch(0.65 0.18 ${f.hue})` }}
                    />
                    <span className="text-[12px] font-medium truncate">
                      {pickLocale(locale, f.name)}
                    </span>
                  </div>
                  <div className="text-[12px] text-muted-foreground mt-0.5">
                    {pickLocale(locale, f.count)}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-border/60 text-[12px]">
              {stats.map((m) => (
                <div
                  key={m.l.en}
                  className="rounded border border-border/60 bg-background/40 p-1.5"
                >
                  <div className="font-semibold text-foreground">{m.v}</div>
                  <div className="text-muted-foreground">
                    {pickLocale(locale, m.l)} · {pickLocale(locale, m.sub)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: AI Automation (一句话生成 Workflow) ---- */
function ScreenAutomation() {
  const steps = [
    { icon: Download, name: "监听 · 下载完成", tone: "brand" as const },
    { icon: Wand2, name: "AI 识别影片元数据", tone: "brand-2" as const },
    { icon: ImageIcon, name: "生成海报 · SDXL", tone: "brand" as const },
    { icon: Subtitles, name: "生成中文字幕 · Whisper", tone: "brand-2" as const },
    { icon: FolderTree, name: "移动到 /影视/", tone: "brand" as const },
    { icon: Bell, name: "推送到手机", tone: "brand-2" as const },
  ];
  const workflows = [
    { name: "下载电影自动整理", runs: 128, when: "触发下载完成", on: true },
    { name: "微信截图分类归档", runs: 964, when: "每小时", on: true },
    { name: "凌晨存储健康巡检", runs: 42, when: "每日 03:00", on: true },
    { name: "文档 → 语义索引", runs: 12820, when: "文件变动", on: true },
  ];
  return (
    <div className="p-3.5 h-full space-y-2.5 text-[12px] overflow-hidden">
      <div className="flex items-center gap-2">
        <Workflow className="size-4 text-brand" />
        <div className="text-sm font-semibold">AI 自动化</div>
        <div className="text-[12px] text-muted-foreground">
          一句话生成工作流 · 类似 Apple Shortcuts
        </div>
        <div className="ml-auto text-[12px] text-muted-foreground">
          12 个 Workflow · 今日执行 1,284 次
        </div>
      </div>

      <div className="rounded-lg border border-brand/40 bg-card p-2 flex items-center gap-2">
        <Sparkles className="size-3.5 text-brand" />
        <span className="text-[12px] font-medium">"下载电影以后自动整理"</span>
        <span className="ml-auto text-[12px] text-brand">AI 已生成 6 步 Workflow ↓</span>
      </div>

      {/* Flow */}
      <div className="rounded-lg border border-border bg-card p-2.5">
        <div className="flex items-center justify-between overflow-x-auto">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.name} className="flex items-center gap-1.5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex flex-col items-center gap-1 min-w-[70px]`}
                >
                  <div
                    className={`size-8 rounded-md grid place-items-center ${
                      s.tone === "brand" ? "bg-brand/15 text-brand" : "bg-brand-2/15 text-brand-2"
                    }`}
                  >
                    <Icon className="size-4" />
                  </div>
                  <div className="text-[12px] text-center leading-tight">{s.name}</div>
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: i * 0.1 + 0.05 }}
                    className="w-4 h-px bg-border origin-left"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Existing workflows */}
      <div className="rounded-lg border border-border bg-card p-2 flex-1 min-h-0">
        <div className="flex items-center gap-1.5 mb-1.5">
          <GitBranch className="size-3 text-brand" />
          <span className="text-[12px] font-medium">运行中的 Workflow</span>
          <span className="ml-auto text-[12px] text-success">4 已启用</span>
        </div>
        <div className="space-y-1">
          {workflows.map((w, i) => (
            <motion.div
              key={w.name}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 rounded border border-border/60 bg-background/40 px-2 py-1"
            >
              <div className="size-5 rounded-md bg-brand/15 text-brand grid place-items-center">
                <Workflow className="size-2.5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[12px] font-medium truncate">{w.name}</div>
                <div className="text-[12px] text-muted-foreground truncate">
                  {w.when} · 已执行 {w.runs.toLocaleString()} 次
                </div>
              </div>
              <ToggleOn on={w.on} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: Photos ---- */
type PhotoItem = {
  src: string;
  cat: "宝宝" | "风景" | "票据" | "美食" | "宠物" | "截图";
};

const PHOTO_POOL: PhotoItem[] = [
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

const PHOTO_BUCKETS: {
  key: PhotoItem["cat"];
  label: LocalizedText;
  icon: React.ComponentType<{ className?: string }>;
  hue: number;
}[] = [
  {
    key: "宝宝",
    label: { en: "Baby milestones", zh: "宝宝成长", ja: "赤ちゃんの成長", ko: "아기 성장" },
    icon: Users,
    hue: 25,
  },
  {
    key: "风景",
    label: { en: "Landscapes", zh: "风景", ja: "風景", ko: "풍경" },
    icon: MapPin,
    hue: 195,
  },
  {
    key: "票据",
    label: { en: "Receipts", zh: "票据", ja: "レシート", ko: "영수증" },
    icon: Receipt,
    hue: 45,
  },
  {
    key: "美食",
    label: { en: "Food", zh: "美食", ja: "食べ物", ko: "음식" },
    icon: Sparkles,
    hue: 15,
  },
  {
    key: "宠物",
    label: { en: "Pets", zh: "宠物", ja: "ペット", ko: "반려동물" },
    icon: Star,
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
    icon: FileText,
    hue: 275,
  },
];

function ScreenPhotos() {
  const locale = useCurrentLocale();
  const copy = {
    title: { en: "AI Photos", zh: "AI 相册", ja: "AI 写真", ko: "AI 사진" },
    subtitle: {
      en: "People · places · scenes · events, linked automatically",
      zh: "人物 · 地点 · 场景 · 事件 自动串联",
      ja: "人物 · 場所 · シーン · イベントを自動で関連付け",
      ko: "사람 · 장소 · 장면 · 이벤트 자동 연결",
    },
    today: {
      en: "128 new today · classifying",
      zh: "今日新增 128 张 · 正在分类",
      ja: "本日 128 枚追加 · 分類中",
      ko: "오늘 128장 추가 · 분류 중",
    },
    face: { en: "Face clustering", zh: "人脸聚类", ja: "顔クラスタリング", ko: "얼굴 클러스터링" },
    people24: { en: "24 people", zh: "24 位", ja: "24 人", ko: "24명" },
    auto: {
      en: "AI auto-classification",
      zh: "AI 自动分类",
      ja: "AI 自動分類",
      ko: "AI 자동 분류",
    },
    autoDesc: {
      en: "New photos find the right album by themselves",
      zh: "拖进来的照片，自己找到该去的相册",
      ja: "追加した写真が自分で適切なアルバムを見つけます",
      ko: "새 사진이 스스로 맞는 앨범을 찾습니다",
    },
    live: { en: "Live", zh: "实时", ja: "リアルタイム", ko: "실시간" },
    timeline: {
      en: "Event timeline",
      zh: "事件时间线",
      ja: "イベントタイムライン",
      ko: "이벤트 타임라인",
    },
    linked: { en: "Linked by AI", zh: "AI 自动串联", ja: "AI が自動連携", ko: "AI가 자동 연결" },
    memories: { en: "Featured memories", zh: "精选回忆", ja: "おすすめの思い出", ko: "추천 추억" },
    generated: {
      en: "8 auto-generated sets",
      zh: "自动生成 8 组",
      ja: "自動生成 8 組",
      ko: "자동 생성 8개",
    },
    previous: { en: "Previous memories", zh: "上一组回忆", ja: "前の思い出", ko: "이전 추억" },
    next: { en: "Next memories", zh: "下一组回忆", ja: "次の思い出", ko: "다음 추억" },
    memory: { en: "Memory", zh: "回忆", ja: "思い出", ko: "추억" },
    cleanup: { en: "Cleanup suggestions", zh: "整理建议", ja: "整理の提案", ko: "정리 제안" },
    ready: { en: "Ready", zh: "可执行", ja: "実行可能", ko: "실행 가능" },
    more: { en: "More albums", zh: "更多相册", ja: "さらにアルバム", ko: "더 많은 앨범" },
    moreMeta: {
      en: "32 smart albums · 6 shared albums",
      zh: "32 个智能相册 · 6 个共享相册",
      ja: "32 個のスマートアルバム · 6 個の共有アルバム",
      ko: "스마트 앨범 32개 · 공유 앨범 6개",
    },
    itemUnit: { en: "items", zh: "张", ja: "件", ko: "개" },
    recent: {
      en: "Recent organization",
      zh: "近期整理动态",
      ja: "最近の整理",
      ko: "최근 정리 활동",
    },
    unsorted: { en: "Unsorted", zh: "未整理", ja: "未整理", ko: "미정리" },
  };
  const [tick, setTick] = useState(0);
  const [memoryPage, setMemoryPage] = useState(0);
  // one photo classified per ~1.1s, loops
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1100);
    return () => clearInterval(id);
  }, []);

  // rotating queue of the next 3 unsorted photos
  const queue = useMemo(() => {
    return [0, 1, 2].map((offset) => PHOTO_POOL[(tick + offset) % PHOTO_POOL.length]);
  }, [tick]);

  const currentTarget = queue[0].cat;

  // cumulative count per bucket — grows over time as photos land
  const counts = useMemo(() => {
    const c: Record<PhotoItem["cat"], number> = {
      宝宝: 542,
      风景: 1287,
      票据: 96,
      美食: 331,
      宠物: 214,
      截图: 178,
    };
    for (let i = 0; i <= tick; i++) {
      c[PHOTO_POOL[i % PHOTO_POOL.length].cat] += 1;
    }
    return c;
  }, [tick]);

  const memoryAlbums = [
    {
      img: pBaby1,
      title: { en: "Baby milestones", zh: "宝宝成长", ja: "赤ちゃんの成長", ko: "아기 성장" },
      sub: {
        en: "52 photos · 3 videos",
        zh: "52 张 · 3 段视频",
        ja: "写真 52 枚 · 動画 3 本",
        ko: "사진 52장 · 영상 3개",
      },
    },
    {
      img: pLand2,
      title: { en: "Autumn forest", zh: "秋日森林", ja: "秋の森", ko: "가을 숲" },
      sub: {
        en: "18 photos · landscape",
        zh: "18 张 · 风景",
        ja: "写真 18 枚 · 風景",
        ko: "사진 18장 · 풍경",
      },
    },
    {
      img: pFood1,
      title: { en: "Weekend table", zh: "周末餐桌", ja: "週末の食卓", ko: "주말 식탁" },
      sub: {
        en: "24 photos · food",
        zh: "24 张 · 美食",
        ja: "写真 24 枚 · 食べ物",
        ko: "사진 24장 · 음식",
      },
    },
    {
      img: pBaby2,
      title: { en: "Everyday baby moments", zh: "宝宝日常", ja: "赤ちゃんの日常", ko: "아기 일상" },
      sub: {
        en: "128 photos · family",
        zh: "128 张 · 家庭",
        ja: "写真 128 枚 · 家族",
        ko: "사진 128장 · 가족",
      },
    },
    {
      img: pLand1,
      title: { en: "Tokyo cherry blossoms", zh: "东京樱花", ja: "東京の桜", ko: "도쿄 벚꽃" },
      sub: {
        en: "64 photos · travel",
        zh: "64 张 · 旅行",
        ja: "写真 64 枚 · 旅行",
        ko: "사진 64장 · 여행",
      },
    },
    {
      img: pPet1,
      title: { en: "Pet moments", zh: "宠物瞬间", ja: "ペットの瞬間", ko: "반려동물 순간" },
      sub: {
        en: "31 photos · cute",
        zh: "31 张 · 可爱",
        ja: "写真 31 枚 · かわいい",
        ko: "사진 31장 · 귀여움",
      },
    },
    {
      img: pRec1,
      title: { en: "Life receipts", zh: "生活票据", ja: "生活レシート", ko: "생활 영수증" },
      sub: {
        en: "96 photos · OCR done",
        zh: "96 张 · 已 OCR",
        ja: "写真 96 枚 · OCR 済み",
        ko: "사진 96장 · OCR 완료",
      },
    },
    {
      img: pScr1,
      title: {
        en: "Screenshot clues",
        zh: "截图线索",
        ja: "スクリーンショットの手がかり",
        ko: "스크린샷 단서",
      },
      sub: {
        en: "178 images · QR codes",
        zh: "178 张 · 二维码",
        ja: "画像 178 枚 · QR コード",
        ko: "이미지 178장 · QR 코드",
      },
    },
  ];
  const memoryPageCount = Math.ceil(memoryAlbums.length / 3);
  const visibleMemories = Array.from(
    { length: 3 },
    (_, idx) => memoryAlbums[(memoryPage * 3 + idx) % memoryAlbums.length],
  );

  return (
    <div className="p-3.5 h-full space-y-2.5 text-[12px] overflow-hidden">
      <div className="flex items-center gap-3">
        <ImageIcon className="size-4 text-brand" />
        <div className="text-sm font-semibold">{pickLocale(locale, copy.title)}</div>
        <div className="text-[12px] text-muted-foreground">{pickLocale(locale, copy.subtitle)}</div>
        <div className="ml-auto text-[12px] text-muted-foreground">
          {pickLocale(locale, copy.today)}
        </div>
      </div>

      {/* Faces row */}
      <div className="rounded-lg border border-border bg-card p-2">
        <div className="flex items-center gap-2 mb-1.5">
          <ScanFace className="size-3 text-brand" />
          <span className="text-[12px] font-medium">{pickLocale(locale, copy.face)}</span>
          <span className="text-[12px] text-muted-foreground">
            {pickLocale(locale, copy.people24)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {[
              { en: "Mia", zh: "小雅", ja: "ミア", ko: "미아" },
              { en: "Dad", zh: "爸爸", ja: "お父さん", ko: "아빠" },
              { en: "Mom", zh: "妈妈", ja: "お母さん", ko: "엄마" },
              { en: "David", zh: "David", ja: "David" },
              { en: "Emma", zh: "Emma", ja: "Emma" },
              { en: "Baby", zh: "宝宝", ja: "赤ちゃん", ko: "아기" },
              { en: "Grandma", zh: "外婆", ja: "おばあちゃん", ko: "할머니" },
              { en: "Colleague", zh: "同事", ja: "同僚", ko: "동료" },
              { en: "Friend", zh: "朋友", ja: "友人", ko: "친구" },
            ].map((f, i) => (
              <div key={f.en} className="text-center">
                <div
                  className="size-7 rounded-full ring-1 ring-border"
                  style={{
                    background: `conic-gradient(from ${i * 60}deg, oklch(0.68 0.18 ${(i * 45) % 360}), oklch(0.78 0.14 ${(i * 45 + 180) % 360}))`,
                  }}
                />
                <div className="mt-0.5 text-[12px] text-muted-foreground">
                  {pickLocale(locale, f)}
                </div>
              </div>
            ))}
            <div className="text-center self-center">
              <div className="size-7 rounded-full border border-dashed border-border grid place-items-center text-[12px] text-muted-foreground">
                +15
              </div>
            </div>
          </div>
          <div className="ml-auto grid flex-1 min-w-0 grid-cols-4 gap-1.5">
            {[
              {
                label: {
                  en: "People to confirm",
                  zh: "待确认人物",
                  ja: "確認待ちの人物",
                  ko: "확인할 인물",
                },
                value: "36",
                note: {
                  en: "7 similar-face groups",
                  zh: "7 组相似脸",
                  ja: "類似顔グループ 7 件",
                  ko: "유사 얼굴 그룹 7개",
                },
              },
              {
                label: { en: "Shared albums", zh: "共享相册", ja: "共有アルバム", ko: "공유 앨범" },
                value: "12",
                note: {
                  en: "Family · work",
                  zh: "家庭 · 工作",
                  ja: "家族 · 仕事",
                  ko: "가족 · 업무",
                },
              },
              {
                label: { en: "Most recent", zh: "最近出现", ja: "最近の登場", ko: "최근 등장" },
                value: { en: "Baby", zh: "宝宝", ja: "赤ちゃん", ko: "아기" },
                note: {
                  en: "42 photos today",
                  zh: "今日 42 张",
                  ja: "本日 42 枚",
                  ko: "오늘 사진 42장",
                },
              },
              {
                label: {
                  en: "Device sync",
                  zh: "跨设备同步",
                  ja: "デバイス同期",
                  ko: "기기 동기화",
                },
                value: { en: "4 devices", zh: "4 台", ja: "4 台", ko: "기기 4대" },
                note: {
                  en: "iPhone · camera",
                  zh: "iPhone · 相机",
                  ja: "iPhone · カメラ",
                  ko: "iPhone · 카메라",
                },
              },
            ].map((item) => (
              <div
                key={item.label.en}
                className="rounded-md border border-border/60 bg-background/40 px-2 py-1.5"
              >
                <div className="text-[12px] font-semibold text-foreground">
                  {typeof item.value === "string" ? item.value : pickLocale(locale, item.value)}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground truncate">
                  {pickLocale(locale, item.label)}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground/70 truncate">
                  {pickLocale(locale, item.note)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-classify animation */}
      <div className="rounded-lg border border-border bg-card p-2.5">
        <div className="flex items-center gap-2 mb-2">
          <Wand2 className="size-3 text-brand" />
          <span className="text-[12px] font-medium">{pickLocale(locale, copy.auto)}</span>
          <span className="text-[12px] text-muted-foreground">
            {pickLocale(locale, copy.autoDesc)}
          </span>
          <span className="ml-auto text-[12px] text-success inline-flex items-center gap-1">
            <span className="size-1 rounded-full bg-success animate-pulse" />{" "}
            {pickLocale(locale, copy.live)}
          </span>
        </div>

        <ClassifyStage
          queue={queue}
          currentTarget={currentTarget}
          counts={counts}
          tick={tick}
          locale={locale}
          copy={copy}
        />
      </div>

      {/* Event timeline */}
      <div className="rounded-lg border border-border bg-card p-2">
        <div className="flex items-center gap-2 mb-1.5">
          <Calendar className="size-3 text-brand" />
          <span className="text-[12px] font-medium">{pickLocale(locale, copy.timeline)}</span>
          <span className="text-[12px] text-muted-foreground">
            {pickLocale(locale, copy.linked)}
          </span>
        </div>
        <div className="flex gap-1.5 overflow-hidden">
          {[
            {
              d: "03·15",
              e: { en: "Tokyo blossoms", zh: "东京樱花", ja: "東京の桜", ko: "도쿄 벚꽃" },
              hue: 340,
            },
            {
              d: "05·02",
              e: {
                en: "Baby's 100th day",
                zh: "宝宝百天",
                ja: "赤ちゃんの百日祝い",
                ko: "아기 백일",
              },
              hue: 25,
            },
            { d: "07·20", e: { en: "Bali", zh: "巴厘岛", ja: "バリ", ko: "발리" }, hue: 195 },
            { d: "09·11", e: { en: "Camping", zh: "露营", ja: "キャンプ", ko: "캠핑" }, hue: 145 },
            {
              d: "12·31",
              e: { en: "New Year's Eve", zh: "跨年", ja: "大晦日", ko: "새해 전야" },
              hue: 275,
            },
          ].map((ev) => (
            <div
              key={ev.d}
              className="flex-1 rounded border border-border/60 bg-background/40 px-1.5 py-1"
            >
              <div className="text-[12px] font-mono text-muted-foreground">{ev.d}</div>
              <div className="flex items-center gap-1 mt-0.5">
                <span
                  className="size-1.5 rounded-full"
                  style={{ background: `oklch(0.68 0.18 ${ev.hue})` }}
                />
                <span className="text-[12px] truncate">{pickLocale(locale, ev.e)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Memories and cleanup */}
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-card p-2.5 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="size-3 text-brand" />
            <span className="text-[12px] font-medium">{pickLocale(locale, copy.memories)}</span>
            <span className="ml-auto text-[11px] text-muted-foreground">
              {pickLocale(locale, copy.generated)} · {memoryPage + 1}/{memoryPageCount}
            </span>
            <button
              type="button"
              onClick={() => setMemoryPage((p) => (p - 1 + memoryPageCount) % memoryPageCount)}
              className="size-5 rounded border border-border bg-background/50 grid place-items-center text-muted-foreground hover:text-foreground"
              aria-label={pickLocale(locale, copy.previous)}
            >
              <ChevronLeft className="size-3" />
            </button>
            <button
              type="button"
              onClick={() => setMemoryPage((p) => (p + 1) % memoryPageCount)}
              className="size-5 rounded border border-border bg-background/50 grid place-items-center text-muted-foreground hover:text-foreground"
              aria-label={pickLocale(locale, copy.next)}
            >
              <ChevronRight className="size-3" />
            </button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={memoryPage}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-3 gap-1.5 flex-1"
            >
              {visibleMemories.map((m) => (
                <div
                  key={m.title.en}
                  className="relative min-h-[120px] overflow-hidden rounded-md border border-border/60 bg-background/40"
                >
                  <img
                    src={m.img}
                    alt={`${pickLocale(locale, m.title)} - YesNAS AI Photo Management memory`}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute top-1 left-1 rounded bg-black/45 px-1 text-[10px] text-white/75">
                    {pickLocale(locale, copy.memory)}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-1.5">
                    <div className="truncate text-[12px] font-medium text-white">
                      {pickLocale(locale, m.title)}
                    </div>
                    <div className="truncate text-[12px] text-white/70">
                      {pickLocale(locale, m.sub)}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="rounded-lg border border-border bg-card p-2.5">
          <div className="flex items-center gap-2 mb-2">
            <FileSearch className="size-3 text-brand" />
            <span className="text-[12px] font-medium">{pickLocale(locale, copy.cleanup)}</span>
            <span className="ml-auto text-[11px] text-success inline-flex items-center gap-1">
              <span className="size-1 rounded-full bg-success" /> {pickLocale(locale, copy.ready)}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              {
                label: { en: "Duplicate photos", zh: "重复照片", ja: "重複写真", ko: "중복 사진" },
                value: "63",
                note: {
                  en: "Free up 1.8 GB",
                  zh: "可释放 1.8 GB",
                  ja: "1.8 GB 解放可能",
                  ko: "1.8 GB 확보 가능",
                },
              },
              {
                label: {
                  en: "Blurry photos",
                  zh: "模糊照片",
                  ja: "ぼやけた写真",
                  ko: "흐릿한 사진",
                },
                value: "128",
                note: { en: "Review suggested", zh: "建议复核", ja: "確認を推奨", ko: "검토 권장" },
              },
              {
                label: {
                  en: "Receipt filing",
                  zh: "票据归档",
                  ja: "レシート整理",
                  ko: "영수증 정리",
                },
                value: "96",
                note: {
                  en: "Organize by month",
                  zh: "按月份整理",
                  ja: "月別に整理",
                  ko: "월별 정리",
                },
              },
              {
                label: {
                  en: "Unnamed albums",
                  zh: "未命名相册",
                  ja: "未命名アルバム",
                  ko: "이름 없는 앨범",
                },
                value: "12",
                note: {
                  en: "Can auto-name",
                  zh: "可自动命名",
                  ja: "自動命名できます",
                  ko: "자동 이름 지정 가능",
                },
              },
            ].map((item) => (
              <div
                key={item.label.en}
                className="rounded-md border border-border/60 bg-background/40 p-2"
              >
                <div className="text-[11px] text-muted-foreground">
                  {pickLocale(locale, item.label)}
                </div>
                <div className="mt-0.5 text-[14px] font-semibold text-foreground">{item.value}</div>
                <div className="mt-0.5 truncate text-[12px] text-muted-foreground">
                  {pickLocale(locale, item.note)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Album wall */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-2">
        <div className="rounded-lg border border-border bg-card p-2.5">
          <div className="flex items-center gap-2 mb-2">
            <FolderTree className="size-3 text-brand" />
            <span className="text-[12px] font-medium">{pickLocale(locale, copy.more)}</span>
            <span className="ml-auto text-[11px] text-muted-foreground">
              {pickLocale(locale, copy.moreMeta)}
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {[
              {
                img: pBaby2,
                title: { en: "Baby daily", zh: "宝宝日常", ja: "赤ちゃんの日常", ko: "아기 일상" },
                count: "1,284",
                hue: 25,
              },
              {
                img: pLand1,
                title: { en: "Travel views", zh: "旅行风景", ja: "旅の風景", ko: "여행 풍경" },
                count: "842",
                hue: 195,
              },
              {
                img: pRec2,
                title: { en: "Receipts", zh: "票据归档", ja: "レシート保管", ko: "영수증 보관" },
                count: "316",
                hue: 45,
              },
              {
                img: pPet1,
                title: { en: "Pets", zh: "宠物", ja: "ペット", ko: "반려동물" },
                count: "214",
                hue: 340,
              },
              {
                img: pScr1,
                title: { en: "Screenshots", zh: "截图", ja: "スクリーンショット", ko: "스크린샷" },
                count: "529",
                hue: 275,
              },
              {
                img: pFood1,
                title: { en: "Food", zh: "美食", ja: "食べ物", ko: "음식" },
                count: "331",
                hue: 15,
              },
            ].map((album) => (
              <div
                key={album.title.en}
                className="relative h-24 overflow-hidden rounded-md border border-border/60 bg-background/40"
              >
                <img
                  src={album.img}
                  alt={`${pickLocale(locale, album.title)} - YesNAS AI Photo Management album`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute top-1 left-1 rounded bg-black/45 px-1 text-[10px] text-white/80">
                  {album.count} {pickLocale(locale, copy.itemUnit)}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-1.5">
                  <div className="truncate text-[12px] font-medium text-white">
                    {pickLocale(locale, album.title)}
                  </div>
                  <div className="mt-0.5 h-1 rounded-full bg-white/20 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: "72%", background: `oklch(0.7 0.18 ${album.hue})` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-2.5">
          <div className="flex items-center gap-2 mb-2">
            <Activity className="size-3 text-brand" />
            <span className="text-[12px] font-medium">{pickLocale(locale, copy.recent)}</span>
            <span className="ml-auto text-[11px] text-success">
              {pickLocale(locale, copy.live)}
            </span>
          </div>
          <div className="space-y-1.5">
            {[
              {
                time: { en: "Just now", zh: "刚刚", ja: "たった今", ko: "방금" },
                text: {
                  en: "Identified 18 baby photos and merged them into Baby daily",
                  zh: "识别 18 张宝宝照片，合并到宝宝日常",
                  ja: "赤ちゃんの写真 18 枚を識別し、赤ちゃんの日常に統合",
                  ko: "아기 사진 18장을 인식해 아기 일상에 병합",
                },
              },
              {
                time: { en: "2 min ago", zh: "2 分钟前", ja: "2 分前", ko: "2분 전" },
                text: {
                  en: "Extracted 6 QR codes and 3 receipts from screenshots",
                  zh: "从截图中提取 6 个二维码和 3 张票据",
                  ja: "スクリーンショットから QR コード 6 件とレシート 3 枚を抽出",
                  ko: "스크린샷에서 QR 코드 6개와 영수증 3개 추출",
                },
              },
              {
                time: { en: "8 min ago", zh: "8 分钟前", ja: "8 分前", ko: "8분 전" },
                text: {
                  en: "Found 12 duplicate photos and 420 MB to reclaim",
                  zh: "检测到 12 张重复照片，可释放 420 MB",
                  ja: "重複写真 12 枚を検出、420 MB 解放可能",
                  ko: "중복 사진 12장 감지, 420 MB 확보 가능",
                },
              },
              {
                time: { en: "Today", zh: "今天", ja: "今日", ko: "오늘" },
                text: {
                  en: "Created 3 memories: Tokyo blossoms, camping, New Year's Eve",
                  zh: "自动生成东京樱花、露营、跨年 3 组回忆",
                  ja: "東京の桜、キャンプ、大晦日の思い出を 3 件作成",
                  ko: "도쿄 벚꽃, 캠핑, 새해 전야 추억 3개 생성",
                },
              },
            ].map((item) => (
              <div
                key={item.text.en}
                className="flex items-start gap-2 rounded-md border border-border/60 bg-background/40 px-2 py-1.5"
              >
                <span className="mt-1 size-1.5 rounded-full bg-brand shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12px] truncate">{pickLocale(locale, item.text)}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {pickLocale(locale, item.time)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ClassifyStage({
  queue,
  currentTarget,
  counts,
  tick,
  locale,
  copy,
}: {
  queue: PhotoItem[];
  currentTarget: PhotoItem["cat"];
  counts: Record<PhotoItem["cat"], number>;
  tick: number;
  locale: LocaleCode;
  copy: Record<string, LocalizedText>;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const pileRef = useRef<HTMLDivElement>(null);
  const bucketRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [flight, setFlight] = useState<{ x: number; y: number } | null>(null);

  // recompute target vector whenever the target changes
  useEffect(() => {
    const stage = stageRef.current;
    const pile = pileRef.current;
    const bucket = bucketRefs.current[currentTarget];
    if (!stage || !pile || !bucket) return;
    const sRect = stage.getBoundingClientRect();
    const pRect = pile.getBoundingClientRect();
    const bRect = bucket.getBoundingClientRect();
    // pile origin (top-left of stage-relative pile area)
    const from = {
      x: pRect.left - sRect.left + 12,
      y: pRect.top - sRect.top + 30,
    };
    const to = {
      x: bRect.left - sRect.left + bRect.width / 2 - 40,
      y: bRect.top - sRect.top + bRect.height / 2 - 30,
    };
    setFlight({ x: to.x - from.x, y: to.y - from.y });
  }, [currentTarget, tick]);

  return (
    <div ref={stageRef} className="relative grid grid-cols-[110px_1fr] gap-3 items-start">
      {/* Unsorted pile */}
      <div
        ref={pileRef}
        className="relative h-[110px] rounded-md border border-dashed border-border/70 bg-background/40 overflow-hidden"
      >
        <div className="absolute top-1 left-1.5 text-[10.5px] text-muted-foreground z-10">
          {pickLocale(locale, copy.unsorted)} · {(PHOTO_POOL.length * 137).toLocaleString()}
        </div>
        {/* stacked back cards for depth (static) */}
        {queue.slice(1).map((p, idx) => (
          <img
            key={`bg-${tick}-${idx}`}
            src={p.src}
            alt=""
            loading="lazy"
            className="absolute w-[70px] h-[52px] object-cover rounded shadow-md border border-white/20"
            style={{
              left: 10 + (idx + 1) * 4,
              top: 32 + (idx + 1) * 4,
              transform: `rotate(${-4 + (idx + 1) * 3}deg)`,
              opacity: 0.85 - idx * 0.1,
            }}
          />
        ))}
      </div>

      {/* Buckets */}
      <div className="grid grid-cols-3 gap-1.5">
        {PHOTO_BUCKETS.map((b) => {
          const active = b.key === currentTarget;
          const Icon = b.icon;
          return (
            <motion.div
              key={b.key}
              ref={(el) => {
                bucketRefs.current[b.key] = el;
              }}
              animate={{
                scale: active ? 1.06 : 1,
                borderColor: active ? "oklch(0.7 0.18 260)" : "hsl(var(--border))",
              }}
              transition={{ duration: 0.3 }}
              className="relative rounded-md border border-border bg-background/60 p-1.5 overflow-hidden min-h-[46px]"
            >
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: `linear-gradient(135deg, oklch(0.55 0.15 ${b.hue}), transparent)`,
                }}
              />
              {active && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.6, 0] }}
                  transition={{ duration: 1.1 }}
                  className="absolute inset-0 bg-brand/25"
                />
              )}
              <div className="relative flex items-center gap-1">
                <Icon className="size-2.5 text-foreground/80" />
                <span className="text-[11px] font-medium truncate">
                  {pickLocale(locale, b.label)}
                </span>
              </div>
              <div className="relative mt-0.5 flex items-baseline justify-between">
                <motion.span
                  key={counts[b.key]}
                  initial={{
                    scale: active ? 1.4 : 1,
                    color: active ? "oklch(0.75 0.19 260)" : undefined,
                  }}
                  animate={{ scale: 1, color: "inherit" }}
                  transition={{ duration: 0.5 }}
                  className="text-[12px] font-mono tabular-nums"
                >
                  {counts[b.key].toLocaleString()}
                </motion.span>
                {active && (
                  <motion.span
                    initial={{ scale: 0.5, opacity: 0, y: -4 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    className="text-[10.5px] px-1 rounded bg-brand/30 text-brand font-medium"
                  >
                    +1
                  </motion.span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Flying photo overlay */}
      {flight && (
        <motion.img
          key={`fly-${tick}`}
          src={queue[0].src}
          alt="Unsorted photo classified by YesNAS local AI"
          loading="lazy"
          initial={{ x: 12, y: 30, scale: 1, rotate: -6, opacity: 1 }}
          animate={{
            x: [12, 12 + flight.x * 0.5, 12 + flight.x],
            y: [30, 30 + flight.y * 0.5 - 30, 30 + flight.y],
            scale: [1, 1.15, 0.55],
            rotate: [-6, 6, 14],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 1.0, ease: [0.4, 0, 0.2, 1], times: [0, 0.55, 1] }}
          className="absolute w-[80px] h-[60px] object-cover rounded-md shadow-2xl border-2 border-white/60 pointer-events-none z-30"
          style={{
            left: 0,
            top: 0,
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.35))",
          }}
        />
      )}
    </div>
  );
}

/* ---- AI Multi-Audio-Track Player (animated) ---- */

type AudioTrack = {
  flag: string;
  lang: string;
  name: string;
  displayName: LocalizedText;
  meta: string;
  ai: boolean;
  hue: number;
  subtitle: string;
};

const AUDIO_TRACKS: AudioTrack[] = [
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

function MoviePlayer() {
  const locale = useCurrentLocale();
  const copy = {
    switching: { en: "AI switching", zh: "AI 切换", ja: "AI 切り替え", ko: "AI 전환" },
    subtitles: { en: "Subtitles", zh: "字幕", ja: "字幕", ko: "자막" },
    audioTracks: { en: "Audio tracks", zh: "声轨", ja: "音声トラック", ko: "오디오 트랙" },
    manyLanguages: {
      en: "One movie, many languages",
      zh: "一部电影 N 种语言",
      ja: "1 本の映画を多言語で",
      ko: "영화 한 편, 여러 언어",
    },
    offline: {
      en: "Generated locally · offline",
      zh: "本地生成 · 离线",
      ja: "ローカル生成 · オフライン",
      ko: "로컬 생성 · 오프라인",
    },
  };
  const [active, setActive] = useState(0);
  const [t, setT] = useState(0);
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    const swap = setInterval(() => setActive((a) => (a + 1) % AUDIO_TRACKS.length), 2600);
    return () => clearInterval(swap);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 90);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setProgress((p) => (p >= 72 ? 38 : p + 0.4)), 600);
    return () => clearInterval(id);
  }, []);

  const track = AUDIO_TRACKS[active];

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden flex flex-col">
      {/* Video area */}
      <div className="relative aspect-video w-full overflow-hidden bg-black">
        <video
          src={movieClip}
          poster={interstellarPoster}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: "brightness(0.82) saturate(1.05) contrast(1.05)" }}
        />
        {/* subtle letterbox bars for cinematic feel */}
        <div className="absolute inset-x-0 top-0 h-2 bg-black pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-2 bg-black pointer-events-none" />
        {/* film grain vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 flex items-center gap-2 p-2 text-white bg-gradient-to-b from-black/70 to-transparent">
          <Film className="size-3 text-brand-2" />
          <div className="text-[12px] font-semibold tracking-wide">Interstellar</div>
          <div className="text-[10.5px] text-white/60">2014 · 4K HDR · Dolby Atmos</div>
          <div className="ml-auto flex items-center gap-1">
            <span className="text-[7.5px] px-1 rounded bg-white/10 backdrop-blur text-white/80">
              4K
            </span>
            <span className="text-[7.5px] px-1 rounded bg-white/10 backdrop-blur text-white/80">
              HDR10+
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={active}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                transition={{ duration: 0.25 }}
                className="text-[7.5px] px-1 rounded bg-brand/80 text-white inline-flex items-center gap-0.5"
              >
                <Music className="size-2" /> {track.lang}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Center play indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-9 rounded-full bg-white/15 backdrop-blur border border-white/30 flex items-center justify-center">
            <Play className="size-4 fill-white text-white" />
          </div>
        </div>

        {/* AI dubbing switching toast */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.35 }}
            className="absolute top-9 left-2 flex items-center gap-1 rounded bg-black/60 backdrop-blur px-1.5 py-0.5 text-[12px] text-white border border-white/10"
          >
            <span className="size-1 rounded-full bg-brand animate-pulse" />
            <Wand2 className="size-2 text-brand" />
            <span>
              {pickLocale(locale, copy.switching)} · {track.flag}{" "}
              {pickLocale(locale, track.displayName)}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Subtitle overlay */}
        <div className="absolute inset-x-0 bottom-10 flex justify-center px-4 pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.4 }}
              className="max-w-[92%] text-center"
            >
              <div
                className="inline-block text-[11px] font-medium leading-snug text-white px-2 py-0.5 rounded"
                style={{
                  textShadow: "0 1px 4px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1)",
                  background: "rgba(0,0,0,0.25)",
                }}
              >
                {track.subtitle}
              </div>
              <div className="mt-0.5 text-[7.5px] text-white/60 inline-flex items-center gap-1 justify-center w-full">
                <Subtitles className="size-2 text-brand-2" />
                <span>
                  {pickLocale(locale, copy.subtitles)} · {track.lang}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom controls bar */}
        <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/85 to-transparent">
          <div className="flex items-center gap-1.5">
            <Play className="size-2.5 fill-white text-white" />
            <div className="text-[10.5px] text-white/85 font-mono tabular-nums">
              01:{String(Math.floor(progress / 2 + 5)).padStart(2, "0")} / 02:49
            </div>
            <div className="flex-1 relative h-1 rounded-full bg-white/20 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-brand"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.6, ease: "linear" }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 size-2 rounded-full bg-white shadow"
                style={{ left: `calc(${progress}% - 4px)` }}
              />
            </div>
            {/* mini waveform reacting to active track */}
            <div className="flex items-end gap-[1.5px] h-3 shrink-0">
              {Array.from({ length: 14 }).map((_, b) => {
                const wobble = Math.abs(Math.sin(t * 0.6 + b * 0.55)) * 70 + 15;
                return (
                  <div
                    key={b}
                    className="w-[2px] rounded-sm"
                    style={{
                      height: `${wobble}%`,
                      background: `oklch(0.78 0.18 ${track.hue})`,
                      transition: "height 90ms linear",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Track picker */}
      <div className="p-2.5 space-y-1.5">
        <div className="flex items-center gap-2">
          <Music className="size-3.5 text-brand" />
          <span className="text-[11.5px] font-semibold text-foreground">
            {pickLocale(locale, copy.audioTracks)}
          </span>
          <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[11px] font-medium text-brand">
            AI
          </span>
          <span className="text-[10.5px] text-muted-foreground">
            {pickLocale(locale, copy.manyLanguages)}
          </span>
          <span className="ml-auto text-[11px] text-muted-foreground inline-flex items-center gap-1">
            <Wand2 className="size-2.5 text-brand" /> {pickLocale(locale, copy.offline)}
          </span>
        </div>
        <div className="grid grid-cols-5 gap-1.5">
          {AUDIO_TRACKS.map((tr, i) => {
            const isActive = i === active;
            return (
              <motion.button
                key={tr.name}
                onClick={() => setActive(i)}
                animate={{
                  backgroundColor: isActive
                    ? "color-mix(in oklab, oklch(0.65 0.18 260) 16%, transparent)"
                    : "transparent",
                  borderColor: isActive ? "oklch(0.7 0.18 260)" : "hsl(var(--border) / 0.6)",
                  scale: isActive ? 1.01 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="relative rounded border px-2 py-2 text-center overflow-hidden"
              >
                {isActive && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div
                      className="absolute inset-0 opacity-35"
                      style={{
                        background: `linear-gradient(135deg, oklch(0.28 0.1 ${tr.hue}), oklch(0.18 0.06 ${(tr.hue + 70) % 360}))`,
                      }}
                    />
                    <div className="absolute inset-x-2 bottom-2 flex h-5 items-end justify-center gap-[2px] opacity-95">
                      {Array.from({ length: 18 }).map((_, b) => {
                        const height = Math.abs(Math.sin(t * 0.55 + b * 0.72 + i)) * 72 + 18;
                        return (
                          <span
                            key={b}
                            className="w-[3px] rounded-full"
                            style={{
                              height: `${height}%`,
                              background: `oklch(0.78 0.2 ${tr.hue})`,
                              boxShadow: `0 0 8px oklch(0.72 0.2 ${tr.hue} / 0.55)`,
                              transition: "height 90ms linear",
                            }}
                          />
                        );
                      })}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/10 via-transparent to-background/30" />
                  </div>
                )}
                <span className="relative z-10 block truncate text-[11.5px] font-semibold text-foreground">
                  {tr.lang}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="track-underline"
                    className="absolute bottom-0 inset-x-0 h-[2px] bg-brand"
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: Media ---- */
function ScreenMedia() {
  const locale = useCurrentLocale();
  const copy = {
    title: { en: "Media", zh: "影音", ja: "メディア", ko: "미디어" },
    meta: {
      en: "Movies 386 · Shows 24 · Scraped 402 · TMDB synced",
      zh: "电影 386 · 剧集 24 · 已刮削 402 · TMDB 已同步",
      ja: "映画 386 · シリーズ 24 · 402 件スクレイピング済み · TMDB 同期済み",
      ko: "영화 386 · 시리즈 24 · 스크랩 402 · TMDB 동기화",
    },
    posters: { en: "Posters", zh: "海报", ja: "ポスター", ko: "포스터" },
    subtitles: { en: "Subtitles", zh: "字幕", ja: "字幕", ko: "자막" },
    audio: { en: "Audio", zh: "声轨", ja: "音声", ko: "오디오" },
    queue: {
      en: "Scraping queue",
      zh: "刮削队列",
      ja: "スクレイピングキュー",
      ko: "스크랩 대기열",
    },
    queueMeta: {
      en: "Auto-match TMDB / Douban / TVDB · local AI completion",
      zh: "自动匹配 TMDB / 豆瓣 / TVDB · 本地 AI 补全",
      ja: "TMDB / Douban / TVDB を自動照合 · ローカル AI で補完",
      ko: "TMDB / Douban / TVDB 자동 매칭 · 로컬 AI 보완",
    },
    running: { en: "4 running", zh: "4 个进行中", ja: "4 件実行中", ko: "4개 실행 중" },
    library: {
      en: "Movie library · posters + metadata",
      zh: "影片库 · 海报 + 元数据",
      ja: "映画ライブラリ · ポスター + メタデータ",
      ko: "영화 라이브러리 · 포스터 + 메타데이터",
    },
    all: { en: "All", zh: "全部", ja: "すべて", ko: "전체" },
    shows: { en: "Shows", zh: "剧集", ja: "シリーズ", ko: "시리즈" },
    animation: { en: "Animation", zh: "动画", ja: "アニメ", ko: "애니메이션" },
    docs: { en: "Docs", zh: "纪录片", ja: "ドキュメンタリー", ko: "다큐" },
  };
  const movies = [
    {
      title: {
        en: "Dune · Part Two",
        zh: "沙丘 · 第二部",
        ja: "デューン · パート2",
        ko: "듄 · 파트 2",
      },
      year: 2024,
      hue: 45,
      score: 8.6,
      badge: "4K HDR",
      poster: posterDunePartTwo,
    },
    {
      title: { en: "Oppenheimer", zh: "奥本海默", ja: "オッペンハイマー", ko: "오펜하이머" },
      year: 2023,
      hue: 25,
      score: 8.9,
      badge: "IMAX",
      poster: posterOppenheimer,
    },
    {
      title: {
        en: "Blade Runner 2049",
        zh: "银翼杀手 2049",
        ja: "ブレードランナー 2049",
        ko: "블레이드 러너 2049",
      },
      year: 2017,
      hue: 275,
      score: 8.9,
      badge: "4K",
      poster: posterBladeRunner2049,
    },
    {
      title: { en: "Interstellar", zh: "星际穿越", ja: "インターステラー", ko: "인터스텔라" },
      year: 2014,
      hue: 220,
      score: 9.1,
      badge: "4K HDR",
      poster: posterInterstellar,
    },
    {
      title: { en: "John Wick 4", zh: "疾速追杀 4", ja: "ジョン・ウィック 4", ko: "존 윅 4" },
      year: 2023,
      hue: 340,
      score: 7.8,
      badge: { en: "Dolby", zh: "杜比", ja: "ドルビー", ko: "돌비" },
      poster: posterJohnWick4,
    },
    {
      title: {
        en: "Spider-Man · Across the Spider-Verse",
        zh: "蜘蛛侠 · 纵横宇宙",
        ja: "スパイダーマン · アクロス・ザ・スパイダーバース",
        ko: "스파이더맨 · 어크로스 더 유니버스",
      },
      year: 2023,
      hue: 300,
      score: 8.7,
      badge: "4K",
      poster: posterSpiderVerse,
    },
    {
      title: {
        en: "Killers of the Flower Moon",
        zh: "花月杀手",
        ja: "キラーズ・オブ・ザ・フラワームーン",
        ko: "플라워 킬링 문",
      },
      year: 2023,
      hue: 15,
      score: 7.6,
      badge: "1080p",
      poster: posterKillersFlowerMoon,
    },
    {
      title: {
        en: "Everything Everywhere All at Once",
        zh: "瞬息全宇宙",
        ja: "エブリシング・エブリウェア・オール・アット・ワンス",
        ko: "에브리씽 에브리웨어 올 앳 원스",
      },
      year: 2022,
      hue: 190,
      score: 8.1,
      badge: "4K",
      poster: posterEverythingEverywhere,
    },
    {
      title: {
        en: "Avatar · The Way of Water",
        zh: "阿凡达 · 水之道",
        ja: "アバター · ウェイ・オブ・ウォーター",
        ko: "아바타 · 물의 길",
      },
      year: 2022,
      hue: 200,
      score: 7.9,
      badge: "3D 4K",
      poster: posterAvatarWayOfWater,
    },
    {
      title: { en: "Glass Onion", zh: "利刃出鞘 2", ja: "グラス・オニオン", ko: "글래스 어니언" },
      year: 2022,
      hue: 100,
      score: 7.3,
      badge: "4K",
      poster: posterGlassOnion,
    },
    {
      title: {
        en: "Top Gun · Maverick",
        zh: "壮志凌云 2",
        ja: "トップガン · マーヴェリック",
        ko: "탑건 · 매버릭",
      },
      year: 2022,
      hue: 210,
      score: 8.4,
      badge: "IMAX",
      poster: posterTopGunMaverick,
    },
    {
      title: { en: "The Batman", zh: "蝙蝠侠", ja: "ザ・バットマン", ko: "더 배트맨" },
      year: 2022,
      hue: 260,
      score: 8.0,
      badge: "4K HDR",
      poster: posterTheBatman,
    },
  ];
  const scraping = [
    {
      name: "The.Wild.Robot.2024.2160p.mkv",
      pct: 92,
      status: {
        en: "Matched TMDB · poster downloaded",
        zh: "匹配 TMDB · 已下载海报",
        ja: "TMDB 照合済み · ポスター取得済み",
        ko: "TMDB 매칭 · 포스터 다운로드됨",
      },
    },
    {
      name: "Stranger.Things.S05E01.4K.HEVC.mkv",
      pct: 64,
      status: {
        en: "Scraping episode metadata",
        zh: "刮削剧集元数据",
        ja: "エピソードメタデータを取得中",
        ko: "에피소드 메타데이터 스크랩 중",
      },
    },
    {
      name: "Inception.2010.BluRay.1080p.mkv",
      pct: 100,
      status: {
        en: "Done · plot summary",
        zh: "完成 · 剧情摘要",
        ja: "完了 · あらすじ要約",
        ko: "완료 · 줄거리 요약",
      },
    },
    {
      name: "Lychee.Road.2025.WEB-DL.mp4",
      pct: 38,
      status: {
        en: "Generating Chinese subtitles",
        zh: "生成简中字幕中",
        ja: "中国語字幕を生成中",
        ko: "중국어 자막 생성 중",
      },
    },
  ];
  return (
    <div className="p-3 h-full space-y-2 text-[12px] overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold">{pickLocale(locale, copy.title)}</div>
        <div className="text-[12px] text-muted-foreground">{pickLocale(locale, copy.meta)}</div>
        <div className="ml-auto flex items-center gap-1.5 text-[12px]">
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
            <Wand2 className="size-3 text-brand" /> {pickLocale(locale, copy.posters)}
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
            <Subtitles className="size-3 text-brand-2" /> {pickLocale(locale, copy.subtitles)}
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
            <Music className="size-3 text-brand" /> {pickLocale(locale, copy.audio)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {/* Now playing 2 cols */}
        <div className="col-span-2">
          <MoviePlayer />
        </div>

        {/* Scraping queue 3 cols */}
        <div className="col-span-3 rounded-lg border border-border bg-card p-2.5">
          <div className="flex items-center gap-1.5 mb-1.5">
            <Wand2 className="size-3 text-brand" />
            <span className="text-[13px] font-medium">{pickLocale(locale, copy.queue)}</span>
            <span className="text-[11px] text-muted-foreground">
              {pickLocale(locale, copy.queueMeta)}
            </span>
            <span className="ml-auto text-[11px] text-brand">
              {pickLocale(locale, copy.running)}
            </span>
          </div>
          <div className="space-y-1">
            {scraping.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="text-[11px]"
              >
                <div className="flex items-center gap-2">
                  <Film className="size-2.5 text-muted-foreground shrink-0" />
                  <span className="truncate flex-1 font-mono text-foreground/80">{s.name}</span>
                  <span className="text-muted-foreground">{s.pct}%</span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <div className="flex-1 h-0.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className={`h-full ${s.pct === 100 ? "bg-success" : "bg-brand"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${s.pct}%` }}
                      transition={{ duration: 1 }}
                    />
                  </div>
                  <span className="text-[10.5px] text-muted-foreground w-48 text-right truncate">
                    {pickLocale(locale, s.status)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Poster grid */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <div className="text-[13px] font-medium">{pickLocale(locale, copy.library)}</div>
          <div className="flex gap-2 text-[11px] text-muted-foreground">
            <span className="text-brand">{pickLocale(locale, copy.all)}</span>
            <span>4K</span>
            <span>{pickLocale(locale, copy.shows)}</span>
            <span>{pickLocale(locale, copy.animation)}</span>
            <span>{pickLocale(locale, copy.docs)}</span>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {movies.map((m, i) => (
            <motion.div
              key={pickLocale(locale, m.title)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="relative rounded-md overflow-hidden border border-border aspect-[2/3]"
              style={{
                background: `linear-gradient(160deg, oklch(0.55 0.2 ${m.hue}), oklch(0.15 0.08 ${(m.hue + 60) % 360}))`,
              }}
            >
              <img
                src={m.poster}
                alt={`${pickLocale(locale, m.title)} poster in YesNAS AI Media Server`}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
              <div className="absolute top-1 right-1 text-[9.5px] px-1.5 rounded bg-black/60 text-white backdrop-blur flex items-center gap-0.5">
                <Star className="size-2 fill-yellow-400 text-yellow-400" /> {m.score}
              </div>
              <div className="absolute top-1 left-1 text-[9px] px-1.5 rounded bg-brand/80 text-white">
                {typeof m.badge === "string" ? m.badge : pickLocale(locale, m.badge)}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/85 to-transparent">
                <div className="text-[10.5px] font-medium text-white truncate leading-tight">
                  {pickLocale(locale, m.title)}
                </div>
                <div className="text-[9.5px] text-white/75">{m.year}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: LLM (本地 AI) ---- */
function ScreenLLM() {
  const locale = useCurrentLocale();
  const copy = {
    title: {
      en: "Local AI",
      zh: "本地 AI",
      ja: "ローカル AI",
      de: "Lokale KI",
      fr: "IA locale",
      es: "IA local",
      ko: "로컬 AI",
      pt: "IA local",
    },
    subtitle: {
      en: "llama.cpp · GGUF · fully offline",
      zh: "llama.cpp · GGUF · 完全离线",
      ja: "llama.cpp · GGUF · 完全オフライン",
      de: "llama.cpp · GGUF · vollstaendig offline",
      fr: "llama.cpp · GGUF · entierement hors ligne",
      es: "llama.cpp · GGUF · totalmente offline",
      ko: "llama.cpp · GGUF · 완전 오프라인",
      pt: "llama.cpp · GGUF · totalmente offline",
    },
    localInference: {
      en: "Local inference · 8T",
      zh: "本地推理 · 8T",
      ja: "ローカル推論 · 8T",
      de: "Lokale Inferenz · 8T",
      fr: "Inference locale · 8T",
      es: "Inferencia local · 8T",
      ko: "로컬 추론 · 8T",
      pt: "Inferencia local · 8T",
    },
    residentModels: {
      en: "Resident models",
      zh: "常驻模型",
      ja: "常駐モデル",
      de: "Resident-Modelle",
      fr: "Modeles residents",
      es: "Modelos residentes",
      ko: "상주 모델",
      pt: "Modelos residentes",
    },
    residentSub: {
      en: "Embeddings · speech · 2 chats",
      zh: "嵌入 · 语音 · 2 对话",
      ja: "埋め込み · 音声 · 2 チャット",
      de: "Embeddings · Sprache · 2 Chats",
      fr: "Embeddings · voix · 2 chats",
      es: "Embeddings · voz · 2 chats",
      ko: "임베딩 · 음성 · 대화 2개",
      pt: "Embeddings · voz · 2 chats",
    },
    todayTokens: {
      en: "Today's tokens",
      zh: "今日 Token",
      ja: "今日のトークン",
      de: "Token heute",
      fr: "Tokens du jour",
      es: "Tokens de hoy",
      ko: "오늘 토큰",
      pt: "Tokens de hoje",
    },
    tokenSub: {
      en: "input 820K · output 420K",
      zh: "输入 820K · 输出 420K",
      ja: "入力 820K · 出力 420K",
      de: "Eingabe 820K · Ausgabe 420K",
      fr: "entree 820K · sortie 420K",
      es: "entrada 820K · salida 420K",
      ko: "입력 820K · 출력 420K",
      pt: "entrada 820K · saida 420K",
    },
    avgSpeed: {
      en: "Average speed",
      zh: "平均速度",
      ja: "平均速度",
      de: "Durchschnittstempo",
      fr: "Vitesse moyenne",
      es: "Velocidad media",
      ko: "평균 속도",
      pt: "Velocidade media",
    },
    modelLibrary: {
      en: "Model library",
      zh: "模型库",
      ja: "モデルライブラリ",
      de: "Modellbibliothek",
      fr: "Bibliotheque de modeles",
      es: "Biblioteca de modelos",
      ko: "모델 라이브러리",
      pt: "Biblioteca de modelos",
    },
    addModel: {
      en: "Add model",
      zh: "添加模型",
      ja: "モデルを追加",
      de: "Modell hinzufuegen",
      fr: "Ajouter un modele",
      es: "Anadir modelo",
      ko: "모델 추가",
      pt: "Adicionar modelo",
    },
    localChat: {
      en: "Local chat",
      zh: "本地对话",
      ja: "ローカルチャット",
      de: "Lokaler Chat",
      fr: "Chat local",
      es: "Chat local",
      ko: "로컬 대화",
      pt: "Chat local",
    },
    rag: {
      en: "Qwen2.5-14B · RAG connected",
      zh: "Qwen2.5-14B · 已连接 RAG",
      ja: "Qwen2.5-14B · RAG 接続済み",
      de: "Qwen2.5-14B · RAG verbunden",
      fr: "Qwen2.5-14B · RAG connecte",
      es: "Qwen2.5-14B · RAG conectado",
      ko: "Qwen2.5-14B · RAG 연결됨",
      pt: "Qwen2.5-14B · RAG conectado",
    },
    online: {
      en: "Online",
      zh: "在线",
      ja: "オンライン",
      de: "Online",
      fr: "En ligne",
      es: "En linea",
      ko: "온라인",
      pt: "Online",
    },
    generating: {
      en: "Generating · 42 tok/s",
      zh: "生成中 · 42 tok/s",
      ja: "生成中 · 42 tok/s",
      de: "Generiert · 42 tok/s",
      fr: "Generation · 42 tok/s",
      es: "Generando · 42 tok/s",
      ko: "생성 중 · 42 tok/s",
      pt: "Gerando · 42 tok/s",
    },
    placeholder: {
      en: "Ask the local model, or cite files with @...",
      zh: "向本地模型提问，或 @文件 引用…",
      ja: "ローカルモデルに質問、または @ファイル で引用...",
      de: "Lokales Modell fragen oder Dateien mit @ zitieren...",
      fr: "Demander au modele local, ou citer des fichiers avec @...",
      es: "Pregunta al modelo local o cita archivos con @...",
      ko: "로컬 모델에 질문하거나 @파일로 인용...",
      pt: "Pergunte ao modelo local ou cite arquivos com @...",
    },
    statuses: {
      running: {
        en: "Running",
        zh: "运行中",
        ja: "実行中",
        de: "Laeuft",
        fr: "En cours",
        es: "En ejecucion",
        ko: "실행 중",
        pt: "Em execucao",
      },
      loaded: {
        en: "Loaded",
        zh: "已加载",
        ja: "読み込み済み",
        de: "Geladen",
        fr: "Charge",
        es: "Cargado",
        ko: "로드됨",
        pt: "Carregado",
      },
      ready: {
        en: "Ready",
        zh: "就绪",
        ja: "準備完了",
        de: "Bereit",
        fr: "Pret",
        es: "Listo",
        ko: "준비됨",
        pt: "Pronto",
      },
      downloading: {
        en: "Downloading 78%",
        zh: "下载中 78%",
        ja: "ダウンロード中 78%",
        de: "Download 78%",
        fr: "Telechargement 78%",
        es: "Descargando 78%",
        ko: "다운로드 중 78%",
        pt: "Baixando 78%",
      },
      resident: {
        en: "Resident",
        zh: "常驻",
        ja: "常駐",
        de: "Resident",
        fr: "Resident",
        es: "Residente",
        ko: "상주",
        pt: "Residente",
      },
      idle: {
        en: "Idle",
        zh: "空闲",
        ja: "アイドル",
        de: "Leerlauf",
        fr: "Inactif",
        es: "Inactivo",
        ko: "유휴",
        pt: "Ocioso",
      },
    },
    tags: {
      embed: {
        en: "Embed",
        zh: "嵌入",
        ja: "埋め込み",
        de: "Embedding",
        fr: "Embedding",
        es: "Embedding",
        ko: "임베딩",
        pt: "Embedding",
      },
      speech: {
        en: "Speech",
        zh: "语音",
        ja: "音声",
        de: "Sprache",
        fr: "Voix",
        es: "Voz",
        ko: "음성",
        pt: "Voz",
      },
      image: {
        en: "Image",
        zh: "图像",
        ja: "画像",
        de: "Bild",
        fr: "Image",
        es: "Imagen",
        ko: "이미지",
        pt: "Imagem",
      },
    },
  };
  const models = [
    {
      name: "Qwen2.5-14B-Instruct",
      size: "8.2 GB",
      quant: "Q4_K_M",
      status: "running",
      tps: 42,
      loaded: true,
    },
    {
      name: "Llama-3.1-8B-Instruct",
      size: "4.7 GB",
      quant: "Q5_K_M",
      status: "loaded",
      tps: 68,
      loaded: true,
    },
    {
      name: "DeepSeek-Coder-V2-16B",
      size: "9.1 GB",
      quant: "Q4_K_M",
      status: "ready",
      tps: 0,
      loaded: false,
    },
    {
      name: "Gemma-2-9B-it",
      size: "5.4 GB",
      quant: "Q5_K_M",
      status: "downloading",
      tps: 0,
      loaded: false,
      dl: 78,
    },
    {
      name: "Nomic-Embed-Text",
      size: "137 MB",
      quant: "F16",
      status: "resident",
      tps: 0,
      loaded: true,
      tag: "embed",
    },
    {
      name: "Whisper-large-v3",
      size: "1.5 GB",
      quant: "F16",
      status: "resident",
      tps: 0,
      loaded: true,
      tag: "speech",
    },
    {
      name: "SDXL-Turbo",
      size: "6.9 GB",
      quant: "FP16",
      status: "idle",
      tps: 0,
      loaded: false,
      tag: "image",
    },
  ];
  const messages = [
    {
      role: "user",
      text: tx(locale, {
        en: "Summarize action items from the three newest meeting notes in /docs.",
        zh: "帮我总结 /docs 里最近三份会议纪要的行动项。",
        ja: "/docs の最新3件の議事録からアクション項目を要約して。",
        de: "Fasse die Aktionspunkte aus den drei neuesten Meetingnotizen in /docs zusammen.",
        fr: "Resume les actions des trois derniers comptes rendus dans /docs.",
        es: "Resume las acciones de las tres notas de reunion mas recientes en /docs.",
        ko: "/docs의 최신 회의록 3개에서 실행 항목을 요약해줘.",
        pt: "Resuma os itens de acao das tres notas de reuniao mais recentes em /docs.",
      }),
    },
    {
      role: "ai",
      text: tx(locale, {
        en: "I found 3 local documents and extracted 12 action items, grouped by owner:",
        zh: "已在本地检索 3 份文档并提取 12 条行动项，按负责人分组如下：",
        ja: "ローカルで3件の文書を検索し、12件のアクション項目を担当者別に抽出しました:",
        de: "Ich habe lokal 3 Dokumente gefunden und 12 Aktionspunkte nach Verantwortlichen gruppiert:",
        fr: "J'ai trouve 3 documents locaux et extrait 12 actions, groupees par responsable:",
        es: "Encontre 3 documentos locales y extraje 12 acciones agrupadas por responsable:",
        ko: "로컬 문서 3개를 검색해 실행 항목 12개를 담당자별로 정리했습니다:",
        pt: "Encontrei 3 documentos locais e extrai 12 acoes agrupadas por responsavel:",
      }),
    },
    {
      role: "ai",
      text: tx(locale, {
        en: "· Zhang Wei (4): finish NAS capacity expansion review, prepare monthly storage report...\n· Li Na (5): update Docker image registry, write backup scripts...\n· Wang Fang (3): organize AI photo tag taxonomy...",
        zh: "· 张伟 (4)：完成 NAS 容量扩容评估、准备月度存储报告…\n· 李娜 (5)：更新 Docker 镜像仓库、编写备份脚本…\n· 王芳 (3)：整理 AI 相册标签体系…",
        ja: "· 張偉 (4): NAS 容量拡張評価を完了、月次ストレージ報告を準備...\n· 李娜 (5): Docker イメージリポジトリ更新、バックアップスクリプト作成...\n· 王芳 (3): AI 写真タグ体系を整理...",
        de: "· Zhang Wei (4): NAS-Kapazitaetserweiterung bewerten, Monatsbericht vorbereiten...\n· Li Na (5): Docker-Image-Registry aktualisieren, Backup-Skripte schreiben...\n· Wang Fang (3): AI-Foto-Tag-System ordnen...",
        fr: "· Zhang Wei (4): finaliser l'evaluation d'extension NAS, preparer le rapport mensuel...\n· Li Na (5): mettre a jour le registre Docker, ecrire les scripts de sauvegarde...\n· Wang Fang (3): organiser la taxonomie de tags photo IA...",
        es: "· Zhang Wei (4): completar evaluacion de ampliacion NAS, preparar informe mensual...\n· Li Na (5): actualizar registro Docker, escribir scripts de copia...\n· Wang Fang (3): organizar taxonomia de etiquetas de fotos IA...",
        ko: "· Zhang Wei (4): NAS 용량 확장 평가 완료, 월간 스토리지 보고 준비...\n· Li Na (5): Docker 이미지 저장소 업데이트, 백업 스크립트 작성...\n· Wang Fang (3): AI 사진 태그 체계 정리...",
        pt: "· Zhang Wei (4): concluir avaliacao de expansao do NAS, preparar relatorio mensal...\n· Li Na (5): atualizar registro Docker, criar scripts de backup...\n· Wang Fang (3): organizar taxonomia de tags de fotos IA...",
      }),
    },
    {
      role: "user",
      text: tx(locale, {
        en: "Export Zhang Wei's action items as Markdown to /shares/todo/.",
        zh: "把张伟的行动项导出成 Markdown 到 /共享/todo/ 目录。",
        ja: "張偉のアクション項目を Markdown として /shares/todo/ に書き出して。",
        de: "Exportiere Zhang Weis Aktionspunkte als Markdown nach /shares/todo/.",
        fr: "Exporte les actions de Zhang Wei en Markdown dans /shares/todo/.",
        es: "Exporta las acciones de Zhang Wei como Markdown a /shares/todo/.",
        ko: "Zhang Wei의 실행 항목을 Markdown으로 /shares/todo/에 내보내줘.",
        pt: "Exporte as acoes de Zhang Wei em Markdown para /shares/todo/.",
      }),
    },
  ];
  return (
    <div className="p-3 h-full text-[12px] grid grid-cols-5 gap-2 overflow-hidden">
      {/* Left: models */}
      <div className="col-span-3 flex flex-col gap-2 min-h-0">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold">{tx(locale, copy.title)}</div>
          <div className="text-[12px] text-muted-foreground">{tx(locale, copy.subtitle)}</div>
          <div className="ml-auto flex gap-1 text-[12px]">
            <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
              <Cpu className="size-3" /> {tx(locale, copy.localInference)}
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
              <MemoryStick className="size-3 text-brand" /> 12.4 / 16 GB
            </span>
            <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
              <Zap className="size-3 text-brand-2" /> NPU · INT8
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatBig
            label={tx(locale, copy.residentModels)}
            value="4"
            sub={tx(locale, copy.residentSub)}
            icon={BrainCircuit}
            accent="success"
          />
          <StatBig
            label={tx(locale, copy.todayTokens)}
            value="1.24M"
            sub={tx(locale, copy.tokenSub)}
            icon={Activity}
            progress={72}
          />
          <StatBig
            label={tx(locale, copy.avgSpeed)}
            value="55 t/s"
            sub="Q4_K_M · CPU + NPU"
            icon={Zap}
            progress={55}
          />
        </div>

        <div className="rounded-lg border border-border bg-card flex-1 min-h-0 overflow-hidden">
          <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-border text-[12px]">
            <span className="font-medium">{tx(locale, copy.modelLibrary)}</span>
            <span className="text-muted-foreground">7 个 · 32.1 GB</span>
            <span className="ml-auto inline-flex items-center gap-1 text-brand">
              <Download className="size-3" /> {tx(locale, copy.addModel)}
            </span>
          </div>
          <div className="divide-y divide-border">
            {models.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-2 px-2.5 py-1.5"
              >
                <div
                  className={`size-6 rounded-md grid place-items-center ${
                    m.loaded ? "bg-brand/15 text-brand" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <BrainCircuit className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-medium truncate">{m.name}</span>
                    {m.tag && (
                      <span className="text-[12px] px-1 rounded bg-muted text-muted-foreground">
                        {tx(locale, copy.tags[m.tag as keyof typeof copy.tags])}
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    {m.size} · {m.quant}
                    {m.tps ? ` · ${m.tps} tok/s` : ""}
                  </div>
                  {m.dl && (
                    <div className="mt-1 h-0.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full bg-brand-2"
                        initial={{ width: 0 }}
                        animate={{ width: `${m.dl}%` }}
                        transition={{ duration: 1.2 }}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[12px]">
                  <span
                    className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${
                      m.status === "running"
                        ? "bg-success/15 text-success"
                        : m.loaded
                          ? "bg-brand/15 text-brand"
                          : m.dl
                            ? "bg-brand-2/15 text-brand-2"
                            : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {m.status === "running" && (
                      <span className="size-1 rounded-full bg-success animate-pulse" />
                    )}
                    {tx(locale, copy.statuses[m.status as keyof typeof copy.statuses])}
                  </span>
                  {m.loaded ? (
                    <Pause className="size-3 text-muted-foreground" />
                  ) : (
                    <Play className="size-3 text-muted-foreground" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right: chat */}
      <div className="col-span-2 rounded-lg border border-border bg-card flex flex-col min-h-0 overflow-hidden">
        <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-border">
          <Bot className="size-3.5 text-brand" />
          <span className="text-[12px] font-medium">{tx(locale, copy.localChat)}</span>
          <span className="text-[12px] text-muted-foreground">{tx(locale, copy.rag)}</span>
          <span className="ml-auto text-[12px] text-success inline-flex items-center gap-1">
            <span className="size-1 rounded-full bg-success animate-pulse" />{" "}
            {tx(locale, copy.online)}
          </span>
        </div>
        <div className="flex-1 min-h-0 overflow-hidden p-2 space-y-1.5">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              className={`flex gap-1.5 ${m.role === "user" ? "justify-end" : ""}`}
            >
              {m.role === "ai" && (
                <div className="size-5 shrink-0 rounded-md bg-brand/15 text-brand grid place-items-center">
                  <Sparkles className="size-3" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-md px-2 py-1 text-[12px] leading-snug whitespace-pre-line ${
                  m.role === "user"
                    ? "bg-foreground text-background"
                    : "bg-muted text-foreground/90"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex gap-1.5"
          >
            <div className="size-5 shrink-0 rounded-md bg-brand/15 text-brand grid place-items-center">
              <Sparkles className="size-3" />
            </div>
            <div className="rounded-md bg-muted px-2 py-1 text-[12px] flex items-center gap-1">
              <span className="size-1 rounded-full bg-brand animate-pulse" />
              <span className="size-1 rounded-full bg-brand animate-pulse [animation-delay:.15s]" />
              <span className="size-1 rounded-full bg-brand animate-pulse [animation-delay:.3s]" />
              <span className="ml-1 text-[12px] text-muted-foreground">
                {tx(locale, copy.generating)}
              </span>
            </div>
          </motion.div>
        </div>
        <div className="border-t border-border p-1.5 flex items-center gap-1.5">
          <div className="flex-1 h-6 rounded-md bg-muted/60 border border-border px-2 flex items-center text-[12px] text-muted-foreground">
            {tx(locale, copy.placeholder)}
          </div>
          <div className="size-6 rounded-md bg-brand text-background grid place-items-center">
            <Send className="size-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee logos                                                       */
/* ------------------------------------------------------------------ */

function Marquee() {
  const { t } = useTranslation();
  const items = [
    "本地 AI 推理",
    "语义文件搜索",
    "照片人脸聚类",
    "场景自动识别",
    "影音元数据整理",
    "多语言字幕生成",
    "多音轨增强",
    "本地 RAID 阵列",
    "快照与版本保护",
    "多协议文件共享",
    "家庭成员权限",
    "远程安全访问",
    "应用一键部署",
    "日志审计追踪",
    "数据迁移与备份",
    "私有化运行",
  ];
  return (
    <section className="border-y border-border py-8 overflow-hidden">
      <div className="text-center text-xs md:text-sm font-medium tracking-[0.16em] text-muted-foreground/85 mb-6">
        {t("marquee.title")}
      </div>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <motion.div
          className="flex gap-14 pr-14 whitespace-nowrap text-lg font-medium text-muted-foreground"
          animate={{ x: [0, -600] }}
          transition={{ duration: 22, ease: "linear", repeat: Infinity }}
        >
          {[
            ...(t("marquee.items", { returnObjects: true }) as string[]),
            ...(t("marquee.items", { returnObjects: true }) as string[]),
            ...(t("marquee.items", { returnObjects: true }) as string[]),
          ].map((item, i) => (
            <span key={i} className="opacity-70">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Capability modules — files, photos, media, storage, docker, tunnel  */
/* ------------------------------------------------------------------ */

const CAPABILITY_MODULES = [
  {
    title: "文件自动整理",
    desc: "不用建文件夹、不用记文件名。AI 读懂图片、PDF、视频和文档，自动归类，也能用一句话直接搜出来。",
    icon: FileSearch,
    count: "内容检索",
    tags: ["自动分类", "语义搜索"],
    color: "from-blue-500/10 to-indigo-500/5",
  },
  {
    title: "相册自动归类",
    desc: "人物、宠物、风景、票据、截图自动识别。照片一导入，AI 就帮你分好相册，回忆也自动生成。",
    icon: ImageIcon,
    count: "智能相册",
    tags: ["人脸聚类", "回忆生成"],
    color: "from-rose-500/10 to-pink-500/5",
  },
  {
    title: "影音自动增强",
    desc: "电影剧集自动刮削海报和简介，还能生成字幕、翻译字幕，甚至提供多语言声轨，让本地片库更像流媒体。",
    icon: Film,
    count: "影音增强",
    tags: ["多音轨", "字幕翻译"],
    color: "from-amber-500/10 to-orange-500/5",
  },
  {
    title: "数据安全",
    desc: "多种备份策略自由选择，重要文件随时快照。数据留在本地，本地 AI 帮你识别风险、提醒备份和恢复。",
    icon: HardDrive,
    count: "数据保护",
    tags: ["多重备份", "随时快照"],
    color: "from-emerald-500/10 to-teal-500/5",
  },
  {
    title: "应用自动部署",
    desc: "想装什么直接说。AI 帮你拉镜像、配目录、开端口、看日志，常见问题也能给出修复建议。",
    icon: Box,
    count: "应用运维",
    tags: ["一键部署", "日志诊断"],
    color: "from-sky-500/10 to-cyan-500/5",
  },
  {
    title: "远程自动连接",
    desc: "不用折腾公网 IP 和路由器。出差、办公室、家里都能安全访问，AI 自动选择更稳的连接方式。",
    icon: Network,
    count: "安全远程",
    tags: ["安全访问", "自动路由"],
    color: "from-violet-500/10 to-purple-500/5",
  },
];

function CompatibilityModules() {
  const { t } = useTranslation();
  const modules = t("features.modules", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
    count: string;
    tags: string[];
  }>;
  const featureTags = t("features.tags", { returnObjects: true }) as string[];
  return (
    <section id="features" className="py-28 md:py-36 border-b border-border">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="max-w-3xl mb-16 md:mb-20">
          <div className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground/70 mb-5">
            {t("features.eyebrow")}
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            {t("features.titleA")}{" "}
            <span className="text-muted-foreground">{t("features.titleB")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t("features.desc")}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {featureTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card/50 px-3 py-1 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {modules.map((m, i) => {
            const visual = CAPABILITY_MODULES[i];
            const Icon = visual.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col rounded-2xl border border-border/70 bg-card/30 p-7 md:p-8 overflow-hidden hover:border-border hover:bg-card/50 transition-all duration-300"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${visual.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                <div className="relative">
                  <div className="mb-6 inline-flex items-center justify-center size-12 rounded-xl bg-muted/80 border border-border/50 text-foreground">
                    <Icon className="size-5.5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">{m.desc}</p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-foreground/90">{m.count}</span>
                    <div className="flex flex-wrap justify-end gap-1">
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DemoStrip() {
  const { t } = useTranslation();
  const stripCopies = t("aiApps.strips", { returnObjects: true }) as Array<{
    eyebrow: string;
    title: string;
    desc: string;
  }>;
  const appTags = t("aiApps.tags", { returnObjects: true }) as string[];
  const strips = useMemo(
    () => [
      {
        eyebrow: "AI 文件",
        title: "找蓝色跑车的照片，就是这么简单。",
        desc: "语义搜索理解你说的每一句话——不用记文件名、不用翻文件夹，AI 直接把答案带到你面前。",
        node: <ScreenFiles />,
      },
      {
        eyebrow: "AI 相册",
        title: "照片自动归类，关系清晰可查。",
        desc: "基于人脸、地点、场景和时间自动建立索引，快速整理家庭相册、旅行记录与重要事件。",
        node: <ScreenPhotos />,
      },
      {
        eyebrow: "AI 影音",
        title: "影音元数据自动完善。",
        desc: "自动匹配 TMDB 信息、海报、简介和评分，并结合本地 AI 生成剧情摘要、字幕翻译和多音轨内容。",
        node: <ScreenMedia />,
      },
      {
        eyebrow: "存储",
        title: "本地 RAID 与网络存储统一管理。",
        desc: "支持本地 RAID、外接硬盘与多种网络存储接入，集中展示容量、健康状态、实时 IO 和风险预警。",
        node: <ScreenStorage />,
      },
      {
        eyebrow: "共享",
        title: "跨设备访问统一管理。",
        desc: "统一管理 SMB、NFS、WebDAV 和浏览器访问权限，兼容 Windows、macOS、Linux 与移动设备。",
        node: <ScreenShares />,
      },
      {
        eyebrow: "Docker",
        title: "容器管理，安静而强大。",
        desc: "运行、暂停、日志、端口——不需要打开终端。",
        node: <ScreenDocker />,
      },
    ],

    [],
  );

  return (
    <section id="ai-apps" className="py-28 md:py-36 bg-card/30 border-y border-border scroll-mt-20">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="max-w-4xl mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            {t("aiApps.titleA")}
            <span className="text-muted-foreground">{t("aiApps.titleB")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t("aiApps.desc")}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {appTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-background/50 px-3 py-1 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="divide-y divide-border/70 border-y border-border/70">
        {strips.map((s, i) => {
          const copy = stripCopies[i] ?? s;
          return (
            <div key={s.title}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto max-w-[1320px] px-6 grid md:grid-cols-12 gap-10 md:gap-16 py-20 md:py-24 items-center"
              >
                <div className="md:col-span-4 md:sticky md:top-28 self-start">
                  <div className="text-sm tracking-[0.16em] uppercase text-muted-foreground/75 mb-4">
                    {`0${i + 1}`.slice(-2)} — {copy.eyebrow}
                  </div>
                  <h3 className="text-2xl md:text-[28px] font-semibold tracking-tight leading-tight">
                    {copy.title}
                  </h3>
                  <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed">
                    {copy.desc}
                  </p>
                </div>
                <div className="md:col-span-8 rounded-xl border border-border bg-background shadow-panel overflow-hidden aspect-[16/10]">
                  <div className="h-9 border-b border-border flex items-center gap-1.5 px-3">
                    <span className="size-2 rounded-full bg-destructive/70" />
                    <span className="size-2 rounded-full bg-yellow-500/70" />
                    <span className="size-2 rounded-full bg-success/80" />
                  </div>
                  <div className="relative h-[calc(100%-2.25rem)] overflow-hidden">{s.node}</div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Stack section                                                       */
/* ------------------------------------------------------------------ */

function StackSection() {
  const { t } = useTranslation();
  const steps = t("stack.steps", { returnObjects: true }) as [string, string, string][];
  const runTags = t("stack.runTags", { returnObjects: true }) as string[];
  const itemCopies = t("stack.items", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;
  const items = [
    {
      icon: Server,
      title: "多平台部署",
      desc: "支持 ARM / x86 设备，适配主流 NAS、迷你主机和旧电脑，按硬件条件选择合适安装方式。",
    },
    {
      icon: Upload,
      title: "一键安装",
      desc: "提供自动化安装脚本，完成依赖检测、服务初始化、目录创建和基础配置。",
    },
    {
      icon: Database,
      title: "接入现有存储",
      desc: "可挂载本地磁盘、RAID 阵列和网络存储，文件、相册、影音库无需重新迁移。",
    },
    {
      icon: BrainCircuit,
      title: "启用本地 AI",
      desc: "部署后即可开启文件语义搜索、相册识别、影音元数据整理和字幕生成等本地能力。",
    },
  ];
  return (
    <section id="stack" className="pt-24 md:pt-32 pb-24">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="mb-10 max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            {t("stack.titleA")}
            <span className="text-muted-foreground">{t("stack.titleB")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t("stack.desc")}
          </p>
        </div>
        <div className="mb-20">
          <div className="grid md:grid-cols-4 gap-4">
            {steps.map(([num, title, desc]) => (
              <div key={num} className="rounded-xl border border-border bg-card p-4">
                <div className="text-xs font-semibold text-brand tracking-[0.18em]">{num}</div>
                <div className="mt-3 text-lg font-semibold tracking-tight">{title}</div>
                <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
              {t("stack.runTitleA")}
              <span className="text-gradient-brand">{t("stack.runTitleB")}</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              {t("stack.runDesc")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {runTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-card/50 px-3 py-1 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {items.map((it, i) => {
              const copy = itemCopies[i] ?? it;
              return (
                <motion.div
                  key={it.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="rounded-xl border border-border/70 bg-background/50 p-5 min-h-[150px]"
                >
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-muted/70 border border-border/60 grid place-items-center text-brand">
                      <it.icon className="size-4" />
                    </div>
                    <div className="font-medium tracking-tight">{copy.title}</div>
                  </div>
                  <div className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {copy.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                */
/* ------------------------------------------------------------------ */

function FAQSection() {
  const { t } = useTranslation();
  const items = t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <section id="faq" className="border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-[1000px] px-6">
        <div className="max-w-3xl">
          <div className="mb-5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground/70">
            {t("faq.eyebrow")}
          </div>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">{t("faq.title")}</h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t("faq.desc")}</p>
        </div>
        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card/30">
          {items.map((item) => (
            <details key={item.q} className="group p-5 md:p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium">
                <span>{item.q}</span>
                <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* CTA                                                                 */
/* ------------------------------------------------------------------ */

function CTA() {
  const { t } = useTranslation();
  return (
    <section id="install" className="py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border/60 p-12 md:p-16 text-center">
          <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
          <div
            aria-hidden
            className="absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[36rem] rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: "radial-gradient(closest-side, var(--brand), transparent 70%)" }}
          />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight">
              {t("cta.titleA")} <span className="text-gradient-brand">{t("cta.titleB")}</span>{" "}
              {t("cta.titleC")}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">{t("cta.desc")}</p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <a
                href="https://yesnas.com/install"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:opacity-90 transition"
              >
                {t("cta.install")} <ArrowRight className="size-4" />
              </a>
              <a
                href="https://github.com/i-dj/yesnas"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background/60 px-5 py-2.5 text-sm hover:bg-card transition"
              >
                <Github className="size-4" /> {t("cta.github")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

function InstallCommand({ command }: { command: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  return (
    <div className="group flex items-center gap-1 rounded-md border border-border bg-card/60 backdrop-blur pl-4 pr-1 py-1 transition-colors hover:border-brand/60 hover:bg-card">
      <span className="text-sm font-mono text-muted-foreground group-hover:text-brand transition-colors select-none">
        $
      </span>
      <code className="text-sm font-mono text-foreground group-hover:text-foreground pl-2 pr-3">
        {command}
      </code>
      <button
        type="button"
        aria-label={t("cta.copy")}
        onClick={() => {
          navigator.clipboard.writeText(command);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        }}
        className="inline-flex items-center justify-center rounded p-1.5 text-muted-foreground hover:text-brand hover:bg-brand/10 transition"
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
      </button>
    </div>
  );
}

function Footer() {
  const { t } = useTranslation();
  const locale = useCurrentLocale();
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-[1320px] px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo className="h-5" />
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} YesNAS</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a
            href={localeToLegalPath(locale, "privacy")}
            className="hover:text-foreground transition"
          >
            {t("footer.privacy")}
          </a>
          <a href={localeToLegalPath(locale, "terms")} className="hover:text-foreground transition">
            {t("footer.terms")}
          </a>
          <a href="mailto:admin@yesnas.com" className="hover:text-foreground transition">
            admin@yesnas.com
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Bits                                                                */
/* ------------------------------------------------------------------ */

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs tracking-widest text-muted-foreground uppercase mb-4">
      <span className="size-1 rounded-full bg-brand" />
      {children}
    </div>
  );
}
