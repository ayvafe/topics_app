'use strict';
const { v4: uuidv4 } = require('uuid');
const { Sequelize, DataTypes, Model } = require('sequelize');
const DBConnection = require('../services/DBConnection');

class UserAnswer extends Model {}

UserAnswer.init({
  idUserAnswer: {
    type: DataTypes.STRING,
    primaryKey: true,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  idTopic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idQuestion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idQuestionAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER(11),
    defaultValue: 0,
  },
  isCorrect: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0,
  },
  answeredOn: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
},
{
  timestamps: false,
  sequelize: DBConnection,
  tableName: 'user_answers',
  modelName: 'user_answers',
  paranoid: true,
});

module.exports = UserAnswer;

UserAnswer.belongsTo(User, {
  as: "question",
  foreignKey: "idQuestion",
  onUpdate: "NO ACTION",
  onDelete: "CASCADE",
});

UserAnswer.belongsTo(Topic, {
  as: "topic",
  foreignKey: 'idTopic',
  onUpdate: "NO ACTION",
  onDelete: "CASCADE",
});

UserAnswer.belongsTo(Question, {
  as: "question",
  foreignKey: 'idQuestion',
  onUpdate: "NO ACTION",
  onDelete: "CASCADE",
});

UserAnswer.belongsTo(QuestionAnswer, {
  as: "answer",
  foreignKey: 'idQuestionAnswer',
  onUpdate: "NO ACTION",
  onDelete: "CASCADE",
});
