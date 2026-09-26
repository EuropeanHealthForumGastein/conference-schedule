import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Session } from '../types/session';
import { useSessions } from './useSessions';

const sessions: Session[] = [
  {
    eventname: 'Current &amp; important',
    eventshortid: 'S1',
    date: '2026-09-29',
    start: '10:00',
    end: '11:00',
    location: 'Conference Centre',
    headline: 'Health &amp; care',
    description: '',
    eventcategory: 'Session',
  },
  {
    eventname: 'Coming next',
    eventshortid: 'S2',
    date: '2026-09-29',
    start: '11:15',
    end: '12:00',
    location: 'Conference Centre',
    description: '',
    eventcategory: 'Plenary',
  },
  {
    eventname: 'Not displayed',
    eventshortid: 'W1',
    date: '2026-09-29',
    start: '10:00',
    end: '11:00',
    location: 'Kursaal',
    description: '',
    eventcategory: 'Workshop',
  },
];

describe('useSessions', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.setSystemTime(new Date('2026-09-29T08:30:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it('loads, decodes, filters, and groups the schedule', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue(sessions),
      })
    );

    const { result } = renderHook(() => useSessions());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(fetch).toHaveBeenCalledWith('sessions.json');
    expect(result.current.error).toBeNull();
    expect(result.current.sessions[0].eventname).toBe('Current & important');
    expect(result.current.roomColumns).toHaveLength(1);
    expect(result.current.roomColumns[0].current?.eventshortid).toBe('S1');
    expect(result.current.roomColumns[0].upcoming?.eventshortid).toBe('S2');
  });

  it('exposes a friendly error when the request fails', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 500,
      })
    );

    const { result } = renderHook(() => useSessions());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toMatch(/could not be loaded/i);
    expect(result.current.roomColumns).toEqual([]);
  });

  it('supports moving the displayed time for schedule previews', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: vi.fn().mockResolvedValue([]),
      })
    );

    const { result } = renderHook(() => useSessions());
    await waitFor(() => expect(result.current.loading).toBe(false));

    act(() => result.current.addHours(2));
    expect(result.current.now.toISOString()).toBe('2026-09-29T10:30:00.000Z');

    act(() => result.current.resetTime());
    expect(result.current.now.toISOString()).toBe('2026-09-29T08:30:00.000Z');
  });
});
