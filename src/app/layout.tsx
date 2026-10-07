import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import MobileBottomNav from '@/components/MobileBottomNav';
import OfflineBanner from '@/components/OfflineBanner';
import PWAInstallPrompt from '@/components/PWAInstallPrompt';

export const metadata: Metadata = {
  metadataBase: new URL('https://tpsonlineclasses.com'),
  title: 'TPS ONLINE CLASSES | The Perfect Study Centre - Bihar Board Class 10th',
  description:
    'बिहार बोर्ड 10वीं कक्षा के लिए सर्वश्रेष्ठ डिजिटल लर्निंग प्लेटफॉर्म। B.Sc. Physics Deepak Kumar Priyadarshi के मार्गदर्शन में वीडियो लेक्चर, VVI ऑब्जेक्टिव टेस्ट और नोट्स।',
  manifest: '/manifest.json',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'TPS ONLINE CLASSES - The Perfect Study Centre',
    description: 'Bihar Board Class 10th Official Learning App. 2099 Next-Gen Education.',
    url: 'https://tpsonlineclasses.com',
    siteName: 'TPS ONLINE CLASSES',
    images: [
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'TPS Online Classes Logo',
      },
    ],
    locale: 'hi_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#07090e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col selection:bg-cyan-500/30 selection:text-cyan-100">
        <div className="water-ambient">
          <div className="wave-orb"></div>
          <div className="wave-orb"></div>
          <div className="wave-orb"></div>
        </div>
        <ThemeProvider>
          {/* Offline alert banner */}
          <OfflineBanner />

          {/* Top Glass Navbar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="flex-1 pb-mobile-nav">
            {children}
          </main>

          {/* Site-wide Footer */}
          <Footer />

          {/* PWA Install Promotion modal/badge */}
          <PWAInstallPrompt />

          {/* 5-Tab Mobile Navigation */}
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
