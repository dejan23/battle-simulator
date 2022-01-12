const { Sequelize } = require('sequelize');
const config = require('../../config/index.js');
const Army = require('./army.model.js');
const Battle = require('./battle.model.js');

const sequelize = new Sequelize.Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
	host: config.mysql.host,
	dialect: config.mysql.dialect,
	logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.armies = Army(sequelize, Sequelize);
db.battles = Battle(sequelize, Sequelize);

db.battles.hasMany(db.armies, { as: 'armies' });
db.armies.belongsTo(db.battles, {
	foreignKey: 'battleId',
	as: 'battle',
});

module.exports = db;
