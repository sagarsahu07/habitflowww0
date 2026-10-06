import { useState } from "react";
import HabitCard from "../HabitCard/HabitCard.jsx";
import EmptyState from "../EmptyState/EmptyState.jsx";
import { filterHabits } from "../../utils/filterHabits.js";
import { CATEGORIES } from "../../utils/habitOptions.js";
import "./HabitList.css";

const STATUS_FILTERS = [
  { key: "all", label: "All" },
  { key: "active", label: "Active" },
  { key: "archived", label: "Archived" },
];

/**
 * Renders the habit list, or EmptyState when there are no habits at
 * all. Owns status/category/search as internal UI state. Filtering
 * itself is delegated to the pure filterHabits utility.
 *
 * Props:
 *   habits: Array
 *   onToggle, onDelete, onToggleArchive, onAddHabit: handlers
 */
function HabitList({ habits, onToggle, onDelete, onToggleArchive, onAddHabit }) {
  const [statusFilter, setStatusFilter] = useState("active");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [query, setQuery] = useState("");

  if (habits.length === 0) {
    return <EmptyState onAddHabit={onAddHabit} />;
  }

  const counts = {
    all: habits.length,
    active: habits.filter((habit) => !habit.archived).length,
    archived: habits.filter((habit) => habit.archived).length,
  };

  const filtered = filterHabits(habits, {
    status: statusFilter,
    category: categoryFilter,
    query,
  });

  const trimmedQuery = query.trim();
  let emptyMessage = "No active habits — check the other tabs, or add a new one.";
  if (trimmedQuery) {
    emptyMessage = `No habits match "${trimmedQuery}".`;
  } else if (categoryFilter !== "all") {
    emptyMessage = `No habits in ${categoryFilter}.`;
  } else if (statusFilter === "archived") {
    emptyMessage = "No archived habits.";
  } else if (statusFilter === "all") {
    emptyMessage = "No habits yet.";
  }

  return (
    <div className="habit-list">
      <div className="habit-list__search">
        <label htmlFor="habit-search" className="visually-hidden">
          Search habits
        </label>
        <svg className="habit-list__search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M11 11l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          id="habit-search"
          type="text"
          className="habit-list__search-input"
          placeholder="Search habits"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
        />
      </div>

      <div className="habit-list__controls">
        <div className="habit-list__filters" role="group" aria-label="Filter by status">
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.key}
              type="button"
              aria-pressed={statusFilter === filter.key}
              className={
                "habit-list__filter-btn" +
                (statusFilter === filter.key ? " habit-list__filter-btn--active" : "")
              }
              onClick={() => setStatusFilter(filter.key)}
            >
              {filter.label}
              <span className="habit-list__filter-count">{counts[filter.key]}</span>
            </button>
          ))}
        </div>

        <label htmlFor="habit-category-filter" className="visually-hidden">
          Filter by category
        </label>
        <select
          id="habit-category-filter"
          className="habit-list__category-select"
          value={categoryFilter}
          onChange={(event) => setCategoryFilter(event.target.value)}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="habit-list__empty-filter">{emptyMessage}</p>
      ) : (
        <ul className="habit-list__items">
          {filtered.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggle={onToggle}
              onDelete={onDelete}
              onToggleArchive={onToggleArchive}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default HabitList;
