/* eslint-disable no-unused-vars */
const { ValidationError } = require('joi');

const config = require('../config');
const errors = require('../utils/errors.util');

function errorHandler(err, req, res, next) {
	let stackTrace;
	let error = err;

	if (config.base.env !== 'production') {
		stackTrace = error.stack;
	}

	if (error instanceof ValidationError) {
		error = new errors.HttpValidationError(
			error.details[0].message,
			error.details[0]
		);
	}

	if (!(error instanceof errors.HttpError)) {
		error = new errors.HttpInternalServerError();
	}

	res.status(error.statusCode).json({
		type: error.constructor.name,
		message: error.message,
		code: error.statusCode,
		data: error.data ? error.data : {},
		stackTrace,
	});
}

module.exports = errorHandler;
