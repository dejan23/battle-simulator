const dotenv = require('dotenv');
const database = require('./database.cjs');

dotenv.config();

const mysql = database[process.env.NODE_ENV || 'development'];

const base = {
	port: process.env.NODE_PORT || 5000,
	env: process.env.NODE_ENV || 'development',
};

const redis = {
	host: process.env.REDIS_HOST || '127.0.0.1',
	port: process.env.REDIS_PORT || '6379',
};

const socket = {
	origin: process.env.SOCKET_ORIGIN || '*',
	port: process.env.SOCKET_PORT || 5001,
};

module.exports = { base, mysql, redis, socket };
