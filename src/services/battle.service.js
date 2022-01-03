/* eslint-disable no-await-in-loop */

const Queue = require('bull');
const db = require('../models');
const utils = require('../utils/utils');
const { sendMessage } = require('../utils/socket.util');

const battleQueue = new Queue('battle queue', 'redis://127.0.0.1:6379');
battleQueue.process('battle', 5, `${__dirname}/battle.js`);

const Battle = db.battles;

exports.startBattle = async (ids) => {
	let battles = await Battle.findAll({
		where: { status: 'in progress' },
	});

	battles = utils.parseMysqlObject(battles);

	if (battles.length) {
		return { error: 'There are battles in progress, please wait' };
	}

	battles = await Battle.findAll({
		where: { id: ids, status: 'ready' },
		include: {
			association: 'armies',
		},
	});

	if (!battles.length) return { error: true, msg: 'No battles found' };

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
};

exports.pauseBattle = async (id) => {
	await battleQueue.pause();
	await Battle.update({ status: 'paused' }, { where: { id } });
};

exports.resumeBattle = async (id) => {
	await battleQueue.resume();
	await Battle.update({ status: 'in progress' }, { where: { id } });
};
