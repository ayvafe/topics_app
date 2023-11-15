const { DEFAULT_PAGE_SIZE } = require('../config/parameters');
const Question = require('../models/Question');
const QuestionAnswer = require('../models/QuestionAnswer');

class QuestionRepository {
    static async create(data, transaction) {
        return Question.create(data, { transaction });
    }

    static async one(idQuestion) {
        return Question.findOne({ where: { idQuestion } });
    }

    static async getPrimary(idTopic) {
        return Question.findOne({
            where: {
                idTopic,
                idQuestionParent: null,
            }
        });
    }

    static async getByParentId(idTopic, idQuestion) {
        return Question.findOne({
            where: { idTopic, idQuestionParent: idQuestion}
        });
    }

    static async listByTopicId(idTopic, page = 1, limit = DEFAULT_PAGE_SIZE) {
        return Question.findAndCountAll({
            where: { idTopic },
            offset: (page - 1) * limit,
            limit,
        });
    }

    static async getTotalPoints(idTopic) {
        const result = await Question.findAll({
            attributes: [
              [sequelize.fn('SUM', sequelize.col('points')), 'total_topic_points']
            ],
            where: {
              idTopic: idTopic
            }
          })

        return result[0]?.dataValues?.total_topic_points ?? 0;
    }
}

module.exports = QuestionRepository;
