import { formatDateLong, formatClock } from '../utils/session-utils';

interface HeaderProps {
  activeDate: string;
  now: Date;
}

export default function Header({ activeDate, now }: HeaderProps) {
  return (
    <header className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-4 sm:pb-6 md:pb-8 flex flex-col xl:flex-row items-center xl:items-end justify-between gap-6 sm:gap-8 md:gap-10">
      <div className="flex flex-col items-center xl:items-start">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[4.5rem] 3xl:text-[5.5rem] 4xl:text-[6rem] font-black tracking-tight bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-200 animate-gradientShift drop-shadow-md text-center xl:text-left uppercase">
          Live Schedule
        </h1>
        <p className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl 4xl:text-6xl font-medium text-neutral-200 tracking-wide text-center xl:text-left">
          European Health Forum Gastein 2026
        </p>
        <p className="mt-1 sm:mt-2 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl text-neutral-100 text-center xl:text-left font-light">
          {activeDate ? formatDateLong(activeDate) : ''}
        </p>
      </div>
      <div className="flex flex-col items-center xl:items-end">
        <div className="font-mono font-black tracking-tight text-[4rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] xl:text-[8rem] 2xl:text-[9.5rem] 3xl:text-[12rem] 4xl:text-[15rem] leading-none bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent drop-shadow-lg">
          {formatClock(now)}
        </div>
      </div>
    </header>
  );
}
