/* ═══════════════════════════════════════════════════════════════
   CURSOR.JS — Cursor personalizado con seguidor y efecto magnético
   Portfolio de Facundo Argüello
═══════════════════════════════════════════════════════════════ */

const moduloCursor = (() => {

  /* -------------------------------------------------------
     Referencias al DOM
  ------------------------------------------------------- */
  const cursor         = document.getElementById('cursor');
  const cursorSeguidor = document.getElementById('cursorSeguidor');

  // Posición actual del cursor
  let posX = 0, posY = 0;
  // Posición con retraso del seguidor
  let segX = 0, segY = 0;

  /* -------------------------------------------------------
     Mover cursor al instante al mover el mouse
  ------------------------------------------------------- */
  const moverCursor = (e) => {
    posX = e.clientX;
    posY = e.clientY;

    // Cursor pequeño sigue al instante
    cursor.style.left = posX + 'px';
    cursor.style.top  = posY + 'px';
  };

  /* -------------------------------------------------------
     Animar el seguidor con retraso (efecto lerp)
  ------------------------------------------------------- */
  const animarSeguidor = () => {
    // Interpolación lineal: el seguidor "persigue" al cursor
    segX += (posX - segX) * 0.12;
    segY += (posY - segY) * 0.12;

    cursorSeguidor.style.left = segX + 'px';
    cursorSeguidor.style.top  = segY + 'px';

    // Loop de animación
    requestAnimationFrame(animarSeguidor);
  };

  /* -------------------------------------------------------
     Efecto hover sobre elementos interactivos
  ------------------------------------------------------- */
  const agregarEfectosHover = () => {
    // Selecciona todos los elementos interactivos
    const elementosInteractivos = document.querySelectorAll(
      'a, button, .btn, .btn-magnetico, .proyecto-card, .tech-pill, .rasgo, .interes'
    );

    elementosInteractivos.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('sobre-enlace');
        cursorSeguidor.classList.add('sobre-enlace');
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('sobre-enlace');
        cursorSeguidor.classList.remove('sobre-enlace');
      });
    });
  };

  /* -------------------------------------------------------
     Ocultar cursor al salir de la ventana
  ------------------------------------------------------- */
  const manejarVisibilidad = () => {
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = '0';
      cursorSeguidor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = '1';
      cursorSeguidor.style.opacity = '1';
    });
  };

  /* -------------------------------------------------------
     Detectar si el dispositivo es táctil y desactivar
  ------------------------------------------------------- */
  const esTactil = () => window.matchMedia('(hover: none)').matches;

  /* -------------------------------------------------------
     Inicializar
  ------------------------------------------------------- */
  const inicializar = () => {
    // Solo activar cursor en dispositivos con mouse
    if (esTactil()) return;

    document.addEventListener('mousemove', moverCursor);
    animarSeguidor();
    agregarEfectosHover();
    manejarVisibilidad();
  };

  return { inicializar };

})();
