const {
	createArmyValidation,
	deleteArmyValidation,
} = require('../schemas/army.schema');
const ArmyService = require('../services/army.service');

exports.create = async (req, res, next) => {
	try {
		const body = await createArmyValidation.validateAsync(req.body);

		return res.send(await ArmyService.handleArmyCreate(body));
	} catch (error) {
		return next(error);
	}
};

exports.delete = async (req, res, next) => {
	try {
		const body = await deleteArmyValidation.validateAsync(req.body);

		return res.send(await ArmyService.handleArmyDelete(body));
	} catch (error) {
		return next(error);
	}
};
