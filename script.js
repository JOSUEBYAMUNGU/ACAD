/* ============ MENU MOBILE ============ */
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  menuToggle.textContent = navMenu.classList.contains('open') ? '✕' : '☰';
});

document.querySelectorAll('#nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.textContent = '☰';
  });
});

/* ============ MODE SOMBRE ============ */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Charger la préférence
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

/* ============ NAVBAR AU SCROLL ============ */
window.addEventListener('scroll', () => {
  const header = document.getElementById('navbar');
  const backBtn = document.getElementById('back-to-top');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
    backBtn.classList.add('show');
  } else {
    header.classList.remove('scrolled');
    backBtn.classList.remove('show');
  }
});

/* ============ RETOUR EN HAUT ============ */
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============ COMPTEURS ANIMÉS ============ */
const counters = document.querySelectorAll('.counter');
let countersStarted = false;

function startCounters() {
  if (countersStarted) return;
  const heroTop = document.querySelector('.hero').offsetTop + 400;
  if (window.scrollY + window.innerHeight > heroTop) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = +counter.dataset.target;
      const duration = 1500;
      const step = target / (duration / 16);
      let current = 0;
      const update = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current);
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      };
      update();
    });
  }
}

/* ============ ANIMATIONS AU SCROLL ============ */
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(el => revealObserver.observe(el));

/* ============ FILTRES GALERIE ============ */
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const gallerySubtitles = document.querySelectorAll('.gallery-subtitle');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    // Masquer/afficher les sous-titres
    if (filter === 'photo' || filter === 'video') {
      gallerySubtitles.forEach((st, i) => {
        st.style.display = (filter === 'photo' && i === 0) || (filter === 'video' && i === 1) ? 'block' : 'none';
      });
    } else {
      gallerySubtitles.forEach(st => st.style.display = 'block');
    }

    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
        item.style.animation = 'fadeIn .5s ease';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Animation fadeIn
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from {opacity:0; transform:scale(.9);} to {opacity:1; transform:scale(1);} }`;
document.head.appendChild(style);

/* ============ FORMULAIRE ============ */
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const feedback = document.getElementById('form-feedback');
  feedback.textContent = '✅ Merci ! Votre demande a bien été envoyée. Nous vous répondrons bientôt.';
  feedback.style.color = '#2ecc71';
  this.reset();
  setTimeout(() => { feedback.textContent = ''; }, 5000);
});

/* ============ SCROLL ÉLÉMENTS ============ */
window.addEventListener('scroll', startCounters);

/* ============ ANIMATION APPARITION MEMBRES ============ */
const members = document.querySelectorAll('.member');
members.forEach((m, i) => {
  m.style.opacity = '0';
  m.style.transform = 'translateY(30px)';
  setTimeout(() => {
    m.style.transition = 'all .6s ease';
    m.style.opacity = '1';
    m.style.transform = 'translateY(0)';
  }, i * 100);
});