import React, { useEffect } from 'react'
import DigitalPorcentageOn from '../ApexCharts/DigitalPorcentageOn/DigitalPorcentageOn'
import './CardChannelGraphic.css';

const CardChannelGraphic = (props) => {
    const {dataChannel, currentChannelName, currentChannelTimeProm} = props;

    useEffect(() => {
        //console.log(dataChannel)
    }, [])
  return (
    <>
      <div className="graphic-container">        
        <DigitalPorcentageOn 
            data={dataChannel}          
            currentChannelName={currentChannelName}      
            currentChannelTimeProm={currentChannelTimeProm}
        />
      </div>  
    </>
  )
}

export default CardChannelGraphic