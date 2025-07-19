import View from "./view";
import previewView from "./previewView";

class ResultsView extends View {
    _parentElement = document.querySelector(".results");
    _errorMessage = "Could not find any recipes for your query";
    _message = "";

    _generateMarker(){
        return this._data.map((data) => previewView.render(data, false)).join("");
    }
}

export default new ResultsView();