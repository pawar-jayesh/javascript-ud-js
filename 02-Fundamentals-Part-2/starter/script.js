"use strict";

/*
const friends = ["Micheal", "Steeven", "Peter"];
console.log(friends);

// another way of creating array
const year = new Array(1991,1984,2008,2020);

console.log(friends[0]);
console.log(friends[friends.length - 1]);
console.log(friends.length);

friends[2] = "Jay";
console.log(friends[friends.length - 1]);


const jonas = ["Jonas", "Schmedtman", 2037 - 1991, "teacher", friends];
console.log(jonas);


const calAge = function (birthYear){
    return 2037 - birthYear;
}
const years = [1990, 1967, 2002, 2010, 2018];
const age1 =  calAge(years[0]);
const age2 =  calAge(years[1]);
const age3 =  calAge(years[years.length -1]);
console.log(age1, age2, age3);

const ages = [calAge(years[0]), calAge(years[1]), calAge(years[years.length - 1])];
console.log(ages);
*/

/*
const friends = ["Micheal", "Steeven", "Peter"];
friends.push("Jay");
console.log(friends);

friends.unshift("John");
console.log(friends);

const popped = friends.pop();
console.log(friends, popped);

friends.shift();
console.log(friends);

console.log(friends.indexOf("Steeven"));

console.log(friends.includes("Steeven"));
*/

/*
const jonas = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    age: 2037 - 1991,
    job: "teacher",
    friends: ["Micheal", "Steeven", "Peter"]
}
console.log(jonas.friends);            // propertu name
console.log(jonas["fri" + "ends"]);    // computed property name

const interestedIn = prompt("What do you want to know, choose by code");

if(jonas[interestedIn]){
    console.log(jonas[interestedIn]);
} else {
    console.log("Stop messing around.");
}

// adding property to an object
jonas.location = "Portugal";
jonas["twitter"] = "called x now";

console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);
*/

/*
// function expression as object property
const jonasOld = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    birthYear: 1991,
    job: "teacher",
    friends: ["Micheal", "Steeven", "Peter"],
    hasDriversLicense: true,

    calcAge: function(birthYear){
        return 2037 - birthYear;
    }
}
console.log(jonasOld.calcAge(jonasOld.birthYear));

// this - reference of the object is passed in the function
const jonas = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    birthYear: 1991,
    job: "teacher",
    friends: ["Micheal", "Steeven", "Peter"],
    hasDriversLicense: true,

    calcAge: function(){
        return 2037 - this.birthYear;
    }
}
console.log(jonas.calcAge());

// creating new property to avoid calculation each time on function call
const jonas = {
    firstName: "Jonas",
    lastName: "Schmedtmann",
    birthYear: 1991,
    job: "teacher",
    friends: ["Micheal", "Steeven", "Peter"],
    hasDriversLicense: true,

    calcAge: function(){
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    summary: function(){
        return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${this.hasDriversLicense ? "a":"no"} drivers license`
    }
}
console.log(jonas.calcAge());   // if not called age is not created
console.log(jonas.age);

console.log(jonas.summary());
*/

/*
for(let rep = 1; rep <=0; rep++){
    console.log("Repetion no : " + rep);
}

const friends = ["Micheal", "Steeven", "Peter"];
const jonas = ["Jonas", "Schmedtman", 2037 - 1991, "teacher", friends];

const types = [];

for(let i = 0; i < jonas.length; i++){
    console.log(jonas[i], typeof jonas[i]);
    // types[i] = typeof jonas[i];
    types.push(typeof jonas[i]);
}
console.log(types);

for(let exercise = 1; exercise < 4; exercise++){
    console.log(`Starting exercise ${exercise}`);

    for(let rep = 1; rep <= 5; rep++){
        console.log(`${exercise} - Repetition number ${rep}`);
    }
}
*/

/*
let rep = 1;
while(rep <=10){
    console.log("Repetion no : " + rep);
    rep++;
}

let dice = Math.trunc(Math.random() * 6);
while(dice !== 4){
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6);
    
    if(dice === 4){
        console.log("Four - loop end");
    }
}
*/

