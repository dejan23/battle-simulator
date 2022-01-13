const mysql = require('mysql2');
const config = require('../../config/index.js');

const connectToMysql = async () => {
	try {
		const connection = mysql.createConnection({
			host: config.mysql.host,
			user: config.mysql.username,
			password: config.mysql.password,
		});

		connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.mysql.database}\`;`);

		console.log(`Connection to mysql database "${config.mysql.database}" has been established successfully.`);
	} catch (error) {
		console.log({ message: 'Could not connect to db', error });
	}
};

module.exports = connectToMysql;
