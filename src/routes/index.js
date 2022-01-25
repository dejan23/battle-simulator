const BattleRoutes = require('./battle.routes.js');
const ArmyRoutes = require('./army.routes.js');
const { HttpNotFound } = require('../utils/errors.util.js');

const routes = (app) => {
	app.use('/api/v1', BattleRoutes);
	app.use('/api/v1', ArmyRoutes);
	app.get('/api/v1/health', (req, res) => res.json({ status: 'ok' }));
	app.get('*', (req, res, next) => {
		next(new HttpNotFound());
	});
};

module.exports = routes;
