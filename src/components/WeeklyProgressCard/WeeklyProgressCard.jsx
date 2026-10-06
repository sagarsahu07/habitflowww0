import "./WeeklyProgressCard.css";

function WeeklyProgressCard({ dailyCounts, weeklyPercentage, bestDay, worstDay }) {
  return (
    <div className="weekly-progress">
      <div className="weekly-progress__header">
        <span className="weekly-progress__percentage">{weeklyPercentage}%</span>
        <span className="weekly-progress__header-label">this week</span>
      </div>

      <ol className="weekly-progress__bars" aria-label="Daily completion, last 7 days">
        {dailyCounts.map((day) => (
          <li key={day.dateKey} className="weekly-progress__bar-item">
            <div className="weekly-progress__bar-track">
              <div className="weekly-progress__bar-fill" style={{ height: `${day.percentage}%` }} />
            </div>
            <span className="weekly-progress__bar-label" aria-hidden="true">{day.label}</span>
            <span className="visually-hidden">
              {day.label}: {day.completedCount} of {day.totalActive} habits completed ({day.percentage}%)
            </span>
          </li>
        ))}
      </ol>

      <div className="weekly-progress__summary">
        <div className="weekly-progress__summary-item">
          <span className="weekly-progress__summary-label">Best day</span>
          <span className="weekly-progress__summary-value">
            {bestDay ? `${bestDay.label} (${bestDay.completedCount}/${bestDay.totalActive})` : "—"}
          </span>
        </div>
        <div className="weekly-progress__summary-item">
          <span className="weekly-progress__summary-label">Worst day</span>
          <span className="weekly-progress__summary-value">
            {worstDay ? `${worstDay.label} (${worstDay.completedCount}/${worstDay.totalActive})` : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default WeeklyProgressCard;
