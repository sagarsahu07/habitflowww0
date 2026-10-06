import { calculateStreak, calculateLongestStreak } from "./streak";
import { getDailyCompletionCounts, DEFAULT_WINDOW_DAYS } from "./weeklyProgress";
import { todayKey } from "./date";

export function calculateDashboardStats(activeHabits) {
  const activeCount = activeHabits.length;

  if (activeCount === 0) {
    return {
      todaysProgress: 0, completedToday: 0, activeHabits: 0,
      currentStreak: 0, longestStreak: 0, completionRate: 0,
    };
  }

  const today = todayKey();
  const completedToday = activeHabits.filter((habit) => habit.history.includes(today)).length;
  const todaysProgress = Math.round((completedToday / activeCount) * 100);

  const currentStreak = Math.max(...activeHabits.map((habit) => calculateStreak(habit.history)));
  const longestStreak = Math.max(...activeHabits.map((habit) => calculateLongestStreak(habit.history)));

  const dailyCounts = getDailyCompletionCounts(activeHabits, DEFAULT_WINDOW_DAYS);
  const totalPossible = activeCount * DEFAULT_WINDOW_DAYS;
  const totalCompleted = dailyCounts.reduce((sum, day) => sum + day.completedCount, 0);
  const completionRate = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  return { todaysProgress, completedToday, activeHabits: activeCount, currentStreak, longestStreak, completionRate };
}
