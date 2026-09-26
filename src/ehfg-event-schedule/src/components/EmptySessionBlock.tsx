interface EmptySessionBlockProps {
  variant: 'current' | 'upcoming';
}

export default function EmptySessionBlock({ variant }: EmptySessionBlockProps) {
  const isCurrent = variant === 'current';
  const message = isCurrent
    ? 'No session in progress'
    : 'No later session today';

  return (
    <div
      className={`rounded-2xl border border-dashed border-white/15 bg-white/[0.03] text-neutral-400 flex flex-col items-center justify-center gap-3 text-center p-10 text-3xl ${
        isCurrent ? 'h-[320px]' : 'h-[280px]'
      }`}
    >
      <svg
        className="w-10 h-10 opacity-40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <p className="font-medium">{message}</p>
    </div>
  );
}
