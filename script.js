// ORIVO — Theme Toggle (Dark / Light)

document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");

  // Load saved theme
  const savedTheme = localStorage.getItem("orivo-theme");
  if (savedTheme === "light") {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }

  // Toggle on click
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark");

      const isDark = document.body.classList.contains("dark");
      localStorage.setItem("orivo-theme", isDark ? "dark" : "light");
    });
  }
});
// ORIVO — Scroll Reveal
const reveals = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  reveals.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      el.classList.add('show');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();
// ORIVO — Product Linking
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('click', () => {
    const product = card.getAttribute('data-product');
    if (product) {
      window.location.href = `product.html?item=${product}`;
    }
  });
});
// ===============================
// ORIVO — Product Navigation
// ===============================
document.querySelectorAll('.product-card.is-clickable').forEach(card => {
  card.addEventListener('click', () => {
    const slug = card.dataset.product;
    if (!slug) return;

    window.location.href = `product.html?item=${slug}`;
  });
});
/* ORIVO — hero lights parallax (small, safe enhancement) */
(function () {
  const root = document.documentElement;
  const hero = document.querySelector('.hero');
  const lights = document.querySelectorAll('.hero-light');
  const img = document.getElementById('heroFigure');
  if (!hero || lights.length === 0 || !img) return;

  let lastX = 0, lastY = 0;
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;

    // small translate for each light
    lights.forEach((el, i) => {
      const depth = (i + 1) * 6; // 6,12,18 px
      el.style.transform = `translate3d(${cx * depth}px, ${cy * depth}px, 0) scale(1)`;
    });

    // subtle image parallax
    img.style.transform = `translate3d(${cx * -8}px, ${cy * -6}px, 0)`;
  });

  // reset on leave
  hero.addEventListener('mouseleave', () => {
    lights.forEach((el) => el.style.transform = '');
    img.style.transform = '';
  });
})();
/* =========================
   FEATURED RENDER (HOMEPAGE)
   ========================= */
document.addEventListener("DOMContentLoaded", () => {
  const featuredContainer = document.querySelector(".featured-slider");

  if (!featuredContainer) return;

  const featuredItems = JSON.parse(
    localStorage.getItem("orivo_featured")
  ) || [];

  // Clear existing hardcoded cards
  featuredContainer.innerHTML = "";

  // If no featured items, do nothing
  if (featuredItems.length === 0) return;

  featuredItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "featured-card";

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <h4>${item.title}</h4>
      <span>$${item.price}</span>
    `;

    featuredContainer.appendChild(card);
  });
});

/* ===========================
   LUX HERO — Canvas particles + parallax
   Add at end of script.js
   =========================== */
(function () {
  // guards
  if (typeof window === 'undefined') return;
  const canvas = document.getElementById('heroCanvas');
  const heroSection = document.getElementById('heroSection');
  if (!canvas || !heroSection) return;

  const ctx = canvas.getContext('2d', { alpha: true });
  let W = 0, H = 0, devicePixelRatioSafe = Math.max(1, window.devicePixelRatio || 1);
  let particles = [];
  const PARTICLE_COUNT = 38; // elegant, not busy
  const COLORS = ['rgba(255,255,255,0.9)','rgba(229,138,165,0.9)','rgba(122,166,255,0.9)'];

  function resize() {
    W = heroSection.clientWidth;
    H = heroSection.clientHeight;
    canvas.width = Math.floor(W * devicePixelRatioSafe);
    canvas.height = Math.floor(H * devicePixelRatioSafe);
    canvas.style.width = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(devicePixelRatioSafe, 0, 0, devicePixelRatioSafe, 0, 0);
  }

  function makeParticles() {
    particles = [];
    for (let i=0;i<PARTICLE_COUNT;i++) {
      const baseR = 6 + Math.random() * 18;
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: baseR,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.15,
        life: 40 + Math.random() * 140,
        t: Math.random() * Math.PI * 2,
        color: COLORS[i % COLORS.length],
        alpha: 0.15 + Math.random() * 0.55
      });
    }
  }

  function draw() {
    ctx.clearRect(0,0,W,H);
    // gentle background wash (transparent)
    // particles
    for (let p of particles) {
      // update
      p.t += 0.002 + Math.random()*0.002;
      p.x += p.vx + Math.sin(p.t) * 0.1;
      p.y += p.vy + Math.cos(p.t*0.8) * 0.08;

      // wrap
      if (p.x < -60) p.x = W + 60;
      if (p.x > W + 60) p.x = -60;
      if (p.y < -60) p.y = H + 60;
      if (p.y > H + 60) p.y = -60;

      // glow
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r*4);
      g.addColorStop(0, p.color.replace(/,[^)]+\)$/, ', ' + (p.alpha) + ')'));
      g.addColorStop(0.25, p.color.replace(/,[^)]+\)$/, ', ' + (p.alpha*0.55) + ')'));
      g.addColorStop(1, 'rgba(0,0,0,0)');

      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(p.x, p.y, p.r*2.2, 0, Math.PI*2);
      ctx.fill();
    }
    // soft global vignette for luxe
    ctx.beginPath();
    const gg = ctx.createRadialGradient(W/2, H/1.8, Math.min(W,H)*0.4, W/2, H/2, Math.max(W,H));
    gg.addColorStop(0, 'rgba(0,0,0,0)');
    gg.addColorStop(1, 'rgba(0,0,0,0.12)');
    ctx.fillStyle = gg;
    ctx.fillRect(0,0,W,H);
  }

  // animation loop
  let raf = null;
  function loop() {
    draw();
    raf = requestAnimationFrame(loop);
  }

  // parallax: mouse/tilt -> set CSS vars used by CSS transforms
  (function parallax() {
    const hero = heroSection;
    let lastX = 0, lastY = 0;
    function setVars(mx, my) {
      // small smoothing
      lastX += (mx - lastX) * 0.12;
      lastY += (my - lastY) * 0.12;
      hero.style.setProperty('--mx', lastX.toFixed(3));
      hero.style.setProperty('--my', lastY.toFixed(3));
    }

    // mouse
    hero.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      const cx = rect.left + rect.width/2;
      const cy = rect.top + rect.height/2;
      const mx = (e.clientX - cx) / rect.width * 100; // -50..+50
      const my = (e.clientY - cy) / rect.height * 100;
      setVars(mx, my);
    });

    // device tilt (mobile)
    if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // iOS 13+ requires permission; do not request automatically here.
      window.addEventListener('deviceorientation', (ev) => {
        const mx = (ev.gamma || 0) * 0.9; // left/right tilt
        const my = (ev.beta || 0) * -0.4; // front/back tilt
        setVars(mx, my);
      });
    } else {
      window.addEventListener('deviceorientation', (ev) => {
        const mx = (ev.gamma || 0) * 0.9;
        const my = (ev.beta || 0) * -0.4;
        setVars(mx, my);
      }, true);
    }

    // reset on leave
    hero.addEventListener('mouseleave', () => setVars(0,0));
  })();

  // start/stop based on visibility and reduced-motion
  function start() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    cancelAnimationFrame(raf);
    loop();
  }
  function stop() {
    cancelAnimationFrame(raf);
  }

  // initialize
  function init() {
    devicePixelRatioSafe = Math.max(1, window.devicePixelRatio || 1);
    resize();
    makeParticles();
    start();
  }

  // resize observer
  let ro = new ResizeObserver(() => {
    resize();
    makeParticles();
  });
  ro.observe(heroSection);

  // page visibility
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  // init on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();