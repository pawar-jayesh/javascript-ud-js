'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach((_, i) => {
  btnsOpenModal[i].addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});



const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.getElementById("section--1");

btnScrollTo.addEventListener("click", (e) =>{
  // to get coordinates of a section
  // const s1coords = section1.getBoundingClientRect();

  // to get current scroll
  console.log("Current scroll (x/y:) " + window.scrollX, window.scrollY);

  // to get viewport height and widt
  console.log("height/width of viewport "
    + document.documentElement.clientHeight
    + "  "
    + document.documentElement.clientWidth
  );

  // scrolling
  // scrolling to an x,y coordinate
  const section1 = document.getElementById("section--1"); 
  const s1coords = section1.getBoundingClientRect();
  // s1coords returns x,y from viewport not full page
  // so adding current scroll to it
  // window.scrollTo(s1coords.left + window.scrollX, s1coords.top + window.scrollY);

  // another way to write it,
  // passing object, adding customization
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX, 
  //   top: s1coords.top + window.scrollY,
  //   behavior: "smooth"
  // });

  // Modern way
  section1.scrollIntoView({ behavior:"smooth"});


});

// Page navigation

// not efficient as we are attaching same functionality to multiple elements
document.querySelectorAll(".nav__link").forEach(
  function(el){
    el.addEventListener("click", function(e){
      e.preventDefault();
      const id = this.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth"});
    })
  }
);

// using event delegation instead, handling in parent 
// 1. Add event listener to common parent element
// 2. Determine what element originated the event
document.querySelector(".nav__links").addEventListener("click", function(e){
  // where event originated, which child
  // matching stratergy
  // target element constains the class we are interested in
  if(e.target.classList(".nav__links")){
    e.preventDefault();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth"});
  };

});

// tabbed component

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
// not cool
// tabs.forEach( t => t.addEventListener("click", () => console.log("tab")));
tabsContainer.addEventListener("click", function(e){
  // closest parent with .operations__tab class name
  const clicked = e.target.closest(".operations__tab");

  if(!clicked) return;

  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach((n) => n.classList.remove("operations__content--active"));
  // active area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
  .classList.add("operations__content--active");
});


// Memu fade animation

const handleHover = function(e){
  if(e.target.classList.contains("nav__link")){

    const link = e.target;
    const siblingLink = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblingLink.forEach((s) => {
      if(s != link) {
        s.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

const nav = document.querySelector(".nav");

// when you bind, 0.5 will become the this keyword
// workaround to pass parameters( [] for multiple) to addeventLister functions
// as it only accepts 1, which i event (passed by default)
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));



/*
// sticky nav bar

const section1 = document.getElementById("section--1"); 
const initialCoords = section1.getBoundingClientRect();

// not efficient as called alot, on each scroll
window.addEventListener("scroll", (e) =>{
  if(window.scrollY > initialCoords.top) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
})
// better way in next image
*/

// sticky - intersection observer

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(enteries){
  const [entry] = enteries;
  
  if(!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`   // the calback would be called 90px before
});
headerObserver.observe(header);


// reveal section

const allSections = document.querySelectorAll(".section");

const revealSection = function(enteries, observer){
  // const [entry] = enteries;
  enteries.forEach((entry) =>{
    if(!entry.isIntersecting) return;
    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};


const sectionObserver = new IntersectionObserver(revealSection, { 
  root: null,
  threshold: 0.15,
});

allSections.forEach((sec) => {
  sectionObserver.observe(sec);
  sec.classList.add("section--hidden");
});


// lazy loading images
const imageTargets = document.querySelectorAll("img[data-src]");

function loadImg(enteries, observer){
  const [entry] = enteries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function(e){
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px"
});


imageTargets.forEach(img => imgObserver.observe(img));


// slider

const allSliderFunction = function(){

  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;
  const maxSlides = slides.length;
  
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  
  const dotContainer = document.querySelector(".dots");
  
  function goToSlide(slide){
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
    // activatedDot(slide);
  }
  
  function activatedDot(currSlide){
    document.querySelectorAll(".dots__dot").forEach((d) =>{
      d.classList.remove("dots__dot--active");
    });
    document
    .querySelector(`.dots__dot[data-slide="${currSlide}"]`)
    .classList.add('dots__dot--active');
  };
  
  const nextSlide = function(e){
    
    if(currentSlide == maxSlides - 1) currentSlide = 0;
    else currentSlide++;
  
    goToSlide(currentSlide);
    activatedDot(currentSlide);
  };
  const prevSlide = () =>{
    if(currentSlide == 0) currentSlide = maxSlides -1;
    else currentSlide--;
  
    goToSlide(currentSlide);
    activatedDot(currentSlide);
  };
  
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  document.addEventListener("keydown", function(e){
    if(e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  
  });
  
  const btnEl = document.createElement("button");
  btnEl.classList.add("dots__dot");
  
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  }
  
  
  dotContainer.addEventListener("click", function(e){
    
    if(e.target.classList.contains("dots__dot")){
  
      const slide = Number(e.target.dataset.slide);
      goToSlide(slide);
      activatedDot(slide);
    }
  
  })
  const init = function(){
    createDots();
    goToSlide(0);
    activatedDot(0);
  }
  
  init();
}
allSliderFunction();

/*
// example - intersection observer
const observerOptions = {
  root: null,     // viewport

  // when moving in or out of viewport
  // threshold: 0.1  // 10%. trigger on percentage visibility 
  // 0 so called when moving in or out of viewport
  // 0.2 called when 20% visible
  threshold: [0, 0.2]
};

const observerCallback =function(entries, observer){
  entries.forEach((entry) =>{
    console.log(entry);
  })
};
const section1 = document.getElementById("section--1"); 
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(section1);   // assigning observer

*/




/*

const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;



// when A is clciked, if parents(b,c) have same events it gets triggered
// when B is clciked, if parents(c) have same events it gets triggered
// when C is clicked only C is triggered as no parent(unless parent+same event).
// A - child 1
document.querySelector(".nav__link").addEventListener("click", function(e){
  const color = randomColor();
  this.style.backgroundColor = color;
  // target is from where event was triggered
  // currentTarget = this, current element
  console.log("Link: " + e.target, e.currentTarget);
  // not good - to stop parents with same event from executing
  // e.stopPropagation();    // now B nd C will not trigger
});

// B - parent of 1, child 2
document.querySelector(".nav__links").addEventListener("click", function(e){
  this.style.backgroundColor = randomColor();
  console.log("Container: " + e.target, e.currentTarget);
  // C will still trigger on B click as there is no stopPropagation()
});

// C - parent of child 2
document.querySelector(".nav").addEventListener("click", function(e){
  this.style.backgroundColor = randomColor();
  console.log("Nav: " + e.target, e.currentTarget);
});

// to listen to capturing(before reaching target) phase instead of bubbling(after target)
// in our A,B,C example lets cosider this is C
// so now this executes first then A then B
document.querySelector(".nav").addEventListener("click", function(e){
  this.style.backgroundColor = randomColor();
  console.log("Nav Capture: " + e.target, e.currentTarget);
}, true);

*/


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*

// entire html
console.log(document.documentElement);
// head
console.log(document.head);
// body
console.log(document.body);

const header = document.querySelector(".header");

// returns NodeList, does NOT updates automatically on DOM change
const allSections = document.querySelectorAll(".section");

document.getElementById("section--1");

// returns HTMLCollection, which updates automatically on DOM change
// all <button>
const allButtons = document.getElementsByTagName("button");

// returns HTMLCollection, which updates automatically on DOM change
// all with class name button
document.getElementsByClassName("button");

// creating and inserting elements
// .insertAdjacentElements

// creates a div (DOM object)
const message = document.createElement("div");
message.classList.add("cookie-message");
message.textContent = "We use cookies because we can";
message.innerHTML = "We use cookies because we can. <button class='btn btn--close-cookie'>Got It!</button>";
header.prepend(message);     // add at start of header
// header.append(message);   // add at end of header (will be moved from start to end as it is present)
header.append(message.cloneNode(true))  // will copy and then append to header, so two values

header.before(message);   // will insert before the header tag
header.after(message);    // will insert after the header tag

document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove();                // new way
  message.parentElement.removeChild(message);   // earlier way
});


*/

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


/*

// styles

const header = document.querySelector(".header");
const message = document.createElement("div");
message.classList.add("cookie-message");
message.textContent = "We use cookies because we can";
message.innerHTML = "We use cookies because we can. <button class='btn btn--close-cookie'>Got It!</button>";
header.before(message);   // will insert before the header tag

document.querySelector(".btn--close-cookie").addEventListener("click", () => {
  message.remove();                // new way
  message.parentElement.removeChild(message);   // earlier way
});

// inline styles
message.style.backgroundColor = "#37383d";
message.style.width = "120%";

// you only get inline styles
console.log(message.style.backgroundColor);   // #37383d
console.log(message.style.height);            // ( )

// to get the actual styles
console.log(getComputedStyle(message).height);  // 50px

message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + "px";

// in css, in :root it has property --color-primary
document.documentElement.style.setProperty("--color-primary", "orangered");


// attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);      // Bankist logo
// absolute path
console.log(logo.src);      // http://127.0.0.1:5501/13-Advanced-DOM-Bankist/starter/img/logo.png
// path from html file, could be relative path
console.log(logo.getAttribute("src"));      // img/logo.png
console.log(logo.className);  // nav__logo

// accessing a non-standard atttribute
console.log(logo.designer);                   // undefined
console.log(logo.getAttribute("designer"));   // Jonas

logo.alt = "Changing value from JS";
// setting attribute in HTML from JS
logo.setAttribute("company", "Bankist");

// Data attribute
// should start with data and then - separated
// in html data-version-number="4.0"

// stored in dataset object
// Name is everything after data- but in camelCase (no -)
// fetching
console.log(logo.dataset.versionNumber);    // 4.0
// data-another-example:"works"
console.log(logo.dataset.anotherExample);   // works

// classes
logo.classList.add("a", "b");
logo.classList.remove("a", "b");
logo.classList.toggle("a", "b");
logo.classList.contains("a", "b");

*/

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////

/*

const h1 = document.querySelector("h1");

// can add multiple functions when using addEventListener
h1.addEventListener("mouseenter", function(e){
  alert("You are reading the heading");
});

// old way
h1.onmouseenter = function(e){
  alert("You are reading the heading");
}

// removing event
// need the function in variable
const alertH1 = function(e){
  alert("You are reading the heading");
  // removing the event listner, can do the below code anyplace
  // h1.removeEventListener("mouseenter", alertH1);
};
h1.addEventListener("mouseenter", alertH1);

setTimeout(() => {
  h1.removeEventListener("mouseenter", alertH1);
}, 3000);

*/

///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


// DOM traversing

/*
const h1 = document.querySelector("h1");

// going downwards: child
// selects all child of h1 with class highlight
console.log(h1.querySelectorAll(".highlight"));   // NodeList(2)

// alll child of h1
// NodeList(9) [text, comment, text, span.highlight, text, br, text, span.highlight, text]
console.log(h1.childNodes);   

// Live collection - all elements of h1
// HTMLCollection(3) [span.highlight, br, span.highlight]
console.log(h1.children);

h1.firstElementChild.style.color = "white";
h1.lastElementChild.style.color = "orangered";


// traversing upwards
const h1 = document.querySelector("h1");
console.log(h1.parentNode);
console.log(h1.parentElement);

// closed parent to h1, opposite of querySelector(childern) to find parent
h1.closest(".header").style.background = "var(--gradient-secondary)";

// sideways
console.log(h1.previousElementSibling);
console.log(h1.previousElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

[...h1.parentElement.children].forEach((e) => {
  if(e !== h1) e.style.transform = "scale(0.5)";
})

*/


///////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////


document.addEventListener("DOMContentLoaded", function(e){
  console.log("HTML parsed and DOM tree build");
  console.log("Not required in vanilla JS");
});

window.addEventListener("load", function(e){
  console.log("HTML, images, CSS, external file loaded");
  console.log("Complete file loaded");
});

window.addEventListener("beforeunload", function(e){
  e.preventDefault();     // for some browsers
  console.log("Triggered before leaving the page");
  e.returnValue = "no point, generic message";
});



