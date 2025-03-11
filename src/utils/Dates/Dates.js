export const formatDate = (fechaString, type = null) => {

    const fecha = new Date(fechaString);  
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    if (type == 'short'){
      const fechaFormateada = `${dia}/${mes}/${anio}`;
      return fechaFormateada;
    }
    const horas = fecha.getHours().toString().padStart(2, '0');
    const minutos = fecha.getMinutes().toString().padStart(2, '0');  
    const fechaFormateada = `${dia}/${mes}/${anio} a las ${horas}:${minutos}`;
  
    return fechaFormateada;
  }

  export const getCurrentDateTime = () => {
    const now = new Date();
    
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Mes empieza en 0
    const day = String(now.getDate()).padStart(2, '0');
    
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


