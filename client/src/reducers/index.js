import {
  GET_RECIPES,
  GET_RECIPE_DETAILS,
  GET_RECIPE_NAMES,
  GET_DIETS,
  POST_RECIPE,
} from '../actions/index';

const initialState = {
  getRecipes: [],
  recipeDetails: [],
  getRecipesName: [],
  getDiets: [],
  postRecipe: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default rootReducer;
