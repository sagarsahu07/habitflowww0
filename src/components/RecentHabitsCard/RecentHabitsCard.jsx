import { getIconEmoji } from "../../utils/habitOptions.js";
import { formatRelativeDate } from "../../utils/date.js";
import "./RecentHabitsCard.css";

function RecentHabitsCard({ habits }) {
  if (habits.length === 0) {
    return <p className="recent-habits-card__empty">No activity yet — complete a habit to see it here.</p>;
  }

  return (
    <ul className="recent-habits-card">
      {habits.map((habit) => (
        <li key={habit.id} className="recent-habits-card__row">
          <span className="recent-habits-card__icon" aria-hidden="true">{getIconEmoji(habit.icon)}</span>
          <div className="recent-habits-card__info">
            <span className="recent-habits-card__name">{habit.name}</span>
            <span className="recent-habits-card__meta">
              {formatRelativeDate(habit.lastCompleted)}
              {habit.streak > 0 ? ` · ${habit.streak} day streak` : ""}
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default RecentHabitsCard;
