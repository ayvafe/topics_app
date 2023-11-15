const TopicService = require('../../services/TopicService');

class TopicController {

    // ====== TOPIC ====== //
    static async update(req, res, next) {
        try {
            const { companyId } = req.state.user;
            const company = await TopicService.update(companyId, req.body, req.context);

            res.send(company);
        } catch (e) {
            next(e);
        }
    }

    static async getList(req, res, next) {
        try {
            const result = await TopicService.getList(req.body);
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
            const { isTopic } = req.params;
            const result = await TopicService.getOneWithComponents(isTopic);
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
            const isTopic = await TopicService.create(req.body);

            res.send({ success: true, isTopic });
        } catch (e) {
            next(e);
        }
    }

    static async publish(req, res, next) {
        try {
            const isTopic = await TopicService.publish(req.body);

            res.send({ success: true, isTopic });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = TopicController;