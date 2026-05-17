import { products } from "../data/product.js";
import { cart, addToCart } from "../data/cart.js";

// Render products grid
function renderProducts() {
  const productsGrid = document.querySelector(".js-products-grid");
  let productsHTML = "";

  products.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
        </div>
        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>
        <div class="product-price">
          ₦${product.price.toLocaleString()}
        </div>
        <div class="product-spacer"></div>
        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png" alt="Checkmark">
          Added
        </div>
        <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  productsGrid.innerHTML = productsHTML;
  attachAddToCartListeners();
  updateCartQuantityDisplay();
}

// Attach click listeners to add to cart buttons
function attachAddToCartListeners() {
  document.querySelectorAll(".js-add-to-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      addToCart(productId);
      updateAddedToCartMessage(productId);
      updateCartQuantityDisplay();
    });
  });
}

// Show added to cart message
function updateAddedToCartMessage(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  if (addedMessage) {
    addedMessage.style.opacity = "1";
    setTimeout(() => {
      addedMessage.style.opacity = "0";
    }, 2000);
  }
}

// Update cart quantity in header
function updateCartQuantityDisplay() {
  const cartQuantity = document.querySelector(".js-cart-quantity");
  let totalQuantity = 0;
  
  cart.forEach((item) => {
    totalQuantity += item.quantity;
  });
  
  if (cartQuantity) {
    cartQuantity.textContent = totalQuantity > 0 ? totalQuantity : "";
  }
}

// Handle search
function setupSearch() {
  const searchBar = document.querySelector(".search-bar");
  if (!searchBar) return;
  
  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query)
    );
    
    const productsGrid = document.querySelector(".js-products-grid");
    let productsHTML = "";

    if (filtered.length === 0) {
      productsHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
          <p style="color: #b0adb5; font-size: 1.1rem;">No products found matching "${query}"</p>
        </div>
      `;
    } else { 
      filtered.forEach((product) => {
        productsHTML += `
          <div class="product-container">
            <div class="product-image-container">
              <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-name limit-text-to-2-lines">
              ${product.name}
            </div>
            <div class="product-price">
              ₦${product.price.toLocaleString()}
            </div>
            <div class="product-spacer"></div>
            <div class="added-to-cart js-added-to-cart-${product.id}">
              <img src="images/icons/checkmark.png" alt="Checkmark">
              Added
            </div>
            <button class="add-to-cart-button button-primary js-add-to-cart-btn" data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
        `;
      });
    }

    productsGrid.innerHTML = productsHTML;
    attachAddToCartListeners();
  });
}

// Initialize page on DOM load
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  setupSearch(); 
});