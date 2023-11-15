const { DEFAULT_PAGE_SIZE } = require('../config/parameters');
const Question = require('../models/Question');

class QuestionRepository {
    static async create(data, transaction) {
        return Question.create(data, { transaction });
    }

    static async one(idQuestion) {
        return Question.findOne({ where: { idQuestion } });
    }

    static async listByTopicId(idTopic, page = 1, limit = DEFAULT_PAGE_SIZE) {
        return Question.findAndCountAll({
            where: { idTopic },
            offset: (page - 1) * limit,
            limit,
        });
    }
}

module.exports = QuestionRepository;
