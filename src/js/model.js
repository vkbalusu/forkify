import { API_URL } from './config';
import { getJson } from './helpers';
console.log(getJson);
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const data = await getJson(`${API_URL}/${id}`);
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
};
