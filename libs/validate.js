const MultiValidateError = require('./errors/validation/multi-validate-error');

function requestValidator(validationSchema) {
    return (req, res, next) => {
        const inputTypes = ['params', 'query', 'body', 'headers'];
        let input;

        for (let i = 0; i < inputTypes.length; i++) {
            const joiSchema = validationSchema[inputTypes[i]];

            if (!joiSchema) {
                continue;
            }

            input = { ...req[inputTypes[i]] };

            console.info(`Validation lib => Validating input ${inputTypes[i]}`, input);

            const validator = joiSchema.validate(input, {
                abortEarly: false,
            });

            if (validator.error) {
                const { error } = validator;

                if (error.details && error.details.length) {
                    const errors = error.details.map((err) => ({
                        message: err.message,
                        slug: `invalid-${err.context.key}-${err.type
                            .replace(/\./g, '-')
                            .toLowerCase()}`,
                        details: { path: err.path },
                    }));

                    throw new MultiValidateError(`${inputTypes[i]} validation error.`, errors);
                }
            }
        }

        return next();
    };
}

module.exports = requestValidator;
