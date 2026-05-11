export let cart = JSON.parse(localStorage.getItem('cart') || '[]');

if (!Array.isArray(cart)) {
  cart = [];
}


  function saveToStorage () {
    localStorage.setItem('cart', JSON.stringify(cart))
  }

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
       customizationId : null // <- no default
    });
  }

  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart; //SINCE WE ARE REASSIGNING THE CART VARIABLE WE WOULD CHANGE THE CONST CART TO LET CART AT THE TOP
  saveToStorage();
}

//THIS FUNCTION IS FOR THE CHECKOUT AND CART NUMBER TO BE CALCULATED
export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity +=
    cartItem.quantity;
  });

  return cartQuantity;
}
//END

// THIS IS THE FUNCTION FOR THE UPDATE
export function updateQuantity(productId, newQuantity) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
}
//END

// THIS FUNCTION IS FOR THE CUSTOMIZATION
export function updateCustomization(productId, newCustomizationId) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.customizationId = newCustomizationId;
    }
  });
  saveToStorage();
}


// export let cart = JSON.parse(localStorage.getItem('cart'));  //THIS GETS THE ITEM, JSON.PARSE CONVERTS THE STRING BACK TO HTML

// if(!cart) {
//   cart = [{
//     productId: "4",
//     quntity: 2,
//     deliveryOptionId : '1'
//   }, {
//     productId: "15",
//     quantity: 2,
//     deliveryOptionId: '2'
//   }];
// }