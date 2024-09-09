export const parseCondition = (text) => {
    const greaterThanMatch = text.match(/>\s*(\d+)/); // Busca '>' seguido de un número
    const lessThanMatch = text.match(/<\s*(\d+)/);    // Busca '<' seguido de un número
  
    if (greaterThanMatch) {
      return { max: parseInt(greaterThanMatch[1], 10) }; // Devuelve { max: número }
    } else if (lessThanMatch) {
      return { min: parseInt(lessThanMatch[1], 10) }; // Devuelve { min: número }
    }
  
    return null; // Si no encuentra ningún operador
  }

  export const  parseMultipleConditions = (text) => {
    const conditions = {};
    
    // Buscar todas las condiciones '>' y '<' en el texto
    const greaterThanMatches = [...text.matchAll(/(\w+)\s*>\s*(\d+)/g)];
    const lessThanMatches = [...text.matchAll(/(\w+)\s*<\s*(\d+)/g)];
  
    // Procesar las condiciones con '>'
    greaterThanMatches.forEach(match => {
      const variable = match[1]; // El nombre de la variable (por ejemplo, d1_porc_encendido)
      const value = parseInt(match[2], 10); // El valor (por ejemplo, 0)
      conditions[variable] = { ...conditions[variable], max: value, min: 0 }; // Agregar 'max' al objeto
    });
  
    // Procesar las condiciones con '<'
    lessThanMatches.forEach(match => {
      const variable = match[1]; // El nombre de la variable (por ejemplo, d2_porc_encendido)
      const value = parseInt(match[2], 10); // El valor (por ejemplo, 0)
      conditions[variable] = { ...conditions[variable], min: value, max: 100 }; // Agregar 'min' al objeto
    });
  
    return conditions;
  }