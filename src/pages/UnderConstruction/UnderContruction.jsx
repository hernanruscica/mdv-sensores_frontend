import Breadcumb from "../../components/Breadcumb/Breadcumb";
import { Title1 } from "../../components/Title1/Title1";
export const UnderConstruction = () => {  
  return (
    <>      
        <Title1 
            type='construccion'
            text='Página en Construcción...'
        />          
        <Breadcumb />     
        <p>Actualmente esta página está en construcción. Visítela dentro de un tiempo.</p> 
    </>
  );
};

