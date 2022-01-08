const { createLogger, format, transports } = require('winston');
const { combine, timestamp, json } = format;

const battleLogger = function (fileName) {
	return createLogger({
		defaultMeta: { component: 'battle-service' },
		format: combine(
			timestamp({
				format: 'YYYY-MM-DD HH:mm:ss',
			}),
			json()
		),
		transports: [
			new transports.File({
				filename: `./src/logs/battles/${fileName}`,
				options: { flags: 'w' },
			}),
		],
	});
};
module.exports = battleLogger;
