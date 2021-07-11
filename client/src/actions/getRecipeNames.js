import { GET_RECIPE_NAMES } from '.';

const getRecipeNames = (recipeName) => {
  return async (dispatch) => {
    const response = await fetch(
      `http://localhost:3001/recipes?name=${recipeName}`
    );
    const recipe = await response.json();
    dispatch({
      type: GET_RECIPE_NAMES,
      payload: recipe,
    });
  };
};

export default getRecipeNames;
