const router = require('express').Router();
const battle = require('../controllers/battle.controller');

module.exports = (app) => {
	// Create a new Battle
	router.post('/create', battle.create);
	router.post('/delete', battle.delete);
	router.get('/', battle.getAll);
	router.get('/single', battle.getSingle);
	router.get('/start', battle.start);
	router.get('/pause', battle.pause);
	router.get('/resume', battle.resume);

	app.use('/api/battle', router);
};
