import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { Session } from '../types/session';
import {
  DISPLAY_CATEGORIES,
  parseEnd,
  parseStart,
} from '../utils/session-utils';

const sessions = JSON.parse(
  readFileSync(resolve(process.cwd(), 'public/sessions.json'), 'utf8')
) as Session[];

const displayedSessions = sessions.filter((session) =>
  DISPLAY_CATEGORIES.has(session.eventcategory)
);

describe('sessions.json', () => {
  it('contains a non-empty schedule and displayable sessions', () => {
    expect(Array.isArray(sessions)).toBe(true);
    expect(sessions.length).toBeGreaterThan(0);
    expect(displayedSessions.length).toBeGreaterThan(0);
  });

  it.each(displayedSessions)(
    '$eventshortid has the fields and times required by the schedule UI',
    (session) => {
      expect(session.eventname.trim()).not.toBe('');
      expect(session.eventshortid.trim()).not.toBe('');
      expect(session.location.trim()).not.toBe('');
      expect(session.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(session.start).toMatch(/^\d{2}:\d{2}$/);
      expect(session.end).toMatch(/^\d{2}:\d{2}$/);
      expect(parseStart(session).getTime()).not.toBeNaN();
      expect(parseEnd(session).getTime()).toBeGreaterThan(
        parseStart(session).getTime()
      );
    }
  );
});
