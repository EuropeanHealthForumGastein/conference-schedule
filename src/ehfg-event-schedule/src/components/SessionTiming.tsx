import { formatClock, parseStart, parseEnd } from '../utils/session-utils';
import { Session } from '../types/session';

interface SessionTimingProps {
  session: Session;
}

export function SessionTiming({ session }: SessionTimingProps) {
  const start = parseStart(session);
  const end = parseEnd(session);

  return (
    <div className="flex flex-col items-end text-right">
      <span className="text-4xl text-neutral-100 font-semibold">
        {formatClock(start)} - {formatClock(end)}
      </span>
      <span className="text-3xl text-neutral-300 mt-0.5 italic">
        {session.location}
      </span>
    </div>
  );
}
