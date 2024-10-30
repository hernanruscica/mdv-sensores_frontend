import { useState } from 'react';
//import { FaUpload } from 'react-icons/fa'; // Asegúrate de instalar react-icons

function CustomFileUploadBtn({ handleImageChange }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    handleImageChange(e); // Llama a tu función de cambio de imagen
  };

  const triggerFileInput = () => {
    //document.getElementById('hiddenFileInput').click();
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        id="hiddenFileInput"
        onChange={handleFileChange}
        style={{ display: 'none' }} // Oculta el input de archivo
      />
      
      <input type="button" onClick={triggerFileInput} style={buttonStyle}>
        {/*<FaUpload style={{ marginRight: '8px' }} />  Ícono de carga */}
        {selectedFile ? 'Cambiar imagen' : 'Subir imagen'}
      </input>
    </div>
  );
}

// Estilos en línea para el botón (puedes mover esto a un archivo CSS)
const buttonStyle = {
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#007BFF', // Color de fondo
  color: '#fff',              // Color del texto
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px'
};

export default CustomFileUploadBtn;
