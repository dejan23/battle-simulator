const express = require('express');
const Army = require('../controllers/army.controller.js');

const router = express.Router();

router.post('/armies', Army.createArmy);
router.delete('/armies/:armyId/battles/:battleId', Army.removeArmy);

module.exports = router;
