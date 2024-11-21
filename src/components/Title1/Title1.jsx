import React from 'react'
import './Title1.css';
import {ENV} from '../../context/env.js';

export const Title1 = (props) => {
    const { text , type} = props;    
    const currentPageIcon = ENV.ICONS.find(({nameSection}) => nameSection === type) ; 
    const iconUrl=`${ENV.URL}/icons/${currentPageIcon.fileName}` || ENV.ICONS.find(({nameSection}) => nameSection === 'default');
  return (
    <div className='title1-container'>
    <img src = {iconUrl} 
                alt= {`Icono de ${type}`} 
                className='title1-img'/>  
    <h1 className='title1-text'>{text}</h1>
    </div>
  )
}
