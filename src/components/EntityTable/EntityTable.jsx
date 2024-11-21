import React from 'react'; 
import './EntityTable.css'; 
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction'; 
import {formatDate} from '../../utils/Dates/Dates';
 
const EntityTable = ({ data, columns, entityType }) => { 
  
  
  let preparedData = null;
  if (entityType == "alarmas_logs") {
    preparedData = data.map((item) => {

      const jsonString = item.variables_valores;      
      const formatted = jsonString.replace(/{"porcentaje_encendido":([\d.]+)}/, 'Porcentaje encendido = $1 %');        

     
      return {
        ...item, 
        disparada: item.disparada == 1 ? 'Disparo' : 'Reset',  
        fecha_disparo: formatDate(item.fecha_disparo, 'long'),
        fecha_vista: item.fecha_vista == "2024-01-01T00:00:00.000Z" ? 'No vista' : formatDate(item.fecha_vista, 'long'),
        variables_valores: formatted,
      }
    });
   
  }else{
    preparedData = data;
  }

  return ( 
    <div className="table-container"> 
      <table className="entity-table"> 
        <thead> 
          <tr> 
            {columns.map((column, index) => ( 
              <th key={index}>{column.header}</th> 
            ))} 
            {entityType !== 'alarmas_logs' && <th></th>}
          </tr> 
        </thead> 
        <tbody> 
          {preparedData.map((item, rowIndex) => { 
            const urlPrefix = entityType === 'alarmas'  
              ? `panel/dataloggers/${item.datalogger_id}/canales/${item.canal_id}/`  
              : 'panel/';   
            return ( 
              <tr key={rowIndex}> 
                {columns.map((column, colIndex) => ( 
                  <td key={colIndex}>{item[column.key] !== null ? item[column.key] : 0}</td> 
                ))}
                {entityType !== 'alarmas_logs' && (
                  <td>                
                    <BtnCallToAction  
                      text="ver"  
                      icon="eye-regular.svg"  
                      url={`${urlPrefix}${entityType}/${item[`${entityType}_id`] || item.id}`} 
                    /> 
                  </td>  
                )}
              </tr> 
            );
          })} 
        </tbody> 
      </table> 
    </div> 
  ); 
}; 
 
export default EntityTable;