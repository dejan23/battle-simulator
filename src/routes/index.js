const BattleRoutes = require('./battle.routes');
const ArmyRoutes = require('./army.routes');

const routes = (app) => {
	app.use('/api/battle', BattleRoutes);
	app.use('/api/army', ArmyRoutes);
};

module.exports = routes;
