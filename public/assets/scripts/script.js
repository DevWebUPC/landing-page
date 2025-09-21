// ===== Asistente Virtual =====
const abrirAsistente = document.getElementById('abrirAsistente');
const cerrarAsistente = document.getElementById('cerrarAsistente');
const asistenteContenedor = document.getElementById('asistenteContenedor');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.querySelectorAll('.mobile-nav-link');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Abrir/cerrar menú
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileMenu.classList.toggle('active');
  overlay.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Cerrar menú al hacer clic en el overlay
overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('active');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
});

// Cerrar menú al redimensionar la ventana si vuelve a desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});


abrirAsistente.addEventListener('click', () => {
  asistenteContenedor.style.display = 'block';
});

cerrarAsistente.addEventListener('click', () => {
  asistenteContenedor.style.display = 'none';
});

function responder(pregunta) {
  const respuesta = document.getElementById('respuestaBot');
  let texto = '';

  switch (pregunta) {
    case 'registro':
      texto = 'Para registrarte, ve a la página de inicio y selecciona "Crear cuenta".';
      break;
    case 'colaborar':
      texto = 'Puedes unirte a proyectos desde la sección "Explorar Startups".';
      break;
    case 'oportunidades':
      texto = 'Las oportunidades aparecen en tu panel al iniciar sesión.';
      break;
    default:
      texto = 'No entendí la pregunta. Intenta de nuevo.';
  }

  respuesta.textContent = texto;
}

// ===== Modales Servicios =====
const modals = {
  btnIdea: "modalIdea",
  btnEquipo: "modalEquipo",
  btnCrecimiento: "modalCrecimiento",
  btnHerramienta: "modalHerramienta"
};

Object.keys(modals).forEach(btnId => {
  const btn = document.getElementById(btnId);
  const modal = document.getElementById(modals[btnId]);
  const closeBtn = modal.querySelector(".close");

  // Abrir modal
  btn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Cerrar con X
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar al hacer click fuera
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
/* ===== Carrusel de logos (autoplay + infinito) ===== */
(function () {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  const viewport = document.querySelector('.carousel-viewport');

  // Helper: ancho de un slide + gap
  function slideSize() {
    const first = track.querySelector('.carousel-item');
    if (!first) return 0;
    const rect = first.getBoundingClientRect();
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || 0);
    return rect.width + gap;
  }

  let moving = false;
  let direction = 1; // 1 next, -1 prev

  function moveNext() {
    if (moving) return;
    moving = true; direction = 1;
    const dx = slideSize();
    track.style.transform = `translateX(-${dx}px)`;
  }

  function movePrev() {
    if (moving) return;
    moving = true; direction = -1;

    // Preparar: meter último al inicio sin animación y desplazar a la izquierda
    const last = track.lastElementChild;
    track.style.transition = 'none';
    track.prepend(last);
    const dx = slideSize();
    track.style.transform = `translateX(-${dx}px)`;
    // forzar reflow y animar a 0
    requestAnimationFrame(() => {
      track.offsetHeight;
      track.style.transition = 'transform .45s ease';
      track.style.transform = 'translateX(0)';
    });
  }

  // Al finalizar transición, reordenar para loop infinito
  track.addEventListener('transitionend', () => {
    if (direction === 1) {
      track.appendChild(track.firstElementChild);
    }
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    // re-habilitar transición
    requestAnimationFrame(() => {
      track.offsetHeight;
      track.style.transition = 'transform .45s ease';
      moving = false;
    });
  });

  nextBtn?.addEventListener('click', moveNext);
  prevBtn?.addEventListener('click', movePrev);

  // Autoplay (pausa en hover / focus)
  let interval = null;
  const AUTOPLAY_MS = 3000;

  function start() {
    if (interval) return;
    interval = setInterval(moveNext, AUTOPLAY_MS);
  }
  function stop() {
    clearInterval(interval);
    interval = null;
  }

  viewport.addEventListener('mouseenter', stop);
  viewport.addEventListener('mouseleave', start);
  viewport.addEventListener('focusin', stop);
  viewport.addEventListener('focusout', start);

  // Soporte táctil sencillo (swipe)
  let startX = null;
  viewport.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
  viewport.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) (dx < 0 ? moveNext() : movePrev());
    startX = null;
  });

  // Recalcular en resize por si cambia el ancho de slide
  window.addEventListener('resize', () => {
    // reset inmediato para evitar “saltos” visibles
    track.style.transition = 'none';
    track.style.transform = 'translateX(0)';
    requestAnimationFrame(() => {
      track.offsetHeight;
      track.style.transition = 'transform .45s ease';
    });
  });

  start();
})();

  // Mapa botón -> modal
  const modalMap = {
    btnIdea: 'modalIdea',
    btnEquipo: 'modalEquipo',
    btnCrecimiento: 'modalCrecimiento',
    btnPlanes: 'modalPlanes'
  };

  // Abrir
  Object.keys(modalMap).forEach(btnId => {
    const btn = document.getElementById(btnId);
    const modalId = modalMap[btnId];
    if (btn) {
      btn.addEventListener('click', () => openModal(modalId));
    }
  });

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
  }

  // Cerrar (botón X)
  document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const id = closeBtn.getAttribute('data-close');
      closeModal(id);
    });
  });

  // Cerrar haciendo click fuera
  window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(m => {
      if (e.target === m) closeModal(m.id);
    });
  });

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
  }


