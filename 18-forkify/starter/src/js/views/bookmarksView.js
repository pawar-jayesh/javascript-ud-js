import View from "./view";
import icons from "url:../../img/icons.svg";
import previewView from "./previewView";

class BookmarksView extends View {
    _parentElement = document.querySelector(".bookmarks__list");
    _errorMessage = "No bookmarks yet, find a nice recipe and bookmark it";
    _message = "";

    addHandlerRender(handler){
        window.addEventListener("load", handler);
    }
    _generateMarker(){
        return this._data.map((data) => previewView.render(data, false)).join("");
    }

}

export default new BookmarksView();