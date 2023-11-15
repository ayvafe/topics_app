const TopicRepository = require("../repositories/TopicRepository");

class TopicService {
    static async create(data) {
        return TopicRepository.create(data);
    }

    static async getList(filter = {}) {
        const result = await TopicRepository.list(filter);
        return {
            list: result.rows,
            count: result.count,
        };
    }

    static async getOne(topicId) {
        const result = await TopicRepository.getById(topicId);
        return result.dataValues;
    }
}

module.exports = TopicService;