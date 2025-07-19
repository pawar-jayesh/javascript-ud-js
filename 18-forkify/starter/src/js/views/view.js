import icons from "url:../../img/icons.svg";

export default class View{

    _data;

    render(recipe, render = true){
        this._data = recipe;

        if(!this._data || (Array.isArray(this._data) && this._data.length === 0)) 
            return this.renderError();

        const markup = this._generateMarker();

        if(!render) return markup;

        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin",markup);
    }

    _clear(){
        this._parentElement.innerHTML = "";
    }

    renderSpinner(){
        const markupEl = `
          <div class="spinner">
            <svg>
              <use href="${icons}.svg#icon-loader"></use>
            </svg>
          </div>
        `;
        this._parentElement.innerHTML = "";
        this._parentElement.insertAdjacentHTML("afterbegin", markupEl);
    }

    renderError(message = this._errorMessage){
        const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>Biew: adding ${message}.</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    renderMessage(message = this._message){
        const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${icons}.svg#icon-smile"></use>
              </svg>
            </div>
            <p>Biew: adding ${message}.</p>
          </div>
        `;
        this._clear();
        this._parentElement.insertAdjacentHTML("afterbegin", markup);
    }

    update(data){

        // if(!this._data || (Array.isArray(this._data) && this._data.length === 0)) 
        //     return this.renderError();
        
        this._data = data;
        // copying the newly created html as string(not implemented)
        const newMarkup = this._generateMarker();
        // converting it to html
        const newDOM = document.createRange().createContextualFragment(newMarkup);
        // selecting both current and new DOM
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(this._parentElement.querySelectorAll("*"));

        // looping throw each DOM element
        newElements.forEach((newEl, i) => {
            const curEl = curElements[i];

            // changing only the text in current element, changes as it is live
            // will check if node is equal and is a element whcih has text value
            if(!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== ""){
                curEl.textContent = newEl.textContent;
            }

            // changing only the attributes in current element, changes as it is live
            if(!newEl.isEqualNode(curEl)){
                Array.from(newEl.attributes).forEach((attr) => {
                    // setting up only updated attribute values
                    curEl.setAttribute(attr.name, attr.value);
                })
            }

        });

    }

}