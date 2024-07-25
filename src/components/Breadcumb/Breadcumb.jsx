import React from 'react'
import './Breadcumb.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {ENV} from '../../context/env.js';

const Breadcumb = () => {
  const location = useLocation();  
  const fullPath =  location.pathname.split('/').filter(path => path !== '');
  //const currentPageName = fullPath[fullPath.length - 1];  
  const currentPageName = fullPath.pop();  
  const currentPageIcon = ENV.ICONS.find(({nameSection}) => nameSection === currentPageName) || ENV.ICONS.find(({nameSection}) => nameSection === 'default');  
    console.log(location.pathname);
    console.log(fullPath, fullPath.length)

    const navigate = useNavigate();
    const handleBack = (event) => {
        //console.log("back");
        event.preventDefault();
        navigate(-1);
    };

    const LeftArrow = () => (
        <button onClick={handleBack} className='breadcumb-btn'>
            <img 
                src={`${ENV.URL}/icons/arrow-left-solid.svg`} 
                alt="left arrow icon"  
                className='breadcumb-icon'         
            />
            <span>Atras</span>
        </button>        
    );

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


          {fullPath.map((path, index) => 
          { 
            const currentPath = fullPath.slice(0, index + 1).join('/') ;         
            const currentIcon = ENV.ICONS.find(({nameSection}) => nameSection === path) || ENV.ICONS.find(({nameSection}) => nameSection === 'default');       
            //console.log('currentIcon', currentIcon.fileName)
            return (
              <li key={path} className='breadcumb-item'>
                <Link to={`${ENV.URL}/${currentPath}`} className='breadcumb-btn'>
                  <img src={`${ENV.URL}/icons/${currentIcon.fileName}`} 
                            alt="icono de home o inicio" 
                            className='breadcumb-icon'
                  />
                  <span>{path}</span>               
                </Link>
                  <img src={`${ENV.URL}/icons/chevron-right-solid.svg`}
                            alt="icon separador de breadcumb"  
                            className='breadcumb-separator-icon'                        
                  />
              </li>
            )
          }
          )}


          {/* Current Page */}
          <li key={"current-page"} className='breadcumb-item-current'>
            <img src={`${ENV.URL}/icons/${currentPageIcon.fileName}`} 
                        alt="icono de home o inicio" 
                        className='breadcumb-icon'/>
            <span >{currentPageName}</span>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Breadcumb