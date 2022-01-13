const BattleRoutes = require('./battle.routes.js');
const ArmyRoutes = require('./army.routes.js');
const { HttpNotFound } = require('../utils/errors.util.js');

const routes = (app) => {
	app.use('/api/battle', BattleRoutes);
	app.use('/api/army', ArmyRoutes);
	app.get('/health', (req, res) => res.json({ status: 'ok' }));
	app.get('*', (req, res, next) => {
		next(new HttpNotFound());
	});
};

module.exports = routes;
