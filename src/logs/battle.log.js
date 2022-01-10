import { createLogger, format, transports } from 'winston';

const { combine, timestamp, json } = format;

const battleLogger = (fileName) => {
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

export default battleLogger;
