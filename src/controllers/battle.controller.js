/* eslint-disable no-await-in-loop */
const path = require('path');
const rimraf = require('rimraf');
const battleService = require('../services/battle.service.js');
const idValidation = require('../schemas/battle.schema.js');
const db = require('../models/index.js');
const { sendMessage } = require('../utils/socket.util.js');
const { strategies } = require('../utils/constants.utis.js');

const dirName = path.resolve(path.dirname(''));

const Battle = db.battles;
const Army = db.armies;

const createBattle = async (req, res) => res.json(await battleService.handleCreateBattle());

const deleteBattle = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.params);

		await battleService.handleDeleteBattle(data);

		return res.json({ msg: 'Battle is deleted' });
	} catch (error) {
		return next(error);
	}
};

const fetchAllBattles = async (req, res) => res.json(await battleService.handleGetAllBattles());

const fetchSingleBattle = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.params);

		return res.json(await battleService.handleGetSingleBattle(data));
	} catch (error) {
		return next(error);
	}
};

// TODO move to new GAME controller
const start = async (req, res, next) => {
	console.log('here');
	// need to do validaiton on ids
	try {
		let { ids } = req.query;

		ids = ids.split(',');

		// await startBattleValidation.validateAsync(req.query);

		await battleService.handleStartBattle(ids);

		return res.json({ msg: 'Game started' });
	} catch (error) {
		return next(error);
	}
};

const fetchSingleBattleLog = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.params);

		return res.json(await battleService.handleGetBattleLog(data));
	} catch (error) {
		return next(error);
	}
};

const percantage = (value, outOff) => (value * 100) / outOff;

const randomNumGenerator = (min = 80, max = 100) => Math.floor(Math.random() * (max - min + 1) + min);

const seed = async (req, res) => {
	console.log('here');
	const count = 20;
	await db.sequelize.sync({ force: true });

	// delete all logs
	rimraf.sync(path.join(`${dirName}/src/logs/battles/*`));

	for (let i = 1; i <= count; i += 1) {
		const battle = await Battle.create();

		for (let j = 1; j <= 5; j += 1) {
			const units = randomNumGenerator();

			await Army.create({
				name: `Army ${j}`,
				units,
				initUnits: units,
				strategy: strategies[randomNumGenerator(0, 2)],
				battleId: battle.id,
			});

			await Battle.update({ status: 'ready' }, { where: { id: battle.id } });
		}

		sendMessage('reload', percantage(i, count));
	}

	return res.json({ msg: `Created ${count} battles` });
};

module.exports = { createBattle, deleteBattle, fetchAllBattles, fetchSingleBattle, fetchSingleBattleLog, start, seed };
