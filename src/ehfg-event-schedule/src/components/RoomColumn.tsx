import { RoomColumnData } from '@/types/roomColumnData';
import SessionBlock from './SessionBlock';
import EmptySessionBlock from './EmptySessionBlock';

interface RoomColumnProps {
  data: RoomColumnData;
  now: Date;
}

export default function RoomColumn({ data, now }: RoomColumnProps) {
  return (
    <div className="flex flex-col gap-14 w-full h-full">
      <div className="sticky top-0 z-20 py-1">
        <h2 className="text-6xl font-black tracking-tight text-center bg-gradient-to-r from-emerald-200 via-cyan-200 to-sky-300 text-transparent bg-clip-text uppercase">
          {data.location}
        </h2>
      </div>

      {data.current ? (
        <SessionBlock session={data.current} variant="current" now={now} />
      ) : (
        <EmptySessionBlock variant="current" />
      )}

      {data.upcoming ? (
        <SessionBlock session={data.upcoming} variant="upcoming" now={now} />
      ) : (
        <EmptySessionBlock variant="upcoming" />
      )}
    </div>
  );
}
