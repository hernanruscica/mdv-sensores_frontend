import "./CardLocationInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import CardTitle from "../CardTitle/CardTitle";
import CardList from "../CardList/CardList";
import CardLinkButton from "../CardLinkButton/CardLinkButton";
import { useAuth } from "../../context/AuthContext.jsx";


export const CardLocationInfo =  (props) => {    
  const { locationData, dataloggers , iconSrc, currentUser} = props;
  //const filteredDataloggersByLocation =  dataloggers.filter(datalogger => datalogger.ubicacion_id === locationData.ubicaciones_id); 
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
            {(currentUser?.id == user?.id) 
              ? 'Su Rol es  ' 
              : `El Rol de ${currentUser.nombre_1}  ${currentUser.apellido_1} es `} : <strong>{locationData.usuarios_nombre_rol}</strong></span>
          {(user?.espropietario == 1) ?
          <CardBtnSmall
            title='Cambiar rol'
            url={`/panel/usuarios/${locationData.usuarios_id}`}
          />
          : ''}

        </p>
        {/* <p className="card-location-info__description__paragraph">        
          <CardList 
            items={filteredDataloggersByLocation}
            getKey={(datalogger) => `datalogger-${datalogger.id}`}
            getTitle={(datalogger) => datalogger.nombre}
            getUrl={(datalogger) => `/panel/dataloggers/${datalogger.id}`}
            emptyMessage={'No tiene.'}
          />
        </p>         */}
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
