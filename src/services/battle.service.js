/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const Queue = require('bull');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const stream = require('stream');
const config = require('../../config/index.js');
const db = require('../models/index.js');
const parseMysqlObject = require('../utils/utils.js');
const { sendMessage } = require('../utils/socket.util.js');
const { HttpNotFound, HttpError, HttpInternalServerError, HttpBadRequest } = require('../utils/errors.util.js');

const dirName = path.resolve(path.dirname(''));

const battleQueue = new Queue('battle queue', { redis: { port: config.redis.port, host: config.redis.host } });
battleQueue.process('battle', 5, path.join(`${dirName}/src/workers/battle.worker.js`));

const Battle = db.battles;

const handleCreateBattle = async () => {
	try {
		return await Battle.create();
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

const handleDeleteBattle = async (data) => {
	try {
		return await Battle.destroy({ where: { id: data.id } });
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

const handleGetAllBattles = async () => {
	try {
		return await Battle.findAll({ include: ['armies'] });
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

const handleGetSingleBattle = async (data) => {
	try {
		const battle = await Battle.findByPk(data.id, {
			include: ['armies'],
		});

		if (!battle) {
			throw new HttpNotFound('Battle with that id does not exist');
		}

		return { battle };
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

const handleStartBattle = async (ids) => {
	try {
		let battles = await Battle.findAll({
			where: { status: 'in progress' },
		});

		battles = parseMysqlObject(battles);

		if (battles.length) {
			throw new HttpError('There are battles in progress, please wait');
		}

		battles = await Battle.findAll({
			where: { id: ids, status: 'ready' },
			include: {
				association: 'armies',
			},
		});

		if (!battles.length) {
			throw new HttpError('No battles found');
		}

		battles = parseMysqlObject(battles);

		const battleIds = [];

		for (let i = 0; i < battles.length; i += 1) {
			await battleQueue.add('battle', {
				armies: battles[i].armies,
			});

			sendMessage('progress', 'update');

			battleIds.push(battles[i].id);
		}

		await Battle.update({ status: 'in progress' }, { where: { id: battleIds } });

		battleQueue.on('completed', () => {
			sendMessage('progress', 'update');
		});

		return true;
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

const readLines = ({ input }) => {
	const output = new stream.PassThrough({ objectMode: true });
	const rl = readline.createInterface({ input });
	rl.on('line', (line) => {
		output.write(line);
	});
	rl.on('close', () => {
		output.push(null);
	});
	return output;
};

const handleGetBattleLog = async ({ id }) => {
	const filePath = path.join(`${dirName}/src/logs/battles/battle-${id}.txt`);

	if (!fs.existsSync(filePath)) {
		throw new HttpBadRequest('Log file not found');
	}
	const input = fs.createReadStream(filePath);

	const battleLog = [];

	for await (const line of readLines({ input })) {
		battleLog.push(JSON.parse(line));
	}

	return { battleLog };
};

// not in use
const pauseBattle = async (id) => {
	await battleQueue.pause();
	await Battle.update({ status: 'paused' }, { where: { id } });
};

// not in use
const resumeBattle = async (id) => {
	await battleQueue.resume();
	await Battle.update({ status: 'in progress' }, { where: { id } });
};

module.exports = {
	handleCreateBattle,
	handleDeleteBattle,
	handleGetAllBattles,
	handleGetSingleBattle,
	handleStartBattle,
	handleGetBattleLog,
	pauseBattle,
	resumeBattle,
};
