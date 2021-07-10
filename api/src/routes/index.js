const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// const express = require('express');
const router = Router();

const recipesRoute = require('./recipes');
const typesRoute = require('./types');
const postRecipeRoute = require('./postRecipe');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRoute);
router.use('/types', typesRoute);
router.use('/recipe', postRecipeRoute);

// Home
router.get('/', (_req, res) => {
  res.send('Hello World!');
});

module.exports = router;
