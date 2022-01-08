const router = require('express').Router();
const battle = require('../controllers/battle.controller');

router.post('/create', battle.create);
router.post('/delete', battle.delete);
router.get('/', battle.getAll);
router.get('/single', battle.getSingle);
router.get('/log', battle.getBattleLog);
router.get('/start', battle.start);
router.get('/pause', battle.pause);
router.get('/resume', battle.resume);

module.exports = router;
