'use client';

import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  Bookmark,
  Sparkles,
  Search,
  Filter,
} from 'lucide-react';
import { INITIAL_SUBJECTS, INITIAL_NOTES } from '@/lib/seed-data';
import { Note } from '@/lib/types';
import PdfViewerModal from '@/components/PdfViewerModal';

export default function NotesPage() {
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeViewingNote, setActiveViewingNote] = useState<Note | null>(null);

  const filteredNotes = INITIAL_NOTES.filter((note) => {
    const matchesSub = selectedSubjectId === 'all' || note.subjectId === selectedSubjectId;
    const matchesSearch =
      !searchQuery.trim() || note.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSub && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECTOR & FACULTY VERIFIED NOTES</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            PDF नोट्स एवं अध्ययन सामग्री (Study Notes)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            कक्षा 10वीं के सभी 5 विषयों के महत्वपूर्ण फॉर्मूला चार्ट, अध्याय सारांश और प्रश्न बैंक डाउनलोड करें।
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Subject Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setSelectedSubjectId('all')}
            className={`py-2 px-3.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
              selectedSubjectId === 'all'
                ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            सभी विषय (All)
          </button>

          {INITIAL_SUBJECTS.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubjectId(sub.id)}
              className={`py-2 px-3.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedSubjectId === sub.id
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {sub.hindiName}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="नोट्स खोजें..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 outline-none focus:border-purple-500/50"
          />
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-3">
        {filteredNotes.map((note) => {
          const subject = INITIAL_SUBJECTS.find((s) => s.id === note.subjectId);

          return (
            <div
              key={note.id}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                  <FileText className="w-6 h-6" />
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/10 text-slate-300">
                      {subject?.hindiName || '10th Board'}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {note.fileType}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {(note.fileSizeKb / 1024).toFixed(1)} MB
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                    {note.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {note.downloads} विद्यार्थियों ने डाउनलोड किया
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  onClick={() => setActiveViewingNote(note)}
                  className="py-2 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-purple-400" />
                  <span>ऐप में देखें</span>
                </button>

                <button
                  onClick={() => setActiveViewingNote(note)}
                  className="py-2 px-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-purple-500/20 flex items-center gap-1.5 transition-transform active:scale-95"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>डाउनलोड</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* In-app Document Viewer Modal */}
      <PdfViewerModal
        note={activeViewingNote}
        onClose={() => setActiveViewingNote(null)}
      />
    </div>
  );
}
