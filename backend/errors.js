const util = require('util');

function ApplicationError(statusCode, message, data, err) {
    Error.call(this);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    this.data = data;
    this.err = err;
}

util.inherits(ApplicationError, Error);

module.exports = {
    ApplicationError: ApplicationError,

    throwAuthorizationError: function (err) {
        throw new ApplicationError(401, 'UNAUTHORIZED', err, err);
    },

    throwValidationError: function (err) {
        throw new ApplicationError(400, 'VALIDATION_ERROR', err.details, err);
    },

    thorwNotFoundError: function (err) {
        throw new ApplicationError(404, 'NOT_FOUND');
    },
    throwDatabaseError: function (err) {
        if (err.name === 'MongoError') {
            throw new ApplicationError(404, 'DUPLICATED', err.code, err);
        }
        if (err.name === 'ValidationError' && err.errors) {
            throw new ApplicationError(400, 'VALIDATION_ERROR', err.details, err);
        }
        if (err.name === 'CastError') {
            throw new ApplicationError(404, 'NOT_FOUND');
        }

        throw new ApplicationError(502, 'DATABASE_ERROR', err.code, err);
    },

    throwNotFoundIfNull: function (obj) {
        if (obj === null) {
            throw new ApplicationError(404, 'NOT_FOUND');
        }
        return obj;
    }
};
