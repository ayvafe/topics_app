const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const headers = require('./api/middlewares/headers');
const requestUri = require('./api/middlewares/requestUri');

const routes = require('./api/routes');
const errorHandler = require('./api/middlewares/errorHandler');
const transformSequelizeErrors = require('./api/middlewares/transformSequelizeErrors');

require('dotenv').config();

const app = express();

app.use(headers);
app.use(cors());
app.use(express.json({ limit: '50mb', verify: (req, res, buf) => (req.rawBody = buf) }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(requestUri);
app.enable('trust proxy');

app.use('/api/v1', routes);
app.use(transformSequelizeErrors);
app.use(errorHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

module.exports = app;
