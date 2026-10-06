import GreetingCard from "../GreetingCard/GreetingCard.jsx";
import "./Dashboard.css";

function Dashboard({ greeting, currentDate, children }) {
  return (
    <div className="dashboard">
      <GreetingCard greeting={greeting} currentDate={currentDate} />
      {children}
    </div>
  );
}

export default Dashboard;
