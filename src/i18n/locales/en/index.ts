const en = {
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
    titleB: "for your private server.",
    desc: "YesNAS turns a NAS, mini PC, or old computer into a Private AI NAS for individuals, families, teams, and businesses. Files sort themselves, albums become organized collections, and media libraries gain posters, subtitles, and multilingual audio while your data stays local.",
    tags: ["Private AI NAS", "Local AI", "Self-hosted storage", "Team & business"],
    modules: [
      {
        title: "AI File Search",
        desc: "Use semantic file search to find images, PDFs, videos, and documents with natural language. No folder digging and no exact filenames; local AI understands the content on your NAS.",
        count: "File Search",
        tags: ["Semantic", "Local AI"],
      },
      {
        title: "AI Photo Management",
        desc: "Automatically organize family photos using local AI. Recognize people, pets, places, receipts and screenshots while keeping every image on your own NAS.",
        count: "Photos",
        tags: ["Faces", "Albums"],
      },
      {
        title: "AI Media Server",
        desc: "Run a private media server with AI metadata, posters, summaries, subtitle translation and multilingual audio so movies and shows feel polished without sending your library to the cloud.",
        count: "Media Server",
        tags: ["Metadata", "Subtitles"],
      },
      {
        title: "Private NAS Storage",
        desc: "Manage RAID, external drives, snapshots and backup strategies from one private NAS storage layer. Local AI can flag risks and recovery opportunities before they become problems.",
        count: "Storage",
        tags: ["RAID", "Snapshots"],
      },
      {
        title: "Docker App Deployment",
        desc: "Deploy Docker apps with guided ports, volumes, networks, logs and fixes. Run local LLMs, media tools and private cloud services on your own server or business device.",
        count: "Apps",
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
    titleB: " management platform.",
    desc: "Unify AI file search, photo management, media server automation, private NAS storage, secure file sharing, and Docker app deployment in one self-hosted operations workspace.",
    tags: ["AI File Search", "AI Photo Management", "AI Media Server", "Docker App Deployment"],
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
  footer: {
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },
} as const;

export default en;
