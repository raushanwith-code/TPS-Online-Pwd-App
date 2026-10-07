'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Sparkles,
  Clock,
  UserCheck,
  PlusCircle,
  X,
  Link as LinkIcon,
  CheckCircle2,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import VideoPlayerModal from './VideoPlayerModal';

export interface VideoLectureItem {
  id: string;
  youtubeId: string;
  title: string;
  hindiTitle: string;
  teacher: string;
  subject: string;
  subjectKey: 'math' | 'science' | 'sst' | 'other';
  tag: string;
  duration: string;
  badge?: string;
  isCustom?: boolean;
}

export const DEFAULT_OFFICIAL_VIDEOS: VideoLectureItem[] = [
  {
    id: 'vid-1',
    youtubeId: 'fQEY0sTqj7k',
    title: 'Class 10th Coordinate Geometry || One shot || By Deepak Sir',
    hindiTitle: 'निर्देशांक ज्यामिति (Coordinate Geometry) - One Shot Complete Class',
    teacher: 'Deepak Sir (B.Sc. Physics)',
    subject: 'गणित (Mathematics)',
    subjectKey: 'math',
    tag: 'One Shot Special',
    duration: '1h 45m',
    badge: '100% Board Model',
  },
  {
    id: 'vid-2',
    youtubeId: '75Hw2ly061I',
    title: 'Probability in One Shot || Class 10th Maths || Complete Chapter',
    hindiTitle: 'प्रायिकता (Probability) - पूरा अध्याय एक ही क्लास में',
    teacher: 'Deepak Sir (B.Sc. Physics)',
    subject: 'गणित (Mathematics)',
    subjectKey: 'math',
    tag: 'One Shot Concept',
    duration: '1h 20m',
    badge: 'VVI Questions',
  },
  {
    id: 'vid-3',
    youtubeId: 'Y3Hc6CczcEo',
    title: 'Chemical Reactions and Equations | CLASS 10 Science | By Dilip Sir',
    hindiTitle: 'रासायनिक अभिक्रियाएं एवं समीकरण - Complete One Shot Class',
    teacher: 'Dilip Sir (Chemistry Expert)',
    subject: 'विज्ञान (Chemistry)',
    subjectKey: 'science',
    tag: 'Chemistry One Shot',
    duration: '1h 35m',
    badge: 'Top Board Favorite',
  },
  {
    id: 'vid-4',
    youtubeId: 'qMAiztaSVFU',
    title: 'Master CHEMISTRY in 10th Grade Science with These Top Questions',
    hindiTitle: 'कक्षा 10 रसायन विज्ञान - परीक्षा में बार-बार पूछे जाने वाले प्रश्न',
    teacher: 'Dilip Sir (Chemistry Expert)',
    subject: 'विज्ञान (Chemistry)',
    subjectKey: 'science',
    tag: 'VVI Important Qs',
    duration: '52m',
    badge: 'Exam Booster',
  },
  {
    id: 'vid-5',
    youtubeId: '5bK8p_m5tiM',
    title: 'Class 10th Math Chapter 15 Objective Question | By Deepak Sir',
    hindiTitle: 'प्रायिकता (Chapter 15) वस्तुनिष्ठ प्रश्न - VVI Objective Solution',
    teacher: 'Deepak Sir (B.Sc. Physics)',
    subject: 'गणित (Mathematics)',
    subjectKey: 'math',
    tag: 'Objective VVI',
    duration: '48m',
    badge: '100% Guaranteed',
  },
];

// Helper to extract YouTube video ID from various URL formats
function extractYouTubeId(url: string): string {
  const cleanUrl = url.trim();
  const match = cleanUrl.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (match && match[1]) return match[1];
  if (cleanUrl.length === 11 && !cleanUrl.includes('/') && !cleanUrl.includes('.')) {
    return cleanUrl;
  }
  return '';
}

export default function VideoSection() {
  const [videos, setVideos] = useState<VideoLectureItem[]>(DEFAULT_OFFICIAL_VIDEOS);
  const [filter, setFilter] = useState<'all' | 'math' | 'science' | 'sst'>('all');
  const [selectedVideo, setSelectedVideo] = useState<VideoLectureItem | null>(null);

  // Add Video Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newTeacher, setNewTeacher] = useState('Deepak Sir (B.Sc. Physics)');
  const [newSubject, setNewSubject] = useState<'math' | 'science' | 'sst' | 'other'>('math');
  const [newTag, setNewTag] = useState('New Lecture');
  const [newDuration, setNewDuration] = useState('45m');
  const [addSuccessMsg, setAddSuccessMsg] = useState('');

  // Load any previously added custom videos from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('tps_custom_videos');
      if (stored) {
        const parsed: VideoLectureItem[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge custom videos with defaults without duplicates
          const customIds = new Set(parsed.map((v) => v.id));
          const filteredDefaults = DEFAULT_OFFICIAL_VIDEOS.filter((v) => !customIds.has(v.id));
          setVideos([...parsed, ...filteredDefaults]);
        }
      }
    } catch {}
  }, []);

  // Save custom videos helper
  const saveVideos = (updated: VideoLectureItem[]) => {
    setVideos(updated);
    try {
      const customOnly = updated.filter((v) => v.isCustom);
      localStorage.setItem('tps_custom_videos', JSON.stringify(customOnly));
    } catch {}
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    const ytId = extractYouTubeId(newUrl);

    if (!ytId) {
      alert('कृपया सही YouTube URL डालें (जैसे: https://youtu.be/fQEY0sTqj7k)');
      return;
    }

    if (!newTitle.trim()) {
      alert('कृपया वीडियो का शीर्षक (Title) दर्ज करें');
      return;
    }

    let subjectLabel = 'गणित (Mathematics)';
    if (newSubject === 'science') subjectLabel = 'विज्ञान (Science)';
    if (newSubject === 'sst') subjectLabel = 'सामाजिक विज्ञान (SST)';
    if (newSubject === 'other') subjectLabel = 'विशेष कक्षा';

    const newVideoItem: VideoLectureItem = {
      id: `custom-vid-${Date.now()}`,
      youtubeId: ytId,
      title: newTitle,
      hindiTitle: newTitle,
      teacher: newTeacher,
      subject: subjectLabel,
      subjectKey: newSubject,
      tag: newTag || 'New Board Class',
      duration: newDuration || 'Full Lecture',
      badge: 'नवीनतम कक्षा (Latest)',
      isCustom: true,
    };

    const updated = [newVideoItem, ...videos];
    saveVideos(updated);

    // Reset form
    setNewUrl('');
    setNewTitle('');
    setAddSuccessMsg('नया वीडियो सफलतापूर्वक जोड़ दिया गया!');
    setTimeout(() => {
      setAddSuccessMsg('');
      setIsAddModalOpen(false);
    }, 1200);
  };

  const handleDeleteCustomVideo = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('क्या आप इस वीडियो को हटाना चाहते हैं?')) {
      const updated = videos.filter((v) => v.id !== id);
      saveVideos(updated);
    }
  };

  const handleResetToDefault = () => {
    if (confirm('क्या आप सभी कस्टम जोड़े गए वीडियो रीसेट करना चाहते हैं?')) {
      localStorage.removeItem('tps_custom_videos');
      setVideos(DEFAULT_OFFICIAL_VIDEOS);
    }
  };

  const filteredVideos = videos.filter((v) => {
    if (filter === 'all') return true;
    return v.subjectKey === filter;
  });

  return (
    <section id="videos" className="py-12 sm:py-16 scroll-mt-24">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-wide uppercase mb-3 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>वीडियो हब • TPS ONLINE CLASSES</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            यूट्यूब वीडियो क्लासेज{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-amber-400 bg-clip-text text-transparent">
              (HD Thumbnails & Speed Controls)
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-2xl leading-relaxed">
            दीपक सर और दिलीप सर के उच्च-गुणवत्ता वाले वीडियो लेक्चर्स।
          </p>
        </div>

        {/* Action Controls: Add Video & Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Add Future Video Button */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ नया वीडियो जोड़ें</span>
          </button>

          {/* Reset custom button (if any custom exists) */}
          {videos.some((v) => v.isCustom) && (
            <button
              onClick={handleResetToDefault}
              className="p-2.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 hover:text-white border border-white/10 transition-colors"
              title="डिफ़ॉल्ट वीडियो रीसेट करें"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-[#0e1732]/80 p-1.5 rounded-2xl border border-white/15">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              सभी ({videos.length})
            </button>
            <button
              onClick={() => setFilter('math')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'math'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              गणित
            </button>
            <button
              onClick={() => setFilter('science')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filter === 'science'
                  ? 'bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              विज्ञान
            </button>
          </div>
        </div>
      </div>

      {/* Videos Grid with Luminous Sapphire/Indigo Glass Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((vid) => (
          <div
            key={vid.id}
            onClick={() => setSelectedVideo(vid)}
            className="group cursor-pointer rounded-[30px] luminous-card overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Top HD Thumbnail Box */}
            <div>
              <div className="relative aspect-video w-full bg-[#0a1228] overflow-hidden rounded-t-[29px]">
                {/* Real YouTube Thumbnail */}
                <img
                  src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                  alt={vid.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                  loading="lazy"
                />

                {/* Ambient vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09122a] via-transparent to-black/30 pointer-events-none" />

                {/* Big Glowing Play Button Ripple Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/35 backdrop-blur-md border border-cyan-300/60 flex items-center justify-center text-white shadow-[0_0_30px_rgba(56,189,248,0.5)] group-hover:scale-115 group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-600 transition-all duration-300">
                    <Play className="w-6 h-6 ml-0.5 fill-white" />
                  </div>
                </div>

                {/* Top Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-black/75 backdrop-blur-md text-amber-300 border border-amber-400/35 shadow-md">
                    {vid.badge || vid.tag}
                  </span>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-200 border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{vid.duration}</span>
                </div>

                {/* Delete button if custom video */}
                {vid.isCustom && (
                  <button
                    onClick={(e) => handleDeleteCustomVideo(vid.id, e)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white flex items-center justify-center transition-all z-10"
                    title="हटाएं (Delete)"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Video Meta Info Body */}
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 uppercase tracking-wide">
                    {vid.subject}
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {vid.tag}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 leading-snug">
                  {vid.hindiTitle}
                </h3>
              </div>
            </div>

            {/* Video Footer */}
            <div className="px-5 pb-5 pt-3 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <span className="truncate max-w-[140px] sm:max-w-[160px]">{vid.teacher}</span>
              </div>

              <span className="px-3 py-1.5 rounded-xl bg-cyan-500/20 group-hover:bg-cyan-500 group-hover:text-black text-cyan-300 text-xs font-bold border border-cyan-400/30 transition-all flex items-center gap-1.5 shadow-sm">
                <span>देखें</span>
                <Play className="w-3 h-3 fill-current" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* --- ADD FUTURE VIDEO MODAL --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#091228] border border-cyan-400/30 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(56,189,248,0.2)] p-6 sm:p-8 space-y-5">
            {/* Modal Header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">नया वीडियो जोड़ें</h3>
                  <p className="text-xs text-slate-400">भविष्य के नए यूट्यूब वीडियो यहां सीधे ऐड करें</p>
                </div>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {addSuccessMsg ? (
              <div className="py-8 text-center space-y-3 animate-in zoom-in-95">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
                <p className="text-base font-bold text-white">{addSuccessMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleAddVideo} className="space-y-4 text-xs sm:text-sm">
                {/* YouTube Link */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200 flex items-center gap-1.5">
                    <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>YouTube Video URL (या Video ID):</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा: https://youtu.be/fQEY0sTqj7k"
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e1b3d] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
                  />
                  <p className="text-[11px] text-slate-400">
                    YouTube शेयर लिंक या नॉर्मल वॉच लिंक पेस्ट करें। थंबनेल अपने आप जनरेट हो जाएगा।
                  </p>
                </div>

                {/* Video Title */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-200">
                    वीडियो शीर्षक (Video Title / Chapter Name):
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="उदा: त्रिभुज (Triangle) One Shot Class"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#0e1b3d] border border-white/15 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
                  />
                </div>

                {/* Teacher & Subject Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">शिक्षक (Teacher):</label>
                    <select
                      value={newTeacher}
                      onChange={(e) => setNewTeacher(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0e1b3d] border border-white/15 text-white focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
                    >
                      <option value="Deepak Sir (B.Sc. Physics)">Deepak Sir (B.Sc. Physics)</option>
                      <option value="Dilip Sir (Chemistry Expert)">Dilip Sir (Chemistry Expert)</option>
                      <option value="TPS ONLINE Faculty">TPS ONLINE Faculty</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">विषय (Subject):</label>
                    <select
                      value={newSubject}
                      onChange={(e) => setNewSubject(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#0e1b3d] border border-white/15 text-white focus:outline-none focus:border-cyan-400 text-xs sm:text-sm"
                    >
                      <option value="math">गणित (Mathematics)</option>
                      <option value="science">विज्ञान (Science)</option>
                      <option value="sst">सामाजिक विज्ञान (SST)</option>
                      <option value="other">अन्य विषय</option>
                    </select>
                  </div>
                </div>

                {/* Duration & Tag */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">अवधि (Duration):</label>
                    <input
                      type="text"
                      placeholder="उदा: 1h 15m"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0e1b3d] border border-white/15 text-white text-xs"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-200">टैग (Tag):</label>
                    <input
                      type="text"
                      placeholder="उदा: One Shot, VVI"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#0e1b3d] border border-white/15 text-white text-xs"
                    />
                  </div>
                </div>

                {/* Modal Buttons */}
                <div className="pt-3 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-slate-300 font-semibold"
                  >
                    रद्द करें
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold shadow-lg shadow-cyan-500/30 flex items-center gap-1.5 transition-transform active:scale-95"
                  >
                    <span>सेव करें (Add Video)</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* In-App Player Modal */}
      <VideoPlayerModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo}
      />
    </section>
  );
}
