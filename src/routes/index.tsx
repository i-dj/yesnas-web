import { createFileRoute } from "@tanstack/react-router";
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
import { getBrowserLocale } from "@/i18n";
import { localeOptions, type LocaleCode } from "@/i18n/locales";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "YesNAS — Personal AI Data Hub" },
      {
        name: "description",
        content:
          "YesNAS 是以 AI 为核心、存储为基础的个人智能数据中枢。语义搜索、跨文件记忆、自动整理、本地 AI——你的数据，AI 让它活起来。",
      },
      { property: "og:title", content: "YesNAS — Personal AI Data Hub" },
      {
        property: "og:description",
        content:
          "以 AI 为核心、存储为基础的个人智能数据中枢。所有推理本地运行，隐私永不离开。",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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

const NAV = [
  { id: "assistant", label: "AI 助手", icon: Sparkles, group: "MAIN" },
  { id: "dashboard", label: "控制台", icon: Gauge, group: "MAIN" },
  { id: "files", label: "文件", icon: FileSearch, group: "AI" },
  { id: "photos", label: "相册", icon: ImageIcon, group: "AI" },
  { id: "media", label: "影音", icon: Film, group: "AI" },
  { id: "docker", label: "Docker", icon: Box, group: "SYSTEM" },
  { id: "llm", label: "本地 AI", icon: Bot, group: "SYSTEM" },
  { id: "storage", label: "存储", icon: HardDrive, group: "SYSTEM" },
  { id: "shares", label: "共享", icon: Share2, group: "SYSTEM" },
  { id: "hardware", label: "硬件信息", icon: Cpu, group: "SYSTEM" },
  { id: "tasks", label: "任务", icon: ListChecks, group: "SYSTEM" },
  { id: "users", label: "用户", icon: Users, group: "SYSTEM" },
  { id: "logs", label: "日志", icon: FileText, group: "SYSTEM" },
] as const;

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <Hero />
      <Marquee />
      <CompatibilityModules />
      
      <DemoStrip />
      <StackSection />
      <CTA />
      <Footer />

    </div>
  );
}


function Header() {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState<LocaleCode>(() => {
    if (typeof window === "undefined") return "system";
    return (window.localStorage.getItem("yesnas-language") as LocaleCode | null) ?? "system";
  });
  const langRef = useRef<HTMLDivElement>(null);
  const selectedLanguageLabel =
    language === "system"
      ? t("nav.system")
      : (localeOptions.find((locale) => locale.code === language)?.label ?? language);

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
  useEffect(() => {
    if (language === "system") {
      const browserLocale = getBrowserLocale();
      i18n.changeLanguage(browserLocale);
      document.documentElement.lang = browserLocale;
      return;
    }

    i18n.changeLanguage(language);
    document.documentElement.lang = language;
  }, [i18n, language]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/70 border-b border-border"
          : "bg-transparent"
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
              <ChevronDown className={`size-4 flex-none transition-transform ${langOpen ? "rotate-180" : ""}`} />
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
                      <button
                        key={locale.code}
                        type="button"
                        onClick={() => {
                          if (locale.code === "system") {
                            window.localStorage.removeItem("yesnas-language");
                          } else {
                            window.localStorage.setItem("yesnas-language", locale.code);
                          }
                          setLanguage(locale.code);
                          setLangOpen(false);
                        }}
                        className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                          active
                            ? "bg-accent text-foreground"
                            : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                        }`}
                      >
                        <span className="min-w-0 truncate">
                          {locale.code === "system" ? t("nav.system") : locale.label}
                        </span>
                        {active && <Check className="size-3.5 text-brand" />}
                      </button>
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
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-4xl px-6 text-center"
      >
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
  const [screen, setScreen] = useState<ScreenId>("media");

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
          <div className="text-xs text-muted-foreground font-mono">
            yesnas.local
          </div>
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
    <svg width="22" height="22" viewBox="0 0 22 22" className="drop-shadow-[0_2px_6px_rgba(0,0,0,.6)]">
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
  return (
    <aside className="w-[210px] shrink-0 border-r border-border bg-card/40 py-4 px-3 hidden sm:block">
      <div className="flex items-center gap-2 px-2 pb-4">
        <Logo className="h-5" />
      </div>
      <div className="space-y-4">
        {groups.map((g) => (
          <div key={g}>
            <div className="px-2 text-[10px] font-medium tracking-widest text-muted-foreground/70">
              {g === "AI" ? "AI 应用" : g}
            </div>
            <div className="mt-1 space-y-0.5">
              {NAV.filter((n) => n.group === g).map((n) => {
                const isActive = active === (n.id as ScreenId);
                const isAssistantHint = n.id === "assistant" && !isActive && !assistantHintDismissed;
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
                      transition={isAssistantHint ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : undefined}
                    >
                      <Icon className="size-3.5" />
                    </motion.span>
                    <motion.span
                      className="relative"
                      animate={isAssistantHint ? { opacity: [0.62, 1, 0.62] } : { opacity: 1 }}
                      transition={isAssistantHint ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" } : undefined}
                    >
                      {n.label}
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
          <span className="text-[12px] font-semibold">Good Evening, Dongjie.</span>
          <span className="text-[12px] text-muted-foreground">
            今天 NAS 帮你完成了这些事——
          </span>
          <span className="ml-auto text-[12px] text-muted-foreground">AI 每日简报 · 22:47</span>
        </div>
        <div className="mt-1.5 grid grid-cols-6 gap-1.5 text-[12px]">
          {[
            { n: "432", l: "新增照片", tone: "brand" },
            { n: "12", l: "新增视频", tone: "brand-2" },
            { n: "5", l: "新增 PDF", tone: "brand" },
            { n: "7 人 · 18 地点", l: "AI 识别", tone: "brand-2" },
            { n: "63 张", l: "重复照片", tone: "brand" },
            { n: "128 GB", l: "建议释放", tone: "brand-2" },
          ].map((k) => (
            <div key={k.l} className="rounded border border-border/60 bg-background/60 px-1.5 py-1">
              <div
                className={`text-[12px] font-semibold ${k.tone === "brand" ? "text-brand" : "text-brand-2"}`}
              >
                {k.n}
              </div>
              <div className="text-muted-foreground truncate">{k.l}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* header row */}
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold text-foreground">系统信息</div>
        <div className="flex items-center gap-1 text-[12px] text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success animate-pulse-dot" />
          最后刷新 00:13:57
        </div>
        <div className="ml-auto flex items-center gap-4 text-[12px] text-muted-foreground">
          <span>⏻ 电源 <span className="text-foreground">AC 供电</span></span>
          <span>▤ 主机名 <span className="text-foreground">yesnas</span></span>
          <span>❈ 风扇 <span className="text-foreground">1240 RPM</span></span>
          <span>⚡ 功耗 <span className="text-foreground">14.6 W</span></span>
        </div>
      </div>

      {/* top stat row */}
      <div className="grid grid-cols-4 gap-2.5">
        <StatBig
          label="系统状态"
          value="运行正常"
          sub="已连续运行 4 天 08 小时"
          icon={Shield}
          accent="success"
        />
        <StatBig
          label="系统盘"
          value="61.3%"
          sub="561 GB / 916 GB · 健康"
          icon={HardDrive}
          progress={61.3}
        />
        <StatBig
          label="负载"
          value="0.30"
          sub="5 分钟 0.20 · 15 分钟 0.20"
          icon={Activity}
        />
        <StatBig
          label="磁盘 IO"
          value="0 B/s"
          sub="读 0 B/s · 写 0 B/s"
          icon={Database}
        />
      </div>

      {/* middle row: chart + hardware */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="col-span-2 rounded-lg border border-border bg-card p-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[12px] font-medium">网络带宽</div>
              <div className="text-[12px] text-muted-foreground">实时 · 全部网卡</div>
            </div>
            <div className="flex items-start gap-4 text-[12px]">
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">↓ 接收</span>
                <span className="font-medium">474 B/s</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">↑ 发送</span>
                <span className="font-medium">1.43 KB/s</span>
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex gap-0.5 rounded-md bg-muted/60 p-0.5 text-[12px]">
              {["实时", "1小时", "1天", "1周", "1月"].map((t, i) => (
                <span
                  key={t}
                  className={`px-2 py-0.5 rounded ${
                    i === 0
                      ? "bg-background text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="text-[12px] px-2 py-0.5 rounded border border-border text-muted-foreground">
              全部网卡 ▾
            </div>
          </div>
          <NetChart />
          <div className="flex justify-between text-[12px] text-muted-foreground/70 mt-1 px-1">
            {["-16s", "-14s", "-12s", "-10s", "-8s", "-6s", "-4s", "-2s", "now"].map(
              (t) => (
                <span key={t}>{t}</span>
              ),
            )}
          </div>
          <div className="flex justify-center gap-3 text-[12px] mt-1">
            <span className="flex items-center gap-1 text-muted-foreground">
              <span className="w-3 h-px bg-brand" /> 发送
            </span>
            <span className="flex items-center gap-1 text-muted-foreground">
              <span className="w-3 h-px bg-brand-2" /> 接收
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <HardwareRow
            title="计算引擎"
            subtitle="本地 AI 与 NAS 服务调度"
            percent={1.5}
            tone="brand"
            rows={[
              ["核心", "4 核 4 线程"],
              ["风扇", "1240 RPM"],
              ["功率", "6.2 W"],
            ]}
          />
          <HardwareRow
            title="内存"
            subtitle="15.4 GB · DDR5 · 4800MHz"
            percent={23}
            tone="brand-2"
            rows={[
              ["已用", "3.54 GB"],
              ["可用", "11.9 GB"],
            ]}
          />
          <HardwareRow
            title="媒体引擎"
            subtitle="影音转码 · 图像识别加速"
            percent={12}
            tone="brand"
            rows={[
              ["显存", "共享 2 GB"],
              ["功率", "1.8 W"],
              ["温度", "42 °C"],
            ]}
          />
        </div>
      </div>

      {/* bottom summary row */}
      <div className="grid grid-cols-3 gap-2.5">
        <SummaryCard
          icon={Layers}
          title="存储池"
          kpis={[
            ["4", "存储池"],
            ["4", "健康"],
          ]}
          rows={[
            { label: "已挂载", value: "4", tone: "muted" },
            { label: "异常", value: "0", tone: "success" },
          ]}
        />
        <SummaryCard
          icon={Share2}
          title="文件共享"
          kpis={[
            ["12", "共享目录"],
            ["6", "在线用户"],
          ]}
          rows={[
            { label: "SMB", value: "2 在线", tone: "success" },
            { label: "FTP", value: "2 在线", tone: "success" },
            { label: "NFS", value: "0 在线", tone: "muted" },
            { label: "WebDAV", value: "4 在线", tone: "success" },
          ]}
          fourCols
        />
        <SummaryCard
          icon={Box}
          title="Docker 容器"
          kpis={[
            ["2", "镜像"],
            ["2", "容器"],
          ]}
          rows={[
            { label: "运行中", value: "2", tone: "success" },
            { label: "已停止", value: "0", tone: "muted" },
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
            accent === "success"
              ? "bg-success/15 text-success"
              : "bg-muted text-muted-foreground"
          }`}
        >
          <Icon className="size-3" />
        </div>
      </div>
      <div className="mt-1 text-base font-semibold tracking-tight text-foreground">
        {value}
      </div>
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
      <div
        className={`mt-2 grid gap-1.5 ${
          fourCols ? "grid-cols-4" : "grid-cols-2"
        }`}
      >
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
            <div className="text-[12px] font-semibold text-foreground">
              {r.value}
            </div>
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
        <Icon
          className={`size-3.5 ${accent === "success" ? "text-success" : ""}`}
        />
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
  const disks = [
    { name: "Lexar SSD ARES 4TB", cap: "3.73 TiB", used: true },
    { name: "WDC WD5000LUCT", cap: "465.76 GiB", used: true },
    { name: "HGST HTS545050A7E680", cap: "465.76 GiB", used: true },
    { name: "SaiChi K300 SSD", cap: "223.57 GiB", used: false },
  ];
  return (
    <div className="p-4 space-y-3 h-full">
      <div className="flex gap-2">
        {["本地存储", "网络存储", "可移动存储"].map((t, i) => (
          <div
            key={t}
            className={`text-[12px] px-3 py-1.5 rounded-md border ${
              i === 0 ? "bg-accent border-border" : "border-border/60 text-muted-foreground"
            }`}
          >
            {t}
          </div>
        ))}
        <div className="ml-auto text-[12px] px-3 py-1.5 rounded-md bg-foreground text-background">
          + 添加本地存储
        </div>
      </div>
      <div>
        <div className="text-xs font-medium mb-2">本地磁盘</div>
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
                  {d.used ? "已使用" : "可用"}
                </span>
              </div>
              <div className="mt-1.5 text-base font-semibold">{d.cap}</div>
            </motion.div>
          ))}
        </div>
      </div>
      <div>
        <div className="text-xs font-medium mb-2">本地存储池</div>
        <div className="space-y-2">
          {[
            {
              name: "这是什么东西",
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
              name: "3",
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
              key={p.name}
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
                  <div className="text-xs font-semibold text-foreground">{p.name}</div>
                  <div className="text-[12px] text-muted-foreground uppercase tracking-wider">
                    {p.type} · {p.disks} 盘
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-end mb-1">
                    <span className="text-[12px] text-muted-foreground uppercase tracking-wider">
                      容量使用
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
                    读取速度
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
                    写入速度
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
                    延迟
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
  const shares = [
    { name: "SMB", desc: "smb://yesnas:445", on: true },
    { name: "FTP", desc: "ftp://yesnas:21", on: true },
    { name: "WebDAV", desc: "http://yesnas:8088", on: true },
    { name: "NFS", desc: "yesnas:/", on: true },
  ];
  const sharedFolders = [
    {
      name: "工作文档",
      path: "/mnt/pool1/work",
      protocols: ["SMB"],
      users: 12,
      size: "1.2 TB",
      status: "在线",
      readonly: false,
    },
    {
      name: "家庭影音",
      path: "/mnt/pool1/media",
      protocols: ["SMB", "WebDAV"],
      users: 3,
      size: "4.5 TB",
      status: "在线",
      readonly: false,
    },
    {
      name: "备份数据",
      path: "/mnt/pool2/backup",
      protocols: ["NFS"],
      users: 2,
      size: "8.7 TB",
      status: "在线",
      readonly: true,
    },
    {
      name: "开发仓库",
      path: "/mnt/pool1/dev",
      protocols: ["FTP", "WebDAV"],
      users: 5,
      size: "256 GB",
      status: "在线",
      readonly: false,
    },
    {
      name: "公共素材",
      path: "/mnt/pool1/public",
      protocols: ["SMB", "NFS"],
      users: 8,
      size: "620 GB",
      status: "在线",
      readonly: false,
    },
  ];
  return (
    <div className="p-4 space-y-3 h-full">
      <div className="flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold">文件共享</div>
          <div className="text-[12px] text-muted-foreground">
            统一管理共享协议，当前已启用 4/4 个协议。
          </div>
        </div>
        <div className="text-[12px] px-3 py-1.5 rounded-md bg-foreground text-background">
          + 新建共享
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
              {s.name === "SMB"
                ? "局域网文件访问"
                : s.name === "FTP"
                  ? "兼容旧客户端"
                  : s.name === "WebDAV"
                    ? "HTTP 远程挂载"
                    : "Linux / 服务器挂载"}
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
          <span className="text-xs font-medium">共享目录</span>
          <span className="ml-auto text-[12px] text-muted-foreground">
            共 {sharedFolders.length} 个目录
          </span>
        </div>
        <div className="divide-y divide-border">
          {sharedFolders.map((folder, i) => (
            <motion.div
              key={folder.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="px-3 py-2.5 flex items-center gap-3 hover:bg-muted/30 transition-colors"
            >
              <div className="size-8 rounded-md bg-brand/10 text-brand grid place-items-center shrink-0">
                <HardDrive className="size-4" />
              </div>
              <div className="w-36 shrink-0">
                <div className="text-xs font-medium">{folder.name}</div>
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
              <div className="w-20 text-[12px] text-muted-foreground text-right">
                {folder.size}
              </div>
              <div className="w-20 flex items-center justify-end gap-1 text-[12px] text-muted-foreground">
                <Users className="size-3" />
                {folder.users} 在线
              </div>
              <div className="w-16 text-right">
                <span className="text-[12px] px-1.5 py-0.5 rounded bg-success/15 text-success">
                  {folder.status}
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
                  {folder.readonly ? "只读" : "读写"}
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
  const containers = [
    { name: "jellyfin", img: "jellyfin/jellyfin:latest", state: "running", cpu: 18, ram: 42, color: "brand" },
    { name: "code-server", img: "lscr.io/linuxserver/code…", state: "running", cpu: 9, ram: 28, color: "brand-2" },
    { name: "mariadb", img: "mariadb:11", state: "stopped", cpu: 0, ram: 0, color: "muted" },
    { name: "redis", img: "redis:7-alpine", state: "running", cpu: 3, ram: 12, color: "brand" },
    { name: "librespeed", img: "lscr.io/linuxserver/lib…", state: "paused", cpu: 0, ram: 18, color: "muted" },
    { name: "homepage", img: "ghcr.io/gethomepage…", state: "running", cpu: 6, ram: 22, color: "brand-2" },
  ];
  return (
    <div className="p-4 space-y-3 h-full">
      <div className="grid grid-cols-4 gap-2.5">
        {[
          { label: "CPU", value: "22%", icon: Cpu, prog: 22 },
          { label: "RAM", value: "58%", icon: MemoryStick, prog: 58 },
          { label: "Network", value: "59.5 MB/s", icon: Network, prog: 40 },
          { label: "Docker Disk", value: "39%", icon: Database, prog: 39 },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-border bg-card p-2.5"
          >
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
      <div className="grid grid-cols-3 gap-2.5">
        {containers.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-lg border border-border bg-card p-2.5"
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
                <StatePill state={c.state} />
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
                <div className="text-muted-foreground">PORTS</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function StatePill({ state }: { state: string }) {
  const map: Record<string, string> = {
    running: "bg-success/20 text-success",
    stopped: "bg-muted text-muted-foreground",
    paused: "bg-yellow-500/20 text-yellow-500",
  };
  return (
    <span className={`text-[11px] px-1.5 py-0.5 rounded ${map[state]}`}>{state}</span>
  );
}

function MiniSpark({ active }: { active: boolean }) {
  const path =
    "M0,20 L10,16 L20,18 L30,10 L40,14 L50,6 L60,12 L70,8 L80,14 L90,4 L100,10";
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
  const disks = [
    { name: "Lexar SSD ARES 4TB", path: "/dev/nvme0n1", cap: "4 TB", temp: "35 ℃", sn: "PCQ210R000002P2202", hours: "7635 h", pwr: 101, state: "使用中" },
    { name: "WDC WD5000LUCT", path: "/dev/sda", cap: "500 GB", temp: "41 ℃", sn: "WD-WXN2AA0HE582", hours: "7765 h", pwr: 1659, state: "未使用" },
    { name: "HGST HTS545050A7", path: "/dev/sdb", cap: "500 GB", temp: "39 ℃", sn: "RBF51A153LNBNP", hours: "9295 h", pwr: 48, state: "未使用" },
    { name: "SaiChi K300 SSD", path: "/dev/sdc", cap: "240 GB", temp: "30 ℃", sn: "AA00000000000731", hours: "5700 h", pwr: 1680, state: "未使用" },
  ];
  return (
    <div className="p-3 space-y-2 h-full overflow-hidden text-[12px]">
      <div className="flex items-center gap-2">
        <div className="text-sm font-semibold">硬件信息</div>
        <span className="text-[11px] px-1.5 py-0.5 rounded bg-success/20 text-success">实时</span>
        <div className="ml-auto text-[11px] text-muted-foreground">最后更新 2026/7/5 21:51:36</div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { l: "设备名称", v: "yesnas", i: Server },
          { l: "操作系统", v: "Debian GNU/Linux 13 (trixie)", i: Terminal },
          { l: "内核版本", v: "6.12.88+deb13-amd64", i: GitBranch },
          { l: "运行时间", v: "7 天 5 小时", i: Activity },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-border bg-card p-2">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <s.i className="size-3" />
              {s.l}
            </div>
            <div className="text-[11px] font-semibold mt-0.5 truncate">{s.v}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Database className="size-3 text-brand" /> 主板
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">制造商</div><div>AZW</div>
            <div className="text-muted-foreground">产品型号</div><div>EQ13</div>
            <div className="text-muted-foreground">版本</div><div>Default string</div>
            <div className="text-muted-foreground">序列号</div><div>—</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Sparkles className="size-3 text-brand-2" /> 图形处理器
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">厂商</div><div>Intel</div>
            <div className="text-muted-foreground">使用率</div><div>3%</div>
            <div className="text-muted-foreground">显存 / 温度</div><div>1.2 GB · 45 ℃</div>
            <div className="text-muted-foreground">功耗</div><div>4.8 W</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Cpu className="size-3 text-brand" /> 计算节点
            <span className="ml-auto text-[10.5px] text-muted-foreground">NAS 服务 · AI 任务 · 低功耗运行</span>
          </div>
          <div className="flex items-center gap-2">
            <RingStat value={2.7} label="CPU" />
            <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
              <div className="text-muted-foreground">温度</div><div>27.8 ℃</div>
              <div className="text-muted-foreground">功耗</div><div>6.2 W</div>
              <div className="text-muted-foreground">风扇</div><div>1720 RPM</div>
              <div className="text-muted-foreground">负载</div><div>0.18 · 0.22 · 0.19</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <MemoryStick className="size-3 text-brand-2" /> 内存
            <span className="ml-auto text-[10.5px] text-muted-foreground">Gloway · DDR5 · 4800 MHz</span>
          </div>
          <div className="flex items-center gap-2">
            <RingStat value={22} label="RAM" tone="brand-2" />
            <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
              <div className="text-muted-foreground">容量</div><div>15.4 GB</div>
              <div className="text-muted-foreground">已用</div><div>3.39 GB</div>
              <div className="text-muted-foreground">可用</div><div>12.0 GB</div>
              <div className="text-muted-foreground">Swap</div><div>0 / 4 GB</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Network className="size-3 text-brand" /> 网络
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">eth0</div><div>2.5 GbE · Up</div>
            <div className="text-muted-foreground">IPv4</div><div>192.168.1.12</div>
            <div className="text-muted-foreground">上/下行</div><div className="text-brand">42.1 / 128.6 MB/s</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Zap className="size-3 text-brand-2" /> 电源
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">整机功耗</div><div>14.6 W</div>
            <div className="text-muted-foreground">日均</div><div>0.34 kWh</div>
            <div className="text-muted-foreground">UPS</div><div>APC · 100%</div>
          </div>
        </div>
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1">
            <Activity className="size-3 text-success" /> 传感器
          </div>
          <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[11px]">
            <div className="text-muted-foreground">机箱温度</div><div>32 ℃</div>
            <div className="text-muted-foreground">NVMe 温度</div><div>35 ℃</div>
            <div className="text-muted-foreground">风扇 2</div><div>980 RPM</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-2">
        <div className="flex items-center gap-1.5 text-[12px] font-medium mb-1.5">
          <HardDrive className="size-3" /> 磁盘
          <span className="ml-auto text-[11px] text-muted-foreground">4/4 健康 · 5.24 TB 总容量 · 总 IO 128 MB/s</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {disks.map((d) => (
            <div key={d.name} className="rounded-md border border-border/60 bg-background/60 p-1.5">
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-medium truncate">{d.name}</div>
                <span className={`text-[12px] px-1 py-0.5 rounded ${d.state === "使用中" ? "bg-brand/20 text-brand" : "bg-muted text-muted-foreground"}`}>{d.state}</span>
              </div>
              <div className="mt-1 grid grid-cols-2 gap-x-1.5 gap-y-0.5 text-[10.5px] text-muted-foreground">
                <div>{d.path}</div><div className="text-right text-foreground">{d.cap}</div>
                <div>温度</div><div className="text-right text-foreground">{d.temp}</div>
                <div>健康</div><div className="text-right text-success">正常</div>
                <div>通电</div><div className="text-right text-foreground">{d.hours}</div>
                <div>启动</div><div className="text-right text-foreground">{d.pwr}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



function RingStat({ value, label, tone = "brand" }: { value: number; label: string; tone?: "brand" | "brand-2" }) {
  const c = 2 * Math.PI * 16;
  const stroke = tone === "brand" ? "oklch(0.68 0.18 275)" : "oklch(0.72 0.16 210)";
  return (
    <div className="relative size-11 shrink-0">
      <svg viewBox="0 0 40 40" className="size-11 -rotate-90">
        <circle cx="20" cy="20" r="16" fill="none" stroke="oklch(0.3 0.02 265)" strokeWidth="3" />
        <motion.circle
          cx="20" cy="20" r="16" fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round"
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
  const tabs = [
    { l: "全部", n: 24, a: true },
    { l: "运行中", n: 3 },
    { l: "已暂停", n: 2 },
    { l: "成功", n: 17 },
    { l: "已失败", n: 1 },
    { l: "已取消", n: 1 },
  ];
  const rows = [
    { t: "Automatic snapshot", s: "系统盘 · 快照完成", when: "12 分钟前", ok: true, p: 100 },
    { t: "Media metadata refresh", s: "影音库 · TMDB 海报同步", when: "25 分钟前", ok: true, p: 100 },
    { t: "Photo face clustering", s: "相册 · 新增 128 张照片", when: "43 分钟前", ok: true, p: 82 },
    { t: "Vector index rebuild", s: "AI 文件 · 12,480 个文档", when: "1 小时前", ok: true, p: 68 },
    { t: "Sync to Google Drive", s: "家庭相册 · 上传 4.2 GB", when: "2 小时前", ok: true, p: 100 },
    { t: "Storage health patrol", s: "阵列与磁盘 · 风险巡检", when: "今天 03:00", ok: true, p: 100 },
    { t: "Docker image prune", s: "清理未使用镜像 · 释放 8.4 GB", when: "昨天 23:10", ok: true, p: 100 },
    { t: "Security scan", s: "远程登录 · 异常 IP 检测", when: "昨天 21:45", ok: true, p: 100 },
    { t: "Backup to B2", s: "重要文件 · 增量备份", when: "昨天 02:30", ok: true, p: 100 },
    { t: "Subtitle generation", s: "影音 · 3 个视频排队中", when: "2026/7/6", ok: true, p: 38 },
    { t: "OCR receipts", s: "票据 · 96 张待归档", when: "2026/7/5", ok: true, p: 100 },
    { t: "Package update", s: "yesnas-core 2.4.1 · 已完成", when: "2026/7/4", ok: true, p: 100 },
  ];
  return (
    <div className="p-3.5 space-y-2.5 h-full overflow-hidden text-[12px]">
      <div className="text-sm font-semibold">待执行的任务</div>
      <div className="rounded-lg border border-border bg-card p-2.5 flex items-center gap-2">
        <div className="size-6 rounded-md bg-brand/20 text-brand grid place-items-center">
          <ImageIcon className="size-3.5" />
        </div>
        <div>
          <div className="text-[12px] font-medium">自动快照</div>
          <div className="text-[12px] text-muted-foreground">这是什么东西 · 2026/7/6 00:00:00</div>
        </div>
        <span className="ml-auto text-[12px] px-1.5 py-0.5 rounded bg-success/20 text-success">已启用</span>
      </div>
      <div className="flex items-center gap-1.5">
        {tabs.map((t) => (
          <div key={t.l} className={`text-[12px] px-2 py-0.5 rounded-full ${t.a ? "bg-accent text-foreground" : "text-muted-foreground"}`}>
            {t.l} <span className="text-[12px] opacity-70 ml-0.5">{t.n}</span>
          </div>
        ))}
        <div className="ml-auto flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[12px] text-muted-foreground">
          <Search className="size-2.5" /> 搜索任务
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { l: "今日执行", n: "38", sub: "成功 35 · 失败 1" },
          { l: "排队中", n: "7", sub: "影音转码 · AI 索引" },
          { l: "本周节省", n: "146 GB", sub: "快照压缩 + 清理" },
          { l: "下次计划", n: "03:00", sub: "健康巡检 + 增量备份" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-border bg-card p-2">
            <div className="text-[13px] font-semibold">{s.n}</div>
            <div className="mt-0.5 text-[12px] text-muted-foreground">{s.l}</div>
            <div className="mt-1 text-[12px] text-muted-foreground truncate">{s.sub}</div>
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
              <span className="text-[12px] px-1.5 py-0.5 rounded bg-success/20 text-success">成功</span>
            </div>
            <div className="col-span-2 text-right text-[12px] text-muted-foreground">{r.when}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ---- Screen: Users ---- */
function ScreenUsers() {
  const users = [
    { n: "飞毛腿9", h: "@www", role: "管理员", on: true, when: "2026/6/19 03:36", c: "brand", last: "2 分钟前 · 192.168.1.24" },
    { n: "ggg", h: "@gggw", role: "管理员", on: true, when: "2026/6/18 23:33", c: "brand-2", last: "17 分钟前 · 192.168.1.30" },
    { n: "asdfas", h: "@asdfads", role: "普通用户", on: true, when: "2026/6/18 01:14", c: "brand", last: "1 小时前 · WebDAV" },
    { n: "王东杰", h: "@wdj", role: "管理员", on: true, when: "2026/6/6 00:48", c: "brand-2", last: "刚刚 · macOS SMB" },
    { n: "廖韵乔", h: "@lyq", role: "普通用户", on: true, when: "2026/6/6 00:45", c: "brand", last: "昨天 · iOS App" },
    { n: "陈嘉豪", h: "@chenjh", role: "普通用户", on: true, when: "2026/6/5 22:11", c: "brand-2", last: "3 小时前 · Web" },
    { n: "Sophia Lee", h: "@sophia", role: "管理员", on: false, when: "2026/6/2 18:04", c: "brand", last: "已禁用" },
    { n: "服务账号-immich", h: "@svc-immich", role: "服务账号", on: true, when: "2026/5/28 09:22", c: "brand-2", last: "持续在线" },
    { n: "备份机器人", h: "@backup-bot", role: "服务账号", on: true, when: "2026/5/21 04:00", c: "brand", last: "运行中 · rsync" },
    { n: "财务只读", h: "@finance-ro", role: "只读", on: true, when: "2026/5/18 10:12", c: "brand-2", last: "今天 09:14 · Web" },
    { n: "客厅电视", h: "@living-tv", role: "媒体账号", on: true, when: "2026/5/16 20:31", c: "brand", last: "正在播放 · Jellyfin" },
    { n: "摄影工作室", h: "@studio", role: "普通用户", on: true, when: "2026/5/9 15:48", c: "brand-2", last: "昨天 · SMB" },
    { n: "guest", h: "@guest", role: "访客", on: false, when: "2026/5/12 12:00", c: "brand-2", last: "已禁用" },
    { n: "临时分享", h: "@share-temp", role: "访客", on: false, when: "2026/4/28 08:00", c: "brand", last: "已过期" },
  ];
  return (
    <div className="p-3 space-y-2 h-full overflow-hidden text-[12px]">
      <div className="flex items-center">
        <div>
          <div className="text-sm font-semibold">用户</div>
          <div className="text-[12px] text-muted-foreground">管理本机账号和 SMB 账号状态</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-[12px] text-muted-foreground">
            <Search className="size-2.5" /> 搜索用户
          </div>
          <button className="rounded-md bg-foreground text-background text-[12px] px-2 py-1 flex items-center gap-1">
            <Users className="size-3" /> 创建用户
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[
          { l: "全部用户", n: 42, i: Users, tone: "brand" },
          { l: "启用账号", n: 35, i: Check, tone: "success" },
          { l: "禁用账号", n: 7, i: Pause, tone: "muted" },
          { l: "管理员", n: 6, i: Shield, tone: "brand-2" },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-border bg-card p-2 flex items-center gap-2">
            <div className={`size-7 rounded-md grid place-items-center ${
              s.tone === "brand" ? "bg-brand/20 text-brand"
              : s.tone === "brand-2" ? "bg-brand-2/20 text-brand-2"
              : s.tone === "success" ? "bg-success/20 text-success"
              : "bg-muted text-muted-foreground"
            }`}>
              <s.i className="size-3.5" />
            </div>
            <div>
              <div className="text-[13px] font-semibold leading-none">{s.n}</div>
              <div className="text-[12px] text-muted-foreground mt-0.5">{s.l}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        {[
          { l: "全部", n: 42, a: true },
          { l: "已启用", n: 35 },
          { l: "已禁用", n: 7 },
          { l: "管理员", n: 6 },
          { l: "服务账号", n: 5 },
        ].map((t) => (
          <span key={t.l} className={`text-[12px] px-2 py-0.5 rounded-full ${t.a ? "bg-accent text-foreground" : "text-muted-foreground"}`}>
            {t.l} <span className="text-[12px] opacity-70 ml-0.5">{t.n}</span>
          </span>
        ))}
      </div>
      <div className="rounded-lg border border-border bg-card">
        <div className="grid grid-cols-12 gap-2 px-2.5 py-1 text-[12px] text-muted-foreground border-b border-border/60">
          <div className="col-span-4">用户</div>
          <div className="col-span-2">状态</div>
          <div className="col-span-2">角色</div>
          <div className="col-span-2">最近活动</div>
          <div className="col-span-2 text-right">更新时间</div>
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
                <div className={`size-6 rounded-full grid place-items-center text-[12px] font-semibold ${u.c === "brand" ? "bg-brand/25 text-brand" : "bg-brand-2/25 text-brand-2"}`}>
                  {u.n.slice(0, 1)}
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-medium truncate">{u.n}</div>
                  <div className="text-[12px] text-muted-foreground truncate">{u.h}</div>
                </div>
              </div>
              <div className="col-span-2">
                <span className={`text-[12px] px-1.5 py-0.5 rounded ${u.on ? "bg-success/20 text-success" : "bg-muted text-muted-foreground"}`}>
                  {u.on ? "启用" : "禁用"}
                </span>
              </div>
              <div className="col-span-2">
                <span className={`text-[12px] px-1.5 py-0.5 rounded ${
                  u.role === "管理员" ? "bg-brand-2/20 text-brand-2"
                  : u.role === "服务账号" ? "bg-brand/20 text-brand"
                  : "bg-muted text-muted-foreground"
                }`}>
                  {u.role}
                </span>
              </div>
              <div className="col-span-2 text-[12px] text-muted-foreground truncate">{u.last}</div>
              <div className="col-span-2 text-right text-[12px] text-muted-foreground">{u.when}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1.5 border-t border-border/60 text-[12px] text-muted-foreground">
          <span>第 1 页 / 共 5 页</span>
          <span>每页 14 条</span>
          <span>共 42 个用户</span>
          <div className="ml-auto flex items-center gap-1">
            {['上一页', '1', '2', '3', '下一页'].map((p, i) => (
              <span key={p} className={`px-1.5 py-0.5 rounded border border-border/60 ${i === 1 ? 'bg-accent text-foreground' : ''}`}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Screen: Logs ---- */
function ScreenLogs() {
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
    { src: "局域网", user: "王东杰", msg: "Storage pool deleted", tag: "主存储池 · 二次确认", when: "10 分钟前", level: "warn" },
    { src: "局域网", user: "系统", msg: "Storage pool formatted", tag: "pool-media", when: "1 小时前", level: "info" },
    { src: "远程", user: "飞毛腿9", msg: "SSH login from 118.24.x.x", tag: "首次异地登录", when: "3 小时前", level: "warn" },
    { src: "远程", user: "unknown", msg: "SSH login failed × 12", tag: "root · 45.155.x.x", when: "4 小时前", level: "err" },
    { src: "系统", user: "系统", msg: "Automatic snapshot completed", tag: "system-daily", when: "12 小时前", level: "ok" },
    { src: "系统", user: "系统", msg: "Automatic snapshot job scheduled", tag: "下次 03:00", when: "12 小时前", level: "info" },
    { src: "局域网", user: "ggg", msg: "Storage pool created", tag: "media-pool", when: "1 天前", level: "ok" },
    { src: "局域网", user: "ggg", msg: "File share updated", tag: "family-media", when: "1 天前", level: "info" },
    { src: "局域网", user: "廖韵乔", msg: "File share created", tag: "family", when: "1 天前", level: "ok" },
    { src: "系统", user: "系统", msg: "Docker container restarted", tag: "jellyfin · exit 137", when: "2 天前", level: "warn" },
    { src: "系统", user: "系统", msg: "Storage health patrol passed", tag: "media-pool · 4/4 healthy", when: "2 天前", level: "ok" },
    { src: "远程", user: "服务账号-immich", msg: "Backup uploaded 4.2 GB", tag: "→ B2 · immich", when: "2 天前", level: "ok" },
    { src: "系统", user: "系统", msg: "CPU 温度告警 76 ℃", tag: "持续 3 分钟", when: "3 天前", level: "warn" },
    { src: "系统", user: "系统", msg: "AI 模型加载", tag: "Qwen2.5-14B · GGUF", when: "3 天前", level: "info" },
    { src: "局域网", user: "王东杰", msg: "User permission changed", tag: "asdfas → 普通用户", when: "3 天前", level: "info" },
    { src: "远程", user: "unknown", msg: "WebDAV auth failure", tag: "user=admin", when: "4 天前", level: "err" },
    { src: "系统", user: "系统", msg: "Package upgrade applied", tag: "yesnas-core 2.4.1", when: "5 天前", level: "info" },
    { src: "局域网", user: "客厅电视", msg: "Media stream started", tag: "Interstellar · 4K HDR", when: "5 天前", level: "ok" },
    { src: "系统", user: "系统", msg: "Vector index compacted", tag: "284,192 objects", when: "6 天前", level: "info" },
    { src: "远程", user: "财务只读", msg: "Shared link downloaded", tag: "invoice_2026.zip", when: "6 天前", level: "info" },
  ];
  const toneCls = (t: string) =>
    t === "err" ? "bg-destructive/70"
    : t === "warn" ? "bg-yellow-500/60"
    : t === "info" ? "bg-brand-2/70"
    : t === "med" ? "bg-border"
    : "bg-muted";
  const dotCls = (l: string) =>
    l === "err" ? "bg-destructive"
    : l === "warn" ? "bg-yellow-500"
    : l === "info" ? "bg-brand-2"
    : "bg-success";
  const badge = (l: string) =>
    l === "err" ? "bg-destructive/20 text-destructive"
    : l === "warn" ? "bg-yellow-500/20 text-yellow-500"
    : l === "info" ? "bg-brand-2/20 text-brand-2"
    : "bg-success/20 text-success";
  const label = (l: string) =>
    l === "err" ? "错误" : l === "warn" ? "警告" : l === "info" ? "信息" : "成功";
  return (
    <div className="p-3 space-y-2 h-full overflow-hidden text-[12px]">
      <div className="flex items-center">
        <div>
          <div className="text-sm font-semibold">日志</div>
          <div className="text-[12px] text-muted-foreground">查看用户操作、系统事件与安全活动</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          {["24 小时", "7 天", "30 天", "90 天", "1 年"].map((t, i) => (
            <span key={t} className={`text-[12px] px-1.5 py-0.5 rounded-full ${i === 3 ? "bg-accent text-foreground" : "text-muted-foreground"}`}>{t}</span>
          ))}
          <span className="text-[12px] text-muted-foreground ml-1">1,284 条日志</span>
        </div>
      </div>
      <div>
        <div className="grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
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
        <div className="mt-[2px] grid gap-[2px]" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}>
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
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-sm bg-brand-2/70" />信息</span>
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-sm bg-yellow-500/60" />警告</span>
            <span className="flex items-center gap-1"><span className="size-1.5 rounded-sm bg-destructive/70" />错误</span>
          </span>
          <span>2026/7/5</span>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        {[
          { l: "全部级别", n: 1284, a: true },
          { l: "信息", n: 892 },
          { l: "警告", n: 318 },
          { l: "错误", n: 74 },
        ].map((t) => (
          <span key={t.l} className={`text-[12px] px-2 py-0.5 rounded-full ${t.a ? "bg-accent text-foreground" : "text-muted-foreground"}`}>
            {t.l} <span className="text-[12px] opacity-70 ml-0.5">{t.n}</span>
          </span>
        ))}
        <div className="ml-auto flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[12px] text-muted-foreground">
          <Search className="size-2.5" /> 搜索日志、事件或消息
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
            <div className="col-span-1 text-[12px] text-muted-foreground">{r.src}</div>
            <div className="col-span-1">
              <span className={`text-[12px] px-1.5 py-0.5 rounded ${badge(r.level)}`}>{label(r.level)}</span>
            </div>
            <div className="col-span-6 flex items-center gap-1.5 min-w-0">
              <span className={`size-1.5 rounded-full shrink-0 ${dotCls(r.level)}`} />
              <span className="text-[12px] truncate">{r.msg}</span>
              <span className="text-[12px] text-muted-foreground truncate">· {r.tag}</span>
            </div>
            <div className="col-span-2 text-[12px] text-muted-foreground truncate">{r.user}</div>
            <div className="col-span-2 text-right text-[12px] text-muted-foreground">{r.when}</div>
          </motion.div>
        ))}
        <div className="flex items-center gap-2 px-2.5 py-1.5 text-[12px] text-muted-foreground">
          <span>第 1 页 / 共 65 页</span>
          <span>每页 20 条</span>
          <span>共 1,284 条日志</span>
          <div className="ml-auto flex items-center gap-1">
            {['上一页', '1', '2', '3', '...', '65', '下一页'].map((p, i) => (
              <span key={`log-${p}-${i}`} className={`px-1.5 py-0.5 rounded border border-border/60 ${i === 1 ? 'bg-accent text-foreground' : ''}`}>{p}</span>
            ))}
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
        <div className="text-[12px] text-muted-foreground">
          Personal AI Data Hub · 全部本地推理
        </div>
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
        <StatBig label="AI 能力" value="16" sub="一级模块全部就绪" icon={Sparkles} accent="success" />
        <StatBig label="今日任务" value="1,284" sub="成功 1,271 · 失败 3" icon={Activity} progress={99} />
        <StatBig label="已索引" value="284,192" sub="文件 · 图像 · 视频 · 文档" icon={FileSearch} progress={86} />
        <StatBig label="向量库" value="12.4 GB" sub="Nomic-Embed · 完全本地" icon={Database} progress={41} />
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
  const results = [
    { icon: Film, kind: "视频", title: "东京_寿司店_2024-08-14.mp4", meta: "8月14日 · 银座 · 02:31", hue: 220 },
    { icon: ImageIcon, kind: "照片", title: "IMG_4021.HEIC · 寿司拼盘", meta: "3张相关 Live Photo", hue: 45 },
    { icon: MessageSquare, kind: "聊天", title: "微信 · 与老婆", meta: "这家很好吃，下次还来", hue: 195 },
    { icon: Receipt, kind: "发票", title: "すきやばし次郎_收据.pdf", meta: "¥ 42,800 · 已 OCR", hue: 100 },
    { icon: MapPin, kind: "地图", title: "银座 · 次郎寿司", meta: "IMG_4030 位置截图", hue: 275 },
    { icon: FileText, kind: "PDF", title: "东京行程_2024.pdf", meta: "机票 · 酒店 · 花费", hue: 340 },
    { icon: Calendar, kind: "日程", title: "Google Calendar · 东京旅行", meta: "8月12日-17日 · 5 个地点", hue: 25 },
    { icon: Upload, kind: "备份", title: "B2 · JapanTrip_Archive.zip", meta: "12.8 GB · 已归档", hue: 160 },
    { icon: Music, kind: "音频", title: "银座街头录音.m4a", meta: "环境声 · 00:48", hue: 300 },
  ];
  return (
    <div className="p-3.5 h-full space-y-2.5 text-[12px] overflow-hidden">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4 text-brand" />
        <div className="text-sm font-semibold">AI 助手</div>
        <div className="text-[12px] text-muted-foreground">我不需要知道文件在哪，我只知道我要什么。</div>
        <div className="ml-auto text-[12px] text-success inline-flex items-center gap-1">
          <span className="size-1 rounded-full bg-success animate-pulse" /> Qwen2.5-14B + RAG
        </div>
      </div>

      <div className="rounded-lg border border-brand/40 bg-card p-2.5">
        <div className="flex items-center gap-2">
          <Search className="size-3.5 text-brand" />
          <div className="flex-1 text-[12px] text-foreground">
            去年去东京吃寿司的视频
            <motion.span
              className="inline-block w-[1px] h-3 bg-brand ml-0.5 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </div>
          <span className="text-[12px] text-muted-foreground">Enter 提问 · ⌘K</span>
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1 text-[12px]">
          {["视频", "照片", "Live Photo", "聊天", "PDF", "地图", "发票"].map((t, i) => (
            <span
              key={t}
              className={`px-1.5 py-0.5 rounded-full ${
                i < 6 ? "bg-brand/15 text-brand" : "border border-border text-muted-foreground"
              }`}
            >
              #{t}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 flex-1">
        <div className="rounded-lg border border-border bg-card p-2 space-y-1.5 overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-medium">跨类型搜索结果</span>
            <span className="text-[12px] text-muted-foreground">共 42 条 · 语义相关度排序</span>
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
                  <div className="text-[12px] text-muted-foreground truncate">{r.meta}</div>
                </div>
                <span className="text-[12px] px-1 py-0.5 rounded bg-muted text-muted-foreground shrink-0">
                  {r.kind}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="rounded-lg border border-border bg-card p-2 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <Bot className="size-3 text-brand" />
            <span className="text-[12px] font-medium">AI 归纳</span>
            <span className="ml-auto text-[12px] text-muted-foreground">生成中 · 42 tok/s</span>
          </div>
          <div className="text-[12px] leading-relaxed text-foreground/90 space-y-1">
            <p>你在 <b>2024 年 8 月 12–17 日</b> 前往东京，共产生 <b>42 条</b> 相关记忆：</p>
            <ul className="pl-3 space-y-0.5 text-muted-foreground">
              <li>· 8/14 银座 · 次郎寿司 · 视频 1 段 · 照片 3 张 · 花费 ¥42,800</li>
              <li>· 8/15 筑地市场 · 视频 2 段 · 照片 12 张</li>
              <li>· 与老婆的微信对话 6 条 · 提及"下次还来"</li>
              <li>· 机票 / 酒店发票已归档到 财务 › 2024 › 出行</li>
            </ul>
          </div>
          <div className="grid grid-cols-3 gap-1 pt-1 border-t border-border/60 text-[12px]">
            {[
              { l: "引用来源", v: "9 类 / 42 条" },
              { l: "可信度", v: "96%" },
              { l: "可执行动作", v: "6 个" },
            ].map((m) => (
              <div key={m.l} className="rounded border border-border/60 bg-background/40 p-1.5">
                <div className="font-semibold text-foreground">{m.v}</div>
                <div className="text-muted-foreground">{m.l}</div>
              </div>
            ))}
          </div>
          <div className="pt-1 border-t border-border/60 flex flex-wrap gap-1 text-[12px]">
            {["把这些照片打包给老婆", "生成东京 Timeline", "写一篇游记"].map((s) => (
              <span key={s} className="px-1.5 py-0.5 rounded border border-border text-muted-foreground">
                <Lightbulb className="size-2.5 inline mr-0.5 text-brand" />
                {s}
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
        <div className="text-[12px] text-muted-foreground">给你的 NAS 一个记忆——所有文件、时间、人事物自动关联。</div>
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
            2024-10-08，淘宝下单 MacBook Pro 14，共 ¥15,999，AppleCare+ 保修至 2027-10。已打包相关文件到
            <span className="ml-0.5 px-1 rounded bg-muted">/mac-purchase-2024/</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="rounded-lg border border-border bg-card p-2.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Calendar className="size-3 text-brand" />
          <span className="text-[12px] font-medium">人生时间轴</span>
          <span className="text-[12px] text-muted-foreground">自动聚合照片 · 视频 · 文档 · 花费</span>
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
  const carThumbs = [
    { img: car1, score: 0.94, kind: "photo", title: "蓝色跑车 · 城市街道", meta: "照片 · 2026/05/18 · 相册/跑车", why: "视觉模型识别：蓝色车身、超跑外形、街道背景" },
    { img: car2, score: 0.91, kind: "photo", title: "海边蓝色跑车", meta: "照片 · 2026/05/20 · 旅行", why: "颜色与车辆类别高度匹配" },
    { img: car3, score: 0.87, kind: "photo", title: "地下车库跑车", meta: "照片 · 2026/04/09 · 车库", why: "车灯、车头、蓝色漆面命中" },
    { img: car4, score: 0.82, kind: "video", title: "山路敞篷车片段", meta: "视频 · 00:18 · 已抽帧", why: "视频关键帧包含蓝色跑车" },
  ];
  const autoFolders = [
    { name: "Projects › YesNAS", count: "1,204 项", hue: 275 },
    { name: "Life › Japan Trip 2026", count: "348 项", hue: 195 },
    { name: "Finance › Tax 2025", count: "62 项", hue: 100 },
    { name: "Family › 宝宝成长", count: "4,120 项", hue: 340 },
    { name: "Docs › 合同", count: "38 项", hue: 45 },
    { name: "Docs › 身份证件", count: "12 项", hue: 25 },
    { name: "Work › 会议录音", count: "86 项", hue: 220 },
    { name: "Media › 待刮削", count: "19 项", hue: 15 },
    { name: "Inbox › 待确认", count: "241 项", hue: 300 },
    { name: "Archive › 2024", count: "9,830 项", hue: 145 },
  ];
  return (
    <div className="p-3.5 h-full space-y-2.5 text-[12px] overflow-hidden">
      <div className="flex items-center gap-2">
        <FileSearch className="size-4 text-brand" />
        <div className="text-sm font-semibold">AI 文件</div>
        <div className="text-[12px] text-muted-foreground">
          语义搜索 · 不是 OCR，是真正理解内容
        </div>
        <div className="ml-auto text-[12px] text-muted-foreground">已索引 284,192 项</div>
      </div>

      <div className="rounded-lg border border-border bg-card p-2 flex items-center gap-2">
        <Search className="size-3.5 text-brand" />
        <span className="text-[12px] font-medium">找那个蓝色跑车的照片</span>
        <span className="ml-auto text-[12px] text-muted-foreground">语义 · 视觉 · OCR 全通道</span>
      </div>

      <div className="grid grid-cols-[1.25fr_0.85fr] gap-2 flex-1 min-h-0">
        <div className="rounded-lg border border-border bg-card p-2.5 space-y-2">
          <div className="flex items-center gap-2">
            <Search className="size-3 text-brand" />
            <span className="text-[13px] font-semibold">查询结果</span>
            <span className="ml-auto text-[12px] text-muted-foreground">42 项 · Top 4 · 另有 38 项相似</span>
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
                  alt={r.title}
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
                  <div className="text-[12px] font-semibold text-white truncate">{r.title}</div>
                  <div className="text-[11px] text-white/75 truncate">{r.meta}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
            {[
              "视觉匹配 4 项",
              "搜索耗时 0.42 秒",
              "可继续查看 38 项相似结果",
            ].map((item) => (
              <span key={item} className="rounded-full bg-muted px-1.5 py-0.5">{item}</span>
            ))}
          </div>
        </div>

        <div className="space-y-2 min-h-0">
        <div className="rounded-lg border border-border bg-card p-2 space-y-1.5">
          <div className="flex items-center gap-1.5 border-b border-border/60 pb-1.5">
            <Layers className="size-3 text-brand" />
            <span className="text-[12px] font-medium">系统功能</span>
            <span className="ml-auto text-[12px] text-muted-foreground">独立功能区</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { icon: Search, label: "语义搜索", desc: "文件/图片/视频" },
              { icon: FolderTree, label: "自动整理", desc: "归类与命名" },
              { icon: Shield, label: "权限复核", desc: "敏感文件" },
              { icon: Copy, label: "重复清理", desc: "相似文件" },
              { icon: Download, label: "批量导出", desc: "打包下载" },
              { icon: Share2, label: "智能分享", desc: "临时链接" },
            ].map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.label} className="rounded-md border border-border/60 bg-background/40 p-1.5">
                  <div className="flex items-center gap-1 text-[12px] font-medium">
                    <Icon className="size-3 text-brand" />
                    <span className="truncate">{f.label}</span>
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground truncate">{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-2 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <FolderTree className="size-3 text-brand" />
            <span className="text-[12px] font-medium">自动整理</span>
            <span className="ml-auto text-[12px] text-success inline-flex items-center gap-1">
              <span className="size-1 rounded-full bg-success animate-pulse" /> 后台运行中
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {autoFolders.slice(0, 6).map((f, i) => (
              <motion.div
                key={f.name}
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
                  <span className="text-[12px] font-medium truncate">{f.name}</span>
                </div>
                <div className="text-[12px] text-muted-foreground mt-0.5">{f.count}</div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-border/60 text-[12px]">
            {[
              { l: "正在索引", v: "1,842", sub: "新增文件" },
              { l: "待确认", v: "241", sub: "归类建议" },
              { l: "可合并", v: "63", sub: "重复照片" },
              { l: "敏感文件", v: "18", sub: "需权限复核" },
            ].map((m) => (
              <div key={m.l} className="rounded border border-border/60 bg-background/40 p-1.5">
                <div className="font-semibold text-foreground">{m.v}</div>
                <div className="text-muted-foreground">{m.l} · {m.sub}</div>
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
        <div className="text-[12px] text-muted-foreground">一句话生成工作流 · 类似 Apple Shortcuts</div>
        <div className="ml-auto text-[12px] text-muted-foreground">12 个 Workflow · 今日执行 1,284 次</div>
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
                <div className="text-[12px] text-muted-foreground truncate">{w.when} · 已执行 {w.runs.toLocaleString()} 次</div>
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
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  hue: number;
}[] = [
  { key: "宝宝", label: "宝宝成长", icon: Users, hue: 25 },
  { key: "风景", label: "风景", icon: MapPin, hue: 195 },
  { key: "票据", label: "票据", icon: Receipt, hue: 45 },
  { key: "美食", label: "美食", icon: Sparkles, hue: 15 },
  { key: "宠物", label: "宠物", icon: Star, hue: 340 },
  { key: "截图", label: "截图 · 二维码", icon: FileText, hue: 275 },
];

function ScreenPhotos() {
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
    { img: pBaby1, title: "宝宝成长", sub: "52 张 · 3 段视频" },
    { img: pLand2, title: "秋日森林", sub: "18 张 · 风景" },
    { img: pFood1, title: "周末餐桌", sub: "24 张 · 美食" },
    { img: pBaby2, title: "宝宝日常", sub: "128 张 · 家庭" },
    { img: pLand1, title: "东京樱花", sub: "64 张 · 旅行" },
    { img: pPet1, title: "宠物瞬间", sub: "31 张 · 可爱" },
    { img: pRec1, title: "生活票据", sub: "96 张 · 已 OCR" },
    { img: pScr1, title: "截图线索", sub: "178 张 · 二维码" },
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
        <div className="text-sm font-semibold">AI 相册</div>
        <div className="text-[12px] text-muted-foreground">
          人物 · 地点 · 场景 · 事件 自动串联
        </div>
        <div className="ml-auto text-[12px] text-muted-foreground">
          今日新增 128 张 · 正在分类
        </div>
      </div>

      {/* Faces row */}
      <div className="rounded-lg border border-border bg-card p-2">
        <div className="flex items-center gap-2 mb-1.5">
          <ScanFace className="size-3 text-brand" />
          <span className="text-[12px] font-medium">人脸聚类</span>
          <span className="text-[12px] text-muted-foreground">24 位</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
          {["小雅", "爸爸", "妈妈", "David", "Emma", "宝宝", "外婆", "同事", "朋友"].map((f, i) => (
            <div key={f} className="text-center">
              <div
                className="size-7 rounded-full ring-1 ring-border"
                style={{
                  background: `conic-gradient(from ${i * 60}deg, oklch(0.68 0.18 ${(i * 45) % 360}), oklch(0.78 0.14 ${(i * 45 + 180) % 360}))`,
                }}
              />
              <div className="mt-0.5 text-[12px] text-muted-foreground">{f}</div>
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
              { label: "待确认人物", value: "36", note: "7 组相似脸" },
              { label: "共享相册", value: "12", note: "家庭 · 工作" },
              { label: "最近出现", value: "宝宝", note: "今日 42 张" },
              { label: "跨设备同步", value: "4 台", note: "iPhone · 相机" },
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-border/60 bg-background/40 px-2 py-1.5">
                <div className="text-[12px] font-semibold text-foreground">{item.value}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground truncate">{item.label}</div>
                <div className="mt-0.5 text-[11px] text-muted-foreground/70 truncate">{item.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-classify animation */}
      <div className="rounded-lg border border-border bg-card p-2.5">
        <div className="flex items-center gap-2 mb-2">
          <Wand2 className="size-3 text-brand" />
          <span className="text-[12px] font-medium">AI 自动分类</span>
          <span className="text-[12px] text-muted-foreground">
            拖进来的照片，自己找到该去的相册
          </span>
          <span className="ml-auto text-[12px] text-success inline-flex items-center gap-1">
            <span className="size-1 rounded-full bg-success animate-pulse" /> 实时
          </span>
        </div>

        <ClassifyStage
          queue={queue}
          currentTarget={currentTarget}
          counts={counts}
          tick={tick}
        />
      </div>


      {/* Event timeline */}
      <div className="rounded-lg border border-border bg-card p-2">
        <div className="flex items-center gap-2 mb-1.5">
          <Calendar className="size-3 text-brand" />
          <span className="text-[12px] font-medium">事件时间线</span>
          <span className="text-[12px] text-muted-foreground">AI 自动串联</span>
        </div>
        <div className="flex gap-1.5 overflow-hidden">
          {[
            { d: "03·15", e: "东京樱花", hue: 340 },
            { d: "05·02", e: "宝宝百天", hue: 25 },
            { d: "07·20", e: "巴厘岛", hue: 195 },
            { d: "09·11", e: "露营", hue: 145 },
            { d: "12·31", e: "跨年", hue: 275 },
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
                <span className="text-[12px] truncate">{ev.e}</span>
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
            <span className="text-[12px] font-medium">精选回忆</span>
            <span className="ml-auto text-[11px] text-muted-foreground">
              自动生成 8 组 · {memoryPage + 1}/{memoryPageCount}
            </span>
            <button
              type="button"
              onClick={() => setMemoryPage((p) => (p - 1 + memoryPageCount) % memoryPageCount)}
              className="size-5 rounded border border-border bg-background/50 grid place-items-center text-muted-foreground hover:text-foreground"
              aria-label="上一组回忆"
            >
              <ChevronLeft className="size-3" />
            </button>
            <button
              type="button"
              onClick={() => setMemoryPage((p) => (p + 1) % memoryPageCount)}
              className="size-5 rounded border border-border bg-background/50 grid place-items-center text-muted-foreground hover:text-foreground"
              aria-label="下一组回忆"
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
                <div key={m.title} className="relative min-h-[120px] overflow-hidden rounded-md border border-border/60 bg-background/40">
                  <img src={m.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute top-1 left-1 rounded bg-black/45 px-1 text-[10px] text-white/75">
                    回忆
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-1.5">
                    <div className="truncate text-[12px] font-medium text-white">{m.title}</div>
                    <div className="truncate text-[12px] text-white/70">{m.sub}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="rounded-lg border border-border bg-card p-2.5">
          <div className="flex items-center gap-2 mb-2">
            <FileSearch className="size-3 text-brand" />
            <span className="text-[12px] font-medium">整理建议</span>
            <span className="ml-auto text-[11px] text-success inline-flex items-center gap-1">
              <span className="size-1 rounded-full bg-success" /> 可执行
            </span>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { label: "重复照片", value: "63", note: "可释放 1.8 GB" },
              { label: "模糊照片", value: "128", note: "建议复核" },
              { label: "票据归档", value: "96", note: "按月份整理" },
              { label: "未命名相册", value: "12", note: "可自动命名" },
            ].map((item) => (
              <div key={item.label} className="rounded-md border border-border/60 bg-background/40 p-2">
                <div className="text-[11px] text-muted-foreground">{item.label}</div>
                <div className="mt-0.5 text-[14px] font-semibold text-foreground">{item.value}</div>
                <div className="mt-0.5 truncate text-[12px] text-muted-foreground">{item.note}</div>
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
            <span className="text-[12px] font-medium">更多相册</span>
            <span className="ml-auto text-[11px] text-muted-foreground">32 个智能相册 · 6 个共享相册</span>
          </div>
          <div className="grid grid-cols-6 gap-1.5">
            {[
              { img: pBaby2, title: "宝宝日常", count: "1,284", hue: 25 },
              { img: pLand1, title: "旅行风景", count: "842", hue: 195 },
              { img: pRec2, title: "票据归档", count: "316", hue: 45 },
              { img: pPet1, title: "宠物", count: "214", hue: 340 },
              { img: pScr1, title: "截图", count: "529", hue: 275 },
              { img: pFood1, title: "美食", count: "331", hue: 15 },
            ].map((album) => (
              <div key={album.title} className="relative h-24 overflow-hidden rounded-md border border-border/60 bg-background/40">
                <img src={album.img} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                <div className="absolute top-1 left-1 rounded bg-black/45 px-1 text-[10px] text-white/80">
                  {album.count} 张
                </div>
                <div className="absolute inset-x-0 bottom-0 p-1.5">
                  <div className="truncate text-[12px] font-medium text-white">{album.title}</div>
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
            <span className="text-[12px] font-medium">近期整理动态</span>
            <span className="ml-auto text-[11px] text-success">实时</span>
          </div>
          <div className="space-y-1.5">
            {[
              { time: "刚刚", text: "识别 18 张宝宝照片，合并到宝宝日常" },
              { time: "2 分钟前", text: "从截图中提取 6 个二维码和 3 张票据" },
              { time: "8 分钟前", text: "检测到 12 张重复照片，可释放 420 MB" },
              { time: "今天", text: "自动生成东京樱花、露营、跨年 3 组回忆" },
            ].map((item) => (
              <div key={item.text} className="flex items-start gap-2 rounded-md border border-border/60 bg-background/40 px-2 py-1.5">
                <span className="mt-1 size-1.5 rounded-full bg-brand shrink-0" />
                <div className="min-w-0">
                  <div className="text-[12px] truncate">{item.text}</div>
                  <div className="text-[11px] text-muted-foreground">{item.time}</div>
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
}: {
  queue: PhotoItem[];
  currentTarget: PhotoItem["cat"];
  counts: Record<PhotoItem["cat"], number>;
  tick: number;
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
    <div
      ref={stageRef}
      className="relative grid grid-cols-[110px_1fr] gap-3 items-start"
    >
      {/* Unsorted pile */}
      <div
        ref={pileRef}
        className="relative h-[110px] rounded-md border border-dashed border-border/70 bg-background/40 overflow-hidden"
      >
        <div className="absolute top-1 left-1.5 text-[10.5px] text-muted-foreground z-10">
          未整理 · {(PHOTO_POOL.length * 137).toLocaleString()}
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
                borderColor: active
                  ? "oklch(0.7 0.18 260)"
                  : "hsl(var(--border))",
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
                <span className="text-[11px] font-medium truncate">{b.label}</span>
              </div>
              <div className="relative mt-0.5 flex items-baseline justify-between">
                <motion.span
                  key={counts[b.key]}
                  initial={{ scale: active ? 1.4 : 1, color: active ? "oklch(0.75 0.19 260)" : undefined }}
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
          alt=""
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
    meta: "Original · 5.1",
    ai: false,
    hue: 210,
    subtitle: "We used to look up at the sky and wonder at our place in the stars.",
  },
  {
    flag: "🇨🇳",
    lang: "中文",
    name: "中文 · McConaughey 音色",
    meta: "AI Voice Clone",
    ai: true,
    hue: 340,
    subtitle: "我们曾仰望星空，思索着自己在群星中的位置。",
  },
  {
    flag: "🇯🇵",
    lang: "日本語",
    name: "日本語 吹替",
    meta: "AI Voice Clone",
    ai: true,
    hue: 15,
    subtitle: "かつて僕らは空を見上げ、星々の中の居場所を思った。",
  },
  {
    flag: "🇪🇸",
    lang: "Español",
    name: "Español Latino",
    meta: "AI Dub",
    ai: true,
    hue: 45,
    subtitle: "Solíamos mirar al cielo y preguntarnos nuestro lugar entre las estrellas.",
  },
  {
    flag: "🇰🇷",
    lang: "한국어",
    name: "한국어 더빙",
    meta: "AI Voice Clone",
    ai: true,
    hue: 275,
    subtitle: "우리는 하늘을 올려다보며 별들 사이의 우리 자리를 생각하곤 했다.",
  },
];

function MoviePlayer() {
  const [active, setActive] = useState(0);
  const [t, setT] = useState(0);
  const [progress, setProgress] = useState(38);

  useEffect(() => {
    const swap = setInterval(
      () => setActive((a) => (a + 1) % AUDIO_TRACKS.length),
      2600,
    );
    return () => clearInterval(swap);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setT((v) => v + 1), 90);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(
      () => setProgress((p) => (p >= 72 ? 38 : p + 0.4)),
      600,
    );
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
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          }}
        />

        {/* Top bar */}
        <div className="absolute top-0 inset-x-0 flex items-center gap-2 p-2 text-white bg-gradient-to-b from-black/70 to-transparent">
          <Film className="size-3 text-brand-2" />
          <div className="text-[12px] font-semibold tracking-wide">
            Interstellar
          </div>
          <div className="text-[10.5px] text-white/60">
            2014 · 4K HDR · Dolby Atmos
          </div>
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
            <span>AI 切换 · {track.flag} {track.name}</span>
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
                <span>字幕 · {track.lang}</span>
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
                const wobble =
                  Math.abs(Math.sin(t * 0.6 + b * 0.55)) * 70 + 15;
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
            声轨
          </span>
          <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[11px] font-medium text-brand">
            AI
          </span>
          <span className="text-[10.5px] text-muted-foreground">
            一部电影 N 种语言
          </span>
          <span className="ml-auto text-[11px] text-muted-foreground inline-flex items-center gap-1">
            <Wand2 className="size-2.5 text-brand" /> 本地生成 · 离线
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
                  borderColor: isActive
                    ? "oklch(0.7 0.18 260)"
                    : "hsl(var(--border) / 0.6)",
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
                        const height =
                          Math.abs(Math.sin(t * 0.55 + b * 0.72 + i)) * 72 + 18;
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
  const movies = [
    { title: "沙丘 · 第二部", year: 2024, hue: 45, score: 8.6, badge: "4K HDR", poster: posterDunePartTwo },
    { title: "奥本海默", year: 2023, hue: 25, score: 8.9, badge: "IMAX", poster: posterOppenheimer },
    { title: "银翼杀手 2049", year: 2017, hue: 275, score: 8.9, badge: "4K", poster: posterBladeRunner2049 },
    { title: "星际穿越", year: 2014, hue: 220, score: 9.1, badge: "4K HDR", poster: posterInterstellar },
    { title: "疾速追杀 4", year: 2023, hue: 340, score: 7.8, badge: "杜比", poster: posterJohnWick4 },
    { title: "蜘蛛侠 · 纵横宇宙", year: 2023, hue: 300, score: 8.7, badge: "4K", poster: posterSpiderVerse },
    { title: "花月杀手", year: 2023, hue: 15, score: 7.6, badge: "1080p", poster: posterKillersFlowerMoon },
    { title: "瞬息全宇宙", year: 2022, hue: 190, score: 8.1, badge: "4K", poster: posterEverythingEverywhere },
    { title: "阿凡达 · 水之道", year: 2022, hue: 200, score: 7.9, badge: "3D 4K", poster: posterAvatarWayOfWater },
    { title: "利刃出鞘 2", year: 2022, hue: 100, score: 7.3, badge: "4K", poster: posterGlassOnion },
    { title: "壮志凌云 2", year: 2022, hue: 210, score: 8.4, badge: "IMAX", poster: posterTopGunMaverick },
    { title: "蝙蝠侠", year: 2022, hue: 260, score: 8.0, badge: "4K HDR", poster: posterTheBatman },
  ];
  const scraping = [
    { name: "The.Wild.Robot.2024.2160p.mkv", pct: 92, status: "匹配 TMDB · 已下载海报" },
    { name: "怪奇物语.S05E01.4K.HEVC.mkv", pct: 64, status: "刮削剧集元数据" },
    { name: "Inception.2010.BluRay.1080p.mkv", pct: 100, status: "完成 · 剧情摘要" },
    { name: "长安的荔枝.2025.WEB-DL.mp4", pct: 38, status: "生成简中字幕中" },
  ];
  return (
    <div className="p-3 h-full space-y-2 text-[12px] overflow-hidden">
      <div className="flex items-center gap-3">
        <div className="text-sm font-semibold">影音</div>
        <div className="text-[12px] text-muted-foreground">
          电影 386 · 剧集 24 · 已刮削 402 · TMDB 已同步
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[12px]">
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
            <Wand2 className="size-3 text-brand" /> 海报
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
            <Subtitles className="size-3 text-brand-2" /> 字幕
          </span>
          <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
            <Music className="size-3 text-brand" /> 声轨
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
            <span className="text-[13px] font-medium">刮削队列</span>
            <span className="text-[11px] text-muted-foreground">
              自动匹配 TMDB / 豆瓣 / TVDB · 本地 AI 补全
            </span>
            <span className="ml-auto text-[11px] text-brand">4 个进行中</span>
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
                  <span className="truncate flex-1 font-mono text-foreground/80">
                    {s.name}
                  </span>
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
                    {s.status}
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
          <div className="text-[13px] font-medium">影片库 · 海报 + 元数据</div>
          <div className="flex gap-2 text-[11px] text-muted-foreground">
            <span className="text-brand">全部</span>
            <span>4K</span>
            <span>剧集</span>
            <span>动画</span>
            <span>纪录片</span>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {movies.map((m, i) => (
            <motion.div
              key={m.title}
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
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/25" />
              <div className="absolute top-1 right-1 text-[9.5px] px-1.5 rounded bg-black/60 text-white backdrop-blur flex items-center gap-0.5">
                <Star className="size-2 fill-yellow-400 text-yellow-400" /> {m.score}
              </div>
              <div className="absolute top-1 left-1 text-[9px] px-1.5 rounded bg-brand/80 text-white">
                {m.badge}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/85 to-transparent">
                <div className="text-[10.5px] font-medium text-white truncate leading-tight">
                  {m.title}
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
  const models = [
    { name: "Qwen2.5-14B-Instruct", size: "8.2 GB", quant: "Q4_K_M", status: "运行中", tps: 42, loaded: true },
    { name: "Llama-3.1-8B-Instruct", size: "4.7 GB", quant: "Q5_K_M", status: "已加载", tps: 68, loaded: true },
    { name: "DeepSeek-Coder-V2-16B", size: "9.1 GB", quant: "Q4_K_M", status: "就绪", tps: 0, loaded: false },
    { name: "Gemma-2-9B-it", size: "5.4 GB", quant: "Q5_K_M", status: "下载中 78%", tps: 0, loaded: false, dl: 78 },
    { name: "Nomic-Embed-Text", size: "137 MB", quant: "F16", status: "常驻", tps: 0, loaded: true, tag: "嵌入" },
    { name: "Whisper-large-v3", size: "1.5 GB", quant: "F16", status: "常驻", tps: 0, loaded: true, tag: "语音" },
    { name: "SDXL-Turbo", size: "6.9 GB", quant: "FP16", status: "空闲", tps: 0, loaded: false, tag: "图像" },
  ];
  const messages = [
    { role: "user", text: "帮我总结 /docs 里最近三份会议纪要的行动项。" },
    { role: "ai", text: "已在本地检索 3 份文档并提取 12 条行动项，按负责人分组如下：" },
    { role: "ai", text: "· 张伟 (4)：完成 NAS 容量扩容评估、准备月度存储报告…\n· 李娜 (5)：更新 Docker 镜像仓库、编写备份脚本…\n· 王芳 (3)：整理 AI 相册标签体系…" },
    { role: "user", text: "把张伟的行动项导出成 Markdown 到 /共享/todo/ 目录。" },
  ];
  return (
    <div className="p-3 h-full text-[12px] grid grid-cols-5 gap-2 overflow-hidden">
      {/* Left: models */}
      <div className="col-span-3 flex flex-col gap-2 min-h-0">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold">本地 AI</div>
          <div className="text-[12px] text-muted-foreground">
            llama.cpp · GGUF · 完全离线
          </div>
          <div className="ml-auto flex gap-1 text-[12px]">
            <span className="inline-flex items-center gap-1 rounded border border-border px-1.5 py-0.5 text-muted-foreground">
              <Cpu className="size-3" /> 本地推理 · 8T
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
          <StatBig label="常驻模型" value="4" sub="嵌入 · 语音 · 2 对话" icon={BrainCircuit} accent="success" />
          <StatBig label="今日 Token" value="1.24M" sub="↑输入 820K · ↓输出 420K" icon={Activity} progress={72} />
          <StatBig label="平均速度" value="55 t/s" sub="Q4_K_M · CPU + NPU" icon={Zap} progress={55} />
        </div>

        <div className="rounded-lg border border-border bg-card flex-1 min-h-0 overflow-hidden">
          <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-border text-[12px]">
            <span className="font-medium">模型库</span>
            <span className="text-muted-foreground">7 个 · 32.1 GB</span>
            <span className="ml-auto inline-flex items-center gap-1 text-brand">
              <Download className="size-3" /> 添加模型
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
                <div className={`size-6 rounded-md grid place-items-center ${
                  m.loaded ? "bg-brand/15 text-brand" : "bg-muted text-muted-foreground"
                }`}>
                  <BrainCircuit className="size-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[12px] font-medium truncate">{m.name}</span>
                    {m.tag && (
                      <span className="text-[12px] px-1 rounded bg-muted text-muted-foreground">
                        {m.tag}
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
                  <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded ${
                    m.status === "运行中"
                      ? "bg-success/15 text-success"
                      : m.loaded
                        ? "bg-brand/15 text-brand"
                        : m.dl
                          ? "bg-brand-2/15 text-brand-2"
                          : "bg-muted text-muted-foreground"
                  }`}>
                    {m.status === "运行中" && <span className="size-1 rounded-full bg-success animate-pulse" />}
                    {m.status}
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
          <span className="text-[12px] font-medium">本地对话</span>
          <span className="text-[12px] text-muted-foreground">Qwen2.5-14B · 已连接 RAG</span>
          <span className="ml-auto text-[12px] text-success inline-flex items-center gap-1">
            <span className="size-1 rounded-full bg-success animate-pulse" /> 在线
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
              <span className="ml-1 text-[12px] text-muted-foreground">生成中 · 42 tok/s</span>
            </div>
          </motion.div>
        </div>
        <div className="border-t border-border p-1.5 flex items-center gap-1.5">
          <div className="flex-1 h-6 rounded-md bg-muted/60 border border-border px-2 flex items-center text-[12px] text-muted-foreground">
            向本地模型提问，或 @文件 引用…
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
          {[...(t("marquee.items", { returnObjects: true }) as string[]), ...(t("marquee.items", { returnObjects: true }) as string[]), ...(t("marquee.items", { returnObjects: true }) as string[])].map((item, i) => (
            <span key={i} className="opacity-70">{item}</span>
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
            {t("features.titleA")} <span className="text-muted-foreground">{t("features.titleB")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
            {t("features.desc")}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {featureTags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-card/50 px-3 py-1 text-muted-foreground">
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
                <div className={`absolute inset-0 bg-gradient-to-br ${visual.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative">
                  <div className="mb-6 inline-flex items-center justify-center size-12 rounded-xl bg-muted/80 border border-border/50 text-foreground">
                    <Icon className="size-5.5" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight">{m.title}</h3>
                  <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed">
                    {m.desc}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-3">
                    <span className="text-sm font-medium text-foreground/90">{m.count}</span>
                    <div className="flex flex-wrap justify-end gap-1">
                      {m.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
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
            {t("aiApps.titleA")}<span className="text-muted-foreground">{t("aiApps.titleB")}</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {t("aiApps.desc")}
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm">
            {appTags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-background/50 px-3 py-1 text-muted-foreground">
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
                <div className="relative h-[calc(100%-2.25rem)] overflow-hidden">
                  {s.node}
                </div>
              </div>
            </motion.div>
          </div>
        )})}
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
    { icon: Server, title: "多平台部署", desc: "支持 ARM / x86 设备，适配主流 NAS、迷你主机和旧电脑，按硬件条件选择合适安装方式。" },
    { icon: Upload, title: "一键安装", desc: "提供自动化安装脚本，完成依赖检测、服务初始化、目录创建和基础配置。" },
    { icon: Database, title: "接入现有存储", desc: "可挂载本地磁盘、RAID 阵列和网络存储，文件、相册、影音库无需重新迁移。" },
    { icon: BrainCircuit, title: "启用本地 AI", desc: "部署后即可开启文件语义搜索、相册识别、影音元数据整理和字幕生成等本地能力。" },
  ];
  return (
    <section id="stack" className="pt-24 md:pt-32 pb-24">
      <div className="mx-auto max-w-[1320px] px-6">
        <div className="mb-10 max-w-4xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.05]">
            {t("stack.titleA")}<span className="text-muted-foreground">{t("stack.titleB")}</span>
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
              {t("stack.runTitleA")}<span className="text-gradient-brand">{t("stack.runTitleB")}</span>
            </h2>
            <p className="mt-5 text-muted-foreground max-w-md leading-relaxed">
              {t("stack.runDesc")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-sm">
              {runTags.map((tag) => (
                <span key={tag} className="rounded-full border border-border bg-card/50 px-3 py-1 text-muted-foreground">
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
                <div className="mt-3 text-sm text-muted-foreground leading-relaxed">{copy.desc}</div>
              </motion.div>
            )})}
          </div>
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
              {t("cta.titleA")} <span className="text-gradient-brand">{t("cta.titleB")}</span> {t("cta.titleC")}
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              {t("cta.desc")}
            </p>
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
      <span className="text-sm font-mono text-muted-foreground group-hover:text-brand transition-colors select-none">$</span>
      <code className="text-sm font-mono text-foreground group-hover:text-foreground pl-2 pr-3">{command}</code>
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
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-[1320px] px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo className="h-5" />
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} YesNAS
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <a href="/privacy" className="hover:text-foreground transition">{t("footer.privacy")}</a>
          <a href="/terms" className="hover:text-foreground transition">{t("footer.terms")}</a>
          <a href="mailto:admin@yesnas.com" className="hover:text-foreground transition">admin@yesnas.com</a>
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
