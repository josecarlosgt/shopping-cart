const PRODUCTS = {
    "brocoli": {
      "key": "brocoli",
      "name": "Brocoli",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/broccoli.jpg",
      "keywords": ["vegetable", "diet", "food", "fresh", "green"],
      "price": 4
    },
    "grapes": {
      "name": "Grapes",
      "key": "grapes",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/grape.jpg",
      "keywords": ["food", "fresh", "fruit", "green"],
      "price": 5
    },
    "strawberries": {
      "name": "Strawberries",
      "key": "strawberries",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/strawberry.jpg",
      "keywords": ["food", "fresh", "fruit", "breakfast"],
      "price": 6
    },
    "cheese": {
      "name": "Cheese",
      "key": "cheese",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/cheese2.png",
      "keywords": ["dairy", "breakfast", "food"],
      "price": 5
    },
    "yogurt": {
      "name": "Yogurt",
      "key": "yogurt",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/yoghurt.png",
      "keywords": ["dairy", "food", "breakfast"],
      "price": 3
    },
    "toothpaste": {
      "name": "Toothpaste",
      "key": "toothpaste",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/toothpaste.png",
      "keywords": ["dental", "hygiene"],
      "price": 10
    },
    "shampoo": {
      "name": "Shampoo",
      "key": "shampoo",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/shampoo.png",
      "keywords": ["hair", "hygiene"],
      "price": 15
    },
    "soap": {
      "name": "Soap",
      "key": "soap",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/soap.jpg",
      "keywords": ["body", "hygiene"],
      "price": 2
    },
    "wine": {
      "name": "Wine",
      "key": "wine",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/wine.png",
      "keywords": ["alcohol", "bar", "beverage"],
      "price": 12
    },
    "napkins": {
      "name": "Napkins",
      "key": "napkins",
      "imageURL": "https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/napkin.png",
      "keywords": ["bar", "table"],
      "price": 4
    }
  };

// Data structure containing products browsed and selected by the user
const SHOPPING_DATA = {
  // Array representing the search results
  searchResults: [],
  // Array representing the shopping cart
  cart: []
}

 /**
  Event handler for searching products by name and keyword.
  This function should populate the SHOPPING_DATA.searchResults array

 	@returns no value
 */
 function search() {
  // Remove all elements in the SHOPPING_DATA.searchResults array
  SHOPPING_DATA.searchResults = [];

  // Get the search query from an input HTML element
  let query = $("#searchbox").val().toLowerCase();

  /* Find all products in the PRODUCTS_DATA.PRODUCTS object with a name or
  keyword that matches the search query */

  // Populate the SHOPPING_DATA.searchResults with all matched products

  for (let productKey in PRODUCTS) {
    let product = PRODUCTS[productKey];
    if(product.name.toLowerCase().includes(query) ||
      product.keywords.includes(query)) {
        console.log(product.name);
        SHOPPING_DATA.searchResults.push(product);
      }
  }

  // Display the search results by calling displaySearchResults()
  displaySearchResults();
}

/**
  Generates the HTML required to visualize a product.

   @param {object} product The product to visualize
   @param {boolean} onClickCallback Callback function to be called for "on click"
   events. This parameter is useful for implementing the features of
   adding/deleting items to/from the shopping cart.
   @returns {string} A string representing HTML code
*/
function generateItemHTML(product, onClickCallback) {
  /*  Follow the example below to create the HTML required to display a product item.
  <li>
    <img src="https://cdn.jsdelivr.net/gh/josecarlosgt/infosys280/broccoli.jpg" />
    <figcaption>Brocoli $4</figcaption>
  </li>
  */
  let productItem = $("<li>");

  let image = $("<img src='" + product.imageURL + "'>");
  let caption =
    $("<figcaption>" + product.name + " $" + product.price + "</figcaption>");

  productItem.append(image);
  productItem.append(caption);

  /* Use data properties to store the product key. This technique will make it
  easy to identify the product in event handler functions.
  https://api.jquery.com/data/
  */
  productItem.data("key", product.key);

  // Register the event handler specified in the onClickCallback parameter
  if(onClickCallback != undefined) {
    productItem.on("click", onClickCallback);
  }

  return productItem;
}

/**
 Displays all products matching the search query

 @returns no value
*/
function displaySearchResults() {
	// Empty the container holding all search results
  $("#searchResults").empty();

  // Generate the HTML to visualize each product by calling generateItemHTML()

  // Append each item to a search results container

  for(let product of SHOPPING_DATA.searchResults) {
      let productHTML = generateItemHTML(product, addProduct);
      $("#searchResults").append(productHTML);
  }
}

/**
 Event handler for adding a product to the shopping cart.
 This function should populate the SHOPPING_DATA.cart array

 @returns no value
*/
function addProduct() {
	// Get the product key from the clicked item
  let key = $(this).data("key");

  // Add the product to the SHOPPING_DATA.cart array
  let product = PRODUCTS[key];
  SHOPPING_DATA.cart.push(product);

  // Display the shopping cart by calling displayCart()
  displayCart();
}

/**
 Event handler for deleting a product from the shopping cart.
 This function should alter the SHOPPING_DATA.cart array

 @returns no value
*/
function deleteProduct() {
  let key = $(this).data("key");

  let newCart = [];
  for(let product of SHOPPING_DATA.cart) {
    if(product.key != key) {
      newCart.push(product);
    }
  }
  SHOPPING_DATA.cart = newCart;

  displayCart();
}

/**
 Displays all products in the shopping cart.

 @returns no value
*/
function displayCart() {
  $("#cart").empty();

  let total = 0;
  for(let product of SHOPPING_DATA.cart) {
      let productHTML = generateItemHTML(product, deleteProduct);
      $("#cart").append(productHTML);
      total += product.price;
  }

  $("#total").text("$" + total);
}

/**
  Registers the search event handler on an HTML item with id = search

 @returns no value
*/
function init() {
  $("#search").on("click", search);
}

$(document).ready(function(){
  init();
});
