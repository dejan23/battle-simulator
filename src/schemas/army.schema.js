const Joi = require('joi');

const createArmyValidation = Joi.object({
	name: Joi.string().min(3).required(),
	units: Joi.number().min(80).max(100).required(),
	strategy: Joi.string().valid('random', 'weakest', 'strongest').required(),
	battleId: Joi.number().required(),
});

const deleteArmyValidation = Joi.object({
	armyId: Joi.number().required(),
	battleId: Joi.number().required(),
});

module.exports = { createArmyValidation, deleteArmyValidation };
