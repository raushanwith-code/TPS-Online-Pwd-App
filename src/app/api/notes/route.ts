import { NextRequest, NextResponse } from 'next/server';
import { DataStore } from '@/lib/data-store';
import { getCurrentUser } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const subjectId = searchParams.get('subjectId') || undefined;
  const notes = DataStore.getNotes(subjectId);
  return NextResponse.json({ notes });
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (user && user.role !== 'ADMIN' && user.email !== 'director@tpsonlineclasses.com') {
      return NextResponse.json({ error: 'Admin only' }, { status: 403 });
    }

    const { subjectId, chapterId, title, fileUrl, fileType, fileSizeKb } = await req.json();
    if (!subjectId || !title || !fileUrl) {
      return NextResponse.json({ error: 'Subject, title and file URL are required' }, { status: 400 });
    }

    const newNote = DataStore.addNote({
      subjectId,
      chapterId: chapterId || undefined,
      title,
      fileUrl,
      fileType: fileType || 'PDF',
      fileSizeKb: Number(fileSizeKb) || 2048,
    });

    return NextResponse.json({ success: true, note: newNote });
  } catch (error) {
    console.error('Note add error:', error);
    return NextResponse.json({ error: 'Failed to add note' }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id } = await req.json();
    if (id) {
      DataStore.incrementNoteDownloads(id);
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
