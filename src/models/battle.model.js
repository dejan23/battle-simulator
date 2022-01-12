const Battle = (sequelize, Sequelize) =>
	sequelize.define('battle', {
		status: {
			type: Sequelize.STRING,
			defaultValue: 'waiting for armies',
		},
		winner: {
			type: Sequelize.STRING,
		},
	});

module.exports = Battle;
