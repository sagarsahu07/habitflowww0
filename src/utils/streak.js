import { toDateKey, todayKey } from "./date";

export function calculateStreak(history) {
  if (!history || history.length === 0) return 0;

  const completed = new Set(history);
  const cursor = new Date();

  if (!completed.has(todayKey())) {
    cursor.setDate(cursor.getDate() - 1);
  }

  let streak = 0;
  while (completed.has(toDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function calculateLongestStreak(history) {
  if (!history || history.length === 0) return 0;

  const sortedDays = [...new Set(history)].sort();

  let longest = 0;
  let current = 0;
  let previousDay = null;

  for (const day of sortedDays) {
    if (previousDay === null) {
      current = 1;
    } else {
      const [year, month, date] = previousDay.split("-").map(Number);
      const expectedNext = new Date(year, month - 1, date);
      expectedNext.setDate(expectedNext.getDate() + 1);
      current = toDateKey(expectedNext) === day ? current + 1 : 1;
    }
    longest = Math.max(longest, current);
    previousDay = day;
  }

  return longest;
}
