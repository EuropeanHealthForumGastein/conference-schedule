import { Session } from '../types/session';
import { getSessionProgress, getCountdown } from '../utils/session-utils';
import { COLOR_CFG } from '../utils/colors';
import SpeakersTicker from './SpeakersSection';
import OrganizedByTicker from './OrganizedBy';
import { SessionTiming } from './SessionTiming';
import { SessionTitleSection } from './SessionTitleSection';
import { SessionProgressBar } from './SessionProgressBar';

interface SessionBlockProps {
  session: Session;
  variant: 'current' | 'upcoming';
  now: Date;
}

// Visual-only window used to approximate a "starts in" fill for upcoming sessions
const NEXT_WINDOW_MINUTES = 90;

export default function SessionBlock({
  session,
  variant,
  now,
}: SessionBlockProps) {
  const isCurrent = variant === 'current';
  const isNetworking = session.eventcategory
    .toLowerCase()
    .includes('networking');
  const cfg = isNetworking
    ? COLOR_CFG.networking
    : isCurrent
      ? COLOR_CFG.current
      : COLOR_CFG.next;

  const progress = isCurrent ? getSessionProgress(session, now) : undefined;
  const countdown = !isCurrent ? getCountdown(session, now) : null;
  const label = isCurrent ? 'Now' : 'Next';

  const barProgress =
    typeof progress === 'number'
      ? progress
      : countdown
        ? 100 - Math.min(100, (countdown.minutes / NEXT_WINDOW_MINUTES) * 100)
        : 0;

  const caption =
    typeof progress === 'number'
      ? `${progress.toFixed(0)}% elapsed`
      : countdown
        ? `Starts in ${countdown.label}`
        : null;

  return (
    <div
      className={`relative rounded-2xl p-14 overflow-hidden border ${cfg.border} ring-1 ring-white/10 flex flex-col bg-gradient-to-br from-slate-900/55 to-slate-900/35 shadow-[0_12px_32px_rgba(0,0,0,0.55),0_3px_10px_rgba(0,0,0,0.4)] animate-fadeInUp`}
    >
      <div
        className={`absolute inset-0 opacity-20 pointer-events-none bg-gradient-to-br ${cfg.accentFrom} via-transparent ${cfg.accentTo}`}
      />
      <div className="relative z-10 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center rounded-full px-4 py-1.5 text-2xl font-bold uppercase tracking-widest shadow-md ${cfg.badge}`}
        >
          {label}
        </span>
        <SessionTiming session={session} />
      </div>

      <div className="relative z-10 mt-3">
        {caption && (
          <div className="flex justify-end mb-1.5">
            <span
              className={`text-2xl font-semibold uppercase tracking-wide ${cfg.label}`}
            >
              {caption}
            </span>
          </div>
        )}
        <SessionProgressBar
          progress={barProgress}
          accentFrom={cfg.accentFrom}
          accentTo={cfg.accentTo}
          className="w-full"
        />
      </div>

      <div className="mt-8 relative z-10">
        <SessionTitleSection
          shortId={session.eventshortid}
          title={session.eventname}
          badgeClass={cfg.label}
          subtitle={session.subtitle}
          subtitleClass={cfg.subtitle}
        />
        {session.headline && (
          <div className="mb-5 relative z-10">
            <OrganizedByTicker headline={session.headline} />
          </div>
        )}
        {session.speakers && session.speakers.length > 0 && (
          <SpeakersTicker speakers={session.speakers} />
        )}
      </div>
    </div>
  );
}
