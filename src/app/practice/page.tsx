'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  INITIAL_SUBJECTS,
  INITIAL_QUIZZES,
  INITIAL_QUESTIONS,
} from '@/lib/seed-data';
import {
  Flame,
  Clock,
  ArrowRight,
  Sparkles,
  BookOpen,
  Search,
} from 'lucide-react';

export default function PracticeHubPage() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredQuizzes = INITIAL_QUIZZES.filter((q) => {
    const matchesSubject =
      selectedSubjectId === 'all' || q.subjectId === selectedSubjectId;
    const matchesSearch =
      !searchQuery ||
      (q.hindiTitle && q.hindiTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      q.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-400/35 mb-2 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>BIHAR BOARD CLASS 10TH • CHAPTER-WISE OBJECTIVE ARENA</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            वस्तुनिष्ठ टेस्ट केंद्र (Chapter-Wise Tests)
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            गणित, विज्ञान, सामाजिक विज्ञान, हिंदी और संस्कृत के सभी अध्यायों के 100% बोर्ड मॉडल प्रश्न।
          </p>
        </div>

        {/* Quick Quiz */}
        {INITIAL_QUIZZES.length > 0 && (
          <Link
            href={`/practice/${INITIAL_QUIZZES[0].id}`}
            className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-cyan-500/30 flex items-center gap-2 self-start sm:self-auto hover:scale-105 active:scale-95 transition-all"
          >
            <Flame className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span>डेली चैलेंज टेस्ट</span>
          </Link>
        )}
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedSubjectId('all')}
          className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
            selectedSubjectId === 'all'
              ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-sm'
              : 'bg-black/30 text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
          }`}
        >
          सभी विषय ({INITIAL_QUIZZES.length})
        </button>

        {INITIAL_SUBJECTS.map((sub) => {
          const isActive = selectedSubjectId === sub.id;
          const count = INITIAL_QUIZZES.filter((q) => q.subjectId === sub.id).length;

          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`py-2 px-4 rounded-xl text-xs sm:text-sm font-bold shrink-0 transition-all ${
                isActive
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'bg-black/30 text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
              }`}
            >
              {sub.hindiName} ({count})
            </button>
          );
        })}
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="अध्याय या विषय का नाम खोजें (उदा. श्रम विभाजन, मङ्गलम्, संधि)..."
          className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/[0.06] border border-white/15 focus:border-cyan-400/60 focus:bg-white/[0.09] text-xs sm:text-sm text-white placeholder-slate-400 outline-none transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white px-1.5 py-0.5 rounded-md bg-white/10"
          >
            साफ़ करें
          </button>
        )}
      </div>

      {/* Chapter Quiz Cards Grid with Luminous Glass */}
      <div className="text-xs font-semibold text-slate-400">
        कुल उपलब्ध टेस्ट: <span className="text-cyan-300 font-bold">{filteredQuizzes.length}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuizzes.map((quiz, idx) => {
          const questionsCount =
            INITIAL_QUESTIONS.filter((q) => q.quizId === quiz.id).length || 24;

          return (
            <Link
              key={quiz.id}
              href={`/practice/${quiz.id}`}
              className="group rounded-[28px] luminous-card p-5 border border-white/18 hover:border-cyan-400/50 hover:-translate-y-1 transition-all flex items-center justify-between gap-3 shadow-md"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-400/35 text-cyan-300 font-black text-base flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all shadow-sm">
                  {idx + 1}
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors truncate">
                    {quiz.hindiTitle || quiz.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-slate-300 mt-1">
                    <span className="flex items-center gap-1 font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{questionsCount} प्रश्न</span>
                    </span>
                    <span className="text-slate-500">•</span>
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-400" />
                      <span>12 मिनट</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-black group-hover:bg-cyan-400 group-hover:border-cyan-300 transition-all shrink-0 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
