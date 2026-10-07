'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Play,
  Award,
  BookOpen,
  Flame,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Video,
  Download,
  Wifi,
  Users,
} from 'lucide-react';
import DirectorCard from '@/components/DirectorCard';
import SubjectCard from '@/components/SubjectCard';
import VideoSection from '@/components/VideoSection';
import { INITIAL_SUBJECTS } from '@/lib/seed-data';

export default function HomePage() {
  // Interactive Live Question on Hero
  const [heroOptionSelected, setHeroOptionSelected] = useState<number | null>(null);

  const heroQuestion = {
    text: "समतल दर्पण में बनने वाले प्रतिबिंब की प्रकृति क्या होती है?",
    options: ["आभासी तथा सीधा", "वास्तविक तथा उल्टा", "केवल छोटा", "काल्पनिक तथा उल्टा"],
    correctIdx: 0,
    explanation: "समतल दर्पण द्वारा बना प्रतिबिंब सदैव आभासी (Virtual) और सीधा (Erect) होता है एवं वस्तु के बिल्कुल बराबर आकार का बनता है।",
  };

  return (
    <div className="space-y-12 sm:space-y-20 max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* 1. Luminous Cosmic Twilight Hero Section */}
      <section className="pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Hero Text & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-400/35 backdrop-blur-xl shadow-[0_0_20px_rgba(56,189,248,0.25)]">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>बिहार बोर्ड 10वीं स्पेशल • The Perfect Study Centre</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              बिहार बोर्ड 10वीं में{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400 bg-clip-text text-transparent">
                450+ अंक
              </span>{' '}
              दिलाने वाला सबसे भरोसेमंद संस्थान।
            </h1>

            <p className="text-sm sm:text-lg text-slate-200 max-w-2xl font-normal leading-relaxed">
              <strong className="text-white font-bold">TPS ONLINE classes</strong> (The Perfect Study Centre) — 
              दीपक सर (B.Sc. Physics) और दिलीप सर के मार्गदर्शन में वन-शॉट वीडियो क्लासेज, 500+ VVI वस्तुनिष्ठ टेस्ट और चैप्टर नोट्स।
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/#videos"
                className="py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm sm:text-base shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                <span>वीडियो क्लास देखें</span>
              </Link>

              <Link
                href="/practice"
                className="py-3 px-6 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] text-cyan-300 hover:text-white font-bold text-sm sm:text-base border border-cyan-400/40 backdrop-blur-2xl transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-md shadow-black/30"
              >
                <Flame className="w-5 h-5 text-amber-400" />
                <span>ऑब्जेक्टिव टेस्ट खेलें</span>
              </Link>
            </div>

            {/* Fact Pills */}
            <div className="flex flex-wrap gap-2.5 pt-2 justify-center lg:justify-start text-xs sm:text-sm">
              <span className="py-1.5 px-3.5 rounded-xl bg-[#0c1530]/80 border border-white/15 text-slate-200 shadow-sm">
                <b className="text-white font-bold">1000+</b> छात्र सक्रिय
              </span>
              <span className="py-1.5 px-3.5 rounded-xl bg-[#0c1530]/80 border border-white/15 text-slate-200 shadow-sm">
                <b className="text-cyan-400 font-bold">15+</b> पूर्ण अध्याय
              </span>
              <span className="py-1.5 px-3.5 rounded-xl bg-[#0c1530]/80 border border-white/15 text-slate-200 shadow-sm">
                <b className="text-amber-400 font-bold">500+</b> VVI प्रश्न
              </span>
              <span className="py-1.5 px-3.5 rounded-xl bg-emerald-500/15 border border-emerald-400/35 text-emerald-300 font-bold shadow-sm">
                100% निःशुल्क
              </span>
            </div>
          </div>

          {/* Right Column: Luminous Interactive Question Arena (NOT plain black) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-[32px] luminous-card p-6 sm:p-8 border border-white/18 hover:border-cyan-400/50 space-y-4">
              
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                  <span className="font-bold text-white">लाइव प्रश्न • तुरंत उत्तर जांचें</span>
                </div>
                <span className="text-cyan-300 font-black px-2.5 py-0.5 rounded-md bg-cyan-500/20 border border-cyan-400/30">
                  Science VVI
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {heroQuestion.text}
              </h3>

              {/* Luminous Option Buttons */}
              <div className="space-y-2.5">
                {heroQuestion.options.map((opt, idx) => {
                  const isSelected = heroOptionSelected === idx;
                  const isCorrect = idx === heroQuestion.correctIdx;
                  const showFeedback = heroOptionSelected !== null;

                  let btnStyle = 'bg-black/30 text-slate-200 border-white/15 hover:border-cyan-400/50 hover:bg-white/[0.08]';
                  if (showFeedback) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-500/25 border-emerald-400 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.4)] font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'bg-rose-500/25 border-rose-400 text-rose-200 shadow-[0_0_25px_rgba(244,63,94,0.4)] animate-shake font-bold';
                    } else {
                      btnStyle = 'opacity-35 bg-black/20 border-white/5 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => setHeroOptionSelected(idx)}
                      disabled={heroOptionSelected !== null}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-black/50 border border-white/15 text-cyan-300 flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </span>

                      {showFeedback && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      )}
                      {showFeedback && isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {heroOptionSelected !== null && (
                <div className="p-3.5 rounded-2xl bg-cyan-500/15 border border-cyan-400/35 text-xs text-cyan-200 space-y-1 animate-in fade-in shadow-inner">
                  <p className="font-bold flex items-center gap-1.5 text-cyan-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>उत्तर विश्लेषण (Explanation):</span>
                  </p>
                  <p className="text-slate-200 leading-relaxed font-normal">
                    {heroQuestion.explanation}
                  </p>
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs">
                <Link
                  href="/practice"
                  className="text-cyan-300 hover:text-white font-bold flex items-center gap-1 hover:underline"
                >
                  <span>सभी 500+ प्रश्न हल करें</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                {heroOptionSelected !== null && (
                  <button
                    onClick={() => setHeroOptionSelected(null)}
                    className="text-slate-300 hover:text-white text-xs underline font-semibold"
                  >
                    दोबारा प्रयास करें
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Official YouTube Videos Section (With HD Thumbnails, Dynamic Add & Modal Player) */}
      <VideoSection />

      {/* 3. Director Card (Deepak Kumar Priyadarshi - B.Sc. Physics) */}
      <section className="scroll-mt-24">
        <div className="mb-4 text-center sm:text-left">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            संस्थान नेतृत्व एवं मुख्य मार्गदर्शक
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            डायरेक्टर प्रोफाइल (Founder & Mentor)
          </h2>
        </div>
        <DirectorCard />
      </section>

      {/* 4. 5 Bihar Board Subjects */}
      <section className="scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
              सम्पूर्ण पाठ्यक्रम (Class 10th Syllabus)
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              बिहार बोर्ड 10वीं के 5 मुख्य विषय
            </h2>
          </div>
          <Link
            href="/learn"
            className="text-xs sm:text-sm font-bold text-cyan-300 hover:text-white flex items-center gap-1 self-start sm:self-auto"
          >
            <span>सभी अध्याय देखें</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_SUBJECTS.map((sub) => (
            <SubjectCard key={sub.id} subject={sub} />
          ))}
        </div>
      </section>

      {/* 5. Complete Study Pillars (Videos, Quizzes, Notes) */}
      <section className="rounded-[32px] luminous-card p-6 sm:p-10 border border-white/18">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
            COMPLETE STUDY ECOSYSTEM • 10TH MATRIC
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            एक ही स्थान पर सम्पूर्ण बोर्ड तैयारी
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            मैट्रिक परीक्षा में 450+ अंक हासिल करने के लिए आवश्यक तीनों साधन एक ही प्लेटफॉर्म पर उपलब्ध हैं।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-6 rounded-[24px] bg-black/30 border border-white/15 space-y-3 hover:border-cyan-400/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400/35 flex items-center justify-center text-cyan-400 shadow-md">
              <Play className="w-6 h-6 fill-cyan-400" />
            </div>
            <h3 className="text-base font-bold text-white">चैप्टर-वाइज़ वीडियो लेक्चर्स</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              दीपक सर और दिलीप सर द्वारा वन-शॉट कॉन्सेप्ट क्लासेस। समय बचाने और तेजी से रिवीजन के लिए 1x, 1.5x और 2x स्पीड की पूरी सुविधा।
            </p>
            <Link href="/videos" className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1 pt-1">
              <span>वीडियो हब खोलें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-[24px] bg-black/30 border border-white/15 space-y-3 hover:border-amber-400/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/35 flex items-center justify-center text-amber-400 shadow-md">
              <Flame className="w-6 h-6 fill-amber-400" />
            </div>
            <h3 className="text-base font-bold text-white">अध्याय-वार ऑब्जेक्टिव टेस्ट</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              गणित, विज्ञान, सामाजिक विज्ञान, हिंदी और संस्कृत के 500+ VVI बोर्ड मॉडल प्रश्न। तुरंत स्कोर, प्रोग्रेस ट्रैकिंग और उत्तरमाला।
            </p>
            <Link href="/practice" className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-1 pt-1">
              <span>टेस्ट शुरू करें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-6 rounded-[24px] bg-black/30 border border-white/15 space-y-3 hover:border-emerald-400/40 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/35 flex items-center justify-center text-emerald-400 shadow-md">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">हस्तलिखित चैप्टर नोट्स</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              बोर्ड परीक्षा के लिए शिक्षकों द्वारा तैयार की गई फॉर्मूला शीट, थ्योरी सारांश और इन-ऐप स्मार्ट पीडीएफ रीडर।
            </p>
            <Link href="/notes" className="text-xs font-bold text-emerald-300 hover:text-white flex items-center gap-1 pt-1">
              <span>नोट्स देखें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
