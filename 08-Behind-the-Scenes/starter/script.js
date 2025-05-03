'use strict';

/*
function calcAge(birthYear){
    const age = 2037 - birthYear;
    console.log(firstName);

    function printAge(){
        const output = `You are the ${age} born in ${birthYear}`;
        console.log(output);


        if(birthYear >=1981 && birthYear <= 1996){
            var millenial = true;

            const str = "Oh, you are a millenial " + firstName;
            console.log(str);

            function add(a,b){
                return a+b;
            }
        }
        console.log(add(2,2));
        console.log(millenial);

    }

    printAge();
    return age;
}

const firstName = "Jonas";

// reference error
// const firstName = calcAge(1991);

check();

var check = function(){
    console.log("function check");
}

var arrow = () => "arrow check";
console.log(arrow());

*/

/*
// variable hoisting
// console.log(me);
// console.log(job);
// console.log(year);

var me = "Jonas";
let job = "teacher";
const year = 1991;

// function hoisting

console.log(addDec(2,2));
// console.log(addExp(2,2));
// console.log(addArrow(2,2));


function addDec(a,b){
    return a + b;
}
const addExp = function(a,b){
    return a + b;
};
const addArrow = (a,b) => a + b;

// example
if(!productCount){      // as var so it is undefined(falsy value)
    deleteShoppingCart();
}

var productCount = 10;

function deleteShoppingCart(){
    console.log("Deleted everything");
}
*/

/*
// window
console.log(this);

const calcAge = function(birthYear){
    console.log(2037 - birthYear);
    // undefined in strict mode, else window
    console.log(this);      
}
calcAge(1991);

const calcAgeArrow = (birthYear) => {
    console.log(2037 - birthYear);
    // window. as arrow function does not get its own this keyword
    console.log(this);      
}
calcAgeArrow(1991);
*/


/*
// object literal is not a scope
const jonas = {
    firstName : "Jonas",
    year : 1991,

    calcAge: function(){
        console.log(2037 - this.year);
        
        // sol 1. passing this to generic function
        // as it will have its own this keyword, not of object like calcAge()
        
        // const self = this;
        // const isMillenial = function(){
        //     // console.log(this.year >= 1981 && this.year <= 1996);
        //     console.log(self.year >= 1981 && self.year <= 1996);
        // }
        // isMillenial();

        // arrow function uses this of parent scope (calcAge())
        const isMillenial = () => {
            console.log(this.year >= 1981 && this.year <= 1996);
        }
        isMillenial();
    },
    // error as parent here is window
    greet: () => console.log(`Hey ${this.firstName}`)

}
jonas.greet();
jonas.calcAge();

const addExp = function(a,b){
    // all passed parameteres even if more than defined/declared
    console.log(arguments);     // []
    console.log(arguments[3]);
    return a + b;
};
const addArrow = (a,b) => {
    console.log(arguments);     // error
    return a + b;
}
console.log(addExp(1,2,3,4));
console.log(addArrow(1,2,3,4));
*/


const jessica = {
    firstName : "Jessica",
    lastName : "Williams",
    age : 27
};

function marryPerson(originalPerson, newLastName){
    originalPerson.lastName = newLastName;
    return originalPerson;
}
const marriedJessica = marryPerson(jessica,"Davis");
// const marriedJessica = jessica;
// marriedJessica.lastName = "Davis";

// console.log("Solo Jessica, ", jessica);
// console.log("Married Jessica, ", marriedJessica);

const jessica2 = {
    firstName : "Jessica",
    lastName : "Williams",
    age : 27,
    family : ["Alice", "Bob"]
};

// ... spread operation, returns all the properties of obj
// called shallow copy as 1st level is copied
const jessica2Copy = {...jessica2}      // new reference created
jessica2Copy.lastName = "Davis";        // changed only for 1 as different ref

// chnages both array as in family reference of family array got copied
jessica2Copy.family.push("Mary");
jessica2Copy.family.push("John");

// will copy 1st level and all the nested objects too (instead of reference)
// deep copy
const jessicaClone = structuredClone(jessica2);
jessicaClone.family.push("Mary");       // added only in clone as reference was not copied
jessicaClone.family.push("John");

console.log("Solo Jessica, ", jessica2);
console.log("Married Jessica, ", jessica2Copy);
console.log("Clone Jessica, ", jessicaClone);

