interface SessionProgressBarProps {
  progress: number; // 0-100
  accentFrom: string;
  accentTo: string;
  className?: string;
}

export function SessionProgressBar({
  progress,
  accentFrom,
  accentTo,
  className = 'mt-4',
}: SessionProgressBarProps) {
  return (
    <div
      className={`${className} w-full bg-neutral-700/50 rounded-full h-4 overflow-hidden`}
    >
      <div
        className={`h-full bg-gradient-to-r ${accentFrom} ${accentTo} transition-all duration-300`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
