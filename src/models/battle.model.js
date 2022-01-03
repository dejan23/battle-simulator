module.exports = (sequelize, Sequelize) => {
	const Battle = sequelize.define('battle', {
		status: {
			type: Sequelize.STRING,
			defaultValue: 'waiting for armies',
		},
		winner: {
			type: Sequelize.STRING,
		},
		group: {
			type: Sequelize.STRING,
		},
	});

	return Battle;
};
