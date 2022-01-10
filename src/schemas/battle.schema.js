import Joi from 'joi';

const idValidation = Joi.object({
	id: Joi.number().required(),
});

export { idValidation };
