'use strict';


// challenge 4

class CarCl{

    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    };
    accelerate = function (){
        this.speed += 10;
        console.log(this.make + " Acc C New Speed: " + this.speed);
    };
    brake = function(){
        this.speed -= 5;
        console.log(this.make + " Brake New Speed: " + this.speed);
        return this;
    }

};

class EVCl extends CarCl{

    #charge;

    constructor(make, speed, charge){
        super(make, speed);
        this.#charge = charge;
    };

    chargeBattery = function(chargeTo){
        this.#charge = chargeTo;
        return this;
    };

    accelerate = function(){
        this.speed += 20;
        this.#charge--;
        console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.#charge}%`);
        return this;
    }
}


const tesla = new EVCl("Tesla", 120, 90);
tesla.accelerate().chargeBattery(90).brake();


/*

// encapsulation
class Account{
    // public field
    locale = navigator.language;
    bank = "Bankist";
    // private fields
    #movements = [];
    #pin;

    constructor(owner, currency, pin){
        this.owner = owner;
        this.currency = currency;
        this.#pin = pin;
    }

    getMovements(){
        return this.#movements;
    }

    #approveLoan(val){
        return true;
    }
    deposit(val){
        this.#movements.push(val);
        return this;
    }

    withdraw(val){
        this.deposit(-val);
        return this;
    }
    requestLoan(val){
        if(this.#approveLoan(val)){
            this.deposit(val);
            console.log("Loan approved and Deposited");
        }
        return this;
    }
};

const acc1 = new Account("Jonas", "EUR", 1111);
acc1.deposit(100).withdraw(100).requestLoan(100).withdraw(100); // chaining methods



console.log(acc1);      // Account {owner: 'Jonas', currency: 'EUR', pin: 1111, movements: Array(0), locale: 'en-US'}
acc1.deposit(360);
acc1.withdraw(160);
console.log(acc1); 

*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



/*


// Inheritance using Object.create

const PersonProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },
    // used to initialize properties, normal prototype function
    init(firstName, birthYear){
        this.firstName = firstName,
        this.birthYear = birthYear
    }
};
const steven = Object.create(PersonProto);
// inheriting
const StudentProto = Object.create(PersonProto);
// overriding init
StudentProto.init =  function(firstName, birthYear, course){
    PersonProto.init.call(this, firstName, birthYear);
    this.course = course;
}
// creating new function on StudentProto
StudentProto.introduce = function(){
    console.log(`My name is ${this.firstName} abnd I study ${this.course}`);
}

const jay = Object.create(StudentProto);
jay.init("Jay", 2010, "Computer Science");
jay.introduce();        // My name is Jay abnd I study Computer Science
jay.calcAge();          // 27


*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



/*

// Inheritance using ES6 classes
class PersonClass {

    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }

    calcAge(){
        console.log(2037 - this.birthYear);
    }

    greet(){
        console.log(`Hey ${this.fullName}`);
    }

    get age(){
        return 2037 - this.birthYear;
    }

    set fullName(name){
        if(name.includes(" ")) this._fullName = name;
        else alert("Not a full name");
    }

    get fullName(){
        return this._fullName;
    }

    static hey(){
        console.log("Hello from static");
    }
}
// ***************** INHERITANCE FROM HERE ************************
// you can override anything that is defined in parent static, get, set,property
class StudentClass extends PersonClass{
    
    // if you dont have additional property, constructor is not required
    constructor(fullName, birthYear, course){
        // needs to happen first, as it will create the parent class property
        super(fullName, birthYear);
        this.course = course;
    };

    introduce = function(){
        console.log(`My name is ${this.fullName} abnd I study ${this.course}`);
    };

    calcAge(){
        console.log(`I'm ${2037 - this.birthYear} yo. from student class`);
    }
};

const martha = new StudentClass('Martha Some', 2012, "Computer Science");
martha.calcAge();           // 25   //parent fucntion
martha.introduce();         // My name is Martha Some abnd I study Computer Science
// static is in herited too
StudentClass.hey();         // Hellow from Static 

*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



/*

// Challenge 3

const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function (){
    this.speed += 10;
    console.log(this.make + " Acc C New Speed: " + this.speed);
}

Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(this.make + " Brake New Speed: " + this.speed);
}

const EV = function(make, speed, charge){

    Car.call(this, make, speed);
    this.charge = charge;
}

// prototype linking
EV.prototype = Object.create(Car.prototype);
EV.prototype.chargeBattery = function(chargeTo){
    this.charge = chargeTo;
}

EV.prototype.accelerate = function(){
    this.speed += 20;
    this.charge--;
    console.log(`${this.make} is going at ${this.speed} km/h, with a charge of ${this.charge}%`);
}

const tesla = new EV("Tesla", 120, 90);
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();

tesla.brake();
tesla.brake();
tesla.brake();

tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();
tesla.accelerate();

*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------


/*

// Inheritance using constructor functions
const Person = function (firstName, birthYear){

    this.firstName = firstName;
    this.birthYear = birthYear;
};
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

const Student = function(firstName, birthYear, course){
    // using the Person constructor function, will get properties only
    // as it is function in end
    Person.call(this, firstName, birthYear)
    this.course =course;
};

// inherits the functions and property from prototype
// manually creating prototype chain
// so saying student has protoype of person, then adding more to student
Student.prototype = Object.create(Person.prototype);

// then adding more functions to avoid overwriting
Student.prototype.introduce = function(){
    console.log(`My name is ${this.firstName} abnd I study ${this.course}`);
};

const mike = new Student("Mike", 2020, "Computer Science");
mike.introduce();       // My name is Mike abnd I study Computer Science
mike.calcAge();         // 17

console.log(mike.__proto__);                // student
console.log(mike.__proto__.__proto__);      // person
console.log(mike.__proto__.__proto__.__proto__);      // object

// pointing constructor to Student, else it points to Person(due to 16)
Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);

*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



/*
// challenge 2
class Car {

    constructor(make, speed){
        this.make = make;
        this.speed = speed;
    };

    accelerate(){
        this.speed += 10;
        console.log(this.make + " Acc C New Speed: " + this.speed);
    };

    brake = function(){
        this.speed -= 5;
        console.log(this.make + " Brake New Speed: " + this.speed);
    };

    get speedUS(){
        return `US -Current speed: ${this.speed / 1.6} mi/h`;
    }

    set speedUS(miHSpeed){
        this.speed = miHSpeed * 1.6;
    }
};

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
bmw.accelerate();
bmw.accelerate();

mercedes.brake();
mercedes.brake();
mercedes.brake();

console.log(mercedes.speedUS);;
mercedes.speedUS = 100;
console.log(mercedes.speedUS);;


*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



/*

// Object.create - createing a protoype for objects
const PersonProto = {
    calcAge(){
        console.log(2037 - this.birthYear);
    },
    // used to initialize properties, normal prototype function
    init(firstName, lastName, birthYear){
        this.firstName = firstName,
        this.lastName = lastName,
        this.birthYear = birthYear
    }
}
const steven = Object.create(PersonProto);
steven.name = "Steven";
steven.birthYear = 2002;
console.log(steven);       // {name: 'Steven', birthYear: 2002}
steven.calcAge();          // 35

const sarah = Object.create(PersonProto)
sarah.init("Sarah", "Adams", 1975);
console.log(sarah);        // {firstName: 'Sarah', lastName: 'Adams', birthYear: 1975}
sarah.calcAge();           // 62 


*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------


/*

// static methods in constructor functions
const Person1 = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person1.hey = function(){
    console.log("Static function");
}
Person1.hey();      // Static function

// hey will not get inherited here as it is not in prootype
const Jonas1 = new Person1("Jonas1Jonas1", 1919);
console.log(Jonas1.hey);             // undefined 


// static method in ES6 class
class PersonClass{
    constructor(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    static hey(){
        console.log("Static method in class");
    }
}

PersonClass.hey();      // Static method in class

// hey will not get inherited here as it is not in prootype
const JonasClass = new PersonClass("JonasClass", 1919);
console.log(JonasClass.hey);             // undefined 

*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



/*


// getter and setters

// in object literals
// they are property, use get and set keywords
const account = {
    owner:"Jonas",
    movements: [200,530,120,300],

    // created on prototype
    get latest(){
        return this.movements.slice(-1).pop();
    },
    // created on prototype
    set latest(mov){
        this.movements.push(mov);
    }
}
console.log(account.latest);        // 300
account.latest = 50;
console.log(account.movements);     //  [200, 530, 120, 300, 50]


// getters and setter in class
class PersonClass {
    constructor(fullName, birthYear){
        this.fullName = fullName;
        this.birthYear = birthYear;
    }
    // getter in protoype
    get age(){
        return 2037 - this.birthYear;
    }

    // if setter and constructor property is same name
    // need to add (_) before the property to set
    // now the class will have _fullName property only (no fullName property)
    // fullName is now a setter
    set fullName(name){
        if(name.includes(" ")) this._fullName = name
        else alert("Given name is not a full name");
    }

    // creating a getter for fullName with returns _fullName
    get fullName(){
        return this._fullName;
    }
}
const jessica = new PersonClass("Jessica Davis", 1996);
console.log(jessica.fullName);       // Jessica Davis
console.log(jessica);
// PersonClass {_fullName: 'Jessica Davis', birthYear: 1996}
// getters - get age:ƒ age()        get fullName: ƒ fullName()
// setters - set fullName:ƒ fullName(name)


*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



/*

// ES6 Classes

// classes in JS is like sugarcoating 
// behind the scenes uses constructor functions

// class expression
const PersonClExp = class {};

// class declaration
class PersonClass {

    constructor(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

    // this will be on the .prototype of object, not on the object
    // so can do this here when using class keyword
    calcAge(){
        console.log(2037 - this.birthYear);
    }

    anotherMethod(){
        // does nothing
    }

    GIVEATTENTION = () => console.log("arrow " + this.firstName);;
}

const jessica = new PersonClass("Jessica", 1996);
console.log(jessica);       // PersonClass {firstName: 'Jessica', birthYear: 1996}
console.log(jessica.__proto__ == PersonClass.prototype);        // true

PersonClass.prototype.Greet = function(){
    console.log("Hey " + this.firstName);
}
jessica.Greet();        // Hey Jessica

// classes are not hoisted
// classes are also first class citizens (can pass and return from functions)
// classes are executed in strict mode

*/

// ------------------------------------------------------------------------
// ------------------------------------------------------------------------


/*

// constructor functions - start with capital letter
// creating objects with functions

// here function declaration and experssion will woek (arrow fun wont)
const PersonOld = function(firstName, birthYear){
    // empty object with property is created
    // so assigning values
    this.firstName = firstName;
    this.birthYear = birthYear;

    // never create a method inside a constructor function
    // this.calcAge = function(){
    //     console.log(2037 - this.birthYear);
    // }
};

// 1. new empty object {} is created
// 2. function called, this keyword is set to the created object {}
// 3. Created object {} is linked to the prototype
// 4. Created object {} is returned from the construction function
const JonasOld = new PersonOld("JonasOldJonasOld", 1919);
console.log(JonasOld);             // Person {firstName: 'JonasOldJonasOld', birthYear: 1919}

const MatildaOld =  new PersonOld("MatildaOldMatildaOld", 2017);
console.log(MatildaOld);           // Person {firstName: 'Matilda', birthYear: 2017}

const jay = "Jay";

console.log(JonasOld instanceof PersonOld);       // true
console.log(jay instanceof PersonOld);         // false


// Prototypes
const Person = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
};

// proper way of creating functions in Objects
Person.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};

const jonas = new Person("Jonas", 1991);
jonas.calcAge();        // 46
// here calcAge() is not a part of jonas instance but still it can use it
// becuase it was defined in Person.prototype, so proptotypal inheritance
// so only one copy of function exists, but all instance can use
console.log(jonas);     // Person {firstName: 'Jonas', birthYear: 1991}

const matilda =  new Person("Matilda", 2017);
matilda.calcAge();        // 20

// Prototype of Linked objects
// Person.prototype is not the prototype of person but instead it is what is going
// to be used as the prototype of all the objects created with Person constructor function
console.log(jonas.__proto__);       // {calcAge: ƒ}
console.log(jonas.__proto__ === Person.prototype);       // true
console.log(Person.prototype.isPrototypeOf(jonas));      // true
console.log(Person.prototype.isPrototypeOf(matilda));    // true

// any object always has access to the methods and peoperties of its prototypes

Person.prototype.share = "Shared";
console.log(jonas.share);       // Shared
console.log(matilda.share);     // Shared

console.log(jonas.hasOwnProperty("firstName"));     // true
console.log(jonas.hasOwnProperty("share"));         // false
console.log(matilda.hasOwnProperty("birthYear"));   // true
console.log(matilda.hasOwnProperty("share"));       // false

// this creates a new property on jonas (doesnt edit the prototype)
jonas.share = "Jonas Shared";   
console.log(jonas.share);               // Jonas Shared
console.log(jonas.__proto__.share);     // Shared




const Person1 = function(firstName, birthYear){
    this.firstName = firstName;
    this.birthYear = birthYear;
};

Person1.prototype.calcAge = function(){
    console.log(2037 - this.birthYear);
};
Person1.prototype.species = "Homo Sapiens";
const jonas1 = new Person1("Jonas", 1991);

console.log(jonas1.__proto__);                // {species: 'Homo Sapiens', calcAge: ƒ}
console.log(jonas1.__proto__.__proto__);      // Object.proptotye
console.log(jonas1.__proto__.__proto__.__proto__);      // null


const arr = [1,2,3,4,4,2,1,1,5,4,3,5];
console.log(arr.__proto__);     // [at: ƒ, concat: ƒ, copyWithin: ƒ, fill: ƒ, find: ƒ, …]

// you can add things to prototype as well
// DO NOT DO IT
Array.prototype.unique = function(){
    return [...new Set(this)];
}
console.log(arr.unique());      // [1, 2, 3, 4, 5]

console.log("-----------------------------------------------------------------------");

const Car = function(make, speed){
    this.make = make;
    this.speed = speed;
};

Car.prototype.accelerate = function (){
    this.speed += 10;
    console.log(this.make + " Acc C New Speed: " + this.speed);
}

Car.prototype.brake = function(){
    this.speed -= 5;
    console.log(this.make + " Brake New Speed: " + this.speed);
}

const bmw = new Car("BMW", 120);
const mercedes = new Car("Mercedes", 95);

bmw.accelerate();
mercedes.accelerate();
mercedes.accelerate();
mercedes.accelerate();
bmw.accelerate();
bmw.accelerate();

mercedes.brake();
mercedes.brake();
mercedes.brake();

*/



