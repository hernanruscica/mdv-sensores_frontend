import React from 'react'
import BtnCallToAction from '../../components/BtnCallToAction/BtnCallToAction';
import SearchInput from '../../components/SearchInput/SearchInput';
import './ButtonsBar.css';

const ButtonsBar = (props) => {
    const {itemsName} = props;
    return (
        <div className='buttons-bar'>
            <BtnCallToAction
                text="Agregar"
                icon="plus-circle-solid.svg"
                type="normal"
                url="agregar"
            />
            <SearchInput itemsName={itemsName}/>
            <span>Mostrando <strong>3</strong> {itemsName}</span>
        </div>
    )
}

export default ButtonsBar