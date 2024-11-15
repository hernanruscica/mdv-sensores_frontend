import React, {useEffect, useState} from 'react'
import './Breadcumb.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {ENV} from '../../context/env.js';
import { useDashboard } from '../../context/DashboardContext.jsx';

const Breadcumb = () => {
  const location = useLocation();  
  const fullPath =  location.pathname.split('/').filter(path => path !== '');  

 
  const { dataloggers, channels, alarms, locations, users  } = useDashboard(); 

  function transformArray(inputArray, dataloggers, canales, alarmas, ubicaciones, usuarios, icons) {
    return inputArray.map((item, index, arr) => {
        let transformedItem = item; // Inicialmente, el item no transformado
        let icon = null; // Inicialmente, no hay icono

        // Buscar si el item anterior es una entidad que requiere transformación
        if (arr[index - 1] === "dataloggers") {          
            const foundDatalogger = dataloggers.find(d => d.id === parseInt(item));
            transformedItem = foundDatalogger ? foundDatalogger.nombre : item;
        }
        if (arr[index - 1] === "canales") {
            const foundCanal = canales.find(c => c.canal_id === parseInt(item));
            transformedItem = foundCanal ? foundCanal.canal_nombre : item;
        }
        if (arr[index - 1] === "alarmas") {
            const foundAlarma = alarmas.find(a => a.id === parseInt(item));
            transformedItem = foundAlarma ? foundAlarma.nombre : item;
        }
        //Falta hacer esto mismo para ubicaciones, y usuarios para mostrar los nombres, los iconos los muestra bien
        if (arr[index - 1] === "ubicaciones") {
          const foundUbicacion = ubicaciones.find(a => a.ubicaciones_id === parseInt(item));
          transformedItem = foundUbicacion ? foundUbicacion.ubicaciones_nombre : item;
        }
        if (arr[index - 1] === "usuarios") {
          const foundUsuario = usuarios.find(a => a.usuarios_id === parseInt(item));
          transformedItem = foundUsuario ? foundUsuario.usuario_nom_apell : item;
        }
        

        // Buscar el ícono correspondiente según el nombre de la sección (arr[index - 1])
        const foundIcon = icons.find(icon => icon.nameSection === arr[index ]);
        if (foundIcon) {
            icon = foundIcon.fileName;
        }else{
          icon = icons.find(icon => icon.nameSection === arr[index - 1]).fileName;
        }

        // Devolver un objeto que contenga tanto el item transformado como el icono (si aplica)
        return {
            name: transformedItem,
            icon: icon || 'default-icon.svg', // Si no se encuentra un icono, usar un icono por defecto
            path: item
        };
    });
}
  

    const navigate = useNavigate();
    const handleBack = (event) => {
        
        event.preventDefault();
        navigate(-1);
      };
      
      const LeftArrow = () => (
        <a href="#" onClick={handleBack} className='breadcumb-btn'>
            <img 
                src={`${ENV.URL}/icons/arrow-left-solid.svg`} 
                alt="left arrow icon"  
                className='breadcumb-icon'         
                />
            <span>Atras</span>
        </a>        
    );

    /*
  if (loading) {
    return ( <div>Cargando ...</div>);
  }
  */
  const namesBreadcumbArray = transformArray(fullPath, dataloggers, channels, alarms, locations, users, ENV.ICONS);
   
  
  let currentPath = '';
  return (
    <>      
      <nav className='Breadcumb-container'>
        <ul className="breadcrumb">
          <li key={"back"} className='breadcumb-item'>
              <LeftArrow />
          </li>          

          {/* Home */}
          <li key={"home"} className='breadcumb-item'>
            <Link to={ENV.URL} className='breadcumb-btn'>
              <img src={`${ENV.URL}/icons/home-solid.svg`} 
                        alt="icono de home o inicio" 
                        className='breadcumb-icon'
              />
              <span>Home</span>            
            </Link> 
            <img src={`${ENV.URL}/icons/chevron-right-solid.svg`} 
                      alt="icon separador de breadcumb" 
                      className='breadcumb-separator-icon'
            />
          </li>


          {           
          namesBreadcumbArray.map((item, index, array) => {             

            currentPath = currentPath + item.path + '/';
            const isLastIndex = (index == array.length - 1 ) ;
           

            return (
              (!isLastIndex)
              ?            
              (<li key={currentPath} className='breadcumb-item'>
                <Link to={`${ENV.URL}/${currentPath}`} className='breadcumb-btn'>
                  <img src={`${ENV.URL}/icons/${item.icon}`} 
                            alt="icono de home o inicio" 
                            className='breadcumb-icon'
                  />
                  <span>{item.name}</span>               
                </Link>
                  <img src={`${ENV.URL}/icons/chevron-right-solid.svg`}
                            alt="icon separador de breadcumb"  
                            className='breadcumb-separator-icon'                        
                  />
              </li>)
              :
              (<li key={currentPath} className='breadcumb-item-current'>
                <img src={`${ENV.URL}/icons/${item.icon}`} 
                            alt="icono de home o inicio" 
                            className='breadcumb-icon'/>
                <span >{item.name}</span>
              </li> )
            )
          }
          )}       

        </ul>
      </nav>
    </>
  )
}

export default Breadcumb