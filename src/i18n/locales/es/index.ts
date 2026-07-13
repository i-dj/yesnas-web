const es = {
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
    eyebrow: "Gestión de datos con IA",
    titleA: "Menos trabajo manual,",
    titleB: "más control.",
    desc: "Un Private AI NAS para personas, familias, equipos y empresas. Archivos, fotos y medios se organizan con IA local, búsqueda semántica, subtítulos y pistas multilingües.",
    tags: ["Private AI NAS", "IA local", "Almacenamiento self-hosted", "Equipos y empresas"],
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
        desc: "Despliega apps Docker con puertos, volúmenes, redes, logs y correcciones guiadas. Ejecuta LLM locales, herramientas multimedia y servicios de nube privada en tu propio servidor.",
        count: "Despliegue de apps",
        tags: ["Apps Docker", "LLM locales"],
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
    titleA: "Capacidades clave,",
    titleB: "plataforma unificada.",
    desc: "Búsqueda de archivos con IA, gestión de fotos con IA, automatización del servidor multimedia, almacenamiento NAS privado, uso compartido seguro y despliegue de apps Docker en un espacio self-hosted.",
    tags: [
      "Búsqueda de archivos IA",
      "Gestión de fotos IA",
      "Servidor multimedia IA",
      "Despliegue Docker",
    ],
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
    titleA: "Despliegue,",
    titleB: "paso a paso.",
    desc: "Choose a device, attach existing data, and enable local AI with a deployment path that stays clear and reversible.",
    steps: [
      ["01", "Choose device", "NAS, mini PC, or an older computer can run it"],
      ["02", "One-click install", "Environment checks, services, and initial setup"],
      ["03", "Attach data", "Mount disks, shares, media libraries, and albums"],
      ["04", "Enable AI", "Local search, classification, subtitles, and media enhancement"],
    ],
    runTitleA: "Modo de ejecución,",
    runTitleB: "según necesidad.",
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
  cta: {
    titleA: "Ready to install",
    titleB: "YesNAS",
    titleC: "?",
    desc: "Open-source, free, and community driven. Bring new life to old hardware in minutes.",
    install: "Instalación con un clic",
    github: "Ver en GitHub",
    copy: "Copiar comando",
  },
  footer: {
    privacy: "Política de privacidad",
    terms: "Términos de uso",
  },
} as const;

export default es;
