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