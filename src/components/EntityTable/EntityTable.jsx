import React from 'react'; 
import './EntityTable.css'; 
import BtnCallToAction from '../BtnCallToAction/BtnCallToAction'; 
 
const EntityTable = ({ data, columns, entityType }) => { 
  console.log(data); 
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
          {data.map((item, rowIndex) => { 
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