# Recovery Notes

This project is a **recovery/reconstruction** of a previously completed HabitFlow build whose working filesystem was lost (it did not persist between conversation turns in the environment it was developed in). It was reconstructed from the available project history rather than copied from a surviving source, and **is not guaranteed to be byte-for-byte identical to the original.**

## Completed milestone history (recovered)

- Phases 1–10, Phase 11 (Habit Management), Phase 12 (Dashboard, incl. the 12D-2 fix: empty-state logic uses `activeHabits > 0`, not raw habit count), Phase 13 (Analytics + Insights, incl. the "N-day streak" grammar fix and the zero-completion weekday-insight guard), Phase 14A (Calendar Engine), Phase 14B-1A (Calendar basic UI: month/year nav, 7-column grid, binary completion indicator).

## Explicitly NOT implemented

Phase 14B-1B (Calendar styling/polish) and any later Phase 14 work. No new features were added during recovery.

## Architecture constraints preserved

- Native History API routing (`src/hooks/useRoute.js`) — no router library. Only `/` and `/analytics` are routed.
- **Calendar is standalone.** `src/components/Calendar/Calendar.jsx` works and is connected to `calendarEngine.js`, but no route/nav currently points to it — a deliberate, confirmed historical gap, not introduced during recovery.
- Analytics calculations live only in `src/utils/analytics/*` — components read already-computed values.
- `DayStrip` is purely presentational, receiving `history` as `[{ label, done }, ...]` from `useHabits`. An earlier, different shape (self-computing dates from a raw `completedDates` array) existed only in an early discarded prototype and was deliberately not used here.
- `useHabits.js` is the single source of habit state.

## Known gaps / uncertainty

- **`public/icons/`** — regenerated during this recovery pass as a simple green "H" monogram (programmatically drawn, matching the documented original concept) at all 5 required sizes. This is a faithful recreation of that design, not the original PNG bytes.
- No `test` script/suite exists in `package.json`. Earlier development used ad-hoc Node/jsdom scripts to verify logic; those weren't meant to ship and aren't included.
- `HabitCard`'s action row exposes check/archive/delete only — `AddHabitSheet` supports an edit mode structurally (an `habit` prop), but no visible "edit" trigger is wired into `HabitCard` in this recovered build. This was left as-is rather than inventing a button not confirmed by the available history.
- The production domain in `index.html`/`sitemap.xml`/`robots.txt` (`https://habitflow.app`) is a placeholder, not a real deployed domain.

## Verification performed on this recovered build

- `npm install` — **PASS**
- `npm run build` (production) — **PASS**, including a successful PWA build (manifest + service worker; precache grew from 5 to 13 entries once icons were regenerated, confirming they are correctly picked up)
- `npx eslint .` — **PASS** (zero errors/warnings)
- Tests — none (no test script exists)
- Confirmed: no `react-router-dom` dependency or import anywhere in the project
- Confirmed: only `/` and `/analytics` are routed; Calendar remains unrouted
- Confirmed: no Phase 14B-1B or later functionality present
