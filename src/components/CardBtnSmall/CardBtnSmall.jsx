
import { Link } from 'react-router-dom';
import './CardBtnSmall.css';
export const CardBtnSmall = (props) => {
    const {title, url} = props;
    return (
      <Link to={url} 
        className="card-categories-info__description__link" >
        {title}
      </Link>
    );
  }