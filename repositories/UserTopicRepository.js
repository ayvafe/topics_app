const UserAnswer = require('../models/UserAnswer');
const UserTopic = require('../models/UserTopic');

class UserTopicRepository {
    static async create(idUser, idTopic, idQuestion, transaction) {
        return UserTopic.create({
            idUser,
            idTopic,
            idLastUnlockedQuestion: idQuestion,
        }, { transaction });
    }

    static async update(idUser, idTopic, idQuestion, transaction) {
      return UserTopic.update(
        { idLastUnlockedQuestion: idQuestion },
        { where: { idUser, idTopic }},
        transaction
      );
  }

    update

    static async oneWithQuestions(idUser, idTopic) {
        return UserTopic.findOne({ where: { idUser, idTopic } });
    }

    static async getScore(idUser, idTopic) {
        const result = await UserAnswer.findAll({
          attributes: [
            [sequelize.fn('SUM', sequelize.col('score')), 'total_user_score']
          ],
          where: {
            idUser: idUser,
            idTopic: idTopic,
            isCorrect: 1,
          }
        });

        return result[0]?.dataValues.total_user_score ?? 0;
    }

    static async createAnswer(idUser, idTopic, idQuestion, params, transaction) {
      return UserAnswer.create({
        idUser,
        idTopic,
        idQuestion,
        ...params,
    }, { transaction });
  }
}

module.exports = UserTopicRepository;
