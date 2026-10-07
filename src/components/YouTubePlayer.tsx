'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Play,
  Pause,
  FastForward,
  CheckCircle,
  WifiOff,
  RotateCcw,
  SkipBack,
  SkipForward,
  Maximize2,
  Volume2,
} from 'lucide-react';

interface YouTubePlayerProps {
  youtubeId: string;
  lectureId: string;
  title: string;
  initialPositionSec?: number;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function YouTubePlayer({
  youtubeId,
  lectureId,
  title,
  initialPositionSec = 0,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Network check
  useEffect(() => {
    setIsOffline(!navigator.onLine);
    const onOnline = () => setIsOffline(false);
    const onOff = () => setIsOffline(true);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOff);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOff);
    };
  }, []);

  // Initialize official YouTube Player API
  useEffect(() => {
    const tagId = `yt-player-${lectureId}`;

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player(tagId, {
        videoId: youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          start: initialPositionSec > 0 ? initialPositionSec : 0,
        },
        events: {
          onReady: (event: any) => {
            setIsReady(true);
            setDuration(event.target.getDuration());
            event.target.setPlaybackRate(playbackRate);
          },
          onStateChange: (event: any) => {
            // YT.PlayerState: PLAYING = 1, PAUSED = 2, ENDED = 0
            if (event.data === 1) {
              setIsPlaying(true);
            } else {
              setIsPlaying(false);
            }

            if (event.data === 0) {
              // Video ended
              handleMarkComplete();
              if (onNext) onNext();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.body.appendChild(script);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    // Interval to save progress
    const progressInterval = setInterval(() => {
      if (playerRef.current && typeof playerRef.current.getCurrentTime === 'function') {
        const curr = Math.floor(playerRef.current.getCurrentTime());
        const dur = Math.floor(playerRef.current.getDuration() || 0);
        setCurrentTime(curr);
        if (dur > 0) setDuration(dur);

        // Auto mark complete if > 85% watched
        if (dur > 0 && curr / dur > 0.85 && !isCompleted) {
          setIsCompleted(true);
        }

        // Save progress to server
        if (curr > 5) {
          fetch('/api/progress', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              lectureId,
              lastPositionSec: curr,
              completed: curr / dur > 0.85,
            }),
          }).catch(() => {});
        }
      }
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        playerRef.current.destroy();
      }
    };
  }, [youtubeId, lectureId]);

  const changeSpeed = (speed: number) => {
    setPlaybackRate(speed);
    if (playerRef.current && typeof playerRef.current.setPlaybackRate === 'function') {
      playerRef.current.setPlaybackRate(speed);
    }
  };

  const handleMarkComplete = async () => {
    setIsCompleted(true);
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lectureId,
        lastPositionSec: currentTime,
        completed: true,
      }),
    }).catch(() => {});
  };

  const formatSec = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full space-y-3">
      {/* Video Container (16:9 ratio) */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden glass-panel border border-sky-500/20 shadow-2xl bg-black">
        {/* Offline Warning Banner */}
        {isOffline && (
          <div className="absolute inset-0 z-30 bg-black/90 flex flex-col items-center justify-center p-6 text-center text-white">
            <WifiOff className="w-12 h-12 text-red-500 mb-3 animate-pulse" />
            <h4 className="text-lg font-bold text-red-400">इंटरनेट कनेक्शन नहीं है</h4>
            <p className="text-sm text-slate-300 max-w-md mt-1">
              वीडियो लेक्चर देखने के लिए कृपया अपना मोबाइल डेटा या Wi-Fi नेटवर्क चालू करें।
            </p>
          </div>
        )}

        {/* YouTube IFrame Mount Target */}
        <div id={`yt-player-${lectureId}`} className="w-full h-full" />
      </div>

      {/* 2099 Futuristic Lecture Controls Bar */}
      <div className="glass-panel p-3.5 sm:p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 border border-white/10">
        {/* Playback Speed Controls: 1x, 1.5x, 2x */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
          <span className="text-xs text-slate-400 px-2 font-medium">गति (Speed):</span>
          {[1.0, 1.5, 2.0].map((rate) => (
            <button
              key={rate}
              onClick={() => changeSpeed(rate)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                playbackRate === rate
                  ? 'bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-sm shadow-sky-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {rate}x
            </button>
          ))}
        </div>

        {/* Navigation & Mark Complete Controls */}
        <div className="flex items-center gap-2">
          {hasPrev && (
            <button
              onClick={onPrev}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="पिछला लेक्चर (Previous)"
            >
              <SkipBack className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleMarkComplete}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              isCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            }`}
          >
            <CheckCircle className={`w-3.5 h-3.5 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
            <span>{isCompleted ? 'पूर्ण हुआ (Completed)' : 'Mark Complete'}</span>
          </button>

          {hasNext && (
            <button
              onClick={onNext}
              className="p-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20 transition-transform active:scale-95"
              title="अगला लेक्चर (Next Lecture)"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
