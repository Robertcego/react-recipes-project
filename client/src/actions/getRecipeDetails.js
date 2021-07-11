import { GET_RECIPE_DETAILS } from '.';

const getRecipeDetails = (id) => {
  return async (dispatch) => {
    const response = await fetch(`http://localhost:3001/recipes/${id}`);
    const recipe = await response.json();
    dispatch({
      type: GET_RECIPE_DETAILS,
      payload: recipe,
    });
  };
};

export default getRecipeDetails;
