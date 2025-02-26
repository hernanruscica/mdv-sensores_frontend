import React from 'react'
import BtnCallToAction from '../../components/BtnCallToAction/BtnCallToAction';
import SearchInput from '../../components/SearchInput/SearchInput';

import './ButtonsBar.css';

const ButtonsBar = (props) => {
    const {itemsName, itemsQty, showAddButton = false} = props;
    let itemNameCleaned = itemsName.split('/');
    itemNameCleaned = itemNameCleaned.length > 1 ? itemNameCleaned.pop() : itemNameCleaned;

    return (
        <div className='buttons-bar'>
            {(showAddButton) ?
            <BtnCallToAction
                text="Agregar"
                icon="plus-circle-solid.svg"
                type="normal"
                url={`panel/${itemsName}/agregar`}
            />
            : ''}
            <SearchInput itemsName={itemNameCleaned}/>
            <span>Mostrando <strong>{itemsQty || "0"}</strong> {itemNameCleaned}</span>   
        </div>
    )
}

export default ButtonsBar