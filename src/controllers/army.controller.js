const { createArmyValidation, deleteArmyValidation } = require('../schemas/army.schema.js');
const ArmyService = require('../services/army.service.js');

const createArmy = async (req, res, next) => {
	try {
		const body = await createArmyValidation.validateAsync(req.body);

		return res.send(await ArmyService.handleArmyCreate(body));
	} catch (error) {
		return next(error);
	}
};

const removeArmy = async (req, res, next) => {
	try {
		const body = await deleteArmyValidation.validateAsync(req.query);

		return res.send(await ArmyService.handleArmyDelete(body));
	} catch (error) {
		return next(error);
	}
};

module.exports = { createArmy, removeArmy };
