import { POST_RECIPE } from '.';
const axios = require('axios');

// Action creator that creates an action of type POST_RECIPE.
// The action contains the recipe to be posted.
const postRecipe = (recipe) => {
  return async (dispatch) => {
    const postRecipe = await axios.post('http://localhost:3001/recipe', {
      name: recipe.name,
      summary: recipe.summary,
      score: recipe.score,
      healthScore: recipe.healthScore,
      instructions: recipe.instructions,
      diets: recipe.diets,
    });
    dispatch({
      type: POST_RECIPE,
      payload: postRecipe.data,
    });
  };
};

export default postRecipe;
