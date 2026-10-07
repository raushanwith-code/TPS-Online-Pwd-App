'use client';

import React from 'react';
import Image from 'next/image';
import { MapPin, CheckCircle, Sparkles, Award } from 'lucide-react';
import SocialLinks from './SocialLinks';

export default function DirectorCard() {
  return (
    <div className="relative group overflow-hidden rounded-[32px] luminous-card p-6 sm:p-9 border border-white/18 hover:border-cyan-400/50 transition-all duration-300">
      {/* Background aquatic ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-cyan-500/15 via-blue-600/10 to-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:opacity-100 transition-all" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 relative z-10 text-center sm:text-left">
        {/* Animated Glowing Ring Director Image */}
        <div className="relative shrink-0">
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            {/* Drifting Ring Pulse */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-sky-400 to-amber-400 opacity-70 blur-md animate-pulse" />
            
            <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0c1633] border-[3px] border-cyan-400/60 p-1 shadow-[0_0_35px_rgba(56,189,248,0.35)]">
              <Image
                src="/director.png"
                alt="Deepak Kumar Priyadarshi - Director TPS Online Classes"
                width={176}
                height={176}
                className="w-full h-full object-cover object-top scale-105 rounded-full transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
          </div>

          {/* Verified Check Badge */}
          <div className="absolute bottom-1 right-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full p-1.5 shadow-lg border-2 border-[#09122a] flex items-center justify-center">
            <CheckCircle className="w-4 h-4 fill-cyan-400 text-[#09122a]" />
          </div>
        </div>

        {/* Director Info */}
        <div className="flex-1 space-y-3.5">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>FOUNDER & DIRECTOR • TPS ONLINE</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center justify-center sm:justify-start gap-2">
              Deepak Kumar Priyadarshi
            </h3>
            <p className="text-base sm:text-lg font-black text-amber-300 mt-0.5">
              B.Sc. Physics
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-medium">
              Founder & Director, TPS ONLINE classes (The Perfect Study Centre)
            </p>
          </div>

          {/* Official Exact Address */}
          <div className="flex items-start justify-center sm:justify-start gap-2 text-xs sm:text-sm text-slate-200 bg-black/35 p-3.5 rounded-2xl border border-white/10 shadow-inner">
            <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>
              <strong>संस्थान पता:</strong> काली मंदिर के समीप, खिरियावां, मदनपुर, औरंगाबाद, बिहार
            </span>
          </div>

          {/* Socials Connection */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-300 font-medium">ऑफिशियल सोशल मीडिया:</span>
              <SocialLinks />
            </div>

            <div className="text-xs text-emerald-300 flex items-center gap-1.5 bg-emerald-500/15 px-3.5 py-1 rounded-full border border-emerald-400/35 font-bold shadow-sm">
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>1000+ Toppers Mentored</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
