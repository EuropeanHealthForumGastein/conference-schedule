import Image from 'next/image';
import { assetPath } from '@/utils/assetPath';

export default function NoSessionsToday() {
  return (
    <div className="absolute inset-0 m-auto flex flex-col gap-8 items-center justify-center text-white max-w-full max-h-full">
      <Image
        src={assetPath('ehfg-white.svg')}
        alt="EHFG Logo"
        width={120}
        height={118}
        className="animate-spin [animation-duration:4s] mb-4 w-30 h-auto"
        draggable={false}
        priority
      />
      <p className="text-6xl tracking-wide font-medium">
        No more sessions scheduled for today.
      </p>
      <p className="text-6xl tracking-wide font-light text-neutral-100">
        Thank you for participating!
      </p>
    </div>
  );
}
