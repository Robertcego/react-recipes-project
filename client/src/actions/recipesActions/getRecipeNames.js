import { GET_RECIPE_NAMES } from '../index';
const axios = require('axios');
const getRecipeNames = (recipeName) => {
  return async (dispatch) => {
    try {
      const recipes = await axios.get(
        `http://localhost:3001/recipes?name=${recipeName}`
      );
      dispatch({
        type: GET_RECIPE_NAMES,
        payload: recipes.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export default getRecipeNames;
