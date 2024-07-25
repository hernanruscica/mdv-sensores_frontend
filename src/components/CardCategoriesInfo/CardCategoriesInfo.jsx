import React from "react";
import { Link } from "react-router-dom";
import { ENV } from "../../context/env";
import "./CardCategoriesInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";




export const CardCategoriesInfo = (props) => {    
  const { title, itemsQty } = props;
  const currentPageIcon =
    ENV.ICONS.find(({ nameSection }) => nameSection === title) ||
    ENV.ICONS.find(({ nameSection }) => nameSection === "default");
  return (
    <div className="card-categories-info">
      <div className="card-categories-info__title">
        <img
          src={`${ENV.URL}/icons/${currentPageIcon.fileName}`}
          alt="icono de la categoria"
          className="card-categories-info__title__icon"
        />
        <span className="card-categories-info__title__text">{title}</span>
      </div>
      <div className="card-categories-info__description">
        <p className="card-categories-info__description__paragraph">
          <strong>
            {itemsQty} {title}
          </strong>{" "}
          para ver o administrar, segun los permisos de su usuario.
        </p>        
        <CardBtnSmall 
            title={`Agregar ${title}`} 
            url={`${title}/agregar`} 
        />
      </div>
      <Link to={`${ENV.URL}/panel/${title}`} className="card-categories-info__btn">
        <img
          src={`${ENV.URL}/icons/eye-regular-white.svg`}
          alt="icono de la ver categoria"
          className="card-categories-info__btn__img"
        />
        <span className="card-categories-info__btn__text">Ver todo</span>
      </Link>
    </div>
  );
};

export default CardCategoriesInfo;
