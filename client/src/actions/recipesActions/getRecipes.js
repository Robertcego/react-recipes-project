import { GET_RECIPES } from '../index';
const axios = require('axios');
const getRecipes = () => {
  return async (dispatch) => {
    try {
      const recipes = await axios.get('http://localhost:3001/recipes');
      dispatch({
        type: GET_RECIPES,
        payload: recipes.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export default getRecipes;
