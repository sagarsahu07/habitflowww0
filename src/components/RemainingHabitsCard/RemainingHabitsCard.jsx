import { getIconEmoji } from "../../utils/habitOptions.js";
import "./RemainingHabitsCard.css";

function RemainingHabitsCard({ habits, onComplete }) {
  if (habits.length === 0) {
    return (
      <div className="remaining-habits-card__celebration">
        <span className="remaining-habits-card__celebration-icon" aria-hidden="true">🎉</span>
        <h4 className="remaining-habits-card__celebration-title">Amazing!</h4>
        <p className="remaining-habits-card__celebration-message">You've completed every habit today.</p>
      </div>
    );
  }

  return (
    <ul className="remaining-habits-card">
      {habits.map((habit) => (
        <li key={habit.id} className="remaining-habits-card__row">
          <span className="remaining-habits-card__icon" aria-hidden="true">{getIconEmoji(habit.icon)}</span>
          <div className="remaining-habits-card__info">
            <span className="remaining-habits-card__name">{habit.name}</span>
            <span className="remaining-habits-card__meta">
              {habit.category}
              {habit.streak > 0 ? ` · ${habit.streak} day streak` : ""}
            </span>
          </div>
          <button
            type="button"
            className="remaining-habits-card__complete"
            onClick={() => onComplete(habit.id)}
            aria-label={`Mark ${habit.name} as done today`}
          >
            Complete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default RemainingHabitsCard;
