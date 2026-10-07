'use client';

import React, { useState, useEffect } from 'react';
import { WifiOff, AlertTriangle } from 'lucide-react';

export default function OfflineBanner() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="fixed top-16 left-0 right-0 z-50 px-4 py-2 bg-gradient-to-r from-red-600 via-amber-600 to-red-600 text-white text-xs sm:text-sm font-medium shadow-lg animate-pulse flex items-center justify-center gap-2">
      <WifiOff className="w-4 h-4 shrink-0" />
      <span>
        आप ऑफलाइन हैं! वीडियो चलाने और नए टेस्ट के लिए इंटरनेट ऑन रखें (Internet connection required for video streaming & live sync).
      </span>
    </div>
  );
}
