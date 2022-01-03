/* eslint-disable object-curly-newline */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable max-classes-per-file */

const codes = {
	UNAUTHORIZED: 401,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
};

class HttpError extends Error {
	constructor({ message, name, statusCode, data }) {
		super(message);
		this.name = name;
		this.statusCode = statusCode;
		this.data = data;
		Error.captureStackTrace(this, HttpError);
	}
}

class HttpUnauthorized extends HttpError {
	constructor(message = null, data = null) {
		super({
			data: data ? data : {},
			message: message || 'Unauthorized',
			statusCode: codes.UNAUTHORIZED,
		});
	}
}

class HttpBadRequest extends HttpError {
	constructor(message = null, data = null) {
		super({
			data: data ? data : {},
			message: message || 'Bad request',
			statusCode: codes.BAD_REQUEST,
		});
	}
}

class HttpValidationError extends HttpError {
	constructor(message = null, data = null) {
		super({
			data: data ? data : {},
			message: message || 'Validation error',
			statusCode: codes.BAD_REQUEST,
		});
	}
}

class HttpNotFound extends HttpError {
	constructor(message = null, data = null) {
		super({
			data: data ? data : {},
			message: message || 'Not Found',
			statusCode: codes.NOT_FOUND,
		});
	}
}

class HttpInternalServerError extends HttpError {
	constructor(message = null, data = null) {
		super({
			data: data ? data : {},
			message: message || 'Internal server error',
			statusCode: codes.INTERNAL_SERVER_ERROR,
		});
	}
}

module.exports = {
	codes,
	HttpUnauthorized,
	HttpError,
	HttpBadRequest,
	HttpValidationError,
	HttpNotFound,
	HttpInternalServerError,
};
