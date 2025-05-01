'use strict';

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCLoseModal = document.querySelector(".close-modal");
const btnsOpenModal = document.querySelectorAll(".show-modal");


for(let i=0; i < btnsOpenModal.length; i++){
    btnsOpenModal[i].addEventListener("click", openModal);
}

btnCLoseModal.addEventListener("click", closeModal);

overlay.addEventListener("click",closeModal);

function closeModal(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

function openModal(){
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

document.addEventListener("keydown", (event) => {
    if(event.code === "KeyJ" && !modal.classList.contains("hidden")){
        closeModal();
    }
});