const express = require('express');
const Army = require('../controllers/army.controller.js');

const router = express.Router();

router.post('/create', Army.createArmy);
router.delete('/delete', Army.removeArmy);

module.exports = router;
