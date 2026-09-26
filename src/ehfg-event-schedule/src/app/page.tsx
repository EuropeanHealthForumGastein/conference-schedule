'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { assetPath } from '@/utils/assetPath';
import { useSessions } from '../hooks';
import {
  Header,
  RoomColumn,
  LoadingScreen,
  NoSessionsToday,
  TimeDebugger,
} from '../components';

function HomeContent() {
  const searchParams = useSearchParams();
  const showDebugger = searchParams.get('debug') === 'true';
  const hoursParam = searchParams.get('hours');

  const {
    loading,
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
  return (
    <>
      <div className="min-h-screen w-full overflow-hidden bg-black/20 text-neutral-100 font-sans">
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
        <main className="w-full px-[5%] pt-8 sm:pt-8 md:pt-10 lg:pt-10 xl:pt-10 2xl:pt-10 3xl:pt-10 4xl:pt-10 5xl:pt-10 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <div className="w-full max-w-[95%] mx-auto flex flex-wrap justify-center items-start gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14 2xl:gap-16">
            {roomColumns.length > 0 ? (
              roomColumns.map((rc) => (
                <div
                  key={rc.location}
                  className="w-full md:w-[calc(49%-1.25rem)] xl:w-[calc(33%-2rem)] flex-shrink-0"
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

      {/* EU Co-funding acknowledgment - improved spacing & responsive layout */}
      <div className="fixed bottom-4 right-4 z-50 w-[min(100%,580px)] text-white">
        <div className="flex flex-col items-start text-block">
          <Image
            src={assetPath('EN_Co-fundedbytheEU_RGB_WHITE Outline.png')}
            alt="Co-funded by the European Union"
            width={420}
            height={90}
            className=""
            priority
          />
          <div>
            <p className="text-md font-semibold text-neutral-50">Co-funded by the European Union.</p>
            <p className="text-md leading-snug text-neutral-100">
              Views and opinions expressed are however those of the author(s) only and do not necessarily reflect those of the European Union or the European Health and Digital Executive Agency (HaDEA). Neither the European Union nor the granting authority can be held responsible for them.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <HomeContent />
    </Suspense>
  );
}
