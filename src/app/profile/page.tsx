'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  User,
  Award,
  Flame,
  Shield,
  BookOpen,
  LogOut,
  Sparkles,
  CheckCircle,
  Smartphone,
  MapPin,
  Target,
  School,
  Download,
  Calendar,
  BarChart3,
  TrendingUp,
  Trophy,
  Check,
  Edit3,
  ArrowRight,
  Calculator,
  Atom,
  Globe,
  Languages,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();

  // Student State
  const [name, setName] = useState('अमन कुमार');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [district, setDistrict] = useState('औरंगाबाद, बिहार');
  const [school, setSchool] = useState('उच्च विद्यालय, मदनपुर (औरंगाबाद)');
  const [rollCode, setRollCode] = useState('31045');
  const [rollNo, setRollNo] = useState('2600142');
  const [targetScore, setTargetScore] = useState('475 / 500 (95.0%)');
  const [email] = useState('aman.topper2026@tpsonlineclasses.com');
  const [streak] = useState(14);
  const [savedMessage, setSavedMessage] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Subject Stats for Class 10 Bihar Board
  const subjectStats = [
    {
      name: 'गणित (Mathematics)',
      code: 'math',
      icon: Calculator,
      color: 'from-cyan-500 to-blue-500',
      border: 'border-cyan-400/30',
      text: 'text-cyan-300',
      progress: 96,
      chapters: '12 / 12 अध्याय पूर्ण',
      score: '96 / 100',
    },
    {
      name: 'विज्ञान (Science)',
      code: 'science',
      icon: Atom,
      color: 'from-purple-500 to-indigo-500',
      border: 'border-purple-400/30',
      text: 'text-purple-300',
      progress: 92,
      chapters: '9 / 9 अध्याय पूर्ण',
      score: '92 / 100',
    },
    {
      name: 'सामाजिक विज्ञान (SST)',
      code: 'sst',
      icon: Globe,
      color: 'from-amber-500 to-orange-500',
      border: 'border-amber-400/30',
      text: 'text-amber-300',
      progress: 89,
      chapters: '18 / 20 अध्याय पूर्ण',
      score: '89 / 100',
    },
    {
      name: 'हिंदी (Hindi)',
      code: 'hindi',
      icon: Languages,
      color: 'from-pink-500 to-rose-500',
      border: 'border-pink-400/30',
      text: 'text-pink-300',
      progress: 95,
      chapters: '33 / 35 अध्याय पूर्ण',
      score: '95 / 100',
    },
    {
      name: 'संस्कृत (Sanskrit)',
      code: 'sanskrit',
      icon: BookOpen,
      color: 'from-violet-500 to-purple-600',
      border: 'border-violet-400/30',
      text: 'text-violet-300',
      progress: 88,
      chapters: '19 / 20 अध्याय पूर्ण',
      score: '88 / 100',
    },
  ];

  const badges = [
    {
      title: 'State Topper Elite',
      desc: '450+ स्कोर प्रोजेक्टेड (Top 1%)',
      icon: Trophy,
      color: 'text-amber-300 bg-amber-500/15 border-amber-400/30',
    },
    {
      title: '14-Day Streak',
      desc: 'बिना रुके लगातार दैनिक टेस्ट',
      icon: Flame,
      color: 'text-rose-300 bg-rose-500/15 border-rose-400/30',
    },
    {
      title: 'Math Centum Club',
      desc: 'गणित 12 अध्यायों में 95%+ अंक',
      icon: Award,
      color: 'text-cyan-300 bg-cyan-500/15 border-cyan-400/30',
    },
    {
      title: 'TPS Verified Scholar',
      desc: 'दीपक सर एवं दिलीप सर बैच छात्र',
      icon: Shield,
      color: 'text-emerald-300 bg-emerald-500/15 border-emerald-400/30',
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  const handleDownloadCard = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
      
      {/* Top Banner: Professional Digital Student ID Card */}
      <div className="relative rounded-[32px] p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#0c1329]/90 via-[#0a1024]/85 to-[#060a17]/95 border border-cyan-500/30 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Subtle Water Shimmer Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-20 w-72 h-72 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Avatar and Basic Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-[24px] bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-600 p-[3px] shadow-2xl shadow-cyan-500/30">
                <div className="w-full h-full rounded-[21px] bg-[#070d1e] flex items-center justify-center text-cyan-300">
                  <User className="w-12 h-12 sm:w-14 sm:h-14" />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-emerald-500 text-slate-950 font-black text-[10px] tracking-wider uppercase flex items-center gap-1 shadow-lg">
                <Check className="w-3 h-3 stroke-[3]" /> सत्यापित
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>BSEB 10TH TOPPER BATCH • 2026-27</span>
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-400 fill-current" /> {streak} दिन स्ट्रीक
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                {name}
                <span className="text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 border border-white/10">
                  रोल: {rollCode} - {rollNo}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-x-3 gap-y-1 font-medium">
                <span className="flex items-center gap-1 text-slate-200">
                  <School className="w-3.5 h-3.5 text-sky-400" /> {school}
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> {district}
                </span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-end">
            <button
              onClick={handleDownloadCard}
              className="py-2.5 px-4 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-400/35 text-xs font-bold flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/10"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>{downloadSuccess ? 'कार्ड डाउनलोड हो गया!' : 'छात्र ID कार्ड'}</span>
            </button>

            <button
              onClick={handleLogout}
              className="py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-500/30 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>लॉगआउट</span>
            </button>
          </div>
        </div>

        {/* Institutional Credentials Footnote */}
        <div className="relative z-10 pt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>मार्गदर्शन: <strong className="text-white">दीपक सर (B.Sc. Physics)</strong> एवं <strong className="text-white">दिलीप सर</strong></span>
          </div>
          <div className="text-slate-400">
            संस्थान: <span className="text-cyan-300 font-semibold">TPS ONLINE classes</span> (The Perfect Study Centre • खिरियावां, मदनपुर)
          </div>
        </div>
      </div>

      {/* KPI Performance Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="rounded-[28px] p-5 bg-gradient-to-br from-[#0c1530]/80 to-[#070d1e]/85 border border-cyan-400/20 backdrop-blur-2xl shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">हल किए गए प्रश्न</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">624 <span className="text-xs text-slate-400 font-normal">/ 2,186</span></div>
          <div className="text-[11px] text-cyan-300 font-medium flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> 28.5% संपूर्ण सिलेबस कवर
          </div>
        </div>

        {/* Card 2 */}
        <div className="rounded-[28px] p-5 bg-gradient-to-br from-[#0c1530]/80 to-[#070d1e]/85 border border-emerald-400/20 backdrop-blur-2xl shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">औसत टेस्ट सटीकता</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
              <BarChart3 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">92.4%</div>
          <div className="text-[11px] text-emerald-300 font-medium">
            Grade: A+ (टॉपर ग्रेड)
          </div>
        </div>

        {/* Card 3 */}
        <div className="rounded-[28px] p-5 bg-gradient-to-br from-[#0c1530]/80 to-[#070d1e]/85 border border-amber-400/20 backdrop-blur-2xl shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">लक्ष्य स्कोर</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">450+ <span className="text-xs text-slate-400 font-normal">/ 500</span></div>
          <div className="text-[11px] text-amber-300 font-medium">
            State Rank 1 Aspirant
          </div>
        </div>

        {/* Card 4 */}
        <div className="rounded-[28px] p-5 bg-gradient-to-br from-[#0c1530]/80 to-[#070d1e]/85 border border-purple-400/20 backdrop-blur-2xl shadow-xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">पूर्ण किए गए टेस्ट</span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-400/30 flex items-center justify-center text-purple-400">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">42 <span className="text-xs text-slate-400 font-normal">टेस्ट</span></div>
          <div className="text-[11px] text-purple-300 font-medium">
            Top 1% राज्य स्तरीय रैंक
          </div>
        </div>

      </div>

      {/* Main Grid: Subject-wise Mastery & Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column (8 cols): Subject-Wise Performance Card */}
        <div className="lg:col-span-8 rounded-[32px] p-6 sm:p-8 bg-gradient-to-br from-[#0c142c]/90 to-[#080d1f]/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                <span>बिहार बोर्ड 5 मुख्य विषय - प्रगति रिपोर्ट</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                दीपक सर और संस्थान द्वारा 100% बोर्ड मॉडल आधारित वस्तुनिष्ठ प्रदर्शन
              </p>
            </div>
            <Link
              href="/practice"
              className="text-xs font-bold text-cyan-300 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>टेस्ट दें</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {subjectStats.map((sub, idx) => {
              const Icon = sub.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 transition-all space-y-2.5"
                >
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${sub.color} p-0.5 flex items-center justify-center`}>
                        <div className="w-full h-full bg-[#0a1022] rounded-[10px] flex items-center justify-center">
                          <Icon className={`w-4 h-4 ${sub.text}`} />
                        </div>
                      </div>
                      <span className="font-bold text-white">{sub.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400 font-medium hidden sm:inline">{sub.chapters}</span>
                      <span className={`font-black ${sub.text}`}>{sub.score} ({sub.progress}%)</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${sub.color} transition-all duration-700`}
                      style={{ width: `${sub.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (4 cols): Badges & Achievements */}
        <div className="lg:col-span-4 rounded-[32px] p-6 sm:p-8 bg-gradient-to-br from-[#0c142c]/90 to-[#080d1f]/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-5">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-white/10 pb-4">
            <Award className="w-5 h-5 text-amber-400" />
            <span>टॉपर बैज एवं सम्मान (Honors)</span>
          </h3>

          <div className="space-y-3">
            {badges.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center gap-3 hover:border-white/15 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${b.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-xs sm:text-sm font-bold text-white">{b.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-tight">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 text-center space-y-1.5">
            <span className="text-[11px] font-bold text-cyan-300 block">
              🎯 450+ अंक मिशन 2026-27
            </span>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              दैनिक 1 वन-शॉट वीडियो और 2 ऑब्जेक्टिव टेस्ट देकर अपनी टॉप रैंक पक्की करें।
            </p>
          </div>
        </div>

      </div>

      {/* Edit Student Profile Details Form */}
      <div className="rounded-[32px] p-6 sm:p-8 md:p-10 bg-gradient-to-br from-[#0c142c]/90 to-[#080d1f]/95 border border-white/10 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-cyan-400" />
              <span>विद्यार्थी विवरण अपडेट करें (Student Profile Settings)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              अपना नाम, संपर्क और बोर्ड परीक्षा लक्ष्य जानकारी सुरक्षित करें
            </p>
          </div>
        </div>

        {savedMessage && (
          <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm flex items-center gap-2.5 animate-fadeIn">
            <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
            <span>प्रोफाइल विवरण सफलतापूर्वक सुरक्षित कर लिया गया है (Saved Successfully)!</span>
          </div>
        )}

        <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          
          <div>
            <label className="text-xs text-slate-300 font-bold block mb-1.5">
              पूरा नाम (Full Name):
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#080f22] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="छात्र का पूरा नाम लिखें"
              required
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold block mb-1.5">
              मोबाइल नंबर (WhatsApp / Contact):
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-[#080f22] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="+91 XXXXX XXXXX"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold block mb-1.5">
              स्कूल / संस्थान का नाम (School Name):
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full bg-[#080f22] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="अपने स्कूल का नाम लिखें"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold block mb-1.5">
              जिला एवं राज्य (District & State):
            </label>
            <input
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full bg-[#080f22] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="औरंगाबाद, बिहार"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold block mb-1.5">
              BSEB रोल कोड (Roll Code):
            </label>
            <input
              type="text"
              value={rollCode}
              onChange={(e) => setRollCode(e.target.value)}
              className="w-full bg-[#080f22] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="उदा. 31045"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-bold block mb-1.5">
              BSEB रोल नंबर (Roll No):
            </label>
            <input
              type="text"
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              className="w-full bg-[#080f22] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="उदा. 2600142"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="text-xs text-slate-300 font-bold block mb-1.5">
              10वीं बोर्ड लक्ष्य अंक (Target Marks):
            </label>
            <input
              type="text"
              value={targetScore}
              onChange={(e) => setTargetScore(e.target.value)}
              className="w-full bg-[#080f22] border border-white/15 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
              placeholder="उदा. 475 / 500 (95%)"
            />
          </div>

          <div className="sm:col-span-2 pt-2 flex flex-wrap items-center gap-3">
            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Check className="w-4 h-4 stroke-[3]" />
              <span>बदलाव सुरक्षित करें (Save Profile)</span>
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
