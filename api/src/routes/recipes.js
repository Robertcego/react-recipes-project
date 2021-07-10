const { Router } = require('express');
const router = Router();

const { getAllRecipes, getById } = require('../controllers/recipes');

router.get('/', getAllRecipes);
router.get('/:id', getById);

module.exports = router;
