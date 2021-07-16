import { POST_RECIPE } from '../index';
const axios = require('axios');

// Action creator that creates an action of type POST_RECIPE.
// The action contains the recipe to be posted.
const postRecipe = (recipe) => {
  return async (dispatch) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  // return (dispatch) =>
  //   fetch('http://localhost:3001/recipe', {
  //     method: 'post',
  //     body: JSON.stringify(recipe),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Accept: 'application/json',
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       dispatch({
  //         type: POST_RECIPE,
  //         payload: json,
  //       });
  //     });
};

export default postRecipe;
