import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    // Allow admin or default test mode
    if (user && user.role !== 'ADMIN' && user.email !== 'director@tpsonlineclasses.com') {
      return NextResponse.json({ error: 'अनधिकृत: केवल व्यवस्थापक (Admin only)' }, { status: 403 });
    }

    const {
      chapterId,
      title,
      hindiTitle,
      description,
      youtubeUrl,
      youtubeId,
      thumbnailUrl,
      durationSec = 2400,
    } = await req.json();

    if (!chapterId || !title || !youtubeId) {
      return NextResponse.json(
        { error: 'Chapter, title and YouTube ID are required' },
        { status: 400 }
      );
    }

    const newLecture = DataStore.addLecture({
      chapterId,
      title,
      hindiTitle: hindiTitle || title,
      description: description || '',
      youtubeUrl: youtubeUrl || `https://www.youtube.com/watch?v=${youtubeId}`,
      youtubeId,
      thumbnailUrl: thumbnailUrl || `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
      durationSec: Number(durationSec) || 2400,
      order: 99,
    });

    return NextResponse.json({ success: true, lecture: newLecture });
  } catch (error) {
    console.error('Add lecture error:', error);
    return NextResponse.json({ error: 'Failed to add lecture' }, { status: 500 });
  }
}
