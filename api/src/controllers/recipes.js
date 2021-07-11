const Sequelize = require('sequelize');
const { Recipe, Types } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const arr = [];

// Get all the recipes from the api and add them to
// the recipes I create in the post

// ***** API ***** \\
const API_KEY = '2f5bcb6368314289ad4c1ab24e98c5f7';
// const API_KEY = '0e5262ac39694f468874a21ff9d2602c';
// const API_KEY = '231c716f75a4423498273c687d9a515d';

// ***** getAllRecipes ***** \\

const getAllRecipes = async (req, res, next) => {
  try {
    if (req.query.name) {
      const { name } = req.query;
      let temporalrecipes = [];
      let temporalrecipes_bd2 = [];
      const requestquery = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`
      );
      const recipes_bd = await Recipe.findAll({
        where: {
          name: {
            [Sequelize.Op.iLike]: `%${name}%`,
          },
        },
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: { model: Types, as: 'diets' },
      });
      recipes_bd.forEach((recipe) => {
        console.log(recipe);
        let arr = [];
        recipe.dataValues.diets.forEach((diet) =>
          arr.push(diet.dataValues.name)
        );
        let obj = {
          id: recipe.dataValues.id,
          name: recipe.dataValues.name,
          summary: recipe.dataValues.summary,
          score: recipe.dataValues.rating,
          healthScore: recipe.dataValues.level_of_healthy,
          instructions: recipe.dataValues.step_by_step,
          diets: arr,
        };
        temporalrecipes_bd2.push(obj);
      });

      for (i = 0; i < requestquery.data.results.length; i++) {
        let obj = {
          id: requestquery.data.results[i].id,
          name: requestquery.data.results[i].title,
          image: requestquery.data.results[i].image,
          diets: requestquery.data.results[i].diets,
        };
        temporalrecipes.push(obj);
        console.log(requestquery.data.results[i].id);
      }
      if (recipes_bd.length < 1 && temporalrecipes < 1)
        return res.status(404).json({ error: 'not founded recipes' });
      return res.status(200).json([...temporalrecipes_bd2, ...temporalrecipes]);
    }
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    next(err);
  }
  let temporalrecipes_bd = [];
  let temporalrecipes = [];
  const recipes_bd2 = await Recipe.findAll({
    include: { model: Types, as: 'diets' },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });

  const requestquery2 = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?&number=100&addRecipeInformation=true&apiKey=${API_KEY}`
  );
  for (i = 0; i < requestquery2.data.results.length; i++) {
    let obj = {
      id: requestquery2.data.results[i].id,
      name: requestquery2.data.results[i].title,
      image: requestquery2.data.results[i].image,
      diets: requestquery2.data.results[i].diets,
      healthScore: requestquery2.data.results[i].healthScore,
      score: requestquery2.data.results[i].spoonacularScore,
    };
    temporalrecipes.push(obj);
  }

  recipes_bd2.forEach((recipe) => {
    let arr = [];
    console.log('RECIPEEES', recipe);
    recipe.dataValues.diets.forEach((diet) => arr.push(diet.dataValues.name));
    let obj = {
      id: recipe.dataValues.id,
      name: recipe.dataValues.name,
      summary: recipe.dataValues.summary,
      score: recipe.dataValues.rating,
      image: recipe.dataValues.image,
      healthScore: recipe.dataValues.level_of_healthy,
      instructions: recipe.dataValues.step_by_step,
      diets: arr,
    };
    temporalrecipes_bd.push(obj);
  });

  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', temporalrecipes_bd);
  return res.status(200).json([...temporalrecipes_bd, ...temporalrecipes]);
};

// ***** getById ***** \\

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.includes('-')) {
      let internalRecipe = await Recipe.findOne({
        where: {
          id,
        },
        include: { model: Types, as: 'diets' },
      });

      let arr = [];
      internalRecipe.dataValues.diets.forEach((diet) =>
        arr.push(diet.dataValues.name)
      );
      let recipeAttributes = {
        id: internalRecipe.id,
        title: internalRecipe.name,
        summary: internalRecipe.summary,
        score: internalRecipe.score,
        image: internalRecipe.image,
        healthScore: internalRecipe.healthScore,
        instructions: internalRecipe.instructions,
        diets: arr,
      };
      if (!internalRecipe) return res.send({ Error: 'Recipe not found.' });
      res.send(recipeAttributes);
    } else {
      const { id } = req.params;
      let apiRecipe = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );

      let apiRecipeAttributes = {
        id: apiRecipe.data.id,
        title: apiRecipe.data.title,
        image: apiRecipe.data.image,
        summary: apiRecipe.data.summary,
        score: apiRecipe.data.spoonacularScore,
        healthScore: apiRecipe.data.healthScore,
        instructions: apiRecipe.data.instructions,
        diets: apiRecipe.data.diets,
      };
      res.json(apiRecipeAttributes);
    }
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    next(err);
  }
};

// ***** addRecipe ***** \\

const addRecipe = async (req, res, next) => {
  try {
    const { name, summary, score, image, healthScore, instructions, diets } =
      req.body;

    let newRecipe = await Recipe.create({
      id: uuidv4(),
      name,
      summary,
      image,
      score,
      healthScore,
      instructions,
    });
    // const recipeAttributes = {
    //   name: name,
    //   summary: summary,
    //   image: image,
    //   score: score,
    //   healthScore: healthScore,
    //   instructions: instructions,
    //   diets: diets,
    // };
    for (i = 0; i < diets.length; i++) {
      const diet = await Types.findAll({
        where: {
          name: diets[i],
        },
      });
      newRecipe.addDiet(diet);
    }
    res.send(newRecipe);
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    next(err);
  }
};

module.exports = {
  getAllRecipes,
  getById,
  addRecipe,
};
