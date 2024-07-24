// SearchInput.js
import React from 'react';
import './SearchInput.css';
import { ENV } from '../../context/env';

const SearchInput = (props) => {
    const {itemsName} = props;
  return (
    <div className="search-container">
      <input type="text" className="search-input" placeholder={`Buscar ${itemsName}`} />
      <img src={`${ENV.URL}/icons/search-solid-grey.svg`} className="search-icon" />
      
    </div>
  );
};

export default SearchInput;
