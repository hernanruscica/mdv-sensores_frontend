import "./CardLocationInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import CardTitle from "../CardTitle/CardTitle";
import CardLinkButton from "../CardLinkButton/CardLinkButton";
import { useAuth } from "../../context/AuthContext.jsx";


export const CardLocationInfo =  (props) => {    
  const { locationData,  iconSrc, currentUser} = props;  
  const {user} = useAuth();
  
  return (
    <div className="card-location-info">      
      <CardTitle 
        text={locationData.ubicaciones_nombre}
        iconSrc={iconSrc}
      />
      <div className="card-location-info__description">
        <p className="card-location-info__description__paragraph">
          {locationData.ubicaciones_descripcion}
        </p>
      </div>
      <div className="card-location-info__description">
      <p className="card-location-info__description__paragraph">
      <span>
        {(currentUser?.id === user?.id) ? (
          <>
            Su Rol es {user?.espropietario == 1 ? (
              'Propietario'
            ) : (
              <strong>{locationData?.usuarios_nombre_rol}</strong>
            )}
          </>
        ) : (
          `El Rol de ${currentUser?.nombre_1} ${currentUser?.apellido_1} es `
        )}
      </span>

        {user?.espropietario == 999 && (
          <CardBtnSmall
            title="Cambiar rol"
            url={`/panel/usuarios/${locationData?.usuarios_id}`}
          />
        )}
      </p>

      </div>     
      {(currentUser?.id == user?.id || user?.espropietario == 1)?
      <CardLinkButton 
        url={`/panel/ubicaciones/${locationData.ubicaciones_id}`}
      />
      : ''}
    </div>
  );
};

export default CardLocationInfo;
