const Army = (sequelize, Sequelize) =>
	sequelize.define('army', {
		name: {
			type: Sequelize.STRING,
		},
		initUnits: {
			type: Sequelize.FLOAT,
		},
		units: {
			type: Sequelize.FLOAT,
		},
		strategy: {
			type: Sequelize.STRING,
		},
		winner: {
			type: Sequelize.BOOLEAN,
			defaultValue: false,
		},
	});

module.exports = Army;
