import {
  // Recipe actions
  GET_RECIPES,
  GET_RECIPE_DETAILS,
  GET_RECIPE_NAMES,
  GET_DIETS,
  POST_RECIPE,

  // Sorting actions
  SORT_BY_ASCENDING_NAME,
  SORT_BY_DESCENDING_NAME,
  SORT_BY_HIGH_SCORE,
  SORT_BY_LOW_SCORE,
  SORT_BY_DIET,
  RESET,
} from '../actions/index';

const initialState = {
  // Recipe states
  getRecipes: [],
  recipeDetails: [],
  getRecipesName: [],
  getDiets: [],
  postRecipe: [],
  // Sorting states
  filterRecipes: [],
  sortBy: 'Select',
  filterBy: 'All',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Recipe states
    case GET_RECIPES: {
      return {
        ...state,
        getRecipes: action.payload,
      };
    }
    case GET_RECIPE_DETAILS: {
      return {
        ...state,
        recipeDetails: action.payload,
      };
    }
    case GET_RECIPE_NAMES: {
      return {
        ...state,
        getRecipesName: action.payload,
      };
    }
    case GET_DIETS: {
      return {
        ...state,
        getDiets: action.payload,
      };
    }
    case POST_RECIPE: {
      return {
        ...state,
        postRecipe: action.payload,
      };
    }

    // Sorting states
    case SORT_BY_DIET: {
      return {
        ...state,
        filterRecipes: action.payload.recipeSortedByDiet,
        filterBy: action.payload.sortType,
      };
    }

    case SORT_BY_ASCENDING_NAME: {
      return {
        ...state,
        filterRecipes: action.payload.sortedRecipes,
        orderBy: action.payload.name,
      };
    }

    case SORT_BY_DESCENDING_NAME: {
      return {
        ...state,
        filterRecipes: action.payload.sortedRecipes,
        orderBy: action.payload.name,
      };
    }

    case SORT_BY_HIGH_SCORE: {
      return {
        ...state,
        filterRecipes: action.payload.sortedRecipes,
        orderBy: action.payload.name,
      };
    }

    case SORT_BY_LOW_SCORE: {
      return {
        ...state,
        filterRecipes: action.payload.sortedRecipes,
        orderBy: action.payload.name,
      };
    }

    case RESET: {
      return {
        ...state,
        filterRecipes: [],
        orderBy: 'Select',
        filterBy: 'All',
      };
    }

    default:
      return state;
  }
};

export default rootReducer;
