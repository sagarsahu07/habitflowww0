import "./StatsCard.css";

function StatsCard({ label, value, suffix = "" }) {
  return (
    <div className="stats-card">
      <p className="stats-card__value">{value}{suffix}</p>
      <p className="stats-card__label">{label}</p>
    </div>
  );
}

export default StatsCard;
