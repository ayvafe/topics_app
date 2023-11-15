'use strict';
const { v4: uuidv4 } = require('uuid');
const { Sequelize, DataTypes, Model } = require('sequelize');
const DBConnection = require('../services/DBConnection');

class QuestionAnswer extends Model {}

QuestionAnswer.init({
  idQuestionAnswer: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: () => uuidv4(),
  },
  idQuestion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  text: {
    type: DataTypes.TEXT,
  },
  isCorrect: {
    type: DataTypes.TINYINT(1),
    defaultValue: 0,
  },
  createdOn: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  deletedOn: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null
  },
},
{
  timestamps: false,
  sequelize: DBConnection,
  tableName: 'question_answers',
  modelName: 'question_answers',
  paranoid: true,
});

module.exports = QuestionAnswer;

Question.hasMany(QuestionAnswer, {
  as: "answers",
  foreignKey: "idQuestion",
  onUpdate: "NO ACTION",
  onDelete: "CASCADE",
});

QuestionAnswer.belongsTo(Question, {
  as: "question",
  foreignKey: "idQuestion",
  onUpdate: "NO ACTION",
  onDelete: "CASCADE",
});
