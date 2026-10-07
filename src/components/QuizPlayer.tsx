'use client';

import React, { useState } from 'react';
import {
  Clock,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ChevronRight,
  ArrowRight,
  Flame,
  Award,
  Sparkles,
} from 'lucide-react';
import { Quiz, Question } from '@/lib/types';
import Link from 'next/link';

interface QuizPlayerProps {
  quiz: Quiz;
  onFinish?: (score: number, total: number) => void;
}

export default function QuizPlayer({ quiz, onFinish }: QuizPlayerProps) {
  const questions: Question[] = quiz.questions || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [answeredState, setAnsweredState] = useState<Record<string, boolean>>({});
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];
  const totalQ = questions.length;

  const handleOptionClick = (optionIdx: number) => {
    if (!currentQ || answeredState[currentQ.id]) return;

    const isCorrect = optionIdx === currentQ.correctOption;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionIdx }));
    setAnsweredState((prev) => ({ ...prev, [currentQ.id]: true }));

    if (isCorrect) {
      setScore((s) => s + 1);
      setStreak((stk) => {
        const next = stk + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQ - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {
    setIsCompleted(true);

    // Confetti celebration if score >= 60%
    if ((score / (totalQ || 1)) >= 0.6) {
      if (typeof window !== 'undefined') {
        import('canvas-confetti').then((mod) => {
          const runConfetti = mod.default || mod;
          runConfetti({
            particleCount: 90,
            spread: 80,
            origin: { y: 0.6 },
          });
        }).catch(() => {});
      }
    }

    if (onFinish) {
      onFinish(score, totalQ);
    }

    // Save to server
    fetch('/api/quizzes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        quizId: quiz.id,
        answers: selectedAnswers,
        timeTakenSec: 60,
      }),
    }).catch(() => {});
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setAnsweredState({});
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsCompleted(false);
  };

  if (totalQ === 0) {
    return (
      <div className="rounded-3xl bg-black/80 backdrop-blur-2xl p-8 text-center text-slate-400 border border-white/10 shadow-2xl">
        <p>इस टेस्ट में प्रश्न लोड हो रहे हैं...</p>
      </div>
    );
  }

  // --- RESULT VIEW ---
  if (isCompleted) {
    const percentage = Math.round((score / totalQ) * 100);
    const circumference = 2 * Math.PI * 54; // radius 54
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="rounded-[32px] luminous-card p-8 text-center space-y-5 border border-white/18 shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>TEST COMPLETED • मूल्यांकन रिपोर्ट</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {percentage >= 80 ? 'शानदार टॉपर प्रदर्शन! 🏆' : percentage >= 50 ? 'बहुत अच्छा प्रयास! 🌟' : 'पुनः अभ्यास करें! 💪'}
          </h2>

          {/* SVG Score Circle */}
          <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="rgba(255, 255, 255, 0.08)"
                strokeWidth="10"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                stroke="url(#quizScoreGrad)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="quizScoreGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl sm:text-4xl font-black text-white">
                {percentage}%
              </span>
              <span className="text-xs text-slate-400 font-semibold">
                {score} / {totalQ} सही
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRetry}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 flex items-center gap-2 transition-transform active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>पुनः टेस्ट दें</span>
            </button>

            <Link
              href="/practice"
              className="py-3 px-6 rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] text-cyan-300 font-bold text-sm border border-cyan-500/30 flex items-center gap-2 transition-colors"
            >
              <span>अन्य अध्याय चुनें</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Detailed Review */}
        <div className="rounded-[32px] luminous-card p-6 sm:p-8 border border-white/18 space-y-4 shadow-xl">
          <h3 className="text-base font-black text-white flex items-center gap-2">
            <span>सभी प्रश्नों की उत्तरमाला (Detailed Review)</span>
          </h3>

          <div className="space-y-3">
            {questions.map((q, idx) => {
              const userAns = selectedAnswers[q.id];
              const isCorrect = userAns === q.correctOption;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border text-sm space-y-2 ${
                    isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30'
                      : 'bg-rose-500/10 border-rose-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-bold text-white">
                      {idx + 1}. {q.hindiText || q.questionText}
                    </span>
                    {isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </div>

                  <div className="text-xs space-y-1">
                    {userAns !== undefined && (
                      <p className={isCorrect ? 'text-emerald-300 font-medium' : 'text-rose-300 font-medium'}>
                        आपका उत्तर: {q.options[userAns]}
                      </p>
                    )}
                    {!isCorrect && (
                      <p className="text-emerald-300 font-bold">
                        सही उत्तर: {q.options[q.correctOption]}
                      </p>
                    )}
                    {q.hindiExpl && (
                      <p className="text-slate-400 pt-1 text-[11px]">
                        💡 {q.hindiExpl}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --- ACTIVE QUIZ VIEW ---
  const isAnswered = currentQ && answeredState[currentQ.id];
  const progressPercent = Math.round(((currentIndex + 1) / totalQ) * 100);

  return (
    <div className="max-w-2xl mx-auto space-y-4">
      {/* Top Meta Bar */}
      <div className="flex items-center justify-between text-xs text-slate-300 px-1">
        <span className="font-bold text-cyan-300 truncate max-w-[200px] sm:max-w-none">
          {quiz.hindiTitle || quiz.title}
        </span>
        <div className="flex items-center gap-3">
          <span className="font-bold text-emerald-400">
            अंक: {score}
          </span>
          <span className="text-slate-400">
            प्रश्न: <b className="text-white">{currentIndex + 1}</b> / {totalQ}
          </span>
        </div>
      </div>

      {/* Aquatic Gradient Progress Bar */}
      <div className="h-2 w-full bg-black/60 rounded-full overflow-hidden border border-white/10">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-amber-400 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Main Luminous Sapphire Glass Quiz Card */}
      <div className="rounded-[32px] luminous-card p-6 sm:p-9 border border-white/18 hover:border-cyan-400/50 space-y-5">
        {/* Header Indicator */}
        <div className="flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="font-bold text-slate-200">वस्तुनिष्ठ प्रश्न • टैप करके उत्तर दें</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 font-extrabold text-xs">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Streak: {streak}</span>
          </div>
        </div>

        {/* Question Text */}
        <h3 className="text-lg sm:text-xl font-black text-white leading-relaxed">
          {currentQ.hindiText || currentQ.questionText}
        </h3>

        {/* Water-Pill Option Buttons */}
        <div className="space-y-3">
          {currentQ.options.map((option, optIdx) => {
            const isUserChoice = selectedAnswers[currentQ.id] === optIdx;
            const isCorrectOption = optIdx === currentQ.correctOption;

            let optionStyle = 'bg-white/[0.03] text-slate-200 border-white/10 hover:bg-white/[0.07] hover:border-cyan-400/40';
            if (isAnswered) {
              if (isCorrectOption) {
                optionStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]';
              } else if (isUserChoice && !isCorrectOption) {
                optionStyle = 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-[0_0_20px_rgba(244,63,94,0.35)] animate-shake';
              } else {
                optionStyle = 'opacity-40 bg-white/[0.02] border-white/5 text-slate-400';
              }
            }

            return (
              <button
                key={optIdx}
                disabled={isAnswered}
                onClick={() => handleOptionClick(optIdx)}
                className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base font-semibold transition-all flex items-center justify-between gap-3 ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-black/60 border border-white/10 text-slate-300 flex items-center justify-center text-xs font-bold shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="leading-snug">{option}</span>
                </div>

                {isAnswered && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isUserChoice && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Live Foot: Explanation & Next Action */}
        {isAnswered && (
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-slate-300 bg-cyan-500/10 px-3.5 py-2 rounded-xl border border-cyan-500/20 w-full sm:w-auto">
              {currentQ.hindiExpl || currentQ.explanation}
            </div>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto py-3 px-7 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-sm shadow-xl shadow-cyan-500/30 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shrink-0"
            >
              <span>{currentIndex === totalQ - 1 ? 'रिजल्ट देखें' : 'अगला प्रश्न'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
