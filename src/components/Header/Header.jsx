import "./Header.css";

function Header({ onAddHabit, addButtonRef }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__logo" aria-hidden="true">H</span>
        <h1 className="header__title">HabitFlow</h1>
      </div>
      <button ref={addButtonRef} type="button" className="header__add" onClick={onAddHabit}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 2.5v11M2.5 8h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Add Habit</span>
      </button>
    </header>
  );
}

export default Header;
