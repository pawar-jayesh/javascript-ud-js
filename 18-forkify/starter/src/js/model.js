import { API_KEY, API_URL, RES_PER_PAGE } from "../js/config.js";
import { AJAX } from "./helpers.js";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        page: 1,
        resultsPerPage: RES_PER_PAGE
    },
    bookmarks: [],
}

const createRecipeObject = function(data){
    const { recipe } = data.data;
    return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        imageUrl: recipe.image_url,
        sourceUrl: recipe.source_url,
        servings: recipe.servings,
        cookingTime: recipe.cooking_time,
        ingredients: recipe.ingredients,
        ...(recipe.key && { key: recipe.key })
    };
}

export const laodRecipie = async function(id) {
    
    try{
        const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
        state.recipe = createRecipeObject(data);

        if(state.bookmarks.some((b) =>  b.id === id)){
            state.recipe.bookmarked= true;
        } else{
            state.recipe.bookmarked= false;
        }

    } catch(err){
        // alert("Model " + err.message);
        throw new Error("Model: adding " + err.message);
    }
}

export const loadSearchResults = async function(query){
    try{
        const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);
        
        state.search.query = query;
        state.search.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                imageUrl: recipe.image_url,
                ...(recipe.key && { key: recipe.key }),
            }
        });
        state.search.page = 1;
    } catch(err){
        throw err;
    }
}

export function getSearchResultsPage(page = state.search.page){
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage;
    const end = page * state.search.resultsPerPage;

    return state.search.results.slice(start, end);
}

export function updateServings(newServings){
    console.log(state.recipe);

    state.recipe.ingredients.forEach((element) => {
        element.quantity = element.quantity * newServings / state.recipe.servings;
    });
    console.log(state.recipe);
    state.recipe.servings = newServings;
}

function persistBookmark(){
    localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
}

export const addBookmark = function(recipe){
    // add bookmark
    state.bookmarks.push(recipe);

    // amrk current recipe as bookmark
    if(recipe.id === state.recipe.id) state.recipe.bookmarked = true;

    persistBookmark();
}

export const deleteBookmark = function(id){
    const index = state.bookmarks.findIndex((e) => e.id === id);
    state.bookmarks.splice(index, 1);

    // amrk current recipe as NOT bookmark
    if(id === state.recipe.id) state.recipe.bookmarked = false;

    persistBookmark();
}

const init = function(){
    const storage = localStorage.getItem("bookmarks");

    if(storage) state.bookmarks = JSON.parse(storage);

}
init();

const clearBookmarks = function(){
localStorage.clear("bookmarks");
}
// clearBookmarks();

export const uploadRecipe = async function(newRecipe){
    
    try{
        console.log(newRecipe);

        const ingredients = Object.entries(newRecipe)
        .filter(enrty => enrty[0].startsWith("ingredient") && enrty[1] !== "")
        .map((ing) => {
            // const ingArray = ing[1].replaceAll(" ", "").split(",");
            const ingArray = ing[1].split(",").map(el => el.trim() );
            
            if(ingArray.length !== 3) throw new Error("Wrong Ingredient Format");
            
            const [ quantity, unit, description ] = ingArray;

            return { quantity: quantity ? +quantity : null, unit, description };
        });

        const recipe = {
            title: newRecipe.title,
            publisher: newRecipe.publisher,
            image_url: newRecipe.image,
            source_url: newRecipe.sourceUrl,
            servings: +newRecipe.servings,
            cooking_time: +newRecipe.cookingTime,
            ingredients: ingredients,
        }


        const data = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
        state.recipe = createRecipeObject(data);

    } catch(err){
        throw err;
    }
}