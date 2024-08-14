import React from "react";
//import { useAuth } from '../context/AuthContext';
import { Title1 } from "../../components/Title1/Title1";
import Breadcumb from "../../components/Breadcumb/Breadcumb";   
import ButtonsBar from '../../components/ButtonsBar/ButtonsBar';
import CardDataloggerInfo from '../../components/CardDataloggerInfo/CardDataloggerInfo'
import "./Dataloggers.css";

const Dataloggers = () => {
  //const { user } = useAuth();
  const currentLocation = {
      name: 'Ubicacion 1',
      id: 1
    }

  const currentChannels = [
    {
      name: 'canal #1',
      id: 1
    },    
    {
      name: 'canal Num. 2',
      id: 2
    },
    {
      name: 'canal Tres',
      id: 3
    }
]
const currentAlarms = [
  {
    name: 'Alarma #1',
    id: 1
  },    
  {
    name: 'Alarma Num. 2',
    id: 2
  },
  {
    name: 'Alarma Tres',
    id: 3
  }
]
  return (
    <>
      <Title1        
        type="dataloggers"
        text="Dataloggers"
      />
      <Breadcumb />
      <ButtonsBar itemsName='dataloggers'/>
      <section className="cards-container">
        <CardDataloggerInfo title='dataloggers' name='Datalogger 1' id='1' location={currentLocation} channels={currentChannels} alarms={currentAlarms}/>
        <CardDataloggerInfo title='dataloggers' name='Datalogger 2' id='2'  location={currentLocation} channels={currentChannels} alarms={currentAlarms}/>
        <CardDataloggerInfo title='dataloggers' name='Datalogger 3' id='3'  location={currentLocation} channels={currentChannels} alarms={currentAlarms}/>
      </section>
    </>
  );
};

export default Dataloggers;
