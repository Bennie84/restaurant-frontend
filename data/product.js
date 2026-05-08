//console.log('hi product.js');
//TO SAVE PRODUCTS DATA/ITEM IN AN ARRAY OF OBJECTS
export function getProduct(productId) {
  let matchingProduct;
  
      products.forEach((product) => {
        if (product.id === productId) {
          matchingProduct = product;
        }
      });
      return matchingProduct;
}

export const products = [
  {
    id: "1",
    image: "images/products/steak.jpeg",
    name: "Grilled Ribeye-steak",
    price: 35000,
    customizationOptions: [
      { id: "well-done", label: "Well Done" },
      { id: "medium", label: "Medium" },
      { id: "spicy", label: "Spicy" },
    ]
  },
  {
    id: "2",
    image: "images/products/Alfredo-pasta.jpeg",
    name: "1-porion of our delicious Alfredo pasta",
    price: 14500,
    customizationOptions: [
      { id: "extra-sauce", label: "Extra Sauce" },
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-cheese", label: "Extra Cheese" },
    ]
  },
  {
    id: "3",
    image: "images/products/two-large-burger-combo.jpeg",
    name: "2 Large Burger with hotdog and a side of pet drink and fries",
    price: 25000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-patty", label: "Extra Patty" },
      { id: "no-onions", label: "No Onions" },
    ]
  },
  {
    id: "4",
    image: "images/products/All-in-one-jolly-package-combo.jpeg",
    name: "All in one jolly package combo",
    price: 30000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-fries", label: "Extra Fries" },
    ]
  },
  {
    id: "5",
    image: "images/products/Asun-jollof.jpeg",
    name: "Asun Jollof",
    price: 4000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-meat", label: "Extra Meat" },
    ]
  },
  {
    id: "6",
    image: "images/products/BBQ-pizza.jpeg",
    name: "BBQ Pizza",
    price: 17000,
    customizationOptions: [
      { id: "large", label: "Large" },
      { id: "medium", label: "Medium" },
      { id: "extra-cheese", label: "Extra Cheese" },
    ]
  },
  {
    id: "6",
    image: "images/products/creamy-chicken-breast-pasta.jpeg",
    name: "Creamy pasta with chicken breast",
    price: 14000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-cheese", label: "Extra Cheese" },
    ]
  },
  {
    id: "7",
    image: "images/products/english-breakfast.jpeg",
    name: "American English Breakfast",
    price: 135000,
  },
  {
    id: "8",
    image: "images/products/fries.jpeg",
    name: "Fries",
    price: 4000,
    customizationOptions: [
      { id: "salted", label: "Salted" },
      { id: "lightly-salted", label: "Lightly Salted" },
      { id: "spicy", label: "Spicy" },
      { id: "plain", label: "Plain" },
    ]
  },
  {
    id: "9",
    image: "images/products/jollof-rice-with-diced-beef.jpeg",
    name: "Garnished jollof rice with diced beef",
    price: 95000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-beef", label: "Extra Beef" },
    ]
  },
  {
    id: "10",
    image: "images/products/jollof-with-beef.jpeg",
    name: "Jollof rice with Beef",
    price: 5000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-beef", label: "Extra Beef" },
    ]
  },
  {
    id: "11",
    image: "images/products/pepperoni-pizza.jpeg",
    name: "Medium size pepperoni pizza",
    price: 15000,
    customizationOptions: [
      { id: "extra-cheese", label: "Extra Cheese" },
      { id: "spicy", label: "Spicy" },
      { id: "thin-crust", label: "Thin Crust" },
      { id: "thick-crust", label: "Thick crust" },
    ]
  },
  {
    id: "12",
    image: "images/products/grilled-tender-chicken-creamy-pasta.jpeg",
    name: "Mouth watering creamy pasta with grillred tender chicken",
    price: 12000,
    customizationOptions: [
      { id: "crispy-chicken", label: "Crispy Chicken" },
      { id: "tender-chicken", label: "Tender Chicken" },
      { id: "spicy", label: "Spicy" },
      { id: "extra-sauce", label: "Extra Sauce" },
    ]
  },
  {
    id: "13",
    image: "images/products/single-bun-burger-with-chips.jpeg",
    name: "One single bun-burger with side of chips",
    price: 8000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "no-onions", label: "No Onions" },
      { id: "extra-patty", label: "Extra Patty" },
    ]
  },
  {
    id: "14",
    image: "images/products/double-beef-bun-burger.jpeg",
    name: "Our double beef bun creamy and juicy Burger",
    price: 10000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "no-onions", label: "No Onions" },
      { id: "extra-patty", label: "Extra Patty" },
    ]
  },
  {
    id: "15",
    image: "images/products/sandwich-with-side-of-fries.jpeg",
    name: "Sandwich with side of fries and dip sauce",
    price: 9000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-dip", label: "Extra Dip" },
      { id: "no-sauce", label: "No Sauce" },
    ]
  },
  {
    id: "16",
    image: "images/products/premium-english-breakfast.jpeg",
    name: "Premium English Breakfast",
    price: 12000,
    customizationOptions: [
      { id: "no-eggs", label: "No Eggs" },
      { id: "extra-eggs", label: "Extra Eggs" },
      { id: "no-beans", label: "No Beans" },
      { id: "extra-bacon", label: "Extra Bacon" },
    ]
  },
  {
    id: "17",
    image: "images/products/special-jollof-with-grilled-lamb.jpeg",
    name: "Special jollof with well grilled lamb",
    price: 20000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-lamb", label: "Extra Lamb" },
    ]
  },
  {
    id: "18",
    image: "images/products/watering-pasta.jpeg",
    name: "Our mouth watering pasta",
    price: 9000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-sauce", label: "Extra Sauce" },
      { id: "extra-cheese", label: "Extra Cheese" },
    ]
  },
  {
    id: "19",
    image: "images/products/green-salad-garnish.jpeg",
    name: "Our green salad garnish with eggs and our special cream",
    price: 7000,
    ustomizationOptions: [
      { id: "no-cream", label: "No Cream" },
      { id: "extra-cream", label: "Extra Cream" },
      { id: "no-eggs", label: "No Eggs" },
      { id: "extra-eggs", label: "Extra Eggs" },
    ]
  },
  {
    id: "20",
    image: "images/products/pasta-with-prawns.jpeg",
    name: "Pasta with Prawns",
    price: 10000,
    customizationOptions: [
      { id: "spicy", label: "Spicy" },
      { id: "not-spicy", label: "Not Spicy" },
      { id: "extra-prawns", label: "Extra Prawns" },
      { id: "extra-sauce", label: "Extra Sauce" },
    ]
  },
  {
    id: "21",
    image: "images/products/maryland-cookies-milkshake.jpeg",
    name: "Our Maryland cookies milkshake",
    price: 10000,
    customizationOptions: [
      { id: "less-sweet", label: "Less Sweet" },
      { id: "extra-sweet", label: "Extra Sweet" },
      { id: "extra-cookies", label: "Extra Cookies" },
    ]
  },
  {
    id: "22",
    image: "images/products/oreo-milkshake.jpeg",
    name: "Oreo Milkshake",
    price: 10000,
    customizationOptions: [
      { id: "less-sweet", label: "Less Sweet" },
      { id: "extra-sweet", label: "Extra Sweet" },
      { id: "extra-oreo", label: "Extra Oreo" },
    ]
  },
  {
    id: "23",
    image: "images/products/chin-chin-milkshake.jpeg",
    name: "Our yummy chin-chin Milkshake",
    price: 10000,
    customizationOptions: [
      { id: "less-sweet", label: "Less Sweet" },
      { id: "extra-sweet", label: "Extra Sweet" },
      { id: "extra-chin-chin", label: "Extra Chin-Chin" },
    ]
  },
  {
    id: "24",
    image: "images/products/peanut-butter-milkshake.jpeg",
    name: "Peanut Butter Milkshake",
    price: 10000,
    customizationOptions: [
      { id: "less-sweet", label: "Less Sweet" },
      { id: "extra-sweet", label: "Extra Sweet" },
      { id: "extra-peanut", label: "Extra Peanut" },
    ]
  },
  {
    id: "25",
    image: "images/products/popcorn-milkshake.jpeg",
    name: "Our Popcorn Milkshake",
    price: 10000,
    customizationOptions: [
      { id: "less-sweet", label: "Less Sweet" },
      { id: "extra-sweet", label: "Extra Sweet" },
      { id: "extra-popcorn", label: "Extra Popcorn" },
    ]
  },
  {
    id: "26",
    image: "images/products/strawberry-milkshake.jpeg",
    name: "Strawberry Milkshake",
    price: 10000,
    customizationOptions: [
      { id: "less-sweet", label: "Less Sweet" },
      { id: "extra-sweet", label: "Extra Sweet" },
      { id: "extra-strawberry", label: "Extra Strawberry" },
    ]
  },
  {
    id: "27",
    image: "images/products/vanilla-oreo-and-avocado-milkshake.jpeg",
    name: "Vanilla Milkshake, Oreo Milkshake, and Avocado Milkshake",
    price: 15000,
    customizationOptions: [
      { id: "less-sweet", label: "Less Sweet" },
      { id: "extra-sweet", label: "Extra Sweet" },
     { id: "vanilla-only", label: "Vanilla Only" },
     { id: "oreo-only", label: "Oreo Only"},
     { id: "avocado-only", label: "Avocado Only"},
    ]
  },
];