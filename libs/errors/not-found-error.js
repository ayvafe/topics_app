const SingleError = require('./single-error');

class NotFoundError extends SingleError {
    constructor(message, path) {
        const details = {
            path,
        };

        super(message, `${path}-not-found`, details);

        this.name = this.constructor.name;
        this.statusCode = 404;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = NotFoundError;
