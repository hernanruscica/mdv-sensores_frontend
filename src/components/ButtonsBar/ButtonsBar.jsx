import React from 'react'
import BtnCallToAction from '../../components/BtnCallToAction/BtnCallToAction';
import SearchInput from '../../components/SearchInput/SearchInput';
import './ButtonsBar.css';

const ButtonsBar = (props) => {
    const {itemsName, itemsQty} = props;
    return (
        <div className='buttons-bar'>
            <BtnCallToAction
                text="Agregar"
                icon="plus-circle-solid.svg"
                type="normal"
                url={`panel/${itemsName}/agregar`}
            />
            <SearchInput itemsName={itemsName}/>
            <span>Mostrando <strong>{itemsQty || "0"}</strong> {itemsName}</span>   
        </div>
    )
}

export default ButtonsBar