const SingleError = require('./single-error');

class UnauthorizedError extends SingleError {
    constructor() {
        super('Unauthorized.', 'unauthorized', {});

        this.name = this.constructor.name;
        this.statusCode = 401;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UnauthorizedError;
