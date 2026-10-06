export function filterHabits(habits, { status = "active", category = "all", query = "" } = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return habits.filter((habit) => {
    if (status === "active" && habit.archived) return false;
    if (status === "archived" && !habit.archived) return false;
    if (category !== "all" && habit.category !== category) return false;
    if (normalizedQuery && !habit.name.toLowerCase().includes(normalizedQuery)) return false;
    return true;
  });
}
