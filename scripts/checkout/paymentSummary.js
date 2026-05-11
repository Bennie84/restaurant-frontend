import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/product.js";

//THIS IS TO CALCULATE THE COST OF THE PRODUCT
export function renderPaymentSummary() {
  let productPrice = 0;
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPrice += product.price * cartItem.quantity;
    cartQuantity += cartItem.quantity;
  });

  if (cart.length === 0) {
    const paymentSummary = `
      <div class="payment-summary-title">Order Summary</div>
      <div class="payment-summary-empty">Your cart is empty.</div>
    `;

    document.querySelector(".js-payment-summary").innerHTML = paymentSummary;
    return;
  }

  const shippingCost = 2000;
  const totalBeforeTax = productPrice + shippingCost;
  const tax = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + tax;

  const paymentSummary = `
 <div class="payment-summary-title">
    Order Summary
  </div>

  <div class="payment-summary-row">
    <div>Items (${cartQuantity}):</div>
    <div class="payment-summary-money">#${productPrice}</div>
  </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">#${shippingCost}</div>
  </div>

  <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">#${totalBeforeTax}</div>
  </div>

  <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">#${tax}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">#${orderTotal}</div>
  </div>

  <button class="place-order-button button-primary js-place-order-btn">
    Place your order
  </button>

  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummary;
}
