import { cart, addToCart, calculateCartQuantity } from '../data/cart.js';
import { products} from '../data/product.js';

//TO GENERATE THE HTML WE HAVE TO LOOP THROUGH
       let productsHTML ='';

          products.forEach((product) => {
            productsHTML += `
              <div class="product-container">
                <div class="product-image-container">
                  <img src="${product.image}"class="product-image">
                </div>

               <div class="product-name 
                limit-text-to-2-lines">
                 ${product.name}
                </div>

                <div class="product-price">
                  #${product.price}
                </div>

                 <div class="product-spacer"></div>

                 <div class="added-to-cart 
                 js-added-to-cart-${product.id}">
                  <img src="images/icons/checkmark.png" alt="">
                   Added
                  </div>

                <button class="add-to-cart-button 
                  button-primary js-add-to-cart"
                  data-product-id="${product.id}"> 
                  Add to Cart
                </button>
              </div>
            `;
          });

          //TO DISPLAY THE GENERATED HTML ON THE SCREEN

          document.querySelector(".js-products-grid").innerHTML = productsHTML;

          // function addToCart(productId) {
          //     let matchingItem;

          //     cart.forEach((cartItem) => {
          //       if (productId === cartItem.productId) {
          //         matchingItem = cartItem;
          //       }
          //     });

          //     if (matchingItem) {
          //       matchingItem.quantity += 1;
          //     } else {
          //       cart.push({
          //         productId: productId,
          //         quantity: 1,
          //       });
          //     }
          // }

          function updateCartQuantity() {
          //  let cartQuantity = 0;

          //  cart.forEach((cartItem) => {
          //    cartQuantity += cartItem.quantity;
          //  });
           const cartQuantity = calculateCartQuantity();
            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

          }
          updateCartQuantity();

          //WE ARE GOING DECLEAR THE ADDEDMESSAGETIMEOUTS OUTIDE THE FOREACH, WHICH IS HERE AND USE OBJESCT TO SAVE THE TIMEOUTIDS
          const addedMessageTimeouts = {};
          //TO MAKE THE WEBSITE INTERACTIVE,WE ADDED A CLASS TO THE BUTTON AND WE ARE GOING TO CALL IT USING THE DOM. AND THEN WE CAN LOOP THROUGH ALL THE BUTTONS USING FOREACH AND ADD AN EVENT LISTENER TO EACH BUTTON
              //CALIMG THE BUTTON USING THE DOM
              document.querySelectorAll('.js-add-to-cart')

              //THIS IS TO LOOP THROUGH THE BUTTON AND ADDIDNG THE EVENT LISTENER
              .forEach((button) => {
                button.addEventListener("click", () => {
                  // console.log("Added");

                  //SO NEXT IS TO SHOW WHAT WE CLICKED ON TH THE CART, AND TO DO THAT WE WOULD CREAT AN EMPTY ARRAY FIRST, THEN ADD DATA ATTRIBUTE TO OUR BUTTON HTML

                  //SO NOW THAT WE HAVE ADDED THE DATA ATTRIBUTE TO OUR HTML ATTRIBUTE,TO GET THE PRODUCT WHEN WE CLICK THE BUTTON WE WOULD CALL THE PROPERTY DATASET, WHICH GIVES US ALL THE PRODUCT ASSOCIATED WITH THE DATA ATTRIBUTE WE CREATED

                  // const productId = button.dataset.productId;
                  //THIS IS THE SHORTCUT
                  const { productId } = button.dataset;
                  addToCart(productId);
                  updateCartQuantity();

                  //TO CHECK IF PRODUCT IS IN THE CART AND THEN INCREASE IT'S QUANTITY. AND ALSO IF THE PRODUCT IS NOT in THE CART , ADD IT TO THE CART

                  // let matchingItem;

                  // cart.forEach((item) => {
                  //   if (productId === item.productId) {
                  //     matchingItem = item;
                  //   }
                  // });

                  // if (matchingItem) {
                  //   matchingItem.quantity += 1;
                  // } else {
                  //   cart.push({
                  //     productId: productId,
                  //     quantity: 1,
                  //   });
                  // }
                  //SO NOW THAT WE HAVE UDATED OUR CART UP THERE, THE NEXT STEP IS TO CALCULATE THE QUANTITY OF THE PRODUCT BY LOOPING THROUGH THE CART ARRAY
                  // let cartQuantity = 0;

                  // cart.forEach((item) => {
                  //   cartQuantity += item.quantity;
                  // });

                  //SO NOW THAT WE HAVE CALCULATED THE QUANTITY,WE NEED TO PUT IT INSIDE OUR CART PAGE  BY USING THE DOM, AND WHEN USING THE DOM WE NEED TO ADD A CLASS TO THE HTML CART QUANTITY WHERE WE WANT TO LOCATE OR DISPLAY ON THE PAGE (THE ICON FOR THE CART WILL BE INCREASING BY 1 )
                  // document.querySelector(".js-cart-quantity").innerHTML =
                  //   cartQuantity;

                  //THE NEXT STEP IS TO DISPLAY THE MESSAGE (ADDED) WHEN WE CLICK THE ADD TO CART BUTTON, THE ADDED MESSAGE IS ALREADY IN THE HTML SO WE GAVE IT A CLASS AND THE DATA ATTRIBUTR. BUT THE STYLING OF THE MESSAGE HAS OPACITY OF 0. SO NOW WE CALL THE CLASS USING THE DOM

                  const addedMessage = document.querySelector(
                    `.js-added-to-cart-${productId}`,
                  );
                  //SO NOW TO ADD THE ELEMENT IN THE STYLE TO BE VISIBLE WHN WE CLICK THE CART BTN, WE WOULD USE THE PROPERTY (CLASSLIST.ADD)

                  addedMessage.classList.add("added-to-cart-visible"); //SO WE ARE ADDING THIS ADDED-TO-CART-VISIBLE TO THE CSS STYLE AND ADD OPACITY TO 1

                  //SO NOW WE SET ATIMEOUT FOR THE MESSAGE
                  //setTimeout (() => {
                    //CHECK IF THERE'S A PREVIOUS TIMEOUT FOR THIS PRODUCT. IF THERE'S WE SHOULD STOP IT.
                    setTimeout(() => {
                    const previousTimeoutId = addedMessageTimeouts[productId];
                    if (previousTimeoutId) {
                      clearTimeout(previousTimeoutId);
                    }
                    const timeoutId = setTimeout(() => {
                      addedMessage.classList.remove('added-to-cart-visible');
                    })
                  }, 2000);
                  //SAVE THE TIMEOUTID FOR THIS PRODUCT, SO WE CAN STOP IT LATER IF WE NEED TO

                  addedMessageTimeouts[productId] = timeoutId;
                });
              });
              
                
            