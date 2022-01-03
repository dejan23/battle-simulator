const db = require('../models');

async function connectToMysql() {
	try {
		await db.sequelize.sync({ force: false });
		// console.log('Drop and re-sync db.');

		await db.sequelize.authenticate();
		console.log('Connection to mysql has been established successfully.');
	} catch (error) {
		console.log({ message: 'Could not connect to db', error });
	}
}

module.exports = {
	connectToMysql,
};
