import * as config from '../config/index.js';
import db from '../models/index.js';

const connectToMysql = async () => {
	try {
		await db.sequelize.query(
			`CREATE DATABASE IF NOT EXISTS \`${config.mysql.dbName}\`;`
		);

		await db.sequelize.sync({ force: false });
		// console.log('Drop and re-sync db.');

		await db.sequelize.authenticate();
		console.log('Connection to mysql has been established successfully.');
	} catch (error) {
		console.log({ message: 'Could not connect to db', error });
	}
};

export { connectToMysql };
