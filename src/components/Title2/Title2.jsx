import React from 'react'
import './Title2.css';
import {ENV} from '../../context/env.js';

export const Title2 = (props) => {
    const { text , type} = props;
    const currentPageIcon = ENV.ICONS.find(({nameSection}) => nameSection === type) ; 
    const iconUrl=`${ENV.URL}/icons/${currentPageIcon.fileName}` || ENV.ICONS.find(({nameSection}) => nameSection === 'default');
  return (
    <div className='title2-container'>
    <img src = {iconUrl} 
                alt= {`Icono de ${type}`} 
                className='title2-img'/>  
    <h2 className='title2-text'>{text}</h2>
    </div>
  )
}
