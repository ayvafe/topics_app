const Topic = require('../models/User');

class TopicRepository {
    static async create(data, transaction) {
        return Topic.create(data, { transaction });
    }

    static async oneWithQuestions(idTopic) {
        return Topic.findOne({ where: { idTopic } });
    }
}

module.exports = TopicRepository;
