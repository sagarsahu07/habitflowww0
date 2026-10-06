import "./QuickAddCard.css";

function QuickAddCard({ onAdd }) {
  return (
    <button type="button" className="quick-add-card" onClick={onAdd}>
      <span className="quick-add-card__icon" aria-hidden="true">
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </span>
      <span className="quick-add-card__label">Add a new habit</span>
    </button>
  );
}

export default QuickAddCard;
