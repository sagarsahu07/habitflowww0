const WEEKDAY_LETTERS = ["S", "M", "T", "W", "T", "F", "S"];
const WEEKDAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
];

export function toDateKey(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function todayKey() {
  return toDateKey(new Date());
}

export function getLastNDays(n) {
  const days = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(toDateKey(d));
  }
  return days;
}

export function weekdayLabel(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return WEEKDAY_LETTERS[date.getDay()];
}

export function weekdayName(dateKey) {
  const [y, m, d] = dateKey.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return WEEKDAY_NAMES[date.getDay()];
}

export function formatHeaderDate(date = new Date()) {
  return date.toLocaleDateString(undefined, {
    weekday: "long", month: "long", day: "numeric",
  });
}

export function getGreeting(date = new Date()) {
  const hour = date.getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

export function generateRecentHistory(history, days = 7) {
  const completed = new Set(history);
  return getLastNDays(days).map((dateKey) => ({
    label: weekdayLabel(dateKey),
    done: completed.has(dateKey),
  }));
}

export function formatRelativeDate(dateKey) {
  if (dateKey === todayKey()) return "Today";

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  if (dateKey === toDateKey(yesterday)) return "Yesterday";

  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function getDatesInMonth(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const dates = [];
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(toDateKey(new Date(year, month - 1, day)));
  }
  return dates;
}

export function daysSince(createdAtIso) {
  const created = new Date(createdAtIso);
  const createdDateOnly = new Date(created.getFullYear(), created.getMonth(), created.getDate());
  const today = new Date();
  const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.round((todayDateOnly - createdDateOnly) / 86400000);
  return diffDays + 1;
}
