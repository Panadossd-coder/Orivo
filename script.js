document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     UTILITIES
  ========================= */
  function getProducts() {
    return JSON.parse(localStorage.getItem("orivo_products")) || [];
  }

  function setProducts(products) {
    localStorage.setItem("orivo_products", JSON.stringify(products));
  }

  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  /* =========================
     INDEX / FEATURED LOGIC
  ========================= */
  const featuredGrid = document.getElementById("featuredGrid");
  const viewAllBtn = document.getElementById("viewAllBtn");

  if (featuredGrid) {
    const products = getProducts().slice(0, 4);

    featuredGrid.innerHTML = products.map(p => `
      <div class="product-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
      </div>
    `).join("");

    featuredGrid.addEventListener("click", e => {
      const card = e.target.closest(".product-card");
      if (card) {
        window.location.href = `product.html?id=${card.dataset.id}`;
      }
    });
  }

  if (viewAllBtn) {
    viewAllBtn.addEventListener("click", () => {
      localStorage.removeItem("orivo_category");
      window.location.href = "shop.html";
    });
  }

  /* =========================
     SHOP PAGE LOGIC
  ========================= */
  const shopGrid = document.getElementById("shopGrid");

  if (shopGrid) {
    const products = getProducts();
    renderGrid(shopGrid, products);
  }

  /* =========================
     CATEGORY PAGE LOGIC
  ========================= */
  const categoryGrid = document.getElementById("categoryGrid");
  const categoryButtons = document.querySelectorAll(".category-btn");

  if (categoryGrid && categoryButtons.length) {
    let activeCategory = localStorage.getItem("orivo_category") || "all";
    const products = getProducts();

    filterAndRender(activeCategory);

    categoryButtons.forEach(btn => {
      btn.classList.toggle("active", btn.dataset.category === activeCategory);

      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        localStorage.setItem("orivo_category", activeCategory);

        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        filterAndRender(activeCategory);
      });
    });

    function filterAndRender(category) {
      if (category === "all") {
        renderGrid(categoryGrid, products);
      } else {
        const filtered = products.filter(p => p.category === category);
        renderGrid(categoryGrid, filtered);
      }
    }
  }

  /* =========================
     PRODUCT PAGE LOGIC
  ========================= */
  const productId = getQueryParam("id");

  if (productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (product) {
      const img = document.getElementById("productImage");
      const name = document.getElementById("productName");
      const price = document.getElementById("productPrice");
      const desc = document.getElementById("productDescription");

      if (img) img.src = product.image;
      if (name) name.textContent = product.name;
      if (price) price.textContent = product.price;
      if (desc) desc.textContent = product.description;
    }
  }

  /* =========================
     SHARED RENDER FUNCTION
  ========================= */
  function renderGrid(grid, items) {
    grid.innerHTML = items.map(p => `
      <div class="product-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.price}</p>
      </div>
    `).join("");

    grid.addEventListener("click", e => {
      const card = e.target.closest(".product-card");
      if (card) {
        window.location.href = `product.html?id=${card.dataset.id}`;
      }
    });
  }

});