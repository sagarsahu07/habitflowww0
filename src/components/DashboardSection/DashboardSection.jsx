import "./DashboardSection.css";

function DashboardSection({ title, children }) {
  return (
    <section className="dashboard-section" aria-label={title}>
      <h3 className="dashboard-section__title">{title}</h3>
      {children}
    </section>
  );
}

export default DashboardSection;
