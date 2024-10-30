import React, {useState} from 'react';
import './CardImageLoadingPreview.css';
import { ENV } from "../../context/env.js";


const CardImageLoadingPreview = (props) => {
   
    const { imageFileName, setNewImageHandler } = props;     
    //console.log(user)   
   
    const [newImage, setNewImage] = useState(''); // Nueva imagen seleccionada

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setNewImage(file);
      setNewImageHandler(file);
    };

   return (
     <div className="card-location-details">
       <div className="location-details__container">
         {newImage ? (
           <img
             src={URL.createObjectURL(newImage)}
             alt="Vista previa"
             className="location-details__container__image"
           />
         ) : (
           <img
             src={`${ENV.IMAGES_URL}/${imageFileName}`}
             alt="foto de perfil"
             title="foto de perfil"
             className="location-details__container__image"
           />
         )}
       </div>
       <div className="location-details__info">
         <p className="card-location-details__paragraph">
           Haciendo click en el boton de abajo, puede subir una nueva foto. 
         </p>

         <div className="card-locatin-details__btn-container">
          <label htmlFor="file_upload" className='edit-button'>
            <img src={`${ENV.URL}/icons/folder-open-regular.svg`} 
              style={{width: '20px'}}
              alt="icono de subir archivos" />
              <span>subir archivo</span>
          </label>
          <input type="file" 
                id='file_upload'
                accept="image/*" 
                onChange={handleImageChange}                       
                style={{display: 'none'}} 
          />
          
         </div>
       </div>
     </div>
   );
};

export default CardImageLoadingPreview;

