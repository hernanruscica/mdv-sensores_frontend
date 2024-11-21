import React, { useState, useEffect } from "react";
import { useLocation, useParams } from 'react-router-dom';
import { useDashboard } from '../../context/DashboardContext';
import { useAuth } from '../../context/AuthContext';
import { Title1 } from '../../components/Title1/Title1';
import { Title2 } from '../../components/Title2/Title2';
import Breadcumb from '../../components/Breadcumb/Breadcumb';
import EntityTable from '../../components/EntityTable/EntityTable';

const Alarms = () => {
  const location = useLocation();  
  const { dataloggerId, channelId, locationId, userId } = useParams();
  const { dataloggers, channels, locations, alarms, alarmsLocation, loadAlarmsLocation } = useDashboard();
  const { user } = useAuth();

  //console.log(dataloggerId == undefined);

  const [searchBy, setSearchBy] = useState({ name: '', id: '' });
  const [columns, setColumns] = useState([]);
  const [currentEntityName, setCurrentEntityName] = useState('');
  const [currentAlarms, setCurrentAlarms] = useState([]);
  const [loading, setLoading] = useState('true'); 

  // Actualiza searchBy cuando cambia la ubicación
  useEffect(() => {
    const loadData = async () => {
      setLoading(true); // Inicia el estado de carga
      const pathSegments = location.pathname.split('/').filter(path => path !== '');      
      setSearchBy({
        name: pathSegments[1],
        id: parseInt(pathSegments[2]),
      });
      await loadAlarmsLocation(parseInt(pathSegments[2])); // Espera a que termine la carga
      setLoading(false); // Termina el estado de carga
    };
  
    loadData();
  }, [location]);
  

  // Actualiza currentAlarms y otras dependencias según searchBy
  useEffect(() => {    
    if (dataloggerId !== undefined && channelId === undefined) {
      const currentDatalogger = dataloggers.find(d => d.id == dataloggerId);
      //console.log('dataloggers', dataloggerId, currentDatalogger);         
      if (currentDatalogger) {
        setCurrentEntityName(currentDatalogger.nombre);
        setCurrentAlarms(alarms.filter(alarm => alarm.datalogger_id == dataloggerId));
        setColumns([
          { header: 'NOMBRE', key: 'nombre' },
          { header: 'CANAL', key: 'canal_nombre' },
          { header: 'CONDICION', key: 'condicion' },
        ]);
      }
    }
    if (channelId !== undefined) {
      const currentChannel = channels.find(c => c.canal_id == channelId);
      //console.log('canales', currentChannel);         
      if (currentChannel) {
        setCurrentEntityName(currentChannel.canal_nombre);
        setCurrentAlarms(alarms.filter(alarm => alarm.canal_id == channelId));
        setColumns([
          { header: 'NOMBRE', key: 'nombre' },
          { header: 'CONDICION', key: 'condicion' },
        ]);
      }
    };
    if (locationId !== undefined) {      
      //console.log('ubicaciones')         
      const currentLocation = locations.find(location => location.ubicaciones_id === searchBy.id);        
      if (currentLocation) {        
        setCurrentEntityName(currentLocation.ubicaciones_nombre);
        setCurrentAlarms(alarmsLocation);
        setColumns([
          { header: 'NOMBRE', key: 'nombre' },
          { header: 'CANAL', key: 'nombre' },
          { header: 'CONDICION', key: 'condicion' },
        ]);
      }
    };
    if (userId !== undefined) {
      //console.log('usuarios')
      setCurrentEntityName(`${user.nombre_1} ${user.apellido_1}`);
      setCurrentAlarms(alarms);
      setColumns([
        { header: 'NOMBRE', key: 'nombre' },
        { header: 'CANAL', key: 'canal_nombre' },
        { header: 'CONDICION', key: 'condicion' },
      ]);
    }
    
  }, [searchBy, alarmsLocation]);

  if (loading) {
    return (
      <div>Cargando...</div>
    )
  }
 
  
 
  return (
    <div>      
      <Title1
         type='alarmas'
         text={`Alarmas para ${currentEntityName} `}
       />
      <Breadcumb />
      <Title2
         type="alarmas"
         text= {`Alarmas activas para  ${currentEntityName}`}          
       />   
        <EntityTable 
         data={currentAlarms} 
         columns={columns}         
         entityType="alarmas"
       />    
    </div>
  );
};

export default Alarms;

{/* 

       <p>
   {currentChannel !== undefined && currentChannel !== null ? (
     <>
       <span>Estas son las alarmas activas para el canal </span>
       <strong>{currentChannel.canal_nombre}</strong>
       <span> del datalogger </span>
       <strong>{currentDatalogger.nombre}</strong>
     </>
   ) : (
     <>
       <span>Estas son las alarmas activas para el datalogger </span>
       <strong>{currentDatalogger.nombre}</strong>
     </>
   )}
 </p>


        
      
     </>
    <div>
      probando con el console.lgo
    </div>
  );
};

export default Alarms;
*/}