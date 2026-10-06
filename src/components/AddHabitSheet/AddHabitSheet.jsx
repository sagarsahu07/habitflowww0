import { useEffect, useRef, useState } from "react";
import { useModalKeyboard } from "../../hooks/useModalKeyboard.js";
import {
  CATEGORIES,
  COLORS,
  ICONS,
  DEFAULT_CATEGORY,
  DEFAULT_COLOR,
  DEFAULT_ICON,
} from "../../utils/habitOptions";
import "./AddHabitSheet.css";

/**
 * Add/Edit habit modal — one component for both. The parent mounts
 * this only while it should be visible, so the lazy useState
 * initializers below naturally pick up `habit`'s values fresh on
 * every mount for editing, or start blank for adding.
 *
 * Props:
 *   habit: existing habit to edit, or omitted/null to add a new one
 *   onClose: () => void
 *   onSubmit: (fields) => { success: boolean, error?: string }
 */
function AddHabitSheet({ habit = null, onClose, onSubmit }) {
  const isEditing = Boolean(habit);

  const [name, setName] = useState(habit?.name ?? "");
  const [category, setCategory] = useState(habit?.category ?? DEFAULT_CATEGORY);
  const [icon, setIcon] = useState(habit?.icon ?? DEFAULT_ICON);
  const [color, setColor] = useState(habit?.color ?? DEFAULT_COLOR);
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => inputRef.current?.focus());
  }, []);

  useModalKeyboard(dialogRef, onClose);

  function handleSubmit(event) {
    event.preventDefault();
    const result = onSubmit({ name, category, icon, color });
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form
        className="modal-sheet"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="habit-sheet-title"
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="modal-sheet__handle" aria-hidden="true" />

        <label className="sheet__label" htmlFor="habit-name" id="habit-sheet-title">
          {isEditing ? "Edit habit" : "New habit"}
        </label>
        <input
          id="habit-name"
          ref={inputRef}
          className="sheet__input"
          type="text"
          placeholder="e.g. Read for 10 minutes"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error) setError("");
          }}
          maxLength={60}
          autoComplete="off"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "habit-name-error" : undefined}
        />
        {error && (
          <p className="sheet__error" id="habit-name-error" role="alert">
            {error}
          </p>
        )}

        <fieldset className="sheet__field-group">
          <legend className="sheet__legend">Category</legend>
          <select
            className="sheet__select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="sheet__field-group">
          <legend className="sheet__legend">Icon</legend>
          <div className="sheet__icon-grid">
            {ICONS.map((option) => (
              <button
                key={option.key}
                type="button"
                className={
                  "sheet__icon-btn" +
                  (icon === option.key ? " sheet__icon-btn--selected" : "")
                }
                aria-pressed={icon === option.key}
                aria-label={option.label}
                onClick={() => setIcon(option.key)}
              >
                <span aria-hidden="true">{option.emoji}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="sheet__field-group">
          <legend className="sheet__legend">Color</legend>
          <div className="sheet__color-grid">
            {COLORS.map((option) => (
              <button
                key={option.key}
                type="button"
                className="sheet__color-btn"
                style={{ background: option.hex }}
                aria-pressed={color === option.key}
                aria-label={option.label}
                onClick={() => setColor(option.key)}
              >
                {color === option.key && (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path
                      d="M3.5 8.5l3 3 6-7"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="modal-actions">
          <button type="button" className="modal-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className="modal-btn modal-btn--primary"
            disabled={!name.trim()}
          >
            {isEditing ? "Save changes" : "Add habit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddHabitSheet;
