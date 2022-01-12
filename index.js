const config = require('./config/index.js');
const app = require('./src/app.js');
const connectToMysql = require('./src/dbs/mysql.db.js');

const { port } = config.base;

function start() {
	app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}.`);
	});

	connectToMysql();
}

start();
