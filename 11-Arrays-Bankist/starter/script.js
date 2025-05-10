'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  type: "premium",
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "standard",
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "premium",
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "basic",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements, sort = false){


  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a,b) => a -b ) : movements;

  movs.forEach( function(val, i){

    const type = val > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">
            ${i + 1} ${type}
          </div>
          <div class="movements__value">${val} 💶</div>
        </div>`

    containerMovements.insertAdjacentHTML("afterbegin",html);

  });

  
}

// displayMovements(account1.movements);


const createUsernames = function(accs){
  // we change the og object as reference value is passed
  accs.forEach( function(acc){
    acc.username = acc.owner
                  .toLowerCase()
                  .split(" ")
                  .map( (val) => val[0])  // will return array of first element of every word
                  .join("");      // will join the returned array

  });
}
createUsernames(accounts)
// console.log(accounts);

const calcDisplayBalance = function(account){

  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance} 💶`;
}
// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function(account){
  const incomes = account.movements.filter((val) => val > 0)
                            .reduce((acc, val) => acc + val, 0);
  
  labelSumIn.textContent = `${incomes} 💶`;

  const out = account.movements.filter((val) => val < 0)
                        .map((val) => Math.abs(val))
                        .reduce((acc, val) => acc + val , 0)
  labelSumOut.textContent = `${out} 💶`;

  const interest = account.movements.filter((val) => val > 0)
                            .map((deposit) => deposit * account.interestRate/100)
                            .filter((interest) => interest >= 1)
                            .reduce((acc, interest) => acc + interest , 0)
  labelSumInterest.textContent = `${interest} 💶`;
}
// calcDisplaySummary(account1.movements)


function logout(){
  labelWelcome.textContent = "Log in to get started"
  containerApp.style.opacity = 0;
  inputLoginPin.blur();
  inputLoginUsername.blur();
}

function updateUI(account){
  // display users data according to the login
  displayMovements(account.movements);
    
  calcDisplayBalance(account);

  calcDisplaySummary(account);
}

// event handler
let currentAccount;


btnLogin.addEventListener("click", function(e){
  // prefent form from submitting
  e.preventDefault();

  currentAccount = accounts.find((acc) => acc.username === inputLoginUsername.value);
  
  if(!currentAccount || (!inputLoginPin.value || !inputLoginUsername.value) ){
    logout();
  }
  if(currentAccount?.pin === Number(inputLoginPin.value) ){
    
    // change welcome label
    labelWelcome.textContent = `Welcome back ${currentAccount.owner.split(" ")[0]},`;

    // remove opacity as logged in
    containerApp.style.opacity = 100;

    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    // removing cursor from field
    inputLoginPin.blur();

    updateUI(currentAccount);

  } else {
    logout();
  }

});

btnTransfer.addEventListener("click", function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find((account) => account.username === inputTransferTo.value);

  if(amount > 0 && currentAccount.balance >= amount 
      && receiverAccount
      && receiverAccount?.username !== currentAccount.username){
    
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    updateUI(currentAccount);
    
  }

  inputTransferAmount.value = inputTransferTo.value ="";
  inputTransferAmount.blur();
  inputTransferTo.blur();
})

btnLoan.addEventListener("click", function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some((amt) => amt > (amount * 0.1))){
    // add movement
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
    inputLoanAmount.value = "";
  }

});

btnClose.addEventListener("click", function(e){
  e.preventDefault();

  const closeAccount = accounts.find((account) => account.username === inputCloseUsername.value);
  const closingPin = inputClosePin.value;

  inputClosePin.value = inputCloseUsername.value = "";
  inputClosePin.blur();
  inputCloseUsername.blur();

  if(closeAccount && closeAccount.pin === +closingPin
    && closeAccount.username === currentAccount.username
  ){
    
    const index = accounts.findIndex( function(acc){
      return acc.username === currentAccount.username;
    });
    accounts.splice(index, 1);
    logout();
  }


});

let sorted = false;
btnSort.addEventListener("click", function(e){

  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;

});


// [{…}, {…}, {…}, {…}]
// 0:{owner: 'Jonas Schmedtmann', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}
// 1:{owner: 'Jessica Davis', movements: Array(8), interestRate: 1.5, pin: 2222, username: 'jd'}
// 2:{owner: 'Steven Thomas Williams', movements: Array(8), interestRate: 0.7, pin: 3333, username: 'stw'}
// 3:{owner: 'Sarah Smith', movements: Array(5), interestRate: 1, pin: 4444, username: 'ss'}





/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*
// slice
let arr = ['a', 'b', 'c', 'd', 'e'];

console.log(arr.slice(2));      // ['c', 'd', 'e']
console.log(arr.slice(2,4));    // ['c', 'd'] 2-4(without including 4)
console.log(arr.slice(-1));     // ['e'] last element
console.log(arr.slice(-2));     // ['d', 'e'] last two elements
//  ['b', 'c', 'd'] from 1-last elemenet(excluded)
console.log(arr.slice(1,-1));
//  ['a', 'b', 'c'] from 0-second last elemenet(excluded)
console.log(arr.slice(0, -2));
// creates a shallow copy
console.log(arr.slice());       // ['a', 'b', 'c', 'd', 'e']

*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// splice, same as slice but changes the original array
// it takes element from original array, so they dont exist anymore there
// is used when you want to remove element from array
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.splice(2));      // ['c', 'd', 'e']
console.log(arr);                // ['a', 'b']

let arr2 = ['a', 'b', 'c', 'd', 'e'];
arr2.splice(-1);            // deletes last element
console.log(arr2);          //  ['a', 'b', 'c', 'd'] 

// first parameter is the start element
// second one is nuumber of elements we want ot delete
arr2.splice(1,2)            // will delete 2 from index 1
console.log(arr2);          // ['a', 'd']

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

let arr = ['a', 'b', 'c', 'd', 'e'];
let arr2 = ["j", "i", "h", "g", "f"]

// reverse - reverses an array and mutates the OG does not return new arry
console.log(arr2.reverse());       // ['f', 'g', 'h', 'i', 'j']
console.log(arr2);                 // ['f', 'g', 'h', 'i', 'j']

// concat - joins two array, does not mutate any. returns new
const letters = arr.concat(arr2);
console.log(letters);             // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
// can also do this
console.log([...arr, ...arr2]);   // ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

// joins with - and returns a string
console.log(letters.join(" - "));
// a - b - c - d - e - f - g - h - i - j

*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// at method
const arr = [23, 11, 64];

// can use at instead
console.log(arr[0]);                  // 23
console.log(arr.at(0));               // 23

// to get the last element
console.log(arr[arr.length - 1]);     // 64
console.log(arr.slice(-1)[0]);        // 64
// using at
console.log(arr.at(-1));              // 64
// aslo works on strings
console.log("Jayesh".at(0));          // J
console.log("Jayesh".at(-1));         // h

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////


// forEach on array

/*

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// forEach paaseds three values to function
// 1 - current value , 2 - index, 2 - araay we are loopig
movements.forEach( function(movement, index, array){
  if(movement > 0){
    console.log(`${index + 1}: You deposited: ${movement}`);
  } else {
    console.log(`${index + 1}: You withdrew: ${Math.abs(movement)}`);
  }
  console.log(array);
})
// 1: You deposited: 200
// [200, 450, -400, 3000, -650, -130, 70, 1300]
// .....
// 8: You deposited: 1300
// [200, 450, -400, 3000, -650, -130, 70, 1300]

// requires a callback function
// will call the functions(which we pass) in every interation
// will pass value of each iteration
const fun = function(val, index){
  console.log(val, index);          // 200 0, 450 1, .... 1300 7
}
movements.forEach(fun);

// can also do
movements.forEach( function(val, index){
  console.log(val, index);          // 200 0, 450 1, .... 1300 7
});
// or arrow function
movements.forEach((val, index) => {
  console.log(val, index);          // 200 0, 450 1, .... 1300 7
})

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// ForEach on maps and sets

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// foeach on maps
// 1 - current value , 2 - current key , 2 - whole map
currencies.forEach( function(value, key, map){
  console.log(`${key}: ${value}`);
});
// USD: United States dollar
// EUR: Euro
// GBP: Pound sterling


// foreach on sets
// sets dont have index or keys

const currenciesUnique = new Set(["USD", "GBP", "USD", "EUR", "EUR"]);
// 1 - current value , 2 - current key , 2 - whole set
// in foreach to keep syntax same, value is passed at both places
currenciesUnique.forEach( function(value, key, set){
  console.log(`${key}: ${value}`);
});
// USD: USD
// GBP: GBP
// EUR: EUR

*/


/*


/////////////////////////////////////////////////
/////////////////////////////////////////////////


// challenge 1

const checkDogs = function(dogsJulia, dogsKate){

  // const correctDogsJuila = dogsJulia.slice(1, -2);
  // const allDogs = [...correctDogsJuila, ...dogsKate];

  const correctDogsJuila = dogsJulia.slice();     // shallow copy
  correctDogsJuila.splice(0);
  correctDogsJuila.splice(-2);

  const allDogs = correctDogsJuila.concat(dogsKate);
  
  allDogs.forEach( function(dog, i) {
    const type = (dog < 3) ? "still a puppy" : `is an adult, and is ${dog} years old`; 
    console.log(`Dog number ${i + 1}: is a ${type}`);
  });
}
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*
// Maps - takes a callback function
// returns new array with new elements
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const euToUsd = 1.1;

const movementsUsd = movements.map( function(mov){
  return mov * euToUsd;  // actual code for conversion
});
// arrow function example
const movementsUsdArrow = movements.map( (mov) => mov * euToUsd);
console.log(movements);         // [200, 450, -400, 3000, -650, -130, 70, 1300]
console.log(movementsUsd);      // [22, 22, 22, 22, 22, 22, 22, 22]
console.log(movementsUsdArrow); // [220.00000000000003, 495.00000000000006... 1430.0000000000002]

// maps with index and entire array
// method in short
const movementDescription = movements.map( (mov, i, arr) => 
  `${i + 1}: You ${(mov > 0) ? " deposited" : "withdrew"}: ${(mov > 0) ? mov : Math.abs(mov)}`);

console.log(movementDescription);
// index 0 - 7. string has i+1
//  ['1: You deposited: 200', '2: You deposited: 450', '3: You withdrew: 400',
// '4: You deposited: 3000','5: You withdrew: 650', '6: You withdrew: 130',
//  '7: You deposited: 70', '8: You deposited: 1300']

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////



/*

//  filter method
// creates an array which satisfies a specific condition
// using callback function
// can access currentElement, index and wholeArray
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const deposits = movements.filter( function(val) {
  return val > 0;     // will return only thosw values which are > 0
}); 

const withdrawalsArrow = movements.filter( val => val < 0 );
console.log(deposits);           // [200, 450, 3000, 70, 1300]
console.log(withdrawalsArrow);   // [-400, -650, -130]
*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// reduce - reduce all elements of an array in one element
// first paramter is the callback function
// 1 - accumulator (value is maintained accross the whole loop)
// 2 - currentValue, 3 - index, 4 - wholeArray
// second parameter is accumulator start value
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const balance = movements.reduce( function(acc, val, i, arr) {
  return acc + val;     // this becomes new acc, in end it is stored in variable
}, 0);                  // initail value of acc, in first loop

const balanceArrow = movements.reduce( (acc, val) => acc + val, 0)
console.log(balance);         // 3840
console.log(balanceArrow);    // 3840

// Maximum value 
const maxVal = movements.reduce(function(acc, curVal) {
  if(curVal >= acc) return curVal
  else return acc;
}, movements[0]);
console.log(maxVal);        // 3000

const maxValArrow = movements.reduce((acc, val) => val >= acc ? val : acc, movements[0]);
console.log(maxValArrow);   // 3000

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////



/* 
// challenge 2


const outsideFunction = function(acc, val, i, array){

  if(i == array.length -1) return (acc + val) / array.length;
  else if( i == 0 ) return val;
  else return acc + val;
}

const calcAverageHumanAge = function(dogArray){

  const result = dogArray.map((val) => (val <=2) ? 2 * val : 16 + val * 4)
  .filter((val) => val >= 18)
  .reduce((acc, val, i, array) => acc + val / array.length, 0)
  return result;
  // return result.reduce(outsideFunction, result[0]);
}

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(avg1, avg2);

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*

// Chainig
// we can chain as much as we want until it returns an array
// reduce cannot be chained
// when chaining the arr value in paramter is the result of previous operation
// not the original array, so every chain will get a different array (conditionally)
const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const totalDepositsInUsd = movements.filter((val) => val > 0)
                                    .map((val) => val * euroToUsd)
                                    .reduce((acc, val) => acc + val, 0);

console.log(totalDepositsInUsd);

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*
// Challenge 3

const arr = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = arr.map((val) => (val <=2) ? 2* val : 16 + val * 4)
                                .filter((val) => val > 18)
                                .reduce((acc, val, _, array) => acc + val / array.length, 0);
console.log(calcAverageHumanAge);
*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// find method
// will return the first element in array when condition is satisfied
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find( mov => mov < 0);
const firstDeposit = movements.find( mov => mov > 0);
console.log(firstWithdrawal);   // -400
console.log(firstDeposit);      // 200

// accounts here is an object of array of bank customers
const account = accounts.find((account) => account.owner === "Jessica Davis");
console.log(account);
// {owner: 'Jessica Davis', movements: Array(8), interestRate: 1.2, pin: 1111, username: 'js'}

for(const acc of accounts){
  if(acc.owner === "Jessica Davis") console.log(acc);
}
*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*
// findIndex, findLast, findLastIndex

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// finds the last element which satisfies that condition
const lastWithdrawal = movements.findLast((val) => val < 0);
console.log(lastWithdrawal);      // -130

const ffindIndex = movements.findIndex((val) => val == -400);
console.log(ffindIndex);          // 2

const latestLargeMovementIndex = movements.findLastIndex((val) => val > 2000);
console.log(`Your last large withdrawal was ${movements.length - (latestLargeMovementIndex + 1)} 
movements ago`);

*/

/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// some 
// to check if array contains any element tha satisfies the condition
// false if no lement satisfies the condition, else true
// takes callback function
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.some((val) => val > 2000));      // true
console.log(movements.some((val) => val > 5000));      // false


// every
// true if all elements satisfies the condition
// takes callback function
console.log(movements.every((val) => val > 0));       // false
const positiveAccount = [200, 450, 70, 1300];
console.log(positiveAccount.every((val) => val > 0)); // true

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*

// flat()
// removes nestinga and flattens the array, to one level of nesting only
// returns and array
const arr = [[1,2,3], [4,5,6], 7 ,8 ];
console.log(arr.flat());    // [1, 2, 3, 4, 5, 6, 7, 8]

// flat takes a paarmeter which is the level of deepening
// by default the value for that is 1
const arrDeep = [[1,2,3], [[4,5],6], 7 ,8 , [ [ [ [9], 10] , 11, 12] ] ,13,14 ];

// [1, 2, 3, Array(2), 6, 7, 8, Array(3), 13, 14]
console.log(arrDeep.flat());
// [1, 2, 3, 4, 5, 6, 7, 8, Array(2), 11, 12, 13, 14]
console.log(arrDeep.flat(2));
// [1, 2, 3, 4, 5, 6, 7, 8, Array(1), 10, 11, 12, 13, 14]
console.log(arrDeep.flat(3));
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
console.log(arrDeep.flat(4));    




const accountMovements = accounts.map((acc) => acc.movements);
const allMovements = accountMovements.flat(1);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);      // 17840

const overallChaining = accounts.map( (acc) => acc.movements)
                        .flat()
                        .reduce( (acc, val) => acc + val, 0);
console.log(overallChaining);     // 17840

// flatMap()
// will map and then do flat() - only 1 level deep cannot change

const overallFlatMap = accounts.flatMap( (acc) => acc.movements)
                        .reduce( (acc, val) => acc + val, 0);
console.log(overallFlatMap);    // 17840

*/



/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*
// challenge 4
const breeds = [
  {
    breed: 'German Shepherd',
    averageWeight: 32,
    activities: ['fetch', 'swimming'],
  },
  {
    breed: 'Dalmatian',
    averageWeight: 24,
    activities: ['running', 'fetch', 'agility'],
  },
  {
    breed: 'Labrador',
    averageWeight: 28,
    activities: ['swimming', 'fetch'],
  },
  {
    breed: 'Beagle',
    averageWeight: 12,
    activities: ['digging', 'fetch'],
  },
  {
    breed: 'Husky',
    averageWeight: 26,
    activities: ['running', 'agility', 'swimming'],
  },
  {
    breed: 'Bulldog',
    averageWeight: 36,
    activities: ['sleeping'],
  },
  {
    breed: 'Poodle',
    averageWeight: 18,
    activities: ['agility', 'fetch'],
  },
];

const huskyWeight = breeds.find((breed) => breed.breed === "Husky").averageWeight;
console.log(huskyWeight);

const dogBothActivities = breeds.find((dog) => dog.activities.includes("running") && dog.activities.includes("fetch")).breed;
console.log(dogBothActivities);

const allActivities = breeds.flatMap((dogBreed) => dogBreed.activities);
console.log(allActivities);

const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

const swimmingAdjacent = breeds.filter((dog) => dog.activities.includes("swimming"))
                                .flatMap((dog) => dog.activities)
                                .filter((activity) => activity !== "swimming");
console.log([...new Set(swimmingAdjacent)]);

console.log(breeds.every((dog) => dog.averageWeight >= 10));

console.log(breeds.some((dog) => dog.activities.length >= 3));

const averageHeavy = breeds.filter((dog) => dog.activities.includes("fetch"))
                      .reduce((acc, dog) => dog.averageWeight > acc.averageWeight ? dog : acc, breeds[0])
console.log(averageHeavy);

*/



/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*

// sort - sorts the elements alphabetically by default
// mutates the original array, instead of returning new
const owners = ["Jonas", "Zach", "Adam", "Martha" ];
console.log(owners.sort());     // ['Adam', 'Jonas', 'Martha', 'Zach']
console.log(owners);            // ['Adam', 'Jonas', 'Martha', 'Zach']

// does sorting based on strings, converts everything to strings and then sorts
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
console.log(movements.sort());  // [-130, -400, -650, 1300, 200, 3000, 450, 70]
console.log(movements);         // [-130, -400, -650, 1300, 200, 3000, 450, 70]

// takes a callback function
// a,b are two consecutive numbers in array
// return < 0, a,b  - order stays same
// return > 0, b,a  - order switches
// ascending
movements.sort((a,b) => {
  if(a > b) 
    return 1
  if(b > a)
    return -1;
});
console.log(movements);   // [-650, -400, -130, 70, 200, 450, 1300, 3000]

// descending
movements.sort((a,b) => {
  if(a < b) return 1;
  if(b < a) return -1; 
})
console.log(movements);   //  [3000, 1300, 450, 200, 70, -130, -400, -650]

// a-b is +ve if a is greater
// a-b is -ve if a is smaller
movements.sort((a,b) => a - b);
console.log(movements);   // [-650, -400, -130, 70, 200, 450, 1300, 3000]

movements.sort((a,b) => b - a);
console.log(movements);   //  [3000, 1300, 450, 200, 70, -130, -400, -650]

*/



/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*

// Array grouping
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// will return an object with group as property
// 1 - arry, 2 - callback function
const groupingMovements = Object.groupBy(movements, function(movements){
  if(movements > 0) {
    return "Deposit";
  } else {
    return "Withdrawal";
  }
});

const groupArrow = Object.groupBy(movements, (mov) => mov > 0 ? "Deposit" : "Withdrawal");

console.log(groupingMovements);
console.log(groupArrow);
// {Deposit: Array(5), Withdrawal: Array(3)}
// Deposit:(5) [200, 450, 3000, 70, 1300]
// Withdrawal:(3) [-400, -650, -130]

const groupedByActivity = Object.groupBy(accounts, (acc) => {
  const movementCount = acc.movements.length;

  if(movementCount >= 8 ) return "very active";
  if(movementCount >= 4 ) return "active";
  if(movementCount >= 1 ) return "moderate";
  return "inactive"
})
console.log(groupedByActivity);
// {very active: Array(3), active: Array(1)}
//  active:[{…}]
// very active:(3) [{…}, {…}, {…}]

// grouping by object property. group value is same as property value
const groupedAccounts = Object.groupBy(accounts, (acc) => acc.type);
// can be written as 
const anotherGroupedAccounts = Object.groupBy(accounts, ( {type } ) => type)

console.log(groupedAccounts);
console.log(anotherGroupedAccounts);
// {premium: Array(2), standard: Array(1), basic: Array(1)}
// basic:[{…}]
// premium:(2) [{…}, {…}]
// standard:[{…}]

*/



/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// creating arrays programatically

// whenever we pass only 1 argument it creates an empty array of that length
const x = new Array(7);
console.log(x);       //  [empty × 7]

// will fill the array with that element
// mutates the array
x.fill(1); 
console.log(x);       // [1, 1, 1, 1, 1, 1, 1]

// fills with 3, from index 2 to end 
x.fill(3, 2);
console.log(x);       // [1, 1, 3, 3, 3, 3, 3]

// fills with 3, from index 2 to 5(excluding)
x.fill(22, 2, 5)
console.log(x);       // [1, 1, 22, 22, 22, 3, 3]


/// Array.from
// takes object, which accepts length(property)
// and a callback function, we get access to currentElement, index
const y = Array.from( {length: 7}, () => 1 );
console.log(y);       // [1, 1, 1, 1, 1, 1, 1]

const z = Array.from( {length: 7}, (_, i) => i + 1 );
console.log(z);     // [1, 2, 3, 4, 5, 6, 7]

const dice100 = Array.from( {length: 100}, () => Math.trunc(Math.random() * 6) + 1 );
console.log(dice100);


labelBalance.addEventListener("click", function(){

  // map wont work directly
  // console.log(document.querySelectorAll(".movements__value").map((el) => el.textContent.replace(" 💶", "aa")));   // error

  // will work when we convert it into an array, using Array.form()
  // ['1300aa', '70aa', '-130aa', '-650aa', '3000aa', '-400aa', '450aa', '200aa']
  console.log(Array.from(document.querySelectorAll(".movements__value")).map((el) => el.textContent.replace(" 💶", "aa")));


  const movementsUI = Array.from(document.querySelectorAll(".movements__value"));
  // ['1300', '70', '-130', '-650', '3000', '-400', '450', '200']
  console.log(movementsUI.map((el) => el.textContent.replace(" 💶", ""))); 
  
  //  [div.movements__value, div.movements__value,..., div.movements__value, div.movements__value]
  console.log(movementsUI);
  
  // gies new array
  const movementsUI2 = [...document.querySelectorAll(".movements__value")];

});

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// Non-destructive Alternatives
// toReversed, toSorted(), toSplices()

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// toReversed - same as reverse, will not mutate the original array
const reverseCopy = movements.toReversed();
console.log(reverseCopy);   // [1300, 70, -130, -650, 3000, -400, 450, 200]
console.log(movements);     // [200, 450, -400, 3000, -650, -130, 70, 1300]

// toSorted() - same as sort, will not mutate the original array
const sortCopy = movements.toSorted((a,b) => a -b);
console.log(sortCopy);      // [-650, -400, -130, 70, 200, 450, 1300, 3000]
console.log(movements);     // [200, 450, -400, 3000, -650, -130, 70, 1300]

// toSpliced() - same as splice, will not mutate the original array
const spliceCopy = movements.toSpliced(2,5);
console.log(spliceCopy);     // [200, 450, 1300]
console.log(movements);     // [200, 450, -400, 3000, -650, -130, 70, 1300]

// to change a element in array without mutating original
// other elements remain the same
const newMovements = movements.with(1, 2000);
console.log(newMovements);    // [200, 2000, -400, 3000, -650, -130, 70, 1300]
console.log(movements);       // [200, 450, -400, 3000, -650, -130, 70, 1300]


*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////


/* 

// practise array

const backDepositSum = accounts.flatMap((acc) => acc.movements)
                                .filter((val) => val > 0)
                                .reduce((acc, val) => acc + val, 0);
console.log(backDepositSum);

// const numDeposits1000 = accounts.flatMap((acc) => acc.movements)
//                                 .filter((val) => val >= 1000)
//                                 .length;

// cannot us acc++ as it increments and return a current value
// incremented value is returned in next line, can use ++acc tho
const numDeposits1000 = accounts.flatMap((acc) => acc.movements)
                                .reduce((acc, val) => val >= 1000 ? acc + 1 : acc ,0)
console.log(numDeposits1000);


const {deposit, withdrawal} = accounts.flatMap((acc) => acc.movements)
                      .reduce((sum, curVal) => {
                        // curVal > 0 ? sum.deposit += curVal : sum.withdrawal += curVal;
                        sum[curVal > 0 ? "deposit" : "withdrawal"] += curVal;
                        return sum;
                      }, { deposit: 0, withdrawal: 0});
console.log(deposit, withdrawal);     // 25180 -7340


const convertTitleCase = function(title){

  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ["a", "an", "the", "but","and", "or", "on", "in", "with"];

  const titleCase = title.toLowerCase()
                        .split(" ")
                        .map((word) => exceptions.includes(word) ? word : capitalize(word))
                        .join(" ")
  return capitalize(titleCase);
}

console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('this is a LONG title but and not too long'));
console.log(convertTitleCase('and here is another title with an EXAMPLE'));

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*

// challenge 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach((dog) => {
  // dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);
  return dog.recFood = Math.trunc(dog.weight ** 0.75 * 28);

})
console.log(dogs);

const sarahcurrent = dogs.filter((dog) => dog.owners.includes("Sarah"))
                          .map((dog) => dog.curFood > dog.recFood ? "more" : "less")
                          .join();
console.log(sarahcurrent);

const eatsTooMuch = dogs.filter((dog) => dog.curFood > dog.recFood)
                          .flatMap(dog => dog.owners);

const eatsTooLess = dogs.filter((dog) => dog.curFood < dog.recFood)
                          .flatMap(dog => dog.owners);

console.log(eatsTooMuch);
console.log(eatsTooLess);

const tooMuchString = eatsTooMuch.reduce((acc, val, i, arr) => {
  if(i + 1 === arr.length) return acc + `${val}'s dogs eat too much`;
  else return acc + `${val} and `
}, "");

const tooLessString = eatsTooLess.reduce((acc, val, i, arr) => {
  if(i + 1 === arr.length) return acc + `${val}'s dogs eat too less`;
  else return acc + `${val} and `
}, "");
console.log(tooMuchString);
console.log(tooLessString);

console.log(dogs.some((dog) => dog.curFood === dog.recFood));

console.log(dogs.every((dog) => {
  return dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.10);
}));

const okayDogs = dogs.filter(function(dog){
  return dog.curFood > (dog.recFood * 0.90) && dog.curFood < (dog.recFood * 1.10);
});
console.log(okayDogs);

const dogsObject = Object.groupBy(dogs, function(dogs){
  if(dogs.curFood === dogs.recFood) return "exact";
  else if (dogs.curFood > dogs.recFood) return "too-much";
  else return "too-little";
});
console.log(dogsObject);

const dogsumberObject = Object.groupBy(dogs, function(dogs){
  return dogs.owners.length;
});
console.log(dogsumberObject);

console.log(dogs.toSorted((a,b) => a.recFood - b.recFood));

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

