/* ═══════════════════════════════════════════════════════════════
   ANIMACIONES.JS — Revelar elementos al hacer scroll,
                    animación de entrada del hero,
                    contadores numéricos
   Portfolio de Facundo Argüello
═══════════════════════════════════════════════════════════════ */

const moduloAnimaciones = (() => {

  /* ═══════════════════════════════════════════════
     PARTE 1: REVELAR ELEMENTOS CON SCROLL
     Usa IntersectionObserver para detectar cuándo
     un elemento entra al viewport y le agrega
     la clase .visible que dispara la transición CSS.
  ═══════════════════════════════════════════════ */

  const configurarScrollReveal = () => {
    // Selecciona todos los elementos con el atributo data-scroll-revelar
    const elementos = document.querySelectorAll('[data-scroll-revelar]');

    if (!elementos.length) return;

    // Opciones del observador
    const opciones = {
      threshold: 0.12,           // Se activa cuando el 12% del elemento es visible
      rootMargin: '0px 0px -40px 0px', // Pequeño margen inferior para anticipar
    };

    const observador = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const elemento = entrada.target;
        // Lee el delay opcional del atributo data-delay (en ms)
        const delay    = parseInt(elemento.getAttribute('data-delay') || '0', 10);

        // Aplica el delay y agrega la clase visible
        setTimeout(() => {
          elemento.classList.add('visible');
        }, delay);

        // Deja de observar una vez animado (optimización de rendimiento)
        observador.unobserve(elemento);
      });
    }, opciones);

    // Comenzar a observar cada elemento
    elementos.forEach((el) => observador.observe(el));
  };


  /* ═══════════════════════════════════════════════
     PARTE 2: ANIMACIÓN DE ENTRADA DEL HERO
     Los elementos con data-revelar se animan
     en cascada al cargar la página (no depende
     del scroll, sino del tiempo).
  ═══════════════════════════════════════════════ */

  const animarHero = () => {
    const elementosHero = document.querySelectorAll('[data-revelar]');

    elementosHero.forEach((el) => {
      // Delay base de cada elemento (desde el HTML)
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);

      setTimeout(() => {
        el.classList.add('visible');
      }, 300 + delay); // 300ms de gracia para que el CSS esté listo
    });
  };


  /* ═══════════════════════════════════════════════
     PARTE 3: CONTADORES NUMÉRICOS
     Anima los números en las métricas del hero
     desde 0 hasta el valor real, con easing.
  ═══════════════════════════════════════════════ */

  // Función de easing cuadrática (aceleración suave)
  const easeOutQuad = (t) => t * (2 - t);

  // Anima un único contador
  const animarContador = (elemento, valorFinal, duracion = 1800) => {
    const inicio      = performance.now();
    const valorInicio = 0;

    const paso = (tiempoActual) => {
      const transcurrido = tiempoActual - inicio;
      const progreso     = Math.min(transcurrido / duracion, 1);
      const progresoSuave = easeOutQuad(progreso);

      // Valor actual interpolado
      const valorActual = Math.round(valorInicio + (valorFinal - valorInicio) * progresoSuave);
      elemento.textContent = valorActual;

      // Continuar si no llegó al final
      if (progreso < 1) {
        requestAnimationFrame(paso);
      } else {
        elemento.textContent = valorFinal; // Asegurar valor exacto al final
      }
    };

    requestAnimationFrame(paso);
  };

  // Configurar todos los contadores con IntersectionObserver
  const configurarContadores = () => {
    const contadores = document.querySelectorAll('[data-contar]');

    if (!contadores.length) return;

    const observadorContadores = new IntersectionObserver((entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const elemento    = entrada.target;
        const valorFinal  = parseInt(elemento.getAttribute('data-contar'), 10);

        // Iniciar animación con pequeño delay
        setTimeout(() => {
          animarContador(elemento, valorFinal, 1600);
        }, 400);

        // No repetir la animación
        observadorContadores.unobserve(elemento);
      });
    }, { threshold: 0.5 });

    contadores.forEach((contador) => observadorContadores.observe(contador));
  };


  /* ═══════════════════════════════════════════════
     PARTE 4: EFECTO PARALLAX SUAVE EN EL HERO
     Los orbes de luz se mueven levemente al scroll
     para dar sensación de profundidad.
  ═══════════════════════════════════════════════ */

  const configurarParallax = () => {
    const orbe1 = document.querySelector('.hero__orbe--1');
    const orbe2 = document.querySelector('.hero__orbe--2');
    const orbe3 = document.querySelector('.hero__orbe--3');

    if (!orbe1 && !orbe2 && !orbe3) return;

    let ultimoScroll = 0;
    let ticking      = false;

    const aplicarParallax = () => {
      const scrollY = window.scrollY;

      // Solo afecta mientras el hero es visible
      if (scrollY < window.innerHeight * 1.2) {
        if (orbe1) orbe1.style.transform = `translateY(${scrollY * 0.18}px)`;
        if (orbe2) orbe2.style.transform = `translateY(${scrollY * -0.12}px)`;
        if (orbe3) orbe3.style.transform = `translateY(${scrollY * 0.08}px)`;
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      ultimoScroll = window.scrollY;

      // requestAnimationFrame para no saturar el thread
      if (!ticking) {
        requestAnimationFrame(aplicarParallax);
        ticking = true;
      }
    }, { passive: true });
  };


  /* ═══════════════════════════════════════════════
     PARTE 5: EFECTO TILT EN LAS TARJETAS DE PROYECTO
     Las tarjetas se inclinan levemente al pasar
     el mouse sobre ellas (efecto 3D).
  ═══════════════════════════════════════════════ */

  const configurarTiltTarjetas = () => {
    const tarjetas = document.querySelectorAll('.proyecto-card');

    tarjetas.forEach((tarjeta) => {
      tarjeta.addEventListener('mousemove', (e) => {
        const rect   = tarjeta.getBoundingClientRect();
        const centroX = rect.left + rect.width / 2;
        const centroY = rect.top  + rect.height / 2;

        // Calcular ángulos basados en posición del mouse
        const rotX = ((e.clientY - centroY) / rect.height) * -8;
        const rotY = ((e.clientX - centroX) / rect.width)  *  8;

        tarjeta.style.transform =
          `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
      });

      tarjeta.addEventListener('mouseleave', () => {
        // Volver a posición plana
        tarjeta.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
        tarjeta.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
      });

      tarjeta.addEventListener('mouseenter', () => {
        tarjeta.style.transition = 'none';
      });
    });
  };


  /* ═══════════════════════════════════════════════
     INICIALIZAR — arranca todas las animaciones
  ═══════════════════════════════════════════════ */

  const inicializar = () => {
    animarHero();
    configurarScrollReveal();
    configurarContadores();
    configurarParallax();

    // El tilt solo en dispositivos con mouse
    if (!window.matchMedia('(hover: none)').matches) {
      configurarTiltTarjetas();
    }
  };

  return { inicializar };

})();
