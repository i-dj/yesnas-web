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

const zhCN = {
  nav: {
    demo: "演示",
    intro: "介绍",
    aiApps: "AI 应用",
    deploy: "部署",
    faq: "FAQ",
    github: "GitHub",
    language: "语言",
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
    runDesc:
      "YesNAS 部署在你的设备上，负责统一接入存储、共享、影音库和本地 AI 服务。安装流程尽量自动化，后续升级可回滚，数据目录保持开放，方便迁移和备份。",
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
  faq: {
    eyebrow: "Private AI NAS 问答",
    title: "Private AI NAS 常见问题",
    desc: "围绕本地 AI、自托管存储、Docker、RAID 和迁移的常见问题。",
    items: [
      {
        q: "什么是 Private AI NAS？",
        a: "Private AI NAS 是把 NAS 存储、本地 AI、语义搜索、相册识别和媒体整理放在同一台自有设备上的系统。数据保存在本地，而不是交给公共云。",
      },
      {
        q: "YesNAS 可以完全离线运行吗？",
        a: "核心文件管理、存储、相册整理、媒体库和本地 AI 能力可以在自己的设备上运行。需要下载模型、镜像或外部元数据时才会访问网络。",
      },
      {
        q: "YesNAS 支持本地大模型吗？",
        a: "支持。YesNAS 面向本地 LLM 和 RAG 场景设计，可以把文件、文档和家庭知识库接入本地 AI 助手。",
      },
      {
        q: "我可以安装 Docker 应用吗？",
        a: "可以。YesNAS 提供 Docker 应用部署和运维界面，适合运行媒体服务、开发工具、备份服务和本地 AI 应用。",
      },
      {
        q: "YesNAS 可以从 Synology 迁移吗？",
        a: "可以把现有共享目录、网络存储和媒体库接入 YesNAS。它适合想要更强本地 AI 能力的 Synology alternative 场景。",
      },
      {
        q: "YesNAS 可以替代 TrueNAS 或 Unraid 吗？",
        a: "YesNAS 的重点是 Private AI NAS 和自托管 AI 工作流。它可以覆盖家庭 NAS、私有云、媒体库、Docker 和本地 AI 场景，但具体替代程度取决于你的存储拓扑。",
      },
      {
        q: "可以使用已有 RAID 磁盘吗？",
        a: "YesNAS 的设计目标是接入已有磁盘、RAID 阵列和网络存储，尽量避免为了启用 AI 功能而重新整理整个文件库。",
      },
      {
        q: "YesNAS 支持 ARM 设备吗？",
        a: "YesNAS 目标支持 ARM 和 x86 设备，适合 NAS、迷你主机和旧电脑。实际 AI 性能取决于 CPU、内存、NPU 或 GPU。",
      },
      {
        q: "YesNAS 是开源的吗？",
        a: "YesNAS 面向开源和自托管场景设计，目标是让用户拥有自己的 Private AI、私有云和本地数据控制权。",
      },
      {
        q: "YesNAS 和普通 NAS 最大区别是什么？",
        a: "普通 NAS 主要保存和共享文件。YesNAS 在此基础上加入本地 AI、AI file search、AI photo management、AI media server 和本地 LLM 工作流。",
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
    privacy: "隐私政策",
    terms: "使用条款",
  },
};

const makeLocale = (partial: Partial<typeof zhCN>) => ({ ...zhCN, ...partial });

export const resources = {
  zh: { translation: zhCN },
  en: {
    translation: makeLocale({
      nav: {
        demo: "Demo",
        intro: "Intro",
        aiApps: "AI Apps",
        deploy: "Deploy",
        faq: "FAQ",
        github: "GitHub",
        language: "Language",
      },
      hero: {
        title: "Your Private AI NAS",
        desc: "Self-hosted AI storage for files, photos, media and knowledge. Keep your personal cloud private while local AI organizes, searches and enhances everything on your own device.",
      },
      marquee: {
        title: "Compatible with what you already use",
        items: [
          "Local RAID",
          "Network Storage",
          "SMB / NFS / WebDAV",
          "Photo Recognition",
          "Media Metadata",
          "Local AI Inference",
          "Docker Apps",
          "Permissions & Sharing",
          "Snapshots & Backup",
          "Audit Logs",
          "Data Migration",
          "Private Runtime",
        ],
      },
      features: {
        eyebrow: "Private AI NAS",
        titleA: "Self-hosted AI",
        titleB: "for your home server.",
        desc: "YesNAS turns a NAS, mini PC, or old computer into a Private AI NAS. Files sort themselves, albums become organized collections, and media libraries gain posters, subtitles, and multilingual audio while your data stays local.",
        tags: ["Private AI NAS", "Local AI", "Self-hosted storage", "Home server"],
        modules: [
          {
            title: "AI File Search",
            desc: "Use semantic file search to find images, PDFs, videos, and documents with natural language. No folder digging and no exact filenames; local AI understands the content on your NAS.",
            count: "Semantic File Search",
            tags: ["AI File Search", "Semantic Search"],
          },
          {
            title: "AI Photo Management",
            desc: "Automatically organize family photos using local AI. Recognize people, pets, places, receipts and screenshots while keeping every image on your own NAS.",
            count: "Photo Management",
            tags: ["Face clustering", "AI photo organizer"],
          },
          {
            title: "AI Media Server",
            desc: "Run a private media server with AI metadata, posters, summaries, subtitle translation and multilingual audio so movies and shows feel polished without sending your library to the cloud.",
            count: "Media Server",
            tags: ["AI Media Metadata", "AI subtitles"],
          },
          {
            title: "Private NAS Storage",
            desc: "Manage RAID, external drives, snapshots and backup strategies from one private NAS storage layer. Local AI can flag risks and recovery opportunities before they become problems.",
            count: "Self-hosted Storage",
            tags: ["RAID", "Snapshots"],
          },
          {
            title: "Docker App Deployment",
            desc: "Deploy Docker apps for your home server with guided ports, volumes, networks, logs and fixes. Run local LLMs, media tools and personal cloud services on your own device.",
            count: "Docker NAS",
            tags: ["Docker Apps", "Local LLM"],
          },
          {
            title: "Secure Remote NAS Access",
            desc: "Access your private cloud securely from home, office, or travel without turning your personal files into someone else's cloud product.",
            count: "Private Cloud",
            tags: ["Secure access", "Personal Cloud"],
          },
        ],
      },
      aiApps: {
        titleA: "Private AI NAS",
        titleB: "capabilities.",
        desc: "AI file search, photo management, media server automation, private NAS storage, file sharing and Docker app deployment come together in one self-hosted workspace.",
        tags: ["AI File Search", "Photo Management", "Media Server", "Docker NAS"],
        strips: [
          {
            eyebrow: "AI File Search",
            title: "Find the blue sports car photo, just like that.",
            desc: "Semantic search understands everyday language across files, photos, videos, PDFs and screenshots. No filenames, no folder digging, just the result you meant.",
          },
          {
            eyebrow: "AI Photo Management",
            title: "Photos classify themselves with clear relationships.",
            desc: "Local AI recognizes faces, places, scenes, pets and time for family albums, trips and events while every photo stays on your own NAS.",
          },
          {
            eyebrow: "AI Media Server",
            title: "Media metadata completes itself.",
            desc: "TMDB metadata, posters, summaries, ratings, local AI plot notes, translated subtitles and audio tracks for a self-hosted media server.",
          },
          {
            eyebrow: "Private NAS Storage",
            title: "Local RAID and network storage in one place.",
            desc: "Connect RAID, external drives and network storage with capacity, health, real-time IO, backup status and risk alerts.",
          },
          {
            eyebrow: "Private File Sharing",
            title: "Unified access across devices.",
            desc: "Manage private file sharing through SMB, NFS, WebDAV and browser access for Windows, macOS, Linux and mobile devices.",
          },
          {
            eyebrow: "Docker App Deployment",
            title: "Container management, quiet and capable.",
            desc: "Run Docker apps, map ports, inspect logs, manage networks and attach storage without opening a terminal.",
          },
        ],
      },
      stack: {
        titleA: "Deployment,",
        titleB: "step by step.",
        desc: "Choose a device, attach existing data, and enable local AI with a deployment path that stays clear and reversible.",
        steps: [
          ["01", "Choose device", "NAS, mini PC, or an older computer can run it"],
          ["02", "One-click install", "Environment checks, services, and initial setup"],
          ["03", "Attach data", "Mount disks, shares, media libraries, and albums"],
          ["04", "Enable AI", "Local search, classification, subtitles, and media enhancement"],
        ],
        runTitleA: "Run it",
        runTitleB: "your way.",
        runDesc:
          "YesNAS runs on your own device and connects storage, sharing, media, and local AI services. Installation is automated, upgrades can roll back, and data directories remain open for migration and backup.",
        runTags: ["One-click install", "Local deployment", "Existing data", "Rollback updates"],
        items: [
          {
            title: "Multi-platform",
            desc: "Supports ARM and x86 devices across mainstream NAS, mini PCs, and older computers.",
          },
          {
            title: "One-click Install",
            desc: "Automated scripts handle dependency checks, service initialization, folders, and baseline config.",
          },
          {
            title: "Existing Storage",
            desc: "Mount local disks, RAID arrays, and network storage without rebuilding your library.",
          },
          {
            title: "Local AI",
            desc: "Enable semantic file search, photo recognition, media metadata, and subtitle generation locally.",
          },
        ],
      },
      faq: {
        eyebrow: "Private AI NAS FAQ",
        title: "Private AI NAS FAQ",
        desc: "Common questions about local AI, self-hosted storage, Docker, RAID, migration, and private cloud workflows.",
        items: [
          {
            q: "What is a Private AI NAS?",
            a: "A Private AI NAS combines NAS storage, local AI, semantic search, photo recognition, and media organization on a device you control. Your files stay local instead of moving into a public cloud.",
          },
          {
            q: "Can YesNAS run completely offline?",
            a: "Core file management, storage, photo organization, media library features, and local AI workflows can run on your own device. Network access is only needed for downloads such as models, Docker images, or external metadata.",
          },
          {
            q: "Does YesNAS support local LLMs?",
            a: "Yes. YesNAS is designed for local LLM and RAG workflows so files, documents, and personal knowledge can be used by a private AI assistant.",
          },
          {
            q: "Can I install Docker apps?",
            a: "Yes. YesNAS includes Docker app deployment and operations for media servers, developer tools, backup services, and local AI applications.",
          },
          {
            q: "Can I migrate from Synology?",
            a: "YesNAS can attach existing shares, network storage, and media libraries. It is a good Synology alternative for users who want stronger local AI features.",
          },
          {
            q: "Can YesNAS replace TrueNAS or Unraid?",
            a: "YesNAS focuses on Private AI NAS and self-hosted AI workflows. It can cover home NAS, private cloud, media, Docker, and local AI use cases, while replacement fit depends on your storage topology.",
          },
          {
            q: "Can I use existing RAID disks?",
            a: "YesNAS is designed to connect existing disks, RAID arrays, and network storage so you do not need to rebuild your library just to add local AI features.",
          },
          {
            q: "Does YesNAS support ARM devices?",
            a: "YesNAS targets ARM and x86 devices, including NAS hardware, mini PCs, and older computers. AI performance depends on CPU, memory, NPU, or GPU resources.",
          },
          {
            q: "Is YesNAS open source?",
            a: "YesNAS is built for open-source and self-hosted use cases so you can own your Private AI, private cloud, and local data workflows.",
          },
          {
            q: "How is YesNAS different from a regular NAS?",
            a: "A regular NAS stores and shares files. YesNAS adds local AI, AI file search, AI photo management, AI media server features, and local LLM workflows on top of storage.",
          },
        ],
      },
      cta: {
        titleA: "Ready to install",
        titleB: "YesNAS",
        titleC: "?",
        desc: "Open-source, free, and community driven. Bring new life to old hardware in minutes.",
        install: "One-click Install",
        github: "View on GitHub",
        copy: "Copy install command",
      },
      footer: { privacy: "Privacy Policy", terms: "Terms of Use" },
    }),
  },
} as const;

const localizedFaq = {
  ja: {
    eyebrow: "Private AI NAS FAQ",
    title: "Private AI NAS よくある質問",
    desc: "ローカル AI、自ホストストレージ、Docker、RAID、移行、プライベートクラウドに関する質問です。",
    items: [
      {
        q: "Private AI NAS とは何ですか？",
        a: "NAS ストレージ、ローカル AI、セマンティック検索、写真認識、メディア整理を、自分が管理する端末上でまとめて動かす仕組みです。",
      },
      {
        q: "YesNAS は完全にオフラインで動作しますか？",
        a: "ファイル管理、ストレージ、写真整理、メディアライブラリ、ローカル AI の基本機能は自分の端末上で動作します。モデルや Docker イメージの取得時のみネットワークが必要です。",
      },
      {
        q: "ローカル LLM に対応していますか？",
        a: "はい。ローカル LLM と RAG ワークフローを想定し、文書や家庭のナレッジをプライベート AI アシスタントに接続できます。",
      },
      {
        q: "Docker アプリをインストールできますか？",
        a: "はい。メディアサーバー、開発ツール、バックアップサービス、ローカル AI アプリを Docker で運用できます。",
      },
      {
        q: "Synology から移行できますか？",
        a: "既存の共有フォルダ、ネットワークストレージ、メディアライブラリを接続できます。ローカル AI を重視する Synology alternative として使えます。",
      },
      {
        q: "TrueNAS や Unraid の代替になりますか？",
        a: "YesNAS は Private AI NAS と自ホスト AI ワークフローを重視します。家庭 NAS、プライベートクラウド、Docker、メディア、ローカル AI の用途に向いています。",
      },
      {
        q: "既存の RAID ディスクを使えますか？",
        a: "既存ディスク、RAID アレイ、ネットワークストレージの接続を想定しており、AI 機能のためにライブラリを作り直す必要を減らします。",
      },
      {
        q: "ARM デバイスに対応しますか？",
        a: "ARM と x86 デバイスを対象にしています。実際の AI 性能は CPU、メモリ、NPU、GPU に依存します。",
      },
      {
        q: "YesNAS はオープンソースですか？",
        a: "YesNAS はオープンソースと自ホスト用途を重視し、Private AI、プライベートクラウド、ローカルデータの管理権をユーザーに戻すことを目指します。",
      },
      {
        q: "通常の NAS との違いは？",
        a: "通常の NAS は保存と共有が中心です。YesNAS はそこにローカル AI、AI file search、AI photo management、AI media server、ローカル LLM を加えます。",
      },
    ],
  },
  ko: {
    eyebrow: "Private AI NAS FAQ",
    title: "Private AI NAS FAQ",
    desc: "로컬 AI, 셀프 호스팅 스토리지, Docker, RAID, 마이그레이션, 프라이빗 클라우드에 대한 질문입니다.",
    items: [
      {
        q: "Private AI NAS란 무엇인가요?",
        a: "NAS 스토리지, 로컬 AI, 시맨틱 검색, 사진 인식, 미디어 정리를 사용자가 제어하는 장치에서 함께 실행하는 시스템입니다.",
      },
      {
        q: "YesNAS는 완전히 오프라인으로 실행되나요?",
        a: "파일 관리, 스토리지, 사진 정리, 미디어 라이브러리, 로컬 AI의 핵심 기능은 내 장치에서 실행됩니다. 모델이나 Docker 이미지 다운로드에는 네트워크가 필요할 수 있습니다.",
      },
      {
        q: "로컬 LLM을 지원하나요?",
        a: "네. 로컬 LLM과 RAG 워크플로를 위해 설계되어 파일, 문서, 개인 지식베이스를 프라이빗 AI 어시스턴트에 연결할 수 있습니다.",
      },
      {
        q: "Docker 앱을 설치할 수 있나요?",
        a: "네. 미디어 서버, 개발 도구, 백업 서비스, 로컬 AI 앱을 위한 Docker 배포와 운영 화면을 제공합니다.",
      },
      {
        q: "Synology에서 마이그레이션할 수 있나요?",
        a: "기존 공유 폴더, 네트워크 스토리지, 미디어 라이브러리를 연결할 수 있습니다. 로컬 AI 기능을 원하는 사용자에게 Synology alternative가 될 수 있습니다.",
      },
      {
        q: "TrueNAS나 Unraid를 대체할 수 있나요?",
        a: "YesNAS는 Private AI NAS와 셀프 호스팅 AI 워크플로에 집중합니다. 홈 NAS, 프라이빗 클라우드, Docker, 미디어, 로컬 AI 용도에 적합합니다.",
      },
      {
        q: "기존 RAID 디스크를 사용할 수 있나요?",
        a: "기존 디스크, RAID 배열, 네트워크 스토리지 연결을 염두에 두고 설계되어 AI 기능 때문에 라이브러리를 다시 만들 필요를 줄입니다.",
      },
      {
        q: "ARM 장치를 지원하나요?",
        a: "ARM과 x86 장치를 대상으로 합니다. 실제 AI 성능은 CPU, 메모리, NPU 또는 GPU 리소스에 따라 달라집니다.",
      },
      {
        q: "YesNAS는 오픈소스인가요?",
        a: "YesNAS는 오픈소스와 셀프 호스팅 사용 사례를 지향하며 Private AI, 프라이빗 클라우드, 로컬 데이터 제어권을 사용자에게 돌려주는 것을 목표로 합니다.",
      },
      {
        q: "일반 NAS와 무엇이 다른가요?",
        a: "일반 NAS는 파일 저장과 공유가 중심입니다. YesNAS는 여기에 로컬 AI, AI file search, AI photo management, AI media server, 로컬 LLM 워크플로를 더합니다.",
      },
    ],
  },
  pt: {
    eyebrow: "Perguntas sobre Private AI NAS",
    title: "Perguntas sobre Private AI NAS",
    desc: "Dúvidas sobre IA local, armazenamento self-hosted, Docker, RAID, migração e nuvem privada.",
    items: [
      {
        q: "O que é um Private AI NAS?",
        a: "É um sistema que combina armazenamento NAS, IA local, busca semântica, reconhecimento de fotos e organização de mídia em um dispositivo controlado por você.",
      },
      {
        q: "O YesNAS funciona totalmente offline?",
        a: "Os recursos principais podem rodar no seu próprio dispositivo. A rede só é necessária para baixar modelos, imagens Docker ou metadados externos.",
      },
      {
        q: "O YesNAS suporta LLM local?",
        a: "Sim. Ele foi pensado para LLM local e fluxos RAG com arquivos, documentos e conhecimento pessoal.",
      },
      {
        q: "Posso instalar apps Docker?",
        a: "Sim. O YesNAS oferece implantação e operação de Docker para mídia, backup, ferramentas de desenvolvimento e IA local.",
      },
      {
        q: "Posso migrar do Synology?",
        a: "Você pode conectar compartilhamentos, armazenamento de rede e bibliotecas de mídia existentes. É uma alternativa ao Synology para quem quer IA local.",
      },
      {
        q: "O YesNAS substitui TrueNAS ou Unraid?",
        a: "Ele foca em Private AI NAS e fluxos de IA self-hosted. Pode cobrir NAS doméstico, nuvem privada, Docker, mídia e IA local, dependendo da topologia.",
      },
      {
        q: "Posso usar discos RAID existentes?",
        a: "Sim. O objetivo é conectar discos, arrays RAID e armazenamento de rede existentes sem reconstruir toda a biblioteca.",
      },
      {
        q: "O YesNAS suporta ARM?",
        a: "O alvo inclui dispositivos ARM e x86. O desempenho de IA depende de CPU, memória, NPU ou GPU.",
      },
      {
        q: "O YesNAS é open source?",
        a: "O projeto é voltado a open source e self-hosting, devolvendo ao usuário o controle da IA privada, nuvem privada e dados locais.",
      },
      {
        q: "Qual a diferença para um NAS comum?",
        a: "Um NAS comum armazena e compartilha arquivos. O YesNAS adiciona IA local, busca por IA, gestão de fotos, servidor de mídia e LLM local.",
      },
    ],
  },
  fr: {
    eyebrow: "FAQ Private AI NAS",
    title: "FAQ Private AI NAS",
    desc: "Questions sur l’IA locale, le stockage auto-hébergé, Docker, RAID, la migration et le cloud privé.",
    items: [
      {
        q: "Qu’est-ce qu’un Private AI NAS ?",
        a: "C’est un système qui réunit stockage NAS, IA locale, recherche sémantique, reconnaissance photo et organisation média sur un appareil que vous contrôlez.",
      },
      {
        q: "YesNAS peut-il fonctionner hors ligne ?",
        a: "Les fonctions principales peuvent tourner sur votre appareil. Le réseau sert surtout à télécharger modèles, images Docker ou métadonnées externes.",
      },
      {
        q: "YesNAS prend-il en charge les LLM locaux ?",
        a: "Oui. Il est conçu pour les LLM locaux et les flux RAG avec fichiers, documents et connaissances personnelles.",
      },
      {
        q: "Puis-je installer des apps Docker ?",
        a: "Oui. YesNAS gère le déploiement Docker pour serveurs média, sauvegardes, outils de développement et apps IA locales.",
      },
      {
        q: "Puis-je migrer depuis Synology ?",
        a: "Vous pouvez connecter partages, stockage réseau et bibliothèques média existants. C’est une alternative Synology pour les usages IA locale.",
      },
      {
        q: "YesNAS remplace-t-il TrueNAS ou Unraid ?",
        a: "YesNAS vise le Private AI NAS et les flux IA auto-hébergés. Il peut couvrir NAS domestique, cloud privé, Docker, média et IA locale selon votre stockage.",
      },
      {
        q: "Puis-je utiliser des disques RAID existants ?",
        a: "Oui. YesNAS vise à connecter disques, arrays RAID et stockage réseau existants sans reconstruire toute la bibliothèque.",
      },
      {
        q: "YesNAS prend-il en charge ARM ?",
        a: "La cible inclut ARM et x86. Les performances IA dépendent du CPU, de la mémoire, du NPU ou du GPU.",
      },
      {
        q: "YesNAS est-il open source ?",
        a: "Le projet vise l’open source et l’auto-hébergement pour garder le contrôle de l’IA privée, du cloud privé et des données locales.",
      },
      {
        q: "Différence avec un NAS classique ?",
        a: "Un NAS classique stocke et partage. YesNAS ajoute IA locale, AI file search, gestion photo IA, serveur média IA et LLM local.",
      },
    ],
  },
  es: {
    eyebrow: "FAQ de Private AI NAS",
    title: "FAQ de Private AI NAS",
    desc: "Preguntas sobre IA local, almacenamiento self-hosted, Docker, RAID, migración y nube privada.",
    items: [
      {
        q: "¿Qué es un Private AI NAS?",
        a: "Es un sistema que combina almacenamiento NAS, IA local, búsqueda semántica, reconocimiento de fotos y organización multimedia en un dispositivo que controlas.",
      },
      {
        q: "¿YesNAS puede funcionar sin conexión?",
        a: "Las funciones principales pueden ejecutarse en tu dispositivo. La red se usa para descargar modelos, imágenes Docker o metadatos externos.",
      },
      {
        q: "¿Soporta LLM locales?",
        a: "Sí. Está pensado para LLM locales y flujos RAG con archivos, documentos y conocimiento personal.",
      },
      {
        q: "¿Puedo instalar apps Docker?",
        a: "Sí. YesNAS ofrece despliegue y operación Docker para medios, copias, herramientas de desarrollo y apps de IA local.",
      },
      {
        q: "¿Puedo migrar desde Synology?",
        a: "Puedes conectar recursos compartidos, almacenamiento de red y bibliotecas multimedia existentes. Es una alternativa a Synology para IA local.",
      },
      {
        q: "¿Puede reemplazar TrueNAS o Unraid?",
        a: "YesNAS se centra en Private AI NAS y flujos de IA self-hosted. Puede cubrir NAS doméstico, nube privada, Docker, medios e IA local según tu topología.",
      },
      {
        q: "¿Puedo usar discos RAID existentes?",
        a: "Sí. Está diseñado para conectar discos, arrays RAID y almacenamiento de red existentes sin rehacer toda la biblioteca.",
      },
      {
        q: "¿Soporta dispositivos ARM?",
        a: "El objetivo incluye ARM y x86. El rendimiento de IA depende de CPU, memoria, NPU o GPU.",
      },
      {
        q: "¿YesNAS es open source?",
        a: "El proyecto está orientado a open source y self-hosting para mantener el control de la IA privada, nube privada y datos locales.",
      },
      {
        q: "¿En qué se diferencia de un NAS normal?",
        a: "Un NAS normal almacena y comparte archivos. YesNAS añade IA local, AI file search, gestión de fotos, servidor multimedia IA y LLM local.",
      },
    ],
  },
  de: {
    eyebrow: "Private AI NAS FAQ",
    title: "Private AI NAS FAQ",
    desc: "Fragen zu lokaler KI, Self-hosted Storage, Docker, RAID, Migration und Private Cloud.",
    items: [
      {
        q: "Was ist ein Private AI NAS?",
        a: "Es verbindet NAS-Speicher, lokale KI, semantische Suche, Fotoerkennung und Medienorganisation auf einem Geraet, das du kontrollierst.",
      },
      {
        q: "Kann YesNAS komplett offline laufen?",
        a: "Die Kernfunktionen koennen lokal laufen. Netzwerkzugang wird vor allem fuer Modelle, Docker-Images oder externe Metadaten benoetigt.",
      },
      {
        q: "Unterstuetzt YesNAS lokale LLMs?",
        a: "Ja. YesNAS ist fuer lokale LLMs und RAG-Workflows mit Dateien, Dokumenten und persoenlichem Wissen gedacht.",
      },
      {
        q: "Kann ich Docker-Apps installieren?",
        a: "Ja. YesNAS bietet Docker-Deployment und Betrieb fuer Medienserver, Backups, Entwicklertools und lokale KI-Apps.",
      },
      {
        q: "Kann ich von Synology migrieren?",
        a: "Bestehende Freigaben, Netzwerkspeicher und Medienbibliotheken koennen angebunden werden. YesNAS ist eine Synology alternative fuer lokale KI.",
      },
      {
        q: "Kann YesNAS TrueNAS oder Unraid ersetzen?",
        a: "YesNAS fokussiert Private AI NAS und Self-hosted AI. Es kann Home NAS, Private Cloud, Docker, Medien und lokale KI abdecken, je nach Speicheraufbau.",
      },
      {
        q: "Kann ich vorhandene RAID-Datentraeger nutzen?",
        a: "Ja. Bestehende Datentraeger, RAID-Arrays und Netzwerkspeicher sollen angebunden werden koennen, ohne die Bibliothek neu aufzubauen.",
      },
      {
        q: "Unterstuetzt YesNAS ARM?",
        a: "Ziel sind ARM- und x86-Geraete. Die KI-Leistung haengt von CPU, Speicher, NPU oder GPU ab.",
      },
      {
        q: "Ist YesNAS Open Source?",
        a: "YesNAS ist auf Open Source und Self-hosting ausgerichtet, damit Nutzer Private AI, Private Cloud und lokale Daten selbst kontrollieren.",
      },
      {
        q: "Was ist anders als bei einem normalen NAS?",
        a: "Ein normales NAS speichert und teilt Dateien. YesNAS ergaenzt lokale KI, AI file search, Fotoverwaltung, AI media server und lokale LLMs.",
      },
    ],
  },
} as const;

const concise: Record<string, Partial<typeof zhCN>> = {
  ja: {
    nav: {
      demo: "デモ",
      intro: "紹介",
      aiApps: "AI アプリ",
      deploy: "導入",
      faq: "FAQ",
      github: "GitHub",
      language: "言語",
    },
    hero: {
      title: "あなた専用のプライベート AI NAS",
      desc: "個人や家族のファイル、写真、メディア、ナレッジをローカルに保管し、安全に管理するデータハブです。整理、検索、強化はすべて端末上のローカル AI が行います。",
    },
    marquee: {
      title: "すでに使っている環境とそのまま連携",
      items: [
        "ローカル RAID",
        "ネットワークストレージ",
        "SMB / NFS / WebDAV",
        "写真認識",
        "メディアメタデータ",
        "ローカル AI 推論",
        "Docker アプリ",
        "権限と共有",
        "スナップショットとバックアップ",
        "監査ログ",
        "データ移行",
        "プライベート実行環境",
      ],
    },
    features: {
      ...resources.en.translation.features,
      eyebrow: "AI データ管理",
      titleA: "手間を減らす",
      titleB: "AI データ管家。",
      desc: "ファイル、写真、メディアをローカル AI が自動整理。検索、分類、字幕、音声トラックまで端末内で処理します。",
      tags: ["ファイル自動整理", "スマートアルバム", "多言語メディア", "ローカル AI"],
      modules: [
        {
          title: "ファイル自動整理",
          desc: "フォルダ設計もファイル名の記憶も不要です。AI が画像、PDF、動画、文書を理解し、自動分類し、自然な言葉で探せます。",
          count: "内容検索",
          tags: ["自動分類", "意味検索"],
        },
        {
          title: "写真ライブラリ",
          desc: "人物、ペット、風景、レシート、スクリーンショットを自動認識。写真を取り込むだけでアルバムと思い出が整理されます。",
          count: "スマートアルバム",
          tags: ["顔クラスタリング", "思い出生成"],
        },
        {
          title: "メディア強化",
          desc: "映画やドラマにポスター、概要、字幕、翻訳字幕、多言語音声を追加し、ローカルライブラリを見やすく整えます。",
          count: "メディア機能",
          tags: ["音声トラック", "字幕翻訳"],
        },
        {
          title: "データ保護",
          desc: "バックアップ方式を選び、重要ファイルのスナップショットを作成。ローカル AI がリスクと復元候補を知らせます。",
          count: "保護",
          tags: ["多重バックアップ", "スナップショット"],
        },
        {
          title: "アプリ自動導入",
          desc: "実行したいアプリを伝えるだけで、AI がイメージ取得、フォルダ設定、ポート、ログ確認、修正提案を支援します。",
          count: "運用",
          tags: ["ワンクリック", "ログ診断"],
        },
        {
          title: "リモート接続",
          desc: "グローバル IP やルーター設定に悩まず、外出先、オフィス、自宅から安全にアクセスできます。",
          count: "安全アクセス",
          tags: ["安全アクセス", "自動ルート"],
        },
      ],
    },
    aiApps: {
      ...resources.en.translation.aiApps,
      titleA: "中核機能、",
      titleB: "AI アプリ。",
      desc: "ファイル検索、写真管理、メディア整理、ストレージ監視、共有権限、アプリ運用をひとつの作業画面に統合します。",
      tags: ["統合入口", "自動ワークフロー", "権限と共有", "状態の可視化"],
      strips: [
        {
          eyebrow: "AI ファイル",
          title: "青いスポーツカーの写真も、すぐ見つかる。",
          desc: "意味検索が自然な言葉を理解します。ファイル名やフォルダを覚えていなくても、必要な結果に直接たどり着けます。",
        },
        {
          eyebrow: "AI 写真",
          title: "写真を自動分類し、関係性も見やすく整理。",
          desc: "顔、場所、シーン、時間をもとに索引を作り、家族写真、旅行、イベントをすばやく整理します。",
        },
        {
          eyebrow: "AI メディア",
          title: "メディアのメタデータを自動補完。",
          desc: "TMDB 情報、ポスター、概要、評価に加え、ローカル AI による要約、字幕翻訳、音声トラックも扱えます。",
        },
        {
          eyebrow: "ストレージ",
          title: "ローカル RAID とネットワークストレージを一元管理。",
          desc: "容量、健康状態、リアルタイム IO、リスク通知をまとめて確認できます。",
        },
        {
          eyebrow: "共有",
          title: "デバイスをまたいだアクセスを統合管理。",
          desc: "SMB、NFS、WebDAV、ブラウザアクセスの権限を一か所で管理できます。",
        },
        {
          eyebrow: "Docker",
          title: "静かで強力なコンテナ管理。",
          desc: "実行、停止、ログ、ポート確認をターミナルなしで扱えます。",
        },
      ],
    },
    stack: {
      ...resources.en.translation.stack,
      titleA: "導入手順、",
      titleB: "数ステップで完了。",
      desc: "デバイスを選び、既存データを接続し、ローカル AI を有効化するまでの流れを明確に管理できます。",
      steps: [
        ["01", "デバイスを選択", "NAS、ミニ PC、古いコンピュータを実行ノードにできます"],
        ["02", "ワンクリック導入", "環境確認、サービス配置、初期設定を自動化"],
        ["03", "データを接続", "既存ディスク、共有フォルダ、メディアライブラリ、写真を接続"],
        ["04", "AI を有効化", "検索、分類、字幕、メディア強化をローカルで実行"],
      ],
      runTitleA: "運用方式、",
      runTitleB: "必要に応じて選択。",
      runDesc:
        "YesNAS はあなたのデバイス上で動作し、ストレージ、共有、メディアライブラリ、ローカル AI サービスを統合します。インストールは自動化され、アップグレードはロールバック可能で、データディレクトリは移行やバックアップしやすい形のまま保たれます。",
      runTags: ["ワンクリック導入", "ローカル配置", "既存データ接続", "ロールバック可能"],
      items: [
        {
          title: "マルチプラットフォーム",
          desc: "ARM / x86 デバイスに対応し、主要 NAS、ミニ PC、古いコンピュータで利用できます。",
        },
        {
          title: "ワンクリックインストール",
          desc: "依存関係チェック、サービス初期化、ディレクトリ作成、基本設定を自動化します。",
        },
        {
          title: "既存ストレージ接続",
          desc: "ローカルディスク、RAID アレイ、ネットワークストレージをマウントでき、既存ライブラリを作り直す必要はありません。",
        },
        {
          title: "ローカル AI を有効化",
          desc: "ファイル意味検索、写真認識、メディアメタデータ整理、字幕生成をローカルで有効化できます。",
        },
      ],
    },
    faq: localizedFaq.ja,
    cta: {
      ...resources.en.translation.cta,
      install: "ワンクリック導入",
      github: "GitHub で見る",
      copy: "インストールコマンドをコピー",
    },
    footer: {
      privacy: "プライバシーポリシー",
      terms: "利用規約",
    },
  },
  ko: {
    nav: {
      demo: "데모",
      intro: "소개",
      aiApps: "AI 앱",
      deploy: "배포",
      faq: "FAQ",
      github: "GitHub",
      language: "언어",
    },
    hero: {
      title: "나만의 프라이빗 AI NAS",
      desc: "개인과 가족의 파일, 사진, 미디어, 지식 데이터를 로컬에 보관하고 안전하게 관리하는 데이터 허브입니다. 정리, 검색, 보강은 모두 내 장치의 로컬 AI가 처리합니다.",
    },
    marquee: {
      title: "이미 쓰고 있는 환경과 그대로 호환",
      items: [
        "로컬 RAID",
        "네트워크 스토리지",
        "SMB / NFS / WebDAV",
        "사진 인식",
        "미디어 메타데이터",
        "로컬 AI 추론",
        "Docker 앱",
        "권한 및 공유",
        "스냅샷과 백업",
        "감사 로그",
        "데이터 마이그레이션",
        "프라이빗 런타임",
      ],
    },
    features: {
      ...resources.en.translation.features,
      eyebrow: "AI 데이터 관리",
      titleA: "반복 작업을 줄이는",
      titleB: "AI 데이터 매니저.",
      desc: "파일, 사진, 미디어를 로컬 AI가 자동 정리합니다. 검색, 분류, 자막, 다중 오디오까지 기기 안에서 처리합니다.",
      tags: ["파일 자동 정리", "스마트 앨범", "다국어 미디어", "로컬 AI"],
      modules: [
        {
          title: "파일 자동화",
          desc: "폴더를 설계하거나 파일명을 기억할 필요가 없습니다. AI가 이미지, PDF, 영상, 문서를 이해해 자동 분류하고 자연어로 바로 찾습니다.",
          count: "콘텐츠 검색",
          tags: ["자동 분류", "의미 검색"],
        },
        {
          title: "사진 라이브러리",
          desc: "사람, 반려동물, 장면, 영수증, 스크린샷을 자동 인식합니다. 사진을 가져오면 YesNAS가 앨범과 추억을 만들어 줍니다.",
          count: "스마트 앨범",
          tags: ["얼굴 클러스터링", "추억 모음"],
        },
        {
          title: "미디어 강화",
          desc: "영화와 드라마에 포스터, 요약, 자막, 번역 자막, 다국어 오디오를 더해 로컬 라이브러리를 깔끔하게 만듭니다.",
          count: "미디어 도구",
          tags: ["오디오 트랙", "자막 번역"],
        },
        {
          title: "데이터 안전",
          desc: "백업 전략을 선택하고 중요한 파일의 스냅샷을 만들 수 있습니다. 로컬 AI가 위험과 복구 기회를 알려줍니다.",
          count: "보호",
          tags: ["다중 백업", "스냅샷"],
        },
        {
          title: "앱 배포",
          desc: "실행하고 싶은 앱만 말하면 AI가 이미지 가져오기, 폴더 매핑, 포트 열기, 로그 확인, 수정 제안을 도와줍니다.",
          count: "운영",
          tags: ["원클릭", "로그 진단"],
        },
        {
          title: "원격 접근",
          desc: "공인 IP와 라우터 설정을 고민하지 않아도 됩니다. 집, 사무실, 출장지에서 안전하게 접속하고 AI가 안정적인 경로를 선택합니다.",
          count: "원격 접근",
          tags: ["보안 접속", "자동 라우팅"],
        },
      ],
    },
    aiApps: {
      ...resources.en.translation.aiApps,
      titleA: "핵심 기능,",
      titleB: "AI 앱.",
      desc: "파일 검색, 사진 관리, 미디어 정리, 스토리지 모니터링, 공유 권한, 앱 운영을 하나의 작업 공간에 모읍니다.",
      tags: ["통합 진입점", "자동 워크플로", "권한과 공유", "상태 가시성"],
      strips: [
        {
          eyebrow: "AI 파일",
          title: "파란 스포츠카 사진도 바로 찾습니다.",
          desc: "의미 검색이 일상적인 문장을 이해합니다. 파일명이나 폴더를 몰라도 원하는 결과로 바로 이동합니다.",
        },
        {
          eyebrow: "AI 사진",
          title: "사진을 자동 분류하고 관계를 명확히 보여줍니다.",
          desc: "얼굴, 장소, 장면, 시간을 기준으로 가족 앨범, 여행 기록, 이벤트를 빠르게 정리합니다.",
        },
        {
          eyebrow: "AI 미디어",
          title: "미디어 메타데이터를 자동으로 완성합니다.",
          desc: "TMDB 정보, 포스터, 소개, 평점과 함께 로컬 AI 요약, 자막 번역, 다국어 오디오 트랙을 제공합니다.",
        },
        {
          eyebrow: "스토리지",
          title: "로컬 RAID와 네트워크 스토리지를 한곳에서 관리합니다.",
          desc: "용량, 상태, 실시간 IO, 위험 알림을 한 화면에서 확인할 수 있습니다.",
        },
        {
          eyebrow: "공유",
          title: "기기 간 접근을 통합 관리합니다.",
          desc: "SMB, NFS, WebDAV, 브라우저 접근 권한을 한곳에서 관리합니다.",
        },
        {
          eyebrow: "Docker",
          title: "조용하지만 강력한 컨테이너 관리.",
          desc: "터미널 없이 실행, 중지, 로그, 포트를 관리할 수 있습니다.",
        },
      ],
    },
    stack: {
      ...resources.en.translation.stack,
      titleA: "배포 과정,",
      titleB: "몇 단계면 충분합니다.",
      desc: "장치를 선택하고 기존 데이터를 연결한 뒤 로컬 AI를 켜는 배포 흐름이 명확하고 되돌릴 수 있게 구성됩니다.",
      steps: [
        ["01", "장치 선택", "NAS, 미니 PC, 오래된 컴퓨터에서도 실행할 수 있습니다"],
        ["02", "원클릭 설치", "환경 점검, 서비스 초기화, 기본 설정을 자동으로 처리합니다"],
        ["03", "데이터 연결", "디스크, 공유 폴더, 미디어 라이브러리, 앨범을 마운트합니다"],
        ["04", "AI 활성화", "로컬 검색, 분류, 자막, 미디어 강화를 켭니다"],
      ],
      runTitleA: "운영 방식,",
      runTitleB: "필요에 맞게 선택.",
      runDesc:
        "YesNAS는 내 장치에서 실행되며 스토리지, 공유, 미디어, 로컬 AI 서비스를 연결합니다. 설치는 자동화되고 업그레이드는 롤백할 수 있으며 데이터 디렉터리는 마이그레이션과 백업에 열려 있습니다.",
      runTags: ["원클릭 설치", "로컬 배포", "기존 데이터", "롤백 업데이트"],
      items: [
        {
          title: "멀티 플랫폼",
          desc: "ARM과 x86 장치를 지원하며 주요 NAS, 미니 PC, 오래된 컴퓨터에서도 사용할 수 있습니다.",
        },
        {
          title: "원클릭 설치",
          desc: "자동 스크립트가 의존성 점검, 서비스 초기화, 폴더 생성, 기본 구성을 처리합니다.",
        },
        {
          title: "기존 스토리지",
          desc: "로컬 디스크, RAID 배열, 네트워크 스토리지를 마운트해 라이브러리를 다시 만들 필요가 없습니다.",
        },
        {
          title: "로컬 AI",
          desc: "의미 기반 파일 검색, 사진 인식, 미디어 메타데이터, 자막 생성을 로컬에서 활성화합니다.",
        },
      ],
    },
    faq: localizedFaq.ko,
    cta: {
      ...resources.en.translation.cta,
      install: "원클릭 설치",
      github: "GitHub에서 보기",
      copy: "설치 명령 복사",
    },
    footer: {
      privacy: "개인정보 처리방침",
      terms: "이용 약관",
    },
  },
  pt: {
    nav: {
      demo: "Demo",
      intro: "Introdução",
      aiApps: "Apps de IA",
      deploy: "Implantar",
      faq: "FAQ",
      github: "GitHub",
      language: "Idioma",
    },
    hero: {
      title: "Seu NAS privado com IA",
      desc: "Um hub de dados pessoal e familiar que mantém arquivos, fotos, mídia e conhecimento localmente, com privacidade e controle. A IA local organiza, busca e melhora tudo no seu próprio dispositivo.",
    },
    marquee: {
      title: "Compatível com o que você já usa",
      items: [
        "RAID local",
        "Armazenamento de rede",
        "SMB / NFS / WebDAV",
        "Reconhecimento de fotos",
        "Metadados de mídia",
        "Inferência de IA local",
        "Apps Docker",
        "Permissões e compartilhamento",
        "Snapshots e backup",
        "Logs de auditoria",
        "Migração de dados",
        "Execução privada",
      ],
    },
    features: {
      ...resources.en.translation.features,
      eyebrow: "Gestão de dados com IA",
      titleA: "Menos trabalho manual,",
      titleB: "mais organização.",
      desc: "Arquivos, fotos e mídia são organizados por IA local, com busca semântica, legendas e trilhas em vários idiomas.",
    },
    aiApps: {
      ...resources.en.translation.aiApps,
      titleA: "Capacidades centrais,",
      titleB: "apps de IA.",
    },
    stack: {
      ...resources.en.translation.stack,
      titleA: "Implantação,",
      titleB: "passo a passo.",
      runTitleA: "Modo de operação,",
      runTitleB: "sob demanda.",
    },
    faq: localizedFaq.pt,
    cta: {
      ...resources.en.translation.cta,
      install: "Instalação em um clique",
      github: "Ver no GitHub",
      copy: "Copiar comando de instalação",
    },
    footer: {
      privacy: "Política de Privacidade",
      terms: "Termos de Uso",
    },
  },
  fr: {
    nav: {
      demo: "Démo",
      intro: "Présentation",
      aiApps: "Apps IA",
      deploy: "Déploiement",
      faq: "FAQ",
      github: "GitHub",
      language: "Langue",
    },
    hero: {
      title: "Votre NAS IA privé",
      desc: "Un hub de données personnel et familial qui garde fichiers, photos, médias et connaissances en local, privés et sous contrôle. L’IA locale organise, recherche et enrichit tout sur votre appareil.",
    },
    marquee: {
      title: "Compatible avec ce que vous utilisez déjà",
      items: [
        "RAID local",
        "Stockage réseau",
        "SMB / NFS / WebDAV",
        "Reconnaissance photo",
        "Métadonnées média",
        "Inférence IA locale",
        "Apps Docker",
        "Droits et partage",
        "Snapshots et sauvegarde",
        "Journaux d’audit",
        "Migration de données",
        "Exécution privée",
      ],
    },
    features: {
      ...resources.en.translation.features,
      eyebrow: "Gestion de données IA",
      titleA: "Moins de tâches manuelles,",
      titleB: "plus de maîtrise.",
      desc: "Fichiers, photos et médias sont organisés par l’IA locale, avec recherche sémantique, sous-titres et pistes multilingues.",
    },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Capacités clés,", titleB: "apps IA." },
    stack: {
      ...resources.en.translation.stack,
      titleA: "Déploiement,",
      titleB: "étape par étape.",
      runTitleA: "Mode d’exécution,",
      runTitleB: "au choix.",
    },
    faq: localizedFaq.fr,
    cta: {
      ...resources.en.translation.cta,
      install: "Installation en un clic",
      github: "Voir sur GitHub",
      copy: "Copier la commande",
    },
    footer: {
      privacy: "Politique de confidentialité",
      terms: "Conditions d’utilisation",
    },
  },
  es: {
    nav: {
      demo: "Demo",
      intro: "Introducción",
      aiApps: "Apps de IA",
      deploy: "Despliegue",
      faq: "FAQ",
      github: "GitHub",
      language: "Idioma",
    },
    hero: {
      title: "Tu NAS privado con IA",
      desc: "Un hub de datos personal y familiar que mantiene archivos, fotos, medios y conocimiento en local, privados y bajo tu control. La IA local organiza, busca y mejora todo en tu propio dispositivo.",
    },
    marquee: {
      title: "Compatible con lo que ya usas",
      items: [
        "RAID local",
        "Almacenamiento de red",
        "SMB / NFS / WebDAV",
        "Reconocimiento de fotos",
        "Metadatos multimedia",
        "Inferencia de IA local",
        "Apps Docker",
        "Permisos y compartición",
        "Snapshots y copias",
        "Registros de auditoría",
        "Migración de datos",
        "Ejecución privada",
      ],
    },
    features: {
      ...resources.en.translation.features,
      eyebrow: "Gestión de datos con IA",
      titleA: "Menos trabajo manual,",
      titleB: "más control.",
      desc: "Archivos, fotos y medios se organizan con IA local, búsqueda semántica, subtítulos y pistas multilingües.",
    },
    aiApps: {
      ...resources.en.translation.aiApps,
      titleA: "Capacidades clave,",
      titleB: "apps de IA.",
    },
    stack: {
      ...resources.en.translation.stack,
      titleA: "Despliegue,",
      titleB: "paso a paso.",
      runTitleA: "Modo de ejecución,",
      runTitleB: "según necesidad.",
    },
    faq: localizedFaq.es,
    cta: {
      ...resources.en.translation.cta,
      install: "Instalación con un clic",
      github: "Ver en GitHub",
      copy: "Copiar comando",
    },
    footer: {
      privacy: "Política de privacidad",
      terms: "Términos de uso",
    },
  },
  de: {
    nav: {
      demo: "Demo",
      intro: "Einführung",
      aiApps: "KI-Apps",
      deploy: "Bereitstellung",
      faq: "FAQ",
      github: "GitHub",
      language: "Sprache",
    },
    hero: {
      title: "Dein privates KI-NAS",
      desc: "Ein persönlicher Daten-Hub für Familie und Alltag, der Dateien, Fotos, Medien und Wissen lokal, privat und kontrollierbar hält. Lokale KI organisiert, durchsucht und verbessert alles auf deinem eigenen Gerät.",
    },
    marquee: {
      title: "Kompatibel mit dem, was du schon nutzt",
      items: [
        "Lokales RAID",
        "Netzwerkspeicher",
        "SMB / NFS / WebDAV",
        "Fotoerkennung",
        "Medienmetadaten",
        "Lokale KI-Inferenz",
        "Docker-Apps",
        "Rechte und Freigaben",
        "Snapshots und Backup",
        "Audit-Protokolle",
        "Datenmigration",
        "Private Laufzeit",
      ],
    },
    features: {
      ...resources.en.translation.features,
      eyebrow: "KI-Datenverwaltung",
      titleA: "Weniger Handarbeit,",
      titleB: "mehr Kontrolle.",
      desc: "Dateien, Fotos und Medien werden lokal per KI organisiert, inklusive semantischer Suche, Untertiteln und mehrsprachigen Tonspuren.",
    },
    aiApps: { ...resources.en.translation.aiApps, titleA: "Kernfunktionen,", titleB: "KI-Apps." },
    stack: {
      ...resources.en.translation.stack,
      titleA: "Bereitstellung,",
      titleB: "Schritt für Schritt.",
      runTitleA: "Betriebsmodus,",
      runTitleB: "nach Bedarf.",
    },
    faq: localizedFaq.de,
    cta: {
      ...resources.en.translation.cta,
      install: "Ein-Klick-Installation",
      github: "Auf GitHub ansehen",
      copy: "Installationsbefehl kopieren",
    },
    footer: {
      privacy: "Datenschutzerklärung",
      terms: "Nutzungsbedingungen",
    },
  },
};

const makeEnglishFallbackLocale = (partial: Partial<typeof zhCN>) => ({
  ...resources.en.translation,
  ...partial,
});

export const allResources = {
  ...resources,
  ...Object.fromEntries(
    Object.entries(concise).map(([code, value]) => [
      code,
      { translation: makeEnglishFallbackLocale(value) },
    ]),
  ),
};
