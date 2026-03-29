/* ═══════════════════════════════════════════════════════════════
   TYPEWRITER.JS — Efecto máquina de escribir en el subtítulo del hero
   Portfolio de Facundo Argüello
═══════════════════════════════════════════════════════════════ */

const moduloTypewriter = (() => {

  /* -------------------------------------------------------
     Configuración
  ------------------------------------------------------- */
  const FRASES = [
    'Desarrollador Web Full-Stack.',
    'Estudiante de Programación en la UTN.',
    'Apasionado por la arquitectura limpia.',
    'Constructor de soluciones digitales.',
    'Disponible para nuevas oportunidades.',
  ];

  const VELOCIDAD_ESCRIBIR  = 65;   // ms entre caracteres al escribir
  const VELOCIDAD_BORRAR    = 30;   // ms entre caracteres al borrar
  const PAUSA_FRASE_LISTA   = 2400; // ms antes de empezar a borrar
  const PAUSA_ENTRE_FRASES  = 500;  // ms de pausa entre frases

  /* -------------------------------------------------------
     Estado interno
  ------------------------------------------------------- */
  let indiceFrase    = 0;     // Índice de la frase actual
  let indiceCaracter = 0;     // Posición dentro de la frase
  let estaBorrando   = false; // Modo escritura o borrado
  let timeoutId      = null;  // Para poder cancelar si hace falta

  /* -------------------------------------------------------
     Referencia al elemento del DOM
  ------------------------------------------------------- */
  const elemento = document.getElementById('textoTypewriter');

  /* -------------------------------------------------------
     Paso de escritura/borrado
  ------------------------------------------------------- */
  const tick = () => {
    const fraseActual = FRASES[indiceFrase];

    if (estaBorrando) {
      /* ── Modo borrado: quitar un carácter ── */
      indiceCaracter--;
      elemento.textContent = fraseActual.substring(0, indiceCaracter);

      if (indiceCaracter === 0) {
        // Terminó de borrar → pasar a la siguiente frase
        estaBorrando = false;
        indiceFrase  = (indiceFrase + 1) % FRASES.length;
        timeoutId    = setTimeout(tick, PAUSA_ENTRE_FRASES);
        return;
      }

      timeoutId = setTimeout(tick, VELOCIDAD_BORRAR);

    } else {
      /* ── Modo escritura: agregar un carácter ── */
      indiceCaracter++;
      elemento.textContent = fraseActual.substring(0, indiceCaracter);

      if (indiceCaracter === fraseActual.length) {
        // Terminó de escribir → pausa y luego borrar
        estaBorrando = true;
        timeoutId    = setTimeout(tick, PAUSA_FRASE_LISTA);
        return;
      }

      // Pequeña variación aleatoria en la velocidad (efecto humano)
      const variacion  = Math.random() * 30 - 15;
      timeoutId        = setTimeout(tick, VELOCIDAD_ESCRIBIR + variacion);
    }
  };

  /* -------------------------------------------------------
     Inicializar
  ------------------------------------------------------- */
  const inicializar = () => {
    if (!elemento) return;

    // Comenzar con un pequeño delay para que el hero se cargue primero
    timeoutId = setTimeout(tick, 1200);
  };

  /* -------------------------------------------------------
     Detener (por si se necesita limpiar)
  ------------------------------------------------------- */
  const detener = () => {
    if (timeoutId) clearTimeout(timeoutId);
  };

  return { inicializar, detener };

})();
