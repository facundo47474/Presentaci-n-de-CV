/* ═══════════════════════════════════════════════════════════════
   NAV.JS — Navegación: scroll, menú móvil, link activo,
            barra de progreso, efecto magnético
   Portfolio de Facundo Argüello
═══════════════════════════════════════════════════════════════ */

const moduloNav = (() => {

  /* -------------------------------------------------------
     Referencias al DOM
  ------------------------------------------------------- */
  const nav          = document.getElementById('nav');
  const hamburguesa  = document.getElementById('hamburguesa');
  const navOverlay   = document.getElementById('navOverlay');
  const barraProgreso = document.getElementById('barraProgreso');
  const linksCerrar  = document.querySelectorAll('[data-cerrar]');
  const linksNav     = document.querySelectorAll('.nav__links .nav__link');
  const secciones    = document.querySelectorAll('section[id]');

  /* -------------------------------------------------------
     BARRA DE PROGRESO — actualiza al hacer scroll
  ------------------------------------------------------- */
  const actualizarProgreso = () => {
    const scrollActual = window.scrollY;
    const alturaTotal  = document.documentElement.scrollHeight - window.innerHeight;
    const porcentaje   = (scrollActual / alturaTotal) * 100;

    barraProgreso.style.width = porcentaje + '%';
  };

  /* -------------------------------------------------------
     CLASE CON-SCROLL — agrega fondo al nav al bajar
  ------------------------------------------------------- */
  const manejarScrollNav = () => {
    const scrollY = window.scrollY;

    // Con fondo si bajó más de 80px
    nav.classList.toggle('con-scroll', scrollY > 80);

    // Clase especial cuando está sobre el hero
    const hero = document.getElementById('inicio');
    if (hero) {
      const limiteHero = hero.offsetHeight - 100;
      nav.classList.toggle('en-hero', scrollY < limiteHero);
    }
  };

  /* -------------------------------------------------------
     LINK ACTIVO — resalta el link según la sección visible
  ------------------------------------------------------- */
  const actualizarLinkActivo = () => {
    let seccionVisible = '';

    secciones.forEach((seccion) => {
      // La sección es visible si su tope está a menos de 140px del top del viewport
      const tope = seccion.offsetTop - 140;
      if (window.scrollY >= tope) {
        seccionVisible = seccion.getAttribute('id');
      }
    });

    linksNav.forEach((link) => {
      const href = link.getAttribute('href').replace('#', '');
      link.classList.toggle('activo', href === seccionVisible);
    });
  };

  /* -------------------------------------------------------
     MENÚ MOBILE — abrir y cerrar overlay
  ------------------------------------------------------- */
  const abrirMenu = () => {
    navOverlay.classList.add('activo');
    navOverlay.setAttribute('aria-hidden', 'false');
    hamburguesa.classList.add('activo');
    hamburguesa.setAttribute('aria-expanded', 'true');
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
  };

  const cerrarMenu = () => {
    navOverlay.classList.remove('activo');
    navOverlay.setAttribute('aria-hidden', 'true');
    hamburguesa.classList.remove('activo');
    hamburguesa.setAttribute('aria-expanded', 'false');
    // Restaurar scroll
    document.body.style.overflow = '';
  };

  const alternarMenu = () => {
    const estaAbierto = navOverlay.classList.contains('activo');
    estaAbierto ? cerrarMenu() : abrirMenu();
  };

  /* -------------------------------------------------------
     SCROLL SUAVE — al hacer click en links de sección
  ------------------------------------------------------- */
  const configurarScrollSuave = () => {
    // Links del nav
    linksNav.forEach((link) => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
          e.preventDefault();
          const destino = document.querySelector(href);
          if (destino) {
            const offsetTop = destino.offsetTop - 80;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
          }
        }
      });
    });

    // Botones hero
    document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
      enlace.addEventListener('click', (e) => {
        const href = enlace.getAttribute('href');
        if (href === '#') return;
        const destino = document.querySelector(href);
        if (destino) {
          e.preventDefault();
          const offsetTop = destino.offsetTop - 80;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      });
    });
  };

  /* -------------------------------------------------------
     EFECTO MAGNÉTICO EN BOTONES
     — El botón se mueve levemente hacia el mouse
  ------------------------------------------------------- */
  const configurarMagnetico = () => {
    const botonesMagneticos = document.querySelectorAll('.btn-magnetico');

    botonesMagneticos.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect    = btn.getBoundingClientRect();
        const centroX = rect.left + rect.width / 2;
        const centroY = rect.top  + rect.height / 2;

        // Distancia del mouse al centro del botón
        const deltaX = (e.clientX - centroX) * 0.25;
        const deltaY = (e.clientY - centroY) * 0.25;

        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        // Vuelve a posición original con transición suave
        btn.style.transform = 'translate(0, 0)';
      });
    });
  };

  /* -------------------------------------------------------
     INICIALIZAR
  ------------------------------------------------------- */
  const inicializar = () => {
    let ticking = false;

    // Listener de scroll centralizado y optimizado
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          manejarScrollNav();
          actualizarLinkActivo();
          actualizarProgreso();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    // Menú mobile
    hamburguesa.addEventListener('click', alternarMenu);
    linksCerrar.forEach((link) => link.addEventListener('click', cerrarMenu));

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') cerrarMenu();
    });

    // Configuraciones adicionales
    configurarScrollSuave();
    configurarMagnetico();

    // Estado inicial
    manejarScrollNav();
  };

  return { inicializar };

})();
