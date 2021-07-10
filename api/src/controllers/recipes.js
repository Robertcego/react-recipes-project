const Sequelize = require('sequelize');
const { Recipe, Types } = require('../db');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const arr = [];

// Get all the recipes from the api and add them to
// the recipes I create in the post

// Route => /recipes
// function getAllRecipes(req, res, next) {
//   const myRecipe = Recipe.findAll({
//     include: [
//       {
//         model: Types,
//         as: 'diets',
//       },
//     ],
//   });
//   const apiRecipes = axios.get(
//     'https://api.spoonacular.com/recipes/complexSearch?number=10&apiKey=2f5bcb6368314289ad4c1ab24e98c5f7&addRecipeInformation=true'
//   );
//   Promise.all([myRecipe, apiRecipes])
//     .then((results) => {
//       const [myRecipeResults, apiRecipesResults] = results;
//       let externalRecipes = [];
//       apiRecipesResults.data.results.map((recipe) => {
//         let externalRecipe = {};
//         // externalRecipe.id = uuidv4();
//         externalRecipe.id = recipe.id;
//         externalRecipe.name = recipe.title;
//         externalRecipe.image = recipe.image;
//         externalRecipe.diets = recipe.diets;
//         externalRecipes.score = recipe.spoonacularScore;
//         externalRecipes.isExternal = true;
//         externalRecipes.push(externalRecipe);
//       });
//       const response = myRecipeResults.concat(externalRecipes);
//       return res.send(response);
//     })
//     .catch((err) => {
//       next(err);
//     });
// }

// // get recipe by id
// function getById(req, res, next) {
//   const { id } = req.params;
//   console.log(id);
//   const { isExternal } = req.query;
//   console.log(req.query);
//   // return Recipe.findByPk(id)
//   //   .then((recipe) => res.json(recipe))
//   //   .catch((err) => {
//   //     next(err);
//   //   });

//   if (isExternal) {
//     axios
//       .get(
//         `https://api.spoonacular.com/recipes/${id}/information?apiKey=2f5bcb6368314289ad4c1ab24e98c5f7`
//       )
//       .then((response) => {
//         // console.log('====================================');
//         // console.log(response.data);
//         // console.log('====================================');
//         let externalRecipe = {};
//         externalRecipe.name = response.data.title;
//         externalRecipe.image = response.data.image;
//         externalRecipe.diets = response.data.diets;
//         externalRecipe.score = response.data.spoonacularScore;
//         externalRecipe.summary = response.summary;
//         externalRecipe.healthScore = response.data.healthScore;
//         externalRecipe.instructions = response.data.analyzedIntructions;
//         externalRecipe.isExternal = true;
//         res.send(externalRecipe);
//       })
//       .catch((err) => {
//         next(err);
//       });
//   }

//   Recipe.findAll({
//     where: {
//       id: {
//         [Sequelize.Op.eq]: id,
//         // .replace(
//         //   '\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b'
//         // ),
//       },
//     },
//     // include: { model: Types, as: 'diets' },
//   })
//     .then((recipes) => {
//       console.log('====================================');
//       console.log(recipes[0]);
//       console.log('====================================');
//       let recipe = recipes[0];
//       res.send(recipe);
//     })
//     .catch((err) => {
//       next(err);
//     });
// }

// // Route => /recipe

// function addRecipe(req, res, next) {
//   const recipe = req.body;
//   arr.push(recipe);
//   return Recipe.create({
//     ...recipe,
//     // id: uuidv4(),
//   })
//     .then((newRecipe) => res.json(newRecipe))
//     .catch((err) => {
//       next(err);
//     });
// }

// ***** API ***** \\
// const API_KEY = '2f5bcb6368314289ad4c1ab24e98c5f7';
const API_KEY = '0e5262ac39694f468874a21ff9d2602c';

async function getAllRecipes(req, res, next) {
  try {
    if (req.query.name) {
      const name = req.query.name;
      console.log(name);
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
        let temporal_array = [];
        recipe.dataValues.diets.forEach((diet) =>
          temporal_array.push(diet.dataValues.name)
        );
        let obj = {
          id: recipe.dataValues.id,
          name: recipe.dataValues.name,
          summary: recipe.dataValues.summary,
          score: recipe.dataValues.rating,
          healthScore: recipe.dataValues.level_of_healthy,
          instructions: recipe.dataValues.step_by_step,
          diets: temporal_array,
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
    let temporal_array = [];
    console.log('RECIPEEES', recipe);
    recipe.dataValues.diets.forEach((diet) =>
      temporal_array.push(diet.dataValues.name)
    );
    let obj = {
      id: recipe.dataValues.id,
      name: recipe.dataValues.name,
      summary: recipe.dataValues.summary,
      score: recipe.dataValues.rating,
      image: recipe.dataValues.image,
      healthScore: recipe.dataValues.level_of_healthy,
      instructions: recipe.dataValues.step_by_step,
      diets: temporal_array,
    };
    temporalrecipes_bd.push(obj);
  });

  console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', temporalrecipes_bd);
  return res.status(200).json([...temporalrecipes_bd, ...temporalrecipes]);
}

async function getById(req, res, next) {
  try {
    let id = req.params.id;
    console.log(req.params.id);
    if (req.params.id.includes('-')) {
      let recipe_bd = await Recipe.findOne({
        where: {
          id,
        },
        include: { model: Types, as: 'diets' },
      });

      let temporal_array = [];
      recipe_bd.dataValues.diets.forEach((diet) =>
        temporal_array.push(diet.dataValues.name)
      );
      let obj = {
        id: recipe_bd.id,
        title: recipe_bd.name,
        summary: recipe_bd.summary,
        score: recipe_bd.score,
        image: recipe_bd.image,
        healthy_score: recipe_bd.healthScore,
        step: recipe_bd.instructions,
        diets: temporal_array,
      };
      if (!recipe_bd)
        return res.send({ error: 'not founded recipes in database' });
      res.send(obj);
    } else {
      let id = req.params.id;
      let request_params = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );

      let obj_params = {
        id: request_params.data.id,
        title: request_params.data.title,
        image: request_params.data.image,
        summary: request_params.data.summary,
        score: request_params.data.spoonacularScore,
        healthy_score: request_params.data.healthScore,
        step: request_params.data.instructions,
        diets: request_params.data.diets,
      };
      res.json(obj_params);
    }
  } catch (err) {
    next(err);
  }
}

async function addRecipe(req, res, next) {
  try {
    const { name, summary, score, image, healthScore, instructions, diets } =
      req.body;

    let recipebd = await Recipe.create({
      id: uuidv4(),
      name,
      summary,
      image,
      score,
      healthScore,
      instructions,
    });
    const temporal_obj = {
      name: name,
      summary: summary,
      image: image,
      score: score,
      healthScore: healthScore,
      instructions: instructions,
      diets: diets,
    };
    for (i = 0; i < diets.length; i++) {
      const diet_db = await Types.findOne({
        where: {
          name: diets[i],
        },
      });
      recipebd.addDiet(diet_db);
    }
    res.send([temporal_obj]);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllRecipes,
  getById,
  addRecipe,
};
