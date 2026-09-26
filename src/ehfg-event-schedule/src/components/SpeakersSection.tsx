import React, { useState, useEffect } from 'react';
import { Speaker } from '../types/speaker';
import { SpeakerCard } from '.';

interface SpeakerTickerProps {
  speakers: Speaker[];
  className?: string;
}

export default function SpeakersSection({
  speakers,
  className = '',
}: SpeakerTickerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Group speakers into pairs
  const speakerPairs = React.useMemo(() => {
    const pairs: Speaker[][] = [];
    for (let i = 0; i < speakers.length; i += 2) {
      pairs.push(speakers.slice(i, i + 2));
    }
    return pairs;
  }, [speakers]);

  // Switch between speaker pairs every 5 seconds
  useEffect(() => {
    if (speakerPairs.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % speakerPairs.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [speakerPairs.length]);

  if (!speakers || speakers.length === 0) return null;

  const currentSpeakers = speakerPairs[currentIndex] || [];

  return (
    <div className={`mt-2 ${className}`}>
      <p className="text-2xl text-neutral-100 mb-3 font-medium">Speakers</p>
      <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10">
        <div
          key={currentIndex}
          className="flex py-4 px-4 gap-4 animate-fadeInUp"
        >
          {currentSpeakers.map((speaker, idx) => (
            <div
              key={`${speaker.speaker}-${currentIndex}-${idx}`}
              className="flex-1 max-w-[calc(50%-0.5rem)]"
            >
              <SpeakerCard speaker={speaker} />
            </div>
          ))}
        </div>
        {speakerPairs.length > 1 && (
          <div className="flex justify-center gap-2 pb-3">
            {speakerPairs.map((_, idx) => (
              <span
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-white/80' : 'w-2 bg-white/30'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
