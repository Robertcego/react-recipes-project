import { GET_RECIPES } from '.';

const getRecipes = () => {
  return async (dispatch) => {
    const response = await fetch('http://localhost:3001/recipes');
    const recipes = await response.json();
    dispatch({
      type: GET_RECIPES,
      payload: recipes,
    });
  };
};

export default getRecipes;
