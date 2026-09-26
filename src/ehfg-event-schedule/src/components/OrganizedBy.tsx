import React from 'react';

interface HeadlineTickerProps {
  headline: string;
  className?: string;
  /** Force low performance mode for slower devices */
  lowPerformanceMode?: boolean;
  /** Completely disable animations for extreme performance cases */
  disableAnimation?: boolean;
}

const OrganizedBy = React.memo(function HeadlineTicker({
  headline,
  className = '',
}: HeadlineTickerProps) {

  // Early return to avoid unnecessary rendering
  if (!headline?.trim()) return null;

  return (
      <div
        className={`w-full overflow-hidden rounded-lg border border-white/10 mt-4 ${className}`}
      >
        <div className="px-4 py-2">
          <span className="text-2xl font-medium text-neutral-100">
            {headline}
          </span>
        </div>
      </div>
    );
});

export default OrganizedBy;
