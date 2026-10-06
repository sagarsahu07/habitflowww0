import { calculateStreak, calculateLongestStreak } from "../streak";
import { daysSince } from "../date";

function getHabitCompletionRate(habit) {
  const totalDays = daysSince(habit.createdAt);
  if (totalDays <= 0) return 0;
  return Math.round((habit.history.length / totalDays) * 100);
}

function toSummary(habit) {
  return {
    id: habit.id,
    name: habit.name,
    completionRate: getHabitCompletionRate(habit),
    streak: calculateStreak(habit.history),
    longestStreak: calculateLongestStreak(habit.history),
  };
}

function compareForBest(a, b) {
  if (b.completionRate !== a.completionRate) return b.completionRate - a.completionRate;
  if (b.longestStreak !== a.longestStreak) return b.longestStreak - a.longestStreak;
  return a.name.localeCompare(b.name);
}

function compareForWeakest(a, b) {
  if (a.completionRate !== b.completionRate) return a.completionRate - b.completionRate;
  return a.streak - b.streak;
}

function toHabitResult(summary) {
  return {
    id: summary.id,
    name: summary.name,
    completionRate: summary.completionRate,
    streak: summary.streak,
  };
}

/**
 * Calculates every core habit statistic from the full habit list
 * (active AND archived — needed to report both counts).
 */
export function calculateHabitStatistics(habits) {
  const activeHabits = habits.filter((habit) => !habit.archived);
  const archivedCount = habits.length - activeHabits.length;

  if (activeHabits.length === 0) {
    return {
      overallCompletionRate: 0,
      currentStreak: 0,
      longestStreak: 0,
      totalHabits: habits.length,
      activeHabits: 0,
      archivedHabits: archivedCount,
      totalCompletions: 0,
      bestHabit: null,
      weakestHabit: null,
    };
  }

  const summaries = activeHabits.map(toSummary);

  const overallCompletionRate = Math.round(
    summaries.reduce((sum, s) => sum + s.completionRate, 0) / summaries.length
  );
  const currentStreak = Math.max(...summaries.map((s) => s.streak));
  const longestStreak = Math.max(...summaries.map((s) => s.longestStreak));
  const totalCompletions = activeHabits.reduce((sum, habit) => sum + habit.history.length, 0);

  const best = [...summaries].sort(compareForBest)[0];
  const weakest = [...summaries].sort(compareForWeakest)[0];

  return {
    overallCompletionRate,
    currentStreak,
    longestStreak,
    totalHabits: habits.length,
    activeHabits: activeHabits.length,
    archivedHabits: archivedCount,
    totalCompletions,
    bestHabit: toHabitResult(best),
    weakestHabit: toHabitResult(weakest),
  };
}
