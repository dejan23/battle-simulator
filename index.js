import * as config from './src/config/index.js';
import { app } from './src/app.js';
import { connectToMysql } from './src/dbs/mysql.db.js';

const { port } = config.base;

function start() {
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}.`);
	});

	connectToMysql();
}

start();
