import "./EmptyAnalyticsState.css";

function EmptyAnalyticsState({ onBackToDashboard }) {
  return (
    <div className="empty-analytics-state">
      <span className="empty-analytics-state__icon" aria-hidden="true">📊</span>
      <h3 className="empty-analytics-state__title">No analytics available yet</h3>
      <p className="empty-analytics-state__message">Complete a few habits and your progress will appear here.</p>
      <button type="button" className="empty-analytics-state__cta" onClick={onBackToDashboard}>
        Back to Dashboard
      </button>
    </div>
  );
}

export default EmptyAnalyticsState;
