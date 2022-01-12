/* eslint-disable no-unused-vars */
const pkg = require('joi');
const config = require('../../config/index.js');
const errors = require('../utils/errors.util.js');

const { ValidationError } = pkg;

const errorHandler = (err, req, res, next) => {
	let stackTrace;
	let error = err;

	if (config.base.env !== 'production') {
		stackTrace = error.stack;
	}

	if (error instanceof ValidationError) {
		error = new errors.HttpValidationError(error.details[0].message, error.details[0]);
	}

	if (!(error instanceof errors.HttpError)) {
		error = new errors.HttpInternalServerError();
	}

	return res.status(error.statusCode).json({
		type: error.constructor.name,
		message: error.message,
		code: error.statusCode,
		data: error.data ? error.data : {},
		error: error.error,
		stackTrace,
	});
};

module.exports = errorHandler;
