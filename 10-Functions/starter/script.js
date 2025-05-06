'use strict';


// as the event listener function was defined in the 
// IIFE: Immediately Invoked Function Expressions
// it still has access to its variables, 
// even tho the function executes only once, due to clousre
(function(){
    const header = document.querySelector("h1");
    let color = "red";

    document.querySelector("body").addEventListener("click",function(){
        header.style.color = color;
        color = color == "red" ? "yellow" : "red";
    });
}())


// closure

let f;
const g = function(){
    const a = 23;
    f = function(){
        console.log(a * 23);
    };
};
const h = function(){
    const b = 777;
    f = function(){
        console.log(b * 2);
    };
};

g();        // assigns f with a=23
f();        // a = 23, as it was assigned a function in g

h();        // assigns b=777 to f. f loses all its previos values        
f();        // f has b=777 only, nothing else

// another closure example

const boardPassengers = function(n, wait){

    const perGroup = n/3;

    // due to closure  the set timeout function remebers the paramters n,wait 
    // and variable perGroup
    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`there are 3 groups each with ${perGroup} passengers`);
    }, wait * 1000);
    // setTimeout works independently

    console.log(`Will start boarding in ${wait} seconds`);
}
// this would be used by setTimemout if perGroup was not present in boardPassengers
// but as perGroup is present in boardPassengers it used that (31) instead of (44)
const perGroup = 1000;
boardPassengers(180, 10);
// Will start boarding in 10 seconds
// **** After 10 seconds ****
// We are now boarding all 180 passengers
// there are 3 groups each with 60 passengers




// let f;

// const g = function(){
//     let a = 2;
//     console.log("original set/reset a :" +a);
//     f = function() {
//         a++;
//         console.log("modified a inside :" +a);
//         console.log("Not modifying just printing a*2 :" +a * 2);
//     }
// }
// g();        // original set/reset a :2
// f();        // modified a inside :3     // Not modifying just printing a*2 :6
// f();        // modified a inside :4     // Not modifying just printing a*2 :8
// f()         // modified a inside :5     // Not modifying just printing a*2 :10
// g();        // original set/reset a :2
// f();        // modified a inside :3     // Not modifying just printing a*2 :6
// f()         // modified a inside :4     // Not modifying just printing a*2 :8



const secureBooking = function(check){
    let passengerCount = 0;

    return function(){
        passengerCount++;
        console.log(`${passengerCount} passengers`);
        console.log(check);
        check = "Pawar";
        console.log(check);
    }
}

const booker = secureBooking("Jayesh");
// here booker will have access to check and passengerCount, even after the function has executed
// meaning it remembers the parameters and the variables in the environment{} it was created in 
// once the value is changed by closure function it is stored in it
// booker();   // 1 passengers  Jayesh Pawar
// booker();   // 2 passengers  Pawar  Pawar
// booker();   // 3 passengers  Pawar  Pawar


// [[ ]] is internal property, you cannot access
// console.dir(booker);        // to know more about functions
// ƒ anonymous()
// length: 0
// name: ""
// prototype: {}
// arguments: (...)
// caller: (...)
// [[FunctionLocation]]:script.js:9
// [[Prototype]]:ƒ ()
// [[Scopes]]:  
//     0:Closure (secureBooking) {check: 'Pawar', passengerCount: 3}
//     1:Script {secureBooking: ƒ, booker: ƒ}
//     2:Global {window: Window, self: Window, document: document, name: '', location: Location, …}




// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

/*


// IIFE - to excute function just once
// wrap the nameless function or array function in () and it cannot be invoked again
// will run when code line reaches there

// function without signature
(function(){
    console.log("This will never run again");
    const isPrivate = 22;
})();
console.log(isPrivate);     // error 
// arrow function
(() => console.log("This will never happen again arrow"))();

*/


// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

/*
const poll = {
    question: 'What is your favourite programming language?',
    options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
    // This generates [0, 0, 0, 0]. More in the next section 😃
    answers: new Array(4).fill(0),

    registerNewAnswers() {
        const userInput = Number(prompt(`${this.question} \n${this.options.join("\n")}\n(Write Option Number)`));
        
        if(userInput > 3 || userInput < 0){
            console.log("Enter a valid number");

        } else if(String(userInput) == "NaN"){

            console.log("Enter a valid number");
        }else {
            this.answers[userInput] += 1;
        }

        this.displayResults();
        this.displayResults("string");

    },

    displayResults(type = "array"){
        if(type == "array") console.log(this.answers);
        if(type == "string") {
            let finalString = `Poll reults are ${this.answers.join(", ")}`;

            // for(const [i, val] of this.answers.entries()){
            //     const seperator = i != this.answers.length -1 ? "," : ".";
            //     finalString += " " + val + seperator;

            // }
            console.log(finalString);
        }
    }
};

document.querySelector(".poll").addEventListener("click", poll.registerNewAnswers.bind(poll));

const bonus= {
    answers: [5,2,3]    // [1,5,3,9,6,1]
}
const displayResultsOutside = poll.displayResults;

displayResultsOutside.call(bonus);
displayResultsOutside.call(bonus, "string");

*/



// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

/*
// Call and Book and Bind

const lufthansa = {
    airline: "Lufthansa",
    iataCode: "LH",
    bookings: [],
    
    book(flightNo, passengerName){
        console.log(`${passengerName} booked a seat on ${this.airline}, flight ${this.iataCode}${flightNo}`);
        this.bookings.push({flight: `${this.iataCode}${flightNo}`, passengerName})
    }
}

lufthansa.book(1234,"Jonas")
lufthansa.book(8784,"Jayesh");

console.log(lufthansa);

const eurowings = {
    airline: "Eurowings",
    iataCode: "EW",
    bookings: [],   
}

const book = lufthansa.book;
// it is a seperate function, so does not have this keyword
// book(23, "Sarah Williams");

// call allows you to manually set this keyword in first argument
// property names should match when using other objects
// after first all are remaining arguments of the book function
// even tho the book function is defined in lufthansa, we chnaged this keyword to eurowings
book.call(eurowings, 23, "Sarah Williams");
console.log(eurowings);
// Sarah Williams booked a seat on Eurowings, flight EW23
// {airline: 'Eurowings', iataCode: 'EW', bookings: Array(1)}

book.call(lufthansa, 239, "Mary Cooper");
console.log(lufthansa);
// Mary Cooper booked a seat on Lufthansa, flight LH239
// {airline: 'Lufthansa', iataCode: 'LH', bookings: Array(3), book: ƒ}


// if any of the property which is used in book() 
// is not present in swiss object then error
const swiss = {
    airline: "Swiss Air Lines",
    iataCode: "LX",
    bookings: [],   
}

book.call(swiss, 22, "Swiss Cheese");
console.log(swiss);
// Swiss Cheese booked a seat on Swiss Air Lines, flight LX22
// {airline: 'Swiss Air Lines', iataCode: 'LX', bookings: Array(1)}


// Apply method - same as call, but takes array instead of argument
const flightDataArray = [583, "Apply Cooper"];
book.apply(swiss, flightDataArray);
console.log(swiss);
// Apply Cooper booked a seat on Swiss Air Lines, flight LX583
// {airline: 'Swiss Air Lines', iataCode: 'LX', bookings: Array(2)}

// apply not used anymore as can achive the same with call
book.call(swiss, ...flightDataArray);
console.log(swiss);
// Apply Cooper booked a seat on Swiss Air Lines, flight LX583
// {airline: 'Swiss Air Lines', iataCode: 'LX', bookings: Array(3)}


// Bind method

// will bind the function with the object and return a function
// so you will get the this keyword of that object
const bookEW = book.bind(eurowings);
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(22,"Bind Booking");
console.log(eurowings);
// Bind Booking booked a seat on Eurowings, flight EW22
// {airline: 'Eurowings', iataCode: 'EW', bookings: Array(2)}

// binding with preset values
const bookEW23 = book.bind(eurowings, 23);
bookEW23("Flight Number preset");       // Flight Number preset booked a seat on Eurowings, flight EW23
// because flightNo is preset, here it took 10 as name and ignored the other parameter.
bookEW23(10, "Flight Number preset");   // 10 booked a seat on Eurowings, flight EW23


// with event listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function(){
    this.planes++;
    console.log(this.planes);
}

// using bind as it returns a function and this keyword as per the object passed
document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane.bind(lufthansa));


// Partial Application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

// to preset the rate value. It should always be the first parameter after this
// cannot skip the first paramter
// passing null as we dont want to use the this keyword
const addVAT = addTax.bind(null, 0.23);
console.log(addVAT(100));

console.log("___________________");

const returnVAT = (VAT) => (ammount) =>  ammount + ammount * VAT;

const fixedVATReturn = returnVAT(0.10);
console.log(fixedVATReturn(100));
console.log(fixedVATReturn(200));


*/


// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------

/*
// function returning another function
// important during functional programming
const greet = function(greeting){
    return function(name) {
        console.log(`${greeting} ${name}`);
    }
}
// greeterHey will receive the return function
const greeterHey = greet("Hey");
// You get Hey due to closure
// calling the received function
greeterHey("Jayesh");       // Hey Jayesh
greeterHey("Jonas");        // Hey Jonas
// as greet returns a fuction, we can call it instantly
greet("Hello")("Jayesh");   // Hello Jayesh

// returning function using arrow functions 
const arrowGreet = (greeting) => (nameToGreet) => console.log(`${greeting} ${nameToGreet}`);


const greeterHeyArrow = arrowGreet("Arrow Hey");
// You get Hey due to closure
// calling the received function
greeterHeyArrow("Jayesh");       // Hey Jayesh
greeterHeyArrow("Jonas");        // Hey Jonas
// as greet returns a fuction, we can call it instantly
arrowGreet("Arrow Hello")("Jayesh");   // Hello Jayesh

*/


// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------


/*

// High order functions

const oneWord = function(str){
    return str.replace(/ /g, "").toLowerCase();
}

const upperFirstWord = function(str){
    const [first, ...other] = str.split(" ");
    return [first.toUpperCase(), ...other].join(" ");
}
// higher order function
const transformer = function(str, fn){
    console.log(`OG string: ${str}`);               
    console.log(`transformed string: ${fn(str)}`);  

    // function method(property) .name
    console.log(`Transformed by: ${fn.name}`);      
}

// higher order function, which takes function as parameter
transformer("JavaScript is the best!", upperFirstWord);
// OG string: JavaScript is the best!
// transformed string: JAVASCRIPT is the best!
// Transformed by: upperFirstWord

transformer("Second JavaScript is the best", oneWord);
// OG string: Second JavaScript is the best
// transformed string: secondjavascriptisthebest
// Transformed by: oneWord


const high5 = function(){
    console.log("✋");
}
// anywhere you click on body, the function would be called
document.body.addEventListener("click", high5);

// wil call high5 for each element of array
["1",2 ,3].forEach(high5);              // (3) ✋

*/


// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------


/*
const booking = [];

const flight = "LH234";
const jonas = {
    name: "Jonas",
    passport: 88744584
}

const checkIn = function(flightNum, passenger){
    flightNum = "LH999",
    passenger.name = "Mr. " + passenger.name;

    if(passenger.passport === 88744584){
        alert("Check-in");
    } else {
        alert("Wrong passport");
    }
}

checkIn(flight, jonas);
console.log(flight);
console.log(jonas);
*/

// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------



// Default parameters
/*

// using already defined parameter to calculate another parameter
const createBooking = function(flightNo, numPassenger = 1, price = 100 * numPassenger) {

    const book = {
        flightNo,
        numPassenger,
        price
    }

    console.log(book);
    booking.push(book);
}

createBooking("LH123",2,800);               // {flightNo: 'LH123', numPassenger: 2, price: 800}
createBooking("LH123", 4);                  // {flightNo: 'LH123', numPassenger: 4, price: 400}
// to skip one paramter, if it has default value it will take that
createBooking("LH123", undefined, 4);       // {flightNo: 'LH123', numPassenger: 1, price: 100}

*/

