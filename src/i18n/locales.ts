export const defaultLocale = "zh-CN";

export const localeOptions = [
  { code: "system", label: "系统默认" },
  { code: "en", label: "English" },
  { code: "zh-CN", label: "简体中文" },
  { code: "zh-TW", label: "繁體中文" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "pt-BR", label: "Português Brasileiro" },
  { code: "it", label: "Italiano" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "ru", label: "Русский" },
  { code: "uk", label: "Українська" },
  { code: "tr", label: "Türkçe" },
  { code: "id", label: "Bahasa Indonesia" },
] as const;

export type LocaleCode = (typeof localeOptions)[number]["code"];
export type AppLocale = Exclude<LocaleCode, "system">;

const zhCN = {
  nav: {
    demo: "演示",
    intro: "介绍",
    aiApps: "AI 应用",
    deploy: "部署",
    github: "GitHub",
    language: "语言",
    system: "系统默认",
  },
  hero: {
    title: "你的私有 AI NAS",
    desc: "一个面向个人和家庭的数据中枢，让文件、相册、影音和知识库留在本地、安全可控。由本地 AI 驱动，整理、搜索和增强都在你的设备上完成。",
  },
  marquee: {
    title: "兼容你已经在用的一切",
    items: [
      "本地 RAID",
      "网络存储",
      "SMB / NFS / WebDAV",
      "照片识别",
      "影音元数据",
      "本地 AI 推理",
      "Docker 应用",
      "权限与共享",
      "快照与备份",
      "日志审计追踪",
      "数据迁移与备份",
      "私有化运行",
    ],
  },
  features: {
    eyebrow: "AI Lazy Service",
    titleA: "专治懒人的",
    titleB: "AI 数据管家。",
    desc: "文件自动分类，相册自动成册，影音自动补海报、字幕和多音轨。你只负责把数据放进来，剩下的整理、搜索和维护交给 AI。",
    tags: ["自动整理文件", "自动分类相册", "影音多音轨", "本地 AI 运行"],
    modules: [
      {
        title: "文件自动整理",
        desc: "不用建文件夹、不用记文件名。AI 读懂图片、PDF、视频和文档，自动归类，也能用一句话直接搜出来。",
        count: "内容检索",
        tags: ["自动分类", "语义搜索"],
      },
      {
        title: "相册自动归类",
        desc: "人物、宠物、风景、票据、截图自动识别。照片一导入，AI 就帮你分好相册，回忆也自动生成。",
        count: "智能相册",
        tags: ["人脸聚类", "回忆生成"],
      },
      {
        title: "影音自动增强",
        desc: "电影剧集自动刮削海报和简介，还能生成字幕、翻译字幕，甚至提供多语言声轨，让本地片库更像流媒体。",
        count: "影音增强",
        tags: ["多音轨", "字幕翻译"],
      },
      {
        title: "数据安全",
        desc: "多种备份策略自由选择，重要文件随时快照。数据留在本地，本地 AI 帮你识别风险、提醒备份和恢复。",
        count: "数据保护",
        tags: ["多重备份", "随时快照"],
      },
      {
        title: "应用自动部署",
        desc: "想装什么直接说。AI 帮你拉镜像、配目录、开端口、看日志，常见问题也能给出修复建议。",
        count: "应用运维",
        tags: ["一键部署", "日志诊断"],
      },
      {
        title: "远程自动连接",
        desc: "不用折腾公网 IP 和路由器。出差、办公室、家里都能安全访问，AI 自动选择更稳的连接方式。",
        count: "安全远程",
        tags: ["安全访问", "自动路由"],
      },
    ],
  },
  aiApps: {
    titleA: "核心能力，",
    titleB: "AI 应用。",
    desc: "将文件检索、相册管理、影音整理、存储监控、共享权限与应用运维整合到同一套工作台。常用能力高效直达，进阶配置保持清晰可控。",
    tags: ["统一入口", "自动化工作流", "权限与共享", "状态可观测"],
    strips: [
      {
        eyebrow: "AI 文件",
        title: "找蓝色跑车的照片，就是这么简单。",
        desc: "语义搜索理解你说的每一句话。不用记文件名、不用翻文件夹，AI 直接把答案带到你面前。",
      },
      {
        eyebrow: "AI 相册",
        title: "照片自动归类，关系清晰可查。",
        desc: "基于人脸、地点、场景和时间自动建立索引，快速整理家庭相册、旅行记录与重要事件。",
      },
      {
        eyebrow: "AI 影音",
        title: "影音元数据自动完善。",
        desc: "自动匹配 TMDB 信息、海报、简介和评分，并结合本地 AI 生成剧情摘要、字幕翻译和多音轨内容。",
      },
      {
        eyebrow: "存储",
        title: "本地 RAID 与网络存储统一管理。",
        desc: "支持本地 RAID、外接硬盘与多种网络存储接入，集中展示容量、健康状态、实时 IO 和风险预警。",
      },
      {
        eyebrow: "共享",
        title: "跨设备访问统一管理。",
        desc: "统一管理 SMB、NFS、WebDAV 和浏览器访问权限，兼容 Windows、macOS、Linux 与移动设备。",
      },
      {
        eyebrow: "Docker",
        title: "容器管理，安静而强大。",
        desc: "运行、暂停、日志、端口，不需要打开终端。",
      },
    ],
  },
  stack: {
    titleA: "部署流程，",
    titleB: "几步完成。",
    desc: "从选择设备到接入现有数据，再到启用本地 AI 能力，部署路径清晰可控。适合 NAS、迷你主机和旧电脑，不需要重新整理已有文件。",
    steps: [
      ["01", "选择设备", "NAS、迷你主机、旧电脑都可以作为运行节点"],
      ["02", "一键安装", "自动完成环境检测、服务部署和初始配置"],
      ["03", "接入数据", "挂载已有磁盘、共享目录、影音库和相册"],
      ["04", "开启 AI", "在本地完成检索、归类、字幕和媒体增强"],
    ],
    runTitleA: "运行方式，",
    runTitleB: "按需选择。",
    runDesc: "YesNAS 部署在你的设备上，负责统一接入存储、共享、影音库和本地 AI 服务。安装流程尽量自动化，后续升级可回滚，数据目录保持开放，方便迁移和备份。",
    runTags: ["一键安装", "本地部署", "接入现有数据", "可回滚升级"],
    items: [
      {
        title: "多平台部署",
        desc: "支持 ARM / x86 设备，适配主流 NAS、迷你主机和旧电脑，按硬件条件选择合适安装方式。",
      },
      {
        title: "一键安装",
        desc: "提供自动化安装脚本，完成依赖检测、服务初始化、目录创建和基础配置。",
      },
      {
        title: "接入现有存储",
        desc: "可挂载本地磁盘、RAID 阵列和网络存储，文件、相册、影音库无需重新迁移。",
      },
      {
        title: "启用本地 AI",
        desc: "部署后即可开启文件语义搜索、相册识别、影音元数据整理和字幕生成等本地能力。",
      },
    ],
  },
  cta: {
    titleA: "准备好安装",
    titleB: "YesNAS",
    titleC: "了吗？",
    desc: "开源、免费、社区驱动。5 分钟内让你的老机器焕发新生。",
    install: "一键安装",
    github: "在 GitHub 上查看",
    copy: "复制安装命令",
  },
  footer: {
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
};

const makeLocale = (partial: Partial<typeof zhCN>) => ({ ...zhCN, ...partial });

export const resources = {
  "zh-CN": { translation: zhCN },
  "zh-TW": {
    translation: makeLocale({
      nav: { ...zhCN.nav, intro: "介紹", aiApps: "AI 應用", deploy: "部署", system: "系統預設" },
      marquee: {
        title: "相容你已經在用的一切",
        items: ["本地 RAID", "網路儲存", "SMB / NFS / WebDAV", "照片識別", "影音元資料", "本地 AI 推理", "Docker 應用", "權限與共享", "快照與備份", "日誌稽核追蹤", "資料遷移與備份", "私有化運行"],
      },
      features: {
        ...zhCN.features,
        titleA: "為省心使用而生的",
        titleB: "AI 資料管家。",
        desc: "檔案自動分類，相簿自動成冊，影音自動補齊海報、字幕和多音軌。你只需放入資料，其餘整理、搜尋與維護交給 AI。",
      },
      aiApps: { ...zhCN.aiApps, titleA: "核心能力，", titleB: "AI 應用。" },
      stack: { ...zhCN.stack, titleA: "部署流程，", titleB: "幾步完成。", runTitleA: "運行方式，", runTitleB: "按需選擇。" },
      cta: { ...zhCN.cta, install: "一鍵安裝", github: "在 GitHub 上查看", copy: "複製安裝命令" },
    }),
  },
  en: {
    translation: makeLocale({
      nav: { demo: "Demo", intro: "Intro", aiApps: "AI Apps", deploy: "Deploy", github: "GitHub", language: "Language", system: "System" },
      marquee: {
        title: "Compatible with what you already use",
        items: ["Local RAID", "Network Storage", "SMB / NFS / WebDAV", "Photo Recognition", "Media Metadata", "Local AI Inference", "Docker Apps", "Permissions & Sharing", "Snapshots & Backup", "Audit Logs", "Data Migration", "Private Runtime"],
      },
      features: {
        eyebrow: "AI Data Steward",
        titleA: "AI data management",
        titleB: "for people who want less busywork.",
        desc: "Files sort themselves, albums become organized collections, and media libraries gain posters, subtitles, and multilingual audio. Put data in; let local AI handle organizing, search, and maintenance.",
        tags: ["File automation", "Smart albums", "Multilingual media", "Local AI"],
        modules: [
          { title: "File Automation", desc: "No folders to design and no filenames to remember. AI understands images, PDFs, videos, and documents, then classifies and finds them through natural language.", count: "Content search", tags: ["Auto classify", "Semantic search"] },
          { title: "Photo Library", desc: "People, pets, scenes, receipts, and screenshots are recognized automatically. Import photos and YesNAS builds albums and memories for you.", count: "Smart albums", tags: ["Face clustering", "Memory reels"] },
          { title: "Media Enhancement", desc: "Movies and shows get posters, summaries, subtitles, translated subtitles, and multilingual audio so your local library feels polished.", count: "Media tools", tags: ["Audio tracks", "Subtitle translation"] },
          { title: "Data Safety", desc: "Choose backup strategies, create snapshots for important files, and let local AI flag risks and recovery opportunities.", count: "Protection", tags: ["Multi-backup", "Snapshots"] },
          { title: "App Deployment", desc: "Say what you want to run. AI helps pull images, map folders, open ports, inspect logs, and suggest fixes.", count: "Operations", tags: ["One-click", "Log diagnosis"] },
          { title: "Remote Access", desc: "Skip public IP and router friction. Access securely from home, office, or travel while AI chooses a stable route.", count: "Remote access", tags: ["Secure access", "Auto routing"] },
        ],
      },
      aiApps: {
        titleA: "Core capabilities,",
        titleB: "AI apps.",
        desc: "File search, photo management, media organization, storage monitoring, permissions, sharing, and app operations come together in one workspace.",
        tags: ["Unified entry", "Automation", "Permissions", "Observability"],
        strips: [
          { eyebrow: "AI Files", title: "Find the blue sports car photo, just like that.", desc: "Semantic search understands everyday language. No filenames, no folder digging, just the result you meant." },
          { eyebrow: "AI Photos", title: "Photos classify themselves with clear relationships.", desc: "Faces, places, scenes, and time are indexed automatically for family albums, trips, and events." },
          { eyebrow: "AI Media", title: "Media metadata completes itself.", desc: "TMDB metadata, posters, summaries, ratings, local AI plot notes, translated subtitles, and audio tracks." },
          { eyebrow: "Storage", title: "Local RAID and network storage in one place.", desc: "Connect RAID, external drives, and network storage with capacity, health, real-time IO, and risk alerts." },
          { eyebrow: "Sharing", title: "Unified access across devices.", desc: "Manage SMB, NFS, WebDAV, and browser access for Windows, macOS, Linux, and mobile devices." },
          { eyebrow: "Docker", title: "Container management, quiet and capable.", desc: "Run, pause, logs, and ports without opening a terminal." },
        ],
      },
      stack: {
        titleA: "Deployment,",
        titleB: "step by step.",
        desc: "Choose a device, attach existing data, and enable local AI with a deployment path that stays clear and reversible.",
        steps: [["01", "Choose device", "NAS, mini PC, or an older computer can run it"], ["02", "One-click install", "Environment checks, services, and initial setup"], ["03", "Attach data", "Mount disks, shares, media libraries, and albums"], ["04", "Enable AI", "Local search, classification, subtitles, and media enhancement"]],
        runTitleA: "Run it",
        runTitleB: "your way.",
        runDesc: "YesNAS runs on your own device and connects storage, sharing, media, and local AI services. Installation is automated, upgrades can roll back, and data directories remain open for migration and backup.",
        runTags: ["One-click install", "Local deployment", "Existing data", "Rollback updates"],
        items: [
          { title: "Multi-platform", desc: "Supports ARM and x86 devices across mainstream NAS, mini PCs, and older computers." },
          { title: "One-click Install", desc: "Automated scripts handle dependency checks, service initialization, folders, and baseline config." },
          { title: "Existing Storage", desc: "Mount local disks, RAID arrays, and network storage without rebuilding your library." },
          { title: "Local AI", desc: "Enable semantic file search, photo recognition, media metadata, and subtitle generation locally." },
        ],
      },
      cta: { titleA: "Ready to install", titleB: "YesNAS", titleC: "?", desc: "Open-source, free, and community driven. Bring new life to old hardware in minutes.", install: "One-click Install", github: "View on GitHub", copy: "Copy install command" },
      footer: { privacy: "Privacy Policy", terms: "Terms of Use" },
    }),
  },
} as const;

const concise: Record<string, Partial<typeof zhCN>> = {
  ja: {
    nav: { demo: "デモ", intro: "紹介", aiApps: "AI アプリ", deploy: "導入", github: "GitHub", language: "言語", system: "システム既定" },
    features: { ...resources.en.translation.features, eyebrow: "AI データ管理", titleA: "手間を減らす", titleB: "AI データ管家。", desc: "ファイル、写真、メディアをローカル AI が自動整理。検索、分類、字幕、音声トラックまで端末内で処理します。" },
    aiApps: { ...resources.en.translation.aiApps, titleA: "中核機能、", titleB: "AI アプリ。" },
    stack: { ...resources.en.translation.stack, titleA: "導入手順、", titleB: "数ステップで完了。", runTitleA: "運用方式、", runTitleB: "必要に応じて選択。" },
    cta: { ...resources.en.translation.cta, install: "ワンクリック導入", github: "GitHub で見る", copy: "インストールコマンドをコピー" },
  },
  ko: {
    nav: { demo: "데모", intro: "소개", aiApps: "AI 앱", deploy: "배포", github: "GitHub", language: "언어", system: "시스템 기본" },
    features: { ...resources.en.translation.features, eyebrow: "AI 데이터 관리", titleA: "반복 작업을 줄이는", titleB: "AI 데이터 매니저.", desc: "파일, 사진, 미디어를 로컬 AI가 자동 정리합니다. 검색, 분류, 자막, 다중 오디오까지 기기 안에서 처리합니다." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "핵심 기능,", titleB: "AI 앱." },
    stack: { ...resources.en.translation.stack, titleA: "배포 과정,", titleB: "몇 단계면 충분합니다.", runTitleA: "운영 방식,", runTitleB: "필요에 맞게 선택." },
    cta: { ...resources.en.translation.cta, install: "원클릭 설치", github: "GitHub에서 보기", copy: "설치 명령 복사" },
  },
  "pt-BR": {
    nav: { demo: "Demo", intro: "Introdução", aiApps: "Apps de IA", deploy: "Implantar", github: "GitHub", language: "Idioma", system: "Sistema" },
    features: { ...resources.en.translation.features, eyebrow: "Gestão de dados com IA", titleA: "Menos trabalho manual,", titleB: "mais organização.", desc: "Arquivos, fotos e mídia são organizados por IA local, com busca semântica, legendas e trilhas em vários idiomas." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Capacidades centrais,", titleB: "apps de IA." },
    stack: { ...resources.en.translation.stack, titleA: "Implantação,", titleB: "passo a passo.", runTitleA: "Modo de operação,", runTitleB: "sob demanda." },
    cta: { ...resources.en.translation.cta, install: "Instalação em um clique", github: "Ver no GitHub", copy: "Copiar comando de instalação" },
  },
  it: {
    nav: { demo: "Demo", intro: "Introduzione", aiApps: "App AI", deploy: "Distribuzione", github: "GitHub", language: "Lingua", system: "Sistema" },
    features: { ...resources.en.translation.features, eyebrow: "Gestione dati AI", titleA: "Meno lavoro manuale,", titleB: "più controllo.", desc: "File, foto e media vengono organizzati da AI locale, con ricerca semantica, sottotitoli e tracce multilingue." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Funzioni chiave,", titleB: "app AI." },
    stack: { ...resources.en.translation.stack, titleA: "Distribuzione,", titleB: "in pochi passaggi.", runTitleA: "Modalità operative,", runTitleB: "a scelta." },
    cta: { ...resources.en.translation.cta, install: "Installazione rapida", github: "Vedi su GitHub", copy: "Copia comando di installazione" },
  },
  fr: {
    nav: { demo: "Démo", intro: "Présentation", aiApps: "Apps IA", deploy: "Déploiement", github: "GitHub", language: "Langue", system: "Système" },
    features: { ...resources.en.translation.features, eyebrow: "Gestion de données IA", titleA: "Moins de tâches manuelles,", titleB: "plus de maîtrise.", desc: "Fichiers, photos et médias sont organisés par l’IA locale, avec recherche sémantique, sous-titres et pistes multilingues." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Capacités clés,", titleB: "apps IA." },
    stack: { ...resources.en.translation.stack, titleA: "Déploiement,", titleB: "étape par étape.", runTitleA: "Mode d’exécution,", runTitleB: "au choix." },
    cta: { ...resources.en.translation.cta, install: "Installation en un clic", github: "Voir sur GitHub", copy: "Copier la commande" },
  },
  es: {
    nav: { demo: "Demo", intro: "Introducción", aiApps: "Apps de IA", deploy: "Despliegue", github: "GitHub", language: "Idioma", system: "Sistema" },
    features: { ...resources.en.translation.features, eyebrow: "Gestión de datos con IA", titleA: "Menos trabajo manual,", titleB: "más control.", desc: "Archivos, fotos y medios se organizan con IA local, búsqueda semántica, subtítulos y pistas multilingües." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Capacidades clave,", titleB: "apps de IA." },
    stack: { ...resources.en.translation.stack, titleA: "Despliegue,", titleB: "paso a paso.", runTitleA: "Modo de ejecución,", runTitleB: "según necesidad." },
    cta: { ...resources.en.translation.cta, install: "Instalación con un clic", github: "Ver en GitHub", copy: "Copiar comando" },
  },
  de: {
    nav: { demo: "Demo", intro: "Einführung", aiApps: "KI-Apps", deploy: "Bereitstellung", github: "GitHub", language: "Sprache", system: "System" },
    features: { ...resources.en.translation.features, eyebrow: "KI-Datenverwaltung", titleA: "Weniger Handarbeit,", titleB: "mehr Kontrolle.", desc: "Dateien, Fotos und Medien werden lokal per KI organisiert, inklusive semantischer Suche, Untertiteln und mehrsprachigen Tonspuren." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Kernfunktionen,", titleB: "KI-Apps." },
    stack: { ...resources.en.translation.stack, titleA: "Bereitstellung,", titleB: "Schritt für Schritt.", runTitleA: "Betriebsmodus,", runTitleB: "nach Bedarf." },
    cta: { ...resources.en.translation.cta, install: "Ein-Klick-Installation", github: "Auf GitHub ansehen", copy: "Installationsbefehl kopieren" },
  },
  ru: {
    nav: { demo: "Демо", intro: "Обзор", aiApps: "AI приложения", deploy: "Развертывание", github: "GitHub", language: "Язык", system: "Системный" },
    features: { ...resources.en.translation.features, eyebrow: "AI управление данными", titleA: "Меньше ручной работы,", titleB: "больше порядка.", desc: "Файлы, фото и медиатека организуются локальным AI: поиск, классификация, субтитры и многоязычные дорожки." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Ключевые возможности,", titleB: "AI приложения." },
    stack: { ...resources.en.translation.stack, titleA: "Развертывание,", titleB: "по шагам.", runTitleA: "Режим работы,", runTitleB: "по потребности." },
    cta: { ...resources.en.translation.cta, install: "Установка в один клик", github: "Смотреть на GitHub", copy: "Скопировать команду" },
  },
  uk: {
    nav: { demo: "Демо", intro: "Огляд", aiApps: "AI застосунки", deploy: "Розгортання", github: "GitHub", language: "Мова", system: "Системна" },
    features: { ...resources.en.translation.features, eyebrow: "AI керування даними", titleA: "Менше ручної роботи,", titleB: "більше контролю.", desc: "Файли, фото й медіа впорядковуються локальним AI: пошук, класифікація, субтитри та багатомовні доріжки." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Ключові можливості,", titleB: "AI застосунки." },
    stack: { ...resources.en.translation.stack, titleA: "Розгортання,", titleB: "крок за кроком.", runTitleA: "Режим роботи,", runTitleB: "за потребою." },
    cta: { ...resources.en.translation.cta, install: "Встановити в один клік", github: "Переглянути на GitHub", copy: "Скопіювати команду" },
  },
  tr: {
    nav: { demo: "Demo", intro: "Tanıtım", aiApps: "AI Uygulamaları", deploy: "Kurulum", github: "GitHub", language: "Dil", system: "Sistem" },
    features: { ...resources.en.translation.features, eyebrow: "AI veri yönetimi", titleA: "Daha az manuel iş,", titleB: "daha fazla düzen.", desc: "Dosyalar, fotoğraflar ve medya yerel AI ile düzenlenir; anlamsal arama, altyazı ve çok dilli ses desteği sağlar." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Temel yetenekler,", titleB: "AI uygulamaları." },
    stack: { ...resources.en.translation.stack, titleA: "Kurulum,", titleB: "adım adım.", runTitleA: "Çalışma şekli,", runTitleB: "ihtiyaca göre." },
    cta: { ...resources.en.translation.cta, install: "Tek tıkla kur", github: "GitHub’da görüntüle", copy: "Kurulum komutunu kopyala" },
  },
  id: {
    nav: { demo: "Demo", intro: "Perkenalan", aiApps: "Aplikasi AI", deploy: "Deploy", github: "GitHub", language: "Bahasa", system: "Sistem" },
    features: { ...resources.en.translation.features, eyebrow: "Manajemen data AI", titleA: "Lebih sedikit kerja manual,", titleB: "lebih tertata.", desc: "File, foto, dan media diatur oleh AI lokal, lengkap dengan pencarian semantik, subtitle, dan audio multibahasa." },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Kemampuan inti,", titleB: "aplikasi AI." },
    stack: { ...resources.en.translation.stack, titleA: "Deploy,", titleB: "langkah demi langkah.", runTitleA: "Mode operasi,", runTitleB: "sesuai kebutuhan." },
    cta: { ...resources.en.translation.cta, install: "Instal sekali klik", github: "Lihat di GitHub", copy: "Salin perintah instal" },
  },
};

export const allResources = {
  ...resources,
  ...Object.fromEntries(Object.entries(concise).map(([code, value]) => [code, { translation: makeLocale(value) }])),
};
