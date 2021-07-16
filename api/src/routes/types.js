const { Router } = require('express');
const router = Router();

const { getAllDiets } = require('../controllers/diets');

router.get('/', getAllDiets);

module.exports = router;
