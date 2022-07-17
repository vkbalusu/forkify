import { API_URL } from './config';
import { RES_PER_PAGE } from './config';
import { getJson } from './helpers';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);
    let recipe = data.data.recipe;
    // let {recipe} = data.data; this is same as above. maps recipe property of data.data to recipe variable on the left
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    const data = await getJson(`${API_URL}?search=${query}`);
    return (this.state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        // sourceUrl: recipe.source_url,
        image: recipe.image_url,
      };
    }));
  } catch (error) {
    throw error;
  }
};

export const getResultsForPage = function (page = this.state.search.page) {
  this.state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(
    ing => (ing.quantity = (ing.quantity * newServings) / state.recipe.servings)
  );
  state.recipe.servings = newServings;
};
