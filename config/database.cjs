const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	development: {
		username: process.env.MYSQLDB_USERNAME,
		password: process.env.MYSQLDB_PASSWORD,
		database: process.env.MYSQLDB_DATABASE,
		host: process.env.MYSQLDB_HOST,
		dialect: 'mysql',
		dialectOptions: {
			bigNumberStrings: true,
		},
	},
	test: {},
	production: {},
};
