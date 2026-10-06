# HabitFlow

A calm, minimal daily habit tracker — track the habits you actually keep, with clear stats, trends, and rule-based insights.

> **This is a recovered/reconstructed build.** See `RECOVERY_NOTES.md` for what that means and its limitations.

## What it is

HabitFlow lets you add habits, check them off once a day, and see how consistent you've been — streaks, a weekly/monthly trend view, and plain-language insights, without gamification or a social feed.

## Recovered features

- Add / delete / archive / restore habits, each with a name, category, icon, and color (edit is supported by the underlying form component but has no visible trigger wired into the habit card in this recovered build — see RECOVERY_NOTES.md)
- Search and filter habits by status/category
- Daily check-off, current & longest streak, 7-day history strip
- Dashboard: greeting, overview stats, weekly progress chart, quick-add, today's remaining habits, recent activity
- Analytics page: overall stats, best/weakest habit, weekly & monthly trend percentages, best/weakest day of the week, rule-based insights (summary, highlights, recommendations)
- Installable PWA with offline support
- All data stored locally in the browser (`localStorage`) — nothing is sent anywhere

## Not currently wired in

- **Calendar** — `src/components/Calendar/` is a complete, working month-grid component (connected to its own engine, with a basic binary completion indicator) from Phase 14B-1A, but it is **not reachable from the app** — no route or nav link points to it.
- **Phase 14B-1B and any later Phase 14 work** — not implemented.

## Tech stack

React + Vite, plain JavaScript, plain CSS design tokens (no Tailwind/UI kit), native browser History API for routing (no `react-router-dom`), `vite-plugin-pwa`, no backend.

## Routes

- `/` — Dashboard
- `/analytics` — Analytics

## Local setup

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Lint

```bash
npx eslint .
```

No `test` script exists in `package.json`.
# habitflowww0
