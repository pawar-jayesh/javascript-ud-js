

// ----------------------------------------------------------------
// ----------------------------------------------------------------


/*

// in commonJS, one file is  module (imp)
// this works in Node.JS
// export
export.addToCart = function(product, quantity){
    cart.push({product, quantity});
    console.log(` ${product} and ${quantity}, ${shoppingCart} was added to the cart`);
}
//import
const { addToCart } = require("./shoppingCart.js");

*/


// ----------------------------------------------------------------
// ----------------------------------------------------------------


/*

// old way of creating modules
// using IIFE
const ShoppingCart = (function(){
    const cart = [];
    const shoppingCart = 10;
    const totalPrice = 237;
    const totalQuantity = 23;

    const addToCart = function(product, quantity){
        cart.push({product, quantity});
        console.log(` ${product} and ${quantity}, ${shoppingCart} was added to the cart`);
    }

    const orderStock = function(product, quantity){
        cart.push({product, quantity});
        console.log(` ${product} and ${quantity} ordered from supplier`);
    }

    // exporting what we want to
    return {
        addToCart,
        cart,
        totalPrice,
        totalQuantity
    }
})();

// using the export
ShoppingCart.addToCart("apple", 4);
ShoppingCart.addToCart("pizza", 2);
console.log(ShoppingCart.cart);             // (2) [{…}, {…}]
console.log(ShoppingCart.totalQuantity);    // 23
console.log(ShoppingCart.totalPrice);       // 237
console.log(ShoppingCart.shoppingCart);     // undefined

*/


// ----------------------------------------------------------------
// ----------------------------------------------------------------


// /*

// import defaultExport , { addToCart, totalPrice as price, qt } from  "./shoppingCart.js";

import { addToCart, totalPrice as price, qt } from  "./shoppingCart.js";

import * as ShoppingCart from "./shoppingCart.js"

console.log("importing module");
addToCart("Banana", 4);
ShoppingCart.addToCart("Oh na na", 1)

console.log(price);
console.log(ShoppingCart.qt);

// importing is not simply a copy, it is live connection
// because cart was exported as []
// modified here
// but when we read the import it can be seen as modified
// so they point the same place in memory
import defaultExport, {cart} from "./shoppingCart.js"
defaultExport("check", 69);
defaultExport("check", 69);
defaultExport("check", 69);

console.log(cart);      //  5 [{…}, {…}, {…}, {…}, {…}]

// this only works in modules
// no need of async function  to use await
// but this blocks the execution of module, so no cool

// const res = await fetch("https://jsonplaceholder.typicode.com/posts");
// const data = await res.json();
// console.log(data);

// real world await example
async function getLastPost(){

    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
    return {title: data.at(-1).title, text: data.at(-1).body }
}
// const lastPost = await getLastPost();
// console.log(lastPost);

// */

// parcel feature
if(module.hot){
    module.hot.accept();
}

console.log(cart.find(el => el.quantity = 2));
import "core-js/stable"

