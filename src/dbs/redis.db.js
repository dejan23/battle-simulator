const Redis = require('ioredis');
const config = require('../config');

function connectionString() {
	let protocol = 'redis';

	if (config.redis.tls === 'true') {
		protocol = 'rediss';
	}

	let uri = config.redis.host;
	if (config.redis.port) {
		uri += `':'${config.redis.port}`;
	}

	return `${protocol}://${config.redis.user}:${config.redis.pass}@${uri}/${config.redis.db}`;
}

function connectionQueueData() {
	return {
		redis: {
			port: config.redis.port,
			host: config.redis.host,
			username: config.redis.user,
			password: config.redis.pass,
			db: config.redis.db || 0,
			tls: config.redis.tls === 'true' ? {} : undefined,
		},
	};
}

function connect() {
	return new Redis();
}

module.exports = {
	connect,
	connectionString,
	connectionQueueData,
};
