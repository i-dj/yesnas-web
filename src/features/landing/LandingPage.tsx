import { useLocation } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import {
  Box,
  BrainCircuit,
  Database,
  FileSearch,
  Film,
  HardDrive,
  Image as ImageIcon,
  Languages,
  Network,
  Server,
  Upload,
  Github,
  ArrowRight,
  Check,
  ChevronDown,
  Copy,
} from "lucide-react";
import logoUrl from "@/assets/logo-yesnas-dark.webp";
import { demoFallbacks } from "@/i18n/demoFallbacks";
import {
  allResources,
  localeFromPathname,
  localeOptions,
  localeToLegalPath,
  localeToPath,
  type LocaleCode,
} from "@/i18n/locales";
import {
  ProductDemo,
  ScreenDocker,
  ScreenFiles,
  ScreenMedia,
  ScreenPhotos,
  ScreenShares,
  ScreenStorage,
} from "./DemoSystem";
/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type LocalizedText = { en: string } & Partial<Record<LocaleCode, string>>;

function useCurrentLocale() {
  const location = useLocation();
  return localeFromPathname(location.pathname);
}

function pickLocale(locale: LocaleCode, copy: LocalizedText) {
  return copy[locale] ?? demoFallbacks[locale]?.[copy.en] ?? copy.en;
}

const tx = (locale: LocaleCode, copy: LocalizedText) => pickLocale(locale, copy);

function getTranslationValue(locale: LocaleCode, key: string): unknown {
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
    t: <T = string,>(key: string, options?: { returnObjects?: boolean }): T => {
      const value = getTranslationValue(locale, key);
      if (options?.returnObjects) return value as T;
      return String(value) as T;
    },
  };
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function Landing() {
  const locale = useCurrentLocale();

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
  const { t } = useLocalizedTranslation();
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
  const { t } = useLocalizedTranslation();
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

/* Product demo screens live in ./DemoSystem.tsx */
function Marquee() {
  const { t } = useLocalizedTranslation();
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
  const { t } = useLocalizedTranslation();
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
                  <div className="mt-6 flex min-w-0 items-center justify-between gap-3">
                    <span className="min-w-0 shrink truncate whitespace-nowrap text-sm font-medium text-foreground/90">
                      {m.count}
                    </span>
                    <div className="flex min-w-0 shrink-0 flex-nowrap justify-end gap-1 overflow-hidden">
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          className="max-w-[9rem] truncate whitespace-nowrap rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
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
  const { t } = useLocalizedTranslation();
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
  const { t } = useLocalizedTranslation();
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
  const { t } = useLocalizedTranslation();
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
  const { t } = useLocalizedTranslation();
  const pulseInstallCommand = (target: HTMLElement) => {
    target.classList.remove("install-command-pulse");
    void target.offsetWidth;
    target.classList.add("install-command-pulse");
    window.setTimeout(() => target.classList.remove("install-command-pulse"), 2400);
  };

  const focusInstallCommand = (event: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("install-command");

    if (!target) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", window.location.pathname + window.location.search);

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const startedAt = performance.now();
    const waitUntilAtTop = () => {
      const isAtTop = window.scrollY <= 8;
      const timedOut = performance.now() - startedAt > 1500;

      if (isAtTop || timedOut) {
        pulseInstallCommand(target);
        return;
      }

      window.requestAnimationFrame(waitUntilAtTop);
    };

    window.requestAnimationFrame(waitUntilAtTop);
  };

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
                href="#install-command"
                onClick={focusInstallCommand}
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
  const { t } = useLocalizedTranslation();
  const [copied, setCopied] = useState(false);
  return (
    <div
      id="install-command"
      className="group flex scroll-mt-28 items-center gap-1 rounded-md border border-border bg-card/60 backdrop-blur pl-4 pr-1 py-1 transition-colors hover:border-brand/60 hover:bg-card"
    >
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
  const { t } = useLocalizedTranslation();
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
