'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { INITIAL_SUBJECTS, INITIAL_CHAPTERS, INITIAL_LECTURES, INITIAL_QUIZZES } from '@/lib/seed-data';
import { ArrowLeft, Play, Award, BookOpen, ChevronRight, Sparkles } from 'lucide-react';

export default function SubjectChaptersPage() {
  const params = useParams();
  const subjectCode = params.subjectCode as string;

  const subject = INITIAL_SUBJECTS.find(
    (s) => s.code.toLowerCase() === subjectCode.toLowerCase()
  );

  if (!subject) {
    return notFound();
  }

  const chapters = INITIAL_CHAPTERS.filter((c) => c.subjectId === subject.id);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Back button */}
      <Link
        href="/learn"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>सभी विषयों पर वापस जाएं (Back to Subjects)</span>
      </Link>

      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/20 bg-gradient-to-br from-space-900 to-space-850 space-y-2 relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-sky-300 border border-white/10">
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>{subject.hindiName} • Bihar Board Class 10</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {subject.name} ({subject.hindiName})
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
          {subject.description}
        </p>
      </div>

      {/* Chapters List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-sky-400" />
            <span>अध्याय सूची (Chapters - {chapters.length})</span>
          </h2>
        </div>

        <div className="space-y-3">
          {chapters.map((chapter) => {
            const lectures = INITIAL_LECTURES.filter((l) => l.chapterId === chapter.id);
            const quizzes = INITIAL_QUIZZES.filter((q) => q.chapterId === chapter.id);

            return (
              <div
                key={chapter.id}
                className="group glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-sky-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-sky-400 font-black text-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {chapter.chapterNum}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {chapter.hindiTitle || chapter.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {chapter.title} • {chapter.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span>{lectures.length > 0 ? `${lectures.length} वीडियो लेक्चर्स` : 'लेक्चर्स उपलब्ध'}</span>
                      <span>•</span>
                      <span>{quizzes.length > 0 ? `${quizzes.length} क्विज टेस्ट` : 'ऑब्जेक्टिव सेट'}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <Link
                    href={`/learn/${subject.code}/${chapter.id}`}
                    className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-sky-500/20 flex items-center gap-1.5 transition-transform active:scale-95"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>क्लास देखें</span>
                  </Link>

                  {quizzes.length > 0 && (
                    <Link
                      href={`/practice/${quizzes[0].id}`}
                      className="py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-emerald-300 text-xs font-semibold border border-white/10 flex items-center gap-1.5 transition-colors"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>टेस्ट दें</span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
