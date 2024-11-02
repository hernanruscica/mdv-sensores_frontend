import "./CardTitle.css";

const CardTitle = ({ iconSrc, text }) => (
  <div className="card-title">
    <img src={iconSrc} alt="category icon" className="card-title__icon" />
    <span className="card-title__text">{text}</span>
  </div>
);

export default CardTitle;
