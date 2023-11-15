const { NODE_ENV } = process.env;

module.exports = (err, req, res, next) => {
    let statusCode = 500;
    let body = {};

    if (err.statusCode !== 422) {
        console.error(`Global error handler: ${err.message}`, err);
    }

    if (NODE_ENV === 'production') {
        const parsedErrStatusCode = parseInt(err.statusCode);

        if (parsedErrStatusCode >= 200 && parsedErrStatusCode <= 503) {
            statusCode = err.statusCode;
            body = {
                errors: err.errors.length
                    ? err.errors
                    : [
                        {
                            message: 'Server error',
                            slug: 'server-error',
                        },
                    ],
                message: err.message || 'Something went wrong, please try again.',
            };
        } else {
            statusCode = 500;
            body = {
                errors: [
                    {
                        message: 'Server error',
                        slug: 'server-error',
                    },
                ],
                message: 'Something went wrong, please try again.',
            };
        }
    } else {
        statusCode = err.statusCode || 500;
        body = { errors: err.errors, message: err.message };
    }

    res.status(statusCode).send(body);
};
