const Battle = (sequelize, Sequelize) => {
	return sequelize.define('battle', {
		status: {
			type: Sequelize.STRING,
			defaultValue: 'waiting for armies',
		},
		winner: {
			type: Sequelize.STRING,
		},
	});
};

export default Battle;
