'use client';

import React from 'react';
import Link from 'next/link';
import { Subject } from '@/lib/types';
import {
  Calculator,
  Atom,
  Globe,
  BookOpen,
  Languages,
  Play,
  Flame,
  ArrowRight,
} from 'lucide-react';

interface SubjectCardProps {
  subject: Subject;
  chaptersCount?: number;
  quizzesCount?: number;
}

export default function SubjectCard({
  subject,
  chaptersCount = 15,
  quizzesCount = 24,
}: SubjectCardProps) {
  // Theme per subject
  let cardClass = 'card-math';
  let iconBg = 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40';
  let badgeClass = 'bg-cyan-500/20 text-cyan-300 border-cyan-400/35';
  let accentColor = '#38bdf8';
  let icon = <Calculator className="w-6 h-6" />;

  if (subject.code === 'science') {
    cardClass = 'card-science';
    iconBg = 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';
    badgeClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-400/35';
    accentColor = '#10b981';
    icon = <Atom className="w-6 h-6" />;
  } else if (subject.code === 'sst') {
    cardClass = 'card-sst';
    iconBg = 'bg-amber-500/20 text-amber-300 border-amber-400/40';
    badgeClass = 'bg-amber-500/20 text-amber-300 border-amber-400/35';
    accentColor = '#f59e0b';
    icon = <Globe className="w-6 h-6" />;
  } else if (subject.code === 'hindi') {
    cardClass = 'card-hindi';
    iconBg = 'bg-rose-500/20 text-rose-300 border-rose-400/40';
    badgeClass = 'bg-rose-500/20 text-rose-300 border-rose-400/35';
    accentColor = '#fb7185';
    icon = <Languages className="w-6 h-6" />;
  } else if (subject.code === 'sanskrit') {
    cardClass = 'card-english';
    iconBg = 'bg-violet-500/20 text-violet-300 border-violet-400/40';
    badgeClass = 'bg-violet-500/20 text-violet-300 border-violet-400/35';
    accentColor = '#a78bfa';
    icon = <BookOpen className="w-6 h-6" />;
  }

  return (
    <div
      className={`group relative overflow-hidden rounded-[30px] p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between ${cardClass}`}
    >
      <div>
        {/* Top Header: 3D Frosted Icon & Hindi Name Pill */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <div
            className={`w-13 h-13 rounded-2xl flex items-center justify-center border shadow-lg group-hover:scale-110 transition-transform ${iconBg}`}
          >
            {icon}
          </div>

          <span
            className={`text-xs font-black px-3.5 py-1 rounded-full border tracking-wide uppercase shadow-sm ${badgeClass}`}
          >
            {subject.hindiName}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl sm:text-2xl font-black text-white group-hover:text-cyan-200 transition-colors">
          {subject.name}
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
          {subject.description}
        </p>
      </div>

      {/* Stats & Actions */}
      <div className="pt-5 mt-4 border-t border-white/10 space-y-3.5">
        <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
          <span className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span><b className="text-white font-bold">{chaptersCount}</b> अध्याय</span>
          </span>
          <span className="flex items-center gap-1.5 bg-black/30 px-2.5 py-1 rounded-lg border border-white/10">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span><b className="text-white font-bold">{quizzesCount}</b> टेस्ट</span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 pt-1">
          <Link
            href={`/learn/${subject.code}`}
            className="py-2.5 px-3 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] text-white text-xs font-bold border border-white/15 flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-95 shadow-sm"
          >
            <Play className="w-3.5 h-3.5 text-cyan-300 fill-cyan-300" />
            <span>क्लास देखें</span>
          </Link>
          <Link
            href="/practice"
            className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-500/25 flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-95"
          >
            <span>टेस्ट दें</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
