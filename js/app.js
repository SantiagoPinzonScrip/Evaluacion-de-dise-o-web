// app.js: conecta datos, almacenamiento e interfaz.
import { PERFILES, LIMITES } from './datos.js';
import { cargarFicha, guardarFicha, borrarFicha } from './storage.js';
import {
  llenarPerfiles, renderFicha, mostrarMensaje, mostrarErrores,
  leerFormulario, limpiarFormulario, enfocarPrimerError, ponerAnio,
} from './ui.js';

const EXPRESION_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validar({ nombre, correo, perfil, frase }) {
  const errores = {};
  if (nombre.length < LIMITES.nombreMin) errores.nombre = 'El nombre es obligatorio (mínimo 2 caracteres).';
  else if (nombre.length > LIMITES.nombreMax) errores.nombre = `El nombre no puede superar ${LIMITES.nombreMax} caracteres.`;
  if (!correo) errores.correo = 'El correo es obligatorio.';
  else if (!EXPRESION_CORREO.test(correo)) errores.correo = 'Escribe un correo válido, por ejemplo nombre@dominio.com.';
  if (!PERFILES.includes(perfil)) errores.perfil = 'Selecciona un perfil de sabor.';
  if (!frase) errores.frase = 'Escribe una nota de cata.';
  else if (frase.length > LIMITES.fraseMax) errores.frase = `La nota no puede superar ${LIMITES.fraseMax} caracteres.`;
  return errores;
}

function alEnviar(evento) {
  evento.preventDefault();
  const datos = leerFormulario();
  const errores = validar(datos);
  mostrarErrores(errores);

  if (Object.keys(errores).length > 0) {
    mostrarMensaje('Revisa los campos marcados: hay datos por corregir.', 'error');
    enfocarPrimerError(errores);
    return;
  }

  const ficha = { nombre: datos.nombre, perfil: datos.perfil, frase: datos.frase, fecha: new Date().toISOString() };
  if (guardarFicha(ficha)) {
    renderFicha(ficha);
    mostrarMensaje(`¡Listo, ${ficha.nombre}! Tu ficha quedó guardada en este navegador.`, 'ok');
  } else {
    renderFicha(ficha);
    mostrarMensaje('Tu ficha se muestra, pero tu navegador no permitió guardarla.', 'error');
  }
}

function alBorrar() {
  const correcto = borrarFicha();
  limpiarFormulario();
  renderFicha(null);
  mostrarMensaje(
    correcto ? 'Tu ficha fue eliminada.' : 'No se pudo borrar la ficha guardada.',
    correcto ? 'ok' : 'error',
  );
}

function iniciar() {
  ponerAnio();
  llenarPerfiles(PERFILES);
  renderFicha(cargarFicha(null));
  document.querySelector('#form-ficha').addEventListener('submit', alEnviar);
  document.querySelector('#btn-borrar').addEventListener('click', alBorrar);
}

iniciar();
