const config = require('./src/config');
const { app } = require('./src/app');
const { connectToMysql } = require('./src/dbs/mysql.db');

const { port } = config.base;

function start() {
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}.`);
	});

	connectToMysql();
}

start();
