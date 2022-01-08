const Joi = require('joi');

const idValidation = Joi.object({
	id: Joi.number().required(),
});

module.exports = {
	idValidation,
};
