const db = require('../models/index.js');

const connectToMysql = async () => {
	try {
		await db.sequelize.sync({ force: false });

		await db.sequelize.authenticate();
		console.log(`Connection to mysql database "${process.env.MYSQLDB_DATABASE}" has been established successfully.`);
	} catch (error) {
		console.log({ message: 'Could not connect to db', error });
	}
};

module.exports = connectToMysql;
