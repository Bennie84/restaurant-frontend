import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateCustomization,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/product.js";
//import dayjs from '../../data/dayjs.js';
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    //WE REUSED THE CODE BY PUTTING IT IN A FUNCTION IN THE PRODUCT.JS AND WE CHANGED LET TO CONST

    //let matchingProduct;
    // products.forEach((product) => {
    //   if (product.id === productId) {
    //     matchingProduct = product;
    //   }
    // });
    //END
    const matchingProduct = getProduct(productId);

    const today = dayjs();
    const deliveryDate = today.add(30, "minutes");
    const dateString = deliveryDate.format("dddd, MMMM D [at] h:mm A");

    //console.log(matchingProduct);

    cartSummaryHTML += `
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image" src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">${matchingProduct.name}
        </div>
        <div class="product-price">
         ${matchingProduct.price}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-lable js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
            Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
            Save
          </span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

        
        
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a customization:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
    </div>
  </div>
`;
  });

  //this function is to get the customizationoptions for the delivery options

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = "";

    matchingProduct.customizationOptions.forEach((option) => {
      const isChecked = Option.id === cartItem.customizationId;

      html += `
  <div class="delivery-option">
    <input type="radio"
    ${isChecked ? "checked" : ""}
      class="delivery-option-input"
      name="delivery-option-${matchingProduct.id}" value="${option.id}">
    <div>
      <div class="delivery-option-date">
        ${option.label}
      </div>
    </div>
   </div>
   `;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;
  attachModalListener();

  document.querySelectorAll(".delivery-option-input").forEach((radio) => {
    radio.addEventListener("change", () => {
      const productId = radio.name.replace("delivery-option-", "");
      const newCustomizationId = radio.value;
      updateCustomization(productId, newCustomizationId);
    });
  });
  // This is the order confirmation
  function attachModalListener() {
    setTimeout(() => {
      const placeOrderBtn = document.querySelector(".js-place-order-btn");
      if (!placeOrderBtn) return;

      let orderTotal = 0;

      placeOrderBtn.addEventListener("click", () => {
        //console.log('i got clicked');
        let itemsHTML = "";
        let productTotal = 0;

        cart.forEach((cartItem) => {
          const product = getProduct(cartItem.productId);

          const selectedOption = product.customizationOptions.find(
            (opt) => opt.id === cartItem.customizationId,
          );
          const customizationLabel = selectedOption
            ? selectedOption.label
            : "None selected";

          const itemTotal = product.price * cartItem.quantity;
          productTotal += itemTotal;

          itemsHTML += `
 <div class="modal-items">
 <img src="${product.image}" alt="${product.name}"
 style="width:80px; height:80px; object-fit:cover; border-radius:6px; flex-shrink: 0;">
 <div class="modal-item-details">
 <div class="modal-item-name">${product.name}</div>
 <div class="modal-item-customization">
 ${customizationLabel}
 </div>
 <div class="modal-item-price">
 qty: ${cartItem.quantity} *
 #${product.price.toLocaleString()} =
 #${itemTotal.toLocaleString()}
 </div>
 </div>
 </div> 
 `;
        });

        const shipping = 2000;
        const totalBeforeTax = productTotal + shipping;
        const tax = totalBeforeTax * 0.1;
        orderTotal = totalBeforeTax + tax;

        const summaryHTML = `
 <div class ="modal-summary-row">
 <span>Subtotal</span>
 <span>#${productTotal.toLocaleString()}</span>
 </div>
 <div class="modal-summary-row">
 <span>Shipping</span>
 <span>#${shipping.toLocaleString()}</span>
 </div>
 <div class="modal-summary-row">
 <span>Tax (10%)</span>
 <span>#${tax.toLocaleString()}</span>
 </div>
 <div class="modal-summary-row">
 <span>Order Total</span>
 <span>#${orderTotal.toLocaleString()}</span>
 </div>
 `;

        document.querySelector(".js-modal-items").innerHTML = itemsHTML;
        document.querySelector(".js-modal-summary").innerHTML = summaryHTML;
        document.querySelector(".js-modal-overlay").classList.add("active");
      });

      //TESTING PAYMENT INTEGRATION

      document
        .querySelector(".js-modal-pay-btn")
        .addEventListener("click", () => {
          const handler = PaystackPop.setup({
            key: "pk_test_fb7f0630ec4a780f0c0e070eaf8dd7ec5d738cac",
            email: "bennieeecodes@gmail.com",
            amount: orderTotal * 100,
            currency: "NGN",
            callback: function (transaction) {
              console.log("SUCCESS FIRED", transaction);
              fetch("https://my-restaurant-backend-d1zc.onrender.com/verify-payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  reference: transaction.reference,
                  email: "bennieeecodes@gmail.com",
                  amount: orderTotal,
                  items: cart,
                }),
              })
                .then(function (response) {
                  return response.json();
                })
                .then(function (data) {
                  console.log("Backend response:", data);
                  if (data.success) {
                    localStorage.setItem("lastOrder", JSON.stringify(cart));
                    // clear the cart
                    localStorage.removeItem("cart");
                    // redirect to success page
                    window.location.href = `success.html?reference=${transaction.reference}&amount=${orderTotal}`;
                  } else {
                    alert(
                      "Payment received but order could not be saved. Please contact us.",
                    );
                  }
                })
                .catch(function (error) {
                  console.error("Error:", error);
                  alert("Something went wrong. Please contact us.");
                });
            },
            onCancel: function () {
              alert("Payment cancelled");
            },
          });
          handler.openIframe();
        });

      document
        .querySelector(".js-modal-close")
        .addEventListener("click", () => {
          document
            .querySelector(".js-modal-overlay")
            .classList.remove("active");
        });

      document
        .querySelector(".js-modal-overlay")
        .addEventListener("click", (e) => {
          if (e.target.classList.contains("js-modal-overlay")) {
            e.target.classList.remove("active");
          }
        });
    }, 0);
  }
  //END
  //console.log(cartSummaryHTML);
  //AFTER GENERATING THE HTML,
  // THE NEXT STEP IS TO MAKE IT INTRACTIVE ,
  // WE WOULD START WITH THE DELETE BUTTON

  //SO FIRST WE WOULD ADD A CLASS TO THE DELETE BUTTON IN THE HTML
  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      //console.log('delete');
      const productId = link.dataset.productId;
      //console.log(productId);
      //WE WE WOULD CREATE A FUNCION IN THE CART FOR THE DELETE AND CALL THE FUNCTION HERE

      removeFromCart(productId);

      //SO AFTER CREATING A FUNCTION IN THE CART, THE NEXT STEP IS TO
      //UPDATE THE HTML WHICH MEANS WHEN THE DELETE BUTTON IS CLICKED
      //IT DELETES FROM THE PAGE.
      //SO WE HAVE ADDED A CLASS TO THE CART CONTAINER AND WE ARE GOING TO CALL IT USING THE DOM
      //AND WE WOULD USE AN ATTRIBUTE .REMOVE TO DELETE THE CONTAINER

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      //console.log(container);
      container.remove();
      updateCartQuantity();

      renderPaymentSummary();
      attachModalListener();
    });
  });

  //THIS IS FOR THE UPDATE LINK
  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      //console.log(productId);
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.classList.add("is-editting-quantity");
    });
  });

  document.querySelectorAll(".js-save-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );

      container.classList.remove("is-editing-quantity");

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`,
      );
      const newQuantity = Number(quantityInput.value);
      updateQuantity(productId, newQuantity);

      const quantityLabel = document.querySelector(
        `.js-quantity-label-${productId}`,
      );
      quantityLabel.innerHTML = newQuantity;

      updateCartQuantity();
      renderPaymentSummary();
    });
  });

  //END
  //renderOrderSummary();
  // THIS IS FOR THE CHECKOUT() TO DISPLAY HOW MANY ITEMS YOU CLICK
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector(".js-return-to-home-link").innerHTML =
      `${cartQuantity} items`;
  }
  updateCartQuantity();
}
//END HERE
