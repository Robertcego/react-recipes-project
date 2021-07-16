const Sequelize = require('sequelize');
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const API_KEY = process.env.API_KEY;

const getAllRecipes = async (_req, res, next) => {
  try {
    const apiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?&number=100&addRecipeInformation=true&apiKey=${API_KEY}`
    );

    const apiRecipesAttributes = [];
    for (let i = 0; i < apiRecipes.data.results.length; i++) {
      let apiRecipe = {
        id: apiRecipes.data.results[i].id,
        name: apiRecipes.data.results[i].title,
        diets: apiRecipes.data.results[i].diets,
        summary: apiRecipes.data.results[i].summary,
        score: apiRecipes.data.results[i].spoonacularScore,
        healthScore: apiRecipes.data.results[i].healthScore,
        instructions: apiRecipes.data.results[i].instructions,
        image: apiRecipes.data.results[i].image,
      };
      apiRecipesAttributes.push(apiRecipe);
    }

    const dbRecipes = await Recipe.findAll({
      include: Diet,
    });
    if (dbRecipes.length === 0) {
      return res.send(apiRecipesAttributes);
    }
    let dataResponse = [];
    for (let i = 0; i < dbRecipes.length; i++) {
      let diets = [];
      dbRecipes[i].diets.map((diet) => diets.push(diet.name));
      let dbResponse = {
        id: dbRecipes[i].id,
        name: dbRecipes[i].name,
        summary: dbRecipes[i].summary,
        score: dbRecipes[i].score,
        healthScore: dbRecipes[i].healthScore,
        instructions: dbRecipes[i].instructions,
        diets: diets,
      };
      dataResponse.push(dbResponse);
    }
    const allRecipes = dataResponse.concat(apiRecipesAttributes);
    return res.send(allRecipes);
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    next(err);
  }
};

module.exports = { getAllRecipes };
