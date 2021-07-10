const { Router } = require('express');
const { addRecipe } = require('../controllers/recipes');
const router = Router();

//Post
router.post('/', addRecipe);

module.exports = router;
