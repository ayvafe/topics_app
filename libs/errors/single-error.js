const BaseError = require('./base-error');

class SingleError extends BaseError {
    constructor(message, slug, details = {}, statusCode = 400) {
        const errors = [
            {
                slug,
                message,
                details,
            },
        ];
        super(message, errors);

        this.name = this.constructor.name;
        if (statusCode) {
            this.statusCode = statusCode;
        }
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = SingleError;