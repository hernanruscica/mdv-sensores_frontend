import React from "react";
import CardLinkButton from "../CardsCommon/CardLinkButton/CardLinkButton.jsx";

import "./CardCategoriesInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import CardTitle from "../CardsCommon/CardTitle/CardTitle.jsx";



export const CardCategoriesInfo = (props) => {    
  const { title, itemsQty, iconSrc } = props;

  return (
    <div className="card-categories-info">      
      <CardTitle 
        iconSrc={iconSrc}
        text={title}
      />
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
