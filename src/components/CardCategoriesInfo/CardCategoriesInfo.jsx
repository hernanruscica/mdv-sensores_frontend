import React from "react";
import CardLinkButton from "../cardsCommon/cardLinkButton/CardLinkButton";

import "./CardCategoriesInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";




export const CardCategoriesInfo = (props) => {    
  const { title, itemsQty, iconSrc } = props;

  return (
    <div className="card-categories-info">
      <div className="card-categories-info__title">
        <img
          src={iconSrc}
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
      <CardLinkButton 
        url={`/panel/${title}`}
      />     
    </div>
  );
};

export default CardCategoriesInfo;
