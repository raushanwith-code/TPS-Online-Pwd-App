'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sparkles,
  TrendingUp,
  Flame,
  Video,
  FileText,
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-3 right-3 bottom-2.5 z-40 md:hidden h-[64px] rounded-2xl bg-[#091129]/90 backdrop-blur-2xl border border-white/15 shadow-[0_-15px_40px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)] grid grid-cols-5 items-center px-1">
      {/* 1. Home */}
      <Link
        href="/"
        className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all ${
          pathname === '/' ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Sparkles className={`w-5 h-5 transition-transform ${pathname === '/' ? 'scale-110 text-cyan-400' : ''}`} />
        <span>होम</span>
      </Link>

      {/* 2. Videos */}
      <Link
        href="/videos"
        className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all ${
          pathname.startsWith('/videos') ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <Video className="w-5 h-5" />
        <span>वीडियो</span>
      </Link>

      {/* 3. Center Elevated Action Button: Daily Practice Quiz */}
      <Link
        href="/practice"
        className="flex flex-col items-center justify-center text-[10px] font-bold text-white relative -mt-5"
      >
        <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-cyan-500 via-sky-500 to-amber-500 p-[2px] shadow-lg shadow-cyan-500/40 hover:scale-105 active:scale-95 transition-transform">
          <div className="w-full h-full rounded-[14px] bg-[#050914] flex items-center justify-center text-cyan-300">
            <Flame className="w-6 h-6 text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          </div>
        </div>
        <span className="mt-1 text-cyan-300 font-extrabold text-[10px] tracking-wide">टेस्ट</span>
      </Link>

      {/* 4. Notes */}
      <Link
        href="/notes"
        className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all ${
          pathname.startsWith('/notes') ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <FileText className={`w-5 h-5 transition-transform ${pathname.startsWith('/notes') ? 'scale-110 text-cyan-400' : ''}`} />
        <span>नोट्स</span>
      </Link>

      {/* 5. Progress */}
      <Link
        href="/dashboard"
        className={`flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all ${
          pathname.startsWith('/dashboard') ? 'text-cyan-400 font-bold' : 'text-slate-400 hover:text-white'
        }`}
      >
        <TrendingUp className={`w-5 h-5 transition-transform ${pathname.startsWith('/dashboard') ? 'scale-110 text-cyan-400' : ''}`} />
        <span>प्रोग्रेस</span>
      </Link>
    </nav>
  );
}
