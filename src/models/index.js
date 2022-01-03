const { Sequelize } = require('sequelize').Sequelize;
const config = require('../config');

const sequelize = new Sequelize(
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

db.armies = require('./army.model')(sequelize, Sequelize);
db.battles = require('./battle.model')(sequelize, Sequelize);

db.battles.hasMany(db.armies, { as: 'armies' });
db.armies.belongsTo(db.battles, { foreignKey: 'battleId', as: 'battle' });

module.exports = db;
