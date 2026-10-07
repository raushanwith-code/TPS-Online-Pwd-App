'use client';

import React from 'react';
import VideoSection from '@/components/VideoSection';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Video } from 'lucide-react';

export default function VideosOnlyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>होम पेज पर वापस जाएं (Back to Home)</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-400/35">
          <Video className="w-3.5 h-3.5 text-cyan-400" />
          <span>एक्सक्लूसिव वीडियो पोर्टल</span>
        </div>
      </div>

      {/* Only Video Section */}
      <VideoSection />
    </div>
  );
}
