const { Diet } = require('../db.js');
const axios = require('axios');

// ** Api Keys ** \\
// const API_KEY = '2f5bcb6368314289ad4c1ab24e98c5f7';
// const API_KEY = '0e5262ac39694f468874a21ff9d2602c';
// const API_KEY = '231c716f75a4423498273c687d9a515d';
// const API_KEY = 'b95031f742694550ac1254dc10ce554e';
const API_KEY = '337a3948a09a4db69a2a549e4a9389e9';
// const API_KEY = 'ae481a929f3a482e888842470383726f';
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

const getAllTypes = async (req, res, next) => {
  // return Diet.findAll()
  //   .then((type) => {
  //     console.log(type);
  //     res.json(type);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     next(err);
  //   });
  try {
    const dietsData = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
    );
    var dietTypes = [];

    await dietsData.data.results.forEach((result) => {
      result.diets.forEach((result) => {
        if (!dietTypes.includes(result)) {
          dietTypes.push(result);
        }
      });
    });
    for (let i = 0; i < dietTypes.length; i++) {
      await Diet.findOrCreate({
        where: {
          name: dietTypes[i],
        },
      });
    }
    let dietResults = await Diet.findAll();
    res.send(dietResults);
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTypes };
