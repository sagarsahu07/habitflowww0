import "./StatPlaceholder.css";

function StatPlaceholder({ label = "Coming soon" }) {
  return (
    <div className="stat-placeholder">
      <p className="stat-placeholder__value" aria-hidden="true">—</p>
      <p className="stat-placeholder__label">{label}</p>
    </div>
  );
}

export default StatPlaceholder;
