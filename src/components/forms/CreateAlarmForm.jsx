import { useState, useEffect } from "react";
import createApiClient from "../../api/apiClient.js";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { useAuth } from "../../context/AuthContext.jsx";

import Modal from "react-modal";
Modal.setAppElement("#root");

function CreateAlarmForm({ id, channelId, dataloggerId  }) { 
  const apiClient = createApiClient();
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth(); 

  const alarmTypes = [
    { id: 0, type: "PORCENTAJE_ENCENDIDO", variables: "porcentaje_encendido", defaultValue: "50" },
    { id: 1, type: "FALLO_COMUNICACION", variables: "minutos_sin_conexion", defaultValue: "15" }
  ];

  const [comparsionOperator, setComparsionOperator] = useState(">");
  const [comparsionValue, setComparsionValue] = useState(alarmTypes[0].defaultValue);
  const [comparsionVariable, setComparsionVariable] = useState(alarmTypes[0].variables);

  const [alarm, setAlarm] = useState({
    canal_id: channelId,
    nombre: "",
    descripcion: "",
    periodo_tiempo: "15",
    nombre_variables: comparsionVariable,
    condicion: `${comparsionVariable} ${comparsionOperator} ${comparsionValue}`,
    estado: "1",
    usuario_id: user.id,
    tipo_alarma: "PORCENTAJE_ENCENDIDO"
  });

  // Actualiza la condición cada vez que cambie alguna parte de la comparación
  useEffect(() => {
    setAlarm(prev => ({
      ...prev,
      condicion: `${comparsionVariable} ${comparsionOperator} ${comparsionValue}`
    }));
  }, [comparsionVariable, comparsionOperator, comparsionValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipo_alarma") {
      const selectedAlarmType = alarmTypes.find(a => a.type === value);
      const newComparsionVariable = selectedAlarmType ? selectedAlarmType.variables : comparsionVariable;
      setComparsionVariable(newComparsionVariable);
      setAlarm(prev => ({
        ...prev,
        [name]: value,
        nombre_variables: newComparsionVariable,
      }));
    } else {
      setAlarm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleChangeComparsion = (e) => {
    const { name, value } = e.target;
    if (name === "comparsion_operator") {
      setComparsionOperator(value);
    } else if (name === "comparsion_value") {
      setComparsionValue(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("canal_id", alarm.canal_id || "");
    formData.append("nombre", alarm.nombre || "");
    formData.append("descripcion", alarm.descripcion || "");
    formData.append("periodo_tiempo", alarm.periodo_tiempo || "");
    formData.append("nombre_variables", alarm.nombre_variables || "");       
    formData.append("condicion", alarm.condicion || "");    
    formData.append("estado", alarm.estado || "");   
    formData.append("usuario_id", alarm.usuario_id || "");   
    formData.append("tipo_alarma", alarm.tipo_alarma || "");   
    
    try {
      setLoading(true);
      const response = await apiClient.post('/api/alarms', formData);
      setLoading(false);
      
      if (response.status === 201) {
        setModalMessage(`Alarma ${alarm.nombre} creada con éxito.`);
        setModalIsOpen(true);
      } else if (response.status === 400) {
        setModalMessage("La alarma ya existe!");
        setModalIsOpen(true);
      }
    } catch (error) {
      setModalMessage("Error al crear la alarma");
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    navigate(`/panel/dataloggers/${dataloggerId}/canales/${channelId}`);
  };

  if (loading) {
    return <div>Cargando ...</div>;
  }

  //console.log(channelId, dataloggerId);

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
            <select name="tipo_alarma" id="tipo_alarma" value={alarm.tipo_alarma} onChange={handleChange}>
              {alarmTypes.map((alarmType) => (
                <option value={alarmType.type} key={alarmType.id}>
                  {alarmType.type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form_input_group">
          <div className="form_input" style={{ width: "94%" }}>
            <label htmlFor="descripcion">Descripción:</label>
            <textarea
              name="descripcion"
              id="descripcion"
              value={alarm.descripcion}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form_input_group">
          <div className="form_input form_input_condition">
            <label htmlFor="condicion">Condición:</label>
            <input
              type="text"
              name="condicion"
              id="condicion"
              value={alarm.condicion}
              disabled
            />
          </div>
          
          <div className="form_input form_input_condition">
            <label htmlFor="comparsion_operator">Comparación:</label>
            <select
              name="comparsion_operator"
              id="comparsion_operator"
              value={comparsionOperator}
              onChange={handleChangeComparsion}
            >
              <option value=">=">&#62;&#61; (Mayor o igual que)</option>
              <option value="=">&#61; (Igual que)</option>
              <option value="<=">&#60;&#61; (Menor o igual que)</option>
              <option value=">">&#62; (Mayor que)</option>
              <option value="<">&#60; (Menor que)</option>
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
              pattern="^(5|[1-9][0-9]*)$"
              title="El valor debe ser un múltiplo de 5"
              onChange={handleChange}
            />
          </div>
        </div>

        <button type="submit" className="form_btn">
          Guardar cambios
        </button>
      </form>

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
            textAlign: "center"
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

export default CreateAlarmForm;
