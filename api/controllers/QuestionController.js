const QuestionService = require('../../services/QuestionService');

class QuestionController {

    // ====== Question ====== //
    static async getList(req, res, next) {
        try {
            const result = await QuestionService.getList(req.body);
            res.send({
                ...result,
                success: true,
            });
        } catch (e) {
            next(e);
        }
    }

    static async getOne(req, res, next) {
        try {
            const { topic_id } = req.params;
            const result = await QuestionService.getOneWithComponents(topic_id);
            res.send({
                result,
                success: true,
            });
        } catch (e) {
            next(e);
        }
    }

    static async create(req, res, next) {
        try {
            const topic_id = await QuestionService.create(req.body);

            res.send({ success: true, topic_id });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = QuestionController;