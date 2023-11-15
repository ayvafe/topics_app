const Joi = require('joi');

const schema = {};


schema.create = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
};

schema.one = {
    params: Joi.object().keys({
        idUser: Joi.number().required(),
    }),
};

schema.authenticate = {
    body: Joi.object().keys({
        email: Joi.string().optional(),
        password: Joi.string().optional(),
        token: Joi.string().optional(),
    }),
}

module.exports = schema;
