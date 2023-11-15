const Joi = require('joi');
const { Pagination } = require('./paginate');

const schema = {};

schema.create = {
    body: Joi.object().keys({
        type: Joi.string().required(),
        name: Joi.string().required(),
        url: Joi.string().uri().required(),
        description_en: Joi.string().required(),
    }),
};

schema.one = {
    params: Joi.object().keys({
        idTopic: Joi.number().required(),
    }),
};

schema.publish = {
    params: Joi.object().keys({
        idTopic: Joi.number().required(),
    }),
};

schema.list = {
    body: Joi.object().keys({
        idTopic: Joi.number().optional(),
        search: Joi.string().optional(),
        ...Pagination,
    }),
};

schema.delete = {
    params: Joi.object().keys({
        idTopic: Joi.number().required(),
    }),
};

module.exports = schema;
