import React, {useState,useEffect} from 'react';
import './CardLocationDetails.css';
import { CardBtnSmall } from '../CardBtnSmall/CardBtnSmall';
import { ENV } from "../../context/env";
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction';
import { formatDate } from "../../utils/Dates/Dates.js";
import { useAuth } from "../../context/AuthContext.jsx";
import MyModal from '../MyModal/MyModal.jsx';
import createApiClient from '../../api/apiClient.js';
import { useNavigate } from 'react-router-dom';

const CardLocationDetails = (props) => {
  const { id, type, location,  dataloggers, channels, alarms } = props;       
  const channelsByLocation = channels.filter(channel => channel.ubicaciones_id == id);
  const analogChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('a')).length; 
  const digitalChannelsByLocationQty =  channelsByLocation.filter(channel => channel.nombre_columna.startsWith('d')).length;   
  const {user} = useAuth();    
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);    
  const apiClient = createApiClient();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const handleClickDelete = () => {
      console.log('Click en delete ubicacion');
      setIsModalDeleteOpen(true);
    }
    const handleDeleteClose = () => {
      console.log('Click en cerrar delete ubicacion');
      setIsModalDeleteOpen(false);
    }
    const handleClickDeleteConfirm = async (e) => {
      e.preventDefault();
      console.log('Click en confirmar delete ubicacion');      
      const formData = new FormData();
      formData.append("estado", '0');
      setLoading(true);
      const response = await apiClient.put(`/api/locations/${location.ubicaciones_id}`, formData);
      if (response.status == '200'){
        console.log(`Ubicación ${location.ubicaciones_nombre} archivada con éxito!` )
      }else{
        console.log(`Error al archivar la ubicación`);
      }
      setLoading(false);
      navigate('/panel/ubicaciones');
      setIsModalDeleteOpen(false);
    }

    //console.log(location);
  return (    
    <div className="card_location_details">
      <MyModal 
        isOpen={isModalDeleteOpen}
        onClose={handleDeleteClose}
        title="¿Confirma la acción?"
        description={`Archivado de la ubicación: <strong>${location.ubicaciones_nombre}</strong>.`}
        >
          {
            (!loading)
            ? <div className='card_location_modal_btn-container'>
                <BtnCallToAction 
                  text="Confirmar" 
                  icon='archive-solid.svg' 
                  type="danger"
                  onClick={handleClickDeleteConfirm}
                />
                <BtnCallToAction 
                  text="Cancelar" 
                  icon='times-solid.svg' 
                  type="normal"
                  onClick={handleDeleteClose}
                />
              </div>
            : <span>Archivando ubicación...</span>
          }
      </MyModal>
      <div className="card_location_details__container">
        <img src={`${ENV.IMAGES_URL}/${location.ubicaciones_foto}`} 
          className='location-details__container__image'
          alt={`Foto de ${location.ubicaciones_nombre}`}
          title={`Foto de ${location.ubicaciones_nombre}`} 
        />
      </div>
      <div className="card_location_details__info">
        <h2 className="card_location_details__info__title">        
          {location.ubicaciones_nombre}
        </h2>
        <p className="card_location_details__paragraph">
        📝{location.ubicaciones_descripcion}
        </p>
        <p className="card_location_details__paragraph">
        🏢<strong>Direción: </strong>{`${location.ubicaciones_calle} ${location.ubicaciones_calle_numero}`}
        </p>
        <p className="card_location_details__paragraph">
        📞<strong>Telefono: </strong>{location.ubicaciones_tel} - 📧 <strong>Correo: </strong> {location.ubicaciones_email}
        </p>
        <p className="card_location_details__paragraph">
        🌡️<strong>Dataloggers conectados : </strong>
          {(dataloggers.length > 0)
            ? dataloggers.map((datalogger) => (
            <CardBtnSmall
              title={datalogger.nombre}
              key={`datalogger-${datalogger.id}`}
              url={`${ENV.URL}/panel/dataloggers/${datalogger.id}`}
            />
          ))
          : <span className='card_location_text_danger'>No tiene dataloggers</span>}
        </p>
        <p className="card_location_details__paragraph">
        📝 {location.ubicaciones_descripcion}
        </p>
        <p className="card_location_details__paragraph">
        📅<strong>Creada el </strong>{formatDate(location.fecha_creacion, 'short')}
        </p>
        <p className="card_location_details__paragraph">
        📈 <strong>canales conectados : </strong>
          {
            (analogChannelsByLocationQty > 0 && digitalChannelsByLocationQty > 0)
            ? <span>{`${analogChannelsByLocationQty || 0} analógicos y ${digitalChannelsByLocationQty || 0} digitales`}</span>
            : <span className='card_location_text_danger'>No tiene canales.</span>
          }
          
        </p>
        <p className="card_location_details__paragraph">
        ⏰ <strong>Alarmas programadas : </strong>          
             {
             (alarms.length > 0) 
              ? <CardBtnSmall
                  title={`Ver ${alarms.length} alarmas`}
                  key={`ver_alarmas_ubicacion_${id}`}
                  url={`${ENV.URL}/panel/ubicaciones/${id}/alarmas`}/>   
              : <span className='card_location_text_danger'>No tiene alarmas.</span>                   
             }
          </p>
          <div className="card_location_details__btn-container">
          {/* text, icon, type, url, onClick */}
            {(user.espropietario == 1)?
            <>
              <BtnCallToAction 
                text="Editar" 
                icon='edit-regular.svg' 
                url={`panel/ubicaciones/${id}/edicion`}/>
              <BtnCallToAction 
                text="Archivar" 
                icon='archive-solid.svg' 
                type="danger"
                onClick={handleClickDelete}
                />
            </>
            : ''}

          </div>
      </div>
      
    </div>
  );
};

export default CardLocationDetails;

