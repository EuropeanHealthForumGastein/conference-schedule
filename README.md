# EHFG Conference Schedule

This repository contains multiple web applications for the European Health Forum Gastein (EHFG) conference.

## Projects

### 1. EHFG Event Schedule (`src/ehfg-event-schedule/`)
A modern Next.js application built with React and TypeScript that displays the live conference schedule. Features include:
- Real-time session display with speaker information
- Room-based layout showing current and upcoming sessions
- Session progress tracking and timing
- Responsive design with Tailwind CSS
- Speaker cards with photos and details
- Session metrics and timing indicators
- Debug mode for testing and time manipulation

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS

#### Debug Features & Usage Examples

The application includes debug features for testing and development purposes:

**Debug Mode:**
- Add `?debug=true` to the URL to enable the debug control panel
- Example: `https://yoursite.com/?debug=true`

**Time Manipulation:**
- Use the `hours` parameter to offset the current time for testing
- Supports positive and negative values, including decimals
- Values can exceed 24 hours for multi-day testing

**URL Examples:**
```
# Enable debug panel
?debug=true

# Move time forward 5 hours
?hours=5

# Move time backward 3 hours  
?hours=-3

# Move forward 2.5 days (60 hours)
?hours=60

# Move forward 30 minutes (0.5 hours)
?hours=0.5

# Combine debug panel with time offset
?debug=true&hours=12
```

**Use Cases:**
- Test session display at different times of day
- Preview schedule for future conference days
- Simulate session transitions and timing
- Debug session progress indicators and timing displays

#### Automated checks

From `src/ehfg-event-schedule`, run:

```bash
pnpm test           # run the test suite once
pnpm test:watch     # re-run relevant tests while developing
pnpm test:coverage  # generate a coverage report
```

The tests validate the downloaded `sessions.json`, schedule calculations, and
the visible loading, error, empty, current-session, and upcoming-session states.
They run automatically for pull requests and branch pushes, and again before
the GitHub Pages build is deployed.

### 2. EHFG Countdown (`src/ehfg-countdown/`)
A simple countdown timer application that displays the time remaining until the conference begins.
- Countdown timer with days, hours, minutes, and seconds
- Clean, Bootstrap-styled interface
- Conference name and branding display

**Tech Stack:** HTML, CSS, JavaScript, Bootstrap 4

### 3. EHFG Placeholder (`src/ehfg-placeholder/`)
A placeholder page with video background for conference promotion or interim display.
- Video background integration
- Navigation links to conference resources

**Tech Stack:** HTML, CSS, JavaScript, Bootstrap 4

## Data Source

Conference data is sourced from: https://www.ehfg.org/programme.json
