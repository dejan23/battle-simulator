const mysql = {
	host: '127.0.0.1',
	user: 'root',
	password: 'password',
	dbName: 'battlesimulator',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};

const base = {
	port: process.env.PORT || 5000,
	socketPort: process.env.SOCKET_PORT || 5001,
	clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
	env: process.env.NODE_ENV || 'development',
};

const redis = {
	host: process.env.REDIS_HOST || 'redis://127.0.0.1:6379',
};

module.exports = {
	base,
	mysql,
	redis,
};
