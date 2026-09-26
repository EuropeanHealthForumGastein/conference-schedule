import React from 'react';
import Image from 'next/image';
import { Speaker } from '../types/speaker';

interface SpeakerCardProps {
  speaker: Speaker;
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ speaker }: { speaker: Speaker }) {
  const initials = getInitials(speaker.speaker);

  if (!speaker.image) {
    return (
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 ring-2 ring-white/20">
        {initials}
      </div>
    );
  }

  return (
    <div className="w-20 h-20 rounded-full overflow-hidden bg-neutral-600 flex-shrink-0 ring-2 ring-white/20">
      <Image
        src={speaker.image}
        alt={speaker.speaker}
        width={80}
        height={80}
        className="w-full h-full object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold">${initials}</div>`;
          }
        }}
      />
    </div>
  );
}

export default function SpeakerCard({ speaker }: SpeakerCardProps) {
  return (
    <div className="flex items-center gap-4 w-full bg-black/20 rounded-xl py-4 px-4 border border-white/10">
      <Avatar speaker={speaker} />
      <div className="flex-1 min-w-0">
        <p className="text-2xl font-semibold text-white truncate">
          {speaker.speaker}
        </p>
        {speaker.organisation && (
          <p className="text-xl text-neutral-300 truncate mt-0.5">
            {speaker.organisation}
          </p>
        )}
      </div>
    </div>
  );
}
