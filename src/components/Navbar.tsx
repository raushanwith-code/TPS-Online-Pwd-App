'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Search,
  Sparkles,
  Flame,
  Video,
  BookOpen,
  FileText,
  Shield,
  User,
  GraduationCap,
  TrendingUp,
} from 'lucide-react';
import SearchModal from './SearchModal';

export default function Navbar() {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { label: 'होम', href: '/', icon: Sparkles },
    { label: 'वीडियो', href: '/videos', icon: Video },
    { label: 'ऑब्जेक्टिव टेस्ट', href: '/practice', icon: Flame },
    { label: 'पाठ्यक्रम', href: '/learn', icon: BookOpen },
    { label: 'नोट्स', href: '/notes', icon: FileText },
    { label: 'प्रोग्रेस', href: '/dashboard', icon: TrendingUp },
  ];

  return (
    <>
      <header className="sticky top-2 z-50 w-full px-3 sm:px-6">
        <div className="max-w-7xl mx-auto rounded-2xl bg-[#091129]/80 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] px-3.5 sm:px-5 py-2.5 flex items-center justify-between gap-3">
          
          {/* Custom Logo: TPS ONLINE classes */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-amber-500/20 p-[1.5px] border border-cyan-400/40 shadow-[0_0_20px_rgba(56,189,248,0.25)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] transition-all">
              <div className="w-full h-full rounded-[14px] bg-[#050914] flex items-center justify-center relative overflow-hidden">
                {/* Water droplet shine */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-400/10 to-white/20 pointer-events-none" />
                <svg viewBox="0 0 36 36" className="w-6 h-6 text-cyan-400 drop-shadow-[0_2px_8px_rgba(56,189,248,0.6)]" fill="none" stroke="currentColor">
                  {/* Hexagon matrix */}
                  <path d="M18 3L32 10.5V25.5L18 33L4 25.5V10.5L18 3Z" strokeWidth="2" stroke="url(#logoGrad)" />
                  {/* Orbit core */}
                  <circle cx="18" cy="18" r="4.5" fill="#38bdf8" />
                  <ellipse cx="18" cy="18" rx="10" ry="4" stroke="#f59e0b" strokeWidth="1.2" transform="rotate(-25 18 18)" opacity="0.85" />
                  <defs>
                    <linearGradient id="logoGrad" x1="4" y1="3" x2="32" y2="33" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="50%" stopColor="#818cf8" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="text-base sm:text-lg font-black tracking-wider text-white group-hover:text-cyan-300 transition-colors">
                  TPS ONLINE <span className="text-cyan-400 font-extrabold lowercase">classes</span>
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-tight font-medium hidden xs:block">
                The Perfect Study Centre • 10th Board
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links (No Emojis, Modern Vector Icons) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href === '/#videos' && false);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 opacity-80" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 transition-all hover:scale-105 active:scale-95"
              title="सर्च करें (Search Lectures & Quizzes)"
              aria-label="Search"
            >
              <Search className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Official Instagram Icon */}
            <a
              href="https://www.instagram.com/priyadarshi6678?igsh=MTl4dzE1amRxOWowNA%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all hover:scale-105 active:scale-95 group"
              title="Official Instagram"
            >
              <svg viewBox="0 0 24 24" width="18" height="18">
                <defs>
                  <linearGradient id="igRealGrad" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#feda75" />
                    <stop offset="25%" stopColor="#fa7e1e" />
                    <stop offset="50%" stopColor="#d62976" />
                    <stop offset="75%" stopColor="#962fbf" />
                    <stop offset="100%" stopColor="#4f5bd5" />
                  </linearGradient>
                </defs>
                <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#igRealGrad)" />
                <circle cx="12" cy="12" r="5" fill="none" stroke="#fff" strokeWidth="1.8" />
                <circle cx="17.2" cy="6.8" r="1.2" fill="#fff" />
              </svg>
            </a>

            {/* Official YouTube Icon */}
            <a
              href="https://www.youtube.com/@Theperfectstudycentre"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all hover:scale-105 active:scale-95 group"
              title="Official YouTube Channel"
            >
              <svg viewBox="0 0 24 24" width="20" height="20">
                <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000" />
                <polygon points="10,8.5 16,12 10,15.5" fill="#FFFFFF" />
              </svg>
            </a>

            {/* Admin Hub */}
            <Link
              href="/admin"
              className="w-9 h-9 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-center text-amber-400 hover:text-amber-300 transition-all hover:scale-105 active:scale-95"
              title="शिक्षक / Admin Panel"
            >
              <Shield className="w-4 h-4" />
            </Link>

            {/* Student Portal Capsule */}
            <Link
              href="/profile"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-amber-500/20 hover:from-cyan-500/30 hover:to-amber-500/30 border border-cyan-400/40 text-cyan-200 text-xs font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.2)] hover:scale-105 active:scale-95"
            >
              <User className="w-3.5 h-3.5 text-cyan-300" />
              <span className="hidden sm:inline">विद्यार्थी</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
