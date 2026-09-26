import { formatDateLong, formatClock } from '../utils/session-utils';

interface HeaderProps {
  activeDate: string;
  now: Date;
}

export default function Header({ activeDate, now }: HeaderProps) {
  return (
    <header className="w-full px-20 pt-12 pb-8 flex flex-row items-end justify-between gap-10">
      <div className="flex flex-col items-start">
        <h1 className="text-[6rem] font-black tracking-tight bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-200 animate-gradientShift drop-shadow-md text-left uppercase">
          Live Schedule
        </h1>
        <p className="mt-4 text-6xl font-medium text-neutral-200 tracking-wide text-left">
          European Health Forum Gastein 2026
        </p>
        <p className="mt-2 text-5xl text-neutral-100 text-left font-light">
          {activeDate ? formatDateLong(activeDate) : ''}
        </p>
      </div>
      <div className="flex flex-col items-end">
        <div className="font-mono font-black tracking-tight text-[15rem] leading-none bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent drop-shadow-lg">
          {formatClock(now)}
        </div>
      </div>
    </header>
  );
}
