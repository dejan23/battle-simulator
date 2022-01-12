/* eslint-disable no-await-in-loop */
const path = require('path');
const rimraf = require('rimraf');
// do not deconstruct
const battleService = require('../services/battle.service.js');
const idValidation = require('../schemas/battle.schema.js');
const db = require('../models/index.js');
const { sendMessage } = require('../utils/socket.util.js');

const dirName = path.resolve(path.dirname(''));

const Battle = db.battles;
const Army = db.armies;

const createBattle = async (req, res) => res.send(await battleService.handleCreateBattle());

const deleteBattle = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.body);
		await battleService.handleDeleteBattle(data);
		return res.send();
	} catch (error) {
		return next(error);
	}
};

const fetchAllBattles = async (req, res) => res.send(await battleService.handleGetAllBattles());

const fetchSingleBattle = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.query);

		return res.send(await battleService.handleGetSingleBattle(data));
	} catch (error) {
		return next(error);
	}
};

// TODO move to new GAME controller
const start = async (req, res, next) => {
	// need to do validaiton on ids
	// try {
	let { ids } = req.query;

	ids = ids.split(',');

	// await startBattleValidation.validateAsync(req.query);

	await battleService.handleStartBattle(ids);

	return res.send({ message: 'Game started' });
	// } catch (error) {
	// 	return next(error);
	// }
};

const fetchSingleBattleLog = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.query);

		return res.send(await battleService.handleGetBattleLog(data));
	} catch (error) {
		return next(error);
	}
};

const percantage = (value, outOff) => (value * 100) / outOff;

const randomNumGenerator = (min = 80, max = 100) => Math.floor(Math.random() * (max - min + 1) + min);

// TO:DO CONSTANTS
const strategy = ['random', 'strongest', 'weakest'];

const seed = async (req, res) => {
	const count = 20;
	await db.sequelize.sync({ force: true });

	// delete all logs
	rimraf.sync(path.join(`${dirName}../logs/battles/*`));

	for (let i = 1; i <= count; i += 1) {
		const battle = await Battle.create();

		for (let j = 1; j <= 5; j += 1) {
			const units = randomNumGenerator();

			await Army.create({
				name: `Army ${j}`,
				units,
				initUnits: units,
				strategy: strategy[randomNumGenerator(0, 2)],
				battleId: battle.id,
			});

			await Battle.update({ status: 'ready' }, { where: { id: battle.id } });
		}

		sendMessage('reload', percantage(i, count));
	}

	return res.send({ msg: `Created ${count} battles` });
};

module.exports = { createBattle, deleteBattle, fetchAllBattles, fetchSingleBattle, fetchSingleBattleLog, start, seed };
