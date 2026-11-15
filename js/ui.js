// ui.js: único módulo que cambia lo que se ve. Usa textContent, nunca innerHTML.

const $ = (selector) => document.querySelector(selector);

export function llenarPerfiles(perfiles) {
  const select = $('#perfil');
  perfiles.forEach((perfil) => {
    const opcion = document.createElement('option');
    opcion.value = perfil;
    opcion.textContent = perfil;
    select.append(opcion);
  });
}

export function renderFicha(ficha) {
  const vacia = !ficha;
  $('#tarjeta-nombre').textContent = vacia ? 'Aún no tienes ficha' : ficha.nombre;
  $('#tarjeta-perfil').textContent = vacia ? '' : ficha.perfil;
  $('#tarjeta-frase').textContent = vacia ? '' : ficha.frase;
  $('#tarjeta-fecha').textContent = vacia
    ? 'Completa el formulario y guarda tu ficha.'
    : `Creada el ${formatearFecha(ficha.fecha)}`;
}

function formatearFecha(iso) {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return 'fecha desconocida';
  return fecha.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function mostrarMensaje(texto, tipo = 'ok') {
  const mensaje = $('#mensaje');
  mensaje.textContent = texto;
  mensaje.className = `mensaje mensaje--${tipo}`;
}

export function mostrarErrores(errores) {
  ['nombre', 'correo', 'perfil', 'frase'].forEach((campo) => {
    const input = $(`#${campo}`);
    const texto = errores[campo] || '';
    $(`#error-${campo}`).textContent = texto;
    if (texto) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
  });
}

export function leerFormulario() {
  return {
    nombre: $('#nombre').value.trim(),
    correo: $('#correo').value.trim(),
    perfil: $('#perfil').value,
    frase: $('#frase').value.trim(),
  };
}

export function limpiarFormulario() {
  $('#form-ficha').reset();
  mostrarErrores({});
}

export function enfocarPrimerError(errores) {
  const primero = ['nombre', 'correo', 'perfil', 'frase'].find((campo) => errores[campo]);
  if (primero) $(`#${primero}`).focus();
}

export function ponerAnio() {
  $('#anio').textContent = new Date().getFullYear();
}
