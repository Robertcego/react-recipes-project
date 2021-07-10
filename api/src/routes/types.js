const { Router } = require('express');
const router = Router();

const { getAllTypes } = require('../controllers/types');

router.get('/', getAllTypes);

module.exports = router;
