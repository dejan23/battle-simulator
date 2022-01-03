const router = require('express').Router();
const Army = require('../controllers/army.controller');

module.exports = (app) => {
	// Create a new Army
	router.post('/create', Army.create);
	router.post('/delete', Army.delete);

	app.use('/api/army', router);
};
