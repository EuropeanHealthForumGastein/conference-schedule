import Image from 'next/image';
import { assetPath } from '@/utils/assetPath';

interface ScheduleErrorProps {
  message: string;
}

export default function ScheduleError({ message }: ScheduleErrorProps) {
  return (
    <div
      role="alert"
      className="min-h-screen w-full flex flex-col gap-6 items-center justify-center bg-opacity-20 bg-black backdrop-blur text-neutral-100 px-8 text-center"
    >
      <Image
        src={assetPath('ehfg-white.svg')}
        alt="EHFG Logo"
        width={120}
        height={120}
        className="mb-4 w-30 h-30"
        draggable={false}
        priority
      />
      <h1 className="text-5xl font-medium tracking-wide">
        Schedule unavailable
      </h1>
      <p className="max-w-4xl text-3xl font-light text-neutral-200">
        {message}
      </p>
    </div>
  );
}
