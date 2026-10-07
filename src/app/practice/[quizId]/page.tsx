'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { INITIAL_QUIZZES, INITIAL_QUESTIONS } from '@/lib/seed-data';
import QuizPlayer from '@/components/QuizPlayer';
import { ArrowLeft, Award } from 'lucide-react';

export default function QuizRunnerPage() {
  const params = useParams();
  const quizId = params.quizId as string;

  const quiz = INITIAL_QUIZZES.find((q) => q.id === quizId);
  if (!quiz) {
    return notFound();
  }

  const questions = INITIAL_QUESTIONS.filter((q) => q.quizId === quiz.id);
  const fullQuiz = {
    ...quiz,
    questions,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      <Link
        href="/practice"
        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>अभ्यास सूची पर वापस जाएं (Back to Practice)</span>
      </Link>

      <QuizPlayer quiz={fullQuiz} />
    </div>
  );
}
