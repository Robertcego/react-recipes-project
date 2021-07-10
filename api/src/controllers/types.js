// const server = require('express').Router();
const { Types } = require('../db.js');

function getAllTypes(req, res, next) {
  return Types.findAll()
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
