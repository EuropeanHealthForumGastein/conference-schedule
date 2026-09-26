import { useEffect, useMemo, useState } from 'react';
import { Session } from '../types/session';
import { RoomColumnData } from '@/types/roomColumnData';
import {
  decodeHtmlEntities,
  parseStart,
  parseEnd,
  DISPLAY_CATEGORIES,
} from '../utils/session-utils';

export function useSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [baseTime, setBaseTime] = useState(new Date());
  const [timeOffset, setTimeOffset] = useState(0); // offset in milliseconds

  // Calculate the current time with offset
  const now = useMemo(
    () => new Date(baseTime.getTime() + timeOffset),
    [baseTime, timeOffset]
  );
  // Refresh time every 15 seconds for smoother progress
  useEffect(() => {
    const id = setInterval(() => setBaseTime(new Date()), 15000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // Use a relative path so it works both locally and on GitHub Pages
    setError(null);
    fetch('sessions.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Schedule request failed (${response.status})`);
        }

        return response.json();
      })
      .then((data: Session[]) => {
        if (!Array.isArray(data)) {
          throw new Error('Schedule response is not a list');
        }

        // Decode HTML entities in session data
        const decodedSessions = data.map((session) => ({
          ...session,
          eventname: decodeHtmlEntities(session.eventname),
          subtitle: decodeHtmlEntities(session.subtitle),
          headline: decodeHtmlEntities(session.headline),
          description: decodeHtmlEntities(session.description),
          speakers: session.speakers?.map((speaker) => ({
            ...speaker,
            speaker: decodeHtmlEntities(speaker.speaker),
            organisation: decodeHtmlEntities(speaker.organisation),
            biography: decodeHtmlEntities(speaker.biography),
          })),
        }));
        setSessions(decodedSessions);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load sessions', err);
        setError(
          'The schedule could not be loaded. Please check the connection and refresh the page.'
        );
        setLoading(false);
      });
  }, []);

  const activeDate = useMemo(() => {
    // Get the date in Vienna timezone to ensure proper matching with session dates
    return now.toLocaleDateString('sv-SE', { timeZone: 'Europe/Vienna' });
  }, [now]);
  const roomColumns = useMemo<RoomColumnData[]>(() => {
    if (!activeDate) return [];
    const byLoc: Record<string, Session[]> = {};
    sessions.forEach((s) => {
      if (!DISPLAY_CATEGORIES.has(s.eventcategory)) return;
      if (!byLoc[s.location || 'TBA']) byLoc[s.location || 'TBA'] = [];
      byLoc[s.location || 'TBA'].push(s);
    });

    const results: RoomColumnData[] = [];
    const timeNow = now.getTime();

    // Helper function to find current and upcoming sessions for a list of sessions
    const findCurrentAndUpcoming = (sessionList: Session[]) => {
      const sorted = sessionList
        .slice()
        .sort((a, b) => parseStart(a).getTime() - parseStart(b).getTime());
      let current: Session | null = null;
      let upcoming: Session | null = null;

      // Find current session
      for (const s of sorted) {
        if (s.date !== activeDate) continue;
        const start = parseStart(s).getTime();
        const end = parseEnd(s).getTime();
        if (timeNow >= start && timeNow <= end) {
          current = s;
          break;
        }
      }

      // Find upcoming session
      if (!current) {
        for (const s of sorted) {
          if (s.date !== activeDate) continue;
          if (parseStart(s).getTime() > timeNow) {
            upcoming = s;
            break;
          }
        }
      } else {
        for (const s of sorted) {
          if (s.date !== activeDate) continue;
          if (parseStart(s).getTime() > parseStart(current).getTime()) {
            upcoming = s;
            break;
          }
        }
      }

      return { current, upcoming };
    };

    // 1. Conference Centre column
    if (byLoc['Conference Centre']) {
      const { current, upcoming } = findCurrentAndUpcoming(
        byLoc['Conference Centre']
      );
      if (current || upcoming) {
        results.push({
          location: 'Conference Centre',
          current,
          upcoming,
          sortTime: current
            ? parseStart(current).getTime()
            : upcoming
              ? parseStart(upcoming).getTime()
              : Number.MAX_SAFE_INTEGER,
        });
      }
    }

    // 2. Kursaal column
    if (byLoc['Kursaal']) {
      const { current, upcoming } = findCurrentAndUpcoming(byLoc['Kursaal']);
      if (current || upcoming) {
        results.push({
          location: 'Kursaal',
          current,
          upcoming,
          sortTime: current
            ? parseStart(current).getTime()
            : upcoming
              ? parseStart(upcoming).getTime()
              : Number.MAX_SAFE_INTEGER,
        });
      }
    }

    // 3. Other Rooms column (combine all other locations)
    const otherRoomSessions: Session[] = [];
    Object.entries(byLoc).forEach(([location, sessions]) => {
      if (location !== 'Conference Centre' && location !== 'Kursaal') {
        otherRoomSessions.push(...sessions);
      }
    });

    if (otherRoomSessions.length > 0) {
      const { current, upcoming } = findCurrentAndUpcoming(otherRoomSessions);
      if (current || upcoming) {
        results.push({
          location: 'Other Rooms',
          current,
          upcoming,
          sortTime: current
            ? parseStart(current).getTime()
            : upcoming
              ? parseStart(upcoming).getTime()
              : Number.MAX_SAFE_INTEGER,
        });
      }
    }

    // Return in the specified order: Conference Centre, Kursaal, Other Rooms
    return results;
  }, [sessions, activeDate, now]);

  // Utility functions for time manipulation (for testing)
  const addTimeOffset = (milliseconds: number) => {
    setTimeOffset((prev) => prev + milliseconds);
  };

  const setTimeOffsetTo = (milliseconds: number) => {
    setTimeOffset(milliseconds);
  };

  const resetTime = () => {
    setTimeOffset(0);
  };

  const addHours = (hours: number) => {
    addTimeOffset(hours * 60 * 60 * 1000);
  };

  const addMinutes = (minutes: number) => {
    addTimeOffset(minutes * 60 * 1000);
  };

  const addDays = (days: number) => {
    addTimeOffset(days * 24 * 60 * 60 * 1000);
  };

  return {
    sessions,
    loading,
    error,
    now,
    activeDate,
    roomColumns,
    // Time manipulation functions for testing
    timeOffset,
    addTimeOffset,
    setTimeOffsetTo,
    resetTime,
    addHours,
    addMinutes,
    addDays,
  };
}
