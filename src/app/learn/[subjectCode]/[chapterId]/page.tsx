'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import {
  INITIAL_SUBJECTS,
  INITIAL_CHAPTERS,
  INITIAL_LECTURES,
  INITIAL_QUIZZES,
} from '@/lib/seed-data';
import YouTubePlayer from '@/components/YouTubePlayer';
import {
  ArrowLeft,
  Play,
  Award,
  BookOpen,
  FileText,
  Plus,
  Trash2,
  Clock,
  CheckCircle,
} from 'lucide-react';

export default function ChapterLecturePlayerPage() {
  const params = useParams();
  const subjectCode = params.subjectCode as string;
  const chapterId = params.chapterId as string;

  const subject = INITIAL_SUBJECTS.find((s) => s.code.toLowerCase() === subjectCode.toLowerCase());
  const chapter = INITIAL_CHAPTERS.find((c) => c.id === chapterId);

  if (!subject || !chapter) {
    return notFound();
  }

  // Get chapter lectures or fallback to default sample
  let lectures = INITIAL_LECTURES.filter((l) => l.chapterId === chapter.id);
  if (lectures.length === 0) {
    lectures = [
      {
        id: `lec-auto-${chapter.id}`,
        chapterId: chapter.id,
        title: `${chapter.title} - Complete Concept Class`,
        hindiTitle: `${chapter.hindiTitle || chapter.title} - सम्पूर्ण क्लास`,
        description: 'बिहार बोर्ड परीक्षा के लिए महत्वपूर्ण व्याख्या एवं प्रश्न उत्तर',
        youtubeUrl: 'https://www.youtube.com/watch?v=5qap5aO4i9A',
        youtubeId: '5qap5aO4i9A',
        durationSec: 2400,
        order: 1,
      },
    ];
  }

  const [activeLectureIndex, setActiveLectureIndex] = useState(0);
  const activeLecture = lectures[activeLectureIndex] || lectures[0];

  const chapterQuizzes = INITIAL_QUIZZES.filter((q) => q.chapterId === chapter.id);

  // Student personal notes on this lecture
  const [personalNotes, setPersonalNotes] = useState<string[]>([]);
  const [newNoteInput, setNewNoteInput] = useState('');

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteInput.trim()) return;
    setPersonalNotes((prev) => [...prev, newNoteInput.trim()]);
    setNewNoteInput('');
  };

  const handleDeleteNote = (idx: number) => {
    setPersonalNotes((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-6">
      {/* Top Breadcrumb Nav */}
      <div className="flex items-center justify-between gap-3 text-xs sm:text-sm">
        <Link
          href={`/learn/${subject.code}`}
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{subject.hindiName} के अध्याय</span>
        </Link>

        {chapterQuizzes.length > 0 && (
          <Link
            href={`/practice/${chapterQuizzes[0].id}`}
            className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 font-semibold text-xs"
          >
            <Award className="w-3.5 h-3.5" />
            <span>अध्याय टेस्ट दें (Take Quiz)</span>
          </Link>
        )}
      </div>

      {/* Main Classroom Layout (Video Player + Playlist Sidebar) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Video Player & Details */}
        <div className="lg:col-span-2 space-y-4">
          <YouTubePlayer
            key={activeLecture.id}
            youtubeId={activeLecture.youtubeId}
            lectureId={activeLecture.id}
            title={activeLecture.hindiTitle || activeLecture.title}
            hasNext={activeLectureIndex < lectures.length - 1}
            hasPrev={activeLectureIndex > 0}
            onNext={() => setActiveLectureIndex((i) => Math.min(lectures.length - 1, i + 1))}
            onPrev={() => setActiveLectureIndex((i) => Math.max(0, i - 1))}
          />

          {/* Lecture Metadata */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
            <span className="text-xs font-bold text-sky-400">
              LECTURE {activeLectureIndex + 1} OF {lectures.length}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {activeLecture.hindiTitle || activeLecture.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              {activeLecture.description || chapter.description}
            </p>
          </div>

          {/* In-Class Quick Notes */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400" />
              <span>अपने व्यक्तिगत नोट्स लिखें (My Lecture Notes)</span>
            </h3>

            <form onSubmit={handleAddNote} className="flex gap-2">
              <input
                type="text"
                value={newNoteInput}
                onChange={(e) => setNewNoteInput(e.target.value)}
                placeholder="लेक्चर के महत्वपूर्ण बिंदु यहाँ लिखें..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-400 outline-none focus:border-sky-500/50"
              />
              <button
                type="submit"
                className="py-2 px-3.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold transition-colors flex items-center gap-1 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>जोड़ें</span>
              </button>
            </form>

            {personalNotes.length > 0 && (
              <div className="space-y-1.5 pt-2">
                {personalNotes.map((note, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200"
                  >
                    <span>• {note}</span>
                    <button
                      onClick={() => handleDeleteNote(idx)}
                      className="text-slate-400 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Col: Chapter Playlist Drawer */}
        <div className="space-y-4">
          <div className="glass-panel p-4 rounded-2xl border border-white/10">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Play className="w-4 h-4 text-sky-400" />
              <span>अध्याय प्लेलिस्ट ({lectures.length} लेक्चर्स)</span>
            </h3>

            <div className="space-y-2">
              {lectures.map((lec, idx) => {
                const isActive = idx === activeLectureIndex;

                return (
                  <button
                    key={lec.id}
                    onClick={() => setActiveLectureIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                      isActive
                        ? 'bg-sky-500/15 border-sky-500/40 text-white shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 border-white/5 text-slate-300'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                        isActive
                          ? 'bg-sky-500 text-white'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {idx + 1}
                    </div>

                    <div className="flex-1 overflow-hidden">
                      <p className="text-xs font-semibold leading-tight line-clamp-2">
                        {lec.hindiTitle || lec.title}
                      </p>
                      <span className="text-[10px] text-slate-400 mt-1 block">
                        {Math.floor(lec.durationSec / 60)} मिनट
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
