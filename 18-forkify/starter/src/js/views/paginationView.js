import View from "./view";
import icons from "url:../../img/icons.svg";

class PaginationView extends View {
    _parentElement = document.querySelector(".pagination");

    addHandlerClick(handler){
        this._parentElement.addEventListener("click", function(e){
            const btn = e.target.closest(".btn--inline");
            if(!btn) return;

            const goto = +btn.dataset.goto;  
            handler(goto);
        });
    }

    _generateMarker(){
        const currentPage = this._data.page;
        const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
        // 1 n more
        if(currentPage === 1 && numPages > 1){
            return `
                <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}.svg#icon-arrow-right"></use>
                </svg>
            </button>`;
        }        

        // last page
        if(currentPage === numPages && numPages > 1){
            return `<button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                        <svg class="search__icon">
                        <use href="${icons}.svg#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${currentPage - 1}</span>
                    </button>`;
        }

        // other pages
        if(currentPage < numPages){
            return `
            <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
                <span>Page ${currentPage + 1}</span>
                <svg class="search__icon">
                <use href="${icons}.svg#icon-arrow-right"></use>
                </svg>
            </button>
            <button data-goto="${currentPage - 1}" class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                <use href="${icons}.svg#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1 }</span>
            </button>`
        }

        // 1 and no more
        return ""
    }
}

export default new PaginationView();