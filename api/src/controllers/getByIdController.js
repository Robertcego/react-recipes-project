const Sequelize = require('sequelize');
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const API_KEY = process.env.API_KEY;

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // ! Make sure the recipe exists and has an UUID
    if (id.includes('-')) {
      let dbRecipe = await Recipe.findOne({
        where: {
          id,
        },
        include: Diet,
      }).catch((err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      });

      let arr = [];
      dbRecipe.dataValues.diets.forEach((diet) =>
        arr.push(diet.dataValues.name)
      );

      // ! Recipe from the database
      let recipeAttributes = {
        id: dbRecipe.id,
        name: dbRecipe.name,
        summary: dbRecipe.summary,
        score: dbRecipe.score,
        image: dbRecipe.image,
        healthScore: dbRecipe.healthScore,
        instructions: dbRecipe.instructions,
        diets: arr,
      };
      if (!dbRecipe) return res.send({ Error: 'Recipe not found.' });
      res.send(recipeAttributes);
    } else {
      const { id } = req.params;
      let apiRecipe = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );

      let apiRecipeAttributes = {
        id: apiRecipe.data.id,
        name: apiRecipe.data.title,
        image: apiRecipe.data.image,
        summary: apiRecipe.data.summary,
        score: apiRecipe.data.spoonacularScore,
        healthScore: apiRecipe.data.healthScore,
        instructions: apiRecipe.data.instructions,
        diets: apiRecipe.data.diets,
      };
      res.send(apiRecipeAttributes);
    }
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    next(err);
  }
};

module.exports = { getById };
