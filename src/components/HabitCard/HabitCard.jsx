import { useRef, useState } from "react";
import DayStrip from "../DayStrip/DayStrip.jsx";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog.jsx";
import { getColorHex, getIconEmoji } from "../../utils/habitOptions.js";
import "./HabitCard.css";

/**
 * Displays a single habit. Owns no application data — reports intent
 * upward via onToggle/onDelete/onToggleArchive. The only state it
 * holds is whether its delete-confirmation dialog is open.
 *
 * The habit's chosen color is exposed as a --habit-accent CSS custom
 * property on the card root — DayStrip's own stylesheet reads it via
 * normal CSS inheritance.
 *
 * Props:
 *   habit: { id, name, streak, doneToday, history, archived, icon, color }
 *   onToggle: (habitId) => void
 *   onDelete: (habitId) => void
 *   onToggleArchive: (habitId) => void
 */
function HabitCard({ habit, onToggle, onDelete, onToggleArchive }) {
  const { id, name, streak, doneToday, history, archived, icon, color } = habit;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const deleteButtonRef = useRef(null);
  const accentColor = getColorHex(color);
  const iconEmoji = getIconEmoji(icon);

  function handleCancelDelete() {
    setDeleteDialogOpen(false);
    deleteButtonRef.current?.focus();
  }

  function handleConfirmDelete() {
    onDelete(id);
  }

  return (
    <li className="habit-card" style={{ "--habit-accent": accentColor }}>
      <button
        type="button"
        className={"habit-card__check" + (doneToday ? " habit-card__check--done" : "")}
        aria-pressed={doneToday}
        aria-label={doneToday ? `Mark ${name} as not done today` : `Mark ${name} as done today`}
        onClick={() => onToggle(id)}
      >
        {doneToday && (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      <div className="habit-card__body">
        <div className="habit-card__top">
          <div className="habit-card__title-group">
            <span className="habit-card__icon" aria-hidden="true">{iconEmoji}</span>
            <h4 className="habit-card__name">{name}</h4>
          </div>
          {streak > 0 && (
            <span className="habit-card__streak">
              <span className="habit-card__streak-num">{streak}</span>
              <span className="habit-card__streak-label">day{streak === 1 ? "" : "s"}</span>
            </span>
          )}
        </div>
        <DayStrip history={history} />
      </div>

      <div className="habit-card__actions">
        <button
          type="button"
          className="habit-card__archive"
          aria-label={archived ? `Restore ${name}` : `Archive ${name}`}
          onClick={() => onToggleArchive(id)}
        >
          {archived ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 4.5h11M4 4.5V13h8V4.5M8 7v4M6 9l2 2 2-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2.5 4.5h11M4 4.5V13h8V4.5M8 11V7M6 9l2-2 2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
        <button
          ref={deleteButtonRef}
          type="button"
          className="habit-card__delete"
          aria-label={`Delete ${name}`}
          onClick={() => setDeleteDialogOpen(true)}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 4h10M6.5 4V2.5h3V4M4.5 4l.5 9.5h6l.5-9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {deleteDialogOpen && (
        <ConfirmDialog
          habitName={name}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </li>
  );
}

export default HabitCard;
