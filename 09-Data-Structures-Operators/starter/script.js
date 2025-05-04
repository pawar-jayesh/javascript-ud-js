'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ["mon", "tue", "wed","thu", "fri", "sat", "sun"];
// using [] on left side to compute property name
const openingHours= {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};
// for(const items of weekdays){
//   // openingHours.mon?.open, then openingHours.tue?.open and so on...
//   const open = openingHours[items]?.open ?? "Closed";
//   console.log(`on ${items} we open at ${open}`);
// }


// Data needed for first part of the section
const restaurant = {
  openingHours,   // property name = variable name, value = variable value
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function(starterIndex, mainIndex){
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // passed object being destructred as 4 variables with default values(for some) if not passed
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  // can write functions inside Object literals without the function keyword since ES^
  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your declicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza: function(mainIngredient, ...otherIngredients){
      console.log(mainIngredient);
      console.log(otherIngredients);
  }

};


// data
const italianFoods = new Set([
  'pasta',
  'gnocchi',
  'tomatoes',
  'olive oil',
  'garlic',
  'basil',
]);

const mexicanFoods = new Set([
  'tortillas',
  'beans',
  'rice',
  'tomatoes',
  'avocado',
  'garlic',
]);


document.body.append(document.createElement("textarea"));
document.body.append(document.createElement("button"));


document.querySelector("button").addEventListener("click", function(){
  const text = document.querySelector("textarea").value;

  if(text.length < 1){
    console.log("enter something");
    return;
  }
  const textArray = text.split("\n");
  const outputArray = [];

  for(const element of textArray){

    const newArray = element.trim().split("_");

    let cuurentString = "";
    for(const [index, val] of newArray.entries()){
        if(index == 0) cuurentString += val.toLowerCase();
        else cuurentString += val[0].toUpperCase() + val.slice(1).toLowerCase();
    }
    outputArray.push(cuurentString);
  }
  // console.log(outputArray); 

  for(let [index, one] of outputArray.entries()){
    index = index+1
    one = one.padEnd(30, " ") + "✅".repeat(index);
    console.log(one);
  }

});


/* string 3
const airline = "TAP Air Portugal";
const plane = "A320";

// get value at particular index
console.log(plane[0]);     // A
console.log("ABCD"[3]);    // D

// to get length
console.log(plane.length);     // 4
console.log("ABCD".length);    // 4

// will give index of first occurence
console.log(airline.indexOf("r"));      // 6
// will give index of first char. case sensitive. -1 if not found
console.log(airline.indexOf("Portugal"));      // 8

// will give index of last occurence
console.log(airline.lastIndexOf("r"));  // 10


// slice - to get a part of the string
console.log(airline.slice(4));    // Air Portugal
// slice from 4 to 7(without) - 4,5,6
console.log(airline.slice(4,7));    // 'Air'


console.log(airline.slice(0, airline.indexOf(" ")));    // TAP
console.log(airline.slice(airline.lastIndexOf(" ")));   // ' Portugal'
// do +1 above to eliminate space


// will start from benhind
console.log(airline.slice(-2));     // al
console.log(airline.slice(1, -1));  // AP Air Portuga

const checkMiddleSeat = function(seat){
  // B and E are middle seats
  const s = seat.slice(-1);

  if(s == "B" || s === "E"){
    console.log("You got the middle seat");
  } else {
    console.log("lucky");
  }
}
checkMiddleSeat("11B");   // You got the middle seat
checkMiddleSeat("23C");   // lucky
checkMiddleSeat("3E");    // You got the middle seat
 
const passenger = "jOnas";
const passengerLowercase = passenger.toLowerCase();
const finalPassengerName = passenger[0].toUpperCase() + passengerLowercase.slice(1);
console.log(finalPassengerName);

// comparing emails
const email = "hello@jonas.io";
const loginEmail = " Hello@Jonas.io \n";

if(email === loginEmail.toLowerCase().trim()) console.log("Email correct");


// replacing - only the first occurence
const priceGB = "299,97E";
const priceUS = priceGB.replace("2","$").replace(",", ".");
console.log(priceUS);

const announcement = "All passengers come to door 23. boarding door 23";
// replacing all using regex - g stands for global (use / / instead of "")
console.log(announcement.replace(/door/g,"gate"));
// replaceAll - replaces all occureneces
console.log(announcement.replaceAll("door", "gate"));

// Booleans
const plane2 = "Airbus A320neo";

console.log(plane2.includes("A320"));     // true
console.log(plane2.includes("Boeing"));   // false
console.log(plane2.startsWith("Air"));    // true
console.log(plane2.endsWith("eo"));       // true


console.log("a+very+nice+string".split("+"));   // ['a', 'very', 'nice', 'string']
console.log("Jonas Schedtmann".split(" "));     // ['Jonas', 'Schedtmann']
const [firstName, LastName] = "Jonas Schedtmann".split(" ");
console.log(firstName, LastName);               // Jonas Schedtmann
// will join all elements and add "{val}" in between
const arrayName = ["Mr", "Jonas",LastName.toUpperCase() ];
console.log(arrayName.join("-"));   // Mr-Jonas-SCHEDTMANN


const capFirstLetter = (nameParameter) => {
  const nameArray = nameParameter.split(" ");
  const retsult = [];
  for(const name of nameArray){
      retsult.push(name[0].toUpperCase() + name.toLowerCase().slice(1));
  }
  return retsult.join(" ");
}
console.log(capFirstLetter("Jayesh Pawar"));
console.log(capFirstLetter("chinnAAswammy muTHhuswammy vennugoal iyer"));

// padding : will end specified characters to string 
// to fill the specified length
const message = "Go to gate 23";
console.log(message.padStart(25,"+"));        // ++++++++++++Go to gate 23
console.log(message.padEnd(25,"-"));          // Go to gate 23------------
console.log(message.padEnd(25,"-").length);   // 25
// works with total length 
// so if string is of more than 10 chars then nothing happens in padStart
// same of padEnd, but if less then padding happens
console.log(message.padStart(10,"+").padEnd(30,"+"));    // Go to gate 23+++++++++++++++++


const maskCreditCard = function(cardNumber){
  const stringVal = cardNumber + "";     // number converted to string
  const displayNumber = stringVal.slice(-4);
  console.log(displayNumber.padStart(stringVal.length, "*"));
}
maskCreditCard(4576576687787556);
maskCreditCard("5647897774576576687787556");

// repeat - will repeat the string specified number of times
const message2 = "Bad weather all deparatures delayed \n";
console.log(message2.repeat(4));
*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------



/*


// Maps more

// Creating maps without set method
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct 🎉'],
  [false, 'Try again!'],
]);
console.log(question);


// convert object to maps
// as entries return a key value pair and an array of array [ [] ]
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// iterating maps
console.log(question.get("question"));
for(const [keyJ, valueJ] of question){
  if(typeof keyJ === "number") console.log(`Answer ${keyJ} : ${valueJ}`);
}

const answer = Number(prompt("Your answer"));
// will print Correct if user enters 3 else Try again!. as we have boolean value as keys
console.log(question.get(answer === question.get("correct")));    

// converting map to array
const mapToArray = [...question];   // gives MapIterator [ [] ]
console.log([question.keys()]);     // returns all the keys MapIterator  [ [] ]
console.log([question.values()]);     // returns all the values MapIterator  [ [] ]
// for keys() and values(), use (...) to get inner array
console.log([...question.keys()]);     // ['question', 1, 2, 3, 'correct', true, false]
console.log([...question.values()]);   // ['What is the best..', 'C', 'Java', 'JavaScript', 3, 'Correct 🎉', 'Try again!']

console.log([question.entries()]);  // same result as [...questions]


// Map fundamentals
const rest = new Map();
rest.set("Name", "Classico Italiano");
rest.set(1, "Firenze, Italy");
console.log( rest.set(2, "Lisbon, Portugal"));    // returns whole map

// we can chain it as set method returns map
rest.set("Categories", ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
    .set("open", 11)
    .set("close", 23)
    .set(true, "we are open")
    .set(false, "we are close");

console.log(rest);

// get method to retrieve value using key name
console.log(rest.get("Name"));    // Classico Italiano
console.log(rest.get(true));      // we are open


const time = 22;
// as we have true/false as property name, based on the expression and time we will get
// we are open or we are close
console.log( rest.get(time > rest.get("open") && time < rest.get("close")));    // we are open


// has function to check if key exists
console.log(rest.has("Categories"));    // true

// deletes element and returns true/false based on key found or not
console.log(rest.delete(2));

// size to get count and clear to clear everything(does not return anything)
console.log(rest.size);     // 7
rest.clear()
console.log(rest.size);     // 0


rest.set([1,2], "test");        // will create a key of type array
console.log(rest.get([1,2]));   // undefined as both have different reference in memory
// will work as while creating and retrieving same array was used, so same reference
const arr = [3,4];
rest.set(arr, "Will work");
console.log(rest.get(arr));    // Will work
// can have dom element as key as well
rest.set(document.querySelector("h1"), "heading");
console.log(rest.get(document.querySelector("h1")));    // heading
*/





// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------


/*
const ordersSet = new Set([
  "Pizza",
  "Pizza",
  "Risotto",
  "Pizza",
  "Pasta",
]);
console.log(ordersSet);   // Set(3) {'Pizza', 'Risotto', 'Pasta'}
console.log(new Set());   // empty set

// to get size of the set. (length property is not there)
console.log(ordersSet.size);    // 3

// to check if set has an element. (similar to includes of array)
console.log(ordersSet.has("Pizza"));    // true
console.log(ordersSet.has("Bread"));    // false

// to add element to a set
console.log(ordersSet.add("Garlic Bread"));   // Set(4) {'Pizza', 'Risotto', 'Pasta', 'Garlic Bread'}
console.log(ordersSet.add("Garlic Bread"));   // Set(4) {'Pizza', 'Risotto', 'Pasta', 'Garlic Bread'}

// deletes element and returns true/false based on element found or not
console.log(ordersSet.delete("Risotto"));     
console.log(ordersSet);     // set(3) {'Pizza', 'Pasta', 'Garlic Bread'}

// cannot do, will get undefined
const varO = ordersSet[0];

ordersSet.clear();   // to delete every element of set

for(const order of ordersSet) console.log(order);   // iterating through set


const staff = ["Waiter", "Chef", "Manager","Chef", "Manager","Waiter"];
const staffUnique = new Set(staff);     // will create a set of unique elements from staff array
console.log(staffUnique);               // Set(3) {'Waiter', 'Chef', 'Manager'}

// can use spread operator to get all values as set is iterable
const staffUniqueArray = [...staffUnique];  // [...new Set(staff)];
console.log(staffUniqueArray);              // (3) ['Waiter', 'Chef', 'Manager'] - Array

// can use to get size as well
console.log(new Set(staff).size);          // 3
console.log(new Set("JayeshPawar").size);  // 9 (as duplicates were removed)


// set new methods

// intersection - common in both - order does not matter
const commonFoods = italianFoods.intersection(mexicanFoods);
console.log(commonFoods);     // Set(2) {'tomatoes', 'garlic'}

// union - combination of two sets with unique values only - order does not matter
const italianMexicanFusionUnique = mexicanFoods.union(italianFoods);
console.log(italianMexicanFusionUnique);
console.log(new Set([...italianFoods, ...mexicanFoods]));   // same as unique


// difference - new set which will contain all elements present in first set but not in second
// order matters here
console.log(italianFoods.difference(mexicanFoods));   // Set(4) {'pasta', 'gnocchi', 'olive oil', 'basil'}
console.log(mexicanFoods.difference(italianFoods));   // Set(4) {'tortillas', 'beans', 'rice', 'avocado'}


// symmetricDifference - order does not matter
// will return unique in both and will discard the intersection
const unqiueOfBoth = italianFoods.symmetricDifference(mexicanFoods);
console.log(unqiueOfBoth);

// issubsetof, issupersetof, isdisjointfron

// if one set does not contain any element of other set
console.log(italianFoods.isDisjointFrom(mexicanFoods));   // false



*/




// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------


/*

// Object .keys(), .values(), .entries()

// will return the keys 
for(const day of Object.keys(openingHours)){
  console.log(day);
}

// will return the values 
for(const day of Object.values(openingHours)){
  console.log(day);
}
// Object.entries will return a key value pair
// here value was an object, so used destructuring with property names
for (const [prop, {open, close}] of Object.entries(openingHours)){
  console.log(`Property Name: ${prop} | Open: ${open} and Close: ${close}`);
}

*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------


/*

// restaurant.openingHours.mon = "mon";     // undefine even if commented
// error as mon does not exist
// console.log(restaurant.openingHours.mon.open);     // returns error
// using ? to avoid error incase mon/open does not exists. 
console.log(restaurant.openingHours.mon?.open);    // returns undefined
// can chain as well
console.log(restaurant.openingHours?.mon?.open);   // returns undefined


// ? on method
// will run as method exists
console.log(restaurant.order?.(0,1) ?? "Method does not exist");
// will return undefined so Method does not exist is returned
console.log(restaurant.orderNotExisting?.(0,1) ?? "Method does not exist");

// ? on array
const demoArray = [{name: "Jonas", age: 31}];
console.log(demoArray[0]?.name ?? "Array/Name does not exist");
// Array/Address does not exist will be returned. so if array is [] same result
console.log(demoArray[0]?.address ?? "Array/Address does not exist");

*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------



/*

// for - of loop. we can still use break/continue
// on every iteration item value will change to next value in array
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for(const item of menu){
  console.log(item);
}

// entries will return index and element in array 
// eg: item = [0,"val"] ----> item = [1,"second iteration"] ----> item = [2,"third iteration"] 
for(const item of menu.entries()) {
  console.log(`Index : ${item[0] + 1}`);    // 1
  console.log(`Elemet : ${item[1]}`);       // first value in menu(Focaccia)
}

// destructuring the item with two values
for(const [i, value] of menu.entries()) {
  console.log(`Index : ${i+ 1}`);         // 1
  console.log(`Elemet : ${value}`);       // first value in menu(Focaccia)
}

console.log("menu.entries() : code ---> [...menu.entries()]");
console.log([...menu.entries()]);

*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------


/*


const restaurantOne = {
  name: "Capri",
  numGuests: 20
};

const restaurantTwo = {
  name: "La Piazza",
  owner: "Giovanni Rossi"
};

// restaurantOne.numGuests = restaurantOne.numGuests || 10; 
// restaurantTwo.numGuests = restaurantTwo.numGuests || 10; 
// Or assigment operator. same as above code
restaurantOne.numGuests ||= 10;
restaurantTwo.numGuests ||= 10;

// Nullish assigmnet operator (falsy: null or undefined)
restaurantOne.numGuests ??= 10;
restaurantTwo.numGuests ??= 10;

// And assigment operator
// nothing happens as owner does not exist, got falsy value and exited
restaurantOne.owner &&= "<Anonymous>"
// owner is updated > as both values are truthy the owner and <anon>, so last value assigned
restaurantTwo.owner &&= "<Anonymous>"   // <Anonymous>


console.log(restaurantOne);
console.log(restaurantTwo);
*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------


/*

// nullish coalescing operator ??

// restaurant.checkNullish = 0;
// restaurant.checkNullish = false;
// restaurant.checkNullish = "";
// restaurant.checkNullish = undefined;
// restaurant.checkNullish = null;
// const check = restaurant.checkNullish ?? 10;

console.log(null ?? 10);                        // 10
console.log(false ?? 10);                       // false
console.log("" ?? 10);                          // ""
console.log(undefined ?? 10);                   // 10
console.log(0 ?? 10);                           // 0
console.log(0 ?? undefined ?? null ?? "");      // 0
console.log(null ?? false ?? undefined ?? 0);   // false
console.log(null ?? undefined ?? null);         // null
console.log(false ?? 0 ?? "");                  // false
*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------



/*
// ||
console.log(3 || "Jonas");                                      // 3
console.log("" || "Jonas");                                     // Jonas
console.log(false || undefined);                                // undefined
console.log(undefined || 0 || '' || "Hello" || 23 || null);     // Hello
console.log("hi" || 12 || "hola" || true);                      // hi
console.log("hi" || null || 12 || "hola" || true);              // hi

const guest0 = restaurant.numGuests ? restaurant.numGuests : 0;   // same as || code below
// if restaurant.numGuests = 0. you will get 10 as 0 is falsy value
const guest = restaurant.numGuests || 10;    // 0 (because numGuests does not exist in restaurant)
console.log(guest);

console.log("---- And ---");

// &&
console.log(0 && "Jonas");                                  // 0
console.log(10 && "Jonas");                                 // Jonas
console.log(undefined && null);                             // undefined

// in case of more than two, all returned except 2nd falsy value only if the very first is falsy
// [ i.e if first value is falsy it is compared with next falsy value 
//   and first value is returned along with remaining falsy values    ]

console.log("Hello" && 23 && null && "jonas", undefined);   // null undefined
console.log(null && " aa" && undefined, 0, "",false);       // null 0 "" false
console.log(" aa" && undefined, 0, "",false);               // undefined null 0 "" false
console.log(0 && " aa" && undefined, false);                // 0 false 

// both will generate same result
if(restaurant.orderPizza){
  restaurant.orderPizza("order");
}
restaurant.orderPizza && restaurant.orderPizza("order");
// as both are truthy, last one is executed
*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------



/*
restaurant.orderPizza("Chicken", "Onion", "Cheese", "Extra Cheese");
// mainIngredient = "Chicken"
// otherIngredients = ['Onion', 'Cheese', 'Extra Cheese']
restaurant.orderPizza("OneOnly");
// mainIngredient = "OneOnly"
// otherIngredients = []


// Rest pattern - opposite of spread
// spread because on right side
const arr = [1,2, ...[3,4]];

// rest because on left side
const [a,b, ...others] = [19,2,3,4,5];
console.log(a, b, others);
// a = 19, b =2, others = [3,4,5] 

const [firstMain, , thirdMain, ...otherMenuItems] = [...restaurant.mainMenu, ...restaurant.starterMenu];
// firstElementOfMain, secondElementOfMain, all the elements after that
// secondElementOfMain not included in otherMenuItems as it was before and skipped
console.log(firstMain, thirdMain, otherMenuItems);

// rest on objects
// weekdaysObj will have everything from openingHours except sat
const { sat, ...weekdaysObj } = restaurant.openingHours;
console.log(weekdaysObj);   // {fri, thur}


// rest on functions. has rest parameters
// whatever is passed is combined as an array, paramter count is not fixed(infi)
const add = function(...numbers){
  let sum = 0;
  for(let i=0; i< numbers.length; i++) sum+= numbers[i];
  console.log(sum);
};

add(2,3);                     // numbers = [2,3]                  > 2+3                 = 5  number value
add(2,3,4,5,6,7);             // numbers = [2,3,4,5,6,7]          > 2+3+4+5+6+7         = 27 mumber value
add(2,3,4,5,6,7,8,9,10);      // numbers = [2,3,4,5,6,7,8,9,10]   > 2+3+4+5+6+7+8+9+10  = 54 number value

const x = [23,5,7];
add(x);    // here it expects multiple paramters not an array, thus (...)
// 23+5+7
// numbers[0] = [23,5,7]
// sum += numbers[0]   (023,5,7) a string value
*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------


/*
const arr = [7,8,9];
// spread oeprator
const spreadArr = [1,2, ...arr];    // created new array
console.log(spreadArr);             // output: [1,2,7,8,9]
console.log(...spreadArr);          // output: 1 2 7 8 9

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

// copy array
const mainMenuCopy = [...restaurant.mainMenu];     // shallow copy

// join two or more arrays
const menu = [...restaurant.mainMenu, ...restaurant.starterMenu];

const str = "Jonas";
const letters = [...str, " ", "s."];
console.log(letters);             // ['J', 'o', 'n', 'a', 's', ' ', 's.']

const ingredients = [prompt("Let\'s make pasta! Ingredint 1?"),  // user entry
  prompt("Let\'s make pasta! Ingredint 2?"),                     // user entry
  prompt("Let\'s make pasta! Ingredint 3?")                      // user entry
];
restaurant.orderPasta(...ingredients);    // orderPasta(ing1, ing2, ing3)


// ... on objects
const newRestuarant = {foundedIn: "1998",...restaurant, founder: "Guiseppe"};
console.log(newRestuarant);     // shallow copy of restaurant and 2 new properties

const restuarantCopy = {...restaurant};
// will only change name in copy as (...) copies the value, so both objects has reference to different location in heap
restuarantCopy.name = "Ristorante Roma";
console.log(restaurant.name);       // Classico Italiano
console.log(restuarantCopy.name);   // Ristorante Roma


// here both will have same arrys as (...) does shallow copy
restuarantCopy.mainMenu.push("New element");
console.log(restaurant.mainMenu);       // ['Pizza', 'Pasta', 'Risotto', 'New element']
console.log(restuarantCopy.mainMenu);   // ['Pizza', 'Pasta', 'Risotto', 'New element']
*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------


/*
// Destructuring objects

// passing object to a function
restaurant.orderDelivery({
  time: "11:11",
  starterIndex: 0,
  address: "None of yor business",
  mainIndex: 4
});

// Destructuring objects
// property names should match and there is no ordering
const {name, openingHours, categories} = restaurant;
console.log(name, openingHours, categories);

// destructuring and assigning new names at the same time
const {name: restaurantName, openingHours: hours, categories: tags} = restaurant;
console.log(restaurantName, hours, tags);

// destructuring using default values
// here menu is not a property of restuarent object, so default value is used.
const {menu: menuItems = [], openingHours: openedDuring} = restaurant;
console.log(menuItems, openedDuring);


// mutating variables in objects
let a =111;
let b = 999;
const obj = {a:23, b:7, c:14};
// cannot do this a JS assumes {} is for code block
// {a,b} = obj;

// this will assign a, b declared above(69,70) new values
// works because obj has property called a and b
({a,b} = obj);
console.log(a,b);


// nested Destructuring objects
const { fri: { open: friOpen, close: friClose} } = openingHours;
console.log(friOpen, friClose);
*/


// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------


/*
const arr = [2,3,4];
// when JS has [] on left side it knows that it has to destructure the array
// x =2, y=2, z=4
const[x,y,z] = arr;
// console.log(x, y, z);

// will get 1,3 from array and skip the 2nd element.
const [italy, , veg] = restaurant.categories;
// console.log(italy, veg);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// traditional way using variable
// const temp = main;
// main = secondary;
// secondary = temp;

// with destructuring
// no need of let as defined on line 60
// switched using destructuring, both 71 and 72 works
// [secondary, main] = [main, secondary];
[main, secondary] = [secondary, main];
console.log(main, secondary);

// receive two return values from a function
const [starter, mainOrder] = restaurant.order(2,0);
console.log(starter, mainOrder);


const nested = [2, 3, 4, [5,0], 7];
// const [i, , , j] = nested;
// console.log(i, j);       // 2 [5,0]

// nested destructuring. You can use nesting while retrieving the elements
const [i, , , [j,k], l] = nested;
console.log(i, j, k, l);  // 2, 5, 0, 7


// default values while destructuring
// variables will take default value if value not present
const [p=1, q=1, r=1] = [8,9];
console.log(p, q,r);    // 8, 9, 1

*/



const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
  printGoals : function(...players){

    for(let i=0; i < players.length; i++){
      console.log(`${players[i]} - has scored ${this.scoredGoals(players[i])} goals.`)
    }
  },

  scoredGoals : function(player){
    let goals = 0;
    for(let i =0; i <this.scored.length; i++){
      if(this.scored[i] === player) goals++;
    }
    return goals;
  },

};

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

/* Challenge 3
const events = [...new Set([...gameEvents.values()] )];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

// const avergaeEvent = [...gameEvents.keys()].length
console.log(`An event happed every ${ 90 / gameEvents.size } minutes`);

for(const [minute, event] of gameEvents){

  if(minute < 45) console.log(`[First Half] ${minute}: ${event}`);
  else console.log(`[Second Half] ${minute}: ${event}`);
}
*/


/* Challenge 2

for(const [index,player] of game.scored.entries()){
  console.log(`${player} scored the ${index +1 } goal.`);
}

let toatalOdd = 0;
for(const odd of Object.values(game.odds)){
  toatalOdd += odd;
}
console.log(`Toatl avergae of odd is ${toatalOdd/Object.values(game.odds).length}`);


for(const [key, value] of Object.entries(game.odds)){
  // let team = key == "team1" ? game[key] : key == "team2" ? game[key] : "draw";
  let team = key == "x" ? "draw" : game[key];
  console.log(`Odds of ${team == "draw" ? "" :"victory"} ${team}: ${value}`); 
}

const scorers = {}

for(const players of game.scored){

  if(scorers[players] == 1) {
    scorers[players]++;
    continue;
  };
  scorers[players] ??= scorers[players] = 1;

}
console.log(scorers);

*/


/* Challenge 1

const [players1, players2] = game.players;
console.log(players1, players2);

const [bayernGk, ...bayernFieldPlayers] = players1;
console.log(bayernGk);
console.log(bayernFieldPlayers);

const allPlayers = [...players1, ...players2];
console.log(allPlayers);

const bayernFinalPlayers = [...players1, "Thiago", "Coutinho", "Perisic"];
console.log(bayernFinalPlayers);

// const {team1, x:draw, team2} = game.odds;
const {odds: {team1, x:draw, team2}} = game;
console.log(team1, draw, team2);

game.printGoals('Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels',"Thiago", "Coutinho", "Perisic");

(team1 < team2) && console.log("Team One is More likely to win");
(team2 < team1) && console.log("Team two is more likely to win");
*/





