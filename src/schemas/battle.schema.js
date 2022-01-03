const Joi = require('joi');

const deleteBattleValidation = Joi.object({
	id: Joi.number().required(),
});

const getSingleBattleValidation = Joi.object({
	id: Joi.number().required(),
});

module.exports = {
	deleteBattleValidation,
	getSingleBattleValidation,
};
