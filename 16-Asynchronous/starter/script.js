'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v2/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}


// https://restcountries.eu/rest/v2/
// It's now:
// https://countries-api-836d.onrender.com/countries/

///////////////////////////////////////


function wait(seconds, image){
    return new Promise(function(resolve){
        setTimeout(() => {
            resolve({seconds, image});
        }, seconds * 1000);
    })
}

const displayAndWait = function(image, waitFor){
    document.querySelector(".images").insertAdjacentElement("beforeend",image);
    return wait(waitFor, image);
}


async function getImage(imgPath, prevImg) {
    if(prevImg) prevImg.style.display = "none";
    return new Promise(function(resolve, reject){
        let img = document.createElement("img");
        img.src = imgPath;
        img.addEventListener("load", function(){
            resolve(img);
        });
        img.addEventListener("error", function(){
            reject(new Error("Image error"));
        });
    });
}

async function loadNPause(imgPaths){

    let img = await getImage(imgPaths[0]);
    let _ = await displayAndWait(img, 4);

    let img2 = await getImage(imgPaths[1], img);
    let _2 = await displayAndWait(img2, 4);

    let img3 = await getImage(imgPaths[1], img2);
    let _3 = await displayAndWait(img3, 4);
    img3.style.display = "none";

    // let prevImg ;
    // imgPaths.forEach(async (imgPath) =>{
        
    //     if(prevImg) prevImg.style.display = "none";
        
    //     let val = await new Promise(function(resolve, reject){
    
    //         let img = document.createElement("img");
    //         img.src = imgPath;
    //         img.addEventListener("load", function(){
    //             resolve(img);
    //         });
    //         img.addEventListener("error", function(){
    //             reject(new Error("Image error"));
    //         });

            
    //     });

    //     const check = await displayAndWait(val, 4);
    //     _ = await check.then(( {seconds, image} ) => prevImg = image)
        
    // })

    // if(prevImg) prevImg.style.display = "none";

}

// loadNPause(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"])

function createImageBitmap(imgPath, seco, prevImg){
    if(seco) console.log(`Image laoded after ${seco} secs`);
    if(prevImg) prevImg.style.display = "none";

    return new Promise(function(resolve, reject){
        if(!imgPath) reject(new Error("Image path not provided"));

        let img = document.createElement("img");
        img.src = imgPath;
        
        img.addEventListener("load", function(){
            resolve(img);
        });
        img.addEventListener("error", function(){
            reject(new Error("Image error"));
        })
    });
}

async function laodAll(imgArr) {
    
    const check = imgArr.map(async (image) => await createImageBitmap(image)
                        .then((val) => document.querySelector(".images").insertAdjacentElement("beforeend",val)) );

    const allImages = await Promise.all(check);

    allImages.forEach((img) => {
        img.classList.add("parallel");
    })
}
laodAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"])


// async function exec() {
 
//     let img = await loadNPause("img/img-1.jpg");
//     let _ = await displayAndWait(img, 4);

//     let img2 = await loadNPause("img/img-2.jpg", img);
//     let _2 = await displayAndWait(img2, 4);

//     let img3 = await loadNPause("img/img-3.jpg", img2);
//     let _3 = await displayAndWait(img3, 4);
//     img3.style.display = "none";

// }

// exec();






// createImageBitmap("img/img-1.jpg")
// .then((img) => {

//     return displayAndWait(img, 4);
// })
// .then(( {seconds: seco, image: imageElement}) => {

//     return createImageBitmap("img/img-2.jpg", seco, imageElement);
// })
// .then((img) => displayAndWait(img, 4) )
// .then(( {seconds: seco, image: imageElement}) => {

//     return createImageBitmap("img/img-3.jpg", seco, imageElement);
// })
// .then((img) => displayAndWait(img, 4) )
// .then(( {seconds: seco, image: imageElement}) => {
//     console.log(seco + " secs. The END");
//     imageElement.style.display = "none";
// })
// .catch((err) => console.error("error " + err));


//////////////////////////////////////
///////////////////////////////////////

/*

// Promise.race
// first settled promise wins

function getJSON(url, errorMessage = "Something went wrong"){
    // returning fetch so that the function returns a promise
    return fetch(url)
            .then((response) => {
                if(!response.ok){
                    throw new Error(errorMessage + " " + response.status);
                }
                return response.json();
            });
}

// takes and array of promise and returns the winner.
// Promise.race, whichever xecutes first will win and remaining would be discarded
// irrespective of resolve or eject, it will return that data
(async function () {
    const rest = Promise.race([
        getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/egypt`),
        getJSON(`https://countries-api-836d.onrender.com/countries/name/mexico`)
    ]);

    rest.then((val) => console.log(val[0]))
})();

// creating a timeout, so that you stop the API which is taking too long
// using the timeout function in .race
const timeout = function(sec){
    return new Promise(function(_, reject){
        setTimeout(function(){
            reject(new Error("Request timeout"));
        }, sec * 1000);
    });
}
Promise.race([
    getJSON(`https://countries-api-836d.onrender.com/countries/name/italy`),
    timeout(5)
]).then((res) => console.log(res[0]))
.catch((err) => console.error(err))


// allSettled
// takes array of promise and returns all array of settled promises
// same as .all but does not stop when there is reject
// so youll get all response
Promise.allSettled([
    Promise.resolve("Success"),
    Promise.resolve("Success"),
    Promise.reject(new Error("Error")),
    Promise.resolve("Success"),
    Promise.reject(new Error("Error")),
])
.then((res => console.log(res)))            // gets both fullfilled and rejected val
.catch((err) => console.log(err.message));  // does not execute


// Promise.any
// takes array, returns first fulfilled promise and ignores the rejected ones
// if all rejected, goes into catch, msg - All promises were rejected
// else oges into then
Promise.any([
    Promise.resolve("Success"),
    Promise.resolve("Success"),
    Promise.reject(new Error("Error")),
    Promise.resolve("Success"),
    Promise.reject(new Error("Error")),
])
.then((res => console.log("then " +res)))            // gets both fullfilled and rejected val
.catch((err) => console.log("err "+err.message));  // does not execute



async function get3Conuntries(c1, c2, c3) {
    try{
        // to run promises in parallel
        // promise.all() takes and array and received an array
        // if any one of the promise rejects, whole is rejected, returns undefined
        const data = await Promise.all([
            getJSON(`https://countries-api-836d.onrender.com/countries/name/${c1}`),
            getJSON(`https://countries-api-836d.onrender.com/countries/name/${c2}`),
            getJSON(`https://countries-api-836d.onrender.com/countries/name/${c3}`)
        ]);

        console.log(data.map((country) => country[0].capital));

    } catch(err){
        console.error(err.message);
    }
}
// get3Conuntries("portugal", "canada", "tanzania")

*/



//////////////////////////////////////
///////////////////////////////////////

/*
const renderCountry = function(data, className = ""){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data?.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/ 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
};

const getPosition = function(){
    return new Promise(function(resolve, reject){
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

// async / await
// error handling using try catch
const whereAmI = async function(){

    try{
        const pos = await getPosition();
        const { latitude: lat, longitude: lng} = pos.coords

        const resGeo = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
        const datageo = await resGeo.json();
        console.log(datageo);
        // renderCountry(datageo[0]);

        const res = await fetch(
            `https://countries-api-836d.onrender.com/countries/name/${datageo.countryName}`);
        
        console.log(res);
        if(!res.ok) throw new Error("Cannot find country");
        const data = await res.json();
        renderCountry(data[0]);
    } catch(err){
        console.log(err.message);
    }
}
console.log("1: will get location");
whereAmI("portugal");
console.log("2: finished getting location");


// async function returns a promise
// even if there is a error in async function, it goes into then() while reading data
// so to avoid that we need to throw the error again, 
// so that it can be caught while trying to read, in the catch block
const check = async function(){
   try{
    const val = 10;
    val =20;
    return val;
   } catch(e){
    console.error(e.message);
    throw new Error(e.message)
   }
}
console.log("----------------------------");


check().then((v) => console.log("fetch from " + v))
.catch((v) => console.log("fetch catch " + v))
.finally(() => console.log("Finally"))
// can write using await as well
(async function () {
    try{
        let value = await check();
        console.log("IIFE "+value);
    } catch(err){
        console.log("IIFE "+err);
    }
    finally{    }
})();




console.log("----------------------------");
// ----------------------------
// Promise {<fulfilled>: '101'}
// ----------------------------
// fetch catch Error: Assignment to constant variable.


*/




//////////////////////////////////////
///////////////////////////////////////

/*

// challenge 2

function createImageBitmap(imgPath, seco, prevImg){
    if(seco) console.log(`Image laoded after ${seco} secs`);
    if(prevImg) prevImg.style.display = "none";

    return new Promise(function(resolve, reject){
        if(!imgPath) reject(new Error("Image path not provided"));

        let img = document.createElement("img");
        img.src = imgPath;
        
        img.addEventListener("load", function(){
            resolve(img);
        });
        img.addEventListener("error", function(){
            reject(new Error("Image error"));
        })
    });
}

function wait(seconds, image){
    return new Promise(function(resolve){
        setTimeout(() => {
            resolve({seconds, image});
        }, seconds * 1000);
    })
}

const displayAndWait = function(image, waitFor){
    document.querySelector(".images").insertAdjacentElement("beforeend",image);
    return wait(waitFor, image);
}

createImageBitmap("img/img-1.jpg")
.then((img) => {

    return displayAndWait(img, 4);
})
.then(( {seconds: seco, image: imageElement}) => {

    return createImageBitmap("img/img-2.jpg", seco, imageElement);
})
.then((img) => displayAndWait(img, 4) )
.then(( {seconds: seco, image: imageElement}) => {

    return createImageBitmap("img/img-3.jpg", seco, imageElement);
})
.then((img) => displayAndWait(img, 4) )
.then(( {seconds: seco, image: imageElement}) => {
    console.log(seco + " secs. The END");
    imageElement.style.display = "none";
})
.catch((err) => console.error("error " + err));

*/

//////////////////////////////////////
///////////////////////////////////////

/*


// creating promises
// constructor one paramter, executor functio
//  executor function has two function  resolve, reject paramter
const dummyPromise = new Promise(function(resolve, reject){
    console.log('Draw happening');
    setTimeout(() =>{

        if(Math.random() >= 0.5){
            resolve("You WIN motherfucker");
        } else {
            reject(new Error("You Lost motherfucker"));
        }
    }, 1000)
});

dummyPromise.then((val) =>{
    console.log(val);
    console.log("success");
})
.catch((err) => {
    console.log(err)
    console.log("error");
});
// when > 0.5 (success) : You WIN motherfucker
// success

// when < 0.5 (error)   : 
// Draw happening
// Error: You Lost motherfucker
// error


// promisifying setTimeout
const wait = function(seconds){
    return new Promise(function(resolve){
        setTimeout(resolve(seconds), seconds * 1000);
    })
}

wait(1).then((val) => {
    console.log(val + " second")
    return wait(2);
}).then(() => {
    console.log("3 second")
    return wait(1);
}).then(() => {
    console.log("4 second")
})

// has functiosn for resolve and reject 
// can do it without constructor
// will execute immediately
Promise.resolve("Success")
.then((val) => console.log(val));
// Success

Promise.reject(new Error("Rejected"))
.catch((val) => console.log(val));
// Error: Rejected


// promisifying geolocation api
const getPosition = function(){
    return new Promise(function(resolve, reject){
        // navigator.geolocation.getCurrentPosition(
        //     position => resolve(position),
        //     error => reject(error)
        // );
        // can do this too
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

getPosition()
.then((pos) => console.log(pos))
.catch(err => console.error(err));

const renderCountry = function(data, className = ""){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/ 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML("beforeend", html);
};

function makeRequest(url){
    return fetch(url)
    .then((response) => {
        if(!response.ok){
            throw new Error('Sup sup lil pup')
        }
        return response.json();
    });
}

function whereAmI(){
    getPosition().then((pos) => {
        const { latitude: lat, longitude: lng} = pos.coords
        return makeRequest(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    }) 
    .then((data) => {
        console.log(`Youa re in ${data.city}, ${data.countryName}`);
        return makeRequest(`https://countries-api-836d.onrender.com/countries/name/${data.countryName}`)
    })
    .then((data) => {
        renderCountry(data[0]);
    })
    .catch((err) => {
        renderError(err.message)
        console.log(err);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
}

const renderError = function(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
}
btn.addEventListener("click", function(e){
    whereAmI();
});

*/



//////////////////////////////////////
///////////////////////////////////////

/*

// execution order
console.log("Test start");                                 // 1
setTimeout(() => {
    console.log("first timer");                            // 5
    Promise.resolve("Resolve 3 inside first timer")        // 6
    .then((res) => console.log(res));
}, 0);

// create a promise that immidiately has success value
Promise.resolve("Resolve promise 1")                        // 3
.then((res) => console.log(res));

Promise.resolve("Resolve 2").then(res => {

    setTimeout(() =>{
        console.log("second timer inside resolve 2");       // 7
    }, 0)
    for(let i =0; i < 1000000000; i++){                 // waits 

    }
    console.log(res);                                       // 4
})
console.log("Test end");                                    // 2
// Test start
// Test end
// Resolve promise 1
// Resolve 2
// first timer
// Resolve 3 inside first timer
// second timer inside resolve 2

*/



//////////////////////////////////////
///////////////////////////////////////

/*

// challenge 1
const renderCountry = function(data, className = ""){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/ 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML("beforeend", html);
};

function makeRequest(url){
    return fetch(url)
    .then((response) => {
        if(!response.ok){
            throw new Error('Sup sup lil pup')
        }
        return response.json();
    });
}
console.log(makeRequest(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${72.873}&longitude=${72.873}`));
function whereAmI(lat, lng){
    
    makeRequest(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`)
    .then((data) => {
        console.log(`Youa re in ${data.city}, ${data.countryName}`);
        return makeRequest(`https://countries-api-836d.onrender.com/countries/name/${data.countryName}`)
    })
    .then((data) => {
        renderCountry(data[0]);
    })
    .catch((err) => {
        renderError(err.message)
        console.log(err);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
}

const renderError = function(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
}
btn.addEventListener("click", function(e){
    whereAmI(-33.933, 18.474);
    whereAmI(19.037, 72.873);
});

*/


//////////////////////////////////////
///////////////////////////////////////

/*

const renderCountry = function(data, className = ""){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/ 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML("beforeend", html);
};


let country = "portugal";

// creating a helper function to handle manual errors
// function either throws a error or returns json()
const getJSON = function(url, errorMessage = "Something went wrong"){
    // returning fetch so that the function returns a promise
    return fetch(url)
            .then((response) => {
                if(!response.ok){
                    throw new Error(errorMessage + " " + response.status);
                }
                return response.json();
            });
}

const getCountryData = function(country){

    getJSON(`https://countries-api-836d.onrender.com/countries/name/${country}`, "Not found")
    .then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];
        
        if(!neighbour) throw new Error("No neighbour found");

        return getJSON(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`, "Invalid Code");
    })
    .then((data) => { renderCountry(data, "neighbour") })
    .catch((err) => {
        renderError(err.message);
    })
    .finally(() => {
        countriesContainer.style.opacity = 1;
    })
}

const renderError = function(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
}
btn.addEventListener("click", function(e){
    getCountryData("portugal");
});

*/



///////////////////////////////////////
///////////////////////////////////////

/*

const renderCountry = function(data, className = ""){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/ 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML("beforeend", html);
        // countriesContainer.style.opacity = 1;
};


let country = "portugal";

// handling error in promise
// 1 way : pass second callback which will handle error. 
// if you have chaining you will have to do multiples
// 2 way: handle gloablly at the end using catch
// APART from error we can have finally chained in end too
const getCountryData = function(country){

    fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];
        if(!neighbour) return;

        // then will return this value as promise
        return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => { renderCountry(data, "neighbour") })
    .catch((err) => {
        renderError(err.message);
        console.error("Somethingwent wrong " + err.message);
    })
    .finally(() => {
        // executes if its success or error. so always
        countriesContainer.style.opacity = 1;
    })
}

const renderError = function(msg){
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
}
btn.addEventListener("click", function(e){
    getCountryData("portugal");
})

*/



///////////////////////////////////////
///////////////////////////////////////

/*
const renderCountry = function(data, className = ""){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/ 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
};

let country = "portugal";

// chaining then, to execute one after another
// ,then() alwways returns a promise
const getCountryData = function(country){

    fetch(`https://countries-api-836d.onrender.com/countries/name/${country}`)
    .then((response) => response.json())
    .then((data) => {
        renderCountry(data[0]);
        const neighbour = data[0].borders?.[0];
        if(!neighbour) return;

        // then will return this value as promise
        return fetch(`https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
    })
    .then((response) => response.json())
    .then((data) => { renderCountry(data, "neighbour") })
}
getCountryData("portugal");

*/


///////////////////////////////////////
///////////////////////////////////////

/*

const renderCountry = function(data, className = ""){
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/ 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
}

// ajax call country 1
const getCountryAndNeighbour = function(country){
    // XML request
    const request = new XMLHttpRequest();
    request.open("GET", `https://countries-api-836d.onrender.com/countries/name/${country}`);
    request.send();
    request.addEventListener("load", function(){

        const [data] = JSON.parse(this.responseText);

        // render country 1
        renderCountry(data)

        const [neighbour] = data.borders;

        if(!neighbour) return;

        const request2 = new XMLHttpRequest();
        request2.open("GET", `https://countries-api-836d.onrender.com/countries/alpha/${neighbour}`);
        request2.send();
        request2.addEventListener("load", function(){
            const data = JSON.parse(this.responseText);
            renderCountry(data, "neighbour")
        });
    });
}

getCountryAndNeighbour("usa");

*/


///////////////////////////////////////
///////////////////////////////////////

/*

const getCountryData = function(country){
    // XML request
    const request = new XMLHttpRequest();
    request.open("GET", `https://countries-api-836d.onrender.com/countries/name/${country}`);
    request.send();
    request.addEventListener("load", function(){
        console.log(this.responseText);

        const [data] = JSON.parse(this.responseText);
        console.log(data);

        const html = `
        <article class="country">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population/ 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
            </div>
            </article>
        `;

        countriesContainer.insertAdjacentHTML("beforeend", html);
        countriesContainer.style.opacity = 1;
    });
}

getCountryData("portugal");
getCountryData("usa");

*/
