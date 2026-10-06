import { useState } from "react";
import "./Calendar.css";

const WEEKDAY_HEADERS = ["S", "M", "T", "W", "T", "F", "S"];

function dayOfMonth(dateKey) {
  return Number(dateKey.split("-")[2]);
}

/**
 * Month calendar grid — basic structure plus a simple binary
 * completed/not-completed presentation (no heatmap intensity scale
 * yet — that is Phase 14B-1B and later, not implemented). Owns which
 * month is being viewed as internal UI state; the calendar engine
 * itself is stateless.
 *
 * Standalone component: not currently mounted into any route.
 *
 * Props:
 *   getMonthCalendar: (year, month) => calendar data from useHabits
 */
function Calendar({ getMonthCalendar }) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);

  const calendar = getMonthCalendar(year, month);

  function handlePrevious() {
    setYear(calendar.navigation.previous.year);
    setMonth(calendar.navigation.previous.month);
  }

  function handleNext() {
    setYear(calendar.navigation.next.year);
    setMonth(calendar.navigation.next.month);
  }

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button type="button" className="calendar__nav-btn" onClick={handlePrevious} aria-label="Previous month">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3.5L5.5 8l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h4 className="calendar__label">{calendar.label}</h4>

        <button type="button" className="calendar__nav-btn" onClick={handleNext} aria-label="Next month">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3.5L10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="calendar__grid" role="grid" aria-label={calendar.label}>
        <div className="calendar__row calendar__row--headers" role="row">
          {WEEKDAY_HEADERS.map((label, index) => (
            <span key={index} className="calendar__weekday" role="columnheader" aria-hidden="true">
              {label}
            </span>
          ))}
        </div>

        {calendar.weeks.map((week, weekIndex) => (
          <div className="calendar__row" role="row" key={weekIndex}>
            {week.map((day) => (
              <div
                key={day.dateKey}
                role="gridcell"
                className={
                  "calendar__day" +
                  (day.inCurrentMonth ? "" : " calendar__day--outside") +
                  (day.isToday ? " calendar__day--today" : "") +
                  (day.completedCount > 0 ? " calendar__day--completed" : "")
                }
                aria-current={day.isToday ? "date" : undefined}
              >
                <span className="calendar__day-number">{dayOfMonth(day.dateKey)}</span>
                {day.completedCount > 0 && <span className="calendar__day-dot" aria-hidden="true" />}
                <span className="visually-hidden">
                  {day.dateKey}: {day.completedCount} of {day.totalActive} habits completed
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
