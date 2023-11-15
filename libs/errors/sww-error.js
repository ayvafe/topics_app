const SingleError = require('./single-error');

class SWWError extends SingleError {
    constructor() {
        super('Something went wrong, please try again.', 'something-went-wrong', {});

        this.name = this.constructor.name;
        this.statusCode = 500;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = SWWError;
