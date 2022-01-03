const mysql = {
	HOST: '127.0.0.1',
	USER: 'root',
	PASSWORD: 'password',
	DB: 'testdb',
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
	env: process.env.NODE_ENV || 'development',
};

module.exports = {
	base,
	mysql,
};
