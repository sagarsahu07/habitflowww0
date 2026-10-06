import { useEffect, useRef, useState } from "react";
import { calculateStreak } from "../utils/streak";
import { generateRecentHistory, todayKey } from "../utils/date";
import { calculateDashboardStats } from "../utils/dashboardStats";
import { calculateWeeklyProgress } from "../utils/weeklyProgress";
import { getRecentHabits } from "../utils/recentHabits";
import { calculateHabitStatistics } from "../utils/analytics/habitStatistics";
import { calculateTrends } from "../utils/analytics/trendEngine";
import { generateInsights } from "../utils/analytics/insightsEngine";
import {
  generateMonthCalendar,
  generateHeatmapData,
} from "../utils/analytics/calendarEngine";
import { loadHabits, saveHabits } from "../services/storage";
import {
  DEFAULT_CATEGORY,
  DEFAULT_COLOR,
  DEFAULT_ICON,
} from "../utils/habitOptions";

function makeId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `habit_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Owns all habit data for the app and persists it via services/storage.
 * The stored model per habit: { id, name, category, icon, color,
 * archived, history, createdAt }. Everything else a component needs
 * is derived fresh on every read so there's never a second source of
 * truth to keep in sync.
 */
export function useHabits() {
  const [habits, setHabits] = useState(() => loadHabits());

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    saveHabits(habits);
  }, [habits]);

  function isNameTaken(name, excludeId) {
    return habits.some(
      (habit) =>
        habit.id !== excludeId && habit.name.toLowerCase() === name.toLowerCase()
    );
  }

  function addHabit({ name: rawName, category, icon, color }) {
    const name = rawName.trim();

    if (!name) {
      return { success: false, error: "Enter a habit name." };
    }
    if (isNameTaken(name, null)) {
      return { success: false, error: "That habit already exists." };
    }

    const newHabit = {
      id: makeId(),
      name,
      category: category || DEFAULT_CATEGORY,
      icon: icon || DEFAULT_ICON,
      color: color || DEFAULT_COLOR,
      archived: false,
      history: [],
      createdAt: new Date().toISOString(),
    };
    setHabits((prev) => [...prev, newHabit]);
    return { success: true };
  }

  function editHabit(habitId, { name: rawName, category, icon, color }) {
    const name = rawName.trim();

    if (!name) {
      return { success: false, error: "Enter a habit name." };
    }
    if (isNameTaken(name, habitId)) {
      return { success: false, error: "That habit already exists." };
    }

    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? { ...habit, name, category, icon, color }
          : habit
      )
    );
    return { success: true };
  }

  function deleteHabit(habitId) {
    setHabits((prev) => prev.filter((habit) => habit.id !== habitId));
  }

  function toggleToday(habitId) {
    const key = todayKey();
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== habitId) return habit;
        const alreadyDone = habit.history.includes(key);
        return {
          ...habit,
          history: alreadyDone
            ? habit.history.filter((date) => date !== key)
            : [...habit.history, key],
        };
      })
    );
  }

  function toggleArchived(habitId) {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId ? { ...habit, archived: !habit.archived } : habit
      )
    );
  }

  const habitsView = habits.map((habit) => ({
    id: habit.id,
    name: habit.name,
    category: habit.category,
    icon: habit.icon,
    color: habit.color,
    archived: habit.archived,
    streak: calculateStreak(habit.history),
    doneToday: habit.history.includes(todayKey()),
    history: generateRecentHistory(habit.history),
  }));

  const activeRawHabits = habits.filter((habit) => !habit.archived);
  const stats = calculateDashboardStats(activeRawHabits);
  const weeklyProgress = calculateWeeklyProgress(activeRawHabits);
  const recentHabits = getRecentHabits(activeRawHabits);

  const remainingHabits = habitsView.filter(
    (habit) => !habit.archived && !habit.doneToday
  );

  const habitStatistics = calculateHabitStatistics(habits);
  const trends = calculateTrends(activeRawHabits);
  const insights = generateInsights(habitStatistics, trends);

  function getMonthCalendar(year, month) {
    return generateMonthCalendar(activeRawHabits, year, month);
  }
  function getHeatmapData(days) {
    return generateHeatmapData(activeRawHabits, days);
  }

  return {
    habits: habitsView,
    stats,
    weeklyProgress,
    recentHabits,
    remainingHabits,
    habitStatistics,
    trends,
    insights,
    getMonthCalendar,
    getHeatmapData,
    addHabit,
    editHabit,
    deleteHabit,
    toggleToday,
    toggleArchived,
  };
}
