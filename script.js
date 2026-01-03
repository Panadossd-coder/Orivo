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