const QuestionRepository = require("../repositories/QuestionRepository");

class QuestionService {
    static async create(data) {
        return QuestionRepository.create(data);
    }

    static async getList(filter = {}) {
        const result = await QuestionRepository.list(filter);

        return {
            list: result.rows,
            count: result.count,
        };
    }

    static async getOne(idQuestion) {
        const result = await QuestionRepository.getById(idQuestion);
        return result.dataValues;
    } 

    static async getOneWithAnswers(idQuestion) {
    }

    static async createAnswer(idQuestion, url) {
    }
}

module.exports = QuestionService;