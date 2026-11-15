// storage.js: único módulo que habla con localStorage.
import { CLAVE_FICHA } from './datos.js';

export function cargarFicha(respaldo = null) {
  try {
    const guardada = localStorage.getItem(CLAVE_FICHA);
    return guardada ? JSON.parse(guardada) : respaldo;
  } catch (error) {
    console.error('No se pudo leer localStorage:', error);
    return respaldo;
  }
}

export function guardarFicha(ficha) {
  try {
    localStorage.setItem(CLAVE_FICHA, JSON.stringify(ficha));
    return true;
  } catch (error) {
    console.error('No se pudo guardar en localStorage:', error);
    return false;
  }
}

export function borrarFicha() {
  try {
    localStorage.removeItem(CLAVE_FICHA);
    return true;
  } catch (error) {
    console.error('No se pudo borrar de localStorage:', error);
    return false;
  }
}
