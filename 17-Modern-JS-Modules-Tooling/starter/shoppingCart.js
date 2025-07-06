console.log("exporting module");

const shippingCost = 10;
export const cart = [];

let totalPrice = 0;
let totalQuantity = 0;

// named export
export const addToCart = function(product, quantity){
    cart.push({product, quantity});
    console.log(` ${product} and ${quantity} was added to the cart`);
    product += product;
    totalQuantity += quantity;
}
export { totalPrice, totalQuantity as qt};

// default used when you only want to export one thing
// name not required
export default function(product, quantity){
    cart.push({product, quantity});
    console.log(` ${product} and ${quantity} was added to the cart`);
    product += product;
    totalQuantity += quantity;
}

// if this module is imported anywhere
// then that module has to wait till this top-level await is done
// so top-level await blocks the execution in current module
// it also blocks the other modules which are importing this module
// await fetch("https://jsonplaceholder.typicode.com/users");
// console.log("Finish fetching-----------------");



