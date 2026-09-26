// Color mapping optimized for floor screen visibility with improved contrast
export const COLOR_CFG = {
  current: {
    border: 'border-green-400/40',
    label: 'text-green-100',
    badge: 'bg-green-500/90 text-white',
    accentFrom: 'from-green-400/40',
    accentTo: 'to-green-900/30',
    subtitle: 'text-green-100',
    value: 'text-green-100',
    timing: 'text-neutral-100',
    location: 'text-neutral-200',
  },
  next: {
    border: 'border-blue-400/40',
    label: 'text-blue-100',
    badge: 'bg-blue-500/90 text-white',
    accentFrom: 'from-blue-400/40',
    accentTo: 'to-blue-900/30',
    subtitle: 'text-blue-100',
    value: 'text-blue-100',
    timing: 'text-neutral-100',
    location: 'text-neutral-200',
  },
  networking: {
    border: 'border-purple-400/40',
    label: 'text-purple-100',
    badge: 'bg-purple-500/90 text-white',
    accentFrom: 'from-purple-400/40',
    accentTo: 'to-purple-900/30',
    subtitle: 'text-purple-100',
    value: 'text-purple-100',
    timing: 'text-neutral-100',
    location: 'text-neutral-200',
  },
} as const;

// General text color utilities for consistent theming
export const TEXT_COLORS = {
  primary: 'text-white',
  secondary: 'text-neutral-100',
  tertiary: 'text-neutral-200',
  muted: 'text-neutral-300',
  subtle: 'text-neutral-400',
  speakers: 'text-neutral-100',
  organization: 'text-neutral-300',
} as const;
