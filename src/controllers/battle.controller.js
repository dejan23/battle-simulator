const db = require('../models');
const {
	handleCreateBattle,
	handleDeleteBattle,
	handleGetAllBattles,
	handleGetSingleBattle,
	handleStartBattle,
	pauseBattle,
	resumeBattle,
	handleGetBattleLog,
} = require('../services/battle.service');
const {
	deleteBattleValidation,
	getSingleBattleValidation,
	startBattleValidation,
	idValidation,
} = require('../schemas/battle.schema');

const Battle = db.battles;

// Create a new Battle
exports.create = async (req, res) => {
	return res.send(await handleCreateBattle());
};

exports.delete = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.body);
		await handleDeleteBattle(data);
		return res.send();
	} catch (error) {
		return next(error);
	}
};

exports.getAll = async (req, res) => {
	return res.send(await handleGetAllBattles());
};

exports.getSingle = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.query);

		return res.send(await handleGetSingleBattle(data));
	} catch (error) {
		return next(error);
	}
};

exports.start = async (req, res, next) => {
	// need to do validaiton on ids
	try {
		let { ids } = req.query;

		ids = ids.split(',');

		// await startBattleValidation.validateAsync(req.query);

		await handleStartBattle(ids);

		return res.send({ message: 'Game started' });
	} catch (error) {
		return next(error);
	}
};

exports.getBattleLog = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.query);

		return res.send(await handleGetBattleLog(data));
	} catch (error) {
		return next(error);
	}
};

// pause or resume processes in queue but not in use
exports.pause = async (req, res) => {
	await pauseBattle(req.query.id);

	return res.send();
};

exports.resume = async (req, res) => {
	await resumeBattle(req.query.id);

	return res.send();
};
