const Sequelize = require('sequelize');
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

const addRecipe = async (req, res, next) => {
  try {
    const { name, summary, score, healthScore, instructions, diets } = req.body;

    let newRecipe = await Recipe.create({
      id: uuidv4(),
      name,
      summary,
      score,
      healthScore,
      instructions,
    });

    for (i = 0; i < diets.length; i++) {
      await newRecipe.addDiet(diets[i], { through: 'recipeType' });
    }
    const recipeDiets = await Recipe.findOne({
      where: {
        name: req.body.name,
      },
      include: Diet,
    });
    return res.json(recipeDiets);
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    next(err);
  }
};

module.exports = { addRecipe };
