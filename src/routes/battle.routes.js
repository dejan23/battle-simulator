const express = require('express');
const battle = require('../controllers/battle.controller.js');

const router = express.Router();

router.post('/create', battle.createBattle);
router.post('/delete', battle.deleteBattle);
router.get('/', battle.fetchAllBattles);
router.get('/single', battle.fetchSingleBattle);
router.get('/single/:id/log', battle.fetchSingleBattleLog);
router.get('/start', battle.start);
// router.get('/pause', battle.pause);
// router.get('/resume', battle.resume);
router.get('/seed', battle.seed);

module.exports = router;
