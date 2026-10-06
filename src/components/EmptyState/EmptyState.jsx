import "./EmptyState.css";

function EmptyState({ onAddHabit }) {
  return (
    <div className="empty-state">
      <svg className="empty-state__illustration" width="72" height="72" viewBox="0 0 72 72" fill="none" aria-hidden="true">
        <circle cx="36" cy="36" r="30" stroke="var(--color-border)" strokeWidth="2" strokeDasharray="6 6" />
        <path d="M25 37l7 7 15-16" stroke="var(--color-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <h4 className="empty-state__title">No habits yet</h4>
      <p className="empty-state__body">Add the first thing you want to do every day.</p>

      <button type="button" className="empty-state__cta" onClick={onAddHabit}>
        Add a habit
      </button>
    </div>
  );
}

export default EmptyState;
