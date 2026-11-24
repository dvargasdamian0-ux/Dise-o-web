/* ===============================================================
   TECHSUPPORT PA4 - JavaScript propio (T11 a T13)
   - Filtros de servicios y contador actualizado.
   - Preselección del servicio desde el catálogo.
   - Formulario demostrativo con validación HTML5.
   - Botón accesible para volver arriba.
   Bootstrap Bundle (navbar y carousel) se importa por CDN en el HTML.
   =============================================================== */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const filtros = document.querySelectorAll('[data-filtro]');
  const tarjetas = document.querySelectorAll('.pa4-servicio[data-categoria]');
  const contador = document.querySelector('#contador-servicios');

  // El filtro se aplica a la clase 'pa4-servicio', conservando el DOM y los enlaces.
  filtros.forEach((boton) => {
    boton.addEventListener('click', () => {
      const categoria = boton.dataset.filtro;
      let visibles = 0;

      tarjetas.forEach((tarjeta) => {
        const mostrar = categoria === 'todos' || tarjeta.dataset.categoria === categoria;
        tarjeta.hidden = !mostrar;
        if (mostrar) visibles += 1;
      });

      filtros.forEach((filtro) => {
        const activo = filtro === boton;
        filtro.classList.toggle('active', activo);
        filtro.classList.toggle('btn-primary', activo);
        filtro.classList.toggle('btn-outline-primary', !activo);
        filtro.setAttribute('aria-pressed', String(activo));
      });

      if (contador) {
        contador.textContent = `Mostrando ${visibles} ${visibles === 1 ? 'servicio' : 'servicios'}`;
      }
    });
  });

  // Recibir la selección de servicio desde productos.html sin usar datos privados.
  const selector = document.querySelector('#tipo');
  const servicioSolicitado = new URLSearchParams(window.location.search).get('servicio');
  if (selector && servicioSolicitado && [...selector.options].some(
      (opcion) => opcion.value === servicioSolicitado)) {
    selector.value = servicioSolicitado;
    const aviso = document.querySelector('#aviso-formulario');
    if (aviso) {
      aviso.textContent = `Servicio seleccionado: ${selector.options[selector.selectedIndex].text}. ` +
        'Formulario académico: no envía datos a un servidor.';
    }
  }

  // Valida con el navegador y muestra aviso Bootstrap; NO realiza peticiones web.
  const formulario = document.querySelector('#form-contacto[data-form-demo]');
  const resultado = document.querySelector('#form-resultado');
  if (formulario && resultado) {
    formulario.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!formulario.reportValidity()) return;
      resultado.hidden = false;
      resultado.classList.remove('alert-danger');
      resultado.classList.add('alert-success');
      resultado.textContent = 'Datos validados correctamente. Este formulario es una demostración: ' +
        'no se ha enviado ningún mensaje ni se ha guardado información.';
      resultado.scrollIntoView({ behavior: 'auto', block: 'nearest' });
    });
    formulario.addEventListener('reset', () => {
      resultado.hidden = true;
    });
    formulario.addEventListener('input', () => {
      resultado.hidden = true;
    });
    formulario.addEventListener('change', () => {
      resultado.hidden = true;
    });
  }

  // Botón flotante: solo aparece cuando el usuario se aleja de la parte superior.
  const volverArriba = document.querySelector('#volver-arriba');
  if (volverArriba) {
    const actualizar = () => { volverArriba.hidden = window.scrollY < 260; };
    window.addEventListener('scroll', actualizar, { passive: true });
    actualizar();
    volverArriba.addEventListener('click', () => {
      const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, behavior: menosMovimiento ? 'auto' : 'smooth' });
    });
  }
});
