const { Diet } = require('../db.js');

function getAllTypes(req, res, next) {
  return Diet.findAll()
    .then((type) => {
      console.log(type);
      res.json(type);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

module.exports = { getAllTypes };
