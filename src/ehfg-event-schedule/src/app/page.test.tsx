import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Session } from '../types/session';
import Home from './page';

const mockUseSessions = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock('next/image', () => ({
  default: ({
    priority,
    alt = '',
    ...props
  }: React.ComponentProps<'img'> & { priority?: boolean }) => {
    void priority;
    return (
      // next/image behavior itself is outside this app's responsibility.
      // eslint-disable-next-line @next/next/no-img-element
      <img alt={alt} {...props} />
    );
  },
}));

vi.mock('../hooks', () => ({
  useSessions: () => mockUseSessions(),
}));

const currentSession: Session = {
  eventname: 'A healthy test session',
  eventshortid: 'S1',
  date: '2026-09-29',
  start: '10:00',
  end: '11:00',
  location: 'Conference Centre',
  description: '',
  eventcategory: 'Session',
};

const defaultState = {
  loading: false,
  error: null,
  now: new Date('2026-09-29T08:30:00.000Z'),
  activeDate: '2026-09-29',
  roomColumns: [],
  timeOffset: 0,
  addHours: vi.fn(),
  addMinutes: vi.fn(),
  addDays: vi.fn(),
  resetTime: vi.fn(),
  setTimeOffsetTo: vi.fn(),
};

describe('schedule page states', () => {
  beforeEach(() => {
    mockUseSessions.mockReset();
  });

  it('shows the loading state while data is being fetched', () => {
    mockUseSessions.mockReturnValue({ ...defaultState, loading: true });

    render(<Home />);

    expect(screen.getByText('Loading schedule…')).toBeInTheDocument();
  });

  it('shows a clear error instead of an empty schedule when loading fails', () => {
    mockUseSessions.mockReturnValue({
      ...defaultState,
      error: 'The schedule could not be loaded. Please refresh the page.',
    });

    render(<Home />);

    expect(screen.getByRole('alert')).toHaveTextContent('Schedule unavailable');
    expect(screen.getByRole('alert')).toHaveTextContent(/could not be loaded/i);
    expect(screen.queryByText(/No more sessions/i)).not.toBeInTheDocument();
  });

  it('shows the empty state after a successful load with no active sessions', () => {
    mockUseSessions.mockReturnValue(defaultState);

    render(<Home />);

    expect(
      screen.getByText('No more sessions scheduled for today.')
    ).toBeInTheDocument();
  });

  it('renders current session details in their room column', () => {
    mockUseSessions.mockReturnValue({
      ...defaultState,
      roomColumns: [
        {
          location: 'Conference Centre',
          current: currentSession,
          upcoming: null,
          sortTime: new Date('2026-09-29T08:00:00.000Z').getTime(),
        },
      ],
    });

    render(<Home />);

    expect(
      screen.getByRole('heading', { name: 'Conference Centre' })
    ).toBeInTheDocument();
    expect(screen.getByText('A healthy test session')).toBeInTheDocument();
    expect(screen.getByText('Now')).toBeInTheDocument();
  });
});
