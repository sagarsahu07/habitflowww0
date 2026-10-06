import { calculateStreak } from "./streak";

function getMostRecentDate(history) {
  if (!history || history.length === 0) return null;
  const sorted = [...history].sort();
  return sorted[sorted.length - 1];
}

export function getRecentHabits(activeHabits, limit = 5) {
  return activeHabits
    .map((habit) => ({
      id: habit.id,
      name: habit.name,
      icon: habit.icon,
      category: habit.category,
      color: habit.color,
      streak: calculateStreak(habit.history),
      lastCompleted: getMostRecentDate(habit.history),
    }))
    .filter((habit) => habit.lastCompleted !== null)
    .sort((a, b) => {
      if (a.lastCompleted === b.lastCompleted) return 0;
      return a.lastCompleted > b.lastCompleted ? -1 : 1;
    })
    .slice(0, limit);
}
