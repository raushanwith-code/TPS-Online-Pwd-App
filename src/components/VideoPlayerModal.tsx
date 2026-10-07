'use client';

import React, { useState, useEffect } from 'react';
import { X, WifiOff, Gauge, Sparkles } from 'lucide-react';

interface VideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    id: string;
    youtubeId: string;
    title: string;
    teacher: string;
    subject: string;
  } | null;
}

export default function VideoPlayerModal({
  isOpen,
  onClose,
  video,
}: VideoPlayerModalProps) {
  const [speed, setSpeed] = useState<number>(1);
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#030712]/95 border border-cyan-500/30 shadow-[0_25px_80px_rgba(0,0,0,0.95),0_0_40px_rgba(56,189,248,0.2)] overflow-hidden flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-3 bg-black/40">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
              {video.subject}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white truncate">
              {video.title}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors shrink-0"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Player Box */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center">
          {!isOnline ? (
            <div className="flex flex-col items-center gap-3 p-6 text-center max-w-md">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <WifiOff className="w-7 h-7" />
              </div>
              <h4 className="text-base font-bold text-white">इंटरनेट कनेक्शन नहीं है</h4>
              <p className="text-xs text-slate-400">
                वीडियो केवल ऑनलाइन नेटवर्क होने पर ही देखा जा सकता है। कृपया अपना इंटरनेट कनेक्शन जांचें।
              </p>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
        </div>

        {/* Player Controls & Info Bar */}
        <div className="p-4 sm:p-5 bg-black/60 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">शिक्षक:</span>
            <span className="text-xs font-bold text-cyan-300 px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              {video.teacher}
            </span>
          </div>

          {/* Speed Controls: 1x, 1.5x, 2x */}
          <div className="flex items-center gap-1.5 bg-white/[0.04] p-1 rounded-xl border border-white/10">
            <span className="text-[11px] text-slate-400 font-semibold px-2 flex items-center gap-1">
              <Gauge className="w-3.5 h-3.5 text-cyan-400" /> गति:
            </span>
            {[1, 1.25, 1.5, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setSpeed(spd)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  speed === spd
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
