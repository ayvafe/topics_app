const express = require('express');
const authorize = require('../middlewares/authorize');
const validate = require('../../libs/validate');
const validationSchema = require('../validation-schemas/question');

const QuestionController = require('../controllers/QuestionController');

const router = express.Router();

// Question
router.get('/', authorize, validate(validationSchema.list), QuestionController.getList);
router.get('/:idQuestion', authorize, validate(validationSchema.one), QuestionController.getOne);
router.post('/', authorize, validate(validationSchema.create), QuestionController.create);

// Question Answers
router.get('/:idQuestion/answer', authorize, validate(validationSchema.list), QuestionController.getAnswerList);
router.get('/:idQuestion/answer/:idQuestionAnswer', authorize, validate(validationSchema.one), QuestionController.getAnswer);
router.post('/:idQuestion/answer', authorize, validate(validationSchema.create), QuestionController.createAnswer);

module.exports = router;
    