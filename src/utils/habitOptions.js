export const ICONS = [
  { key: "target", emoji: "🎯", label: "General" },
  { key: "reading", emoji: "📚", label: "Reading" },
  { key: "running", emoji: "🏃", label: "Running" },
  { key: "water", emoji: "💧", label: "Water" },
  { key: "meditation", emoji: "🧘", label: "Meditation" },
  { key: "work", emoji: "💼", label: "Work" },
  { key: "workout", emoji: "💪", label: "Workout" },
  { key: "study", emoji: "🎓", label: "Study" },
  { key: "saving", emoji: "💰", label: "Saving" },
  { key: "eating", emoji: "🍎", label: "Healthy Eating" },
  { key: "sleep", emoji: "🛌", label: "Sleep" },
];

export const CATEGORIES = [
  "Health", "Fitness", "Learning", "Reading", "Work", "Finance", "Personal", "Spiritual", "Custom",
];

export const COLORS = [
  { key: "green", label: "Green", hex: "#16a34a" },
  { key: "blue", label: "Blue", hex: "#2563eb" },
  { key: "purple", label: "Purple", hex: "#7c3aed" },
  { key: "orange", label: "Orange", hex: "#ea580c" },
  { key: "pink", label: "Pink", hex: "#db2777" },
  { key: "indigo", label: "Indigo", hex: "#4f46e5" },
  { key: "teal", label: "Teal", hex: "#0d9488" },
  { key: "gray", label: "Gray", hex: "#6b7280" },
];

export const DEFAULT_ICON = "target";
export const DEFAULT_CATEGORY = "Personal";
export const DEFAULT_COLOR = "green";

export function getIconEmoji(key) {
  return ICONS.find((icon) => icon.key === key)?.emoji ?? "🎯";
}

export function getColorHex(key) {
  return COLORS.find((color) => color.key === key)?.hex ?? "#16a34a";
}
