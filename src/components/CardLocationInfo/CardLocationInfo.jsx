

import "./CardLocationInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import CardTitle from "../CardTitle/CardTitle";
import CardLinkButton from "../CardLinkButton/CardLinkButton";
import { useAuth } from "../../context/AuthContext.jsx";


export const CardLocationInfo =  (props) => {    
  const { locationData, dataloggers,  iconSrc, currentUser} = props;  
  const {user} = useAuth();
  const currentDatalogger = dataloggers.find(datalogger=> datalogger.ubicacion_id == locationData.ubicaciones_id);

  //console.log(currentDatalogger);
  
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
        <p className="card-location-info__description__paragraph">
          {`Direccion: ${locationData.ubicaciones_calle} ${locationData.ubicaciones_calle_numero}`}
        </p>
        <p className="card-location-info__description__paragraph">
          {`Telefono: ${locationData.ubicaciones_tel}`}
        </p>
      </div>
      <div className="card-location-info__description">
      <strong>Dataloggers Conectados: </strong>
      <CardBtnSmall
          title={currentDatalogger.nombre}
          url={`/panel/dataloggers/${currentDatalogger.id}`}
        />
      </div>

      <div className="card-location-info__description">
      <p className="card-location-info__description__paragraph">
      <span>
        {(currentUser?.id === user?.id) ? (
          <>
          <span>Su Rol es : </span>
          <strong>
            {user?.espropietario == 1 ? (
              'Propietario'
            ) : (
              <strong>{locationData?.usuarios_nombre_rol}</strong>
            )}
          </strong>
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
