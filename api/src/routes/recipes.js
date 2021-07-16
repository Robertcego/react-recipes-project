const { Router } = require('express');
const router = Router();

const {
  getAllRecipes,
  getRecipesName,
  getById,
} = require('../controllers/recipes');

router.get('/', getAllRecipes);
router.get('/search', getRecipesName);
router.get('/:id', getById);

module.exports = router;
