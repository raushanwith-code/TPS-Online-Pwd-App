import { NextRequest, NextResponse } from 'next/server';

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const clean = url.trim();

  // Pattern 1: youtu.be/ID
  const shortMatch = clean.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (shortMatch) return shortMatch[1];

  // Pattern 2: youtube.com/watch?v=ID
  const watchMatch = clean.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watchMatch) return watchMatch[1];

  // Pattern 3: youtube.com/shorts/ID
  const shortsMatch = clean.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shortsMatch) return shortsMatch[1];

  // Pattern 4: youtube.com/embed/ID
  const embedMatch = clean.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embedMatch) return embedMatch[1];

  // Direct 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) return clean;

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'YouTube URL is required' }, { status: 400 });
    }

    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return NextResponse.json(
        { error: 'Invalid YouTube URL. Please provide a valid watch, youtu.be or shorts link.' },
        { status: 400 }
      );
    }

    const fallbackThumbnail = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    let title = `TPS Class 10 Lecture (${videoId})`;
    let author = 'TPS ONLINE CLASSES';

    try {
      const oembedRes = await fetch(
        `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
        { next: { revalidate: 3600 } }
      );
      if (oembedRes.ok) {
        const data = await oembedRes.json();
        title = data.title || title;
        author = data.author_name || author;
      }
    } catch {
      // Fallback works automatically
    }

    return NextResponse.json({
      success: true,
      videoId,
      title,
      author,
      thumbnailUrl: fallbackThumbnail,
      embedUrl: `https://www.youtube.com/embed/${videoId}`,
    });
  } catch (err) {
    console.error('oEmbed fetch error:', err);
    return NextResponse.json({ error: 'Failed to inspect YouTube video' }, { status: 500 });
  }
}
