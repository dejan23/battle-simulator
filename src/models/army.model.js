module.exports = (sequelize, Sequelize) => {
	const Army = sequelize.define('army', {
		name: {
			type: Sequelize.STRING,
		},
		units: {
			type: Sequelize.FLOAT,
		},
		strategy: {
			type: Sequelize.STRING,
		},
	});

	return Army;
};
