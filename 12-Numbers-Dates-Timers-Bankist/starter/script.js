'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2025-03-01T21:31:17.178Z',
    '2025-02-28T07:42:02.383Z',
    '2025-03-02T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2025-02-25T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions


const formatDate = function(dateVar, locale){
    const calcDaysPassed = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

    const daysPassed = calcDaysPassed(new Date(), new Date(dateVar));

    if(daysPassed === 0) return "Today";
    if(daysPassed === 1) return "Yesterday";
    if(daysPassed <= 7) return `${daysPassed} days ago`;



    // const date = new Date(dateVar);
    // const day = `${date.getDate()}`.padStart(2,0);
    // const month = `${date.getMonth() + 1}`.padStart(2,0);
    // const year = date.getFullYear();
    // return `${day}/${month}/${year}`;

    return new Intl.DateTimeFormat(locale).format(new Date(dateVar));

}

const formatCurr = function(mov, locale, curr){
  return new Intl.NumberFormat(mov, {style: "currency", currency: curr }).format(new Date(mov))
}

const displayMovements = function (account, sort = false) {
  
  containerMovements.innerHTML = '';
  const combineMovementsDates = account.movements.map((mov, i) => ({ movement: mov, movementDate: account.movementsDates.at(i) }) );

  // const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;
  if(sort) combineMovementsDates.sort((a,b) => a.movement - b.movement);

  combineMovementsDates.forEach(function (obj, i) {
    const { movement, movementDate} = obj;
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    const displayDate = formatDate(movementDate, account.locale);
    const formattedMovement = formatCurr(movement, account.locale, account.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${formatCurr(acc.balance, acc.locale, acc.currency)}`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${formatCurr(incomes, acc.locale, acc.currency)}`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${formatCurr(Math.abs(out), acc.locale, acc.currency)}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${formatCurr(interest, acc.locale, acc.currency)}`;;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogoutTimer = function(){
  // to call function instantly and then after intervals
  const tick = () => {
    // has access to time, due to closure
    const min = `${Math.trunc(time / 60)}`.padStart(2,0);
    const sec =  `${time % 60}`.padStart(2, 0);

    labelTimer.textContent = `${(min)}: ${sec}` ;
    // ended setInterval after a condition using varible
    if(time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = "Login to get started";
      containerApp.style.opacity = 0;
    }
    time--;
  }

  let time = 120;

  // implementation of timer 
  tick();       // instant     
  const timer = setInterval(tick, 1000);  // interva;
  return timer;
}

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// always logged in
currentAccount = account1;
updateUI(currentAccount);
containerApp.style.opacity = 100;

// const cuurentDate = new Date();
// const options = {
//   day: "numeric",
//   month: "long",    //2-Digit,numeric
//   year: "numeric",
//   hour: "numeric",
//   minute: "numeric",
//   weekday: "long"
// }

// // will take language from browser
// const locale = navigator.language;
// console.log(locale);    //en-US

// // Internationalization, takes locale, chain with format and pass date
// labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(cuurentDate);

// // Sunday 2 March 2025 at 18:18
// console.log(new Intl.DateTimeFormat("en-GB", options).format(cuurentDate)); 
// // Sunday, March 2, 2025 at 6:18 PM
// console.log(new Intl.DateTimeFormat("en-US", options).format(cuurentDate));  
// // Sunday 2 March, 2025 at 6:18 pm
// console.log(new Intl.DateTimeFormat("en-IN", options).format(cuurentDate));
// // domingo, 2 de março de 2025 às 18:19
// console.log(new Intl.DateTimeFormat("pt-PT", options).format(cuurentDate));






btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    
    // const cuurentDate = new Date();
    // const day = `${cuurentDate.getDate()}`.padStart(2,0);
    // const month = `${cuurentDate.getMonth() + 1}`.padStart(2,0);
    // const year = cuurentDate.getFullYear();
    // const hour = `${cuurentDate.getHours()}`.padStart(2,0);
    // const min = `${cuurentDate.getMinutes()}`.padStart(2,0);

    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    const cuurentDate = new Date();
    const options = {
      day: "numeric",
      month: "numeric",    //2-Digit,numeric
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      // weekday: "long"
    }

    // will take language from browser
    // const locale = navigator.language;

    // Internationalization, takes locale, chain with format and pass date
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, options).format(cuurentDate);

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    if(timer) clearInterval(timer); // clearing timer if exists
    timer = startLogoutTimer();     // function starts & returns curr timer

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // add dates
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    clearInterval(timer);       // global variable
    timer = startLogoutTimer(); // function returns curr timer
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function(){
      // Add movement
      currentAccount.movements.push(amount);
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // resetting timer
      clearInterval(timer);       // global variable
      timer = startLogoutTimer(); // function starts & returnscurr timer
      
    }, 2500);

  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*

// umber functions

// js not very useful for calculations
// represents number as binary, so it is difficlt with franctions
// behind the scens does round it, but still has flaws
console.log(0.1 + 0.2);           // 0.30000000000000004
console.log(0.1 + 0.2 == 0.3);    // false

// string to number
console.log(Number("777"));       // 777  (Number)
console.log(+"777");              // 777  (Number)

// parsing - strings should start with a number 
// returns only the first number
console.log(Number.parseInt("30px"));     // 30 (Number)
console.log(Number.parseInt("px30px"));   // NaN
console.log(Number.parseInt("30px15"));   // 30 (Number)

console.log(Number.parseInt("  30.000051px15"));     // 30 (Number)
console.log(Number.parseFloat("30.000051px15"));   // 30.000051 (Number)
console.log(Number.parseFloat("30.00px"));         // 30 (Number)

// second parameter radix
// 10 for 0-9. 2 for 0,1
console.log(Number.parseInt("30px",10));      // 30 (Number)
console.log(Number.parseInt("30px",2));       // NaN
console.log(Number.parseInt("0111seven",2));  // 7 (Number)


// isNaN - true if value is not a number
console.log(Number.isNaN(20));          // false
console.log(Number.isNaN("20"));        // false
console.log(Number.isNaN(+"20x"));      // true
console.log(Number.isNaN(23 / 0));      // false


// better way of checking if value is a number
console.log(Number.isFinite(20));         // true
console.log(Number.isFinite("20"));       // false
console.log(Number.isFinite(+"20x"));     // false
console.log(Number.isFinite(23 / 0));     // false

// to check if value is integer
console.log(Number.isInteger(20));         // true
console.log(Number.isInteger("20"));       // false
console.log(Number.isInteger(+"20x"));     // false
console.log(Number.isInteger(23 / 0));     // false
console.log(Number.isInteger(23.0));       // true
console.log(Number.isInteger(23.01));      // false

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// Math and rounding
console.log(Math.sqrt(25));     // 5
// square root another way
console.log(25 ** (1/2));       // 5
// cubic root
console.log(8 ** (1/3));        // 2
// max returns the maximum number
console.log(Math.max(5,28,9,55,77,88,10));    // 88 (Number)
console.log(Math.max(5,28,9,55,77,"88",10));  // 88 (Number)
// min returns the miniimum number
console.log(Math.min(5,28,9,55,77,88,10));    // 5 (Number)
console.log(Math.min("5",28,9,55,77,"88",10));  // 5 (Number)
// PI
console.log(Math.PI * Number.parseFloat("10px") ** 2); // 314.1592653589793


// to get random int between a range
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(randomInt(10,20));
console.log(randomInt(0,3));


// Rounding

// trunc - removes the decimal part
console.log(Math.trunc(23.3));    // 23
console.log(Math.trunc(23.9));    // 23

// round - rounds up tp nearest integer
console.log(Math.round(23.3));    // 23
console.log(Math.round(23.9));    // 24

// ceil - rounds up to next int when value after .
console.log(Math.ceil(23,0));    // 23
console.log(Math.ceil(23.3));    // 24
console.log(Math.ceil(23.9));    // 24
console.log(Math.ceil(23.1));    // 24 

// floor - removes the decimal part
console.log(Math.floor(23.3));    // 23
console.log(Math.floor(23.9));    // 23
// floor and trunc difference
// floor behvaes differently with negative numbers
// rounds down
console.log(Math.trunc(-23.0));    // -23
console.log(Math.floor(-23.9));    // -24

console.log("+------------------------------------------------------------");


// rounding decimals

// toFixed - adds/removes recimal parts and returns string
console.log((2.7.toFixed(0)));       // 3 (String)
console.log((2.7.toFixed(4)));       // 2.7000 (String)
console.log((2.2.toFixed(0)));       // 2 (String)
console.log((2.2345.toFixed(2)));    // 2.23 (String)

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*

// Remainder operator

console.log(5 % 2);   // 1
console.log(8 % 5);   // 3

// even check
const isEven = n => n % 2 === 0;
console.log(isEven(8));     // true
console.log(isEven(514));   // true
console.log(isEven(7));     // true


labelBalance.addEventListener("click", ()=> {

  [...document.querySelectorAll(".movements__row")].forEach((val, i) =>{
    if(i % 2 === 0) val.style.backgroundColor = "gray";

    if(i % 3 === 0) val.style.backgroundColor = "blue";
  });
});

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////


/*

// Numeric separator - use only in numbers, not in strings
// JS ignores the _, good for readability
// not allowed to place (_) at end or begining or after/before decimal
// multiple (_) not allowed

// 287,460,000,000
const diameter = 287_460_000_000;
console.log(diameter);    // 287460000000

const priceCents = 345_99;  
console.log(priceCents);  // 34599

console.log(1_500);     // 1500
console.log(15_00);     // 1500

const PI = 3.141_5;
console.log(PI);  // 3.1415

console.log((Number("230_10")));    // NaN
console.log((parseFloat("230_10")));    // 230


*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// BigInt - cannot mix it with regular numbers

// JS can perform correct operations only on int of this range
console.log(2 ** 53 -1 );             // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// n at end transforms regular numbers into bigint
console.log(465465465465465465456465464n);          // 465465465465465465456465464n
// constructor doesn't work well with large int
console.log(BigInt(4654654654));   // 4654654654n

// operations 
console.log(10000n + 10000n);   // 20000n
console.log(64765465586465465n * 76554584754n);    // 4958093324371340755636520610n

// division
console.log(10n / 3n);    // 3 (cutoff the decimal part)

// cannot do
// console.log(3164646n + 10);
// console.log(Math.sqrt(4n));
// console.log(4565n / 545);
// console.log(645564 * 56n);

// can mix with numbers in comparison and concat
console.log(20n > 15);
console.log(20n == 20);
// 55476584654654 this works
console.log(55476584654654n + " this works");

*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/* 

// Dates and time

const now = new Date();
console.log(now);       
// Sun Mar 02 2025 15:34:25 GMT+0100 (Central European Standard Time)
console.log(new Date("Mar 02 2025 15:34:25"));
// Sun Mar 02 2025 15:34:25 GMT+0100 (Central European Standard Time)
console.log(new Date("December 24, 2015"));
// Thu Dec 24 2015 00:00:00 GMT+0100 (Central European Standard Time)
console.log(new Date(account1.movementsDates.at(0)));
//  Mon Nov 18 2019 22:31:17 GMT+0100 (Central European Standard Time)
console.log(new Date(2037,10,19,15,23,5));
//  Thu Nov 19 2037 15:23:05 GMT+0100 (Central European Standard Time)
console.log(new Date(2037,10,33));
// Thu Dec 03 2037 00:00:00 GMT+0100 (Central European Standard Time)
console.log(new Date(0));
// Thu Jan 01 1970 01:00:00 GMT+0100 (Central European Standard Time)

// 3 - days, 24 - hrs in a day, 60 - minutes in an hour, 60 secs in min, 1000 miliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000));
// Sun Jan 04 1970 01:00:00 GMT+0100 (Central European Standard Time)


const future = new Date(2037,10,19,15,23);
console.log(future);  // Thu Nov 19 2037 15:23:00 GMT+0100 (Central European Standard Time)
console.log(future.getFullYear());  // 2037
console.log(future.getMonth());     // 10 (0 based index)
console.log(future.getDate());      // it is day
console.log(future.getDay());       // day of week (sun[0]-sat[6])
console.log(future.getHours());     // 15
console.log(future.getMinutes());   // 23
console.log(future.getSeconds());   // 0
console.log(future.toISOString());  // 2037-11-19T14:23:00.000Z
// time passed since Jan 1, 1970
console.log(future.getTime());      // 2142253380000
console.log(new Date(2142253380000));   // timestamp to date
// Thu Nov 19 2037 15:23:00 GMT+0100 (Central European Standard Time)
// timestamp of now
console.log(Date.now());          // 1740926854167


// sett
future.setFullYear(2040);
console.log(future.toISOString());  // 2040-11-19T14:23:00.000Z
console.log(future.setMonth(4));    // sets months to may, returns timestamp
console.log(future.setDate(4));     // sets day to 4, returns timestamp
console.log(future.setHours(22));   // sets Hours to 22, returns timestamp
// similarly have other functions as well


*/


/////////////////////////////////////////////////
/////////////////////////////////////////////////

/*

// date operations
// using timestamp - milliseconds

const future = new Date(2037,10,19,15,23);
console.log(+future);     // 2142253380000

// to convert millisecond to days
// 1000 milisecond(1sec), 60 sec in 1 min, 60 min in 1 hr, 24 hrs in 1 day
const calcDaysPassed = (date1, date2) => Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037,3,14), new Date(2037,3,24));
console.log(days1);   // 10

*/


/////////////////////////////////////////////////
/////


/*

// International number format
const num = 465465465.23;

// if style is unit, unit property should be defiled
// if style is currency, currency property should be defined
const options ={
  style: "currency",      //"unit",  // "percent"
  unit: "mile-per-hour", // "celsius"
  currency: "EUR",
  // useGrouping: false   // will remove number separator
}

// US: 465,465,465.23 mph             // US: €465,465,465.23
console.log("US: " + new Intl.NumberFormat("en-Us", options).format(num));
// IN: 46,54,65,465.23 mph            // IN: €46,54,65,465.23
console.log("IN: " +new Intl.NumberFormat("en-IN", options).format(num));
// GERMANY: 465.465.465,23 mi/h       // GERMANY: 465.465.465,23 €
console.log("GERMANY: " +new Intl.NumberFormat("de-DE", options).format(num));
// en-US: 465,465,465.23 mph          // en-US: €465,465,465.23
console.log(navigator.language + ": " 
  +new Intl.NumberFormat(navigator.language, options).format(num));


*/


/////////////////////////////////////////////////
/////


/*

// Timers

// setTimeout executes a function after a specific time
// other code does not wait for time to fulfil
setTimeout( function(){
  console.log("Pijja aa gaya");
}, 3000);
console.log("Waiting...");
// Waiting...
// *** After 3 sec ***
// Pijja aa gaya

// setTimeout with parameters=
setTimeout(function(ing1, ing2){

  console.log(`Pijja is made of ${ing1}, ${ing2}`);
}, 4000, "chicken", "extra cheeze");    // after time are the parameters

// can cancel timeout, by storing it in variable
const ingredients = ["paneer", "extra chilli"];
const clearexample = setTimeout( (ing1, ing2) => {
  console.log(`Pijja is made of ${ing1}, ${ing2}`);

}, 4000, ...ingredients)

if(ingredients.includes("paneer")) {
  clearTimeout(clearexample);
}

// setInterval - executes after a particular interval, infinite
setInterval(function(){
  console.log(new Date());
}, 1000);

*/


/////////////////////////////////////////////////
/////


