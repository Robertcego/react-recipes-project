import { GET_RECIPE_DETAILS } from '../index';
const axios = require('axios');
const getRecipeDetails = (id) => {
  return async (dispatch) => {
    try {
      const recipe = await axios.get(`http://localhost:3001/recipes/${id}`);
      dispatch({
        type: GET_RECIPE_DETAILS,
        payload: recipe.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default getRecipeDetails;
