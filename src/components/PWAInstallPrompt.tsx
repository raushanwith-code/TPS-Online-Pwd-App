'use client';

import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, Smartphone } from 'lucide-react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already running standalone
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Check if dismissed recently
    const dismissedAt = localStorage.getItem('tps_pwa_dismissed');
    if (dismissedAt && Date.now() - Number(dismissedAt) < 24 * 60 * 60 * 1000) {
      // Don't disturb within 24h unless user manually clicks
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch((err) => {
        console.log('SW registration failed:', err);
      });
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // If native prompt is not yet ready or iOS
      alert('📱 ऐप इंस्टॉल करने के लिए अपने Chrome ब्राउज़र के 3 डॉट्स (⋮) पर क्लिक करें और "Add to Home screen" या "Install App" चुनें!');
      return;
    }

    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('tps_pwa_dismissed', Date.now().toString());
    setShowPrompt(false);
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 left-4 md:left-auto md:w-96 z-50 animate-bounce-short">
      <div className="relative glass-panel rounded-2xl p-4 shadow-2xl border border-sky-400/30 bg-space-900/90 backdrop-blur-xl">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-sky-500/40 bg-black flex items-center justify-center shadow-lg shadow-sky-500/20">
            <Image
              src="/logo.png"
              alt="TPS Online Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>

          <div className="flex-1 pr-4">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-sky-400" /> 2099 Mobile App
              </span>
            </div>
            <h4 className="text-sm font-bold text-white leading-snug mt-0.5">
              TPS ONLINE CLASSES
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              मोबाइल में सीधे 1-क्लिक से इंस्टॉल करें और सबसे तेज पढ़ाई करें।
            </p>
          </div>
        </div>

        <div className="mt-3.5 flex items-center gap-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 py-2 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-sky-500/30 transition-transform active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>INSTALL TPS</span>
          </button>
          <button
            onClick={handleDismiss}
            className="py-2 px-3 rounded-xl text-xs text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
