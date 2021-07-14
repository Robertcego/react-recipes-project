// Recipe Actions

export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPE_NAMES = 'GET_RECIPE_NAMES';
export const GET_RECIPE_DETAILS = 'GET_RECIPE_DETAILS';
export const POST_RECIPE = 'POST_RECIPE';

// Diets Actions
export const GET_DIETS = 'GET_DIETS';

// Sorting Actions
export const SORT_BY_ASCENDING_NAME = 'SORT_BY_ASCENDING_NAME';
export const SORT_BY_DESCENDING_NAME = 'SORT_BY_DESCENDING_NAME';
export const SORT_BY_HIGH_SCORE = 'SORT_HIGH_BY_SCORE';
export const SORT_BY_LOW_SCORE = 'SORT_LOW_BY_SCORE';
export const SORT_BY_DIET = 'SORT_BY_DIET';
export const RESET = 'RESET';

// Recipe Action Creators
export { default as getRecipes } from './recipesActions/getRecipes';
export { default as getRecipeNames } from './recipesActions/getRecipeNames';
export { default as getRecipeDetails } from './recipesActions/getRecipeDetails';
export { default as postRecipe } from './recipesActions/postRecipe';

// Diets Action Creators
export { default as getDiets } from './dietsActions/getDiets';

// Sorting Action Creators
export { default as sortByAscendingName } from './sortingActions/sortAscendingName';
export { default as sortByDescendingName } from './sortingActions/sortDescendingName';
export { default as sortByHighScore } from './sortingActions/sortHighScore';
export { default as sortByLowScore } from './sortingActions/sortLowScore';
export { default as reset } from './sortingActions/reset';
export { default as sortByDiet } from './sortingActions/sortByDiet';
