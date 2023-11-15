const UserService = require('../../services/UserService');

class UserController {
    static async authenticate(req, res, next) {
        let response;
        try {
            const result = await UserService.authenticate(params);
            response = { code: 200, body: result };
        } catch (error) {
            response = {
                code: 500,
                message: 'Something went wrong!',
            };
        } finally {
            res.status(response.code).send(response.body);
        }
    }

    static async subscribeTopic(req, res, next) {
        let response;
        try {
            const {idUser} = req.state.user;
            const {idTopic} = req.params;

            const result = await UserService.subscribeTopic(idUser, idTopic);
            response = { code: 200, body: result };
        } catch (error) {
            response = { code: 500, message: 'Something went wrong!' };
        } finally {
            res.status(response.code).send(response.body);
        }
    }

    static async getState(req, res, next) {
        let response;
        try {
            const {idUser} = req.state.user;
            const {idTopic} = req.params;

            const result = await UserService.getTopicState(idUser, idTopic);
            response = { code: 200, body: result };
        } catch (error) {
            response = { code: 500, message: 'Something went wrong!' };
        } finally {
            res.status(response.code).send(response.body);
        }
    }

    static async answerQuestion(req, res, next) {
        let response;
        try {
            const {idUser} = req.state.user;
            const {idTopic} = req.params;

            const result = await UserService.answerQuestion(idUser, idTopic, req.body);
            response = { code: 200, body: result };
        } catch (error) {
            response = { code: 500, message: 'Something went wrong!' };
        } finally {
            res.status(response.code).send(response.body);
        }
    }
}

module.exports = UserController;