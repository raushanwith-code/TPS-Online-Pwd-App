'use client';

import React, { useState } from 'react';
import {
  X,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Bookmark,
  FileText,
  ExternalLink,
} from 'lucide-react';
import { Note } from '@/lib/types';

interface PdfViewerModalProps {
  note: Note | null;
  onClose: () => void;
}

export default function PdfViewerModal({ note, onClose }: PdfViewerModalProps) {
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  if (!note) return null;

  const handleDownload = () => {
    fetch('/api/notes', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: note.id }),
    }).catch(() => {});

    // Create download link
    const link = document.createElement('a');
    link.href = note.fileUrl;
    link.download = `${note.title}.${note.fileType.toLowerCase()}`;
    link.target = '_blank';
    link.click();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md">
      <div
        className={`glass-panel rounded-3xl w-full flex flex-col border border-sky-500/30 overflow-hidden shadow-2xl transition-all ${
          isFullscreen ? 'h-full max-h-screen' : 'h-[90vh] max-w-5xl'
        }`}
      >
        {/* Top Control Bar */}
        <div className="p-3.5 sm:p-4 glass-nav flex items-center justify-between gap-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h3 className="text-sm sm:text-base font-bold text-white truncate">
                {note.title}
              </h3>
              <p className="text-xs text-slate-400">
                {note.fileType} • {(note.fileSizeKb / 1024).toFixed(1)} MB • {note.downloads} डाउनलोड्स
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Zoom Controls */}
            <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setZoom((z) => Math.max(50, z - 15))}
                className="p-1 text-slate-300 hover:text-white rounded-lg"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="text-xs text-slate-300 font-mono px-1">{zoom}%</span>
              <button
                onClick={() => setZoom((z) => Math.min(200, z + 15))}
                className="p-1 text-slate-300 hover:text-white rounded-lg"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Bookmark button */}
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-2 rounded-xl transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300'
              }`}
              title="Bookmark Note"
            >
              <Bookmark className="w-4 h-4" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 transition-colors hidden sm:block"
              title="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-sky-500/20 transition-transform active:scale-95"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">डाउनलोड</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* In-app Document Viewer Area */}
        <div className="flex-1 bg-space-950 p-2 sm:p-4 overflow-auto flex items-center justify-center relative">
          <div
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full h-full max-w-4xl rounded-xl overflow-hidden shadow-2xl transition-transform duration-200 bg-space-900 border border-white/10 flex flex-col items-center justify-center text-center p-6"
          >
            <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-4">
              <FileText className="w-8 h-8" />
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
              {note.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6">
              यह नोट्स फाइल संस्थान द्वारा सुरक्षित रूप से अपलोड की गई है। आप इसे सीधे यहां देख सकते हैं या ऑफलाइन पढ़ने के लिए डाउनलोड कर सकते हैं।
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownload}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-lg shadow-sky-500/20"
              >
                <Download className="w-4 h-4" />
                <span>PDF नोट्स डाउनलोड करें (Download PDF)</span>
              </button>

              <a
                href={note.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>ब्राउज़र में खोलें (Open in Tab)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
