const QuestionAnswerRepository = require("../repositories/QuestionAnswerRepository");
const QuestionRepository = require("../repositories/QuestionRepository");
const UserTopicRepository = require("../repositories/UserTopicRepository");

class UserService {
    static async authenticate(idUser, password) {
        // authenticate
    }

    static async subscribeTopic(idUser, idTopic) {
        // --- Check if already subscribed ---

        const primaryQuestion = await QuestionRepository.getPrimary(idTopic);
        await UserTopicRepository.create(idUser, idTopic, primaryQuestion.idQuestion);
    }

    static async getTopicState(idUser, idTopic) {
        const state = await UserTopicRepository.one(idUser, idTopic);
        const userScore = await UserTopicRepository.getScore(idUser, idTopic);
        const topicPoints = await QuestionRepository.getTotalPoints(idTopic);

        return {
            idLastUnlockedQuestion: state.idLastUnlockedQuestion,
            score: (userScore / topicPoints) * 100,
            finished: state.idLastUnlockedQuestion == null,
        };
    }

    static async answerQuestion(idUser, idTopic, params) {
        const { idQuestion, idQuestionAnswer } = params;
        // --- Check if subscribed ---
        // --- Check if the question unlocked and the last unlocked one is being answered ---
        const state = await UserTopicRepository.one(idUser, idTopic);

        if (idQuestion !== state.idLastUnlockedQuestion) {
            // --- this should throw error with appropriate fields ---
            return { isCorrect: false, message: "You can not answer to this question!" };
        }

        const answer = await QuestionAnswerRepository.one(idQuestionAnswer);
        const data = {
            idQuestionAnswer,
            score: answer.isCorrect ? answer.question.points : 0,
            isCorrect: answer.isCorrect,
        };
        await UserTopicRepository.createAnswer(idUser, idTopic, idQuestion, data);

        if (!answer.isCorrect) {
            // --- this should throw error with appropriate fields ---
            return { isCorrect: false, message: "Wrong answer for the question!" };
        }

        const nextQuestion = await QuestionRepository.getByParentId(idTopic, idQuestion);
        await UserTopicRepository.update(idUser, idTopic, nextQuestion ? nextQuestion.idQuestion : null);

        // --- if no error thrown then return true ---
        return { isCorrect: true, message: "Congratulations!" };
    }
}

module.exports = UserService;