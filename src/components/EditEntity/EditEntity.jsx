
import { useEffect, useState } from 'react';
import createApiClient from '../../api/apiClient.js' ;

function EditEntity(props) {
  
  const {id, entity} = props;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formValues, setFormValues] = useState({});
  const apiClient = createApiClient();

  

  useEffect(() => {
    // Hacer una petición a la API para obtener los datos de la entidad
    const fetchData = async () => {
      try {        
        const currentEntityName = entity.slice(0, -1);
        const response = await apiClient.get(`/api/${entity}/${id}`);
        setData(response.data[currentEntityName]);
        setFormValues(response.data[currentEntityName]); // Inicializa el formulario con los datos
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [entity, id]);

  // Función para manejar el cambio de valores en el formulario
  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  // Función para enviar los cambios a la API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //await axios.put(`/api/${entity}/${id}`, formValues);
      alert('Entidad actualizada con éxito');
    } catch (error) {
      console.error("Error updating entity:", error);
    }
  };

  if (loading) return <p>Cargando datos...</p>;

  return (
    <div>      
      <form onSubmit={handleSubmit}>
        {/* Renderiza los campos del formulario basado en los datos */}
        {Object.keys(formValues).map((key) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="text"
              name={key}
              value={formValues[key]}
              onChange={handleChange}
            />
          </div>
        ))}
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
}

export default EditEntity;
