const { createArmyValidation, deleteArmyValidation } = require('../schemas/army.schema.js');
const ArmyService = require('../services/army.service.js');

const createArmy = async (req, res, next) => {
	try {
		const data = await createArmyValidation.validateAsync(req.body);

		return res.json(await ArmyService.handleArmyCreate(data));
	} catch (error) {
		return next(error);
	}
};

const removeArmy = async (req, res, next) => {
	try {
		const data = await deleteArmyValidation.validateAsync(req.params);

		return res.json(await ArmyService.handleArmyDelete(data));
	} catch (error) {
		return next(error);
	}
};

module.exports = { createArmy, removeArmy };
