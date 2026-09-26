import type { Metadata } from 'next';
import Image from 'next/image';
import './globals.css';
import { sailec } from './fonts';
import { assetPath } from '@/utils/assetPath';
import ScaleStage from '@/components/ScaleStage';
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
          backgroundImage: [
            'radial-gradient(ellipse at 62% 8%, rgba(140, 174, 210, 0.92) 0%, rgba(53, 102, 169, 0.44) 25%, rgba(17, 55, 132, 0) 50%)',
            'linear-gradient(160deg, #19499a 0%, #10377f 43%, #160540 100%)',
          ].join(', '),
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
        className="antialiased min-h-screen h-full bg-[#160540] bg-fixed relative overflow-hidden"
      >
        {/* Decorative art always fills the real viewport, independent of the scaled schedule canvas */}
        <div className="yearly-look-art" aria-hidden="true">
          <Image
            src={assetPath('ehfg-2026-strips.png')}
            alt=""
            width={3840}
            height={4312}
            className="yearly-look-strips"
            priority
          />
          <Image
            src={assetPath('ehfg-2026-stars.png')}
            alt=""
            width={3840}
            height={3076}
            className="yearly-look-stars"
            priority
          />
        </div>
        <ScaleStage>{children}</ScaleStage>
      </body>
    </html>
  );
}
