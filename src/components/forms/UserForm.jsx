import { useEffect, useState } from 'react';
import createApiClient from '../../api/apiClient.js';
import { ENV } from '../../context/env.js';

function UserForm({ id }) {
  
  const [user, setUser] = useState({
    nombre_1: '',
    nombre_2: '',
    apellido_1: '',
    apellido_2: '',
    email: '',
    telefono: '',
    foto: '',
  });
  const [profileImage, setProfileImage] = useState(''); // Imagen de perfil actual
  const [newImage, setNewImage] = useState(''); // Nueva imagen seleccionada
  const apiClient = createApiClient();

  //console.log(token)

  useEffect(() => {
    const fetchUser = async () => {
      const response = await apiClient.get(`/api/users/${id}`);
      setUser(response.data.user);
      setProfileImage(response.data.user.foto); // Asigna la imagen de perfil actual
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

  
    // Crear formData para enviar los datos incluyendo la imagen
    const formData = new FormData();
    
    // Verifica que los campos del usuario tengan valores válidos
    formData.append('nombre_1', user.nombre_1 || '');
    formData.append('nombre_2', user.nombre_2 || '');
    formData.append('apellido_1', user.apellido_1 || '');
    formData.append('apellido_2', user.apellido_2 || '');
    formData.append('email', user.email || '');
    formData.append('telefono', user.telefono || '');
    formData.append('foto', newImage || '')
      
    // Verificar que FormData contenga los datos
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]); // Imprime los valores dentro de formData para debug
    }
  
    try {
        // Crear un cliente de API con encabezados personalizados
        const apiClientMultipart = createApiClient('multipart/form-data');        
    
        await apiClientMultipart.put(`/api/users/${id}`, formData);
        //await apiClient.put(`/api/users/${id}`, formData);
    
        alert('Usuario actualizado con éxito');
      } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        alert('Error al actualizar el usuario');
      }
    };
  

  return (
    <form onSubmit={handleSubmit}>
      {/* Imagen de perfil */}
      <div>
        <label>Imagen de Perfil:</label>
        {newImage ? (
          <img src={URL.createObjectURL(newImage)} alt="Vista previa" width="100" />
        ) : (
          <img src={`${ENV.IMAGES_URL}/${profileImage}`} alt="Imagen de perfil" width="100" />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      
      {/* Datos del usuario */}
      <div>
        <label>Nombre 1:</label>
        <input type="text" name="nombre_1" value={user.nombre_1} onChange={handleChange} />
        <label>Nombre 2:</label>
        <input type="text" name="nombre_2" value={user.nombre_2} onChange={handleChange} />
      </div>
      <div>
        <label>Apellido 1:</label>
        <input type="text" name="apellido_1" value={user.apellido_1} onChange={handleChange} />
        <label>Apellido 2:</label>
        <input type="text" name="apellido_2" value={user.apellido_2} onChange={handleChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={user.email} onChange={handleChange} />
        <label>Telefono:</label>
        <input type="text" name="telefono" value={user.telefono} onChange={handleChange} />
      </div>

      <button type="submit">Guardar cambios</button>
    </form>
  );
}

export default UserForm;
