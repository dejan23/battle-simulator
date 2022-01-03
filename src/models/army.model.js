module.exports = (sequelize, Sequelize) => {
	const Army = sequelize.define('army', {
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

	return Army;
};
