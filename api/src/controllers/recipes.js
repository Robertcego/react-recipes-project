const Sequelize = require('sequelize');
const { Recipe, Diet } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
// const arr = [];

// Get all the recipes from the api and add them to
// the recipes I create in the post

const API_KEY = process.env.API_KEY;

// ****** Get Recipes by Name ****** \\

const getRecipesName = async (req, res, next) => {
  const { name } = req.query;
  try {
    // ! Make the request to the API
    const apiRecipes = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${name}&number=9&addRecipeInformation=true&apiKey=${API_KEY}`
    );

    // ! Declare an empty array to hold
    // ! the recipe values that I need from the api
    const apiRecipesAttributes = [];

    // ! Get the values that I need to work from the response
    for (let i = 0; i < apiRecipes.data.results.length; i++) {
      // ! Define the attributes that I need from the api
      // ! Through an object
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

      // ! Push that object to the array
      apiRecipesAttributes.push(apiRecipe);
    }

    // ! Now I take a look at the database
    // ! to see if it has recipes
    const dbRecipes = await Recipe.findAll({
      where: {
        name: {
          [Sequelize.Op.iLike]: `%${name}%`,
        },
      },
      include: Diet,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    // ! If there are no recipes in the database
    if (dbRecipes.length === 0) {
      // ! Define a new variable and assign it
      // ! to the array of recipes from the api
      let recipeResults = apiRecipesAttributes;

      // ! If there are recipes in the api call
      if (apiRecipesAttributes.length === 0) {
        return res.status(404).send('Recipes not found');
      }
      // ! Else send the recipes from the api
      return res.send(recipeResults);
    } else {
      // ! Now, If I have recipes in the database
      // ! Define a new array to hold the recipes
      let dataResponse = [];

      // ! Loop through the recipes in the database
      for (let i = 0; i < dbRecipes.length; i++) {
        // ! Define a variable
        // !to hold the diets from the database recipe
        let diets = [];

        // ! Loop through the diets in the database recipe
        // ! and push them into the diets array
        dbRecipes[i].diets.map((diet) => diets.push(diet.name));

        // ! Now I that I have the diets array
        // ! I can create the object that will be sent
        // ! to the user call with the recipes from the database
        let dbResponse = {
          id: dbRecipes[i].id,
          name: dbRecipes[i].name,
          summary: dbRecipes[i].summary,
          score: dbRecipes[i].score,
          healthScore: dbRecipes[i].healthScore,
          instructions: dbRecipes[i].instructions,
          diets: diets,
        };

        // ! Push the object to the array that will be sent
        dataResponse.push(dbResponse);
      }

      // ! Now that both api and database recipes
      // ! I concat then into a single array
      // ! and send it to the user
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

// ****** Get All Recipes ****** \\

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
    // ? If we are looking for a local recipe
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
      let diets = [];
      dbRecipe.dataValues.diets.forEach((diet) =>
        diets.push(diet.dataValues.name)
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
        diets: diets,
      };

      // ! If theres no recipe in the database
      if (!dbRecipe) return res.send({ Error: 'Recipe not found.' });
      // ! Send the recipe back to the user
      res.send(recipeAttributes);
    }
    // ? If we are looking for an api recipe
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
