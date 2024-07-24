import React from 'react'
import { Link } from "react-router-dom";
import './BtnCallToAction.css';
import { ENV } from "../../context/env";


const  BtnCallToAction = (props) => {
    
    const { text, icon, type, url, onClick } = props;
    return (
      <Link
        to={url}   
        onClick={onClick ? onClick : ''}     
        className={`navbar-btn  navbar-btn--${type}`}
      >
        <img
          src={`${ENV.URL}/icons/${icon}`}
          className="navbar-btn-icon"
        />
        <span className="navbar-btn-text">{text}</span>
      </Link>
    );
  }

export default BtnCallToAction