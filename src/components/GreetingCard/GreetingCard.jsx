import "./GreetingCard.css";

function GreetingCard({ greeting, currentDate }) {
  return (
    <div className="greeting-card">
      <p className="greeting-card__date">{currentDate}</p>
      <h2 className="greeting-card__greeting">{greeting}</h2>
      <p className="greeting-card__welcome">Let's make today count.</p>
    </div>
  );
}

export default GreetingCard;
