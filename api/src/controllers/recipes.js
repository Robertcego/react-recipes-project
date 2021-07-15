const Sequelize = require('sequelize');
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
// const arr = [];

// Get all the recipes from the api and add them to
// the recipes I create in the post

// ***** API ***** \\
// const API_KEY = '2f5bcb6368314289ad4c1ab24e98c5f7';
// const API_KEY = '0e5262ac39694f468874a21ff9d2602c';
// const API_KEY = '231c716f75a4423498273c687d9a515d';
// const API_KEY = 'b95031f742694550ac1254dc10ce554e';
// const API_KEY = '337a3948a09a4db69a2a549e4a9389e9';
const API_KEY = 'ae481a929f3a482e888842470383726f';
// const API_KEY = 'e63d396d22ff46d58f9347d997dbe1e0';
// const API_KEY = '638b58a40c3344bebe9e4d44b52b083c';
// const API_KEY = '1f554d43be8746f89ad35d052160c0eb';
// const API_KEY = '044ea3e089db4849920884a51ed83add';
// const API_KEY = '7198aa54902d4f7b8800b87cd3f3eb96';
// const API_KEY = '0f1cc946d524471f8699a26de042da04'; <---
// const API_KEY = 'ec6f9c2db72b4c87adb779e34ab86d1b';
// const API_KEY = 'cf9249384cbc4867b3131e7ab75a7037';
// const API_KEY = '0d9677907f744e3c8b5158c8e4d7cfd4';
// const API_KEY = '325a7fb4a69e4548b376fd4c4093934f';

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
        include: { model: Diet },
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
          score: recipe.dataValues.score,
          healthScore: recipe.dataValues.healthScore,
          instructions: recipe.dataValues.intructions,
          diets: arr,
        };
        temporalrecipes_bd2.push(obj);
      });

      // ! Get the recipe properties from the search by term query
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
        return res.status(404).send({ Error: 'No recipes found' });
      return res.status(200).send([...temporalrecipes_bd2, ...temporalrecipes]);
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
    include: { model: Diet },
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  }).catch((err) => {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
  });

  // !Get all recipes (100)
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

  // ! Get the recipes from the database
  recipes_bd2.forEach((recipe) => {
    let arr = [];
    recipe.dataValues.diets.forEach((diet) => arr.push(diet.dataValues.name));
    let obj = {
      id: recipe.dataValues.id,
      name: recipe.dataValues.name,
      summary: recipe.dataValues.summary,
      score: recipe.dataValues.score,
      image: recipe.dataValues.image,
      healthScore: recipe.dataValues.healthScore,
      instructions: recipe.dataValues.instructions,
      diets: arr,
    };
    temporalrecipes_bd.push(obj);
  });
  return res.status(200).send([...temporalrecipes_bd, ...temporalrecipes]);
};

// ***** getById ***** \\

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // ! Make sure the recipe exists and has an UUID
    if (id.includes('-')) {
      let internalRecipe = await Recipe.findOne({
        where: {
          id,
        },
        include: { model: Diet },
      }).catch((err) => {
        console.log('====================================');
        console.log(err);
        console.log('====================================');
      });

      let arr = [];
      internalRecipe.dataValues.diets.forEach((diet) =>
        arr.push(diet.dataValues.name)
      );

      // ! Recipe from the database
      let recipeAttributes = {
        id: internalRecipe.id,
        name: internalRecipe.name,
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

// ***** addRecipe ***** \\

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
      diets,
    });
    const recipeAttributes = {
      name: name,
      summary: summary,
      score: score,
      healthScore: healthScore,
      instructions: instructions,
      diets: diets,
    };
    for (i = 0; i < diets.length; i++) {
      console.log(diets[i]);
      const diet = await Diet.findOne({
        where: {
          name: diets[i],
        },
      });

      newRecipe.addDiets(diet);
    }
    res.json(recipeAttributes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllRecipes,
  getById,
  addRecipe,
};
