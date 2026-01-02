document.addEventListener("DOMContentLoaded", () => {

  const shopGrid = document.getElementById("shopGrid");
  if (!shopGrid) return;

  const products = JSON.parse(localStorage.getItem("orivo_products")) || [];

  shopGrid.innerHTML = products.map(product => `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
    </div>
  `).join("");

  shopGrid.addEventListener("click", e => {
    const card = e.target.closest(".product-card");
    if (card) {
      window.location.href = `product.html?id=${card.dataset.id}`;
    }
  });

});