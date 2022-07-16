import * as model from './model.js';
import recipeView from './views/recipeView.js';
import icons from 'url:../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const recipeContainer = document.querySelector('.recipe');
const spinner = document.querySelector('.spinner');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const fetchRecipe = async function () {
  try {
    spinner.classList.remove('hidden');
    const id = window.location.hash.slice(1);
    await model.loadRecipe(id);
    const { recipe } = model.state;
    recipeView.render(recipe);
  } catch (error) {
    alert(error);
  }
};

class Dummy {
  constructor(firstName, lastName) {
    this.f_name = firstName;
    this.l_name = lastName;
  }

  static someVariable = 'some static variable';

  calcAge() {
    console.log('sample function');
  }
}
// fetchRecipe();

['load', 'hashchange'].forEach(ev => window.addEventListener(ev, fetchRecipe));
