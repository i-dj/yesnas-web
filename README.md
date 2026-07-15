# YesNAS Web

YesNAS Web is the source code for the [official YesNAS website](https://www.yesnas.com). It introduces the product, its use cases, and deployment options through interactive demonstrations of AI-powered file management, photo organization, media enhancement, storage, sharing, and Docker management.

> This repository contains only the YesNAS website. It is not the YesNAS management interface or server. For the server-side code, visit [i-dj/yesnas-server](https://github.com/i-dj/yesnas-server).

## What is YesNAS?

YesNAS is a Private AI NAS platform for individuals, families, teams, and businesses. It can run on a NAS, mini PC, or older computer and brings storage, file sharing, media libraries, Docker applications, and local AI capabilities together in one self-hosted workspace.

Unlike a traditional NAS that primarily stores and shares files, YesNAS adds intelligent ways to organize, search, and use local data:

- **AI file management**: Understands images, PDFs, videos, and documents, organizes them automatically, and supports natural-language semantic search.
- **AI photo management**: Recognizes people, places, scenes, pets, receipts, and screenshots to organize albums and generate memories.
- **AI media enhancement**: Adds posters, descriptions, and ratings, generates or translates subtitles, and supports multilingual audio tracks.
- **Storage and sharing**: Manages local disks, RAID arrays, network storage, and sharing protocols such as SMB, NFS, and WebDAV.
- **Docker applications**: Provides centralized container deployment, status monitoring, port and volume management, and log access.
- **Local-first operation**: Keeps files, photos, videos, metadata, and AI indexes on hardware you control, reducing reliance on cloud services.

For more product information and interactive demos, visit [www.yesnas.com](https://www.yesnas.com).

## Tech Stack

- React 19
- TypeScript
- TanStack Router / TanStack Start
- Tailwind CSS 4
- Motion
- Vite

## Local Development

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Available commands:

```bash
# Start the development server
npm run dev

# Create a production build
npm run build

# Run lint checks
npm run lint

# Format the codebase
npm run format
```

## Related Projects

- Website: [yesnas.com](https://www.yesnas.com)
- Website source: [i-dj/yesnas-web](https://github.com/i-dj/yesnas-web)
- Server source: [i-dj/yesnas-server](https://github.com/i-dj/yesnas-server)
