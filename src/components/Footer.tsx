'use client';

import React from 'react';
import Link from 'next/link';
import {
  MapPin,
  Sparkles,
  Phone,
  Mail,
  Award,
  Video,
  Flame,
  BookOpen,
  FileText,
  TrendingUp,
  Shield,
  Heart,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-white/10 bg-[#050a1b]/95 backdrop-blur-2xl relative overflow-hidden text-slate-300">
      {/* Background subtle ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Institute Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500/20 via-blue-600/30 to-amber-500/20 p-[1.5px] border border-cyan-400/40 shadow-md">
                <div className="w-full h-full rounded-[14px] bg-[#050914] flex items-center justify-center">
                  <span className="text-sm font-black text-cyan-400">TPS</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
                  TPS ONLINE <span className="text-cyan-400 font-extrabold lowercase">classes</span>
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  The Perfect Study Centre • खिरियावां, मदनपुर
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              बिहार बोर्ड 10वीं कक्षा के विद्यार्थियों को 450+ टॉपर स्तर की तैयारी कराने वाला समर्पित डिजिटल प्लेटफॉर्म। वीडियो क्लासेज, वस्तुनिष्ठ टेस्ट और हस्तलिखित नोट्स।
            </p>

            <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>डायरेक्टर: दीपक कुमार प्रियदर्शी (B.Sc. Physics)</span>
              </div>
              <div className="flex items-start gap-2 text-slate-300">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>काली मंदिर के समीप, खिरियावां, मदनपुर, औरंगाबाद, बिहार</span>
              </div>
            </div>
          </div>

          {/* Col 2: 5 Subjects (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>बिहार बोर्ड 5 मुख्य विषय</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/learn/math" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>गणित (Mathematics)</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/science" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>विज्ञान (Science - Physics, Chem, Bio)</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/sst" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>सामाजिक विज्ञान (Social Science)</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/hindi" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  <span>हिंदी (गोधूलि एवं वर्णिका)</span>
                </Link>
              </li>
              <li>
                <Link href="/learn/sanskrit" className="hover:text-cyan-300 transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                  <span>संस्कृत (पीयूषम एवं व्याकरण)</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>क्विक लिंक्स</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-medium">
              <li>
                <Link href="/videos" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  <span>वीडियो लेक्चर्स</span>
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>ऑब्जेक्टिव टेस्ट</span>
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>प्रोग्रेस ट्रैकर</span>
                </Link>
              </li>
              <li>
                <Link href="/notes" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-sky-400" />
                  <span>हस्तलिखित नोट्स</span>
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-violet-400" />
                  <span>Admin पोर्टल</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Socials (3 cols) */}
          <div className="lg:col-span-3 space-y-3.5">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">
              ऑफिशियल सोशल हैंडल्स
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              दीपक सर और संस्थान से सीधे जुड़ने के लिए हमारे आधिकारिक सोशल मीडिया पेज फॉलो करें:
            </p>

            <div className="flex flex-col gap-2 pt-1">
              {/* YouTube */}
              <a
                href="https://www.youtube.com/@Theperfectstudycentre"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-red-500/40 text-xs font-bold text-slate-200 hover:text-white transition-all group"
              >
                <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <polygon points="9.5,7.5 16,12 9.5,16.5" fill="#FFFFFF" />
                  </svg>
                </div>
                <span>YouTube: @Theperfectstudycentre</span>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/priyadarshi6678?igsh=MTl4dzE1amRxOWowNA%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-pink-500/40 text-xs font-bold text-slate-200 hover:text-white transition-all group"
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 flex items-center justify-center shrink-0">
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="#fff" strokeWidth="2" />
                    <circle cx="12" cy="12" r="4" fill="none" stroke="#fff" strokeWidth="2" />
                    <circle cx="17.5" cy="6.5" r="1" fill="#fff" />
                  </svg>
                </div>
                <span>Instagram: @priyadarshi6678</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/share/17TFJeHmWe/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-500/40 text-xs font-bold text-slate-200 hover:text-white transition-all group"
              >
                <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shrink-0 text-white font-black text-xs">
                  f
                </div>
                <span>Facebook Page</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div>
            © 2026 <strong>TPS ONLINE classes</strong> (The Perfect Study Centre). सर्वाधिकार सुरक्षित।
          </div>

          <div className="flex items-center gap-1 text-slate-300">
            <span>बिहार बोर्ड 10वीं मैट्रिक 2026-2028 स्पेशल</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
