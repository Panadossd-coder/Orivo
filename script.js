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