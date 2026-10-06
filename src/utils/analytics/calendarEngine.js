import { getDatesInMonth, toDateKey, todayKey, getLastNDays } from "../date";

const HEATMAP_DEFAULT_DAYS = 365;

function getDateCompletionStatus(dateKey, activeHabits) {
  const totalActive = activeHabits.length;
  const completedCount = activeHabits.filter((habit) => habit.history.includes(dateKey)).length;
  return {
    dateKey,
    completedCount,
    totalActive,
    percentage: totalActive > 0 ? Math.round((completedCount / totalActive) * 100) : 0,
  };
}

export function getIntensityLevel(percentage) {
  if (percentage <= 0) return 0;
  if (percentage <= 25) return 1;
  if (percentage <= 50) return 2;
  if (percentage <= 75) return 3;
  return 4;
}

export function getAdjacentMonth(year, month, offset) {
  const totalMonths = year * 12 + (month - 1) + offset;
  const newYear = Math.floor(totalMonths / 12);
  const newMonth = (totalMonths % 12) + 1;
  return { year: newYear, month: newMonth };
}

export function getMonthNavigation(year, month) {
  return {
    previous: getAdjacentMonth(year, month, -1),
    next: getAdjacentMonth(year, month, 1),
    label: new Date(year, month - 1, 1).toLocaleDateString(undefined, { month: "long", year: "numeric" }),
  };
}

export function generateMonthCalendar(activeHabits, year, month) {
  const monthDates = getDatesInMonth(year, month);
  const monthDateSet = new Set(monthDates);

  const firstOfMonth = new Date(year, month - 1, 1);
  const lastOfMonth = new Date(year, month - 1, monthDates.length);

  const gridStart = new Date(firstOfMonth);
  gridStart.setDate(gridStart.getDate() - firstOfMonth.getDay());

  const gridEnd = new Date(lastOfMonth);
  gridEnd.setDate(gridEnd.getDate() + (6 - lastOfMonth.getDay()));

  const today = todayKey();
  const days = [];
  const cursor = new Date(gridStart);
  while (cursor <= gridEnd) {
    const dateKey = toDateKey(cursor);
    const status = getDateCompletionStatus(dateKey, activeHabits);
    days.push({
      ...status,
      inCurrentMonth: monthDateSet.has(dateKey),
      isToday: dateKey === today,
      intensityLevel: getIntensityLevel(status.percentage),
    });
    cursor.setDate(cursor.getDate() + 1);
  }

  const weeks = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  return {
    year,
    month,
    label: getMonthNavigation(year, month).label,
    navigation: getMonthNavigation(year, month),
    weeks,
  };
}

export function generateHeatmapData(activeHabits, days = HEATMAP_DEFAULT_DAYS) {
  return getLastNDays(days).map((dateKey) => {
    const status = getDateCompletionStatus(dateKey, activeHabits);
    return { ...status, intensityLevel: getIntensityLevel(status.percentage) };
  });
}
