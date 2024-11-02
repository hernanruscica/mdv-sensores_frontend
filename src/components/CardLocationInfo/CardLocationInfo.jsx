import "./CardLocationInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import CardTitle from "../CardsCommon/cardTitle/cardTitle";
import CardList from "../CardsCommon/cardList/CardList";
import CardLinkButton from "../CardsCommon/cardLinkButton/CardLinkButton";



export const CardLocationInfo =  (props) => {    
  const { locationData, dataloggers , iconSrc} = props;
  const filteredDataloggersByLocation =  dataloggers.filter(datalogger => datalogger.ubicacion_id === locationData.ubicaciones_id); 
 
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
          <span>Su rol : {locationData.usuarios_nombre_rol}</span>
          <CardBtnSmall
            title='Cambiar rol'
            url={`/panel/usuarios/${locationData.usuarios_id}`}
          />
        </p>
        <p className="card-location-info__description__paragraph">        
          <CardList 
            items={filteredDataloggersByLocation}
            getKey={(datalogger) => `datalogger-${datalogger.id}`}
            getTitle={(datalogger) => datalogger.nombre}
            getUrl={(datalogger) => `/panel/dataloggers/${datalogger.id}`}
            emptyMessage={'No tiene.'}
          />
        </p>        
      </div>     
      <CardLinkButton 
        url={`/panel/ubicaciones/${locationData.ubicaciones_id}`}
      />
    </div>
  );
};

export default CardLocationInfo;
