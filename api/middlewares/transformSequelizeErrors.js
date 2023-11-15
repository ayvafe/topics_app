const { default: MultiValidateError } = require("../../libs/errors/validation/multi-validate-error");


module.exports = (err, req, res, next) => {

    if (!req.url.startsWith('/v2/')) {
        return next(err);
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
        const path = err.errors[0]?.path;
        const messages = [{
            message: `${path} is unique.`,
            slug: `${path}-is-unique`,
            details: {
                path: [
                    path,
                ],
            },
        }];

        return next(new MultiValidateError('Validation error.', messages));
    }

    return next(err);
}