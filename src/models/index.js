import { Sequelize } from 'sequelize';
import * as config from '../config/index.js';
import Army from './army.model.js';
import Battle from './battle.model.js';

const sequelize = new Sequelize.Sequelize(
	config.mysql.dbName,
	config.mysql.user,
	config.mysql.password,
	{
		host: config.mysql.host,
		dialect: config.mysql.dialect,
		operatorsAliases: 0,
		pool: {
			max: config.mysql.pool.max,
			min: config.mysql.pool.min,
			acquire: config.mysql.pool.acquire,
			idle: config.mysql.pool.idle,
		},
		logging: false,
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.armies = Army(sequelize, Sequelize);
db.battles = Battle(sequelize, Sequelize);

db.battles.hasMany(db.armies, { as: 'armies' });
db.armies.belongsTo(db.battles, { foreignKey: 'battleId', as: 'battle' });

export default db;
