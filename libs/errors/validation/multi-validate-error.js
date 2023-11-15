const BaseError = require('../base-error');

class MultiValidateError extends BaseError {
    constructor(message, errors) {
        super(message, errors);

        this.name = this.constructor.name;
        this.statusCode = 422;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = MultiValidateError;
