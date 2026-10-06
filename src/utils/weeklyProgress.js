import { getLastNDays, weekdayLabel } from "./date";

export const DEFAULT_WINDOW_DAYS = 7;

export function getDailyCompletionCounts(activeHabits, days = DEFAULT_WINDOW_DAYS) {
  const totalActive = activeHabits.length;

  return getLastNDays(days).map((dateKey) => {
    const completedCount = activeHabits.filter((habit) => habit.history.includes(dateKey)).length;
    return {
      dateKey,
      label: weekdayLabel(dateKey),
      completedCount,
      totalActive,
      percentage: totalActive > 0 ? Math.round((completedCount / totalActive) * 100) : 0,
    };
  });
}

export function calculateWeeklyProgress(activeHabits, days = DEFAULT_WINDOW_DAYS) {
  const dailyCounts = getDailyCompletionCounts(activeHabits, days);
  const totalActive = activeHabits.length;

  if (totalActive === 0) {
    return { dailyCounts, weeklyPercentage: 0, bestDay: null, worstDay: null };
  }

  const totalCompleted = dailyCounts.reduce((sum, day) => sum + day.completedCount, 0);
  const totalPossible = totalActive * days;
  const weeklyPercentage = Math.round((totalCompleted / totalPossible) * 100);

  let bestDay = dailyCounts[0];
  let worstDay = dailyCounts[0];
  for (const day of dailyCounts) {
    if (day.completedCount > bestDay.completedCount) bestDay = day;
    if (day.completedCount < worstDay.completedCount) worstDay = day;
  }

  return { dailyCounts, weeklyPercentage, bestDay, worstDay };
}
