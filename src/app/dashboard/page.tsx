'use client';

import React from 'react';
import Link from 'next/link';
import {
  Flame,
  Clock,
  Award,
  BookOpen,
  CheckCircle,
  Play,
  ArrowRight,
  TrendingUp,
  Sparkles,
  BarChart,
} from 'lucide-react';
import { INITIAL_SUBJECTS } from '@/lib/seed-data';

export default function DashboardPage() {
  const stats = {
    streakDays: 14,
    studyHours: 28.5,
    quizAccuracy: 88,
    lecturesCompleted: 12,
  };

  const subjectProgress = [
    { name: 'गणित (Mathematics)', progress: 70, color: 'bg-sky-400' },
    { name: 'विज्ञान (Science)', progress: 55, color: 'bg-purple-400' },
    { name: 'सामाजिक विज्ञान (SST)', progress: 45, color: 'bg-amber-400' },
    { name: 'अंग्रेजी (English)', progress: 65, color: 'bg-emerald-400' },
    { name: 'हिंदी (Hindi)', progress: 80, color: 'bg-pink-400' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>STUDENT PERFORMANCE DASHBOARD</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            नमस्ते, अमन कुमार! (Student Dashboard)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            बिहार बोर्ड 10वीं परीक्षा 2026-2027 • लक्ष्य: 450+ अंक (State Rank 1)
          </p>
        </div>

        {/* Streak Counter */}
        <div className="glass-panel py-3 px-5 rounded-2xl border border-rose-500/30 flex items-center gap-3 self-start sm:self-auto shadow-lg shadow-rose-500/10">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center animate-bounce-short">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              डेली स्ट्रीक (Streak)
            </span>
            <p className="text-lg font-black text-white">{stats.streakDays} दिन लगातार 🔥</p>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-sky-500/20">
          <div className="flex items-center gap-2 text-sky-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium text-slate-400">कुल अध्ययन समय</span>
          </div>
          <p className="text-2xl font-black text-white">{stats.studyHours} घंटे</p>
          <span className="text-[10px] text-emerald-400 font-semibold mt-1 block">
            ↑ +4.2h इस सप्ताह
          </span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-500/20">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs font-medium text-slate-400">क्विज सटीकता (Accuracy)</span>
          </div>
          <p className="text-2xl font-black text-emerald-400">{stats.quizAccuracy}%</p>
          <span className="text-[10px] text-slate-400 mt-1 block">15 टेस्ट में औसत</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20">
          <div className="flex items-center gap-2 text-purple-400 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-medium text-slate-400">पूर्ण लेक्चर्स</span>
          </div>
          <p className="text-2xl font-black text-white">{stats.lecturesCompleted} क्लासेस</p>
          <span className="text-[10px] text-slate-400 mt-1 block">अध्याय 1 से 3</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-amber-500/20">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Award className="w-4 h-4" />
            <span className="text-xs font-medium text-slate-400">अनलॉक बैज</span>
          </div>
          <p className="text-2xl font-black text-white">4 बैज</p>
          <span className="text-[10px] text-amber-400 font-semibold mt-1 block">
            टॉपर लेवल 3
          </span>
        </div>
      </div>

      {/* Continue Learning + Subject Progress Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Continue Learning Card */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Play className="w-4 h-4 text-sky-400 fill-current" />
              <span>लेक्चर जारी रखें (Resume Class)</span>
            </h3>
            <span className="text-xs text-sky-400 font-semibold">अंतिम बार देखा गया</span>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
            <span className="text-xs font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
              गणित • अध्याय 8
            </span>
            <h4 className="text-sm sm:text-base font-bold text-white">
              त्रिकोणमिति - मान सारणी एवं सर्वसमिकाएं (0° to 90°)
            </h4>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div className="bg-sky-400 h-2 rounded-full w-3/4" />
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>75% पूरा हुआ</span>
              <span>32:10 / 43:20</span>
            </div>
          </div>

          <Link
            href="/learn/math/math-ch8"
            className="w-full py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md shadow-sky-500/20"
          >
            <span>लेक्चर जारी रखें (Resume Lecture)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 5 Subjects Progress Bars */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <BarChart className="w-4 h-4 text-purple-400" />
            <span>विषय-वार प्रगति (Progress by Subject)</span>
          </h3>

          <div className="space-y-3.5 pt-1">
            {subjectProgress.map((sub, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{sub.name}</span>
                  <span className="font-bold text-sky-300">{sub.progress}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className={`${sub.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${sub.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
