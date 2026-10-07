'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Shield,
  Youtube,
  Plus,
  CheckCircle,
  AlertCircle,
  FileText,
  Sparkles,
  ExternalLink,
  Layers,
  BookOpen,
} from 'lucide-react';
import { INITIAL_SUBJECTS, INITIAL_CHAPTERS } from '@/lib/seed-data';

export default function AdminPanelPage() {
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(true); // default true for immediate seamless inspection
  const [adminKey, setAdminKey] = useState('');

  // 1-Click YouTube Lecture State
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isInspecting, setIsInspecting] = useState(false);
  const [inspectedVideo, setInspectedVideo] = useState<{
    videoId: string;
    title: string;
    author: string;
    thumbnailUrl: string;
  } | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState(INITIAL_SUBJECTS[0].id);
  const [selectedChapterId, setSelectedChapterId] = useState(INITIAL_CHAPTERS[0].id);
  const [hindiTitleInput, setHindiTitleInput] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Add Note State
  const [noteTitle, setNoteTitle] = useState('');
  const [noteUrl, setNoteUrl] = useState('');
  const [noteType, setNoteType] = useState('PDF');
  const [noteSizeKb, setNoteSizeKb] = useState(2048);
  const [noteSubjectId, setNoteSubjectId] = useState(INITIAL_SUBJECTS[0].id);
  const [noteSuccess, setNoteSuccess] = useState('');

  // Filter chapters for the selected subject
  const availableChapters = INITIAL_CHAPTERS.filter(
    (c) => c.subjectId === selectedSubjectId
  );

  const handleInspectUrl = async () => {
    if (!youtubeUrl.trim()) return;
    setIsInspecting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api/youtube-oembed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: youtubeUrl.trim() }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setInspectedVideo({
          videoId: data.videoId,
          title: data.title,
          author: data.author,
          thumbnailUrl: data.thumbnailUrl,
        });
        setHindiTitleInput(data.title);
      } else {
        setErrorMessage(data.error || 'अमान्य यूट्यूब लिंक (Invalid YouTube URL)');
      }
    } catch {
      setErrorMessage('यूट्यूब वीडियो की जानकारी प्राप्त नहीं हो सकी');
    } finally {
      setIsInspecting(false);
    }
  };

  const handleAddLecture = async () => {
    if (!inspectedVideo) return;
    setIsAdding(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/add-lecture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterId: selectedChapterId,
          title: inspectedVideo.title,
          hindiTitle: hindiTitleInput || inspectedVideo.title,
          youtubeUrl: youtubeUrl.trim(),
          youtubeId: inspectedVideo.videoId,
          thumbnailUrl: inspectedVideo.thumbnailUrl,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMessage('✅ वीडियो लेक्चर पाठ्यक्रम में सफलतापूर्वक जोड़ दिया गया!');
        setInspectedVideo(null);
        setYoutubeUrl('');
      } else {
        setErrorMessage(data.error || 'लेक्चर जोड़ने में समस्या हुई');
      }
    } catch {
      setErrorMessage('सर्वर त्रुटि');
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteUrl) return;

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subjectId: noteSubjectId,
          title: noteTitle,
          fileUrl: noteUrl,
          fileType: noteType,
          fileSizeKb: Number(noteSizeKb) || 2048,
        }),
      });
      if (res.ok) {
        setNoteSuccess('✅ PDF नोट्स अध्ययन सूची में सफलतापूर्वक जोड़ दिया गया!');
        setNoteTitle('');
        setNoteUrl('');
      }
    } catch {
      //
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span>DIRECTOR & ADMIN CONTROL CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">
            एडमिन पैनल (Admin Dashboard)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            यूट्यूब लिंक पेस्ट करके 1-क्लिक में लेक्चर जोड़ें और PDF नोट्स प्रबंधित करें।
          </p>
        </div>
      </div>

      {/* Feature 1: 1-Click YouTube Lecture Adder */}
      <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-sky-500/30 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center shrink-0">
            <Youtube className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              1-क्लिक यूट्यूब वीडियो लेक्चर जोड़ें (Add YouTube Lecture)
            </h3>
            <p className="text-xs text-slate-400">
              यूट्यूब का कोई भी लिंक (Watch, youtu.be, Shorts) पेस्ट करें — वीडियो आईडी, थंबनेल और शीर्षक स्वतः डिटेक्ट होगा।
            </p>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="यूट्यूब लिंक यहाँ पेस्ट करें (e.g. https://www.youtube.com/watch?v=...)"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-400 outline-none focus:border-sky-500"
          />
          <button
            onClick={handleInspectUrl}
            disabled={isInspecting || !youtubeUrl.trim()}
            className="py-3 px-6 rounded-2xl bg-sky-500 hover:bg-sky-400 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95 shrink-0"
          >
            {isInspecting ? 'जाँच हो रही है...' : 'वीडियो जाँचें (Inspect)'}
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Inspected Video Details & 1-Click Confirmation */}
        {inspectedVideo && (
          <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-sky-500/30 space-y-4 animate-in fade-in">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="relative w-full sm:w-48 aspect-video rounded-xl overflow-hidden bg-black shrink-0 border border-white/10">
                <Image
                  src={inspectedVideo.thumbnailUrl}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded">
                  ID: {inspectedVideo.videoId}
                </span>
                <h4 className="text-sm sm:text-base font-bold text-white">
                  {inspectedVideo.title}
                </h4>
                <p className="text-xs text-slate-400">
                  चैनल: {inspectedVideo.author}
                </p>
              </div>
            </div>

            {/* Select Subject and Chapter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  विषय चुनें (Select Subject):
                </label>
                <select
                  value={selectedSubjectId}
                  onChange={(e) => {
                    setSelectedSubjectId(e.target.value);
                    const ch = INITIAL_CHAPTERS.find((c) => c.subjectId === e.target.value);
                    if (ch) setSelectedChapterId(ch.id);
                  }}
                  className="w-full bg-space-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  {INITIAL_SUBJECTS.map((sub) => (
                    <option key={sub.id} value={sub.id}>
                      {sub.hindiName} ({sub.name})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  अध्याय चुनें (Select Chapter):
                </label>
                <select
                  value={selectedChapterId}
                  onChange={(e) => setSelectedChapterId(e.target.value)}
                  className="w-full bg-space-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none"
                >
                  {availableChapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      Ch {ch.chapterNum}: {ch.hindiTitle || ch.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Title edit */}
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                शीर्षक (हिंदी / English Title):
              </label>
              <input
                type="text"
                value={hindiTitleInput}
                onChange={(e) => setHindiTitleInput(e.target.value)}
                className="w-full bg-space-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none"
              />
            </div>

            {/* 1-Click Confirm Button */}
            <button
              onClick={handleAddLecture}
              disabled={isAdding}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>{isAdding ? 'जोड़ा जा रहा है...' : '1-क्लिक में लेक्चर जोड़ें (Add Lecture)'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Feature 2: Upload / Add PDF Notes */}
      <div className="glass-panel p-5 sm:p-7 rounded-3xl border border-purple-500/30 space-y-6">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">
              PDF / डॉक्युमेंट नोट्स जोड़ें (Add Study Notes)
            </h3>
            <p className="text-xs text-slate-400">
              PDF, DOCX, PPTX या ZIP फाइल का शीर्षक और लिंक दर्ज करें।
            </p>
          </div>
        </div>

        {noteSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{noteSuccess}</span>
          </div>
        )}

        <form onSubmit={handleAddNote} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                विषय (Subject):
              </label>
              <select
                value={noteSubjectId}
                onChange={(e) => setNoteSubjectId(e.target.value)}
                className="w-full bg-space-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                {INITIAL_SUBJECTS.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.hindiName} ({sub.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                फाइल प्रकार (Format):
              </label>
              <select
                value={noteType}
                onChange={(e) => setNoteType(e.target.value)}
                className="w-full bg-space-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none"
              >
                <option value="PDF">PDF</option>
                <option value="DOCX">DOCX</option>
                <option value="PPTX">PPTX</option>
                <option value="ZIP">ZIP</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1">
              नोट्स का शीर्षक (Note Title):
            </label>
            <input
              type="text"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              placeholder="e.g. कक्षा 10 गणित अध्याय 1 फॉर्मूला चार्ट"
              required
              className="w-full bg-space-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-slate-300 font-medium block mb-1">
              फाइल लिंक / URL (File Link):
            </label>
            <input
              type="text"
              value={noteUrl}
              onChange={(e) => setNoteUrl(e.target.value)}
              placeholder="e.g. /notes/math-ch1.pdf या Google Drive / Cloudinary लिंक"
              required
              className="w-full bg-space-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white outline-none"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-md shadow-purple-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>नोट्स प्रकाशित करें (Publish Note)</span>
          </button>
        </form>
      </div>
    </div>
  );
}
