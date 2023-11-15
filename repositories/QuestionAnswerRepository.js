const { DEFAULT_PAGE_SIZE } = require('../config/parameters');
const QuestionAnswer = require('../models/QuestionAnswer');

class QuestionRepository {
    static async create(idQuestion, data, transaction) {
        return QuestionAnswer.create({
            idQuestion,
            ...data,
        }, { transaction });
    }

    static async get(idQuestionAnswer) {
        return QuestionAnswer.findOne({ where: { idQuestionAnswer } });
    }

    static async getCorrect(idQuestion) {
        return QuestionAnswer.findOne({ where: { idQuestion, isCorrect: 1 } });
    }

    static async listByQuestionId(idQuestion, page = 1, limit = DEFAULT_PAGE_SIZE) {
        return QuestionAnswer.findAndCountAll({
            where: { idQuestion },
            offset: (page - 1) * limit,
            limit,
        });
    }
}

module.exports = QuestionRepository;
