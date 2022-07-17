import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const spinner = document.querySelector('.spinner');
const controlRecipe = async function () {
  try {
    recipeView.renderSpinner();
    const id = window.location.hash.slice(1);
    await model.loadRecipe(id);
    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (error) {
    // alert(error);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getResultsForPage());
    paginationView.render(model.state.search);
  } catch (error) {
    recipeView.renderError(error);
  }
};

const controlPagination = async function (pageNumber) {
  resultsView.render(model.getResultsForPage(pageNumber));
  paginationView.render(model.state.search);
};

const controlServings = function (servings) {
  model.updateServings(servings);
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addEventListerners(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addEventListner(controlSearchResults);
  paginationView.addEventListner(controlPagination);
};

init();
