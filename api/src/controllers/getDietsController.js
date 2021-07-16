const { Diet } = require('../db.js');
const axios = require('axios');

const API_KEY = process.env.API_KEY;

const getAllTypes = async (req, res, next) => {
  try {
    const apiData = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    let allDiets = [];

    await apiData.data.results.forEach((result) => {
      result.diets.forEach((diet) => {
        if (!allDiets.includes(diet)) {
          allDiets.push(diet);
        }
      });
    });
    for (let i = 0; i < allDiets.length; i++) {
      await Diet.findOrCreate({
        where: {
          name: allDiets[i],
        },
      });
    }
    let dietResults = await Diet.findAll();
    res.send(dietResults);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTypes };
