import { describe, expect, it } from 'vitest';
import type { Session } from '../types/session';
import {
  decodeHtmlEntities,
  getCountdown,
  getSessionProgress,
  parseEnd,
  parseStart,
} from './session-utils';

const session: Session = {
  eventname: 'Testing healthcare',
  eventshortid: 'T1',
  date: '2026-09-29',
  start: '10:00',
  end: '11:00',
  location: 'Conference Centre',
  description: '',
  eventcategory: 'Session',
};

describe('session time utilities', () => {
  it('parses conference times using the Vienna summer offset', () => {
    expect(parseStart(session).toISOString()).toBe('2026-09-29T08:00:00.000Z');
    expect(parseEnd(session).toISOString()).toBe('2026-09-29T09:00:00.000Z');
  });

  it.each([
    ['before a session', '2026-09-29T07:30:00.000Z', 0],
    ['halfway through a session', '2026-09-29T08:30:00.000Z', 50],
    ['after a session', '2026-09-29T09:30:00.000Z', 100],
  ])('calculates progress %s', (_label, now, expected) => {
    expect(getSessionProgress(session, new Date(now))).toBe(expected);
  });

  it('formats countdowns and hides them after a session starts', () => {
    expect(getCountdown(session, new Date('2026-09-29T06:29:00.000Z'))).toEqual(
      {
        label: '1h 31m',
        minutes: 91,
      }
    );
    expect(getCountdown(session, new Date('2026-09-29T07:45:00.000Z'))).toEqual(
      {
        label: '15m',
        minutes: 15,
      }
    );
    expect(
      getCountdown(session, new Date('2026-09-29T08:00:00.000Z'))
    ).toBeNull();
  });
});

describe('decodeHtmlEntities', () => {
  it('decodes supported entities while preserving unknown entities', () => {
    expect(
      decodeHtmlEntities('Health &amp; care &#039;today&#039; &copy;')
    ).toBe("Health & care 'today' &copy;");
  });

  it('returns an empty string for missing text', () => {
    expect(decodeHtmlEntities(undefined)).toBe('');
    expect(decodeHtmlEntities(null)).toBe('');
  });
});
