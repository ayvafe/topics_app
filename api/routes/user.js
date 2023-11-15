const express = require('express');
const validate = require('../../libs/validate');
const validationSchema = require('../validation-schemas/user');

const UserController = require('../controllers/UserController');

const authorize = require('../middlewares/authorize');

const router = express.Router();

router.get('/:id', authorize, validate(validationSchema.one), UserController.getOne);
router.post('/authenticate', validate(validationSchema.authenticate), UserController.authenticate);

// Member User interaction with topics and questions
// --- here should be added role specific permissions middleware
router.post('/topic/:idTopic', authorize, validate(validationSchema.subscribeTopic), UserController.subscribeTopic);
router.get('/topic/:idTopic', authorize, validate(validationSchema.state), UserController.getState);
router.post('/topic/:idTopic/question', authorize, validate(validationSchema.answerQuestion), UserController.answerQuestion);

module.exports = router;
