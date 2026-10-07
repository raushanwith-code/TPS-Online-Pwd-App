'use client';

import React from 'react';
import Link from 'next/link';
import { INITIAL_SUBJECTS, INITIAL_CHAPTERS, INITIAL_LECTURES } from '@/lib/seed-data';
import SubjectCard from '@/components/SubjectCard';
import { BookOpen, Sparkles, Play, Award, ArrowRight } from 'lucide-react';

export default function LearnPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>BIHAR BOARD CLASS 10TH SYLLABUS</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            पढ़ाई केंद्र (Learning Hub)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            किसी भी विषय का चयन करें और अध्याय-वार (Chapter-wise) वीडियो लेक्चर्स देखें।
          </p>
        </div>

        <Link
          href="/practice"
          className="py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold border border-white/15 flex items-center gap-2 self-start sm:self-auto"
        >
          <Award className="w-4 h-4 text-emerald-400" />
          <span>सीधे टेस्ट पर जाएं</span>
        </Link>
      </div>

      {/* Continue Learning Quick Jump */}
      <div className="glass-panel p-5 rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-500/10 to-indigo-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shrink-0">
            <Play className="w-6 h-6 fill-current" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">
              जारी रखें (CONTINUE WATCHING)
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white">
              वास्तविक संख्याएं - यूक्लिड विभाजन प्रमेयिका (Real Numbers L1)
            </h3>
            <p className="text-xs text-slate-400">गणित • अध्याय 1 • 40:50 मिनट</p>
          </div>
        </div>

        <Link
          href="/learn/math/math-ch1"
          className="py-2 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold shadow-md shadow-sky-500/20 transition-transform active:scale-95 flex items-center gap-1.5"
        >
          <span>प्ले करें (Resume)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Subjects Grid */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-400" />
          <span>सभी 5 विषय (Choose a Subject)</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {INITIAL_SUBJECTS.map((subject) => {
            const chapCount = INITIAL_CHAPTERS.filter((c) => c.subjectId === subject.id).length;
            return (
              <SubjectCard
                key={subject.id}
                subject={subject}
                chaptersCount={chapCount || 6}
                quizzesCount={5}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
