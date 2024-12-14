import React from "react";

import "./CardCategoriesInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import CardTitle from "../CardTitle/CardTitle";
import CardLinkButton from "../CardLinkButton/CardLinkButton";
import { useAuth } from "../../context/AuthContext.jsx";


export const CardCategoriesInfo = (props) => {    
  const { title, itemsQty, iconSrc } = props;
  const {user} = useAuth();
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

        {(user.espropietario == 1) ?
          <CardBtnSmall 
            title={`Agregar ${title}`} 
            url={`${title}/agregar`}
          />
          : ''}
      </div>
      <CardLinkButton 
        url={`/panel/${title}`}
      />     
    </div>
  );
};

export default CardCategoriesInfo;
