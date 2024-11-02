import { Link } from "react-router-dom";
import "./CardLinkButton.css";


const CardLinkButton = ({ url }) => (
  <Link to={url} className="card-link-button">
    <img src="/icons/eye-regular-white.svg" alt="view icon" className="card-link-button__img" />
    <span className="card-link-button__text">Ver todo</span>
  </Link>
);

export default CardLinkButton;
