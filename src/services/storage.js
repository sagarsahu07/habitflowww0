import { DEFAULT_CATEGORY, DEFAULT_COLOR, DEFAULT_ICON } from "../utils/habitOptions";

const STORAGE_KEY = "habitflow-data";

function isValidHabit(habit) {
  return (
    habit !== null &&
    typeof habit === "object" &&
    typeof habit.id === "string" &&
    typeof habit.name === "string" &&
    typeof habit.createdAt === "string" &&
    Array.isArray(habit.history) &&
    habit.history.every((date) => typeof date === "string")
  );
}

function normalizeHabit(habit) {
  return {
    ...habit,
    category: typeof habit.category === "string" ? habit.category : DEFAULT_CATEGORY,
    icon: typeof habit.icon === "string" ? habit.icon : DEFAULT_ICON,
    color: typeof habit.color === "string" ? habit.color : DEFAULT_COLOR,
    archived: typeof habit.archived === "boolean" ? habit.archived : false,
  };
}

export function loadHabits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidHabit).map(normalizeHabit);
  } catch {
    return [];
  }
}

export function saveHabits(habits) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
    return true;
  } catch {
    return false;
  }
}

export function clearHabits() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}
