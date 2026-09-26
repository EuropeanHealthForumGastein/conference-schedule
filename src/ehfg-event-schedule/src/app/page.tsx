'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useSessions } from '../hooks';
import {
  Header,
  RoomColumn,
  LoadingScreen,
  NoSessionsToday,
  ScheduleError,
  TimeDebugger,
} from '../components';

function HomeContent() {
  const searchParams = useSearchParams();
  const showDebugger = searchParams.get('debug') === 'true';
  const hoursParam = searchParams.get('hours');

  const {
    loading,
    error,
    now,
    activeDate,
    roomColumns,
    timeOffset,
    addHours,
    addMinutes,
    addDays,
    resetTime,
    setTimeOffsetTo,
  } = useSessions();

  // Apply hour offset from URL parameter
  useEffect(() => {
    if (hoursParam) {
      const hours = parseFloat(hoursParam);
      if (!isNaN(hours)) {
        // Convert hours to milliseconds and set the offset
        const milliseconds = hours * 60 * 60 * 1000;
        setTimeOffsetTo(milliseconds);
      }
    }
  }, [hoursParam, setTimeOffsetTo]);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ScheduleError message={error} />;
  }

  return (
    <div className="h-full w-full overflow-hidden text-neutral-100 font-sans">
      <Header activeDate={activeDate} now={now} />

      {/* Time Debugger for testing - only show when ?debug=true */}
      {showDebugger && (
        <TimeDebugger
          now={now}
          timeOffset={timeOffset}
          addHours={addHours}
          addMinutes={addMinutes}
          addDays={addDays}
          resetTime={resetTime}
          setTimeOffsetTo={setTimeOffsetTo}
        />
      )}

      {/* Main content - room columns */}
      <main className="w-full px-[5%] pt-10 pb-20">
        <div className="w-full max-w-[95%] mx-auto flex flex-wrap justify-center items-start gap-16">
          {roomColumns.length > 0 ? (
            roomColumns.map((rc) => (
              <div
                key={rc.location}
                className="w-[calc(33%-2rem)] flex-shrink-0"
              >
                <RoomColumn data={rc} now={now} />
              </div>
            ))
          ) : (
            <NoSessionsToday />
          )}
        </div>
      </main>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomeContent />
    </Suspense>
  );
}
