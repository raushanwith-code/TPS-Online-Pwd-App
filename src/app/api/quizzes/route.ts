import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subjectId') || undefined;
  const quizId = searchParams.get('quizId') || undefined;

  if (quizId) {
    const quiz = DataStore.getQuizById(quizId);
    if (!quiz) return NextResponse.json({ error: 'Quiz not found' }, { status: 404 });
    return NextResponse.json({ quiz });
  }

  const quizzes = DataStore.getQuizzes(subjectId);
  return NextResponse.json({ quizzes });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id || 'student-1';

    const { quizId, answers, timeTakenSec } = await req.json();
    if (!quizId || !answers) {
      return NextResponse.json({ error: 'Quiz ID and answers required' }, { status: 400 });
    }

    const attempt = DataStore.submitQuizAttempt(
      userId,
      quizId,
      answers,
      timeTakenSec || 60
    );

    return NextResponse.json({ success: true, attempt });
  } catch (error) {
    console.error('Quiz attempt error:', error);
    return NextResponse.json({ error: 'Failed to process quiz attempt' }, { status: 500 });
  }
}
