const express = require('express');
const userRouter = require('./user');
const topicRouter = require('./topic');

const apiRouter = express.Router();

/**
*  User api routes
*/
apiRouter.use('/user', userRouter);

/**
*  Topic api routes
*/
apiRouter.use('/topic', topicRouter);

/**
*  Question api routes
*/
apiRouter.use('/question', topicRouter);

module.exports = apiRouter;
