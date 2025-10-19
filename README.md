# OPAL – Real‑time Video Sharing (Loom‑style) \[Web + Desktop\]

> A modern AI‑powered Loom clone built with **Next.js 14**, **Prisma**, **Clerk**, **Tailwind/shadcn**, and **React Query** — designed for real‑time recording, instant sharing, AI summaries/transcripts, and team collaboration. Desktop capture support via Electron (optional).

## ✨ Highlights

- 📹 **Real‑time recording & streaming** (web; desktop optional)
- 🚀 **Instant share links** for prospects/clients
- 🧠 **AI transcription & summaries** (bring your provider)
- 👥 **Workspaces** & member invites
- 📨 **Email notifications** on first view
- 🖼️ **Embed thumbnails** for outreach
- 🗂️ **Folders & library** for videos
- 💬 **Comments & activity feed**
- 🌗 **Dark mode** with theme switching
- 🔐 **Clerk auth** (Org & user)
- 🗄️ **Prisma ORM** with PostgreSQL (Neon recommended)

> This repo follows the Web Prodigies “OPAL” architecture from the Oct‑2024 video. Desktop app (Electron/Socket/Express) and cloud delivery (AWS S3/CloudFront) are optional add‑ons.

---

## 🧱 Tech Stack

- **App**: Next.js `14.2.x`, React 18, TypeScript, App Router
- **UI**: Tailwind CSS, shadcn/ui (Radix), `clsx`, `class-variance-authority`
- **State/Data**: TanStack React Query, Zod, React Hook Form
- **Auth**: Clerk (`@clerk/nextjs`)
- **ORM/DB**: Prisma + PostgreSQL (Neon, Supabase, RDS…)
- **Charts**: Recharts
- **Nice to have**: Electron + Express + Socket.io (desktop streaming), AWS S3 + CloudFront (storage & CDN)

> Packages from `package.json` are respected; Electron/Express/Socket.io/AWS libs can live in a companion repo or be added later.

---

## 📦 Structure

```
.
├─ app/                 # Next.js routes (app router)
├─ components/          # UI & feature components
├─ lib/                 # utils, db, auth
├─ prisma/              # prisma schema & migrations
├─ public/              # static assets
├─ docs/                # screenshots (add banner.png here)
└─ README.md
```

---

## 🚀 Quick Start

> Requires **Node 18+** and **pnpm**/**npm**/**yarn**. Postgres URL is required.

```bash
# 1) Install
pnpm install    # or npm i / yarn

# 2) Configure env
cp .env.example .env.local   # create and fill (see below)

# 3) Generate Prisma client & push schema
pnpm prisma generate
pnpm prisma db push

# 4) Dev
pnpm dev
```

Visit: `http://localhost:3000`

---

## 🔐 Environment Variables

Create **`.env.local`** in the project root:

```env
# Database
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"

# App URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Clerk (Auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_xxx"
CLERK_SECRET_KEY="sk_test_xxx"

# (Optional) Email, AI & Storage
# SENDGRID_API_KEY=""
# OPENAI_API_KEY=""
# AWS_ACCESS_KEY_ID=""
# AWS_SECRET_ACCESS_KEY=""
# AWS_REGION="us-east-1"
# AWS_S3_BUCKET="opal-videos"
# CLOUDFRONT_DISTRIBUTION_ID=""
```

> If you’re using **Neon**: copy the pooled connection string for `DATABASE_URL`.

---

## 🗃️ Prisma

Update your schema in `prisma/schema.prisma`, then:

```bash
pnpm prisma generate
pnpm prisma migrate dev --name init
```

Seed data (optional):

```bash
pnpm ts-node prisma/seed.ts
```

---

## 🔌 Integrations (Optional)

- **Storage/CDN**: AWS S3 + CloudFront for raw/processed video files
- **Desktop App**: Electron + Express + Socket.io for native device capture (720p/1080p, presets)
- **AI**: Provider of your choice for transcription & summaries (e.g., OpenAI)
- **Email**: SendGrid/Resend for viewer notifications
- **Payments**: Stripe (pro/free tier, usage limits)

These pieces can be added as separate packages/services. The web app runs independently.

---

## 🧭 Key Features & Flows

1. **Record & Stream** (web or desktop) → upload to storage
2. **Auto‑generate** title/description/summary (AI)
3. **Share** a public/limited link → **first‑view email** + **view counters**
4. **Collaborate** in **Workspaces** (invites, roles)
5. **Organize** in **Folders** with search & filters
6. **Engage** with **comments/activity feed**

---

## 🧪 Scripts

```jsonc
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "prisma:generate": "prisma generate",
  "prisma:push": "prisma db push"
}
```

## 🛡️ License

This repository is for educational and portfolio purposes. If you’re using the **Web Prodigies OPAL** starter, please follow their license and purchase terms for commercial use.

---

## 🙌 Credits

Inspired by **Web Prodigies – OPAL** (Oct 23, 2024).  
Huge thanks to the open‑source ecosystem and libraries used in this project.

---

## 🗺️ Roadmap

- [ ] Desktop capture package (Electron) with presets
- [ ] Full S3 + CloudFront pipeline
- [ ] AI provider adapters (transcribe/summarize)
- [ ] Comments & notifications
- [ ] Stripe billing & quotas
- [ ] Full end‑to‑end e2e tests
