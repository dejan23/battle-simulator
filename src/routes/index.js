import BattleRoutes from './battle.routes.js';
import ArmyRoutes from './army.routes.js';

const routes = (app) => {
	app.use('/api/battle', BattleRoutes);
	app.use('/api/army', ArmyRoutes);
};

export default routes;
