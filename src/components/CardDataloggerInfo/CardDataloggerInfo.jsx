import { ENV } from "../../context/env";
import "./CardDataloggerInfo.css";
import { CardBtnSmall } from "../CardBtnSmall/CardBtnSmall";
import CardTitle from "../CardTitle/CardTitle";
import CardList from "../CardList/CardList";
import CardLinkButton from "../CardLinkButton/CardLinkButton";

export const CardDataloggerInfo = (props) => {    
  const { name, id, location, channels, alarms, iconSrc } = props;

  return (
    <div className="card-datalogger-info">      
      <CardTitle 
        iconSrc={iconSrc}
        text={name}
      />
      <div className="card-datalogger-info__description">
        <p className="card-datalogger-info__description__paragraph">
          <span>Instalado en :</span>
          <CardBtnSmall
            title={location.ubicaciones_nombre}
            key={`location-${location.ubicaciones_id}`}
            url={`${ENV.URL}/panel/ubicaciones/${location.ubicaciones_id}`}
          />
        </p>
        <p className="card-datalogger-info__description__paragraph">
          <span>Canales conectados :</span>          
          <CardList 
            items={channels}
            getKey={(channel) => `channel-${channel.canales_id}`}
            getTitle={(channel => channel.canales_nombre)}
            getUrl={channel => `/panel/dataloggers/${id}/canales/${channel.canales_id}`}
            emptyMessage={'No tiene'}
          />
        </p>   
        <p className="card-datalogger-info__description__paragraph">
          <span>Alarmas vigentes :</span>
          <CardList
            items={alarms}
            getKey={(alarm) => `alarm-${alarm.id}`}
            getTitle={(alarm) => alarm.nombre}
            getUrl={(alarm) => `/panel/dataloggers/${alarm.datalogger_id}/canales/${alarm.canal_id}/alarmas/${alarm.id}`}
            emptyMessage="No tiene"
          />
        </p>
      </div>
      <CardLinkButton 
        url={`${ENV.URL}/panel/dataloggers/${id}`}
      />      
    </div>
  );
};

export default CardDataloggerInfo;