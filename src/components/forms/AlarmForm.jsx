import { useEffect, useState } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import "./form.css";

import Modal from "react-modal";
Modal.setAppElement("#root");

function AlarmForm({ id, dataloggerId, channelId }) {
  const [alarm, setAlarm] = useState({});

  const apiClient = createApiClient();
  
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [comparsionOperator, setComparsionOperator] = useState("");
  const [comparsionValue, setComparsionValue] = useState("");
  const [comparsionVariable, setComparsionVariable] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlarm = async () => {
      setLoading(true);
      const response = await apiClient.get(`/api/alarms/${id}`);              
      setAlarm(response.data.alarm);       
      setComparsionVariable(response.data.alarm.condicion.split(" ")[0]);
      setComparsionOperator(response.data.alarm.condicion.split(" ")[1]);
      setComparsionValue(response.data.alarm.condicion.split(" ")[2])
      setLoading(false);
      
    };
    fetchAlarm();   
  }, [id]);

  const handleChange = (e) => {
    setAlarm({
      ...alarm,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeComparsion = (e) => {
    const newComparsionOperator = e.target.name == "comparsion_operator" ? e.target.value : comparsionOperator;
    const newComparsionValue = e.target.name == "comparsion_value" ? e.target.value : comparsionValue;
    setComparsionOperator(newComparsionOperator);
    setComparsionValue(newComparsionValue); 
    setAlarm({
      ...alarm,
      condicion: `${comparsionVariable} ${newComparsionOperator} ${newComparsionValue}`,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Crear formData para enviar los datos incluyendo la imagen
    const formData = new FormData();   

    formData.append("nombre", alarm.nombre || "");
    formData.append("descripcion", alarm.descripcion || "");
    formData.append("tabla", alarm.tabla || "");
    formData.append("columna", alarm.columna || "");
    formData.append("periodo_tiempo", alarm.periodo_tiempo || "");
    formData.append("nombre_variables", alarm.nombre_variables || "");
    formData.append("condicion", alarm.condicion || "");    
    formData.append("tipo_alarma", alarm.tipo_alarma || "");    

    try {
      setLoading(true);
      const response = await apiClient.put(
        `/api/alarms/${id}`,
        formData
      );
      setLoading(false);

      if (response.status == 200) {
        setModalMessage("alarma actualizado con éxito");
        setModalIsOpen(true); // Abrir el modal
      }
    } catch (error) {
      console.error("Error al actualizar la alarma:", error);
      setModalMessage("Error al actualizar la alarma");
      setModalIsOpen(true); // Abrir el modal en caso de error
    }
  };

  const closeModal = () => {
    setModalIsOpen(false); // Cerrar el modal
    navigate(`/panel/dataloggers/${dataloggerId}/canales/${channelId}/alarmas/${id}`);
  };
  if (loading) {
    return <div>Cargando ...</div>;
  }  
  
  //console.log(JSON.stringify(alarm), comparsionOperator, comparsionValue)
  console.log(comparsionVariable, comparsionOperator, comparsionValue);

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              value={alarm.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="form_input">
            <label htmlFor="tipo_alarma">Tipo de alarma:</label>
            <input
              type="text"
              name="tipo_alarma"
              id="tipo_alarma"
              value={alarm.tipo_alarma}
              onChange={handleChange}
              disabled="true"
            />
          </div>
        </div>
        <div className="form_input_group">
          <div className="form_input" style={{ width: "94%" }}>
            <label htmlFor="descripcion">Descripcion:</label>
            <textarea
              type="text"
              name="descripcion"
              id="descripcion"
              value={alarm.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>       
        <div className="form_input_group">
          <div className="form_input form_input_condition">
            <label htmlFor="condicion">condicion:</label>
            <input
              type="text"
              name="condicion"
              id="condicion"
              value={alarm.condicion}
              disabled="true"
            />
          </div>

          
          <div className="form_input form_input_condition">
            <label htmlFor="comparsion_operator">compararacion:</label>            
            <select name="comparsion_operator" 
                    id="comparsion_operator"
                    value={comparsionOperator}
                    onChange={handleChangeComparsion}
                    >
              <option value=">=">&#62;&#61;  (Mayor o igual que)</option>
              <option value="=">&#61;  (Igual que)</option>
              <option value="<=">&#60;&#61;  (Menor o igual que)</option>
              <option value=">" >&#62;  (Mayor que)</option>
              <option value="<">&#60;  (Menor que)</option>
            </select>
          </div>
          <div className="form_input form_input_condition">
            <label htmlFor="comparsion_value">Valor:</label>
            <input
              type="number"
              name="comparsion_value"
              id="comparsion_value"
              step="1"
              value={comparsionValue}
              onChange={handleChangeComparsion}
            />
          </div>
        </div>


        <div className="form_input_group">
          <div className="form_input">
            <label htmlFor="periodo_tiempo">
              Minutos hacia atrás para el cálculo:
            </label>
            <input
              type="number"
              step="5"
              name="periodo_tiempo"
              id="periodo_tiempo"
              value={alarm.periodo_tiempo}
              pattern="^(5|[1-9][0-9]*)$" // Acepta solo múltiplos de 5
              title="El valor debe ser un múltiplo de 5"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form_input_group">          
        <button type="submit" className="form_btn">
          Guardar cambios
        </button>
        </div>


      </form>
      {/* Modal para mostrar mensajes al usuario */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Mensaje del sistema"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        <h2>Información</h2>
        <p>{modalMessage}</p>
        <button className="form_btn" onClick={closeModal}>
          Cerrar
        </button>
      </Modal>
    </>
  );
}

export default AlarmForm;
