// do not deconstruct
import {
	handleCreateBattle,
	handleDeleteBattle,
	handleGetAllBattles,
	handleGetSingleBattle,
	handleStartBattle,
	pauseBattle,
	resumeBattle,
	handleGetBattleLog,
} from '../services/battle.service.js';
import { idValidation } from '../schemas/battle.schema.js';

const createBattle = async (req, res) => {
	return res.send(await handleCreateBattle());
};

const deleteBattle = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.body);
		await handleDeleteBattle(data);
		return res.send();
	} catch (error) {
		return next(error);
	}
};

const fetchAllBattles = async (req, res) => {
	return res.send(await handleGetAllBattles());
};

const fetchSingleBattle = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.query);

		return res.send(await handleGetSingleBattle(data));
	} catch (error) {
		return next(error);
	}
};

// TODO move to new GAME controller
const start = async (req, res, next) => {
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

const fetchSingleBattleLog = async (req, res, next) => {
	try {
		const data = await idValidation.validateAsync(req.query);

		return res.send(await handleGetBattleLog(data));
	} catch (error) {
		return next(error);
	}
};

// pause or resume processes in queue but not in use
const pause = async (req, res) => {
	await pauseBattle(req.query.id);

	return res.send();
};

const resume = async (req, res) => {
	await resumeBattle(req.query.id);

	return res.send();
};

export {
	createBattle,
	deleteBattle,
	fetchAllBattles,
	fetchSingleBattle,
	fetchSingleBattleLog,
	start,
};
