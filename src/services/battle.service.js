/* eslint-disable no-await-in-loop */

import Queue from 'bull';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import * as config from '../config/index.js';
import db from '../models/index.js';
import utils from '../utils/utils.js';
import { sendMessage } from '../utils/socket.util.js';
import {
	HttpNotFound,
	HttpError,
	HttpInternalServerError,
	HttpBadRequest,
} from '../utils/errors.util.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const battleQueue = new Queue('battle queue', config.redis.host);
battleQueue.process('battle', 5, `${__dirname}/../workers/battle.worker.js`);

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

		battles = utils.parseMysqlObject(battles);

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

		battles = utils.parseMysqlObject(battles);

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

const handleGetBattleLog = async ({ id }) => {
	const filePath = path.join(__dirname, `../logs/battles/battle-${id}.txt`);

	if (!fs.existsSync(filePath)) {
		throw new HttpBadRequest('Log file not found');
	}

	const reader = readline.createInterface({
		input: fs.createReadStream(filePath),
	});

	const battleLog = [];

	reader.on('line', (line) => {
		return battleLog.push(JSON.parse(line));
	});

	reader.on('close', () => {
		return { battleLog };
	});
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

export {
	handleCreateBattle,
	handleDeleteBattle,
	handleGetAllBattles,
	handleGetSingleBattle,
	handleStartBattle,
	handleGetBattleLog,
	pauseBattle,
	resumeBattle,
};
