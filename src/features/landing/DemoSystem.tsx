import { useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Activity,
  Bell,
  Bot,
  Box,
  BrainCircuit,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
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
  type LucideIcon,
} from "lucide-react";
import { demoFallbacks } from "@/i18n/demoFallbacks";
import { allResources, localeFromPathname, type LocaleCode } from "@/i18n/locales";
import {
  AUDIO_TRACKS,
  PHOTO_BUCKETS,
  PHOTO_POOL,
  interstellarPoster,
  logoUrl,
  movieClip,
  pBaby1,
  pBaby2,
  pFood1,
  pLand1,
  pLand2,
  pPet1,
  pRec1,
  pRec2,
  pScr1,
  type LocalizedText,
  type PhotoItem,
} from "./demoData";
import {
  AI_MODULES,
  ASSISTANT_COPY,
  ASSISTANT_QUICK_ACTIONS,
  ASSISTANT_TAGS,
  AUTOMATION_STEPS,
  AUTOMATION_WORKFLOWS,
  DASHBOARD_COPY,
  DEMO_GROUP_LABELS,
  DEMO_NAV,
  DOCKER_CONTAINERS,
  DOCKER_COPY,
  DOCKER_EVENTS,
  DOCKER_IMAGES,
  DOCKER_NETWORKS,
  DOCKER_VOLUMES,
  FILES_AUTO_FOLDERS,
  FILES_CAR_THUMBS,
  FILES_COPY,
  FILES_STATS,
  FILES_TOOLS,
  HARDWARE_COPY,
  HARDWARE_DISKS,
  LLM_COPY,
  LLM_MODELS,
  LOGS_COPY,
  MEDIA_COPY,
  MEDIA_MOVIES,
  MEDIA_SCRAPING,
  MEMORY_LINKS,
  MEMORY_TIMELINE,
  MOVIE_PLAYER_COPY,
  PHOTOS_CLEANUP_ITEMS,
  PHOTOS_COPY,
  PHOTOS_FACE_STATS,
  PHOTOS_MEMORY_ALBUMS,
  PHOTOS_MORE_ALBUMS,
  PHOTOS_PEOPLE,
  PHOTOS_RECENT_ACTIVITY,
  PHOTOS_TIMELINE,
  SHARES_COPY,
  SHARES_SHARED_FOLDERS,
  SHARES_SHARES,
  STATE_PILL_LABELS,
  STORAGE_COPY,
  STORAGE_DISKS,
  STORAGE_POOL_METRIC_LABELS,
  STORAGE_POOLS,
  TASKS_COPY,
  USERS_COPY,
  getAssistantResults,
  getLlmMessages,
  getLogsRows,
  getTasksRows,
  getTasksTabs,
  getUsersUsers,
} from "./demoContent";

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

const NAV = DEMO_NAV;

const GROUP_LABELS = DEMO_GROUP_LABELS;

function useCurrentLocale() {
  const location = useLocation();
  return localeFromPathname(location.pathname);
}

function pickLocale(locale: LocaleCode, copy: LocalizedText) {
  return copy[locale] ?? demoFallbacks[locale]?.[copy.en] ?? copy.en;
}

const tx = (locale: LocaleCode, copy: LocalizedText) => pickLocale(locale, copy);

function getTranslationValue(locale: LocaleCode, key: string) {
  const language = allResources[locale]?.translation ?? allResources.en.translation;
  const fallback = allResources.en.translation;
  const read = (source: unknown) =>
    key.split(".").reduce<unknown>((value, segment) => {
      if (value && typeof value === "object" && segment in value) {
        return (value as Record<string, unknown>)[segment];
      }
      return undefined;
    }, source);

  return read(language) ?? read(fallback) ?? key;
}

function useLocalizedTranslation() {
  const locale = useCurrentLocale();
  return {
    t: (key: string) => getTranslationValue(locale, key),
  };
}

/* ------------------------------------------------------------------ */

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

export function ProductDemo() {
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
  const copy = DASHBOARD_COPY;
  const summary = [
    ["432", copy.photos],
    ["12", copy.videos],
    ["5", copy.pdfs],
    [tx(locale, copy.peoplePlaces), copy.aiRecognized],
    ["63", copy.duplicates],
    ["128 GB", copy.release],
  ] as const;
  const healthCards = [
    {
      label: copy.status,
      value: copy.normal,
      sub: copy.uptime,
      icon: Shield,
      progress: 100,
      accent: "success",
    },
    {
      label: copy.systemDisk,
      value: "61.3%",
      sub: "561 GB / 916 GB · " + tx(locale, copy.healthy),
      icon: HardDrive,
      progress: 61,
      accent: "brand",
    },
    {
      label: copy.load,
      value: "0.30",
      sub: copy.loadSub,
      icon: Activity,
      progress: 30,
      accent: "brand-2",
    },
    {
      label: copy.diskIo,
      value: "0 B/s",
      sub: copy.readWrite,
      icon: Database,
      progress: 6,
      accent: "brand-2",
    },
  ] satisfies Array<{
    label: LocalizedText;
    value: LocalizedText | string;
    sub: LocalizedText | string;
    icon: LucideIcon;
    progress: number;
    accent: "brand" | "brand-2" | "success";
  }>;
  const quickCards = [
    {
      title: copy.computeEngine,
      icon: Cpu,
      stat: "4",
      sub: copy.fourThreads,
      lines: [
        [copy.fan, "1240 RPM"],
        [copy.watt, "6.2 W"],
      ],
      ring: 15,
    },
    {
      title: copy.memory,
      icon: MemoryStick,
      stat: "15.4 GB",
      sub: "DDR5 · 4800MHz",
      lines: [
        [copy.used, "3.54 GB"],
        [copy.available, "11.9 GB"],
      ],
      ring: 23,
    },
    {
      title: copy.mediaEngine,
      icon: Zap,
      stat: "GPU",
      sub: copy.mediaSub,
      lines: [
        [copy.vram, tx(locale, copy.shared2)],
        [copy.temperature, "42°C"],
      ],
      ring: 12,
    },
  ] satisfies Array<{
    title: LocalizedText;
    icon: LucideIcon;
    stat: string;
    sub: LocalizedText | string;
    lines: Array<[LocalizedText, string]>;
    ring: number;
  }>;
  const serviceCards = [
    {
      title: copy.storagePools,
      icon: Layers,
      meta: `4 ${tx(locale, copy.pools)} · 4 ${tx(locale, copy.healthy)}`,
      items: [
        [copy.mounted, "4"],
        [copy.abnormal, "0"],
      ],
    },
    {
      title: copy.fileSharing,
      icon: Share2,
      meta: `12 ${tx(locale, copy.sharedFolders)} · 6 ${tx(locale, copy.onlineUsers)}`,
      items: [
        [
          {
            en: "SMB",
            zh: "SMB",
            ja: "SMB",
            de: "SMB",
            fr: "SMB",
            es: "SMB",
            ko: "SMB",
            pt: "SMB",
          },
          "2",
        ],
        [
          {
            en: "FTP",
            zh: "FTP",
            ja: "FTP",
            de: "FTP",
            fr: "FTP",
            es: "FTP",
            ko: "FTP",
            pt: "FTP",
          },
          "2",
        ],
        [
          {
            en: "NFS",
            zh: "NFS",
            ja: "NFS",
            de: "NFS",
            fr: "NFS",
            es: "NFS",
            ko: "NFS",
            pt: "NFS",
          },
          "0",
        ],
        [
          {
            en: "WebDAV",
            zh: "WebDAV",
            ja: "WebDAV",
            de: "WebDAV",
            fr: "WebDAV",
            es: "WebDAV",
            ko: "WebDAV",
            pt: "WebDAV",
          },
          "4",
        ],
      ],
    },
    {
      title: copy.dockerContainers,
      icon: Box,
      meta: `2 ${tx(locale, copy.images)} · 2 ${tx(locale, copy.containers)}`,
      items: [
        [copy.running, "2"],
        [copy.stopped, "0"],
      ],
    },
  ] satisfies Array<{
    title: LocalizedText;
    icon: LucideIcon;
    meta: string;
    items: Array<[LocalizedText, string]>;
  }>;

  return (
    <div className="p-3.5 space-y-2.5 h-full overflow-hidden text-[12px]">
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
          {summary.map(([value, label], i) => (
            <motion.div
              key={String(value)}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="rounded border border-border/60 bg-background/50 px-2 py-1"
            >
              <div className="text-[13px] font-semibold text-brand">{value}</div>
              <div className="text-[12px] text-muted-foreground">{tx(locale, label)}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex items-center gap-3 text-[12px] text-muted-foreground">
        <div className="text-sm font-semibold text-foreground">{tx(locale, copy.systemInfo)}</div>
        <span className="text-success">●</span>
        <span>{tx(locale, copy.refresh)}</span>
        <span className="ml-auto">
          {tx(locale, copy.power)} · {tx(locale, copy.ac)}
        </span>
        <span>{tx(locale, copy.host)} yesnas</span>
        <span>{tx(locale, copy.fan)} 1240 RPM</span>
        <span>{tx(locale, copy.watt)} 14.6 W</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {healthCards.map((card, i) => (
          <motion.div
            key={card.label.en}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <StatBig
              label={tx(locale, card.label)}
              value={typeof card.value === "string" ? card.value : tx(locale, card.value)}
              sub={typeof card.sub === "string" ? card.sub : tx(locale, card.sub)}
              icon={card.icon}
              progress={card.progress}
              accent={card.accent}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-[1fr_0.52fr] gap-2 min-h-0">
        <div className="rounded-lg border border-border bg-card p-3 min-h-0">
          <div className="flex items-center gap-2">
            <div className="text-sm font-semibold">{tx(locale, copy.bandwidth)}</div>
            <span className="text-[12px] text-muted-foreground">
              {tx(locale, copy.realtimeNics)}
            </span>
            <span className="ml-auto text-[12px] text-muted-foreground">
              ↓ 474 B/s · ↑ 1.43 KB/s
            </span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-muted-foreground">
            {[copy.realtime, copy.hour, copy.day, copy.week, copy.month].map((tab, i) => (
              <span
                key={tab.en}
                className={
                  i === 0 ? "rounded bg-muted px-2 py-0.5 text-foreground" : "rounded px-2 py-0.5"
                }
              >
                {tx(locale, tab)}
              </span>
            ))}
            <span className="ml-auto rounded border border-border/60 px-2 py-0.5">
              {tx(locale, copy.allNics)}
            </span>
          </div>
          <div className="mt-2 h-28 rounded border border-border/40 bg-background/40 overflow-hidden relative">
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 640 180"
              preserveAspectRatio="none"
            >
              <path
                d="M0,120 C90,70 170,118 250,92 C340,52 430,126 520,96 C570,80 610,104 640,92"
                fill="none"
                stroke="oklch(0.72 0.18 260)"
                strokeWidth="3"
              />
              <path
                d="M0,145 C120,130 220,145 320,136 C430,128 520,150 640,138"
                fill="none"
                stroke="oklch(0.75 0.18 190)"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute inset-x-4 bottom-2 flex justify-between text-[10px] text-muted-foreground">
              {["-16s", "-12s", "-8s", "-4s", "now"].map((tick) => (
                <span key={tick}>{tick}</span>
              ))}
            </div>
          </div>
          <div className="mt-1.5 flex justify-center gap-4 text-[11px] text-muted-foreground">
            <span className="text-brand">— {tx(locale, copy.send)}</span>
            <span className="text-brand-2">— {tx(locale, copy.receive)}</span>
          </div>
        </div>
        <div className="grid grid-rows-3 gap-2">
          {quickCards.map((panel) => {
            const Icon = panel.icon;
            return (
              <div key={panel.title.en} className="rounded-lg border border-border bg-card p-2.5">
                <div className="flex items-center gap-2">
                  <Icon className="size-3.5 text-brand" />
                  <div className="font-semibold">{tx(locale, panel.title)}</div>
                  <span className="ml-auto text-[11px] text-muted-foreground">
                    {typeof panel.sub === "string" ? panel.sub : tx(locale, panel.sub)}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <RingStat value={panel.ring} label={tx(locale, panel.title)} />
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-semibold leading-none">{panel.stat}</div>
                    <div className="mt-1 grid grid-cols-[1fr_auto] gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                      {panel.lines.map(([label, value]) => (
                        <div key={label.en} className="contents">
                          <span>{tx(locale, label)}</span>
                          <span className="text-right text-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {serviceCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title.en}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18 + i * 0.04 }}
              className="rounded-lg border border-border bg-card p-2.5"
            >
              <div className="flex items-center gap-2">
                <Icon className="size-3.5 text-brand" />
                <span className="font-semibold">{tx(locale, card.title)}</span>
                <span className="ml-auto text-[12px] text-muted-foreground">{card.meta}</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-1.5">
                {card.items.map(([label, value]) => (
                  <div
                    key={label.en}
                    className="rounded border border-border/60 bg-background/40 p-1.5"
                  >
                    <div className="text-[11px] text-muted-foreground">{tx(locale, label)}</div>
                    <div className="text-sm font-semibold text-foreground">{value}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ---- Screen: Storage ---- */
export function ScreenStorage() {
  const locale = useCurrentLocale();
  const copy = STORAGE_COPY;
  const disks = STORAGE_DISKS;

  return (
    <div className="p-3.5 space-y-3 h-full overflow-hidden text-[12px]">
      <div className="flex items-center gap-2">
        {copy.tabs.map((tab, i) => (
          <button
            key={tab.en}
            className={
              i === 0
                ? "rounded-md bg-accent px-2.5 py-1 text-foreground"
                : "rounded-md border border-border px-2.5 py-1 text-muted-foreground"
            }
          >
            {tx(locale, tab)}
          </button>
        ))}
        <button className="ml-auto rounded-md bg-foreground px-3 py-1 text-background">
          {tx(locale, copy.addLocal)}
        </button>
      </div>

      <section>
        <div className="mb-2 font-medium">{tx(locale, copy.localDisks)}</div>
        <div className="grid grid-cols-4 gap-2">
          {disks.map((d) => (
            <div key={d.name} className="rounded-lg border border-border bg-card p-3">
              <div className="flex items-center justify-between gap-2">
                <div className="truncate font-medium">{d.name}</div>
                <span
                  className={
                    "rounded px-1.5 py-0.5 " +
                    (d.used ? "bg-muted text-muted-foreground" : "bg-success/20 text-success")
                  }
                >
                  {d.used ? tx(locale, copy.used) : tx(locale, copy.available)}
                </span>
              </div>
              <div className="mt-3 text-lg font-semibold">{d.cap}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <div className="font-medium">{tx(locale, copy.pools)}</div>
        {STORAGE_POOLS.map((p, i) => (
          <motion.div
            key={p.name.en}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-lg border border-border bg-card p-3"
          >
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-lg bg-success/15 text-success grid place-items-center">
                <Layers className="size-4" />
              </div>
              <div className="w-44 shrink-0">
                <div className="font-semibold">{tx(locale, p.name)}</div>
                <div className="text-muted-foreground">
                  {p.type} · {p.disks} {tx(locale, copy.diskUnit)}
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-1 flex justify-between">
                  <span className="text-muted-foreground">{tx(locale, copy.capacity)}</span>
                  <span className="font-mono">12.23 GiB / 2.82 TiB</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-brand"
                    initial={{ width: 0 }}
                    animate={{ width: String(p.used) + "%" }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-5 gap-2 border-t border-border/50 pt-3">
              {(
                [
                  [copy.read, p.read, Upload],
                  [copy.write, p.write, Download],
                  [STORAGE_POOL_METRIC_LABELS.iops, p.iops, Zap],
                  [copy.latency, p.latency, Activity],
                  [STORAGE_POOL_METRIC_LABELS.temp, p.temp, Cpu],
                ] satisfies Array<[LocalizedText, string, LucideIcon]>
              ).map(([label, value, Icon]) => (
                <div key={(label as LocalizedText).en} className="text-muted-foreground">
                  <div>{tx(locale, label as LocalizedText)}</div>
                  <div className="mt-1 flex items-center gap-1 font-mono text-foreground">
                    <Icon className="size-3 text-brand" /> {String(value)}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </section>
    </div>
  );
}

/* ---- Screen: Shares ---- */
export function ScreenShares() {
  const locale = useCurrentLocale();
  const copy = SHARES_COPY;
  const shares = SHARES_SHARES;
  const sharedFolders = SHARES_SHARED_FOLDERS;
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
export function ScreenDocker() {
  const locale = useCurrentLocale();
  const copy = DOCKER_COPY;
  const containers = DOCKER_CONTAINERS;
  const images = DOCKER_IMAGES;
  const networks = DOCKER_NETWORKS;
  const volumes = DOCKER_VOLUMES;
  const events = DOCKER_EVENTS;
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
                      {tx(locale, n.type)} · {n.subnet}
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

type ContainerState = keyof typeof STATE_PILL_LABELS;

function StatePill({ state, locale }: { state: string; locale: LocaleCode }) {
  const map: Record<string, string> = {
    running: "bg-success/20 text-success",
    stopped: "bg-muted text-muted-foreground",
    paused: "bg-yellow-500/20 text-yellow-500",
  };
  const labels = STATE_PILL_LABELS;
  const normalizedState = (state in labels ? state : "stopped") as ContainerState;
  return (
    <span className={`text-[11px] px-1.5 py-0.5 rounded ${map[state]}`}>
      {pickLocale(locale, labels[normalizedState])}
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
  const copy = HARDWARE_COPY;
  const disks = HARDWARE_DISKS;
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

function StatBig({
  label,
  value,
  sub,
  icon: Icon,
  progress,
  accent = "brand",
}: {
  label: string;
  value: string;
  sub: string;
  icon: LucideIcon;
  progress?: number;
  accent?: "brand" | "brand-2" | "success";
}) {
  const accentClass =
    accent === "success"
      ? "text-success bg-success/15"
      : accent === "brand-2"
        ? "text-brand-2 bg-brand-2/15"
        : "text-brand bg-brand/15";

  return (
    <div className="rounded-lg border border-border bg-card p-2.5 min-w-0">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-[12px] text-muted-foreground truncate">{label}</div>
          <div className="mt-1 text-lg font-semibold leading-none text-foreground">{value}</div>
          <div className="mt-1 text-[12px] text-muted-foreground truncate">{sub}</div>
        </div>
        <div className={`size-6 rounded-md grid place-items-center shrink-0 ${accentClass}`}>
          <Icon className="size-3.5" />
        </div>
      </div>
      {typeof progress === "number" && (
        <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-gradient-brand"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8 }}
          />
        </div>
      )}
    </div>
  );
}

/* ---- Screen: Tasks ---- */
function ScreenTasks() {
  const locale = useCurrentLocale();
  const copy = TASKS_COPY;
  const tabs = getTasksTabs();
  const rows = getTasksRows();
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
  const copy = USERS_COPY;
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
  const users = getUsersUsers();
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
  const copy = LOGS_COPY;
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
  const rows = getLogsRows(locale);
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
  const modules = AI_MODULES;
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
  const copy = ASSISTANT_COPY;
  const tags = ASSISTANT_TAGS;
  const results = getAssistantResults(locale);
  const quickActions = ASSISTANT_QUICK_ACTIONS;
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
  const links = MEMORY_LINKS;
  const timeline = MEMORY_TIMELINE;
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
export function ScreenFiles() {
  const locale = useCurrentLocale();
  const copy = FILES_COPY;
  const carThumbs = FILES_CAR_THUMBS;
  const autoFolders = FILES_AUTO_FOLDERS;
  const tools = FILES_TOOLS;
  const stats = FILES_STATS;
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
  const steps = AUTOMATION_STEPS;
  const workflows = AUTOMATION_WORKFLOWS;
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
const PHOTO_BUCKET_ICONS = {
  users: Users,
  mapPin: MapPin,
  receipt: Receipt,
  sparkles: Sparkles,
  star: Star,
  fileText: FileText,
} as const;

export function ScreenPhotos() {
  const locale = useCurrentLocale();
  const copy = PHOTOS_COPY;
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

  const memoryAlbums = PHOTOS_MEMORY_ALBUMS;
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
            {PHOTOS_PEOPLE.map((f, i) => (
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
            {PHOTOS_FACE_STATS.map((item) => (
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
          {PHOTOS_TIMELINE.map((ev) => (
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
            {PHOTOS_CLEANUP_ITEMS.map((item) => (
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
            {PHOTOS_MORE_ALBUMS.map((album) => (
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
            {PHOTOS_RECENT_ACTIVITY.map((item) => (
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
          const Icon = PHOTO_BUCKET_ICONS[b.icon];
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

function MoviePlayer() {
  const locale = useCurrentLocale();
  const copy = MOVIE_PLAYER_COPY;
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
export function ScreenMedia() {
  const locale = useCurrentLocale();
  const copy = MEDIA_COPY;
  const movies = MEDIA_MOVIES;
  const scraping = MEDIA_SCRAPING;
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
  const copy = LLM_COPY;
  const models = LLM_MODELS;
  const messages = getLlmMessages(locale);
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
