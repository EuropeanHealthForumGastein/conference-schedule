interface SessionTitleSectionProps {
  shortId: string;
  title: string;
  badgeClass: string; // color class for text inside badge
  subtitle?: string;
  subtitleClass?: string;
}

export function SessionTitleSection({
  shortId,
  title,
  badgeClass,
  subtitle,
  subtitleClass = '',
}: SessionTitleSectionProps) {
  return (
    <div className="relative z-10">
      <div className="flex items-center gap-3 mb-3 bg-black/20 line-clamp-3 shadow-lg rounded-lg px-4 py-3">
        <span
          className={`flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full text-3xl font-semibold uppercase tracking-wider ${badgeClass} bg-black/20 border border-white/10`}
        >
          {shortId}
        </span>
        <h3 className="flex-1 min-w-0 text-5xl leading-relaxed font-bold mb-2 text-white relative z-10 rounded-lg px-2 py-1 line-clamp-3">
          {title}
        </h3>
      </div>
      {subtitle && (
        <p
          className={`text-4xl font-light mb-1 line-clamp-2 relative z-10 ${subtitleClass}`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
