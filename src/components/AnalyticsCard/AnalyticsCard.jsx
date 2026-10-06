import "./AnalyticsCard.css";

function AnalyticsCard({ title, children }) {
  return (
    <div className="analytics-card">
      {title && <h4 className="analytics-card__title">{title}</h4>}
      <div className="analytics-card__content">{children}</div>
    </div>
  );
}

export default AnalyticsCard;
