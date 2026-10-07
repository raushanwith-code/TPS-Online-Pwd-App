import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    const userId = user?.id || 'student-1';

    const { lectureId, lastPositionSec, completed } = await req.json();
    if (!lectureId) {
      return NextResponse.json({ error: 'Lecture ID is required' }, { status: 400 });
    }

    DataStore.saveProgress(userId, lectureId, Number(lastPositionSec) || 0, Boolean(completed));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Progress error:', err);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  const userId = user?.id || 'student-1';
  const { searchParams } = new URL(req.url);
  const lectureId = searchParams.get('lectureId');

  if (lectureId) {
    const progress = DataStore.getProgress(userId, lectureId);
    return NextResponse.json({ progress });
  }

  const stats = DataStore.getUserOverallStats(userId);
  return NextResponse.json({ stats });
}
