

import useLocalStorageState from 'use-local-storage-state';
import CryptoJS from 'crypto-js';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;


// Función para encriptar los datos
function encryptData(data) {
  const jsonData = JSON.stringify(data); // Convertir datos a string
  return CryptoJS.AES.encrypt(jsonData, SECRET_KEY).toString(); // Encriptar y devolver como string
}

// Función para desencriptar los datos
function decryptData(encryptedData) {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY); // Desencriptar datos
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8); // Convertir bytes a string
    
    // Validar si los datos desencriptados son JSON válidos
    if (!decryptedData) {
      return null; // Retornar null si no hay datos
    }
    
    return JSON.parse(decryptedData); // Parsear string a objeto JSON
  } catch (error) {
    console.error("Error while decrypting data: ", error);
    return null; // Retornar null en caso de error
  }
}

// Hook personalizado para manejar localStorage con encriptación
function useEncryptedLocalStorageState(key, defaultValue) {
  // Usar useLocalStorageState para manejar el estado en localStorage
  const [encryptedValue, setEncryptedValue] = useLocalStorageState(key, {
    defaultValue: encryptData(defaultValue), // Encriptar valor por defecto
  });

  // Función para guardar el valor encriptado en localStorage
  const setValue = (value) => {
    const valueToStore = value instanceof Function ? value(decryptData(encryptedValue)) : value;
    const encryptedData = encryptData(valueToStore); // Encriptar los datos antes de guardarlos
    setEncryptedValue(encryptedData); // Guardar datos encriptados
  };

  // Desencriptar los datos al obtenerlos de localStorage
  const storedValue = encryptedValue ? decryptData(encryptedValue) : defaultValue;

  return [storedValue, setValue]; // Devolver valor desencriptado y función para actualizarlo
}

export default useEncryptedLocalStorageState;
