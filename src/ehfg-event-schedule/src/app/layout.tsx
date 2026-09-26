import type { Metadata } from 'next';
import './globals.css';
import { sailec } from './fonts';
import { assetPath } from '@/utils/assetPath';
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'EHFG Live Schedule',
  description: 'Live multi-room conference schedule with real-time updates',
  icons: {
    icon: `${base}/favicon.ico`,
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`h-full ${sailec.variable}`}>
      <head>
        <link rel="icon" href={assetPath('favicon.ico')} />
      </head>
      <body
        style={{
          // The supplied 2026 artwork contains two transparent foreground layers.
          // Draw the blue yearly-look field in CSS so it stays smooth at any size.
          backgroundImage: [
            `url("${assetPath('ehfg-2026-stars.png')}")`,
            `url("${assetPath('ehfg-2026-strips.png')}")`,
            'radial-gradient(ellipse at 62% 8%, rgba(140, 174, 210, 0.92) 0%, rgba(53, 102, 169, 0.44) 25%, rgba(17, 55, 132, 0) 50%)',
            'linear-gradient(160deg, #19499a 0%, #10377f 43%, #160540 100%)',
          ].join(', '),
          backgroundPosition: 'center, 69% top, center, center',
          backgroundSize: '100% 100%, auto 112%, cover, cover',
          backgroundRepeat: 'no-repeat',
        }}
        className="antialiased min-h-screen h-full bg-[#160540] bg-fixed relative overflow-hidden"
      >
        {children}
      </body>
    </html>
  );
}
