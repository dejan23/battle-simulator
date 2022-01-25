const express = require('express');
const battle = require('../controllers/battle.controller.js');

const router = express.Router();

router.get('/battles/start', battle.start);
router.get('/battles/seed', battle.seed);

router.get('/battles', battle.fetchAllBattles);
router.post('/battles', battle.createBattle);
router.delete('/battles/:id', battle.deleteBattle);
router.get('/battles/:id', battle.fetchSingleBattle);
router.get('/battles/:id/log', battle.fetchSingleBattleLog);

module.exports = router;
