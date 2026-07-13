const de = {
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
    eyebrow: "KI-Datenverwaltung",
    titleA: "Weniger Handarbeit,",
    titleB: "mehr Kontrolle.",
    desc: "Ein Private AI NAS fuer Einzelpersonen, Familien, Teams und Unternehmen. Dateien, Fotos und Medien werden lokal per KI organisiert, inklusive semantischer Suche, Untertiteln und mehrsprachigen Tonspuren.",
    tags: ["Private AI NAS", "Lokale KI", "Self-hosted Storage", "Teams & Unternehmen"],
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
        desc: "Stelle Docker-Apps mit gefuehrten Ports, Volumes, Netzwerken, Logs und Korrekturhinweisen bereit. Lokale LLMs, Medientools und Private-Cloud-Dienste laufen auf deinem eigenen Server.",
        count: "App-Deployment",
        tags: ["Docker-Apps", "Lokale LLMs"],
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
    titleA: "Kernfunktionen,",
    titleB: "eine zentrale Plattform.",
    desc: "KI-Dateisuche, KI-Fotoverwaltung, Medienserver-Automatisierung, privater NAS-Speicher, sichere Dateifreigabe und Docker-App-Deployment laufen in einem selbst gehosteten Arbeitsbereich zusammen.",
    tags: ["KI-Dateisuche", "KI-Fotoverwaltung", "KI-Medienserver", "Docker-App-Deployment"],
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
    titleA: "Bereitstellung,",
    titleB: "Schritt für Schritt.",
    desc: "Choose a device, attach existing data, and enable local AI with a deployment path that stays clear and reversible.",
    steps: [
      ["01", "Choose device", "NAS, mini PC, or an older computer can run it"],
      ["02", "One-click install", "Environment checks, services, and initial setup"],
      ["03", "Attach data", "Mount disks, shares, media libraries, and albums"],
      ["04", "Enable AI", "Local search, classification, subtitles, and media enhancement"],
    ],
    runTitleA: "Betriebsmodus,",
    runTitleB: "nach Bedarf.",
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
  cta: {
    titleA: "Ready to install",
    titleB: "YesNAS",
    titleC: "?",
    desc: "Open-source, free, and community driven. Bring new life to old hardware in minutes.",
    install: "Ein-Klick-Installation",
    github: "Auf GitHub ansehen",
    copy: "Installationsbefehl kopieren",
  },
  footer: {
    privacy: "Datenschutzerklärung",
    terms: "Nutzungsbedingungen",
  },
} as const;

export default de;
