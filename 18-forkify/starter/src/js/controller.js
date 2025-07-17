import "core-js/stable";                // polyfill
import "regenerator-runtime/runtime";   // pollyfil async await
import * as model from "./model.js"
import recipieView from "./views/recipieView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
const controlRecipie = async function() {
  try{
    
    const id = window.location.hash.slice(1);
    if(!id) return;

    // results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    
    // loading recipie
    recipieView.renderSpinner();

    _ = await model.laodRecipie(id);
    const recipe = model.state.recipe;

    
    // updating bookmarks
    bookmarksView.update(model.state.bookmarks);

    // rendering recipie
    recipieView.render(recipe);

  } catch(err){
    console.error(err.message);
    recipieView.renderError("controller adding " + err.message);
  }
};

async function controlSearchResults(){

  try{

    const query = searchView.getQuery();
    if(!query) return;
    resultsView.renderSpinner();
    
    await model.loadSearchResults(query);
    console.log(model.state.search);

    resultsView.render(model.getSearchResultsPage());

    paginationView.render(model.state.search);

  }catch(err){
    console.error(err.message);
    recipieView.renderError("controller adding " + err.message);
  }
};

const controlPagination = function(goto){
  resultsView.render(model.getSearchResultsPage(goto));
  paginationView.render(model.state.search);
}

function controlServings(newServings){
  // update data
  model.updateServings(newServings);

  // update the recipeView
  const recipe = model.state.recipe;
  // rendering recipie
  // recipieView.render(recipe);
  recipieView.update(recipe);

}

const controlAddBookmark = function(){

  // add or remove bookmark
  if(!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // update recipe view
  recipieView.update(model.state.recipe);

  // render bookmark view
  bookmarksView.render(model.state.bookmarks);
}

function controlBookmarks(){
  bookmarksView.render(model.state.bookmarks);
}

const controlAddRecipe = async function(newRecipe){
  try{

    // spiner
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);
    model.addBookmark(model.state.recipe);

    // render recipe
    recipieView.render(model.state.recipe);

    // success message
    addRecipeView.renderMessage();

    // render bookmark
    bookmarksView.render(model.state.bookmarks);

    // change id in url
    window.history.pushState(null, "", "#" + model.state.recipe.id);

    // close form
    setTimeout(() =>{
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000)
    
  } catch (err){
    console.error(err);
    addRecipeView.renderError(err.message);    
  }
}

// to run something on initialization
function init(){
  // subscriber in controller
  // using the view method by passing it the handler func
  // handler function is defined in controller
  // now the view events are registered here
  recipieView.addHandlerRender(controlRecipie);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipieView.addHandlerUpdateServings(controlServings);
  recipieView.addHandlerAddBookmark(controlAddBookmark);
  bookmarksView.addHandlerRender(controlBookmarks);
  addRecipeView.addHandlerUpload(controlAddRecipe);
}
init();

