import React from 'react'
import BtnCallToAction from '../../components/BtnCallToAction/BtnCallToAction';
import SearchInput from '../../components/SearchInput/SearchInput';
//import { useAuth } from "../../context/AuthContext.jsx";
import './ButtonsBar.css';

const ButtonsBar = (props) => {
    const {itemsName, itemsQty, showAddButton = false} = props;
    //const {user} = useAuth(); 
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
            <SearchInput itemsName={itemsName}/>
            <span>Mostrando <strong>{itemsQty || "0"}</strong> {itemsName}</span>   
        </div>
    )
}

export default ButtonsBar