'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Sparkles, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        router.push(data.user.role === 'ADMIN' ? '/admin' : '/dashboard');
      } else {
        setError(data.error || 'लॉगिन विफल रहा');
      }
    } catch {
      setError('सर्वर से संपर्क नहीं हो सका');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md glass-panel p-6 sm:p-8 rounded-3xl border border-sky-500/30 shadow-2xl space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-sky-400/30 bg-black/50 p-1 mx-auto shadow-lg shadow-sky-500/20">
            <Image
              src="/logo.png"
              alt="TPS Online Classes"
              width={56}
              height={56}
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white">
            लॉगिन करें (Sign In)
          </h1>
          <p className="text-xs text-slate-400">
            TPS ONLINE CLASSES • बिहार बोर्ड 10वीं मंच
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              ईमेल (Email):
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@tpsonlineclasses.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-300 font-semibold block mb-1">
              पासवर्ड (Password):
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
          >
            <span>{loading ? 'लॉगिन हो रहा है...' : 'लॉगिन करें (Sign In)'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* 1-Click Demo Buttons for Instant Evaluation */}
        <div className="pt-2 border-t border-white/10 space-y-2">
          <p className="text-[10px] text-center text-slate-400 uppercase font-semibold">
            त्वरित परीक्षण (Quick Test Credentials)
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleQuickDemo('student@tpsonlineclasses.com', 'student123')}
              className="py-1.5 px-2 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/20 text-[11px] font-medium flex items-center justify-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>विद्यार्थी (Student)</span>
            </button>
            <button
              onClick={() => handleQuickDemo('director@tpsonlineclasses.com', 'tps2099admin')}
              className="py-1.5 px-2 rounded-lg bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-500/20 text-[11px] font-medium flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>निदेशक (Director)</span>
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          खाता नहीं है?{' '}
          <Link href="/signup" className="text-sky-400 font-semibold hover:underline">
            नया खाता बनाएं (Sign Up)
          </Link>
        </p>
      </div>
    </div>
  );
}
