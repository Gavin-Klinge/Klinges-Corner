import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Consistency Fit',
  description: 'Sustainable fat-loss accountability app focused on consistency over perfection.',
  manifest: '/manifest.webmanifest',
  applicationName: 'Consistency Fit',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Consistency Fit',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-touch-icon.svg',
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: '#07080b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
