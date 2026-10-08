# 🚀 TPS ONLINE CLASSES (The Perfect Study Centre)
> **Bihar Board Class 10th - 2099 Ultra Learning Platform**  
> **Official Domain:** [tpsonlineclasses.com](https://tpsonlineclasses.com)  
> **Founder & Director:** Deepak Kumar Priyadarshi, B.Sc. Mathematics (Hons.)  
> **Address:** Kali Mandir ke samip, Khiriyawan, Madanpur, Aurangabad, Bihar  

---

## 📱 Features Overview

- **2099 Futuristic Design**: Dark mode by default, glassmorphism, transparent blurred navbar, pulsing neon ring for director, mobile bottom navigation (Home, Learn, Practice, Notes, Profile).
- **Mobile-First (100% Tested at 390px Viewport)**: 90%+ students are on mobile devices; optimized lightweight bundles.
- **Installable PWA (Chrome Download)**: Web App Manifest (`manifest.json`), service worker (`sw.js`), and custom "INSTALL TPS" prompt with Chrome desktop/mobile install support.
- **Offline Network Detection**: When network is disconnected, displays offline alerts and informs students that network is required to stream YouTube lectures.
- **5 Core Subjects (Bihar Board Class 10)**:
  1. Mathematics (गणित)
  2. Science (विज्ञान)
  3. Social Science (सामाजिक विज्ञान)
  4. English (अंग्रेजी)
  5. Hindi (हिंदी)
- **Official YouTube IFrame Player**:
  - Official IFrame Player API (no video re-hosting or downloading).
  - Playback speed toggles: **1x**, **1.5x**, **2x**.
  - Playlist drawer, Previous/Next navigation, Auto-next on completion, Resume position tracking.
- **Admin Control Panel (`/admin`)**:
  - Paste any YouTube URL (Watch, youtu.be, Shorts) -> Auto-detects video ID, thumbnail (`i.ytimg.com`), title, and channel via YouTube oEmbed API.
  - 1-Click adds lecture to subject & chapter.
  - PDF/Doc Notes manager with file size, downloads, and format badges.
- **50/50 Objective Practice Engine**:
  - Countdown timer, question navigation dots, single choice, instant/submitted feedback, detailed explanations in Hindi & English, celebration confetti, attempt history.
- **In-App Document / PDF Viewer**:
  - In-app preview modal with zoom in/out, fullscreen toggle, and download counter.
- **Real Student Dashboard**:
  - Study streak 🔥 counter, total study hours, quiz accuracy %, subject progress bars, continue learning card.
- **Auth System**:
  - Persistent JWT cookies, bcrypt password hashing, student and admin roles.
- **SEO Ready**:
  - `robots.txt`, `sitemap.xml`, Open Graph & Twitter meta tags.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Styling**: Tailwind CSS + Custom 2099 Glassmorphism Engine
- **Icons**: Lucide React + Authentic YouTube, Instagram, Facebook SVGs
- **Animation**: CSS Keyframes + Framer Motion + Canvas Confetti
- **Database & ORM**: PostgreSQL (e.g. Neon) + Prisma ORM
- **Player**: Official YouTube IFrame Player API

---

## ⚡ Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env`:
```env

> **Note**: The app includes a resilient data store layer that works immediately out of the box with zero external database setup for local testing and demonstration. Whenever a real PostgreSQL `DATABASE_URL` is configured, Prisma connects seamlessly.

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel + Neon (Production)

1. Create a free PostgreSQL database on [Neon.tech](https://neon.tech) or Supabase.
2. Copy your connection string into `DATABASE_URL`.
3. Run migrations and seed:
   ```bash
   npx prisma db push
   npm run prisma:seed
   ```
4. Push code to GitHub and connect repository to [Vercel](https://vercel.com).
5. Set environment variables on Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_KEY`
   - `NEXT_PUBLIC_APP_URL`: `https://tpsonlineclasses.com`
6. Deploy!

---

## 🔑 Default Credentials

- **Student Login**:
  - Email: `student@tpsonlineclasses.com`
  - Password: `student123`
- **Director / Admin Login**:
  - Email: `director@tpsonlineclasses.com`
  - Password: `tps2099admin`

---

## 🔗 Official Social Links

- **YouTube**: [https://www.youtube.com/@Theperfectstudycentre](https://www.youtube.com/@Theperfectstudycentre)
- **Instagram**: [https://www.instagram.com/priyadarshi6678](https://www.instagram.com/priyadarshi6678)
- **Facebook**: [https://www.facebook.com/share/17TFJeHmWe/](https://www.facebook.com/share/17TFJeHmWe/)
