const express = require('express');
const authorize = require('../middlewares/authorize');
const validate = require('../../libs/validate');
const validationSchema = require('../validation-schemas/topic');

const TopicController = require('../controllers/TopicController');

const router = express.Router();

// Topic
router.get('/', authorize, validate(validationSchema.list), TopicController.getList);
router.get('/:topic_id', authorize, validate(validationSchema.one), TopicController.getOne);
router.post('/', authorize, validate(validationSchema.create), TopicController.create);
router.post('/publish', authorize, validate(validationSchema.publish), TopicController.publish);

module.exports = router;
    