/* ═══════════════════════════════════════════════════════════════
   MAIN.JS — Punto de entrada principal
   Inicializa todos los módulos cuando el DOM está listo.
   Portfolio de Facundo Argüello
═══════════════════════════════════════════════════════════════ */

/* -------------------------------------------------------
   ORDEN DE CARGA DE MÓDULOS:
   1. moduloCursor    — cursor.js    (debe ir primero, antes de eventos)
   2. moduloNav       — nav.js       (scroll, menú mobile, links activos)
   3. moduloTypewriter — typewriter.js (efecto máquina de escribir)
   4. moduloAnimaciones — animaciones.js (scroll reveal, parallax, tilt)
------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     Inicializar cursor personalizado
  ------------------------------------------------------- */
  if (typeof moduloCursor !== 'undefined') {
    moduloCursor.inicializar();
  }

  /* -------------------------------------------------------
     Inicializar navegación
  ------------------------------------------------------- */
  if (typeof moduloNav !== 'undefined') {
    moduloNav.inicializar();
  }

  /* -------------------------------------------------------
     Inicializar typewriter del hero
  ------------------------------------------------------- */
  if (typeof moduloTypewriter !== 'undefined') {
    moduloTypewriter.inicializar();
  }

  /* -------------------------------------------------------
     Inicializar animaciones y efectos visuales
  ------------------------------------------------------- */
  if (typeof moduloAnimaciones !== 'undefined') {
    moduloAnimaciones.inicializar();
  }

  /* -------------------------------------------------------
     Pequeño log de consola para devs curiosos 😄
  ------------------------------------------------------- */
  console.log(
    '%c Facundo Argüello · Full-Stack Dev ',
    'background: #0a1628; color: #60a5fa; font-size: 14px; font-weight: bold; padding: 8px 16px; border-radius: 4px;'
  );
  console.log(
    '%c facundotomas018@gmail.com ',
    'color: #64748b; font-size: 12px;'
  );

});
