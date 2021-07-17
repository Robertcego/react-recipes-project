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
// const API_KEY = 'ae481a929f3a482e888842470383726f';
// const API_KEY = 'e63d396d22ff46d58f9347d997dbe1e0';
// const API_KEY = '638b58a40c3344bebe9e4d44b52b083c';
// const API_KEY = '1f554d43be8746f89ad35d052160c0eb';
// const API_KEY = '044ea3e089db4849920884a51ed83add';
// const API_KEY = '7198aa54902d4f7b8800b87cd3f3eb96';
// const API_KEY = '0f1cc946d524471f8699a26de042da04'; // <---
// const API_KEY = 'ec6f9c2db72b4c87adb779e34ab86d1b';
// const API_KEY = 'cf9249384cbc4867b3131e7ab75a7037';
// const API_KEY = '0d9677907f744e3c8b5158c8e4d7cfd4';
// const API_KEY = '325a7fb4a69e4548b376fd4c4093934f';
// const API_KEY = '9b1c6d5760ca44a0a94ce2c35c91c159';
// const API_KEY = '2b9c90b703b942c5bf2a255e90406bf3';
// const API_KEY = 'a333439908d84f7a8d70f13dd1c58f1b';
// const API_KEY = '9ff6097fa58e4dfe9cedaab87903cbf1';
// const API_KEY = '53ab6e71493e44018e59123d6d7a334c';
const API_KEY = '810221e35af9434fa51c1f9b9208288b';
// const API_KEY = 'f82367cf3574481aa9b0f9c27d225015';
// const API_KEY = 'ff755847d8b44e34b25a6381c5ef035d';

// ***** getAllRecipes ***** \\

const getRecipesName = async (req, res, next) => {
  const { name } = req.query;
  try {
    const apiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`
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
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
      include: Diet,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    if (dbRecipes.length === 0) {
      let recipeResults = apiRecipesAttributes;

      console.log(apiRecipesAttributes);
      if (apiRecipesAttributes.length === 0) {
        return res.status(404).send('Recipes not found');
      }
      return res.send(recipeResults);
    } else {
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
      let allRecipes = dataResponse.concat(apiRecipesAttributes);

      return res.send(allRecipes);
    }
  } catch (err) {
    console.log('====================================');
    console.log(err);
    console.log('====================================');
    next(err);
  }
};

const getAllRecipes = async (req, res, next) => {
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

// ***** getById ***** \\

const getById = async (req, res, next) => {
  try {
    // ! If we are looking for a local recipe
    //! First look at the database for the recipe
    const { id } = req.params;
    if (id.includes('-')) {
      // ! Make sure the recipe exists and has an UUID
      // ! Assign that recipe to the variable
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

      // ! Get the diet values from the recipe we need, the one that matches the UUID
      let arr = [];
      dbRecipe.dataValues.diets.forEach((diet) =>
        arr.push(diet.dataValues.name)
      );

      // ! Assign the dbRecipe values to a new variable
      // ! Along with the diet values
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

      // ! If theres no recipe in the database
      if (!dbRecipe) return res.send({ Error: 'Recipe not found.' });
      // ! Send the recipe back to the user
      res.send(recipeAttributes);
    }
    // ! Now we look at the API for the external recipe
    else {
      const { id } = req.params;
      let apiRecipe = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );

      // ! Filter only the values we need
      // ! From the API response

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
      // ! Finally send the recipe back to the user
      // ! With the values we want
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
    // ! Get the request values
    const { name, summary, score, healthScore, instructions, diets } = req.body;

    // ! Now we create a new recipe
    // ! Assign the values we got from the request
    let newRecipe = await Recipe.create({
      id: uuidv4(),
      name,
      summary,
      score,
      healthScore,
      instructions,
    });

    // ! If we have a diet value
    // ! Add it to the recipe
    // ! Through the related diet model: recipeType
    for (i = 0; i < diets.length; i++) {
      await newRecipe.addDiet(diets[i], { through: 'recipeType' });
    }

    // ! Send the recipe back to the user
    // ! Whose name is the same as the request
    // ! With the new recipe
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

module.exports = {
  getAllRecipes,
  getRecipesName,
  getById,
  addRecipe,
};
