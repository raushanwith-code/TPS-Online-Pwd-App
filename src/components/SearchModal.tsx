'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, Play, HelpCircle, FileText, BookOpen, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    lectures: any[];
    chapters: any[];
    quizzes: any[];
    notes: any[];
  }>({
    lectures: [],
    chapters: [],
    quizzes: [],
    notes: [],
  });

  useEffect(() => {
    if (!query.trim()) {
      setResults({ lectures: [], chapters: [], quizzes: [], notes: [] });
      return;
    }

    const timer = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.results) setResults(data.results);
        })
        .catch(() => {});
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!isOpen) return null;

  const totalResults =
    results.lectures.length +
    results.chapters.length +
    results.quizzes.length +
    results.notes.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-2xl glass-panel rounded-3xl border border-sky-500/30 overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 flex items-center gap-3 border-b border-white/10 glass-nav">
          <Search className="w-5 h-5 text-sky-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="खोजें: वास्तविक संख्याएँ, त्रिकोणमिति, प्रकाश परावर्तन, Notes..."
            className="flex-1 bg-transparent text-white placeholder-slate-400 text-sm sm:text-base outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {query && totalResults === 0 && (
            <div className="text-center py-10 text-slate-400">
              <p>कोई परिणाम नहीं मिला (No results found for &quot;{query}&quot;)</p>
            </div>
          )}

          {!query && (
            <div className="py-6 text-center text-xs text-slate-400">
              <p>कक्षा 10वीं के किसी भी विषय, अध्याय, वीडियो लेक्चर या टेस्ट का नाम लिखें</p>
            </div>
          )}

          {/* Lectures */}
          {results.lectures.length > 0 && (
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider px-2">
                वीडियो लेक्चर्स ({results.lectures.length})
              </span>
              <div className="mt-2 space-y-1.5">
                {results.lectures.map((lec) => (
                  <Link
                    key={lec.id}
                    href={`/learn?lectureId=${lec.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h5 className="text-sm font-semibold text-white group-hover:text-sky-300 truncate">
                        {lec.hindiTitle || lec.title}
                      </h5>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Quizzes */}
          {results.quizzes.length > 0 && (
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider px-2">
                ऑब्जेक्टिव टेस्ट ({results.quizzes.length})
              </span>
              <div className="mt-2 space-y-1.5">
                {results.quizzes.map((qz) => (
                  <Link
                    key={qz.id}
                    href={`/practice/${qz.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h5 className="text-sm font-semibold text-white group-hover:text-emerald-300 truncate">
                        {qz.hindiTitle || qz.title}
                      </h5>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {results.notes.length > 0 && (
            <div>
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider px-2">
                PDF नोट्स ({results.notes.length})
              </span>
              <div className="mt-2 space-y-1.5">
                {results.notes.map((n) => (
                  <Link
                    key={n.id}
                    href={`/notes`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h5 className="text-sm font-semibold text-white group-hover:text-purple-300 truncate">
                        {n.title}
                      </h5>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
