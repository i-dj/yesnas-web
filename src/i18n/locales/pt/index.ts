const pt = {
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
    eyebrow: "Gestão de dados com IA",
    titleA: "Menos trabalho manual,",
    titleB: "mais organização.",
    desc: "Um Private AI NAS para pessoas, famílias, equipes e empresas. Arquivos, fotos e mídia são organizados por IA local, com busca semântica, legendas e trilhas em vários idiomas.",
    tags: ["Private AI NAS", "IA local", "Armazenamento self-hosted", "Equipes e empresas"],
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
        desc: "Implante apps Docker com portas, volumes, redes, logs e correções guiadas. Rode LLMs locais, ferramentas de mídia e serviços de nuvem privada no seu próprio servidor.",
        count: "Implantação de apps",
        tags: ["Apps Docker", "LLMs locais"],
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
    titleA: "Capacidades centrais,",
    titleB: "plataforma unificada.",
    desc: "Busca de arquivos com IA, gestão de fotos com IA, automação de servidor de mídia, armazenamento NAS privado, compartilhamento seguro e implantação de apps Docker em um workspace self-hosted.",
    tags: [
      "Busca de arquivos IA",
      "Gestão de fotos IA",
      "Servidor de mídia IA",
      "Implantação Docker",
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
    titleA: "Implantação,",
    titleB: "passo a passo.",
    desc: "Choose a device, attach existing data, and enable local AI with a deployment path that stays clear and reversible.",
    steps: [
      ["01", "Choose device", "NAS, mini PC, or an older computer can run it"],
      ["02", "One-click install", "Environment checks, services, and initial setup"],
      ["03", "Attach data", "Mount disks, shares, media libraries, and albums"],
      ["04", "Enable AI", "Local search, classification, subtitles, and media enhancement"],
    ],
    runTitleA: "Modo de operação,",
    runTitleB: "sob demanda.",
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
  cta: {
    titleA: "Ready to install",
    titleB: "YesNAS",
    titleC: "?",
    desc: "Open-source, free, and community driven. Bring new life to old hardware in minutes.",
    install: "Instalação em um clique",
    github: "Ver no GitHub",
    copy: "Copiar comando de instalação",
  },
  footer: {
    privacy: "Política de Privacidade",
    terms: "Termos de Uso",
  },
} as const;

export default pt;
