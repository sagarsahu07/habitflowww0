import "./DayStrip.css";

/**
 * Pure presentation — renders a 7-item completion history as rounded
 * indicators. Owns no data of its own.
 *
 * Props:
 *   history: Array<{ label: string, done: boolean }>
 */
function DayStrip({ history }) {
  return (
    <ol className="day-strip" aria-label="Last 7 days">
      {history.map((day, index) => (
        <li key={index} className="day-strip__item">
          <span
            className={"day-strip__dot" + (day.done ? " day-strip__dot--done" : "")}
            aria-hidden="true"
          />
          <span className="visually-hidden">
            {day.label}: {day.done ? "completed" : "not completed"}
          </span>
          <span className="day-strip__label" aria-hidden="true">
            {day.label}
          </span>
        </li>
      ))}
    </ol>
  );
}

export default DayStrip;
