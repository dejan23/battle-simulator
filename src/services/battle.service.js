/* eslint-disable no-await-in-loop */

const Queue = require('bull');
const config = require('../config');
const db = require('../models');
const utils = require('../utils/utils');
const { sendMessage } = require('../utils/socket.util');
const {
	HttpNotFound,
	HttpError,
	HttpInternalServerError,
} = require('../utils/errors.util');

const battleQueue = new Queue('battle queue', config.redis.host);
battleQueue.process('battle', 5, `${__dirname}/../workers/battle.worker.js`);

const Battle = db.battles;

exports.handleCreateBattle = async () => {
	try {
		return await Battle.create();
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

exports.handleDeleteBattle = async (data) => {
	try {
		return await Battle.destroy({ where: { id: data.id } });
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

exports.handleGetAllBattles = async () => {
	try {
		return await Battle.findAll({ include: ['armies'] });
	} catch (error) {
		throw new HttpInternalServerError();
	}
};

exports.handleGetSingleBattle = async (data) => {
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

exports.handleStartBattle = async (ids) => {
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

// not in use
exports.pauseBattle = async (id) => {
	await battleQueue.pause();
	await Battle.update({ status: 'paused' }, { where: { id } });
};

// not in use
exports.resumeBattle = async (id) => {
	await battleQueue.resume();
	await Battle.update({ status: 'in progress' }, { where: { id } });
};
