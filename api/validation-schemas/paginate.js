const Joi = require('joi');
const { DEFAULT_PAGE_LIMIT = 10 } = process.env;

module.exports = {
  DEFAULT_PAGE_LIMIT,
  Pagination: {
    limit: Joi.number().optional(),
    page: Joi.number().optional(),
  },
};
