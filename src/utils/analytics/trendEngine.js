import { calculateWeeklyProgress } from "../weeklyProgress";
import { weekdayName } from "../date";

const WEEKDAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEKLY_WINDOW_DAYS = 7;
const MONTHLY_WINDOW_DAYS = 30;

export function aggregateByWeekday(dailyBreakdown) {
  const totals = {};
  for (const name of WEEKDAY_NAMES) totals[name] = { sumPercentage: 0, occurrences: 0 };

  for (const day of dailyBreakdown) {
    const name = weekdayName(day.dateKey);
    totals[name].sumPercentage += day.percentage;
    totals[name].occurrences += 1;
  }

  const result = {};
  for (const name of WEEKDAY_NAMES) {
    const { sumPercentage, occurrences } = totals[name];
    result[name] = {
      averagePercentage: occurrences > 0 ? Math.round(sumPercentage / occurrences) : 0,
      occurrences,
    };
  }
  return result;
}

function pickBestAndWeakestDay(weekdayAverages) {
  const observed = Object.entries(weekdayAverages).filter(([, stats]) => stats.occurrences > 0);
  if (observed.length === 0) return { bestDay: null, weakestDay: null };

  const sorted = [...observed].sort((a, b) => b[1].averagePercentage - a[1].averagePercentage);
  const [bestName, bestStats] = sorted[0];
  const [weakestName, weakestStats] = sorted[sorted.length - 1];

  return {
    bestDay: { name: bestName, averagePercentage: bestStats.averagePercentage },
    weakestDay: { name: weakestName, averagePercentage: weakestStats.averagePercentage },
  };
}

export function calculateTrends(activeHabits) {
  const weekly = calculateWeeklyProgress(activeHabits, WEEKLY_WINDOW_DAYS);
  const monthly = calculateWeeklyProgress(activeHabits, MONTHLY_WINDOW_DAYS);

  const daily = weekly.dailyCounts[weekly.dailyCounts.length - 1];

  if (activeHabits.length === 0) {
    return {
      weekly: { dailyCounts: weekly.dailyCounts, percentage: weekly.weeklyPercentage },
      monthly: { dailyCounts: monthly.dailyCounts, percentage: monthly.weeklyPercentage },
      daily,
      bestDay: null,
      weakestDay: null,
    };
  }

  const monthlyWeekdayAverages = aggregateByWeekday(monthly.dailyCounts);
  const { bestDay, weakestDay } = pickBestAndWeakestDay(monthlyWeekdayAverages);

  return {
    weekly: { dailyCounts: weekly.dailyCounts, percentage: weekly.weeklyPercentage },
    monthly: { dailyCounts: monthly.dailyCounts, percentage: monthly.weeklyPercentage },
    daily,
    bestDay,
    weakestDay,
  };
}
