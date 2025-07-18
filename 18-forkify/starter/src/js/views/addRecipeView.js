import View from "./view";
import icons from "url:../../img/icons.svg";

class AddRecipeView extends View {

    _parentElement = document.querySelector(".upload");
    _message = "Recipe was successfully uplaoded";

    _window = document.querySelector(".add-recipe-window");
    _overlay = document.querySelector(".overlay");
    _btnOpen = document.querySelector(".nav__btn--add-recipe");
    _btnClose = document.querySelector(".btn--close-modal");

    constructor(){
        super();
        this._addHandlerShowWindow();
        this._addHandlerHideWindow();
    }

    toggleWindow(){
        this._window.classList.toggle("hidden");
        this._overlay.classList.toggle("hidden");
    }

    _addHandlerShowWindow(){
        this._btnOpen.addEventListener("click", this.toggleWindow.bind(this) );
    }

    _addHandlerHideWindow(){
        this._btnClose.addEventListener("click", this.toggleWindow.bind(this) );
        this._overlay.addEventListener("click", this.toggleWindow.bind(this) );
    }

    addHandlerUpload(handler){
        this._parentElement.addEventListener("submit", function(e){
            e.preventDefault();
            // formData gives all the form data, spreading it to get it
            // returns entries, name-value pair
            const dataArray = [...new FormData(this)];
            // converting entries to objects
            const dataObj = Object.fromEntries(dataArray);
            handler(dataObj);
        });
    }

    _generateMarker(){
        
    }
}

export default new AddRecipeView();