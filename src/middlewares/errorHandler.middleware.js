/* eslint-disable no-unused-vars */
import pkg from 'joi';
import * as config from '../config/index.js';
import * as errors from '../utils/errors.util.js';

const { ValidationError } = pkg;

const errorHandler = (err, req, res) => {
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

	return res.status(error.statusCode).json({
		type: error.constructor.name,
		message: error.message,
		code: error.statusCode,
		data: error.data ? error.data : {},
		stackTrace,
	});
};

export default errorHandler;
